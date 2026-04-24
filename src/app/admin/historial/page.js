import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { EliminarBtn } from './_components/EliminarBtn'
import { Euro, Car } from 'lucide-react'

export const metadata = { title: 'Historial · Admin IMPECABLE' }

const ESTADO_STYLES = {
  completado: 'bg-green-50 text-green-700',
  pendiente:  'bg-yellow-50 text-yellow-700',
  cancelado:  'bg-red-50 text-red-500',
}

export default async function HistorialPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const { data: registros } = await supabase
    .from('service_records')
    .select(`
      id, date, price, status, notes, is_paid, is_collected, started_at, completed_at,
      customers(full_name),
      services(name),
      employees(full_name)
    `)
    .eq('business_id', profile?.business_id)
    .order('status', { ascending: false })
    .order('date', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial de servicios</h1>
          <p className="text-gray-500 mt-1">{registros?.length ?? 0} registros</p>
        </div>
        <Link
          href="/admin/historial/nuevo"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Registrar servicio
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {!registros?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin registros todavía</p>
            <p className="text-sm mt-1">Pulsa "Registrar servicio" para añadir el primero</p>
          </div>
        ) : (
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Cliente</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Servicio</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Empleado</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Precio</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Cobrado</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Recogido</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(r.date).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {r.customers?.full_name ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {r.services?.name ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {r.employees?.full_name ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {r.price} €
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${ESTADO_STYLES[r.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Euro size={16} className={r.is_paid ? 'text-green-500' : 'text-gray-300'} />
                  </td>
                  <td className="px-6 py-4">
                    <Car size={16} className={r.is_collected ? 'text-green-500' : 'text-gray-300'} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/historial/${r.id}/editar`}
                        className="text-blue-500 hover:text-blue-700 text-sm transition-colors"
                      >
                        Editar
                      </Link>
                      <EliminarBtn id={r.id} />
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
