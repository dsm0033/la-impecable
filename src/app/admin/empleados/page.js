import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { toggleEmpleado } from './actions'
import { EliminarBtn } from './_components/EliminarBtn'

export const metadata = { title: 'Empleados · Admin IMPECABLE' }

export default async function EmpleadosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const { data: empleados } = await supabase
    .from('employees')
    .select('id, full_name, email, phone, position, active, created_at')
    .eq('business_id', profile?.business_id)
    .order('full_name')

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-500 mt-1">{empleados?.length ?? 0} empleados registrados</p>
        </div>
        <Link
          href="/admin/empleados/nuevo"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo empleado
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {!empleados?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin empleados todavía</p>
            <p className="text-sm mt-1">Pulsa "Nuevo empleado" para añadir el primero</p>
          </div>
        ) : (
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Puesto</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Contacto</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {empleados.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{e.full_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.position || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {e.phone && <div>{e.phone}</div>}
                    {e.email && <div>{e.email}</div>}
                    {!e.phone && !e.email && '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      e.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {e.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <form action={toggleEmpleado.bind(null, e.id, e.active)}>
                        <button
                          type="submit"
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                            e.active
                              ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                              : 'border-green-200 text-green-600 hover:bg-green-50'
                          }`}
                        >
                          {e.active ? 'Desactivar' : 'Activar'}
                        </button>
                      </form>
                      <Link
                        href={`/admin/empleados/${e.id}/editar`}
                        className="text-blue-500 hover:text-blue-700 text-sm transition-colors"
                      >
                        Editar
                      </Link>
                      <EliminarBtn id={e.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
