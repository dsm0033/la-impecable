import { createClient } from '@/lib/supabase/server'
import { toggleServicio } from '@/app/actions/services'

export const metadata = { title: 'Servicios · Admin IMPECABLE' }

export default async function ServiciosPage() {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .single()

  const { data: servicios } = await supabase
    .from('services')
    .select('id, name, description, price, duration_minutes, active')
    .eq('business_id', profile?.business_id)
    .order('name')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
        <p className="text-gray-500 mt-1">{servicios?.length ?? 0} servicios configurados</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!servicios?.length ? (
          <div className="p-12 text-center text-gray-400">
            <p className="text-lg font-medium">Sin servicios todavía</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Servicio</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Precio</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Duración</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{s.name}</p>
                    {s.description && <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{s.description}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{s.price ? `${s.price} €` : '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.duration_minutes ? `${s.duration_minutes} min` : '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      s.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {s.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <form action={toggleServicio.bind(null, s.id, s.active)}>
                      <button
                        type="submit"
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                          s.active
                            ? 'border-red-200 text-red-600 hover:bg-red-50'
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {s.active ? 'Desactivar' : 'Activar'}
                      </button>
                    </form>
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
