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

export async function crearChecklist(prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const name = formData.get('name')?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const items = JSON.parse(formData.get('items') || '[]')
  if (!items.length) return { error: 'Añade al menos un ítem al checklist' }

  const { error } = await ctx.supabase.from('checklists').insert({
    business_id: ctx.businessId,
    name,
    items,
    active: true,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/checklists')
  redirect('/admin/checklists')
}

export async function editarChecklist(id, prevState, formData) {
  const ctx = await getAdminCtx()
  if (!ctx) return { error: 'No autorizado' }

  const name = formData.get('name')?.trim()
  if (!name) return { error: 'El nombre es obligatorio' }

  const items = JSON.parse(formData.get('items') || '[]')
  if (!items.length) return { error: 'Añade al menos un ítem al checklist' }

  const { error } = await ctx.supabase
    .from('checklists')
    .update({ name, items })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  if (error) return { error: error.message }

  revalidatePath('/admin/checklists')
  redirect('/admin/checklists')
}

export async function toggleChecklist(id, active) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('checklists')
    .update({ active: !active })
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/checklists')
}

export async function eliminarChecklist(id) {
  const ctx = await getAdminCtx()
  if (!ctx) return

  await ctx.supabase
    .from('checklists')
    .delete()
    .eq('id', id)
    .eq('business_id', ctx.businessId)

  revalidatePath('/admin/checklists')
}
