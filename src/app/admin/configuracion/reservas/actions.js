'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

async function getBusinessId() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user.id)
    .single()
  return profile?.business_id
}

function adminDb() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─────────────────────────────────────────────
// Guarda el horario semanal del negocio (7 días)
// ─────────────────────────────────────────────
export async function guardarHorarioNegocio(prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const rows = Array.from({ length: 7 }, (_, i) => {
    const isOpen     = formData.get(`day_${i}_is_open`) === 'on'
    const openTime   = formData.get(`day_${i}_open_time`)   || '09:00'
    const closeTime  = formData.get(`day_${i}_close_time`)  || '18:00'
    const lunchStart = formData.get(`day_${i}_lunch_start`) || null
    const lunchEnd   = formData.get(`day_${i}_lunch_end`)   || null
    return {
      business_id:       businessId,
      day_of_week:       i,
      is_open:           isOpen,
      open_time:         openTime,
      close_time:        closeTime,
      lunch_break_start: lunchStart || null,
      lunch_break_end:   lunchEnd   || null,
    }
  })

  const { error } = await adminDb()
    .from('business_hours')
    .upsert(rows, { onConflict: 'business_id,day_of_week' })

  if (error) return { error: 'Error al guardar el horario.' }
  revalidatePath('/admin/configuracion/reservas')
  return { ok: true }
}

// ─────────────────────────────────────────────
// Guarda la configuración general de reservas
// ─────────────────────────────────────────────
export async function guardarConfiguracion(prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const slotDuration  = parseInt(formData.get('slot_duration_minutes'))
  const maxConcurrent = parseInt(formData.get('max_concurrent_bookings'))
  const advanceDays   = parseInt(formData.get('booking_advance_days'))

  if (isNaN(slotDuration) || slotDuration < 15 || slotDuration > 480)
    return { error: 'Duración de slot inválida (15-480 min).' }
  if (isNaN(maxConcurrent) || maxConcurrent < 1 || maxConcurrent > 20)
    return { error: 'Capacidad simultánea inválida (1-20).' }
  if (isNaN(advanceDays) || advanceDays < 1 || advanceDays > 365)
    return { error: 'Días de antelación inválido (1-365).' }

  const { error } = await adminDb()
    .from('business_settings')
    .upsert({
      business_id:             businessId,
      slot_duration_minutes:   slotDuration,
      max_concurrent_bookings: maxConcurrent,
      booking_advance_days:    advanceDays,
      updated_at:              new Date().toISOString(),
    }, { onConflict: 'business_id' })

  if (error) return { error: 'Error al guardar la configuración.' }
  revalidatePath('/admin/configuracion/reservas')
  return { ok: true }
}

// ─────────────────────────────────────────────
// Activa/desactiva festivos nacionales y guarda la comunidad autónoma
// ─────────────────────────────────────────────
export async function guardarOpcionesFestivos(prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const useHolidays  = formData.get('use_national_holidays') === 'on'
  const region       = formData.get('holiday_region') || null

  const { error } = await adminDb()
    .from('business_settings')
    .upsert({
      business_id:           businessId,
      use_national_holidays: useHolidays,
      holiday_region:        region,
      updated_at:            new Date().toISOString(),
    }, { onConflict: 'business_id' })

  if (error) return { error: 'Error al guardar las opciones.' }
  revalidatePath('/admin/configuracion/reservas')
  return { ok: true }
}

// ─────────────────────────────────────────────
// Importa festivos de Nager.Date para un año dado
// Borra primero los festivos importados de ese año para ese negocio,
// luego inserta los nuevos (sin tocar los bloqueados manualmente)
// ─────────────────────────────────────────────
export async function importarFestivos(prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const year   = parseInt(formData.get('year'))
  const region = formData.get('region') || null

  if (isNaN(year) || year < 2024 || year > 2030)
    return { error: 'Año inválido.' }

  // Llamar a Nager.Date API
  let holidays
  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/ES`, {
      next: { revalidate: 86400 }, // cachear 24h
    })
    if (!res.ok) throw new Error('API error')
    holidays = await res.json()
  } catch {
    return { error: 'No se pudo conectar con el calendario de festivos. Inténtalo más tarde.' }
  }

  // Filtrar: nacionales (counties null) + de la comunidad seleccionada si hay
  const isRelevant = (h) => {
    if (!h.counties) return true
    if (!region) return false
    return h.counties.some(c => c === region || c === `ES-${region}` || c.endsWith(`-${region}`))
  }

  const toInsert = holidays
    .filter(isRelevant)
    .map(h => ({
      business_id: businessId,
      date:        h.date,
      reason:      h.localName,
      source:      h.counties ? 'regional_holiday' : 'national_holiday',
    }))

  if (!toInsert.length) return { error: 'No se encontraron festivos para el período seleccionado.' }

  const db = adminDb()

  // Borrar festivos importados previos de ese año (no los manuales)
  await db
    .from('blocked_dates')
    .delete()
    .eq('business_id', businessId)
    .in('source', ['national_holiday', 'regional_holiday'])
    .gte('date', `${year}-01-01`)
    .lte('date', `${year}-12-31`)

  // Insertar los nuevos (DO NOTHING si un manual ya ocupa esa fecha)
  const { error } = await db
    .from('blocked_dates')
    .upsert(toInsert, { onConflict: 'business_id,date', ignoreDuplicates: true })

  if (error) return { error: 'Error al guardar los festivos.' }

  revalidatePath('/admin/configuracion/reservas')
  return { ok: true, count: toInsert.length }
}

// ─────────────────────────────────────────────
// Bloquea una fecha manualmente
// ─────────────────────────────────────────────
export async function bloquearFecha(prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const date   = formData.get('date')
  const reason = formData.get('reason')?.trim() || null

  if (!date) return { error: 'Selecciona una fecha.' }

  const { error } = await adminDb()
    .from('blocked_dates')
    .upsert({ business_id: businessId, date, reason, source: 'manual' }, { onConflict: 'business_id,date' })

  if (error) return { error: 'Error al bloquear la fecha.' }
  revalidatePath('/admin/configuracion/reservas')
  return { ok: true }
}

// ─────────────────────────────────────────────
// Desbloquea una fecha (elimina el registro)
// ─────────────────────────────────────────────
export async function desbloquearFecha(prevState, formData) {
  const id = formData.get('id')
  if (!id) return { error: 'ID no especificado.' }

  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const { error } = await adminDb()
    .from('blocked_dates')
    .delete()
    .eq('id', id)
    .eq('business_id', businessId)

  if (error) return { error: 'Error al desbloquear la fecha.' }
  revalidatePath('/admin/configuracion/reservas')
  return { ok: true }
}
