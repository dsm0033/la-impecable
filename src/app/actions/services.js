'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleServicio(id, active) {
  const supabase = await createClient()
  await supabase
    .from('services')
    .update({ active: !active })
    .eq('id', id)

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
}
