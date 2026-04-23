'use client'

import { useTransition } from 'react'
import { eliminarServicio } from '@/app/actions/services'

export function EliminarBtn({ id }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return
    startTransition(() => eliminarServicio(id))
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
