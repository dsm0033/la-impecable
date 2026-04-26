'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function getAdminContext() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user.id)
    .single()
  return { supabase, businessId: profile?.business_id }
}

export async function aprobarSolicitud(requestId, prevState, formData) {
  const { supabase, businessId } = await getAdminContext()
  const admin_notes = formData.get('admin_notes') || null

  const { error } = await supabase
    .from('vacation_requests')
    .update({ status: 'aprobada', admin_notes, updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .eq('business_id', businessId)

  if (error) return { error: 'No se pudo aprobar la solicitud.' }
  revalidatePath('/admin/empleados/[id]/vacaciones', 'page')
  return { ok: true }
}

export async function rechazarSolicitud(requestId, prevState, formData) {
  const { supabase, businessId } = await getAdminContext()
  const admin_notes = formData.get('admin_notes') || null

  const { error } = await supabase
    .from('vacation_requests')
    .update({ status: 'rechazada', admin_notes, updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .eq('business_id', businessId)

  if (error) return { error: 'No se pudo rechazar la solicitud.' }
  revalidatePath('/admin/empleados/[id]/vacaciones', 'page')
  return { ok: true }
}

export async function actualizarEntitlement(employeeId, prevState, formData) {
  const { supabase, businessId } = await getAdminContext()
  const year          = parseInt(formData.get('year'))
  const total_days    = parseInt(formData.get('total_days'))
  const carryover_days = parseInt(formData.get('carryover_days') || '0')

  if (!year || !total_days) return { error: 'Datos incompletos.' }

  const { error } = await supabase
    .from('vacation_entitlements')
    .upsert({ employee_id: employeeId, business_id: businessId, year, total_days, carryover_days },
             { onConflict: 'employee_id,year' })

  if (error) return { error: 'No se pudo guardar.' }
  revalidatePath('/admin/empleados/[id]/vacaciones', 'page')
  return { ok: true }
}
