import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EmpleadoForm } from '../../_components/EmpleadoForm'
import { editarEmpleado } from '../../actions'

export const metadata = { title: 'Editar empleado · Admin IMPECABLE' }

export default async function EditarEmpleadoPage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const { data: empleado } = await supabase
    .from('employees')
    .select('id, full_name, email, phone, position')
    .eq('id', id)
    .eq('business_id', profile?.business_id)
    .single()

  if (!empleado) notFound()

  const action = editarEmpleado.bind(null, id)

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Editar empleado</h1>
        <p className="text-gray-500 mt-1">{empleado.full_name}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <EmpleadoForm action={action} initialData={empleado} submitLabel="Guardar cambios" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Horario laboral</h2>
            <p className="text-sm text-gray-500 mt-0.5">Configura los días y horas contratadas</p>
          </div>
          <a
            href={`/admin/empleados/${id}/horario`}
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Configurar horario
          </a>
        </div>
      </div>
    </div>
  )
}
