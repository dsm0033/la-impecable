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
    .single()
  if (profile?.role !== 'admin') return null
  return { supabase, businessId: profile.business_id }
}

export async function crearEmpleado(prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const full_name = formData.get('full_name')?.trim()
  if (!full_name) return { error: 'El nombre es obligatorio' }

  const email = formData.get('email')?.trim() || null
  const phone = formData.get('phone')?.trim() || null
  if (!email && !phone) return { error: 'Indica al menos un teléfono o email de contacto' }

  const { error } = await ctx.supabase.from('employees').insert({
    business_id: ctx.businessId,
    full_name,
    email,
    phone,
    position: formData.get('position')?.trim() || null,
    active: true,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/empleados')
  redirect('/admin/empleados')
}

export async function editarEmpleado(id, prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const full_name = formData.get('full_name')?.trim()
  if (!full_name) return { error: 'El nombre es obligatorio' }

  const email = formData.get('email')?.trim() || null
  const phone = formData.get('phone')?.trim() || null
  if (!email && !phone) return { error: 'Indica al menos un teléfono o email de contacto' }

  const { error } = await ctx.supabase
    .from('employees')
    .update({
      full_name,
      email,
      phone,
      position: formData.get('position')?.trim() || null,
    })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  if (error) return { error: error.message }

  revalidatePath('/admin/empleados')
  redirect('/admin/empleados')
}

export async function toggleEmpleado(id, active) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('employees')
    .update({ active: !active })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/empleados')
}

export async function eliminarEmpleado(id) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('employees')
    .delete()
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/empleados')
}
