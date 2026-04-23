'use client'

import { useTransition } from 'react'
import { eliminarChecklist } from '../actions'

export function EliminarBtn({ id }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('¿Eliminar este checklist? Esta acción no se puede deshacer.')) return
    startTransition(() => eliminarChecklist(id))
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="text-red-500 hover:text-red-700 text-sm disabled:opacity-40 transition-colors"
    >
      {pending ? '...' : 'Eliminar'}
    </button>
  )
}
