'use client'

import { useActionState } from 'react'

export default function ConfigVacacionesForm({ action, maxConcurrent }) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="flex items-end gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Máximo de empleados de vacaciones a la vez
        </label>
        <input
          type="number"
          name="max_concurrent_vacations"
          min="1"
          max="20"
          defaultValue={maxConcurrent ?? 1}
          required
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {pending ? 'Guardando…' : 'Guardar'}
      </button>
      {state?.error && <p className="text-sm text-red-600 mt-1">{state.error}</p>}
      {state?.ok    && <p className="text-sm text-green-600 mt-1">Guardado.</p>}
    </form>
  )
}
