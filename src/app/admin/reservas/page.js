import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const STATUS_STYLES = {
  pagado:    'bg-green-100 text-green-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
  cancelado: 'bg-red-100 text-red-800',
}

export default async function ReservasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, business_id')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/login')

  const { data: reservas } = await supabase
    .from('bookings')
    .select('id, date, time_slot, customer_name, license_plate, customer_email, price, status, created_at, services(name)')
    .eq('business_id', profile.business_id)
    .order('date', { ascending: true })
    .order('time_slot', { ascending: true })

  const pendientes = reservas?.filter(r => r.status === 'pendiente').length ?? 0
  const pagadas    = reservas?.filter(r => r.status === 'pagado').length ?? 0

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservas</h1>
        <p className="text-sm text-gray-500 mt-1">
          {pagadas} pagadas · {pendientes} pendientes de pago
        </p>
      </div>

      {!reservas?.length ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          No hay reservas todavía.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hora</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Matrícula</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Servicio</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservas.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {new Date(r.date + 'T00:00:00').toLocaleDateString('es-ES', {
                        weekday: 'short', day: 'numeric', month: 'short'
                      })}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.time_slot?.slice(0, 5)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{r.customer_name}</p>
                      {r.customer_email && (
                        <p className="text-xs text-gray-400">{r.customer_email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-700 uppercase">{r.license_plate}</td>
                    <td className="px-4 py-3 text-gray-600">{r.services?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{r.price}€</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
