'use client'

import { useActionState } from 'react'
import { crearReserva } from '@/app/actions/booking'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00']

export default function BookingForm({ services }) {
  const [state, action, pending] = useActionState(crearReserva, undefined)
  const today = new Date().toISOString().split('T')[0]

  return (
    <form action={action} className="space-y-8">
      {/* Servicio */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          1. Elige tu servicio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map(s => (
            <label
              key={s.id}
              className="relative flex flex-col gap-1 p-4 rounded-xl border-2 border-gray-200 cursor-pointer transition-colors hover:border-blue-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50"
            >
              <input
                type="radio"
                name="service_id"
                value={s.id}
                required
                className="sr-only"
              />
              <span className="font-semibold text-gray-900">{s.name}</span>
              {s.description && (
                <span className="text-xs text-gray-500 line-clamp-2">{s.description}</span>
              )}
              <span className="mt-1 text-lg font-bold text-blue-600">{s.price}€</span>
              {s.duration_minutes && (
                <span className="text-xs text-gray-400">{s.duration_minutes} min</span>
              )}
            </label>
          ))}
        </div>
      </section>

      {/* Fecha y hora */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          2. Fecha y hora
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <select
              id="time_slot"
              name="time_slot"
              required
              defaultValue=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Selecciona una hora</option>
              {TIME_SLOTS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Datos del cliente */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          3. Tus datos
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              required
              placeholder="Tu nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="license_plate" className="block text-sm font-medium text-gray-700 mb-1">
              Matrícula
            </label>
            <input
              id="license_plate"
              name="license_plate"
              type="text"
              required
              placeholder="1234 ABC"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
          <div>
            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-gray-400 font-normal">(opcional — para el recibo)</span>
            </label>
            <input
              id="customer_email"
              name="customer_email"
              type="email"
              placeholder="tu@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{state.error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl text-base font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {pending ? 'Redirigiendo al pago...' : 'Reservar y pagar →'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Pago seguro procesado por Stripe. No almacenamos datos de tu tarjeta.
      </p>
    </form>
  )
}
