'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function getAdminCtx() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, business_id')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') return null
  return { supabase, businessId: profile.business_id }
}

export async function crearRegistro(prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const customer_id = formData.get('customer_id')
  const service_id = formData.get('service_id')
  const price = formData.get('price')
  const date = formData.get('date')

  if (!customer_id) return { error: 'Selecciona un cliente' }
  if (!service_id) return { error: 'Selecciona un servicio' }
  if (!price || isNaN(price)) return { error: 'El precio es obligatorio' }
  if (!date) return { error: 'La fecha es obligatoria' }

  const employee_id = formData.get('employee_id') || null

  const { error } = await ctx.supabase.from('service_records').insert({
    business_id: ctx.businessId,
    customer_id,
    service_id,
    employee_id,
    date,
    price: parseFloat(price),
    status: formData.get('status') || 'pendiente',
    notes: formData.get('notes')?.trim() || null,
    is_paid: formData.get('is_paid') === 'on',
    is_collected: formData.get('is_collected') === 'on',
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/historial')
  redirect('/admin/historial')
}

export async function editarRegistro(id, prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const price = formData.get('price')
  if (!price || isNaN(price)) return { error: 'El precio es obligatorio' }

  const { error } = await ctx.supabase
    .from('service_records')
    .update({
      customer_id: formData.get('customer_id') || null,
      service_id: formData.get('service_id') || null,
      employee_id: formData.get('employee_id') || null,
      date: formData.get('date'),
      price: parseFloat(price),
      status: formData.get('status') || 'completado',
      notes: formData.get('notes')?.trim() || null,
      is_paid: formData.get('is_paid') === 'on',
      is_collected: formData.get('is_collected') === 'on',
    })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  if (error) return { error: error.message }

  revalidatePath('/admin/historial')
  redirect('/admin/historial')
}

export async function eliminarRegistro(id) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('service_records')
    .delete()
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/historial')
}
