'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function getEmpleadoCtx() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: employee } = await supabase
    .from('employees')
    .select('id')
    .eq('email', user.email)
    .single()
  if (!employee) return null
  return { supabase, employeeId: employee.id }
}

export async function actualizarProgreso(recordId, progress) {
  const ctx = await getEmpleadoCtx()
  if (!ctx) return

  await ctx.supabase
    .from('service_records')
    .update({ checklist_progress: progress })
    .eq('id', recordId)
    .eq('employee_id', ctx.employeeId)
}

export async function completarTrabajo(recordId) {
  const ctx = await getEmpleadoCtx()
  if (!ctx) return

  await ctx.supabase
    .from('service_records')
    .update({ status: 'completado' })
    .eq('id', recordId)
    .eq('employee_id', ctx.employeeId)

  revalidatePath('/empleado')
}
