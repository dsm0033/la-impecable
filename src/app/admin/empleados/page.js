import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Empleados · Admin IMPECABLE' }

export default async function EmpleadosPage() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .single()

  const { data: empleados } = await supabase
    .from('profiles')
    .select('id, full_name, phone, created_at')
    .eq('role', 'employee')
    .eq('business_id', profile?.business_id)
    .order('full_name')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Empleados</h1>
        <p className="text-gray-500 mt-1">{empleados?.length ?? 0} empleados registrados</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!empleados?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin empleados todavía</p>
            <p className="text-sm mt-1">Los empleados aparecerán aquí cuando se registren</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Alta desde</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{e.full_name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.phone || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(e.created_at).toLocaleDateString('es-ES')}
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
