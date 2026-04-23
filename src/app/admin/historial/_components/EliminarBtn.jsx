'use client'

import { useTransition } from 'react'
import { eliminarRegistro } from '../actions'

export function EliminarBtn({ id }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return
    startTransition(() => eliminarRegistro(id))
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
