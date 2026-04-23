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

export async function toggleServicio(id, active) {
  const supabase = await createClient()
  await supabase
    .from('services')
    .update({ active: !active })
    .eq('id', id)

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
}

export async function crearServicio(prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const name = formData.get('name')?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const price = formData.get('price')
  const duration_minutes = formData.get('duration_minutes')

  const { error } = await ctx.supabase.from('services').insert({
    business_id: ctx.businessId,
    name,
    description: formData.get('description')?.trim() || null,
    price: price ? parseFloat(price) : null,
    duration_minutes: duration_minutes ? parseInt(duration_minutes) : null,
    icon: formData.get('icon') || 'Wrench',
    highlight: formData.get('highlight') === 'on',
    checklist_id: formData.get('checklist_id') || null,
    active: true,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
  redirect('/admin/servicios')
}

export async function editarServicio(id, prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const name = formData.get('name')?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const price = formData.get('price')
  const duration_minutes = formData.get('duration_minutes')

  const { error } = await ctx.supabase
    .from('services')
    .update({
      name,
      description: formData.get('description')?.trim() || null,
      price: price ? parseFloat(price) : null,
      duration_minutes: duration_minutes ? parseInt(duration_minutes) : null,
      icon: formData.get('icon') || 'Wrench',
      highlight: formData.get('highlight') === 'on',
      checklist_id: formData.get('checklist_id') || null,
    })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  if (error) return { error: error.message }

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
  redirect('/admin/servicios')
}

export async function moverServicio(id, direction) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  const { data: servicios } = await ctx.supabase
    .from('services')
    .select('id, sort_order')
    .eq('business_id', ctx.businessId)
    .order('sort_order')

  const idx = servicios?.findIndex((s) => s.id === id)
  if (idx === -1 || idx == null) return

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= servicios.length) return

  const current = servicios[idx]
  const swap = servicios[swapIdx]

  await Promise.all([
    ctx.supabase.from('services').update({ sort_order: swap.sort_order }).eq('id', current.id),
    ctx.supabase.from('services').update({ sort_order: current.sort_order }).eq('id', swap.id),
  ])

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
}

export async function eliminarServicio(id) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('services')
    .delete()
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
}
