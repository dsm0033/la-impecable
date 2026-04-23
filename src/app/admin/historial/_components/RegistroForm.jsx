'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'

const DESCUENTOS = [
  { label: 'Sin dto.', pct: 0 },
  { label: '-10%',     pct: 10 },
  { label: '-25%',     pct: 25 },
  { label: '-50%',     pct: 50 },
]

const ESTADOS = [
  { value: 'completado', label: 'Completado' },
  { value: 'pendiente',  label: 'Pendiente' },
  { value: 'cancelado',  label: 'Cancelado' },
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

export function RegistroForm({ action, clientes, servicios, empleados, initialData, submitLabel }) {
  const [state, formAction] = useActionState(action, null)
  const [precio, setPrecio] = useState(initialData?.price ?? '')
  const [descuento, setDescuento] = useState(0)

  const [precioBase, setPrecioBase] = useState(
    initialData?.service_id
      ? (servicios.find((s) => s.id === initialData.service_id)?.price ?? null)
      : null
  )

  function handleServicioChange(e) {
    const servicio = servicios.find((s) => s.id === e.target.value)
    if (servicio?.price != null) {
      setPrecioBase(servicio.price)
      aplicarDescuento(servicio.price, descuento)
    } else {
      setPrecioBase(null)
    }
  }

  function aplicarDescuento(base, pct) {
    if (base == null) return
    const nuevo = parseFloat((base * (1 - pct / 100)).toFixed(2))
    setPrecio(nuevo)
    setDescuento(pct)
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cliente <span className="text-red-500">*</span>
        </label>
        <select name="customer_id" defaultValue={initialData?.customer_id ?? ''} required className={inputClass}>
          <option value="">— Selecciona un cliente —</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.full_name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Servicio <span className="text-red-500">*</span>
        </label>
        <select
          name="service_id"
          defaultValue={initialData?.service_id ?? ''}
          required
          onChange={handleServicioChange}
          className={inputClass}
        >
          <option value="">— Selecciona un servicio —</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empleado <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <select name="employee_id" defaultValue={initialData?.employee_id ?? ''} className={inputClass}>
          <option value="">— Sin asignar —</option>
          {empleados.map((e) => (
            <option key={e.id} value={e.id}>{e.full_name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            name="date"
            type="date"
            defaultValue={initialData?.date}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio (€) <span className="text-red-500">*</span>
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => { setPrecio(e.target.value); setDescuento(0) }}
            required
            className={inputClass}
          />
          {precioBase != null && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {DESCUENTOS.map((d) => (
                <button
                  key={d.pct}
                  type="button"
                  onClick={() => aplicarDescuento(precioBase, d.pct)}
                  className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                    descuento === d.pct
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select name="status" defaultValue={initialData?.status ?? 'completado'} className={inputClass}>
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <textarea
          name="notes"
          defaultValue={initialData?.notes}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitBtn label={submitLabel} />
        <a href="/admin/historial" className="text-sm text-gray-500 hover:text-gray-700">
          Cancelar
        </a>
      </div>
    </form>
  )
}
