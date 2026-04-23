'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const ICONOS = [
  { value: 'Wrench',    label: 'Llave inglesa' },
  { value: 'Car',       label: 'Coche' },
  { value: 'Sparkles',  label: 'Brillo / Limpieza' },
  { value: 'Droplets',  label: 'Agua / Lavado' },
  { value: 'Shield',    label: 'Protección' },
  { value: 'Star',      label: 'Estrella / Premium' },
  { value: 'Brush',     label: 'Pintura / Cepillo' },
  { value: 'Wind',      label: 'Secado / Aire' },
  { value: 'Zap',       label: 'Rápido / Express' },
  { value: 'Settings',  label: 'Configuración / Ajuste' },
]

function SubmitBtn({ label }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {pending ? 'Guardando...' : label}
    </button>
  )
}

export function ServicioForm({ action, initialData, submitLabel }) {
  const [state, formAction] = useActionState(action, null)

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          defaultValue={initialData?.name}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio (€ con IVA)
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={initialData?.price}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración (min)
          </label>
          <input
            name="duration_minutes"
            type="number"
            min="1"
            step="1"
            defaultValue={initialData?.duration_minutes}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
        <select
          name="icon"
          defaultValue={initialData?.icon ?? 'Wrench'}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ICONOS.map((i) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          name="highlight"
          id="highlight"
          defaultChecked={initialData?.highlight ?? false}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="highlight" className="text-sm text-gray-700">
          Mostrar como destacado en la web
        </label>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitBtn label={submitLabel} />
        <a href="/admin/servicios" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </a>
      </div>
    </form>
  )
}
