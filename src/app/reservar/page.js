import { createClient } from '@/lib/supabase/server'
import BookingForm from './BookingForm'

export const metadata = {
  title: 'Reservar · IMPECABLE',
}

export default async function ReservarPage() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from('services')
    .select('id, name, description, price, duration_minutes')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reserva tu servicio</h1>
          <p className="text-gray-500 mt-2">IMPECABLE · Cuidado Profesional del Vehículo</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {services?.length > 0 ? (
            <BookingForm services={services} />
          ) : (
            <p className="text-center text-gray-500 py-8">
              No hay servicios disponibles en este momento.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
