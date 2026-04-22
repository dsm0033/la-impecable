import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Clientes · Admin IMPECABLE' }

export default async function ClientesPage() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .single()

  const { data: clientes } = await supabase
    .from('profiles')
    .select('id, full_name, phone, created_at')
    .eq('role', 'client')
    .eq('business_id', profile?.business_id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">{clientes?.length ?? 0} clientes registrados</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!clientes?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin clientes todavía</p>
            <p className="text-sm mt-1">Los clientes aparecerán aquí cuando se registren</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Registro</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.full_name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.phone || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(c.created_at).toLocaleDateString('es-ES')}
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
