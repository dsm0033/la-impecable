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

export async function subirNomina(employeeId, prevState, formData) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const month = formData.get('month')
  const file  = formData.get('file')

  if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month))
    return { error: 'Selecciona un mes válido.' }
  if (!file || file.size === 0)
    return { error: 'Selecciona un archivo PDF.' }
  if (file.type !== 'application/pdf')
    return { error: 'Solo se admiten archivos PDF.' }
  if (file.size > 10 * 1024 * 1024)
    return { error: 'El archivo no puede superar 10 MB.' }

  // Verificar que el empleado pertenece a este negocio
  const { data: employee } = await adminDb()
    .from('employees')
    .select('id')
    .eq('id', employeeId)
    .eq('business_id', businessId)
    .single()

  if (!employee) return { error: 'Empleado no encontrado.' }

  const filePath = `${businessId}/${employeeId}/${month}.pdf`

  const { error: uploadError } = await adminDb()
    .storage
    .from('nominas')
    .upload(filePath, file, { contentType: 'application/pdf', upsert: true })

  if (uploadError) return { error: 'Error al subir el archivo. Inténtalo de nuevo.' }

  const { error: dbError } = await adminDb()
    .from('payslips')
    .upsert(
      { business_id: businessId, employee_id: employeeId, month, file_path: filePath },
      { onConflict: 'employee_id,month' }
    )

  if (dbError) return { error: 'Error al guardar el registro.' }

  revalidatePath(`/admin/empleados/${employeeId}/nominas`)
  return { ok: true }
}

export async function eliminarNomina(payslipId, prevState) {
  const businessId = await getBusinessId()
  if (!businessId) return { error: 'No autorizado.' }

  const { data: payslip } = await adminDb()
    .from('payslips')
    .select('file_path, employee_id')
    .eq('id', payslipId)
    .eq('business_id', businessId)
    .single()

  if (!payslip) return { error: 'Nómina no encontrada.' }

  await adminDb().storage.from('nominas').remove([payslip.file_path])

  await adminDb().from('payslips').delete().eq('id', payslipId)

  revalidatePath(`/admin/empleados/${payslip.employee_id}/nominas`)
  return { ok: true }
}
