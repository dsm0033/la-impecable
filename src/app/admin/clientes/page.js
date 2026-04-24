import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { EliminarBtn } from './_components/EliminarBtn'

export const metadata = { title: 'Clientes · Admin IMPECABLE' }

export default async function ClientesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const { data: clientes } = await supabase
    .from('customers')
    .select('id, full_name, email, phone, created_at')
    .eq('business_id', profile?.business_id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">{clientes?.length ?? 0} clientes registrados</p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo cliente
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {!clientes?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin clientes todavía</p>
            <p className="text-sm mt-1">Pulsa "Nuevo cliente" para añadir el primero</p>
          </div>
        ) : (
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Nombre</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Registro</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.full_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.email || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.phone || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(c.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/clientes/${c.id}/editar`}
                        className="text-blue-500 hover:text-blue-700 text-sm transition-colors"
                      >
                        Editar
                      </Link>
                      <EliminarBtn id={c.id} />
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
