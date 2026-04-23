import { ServicioForm } from '../_components/ServicioForm'
import { crearServicio } from '@/app/actions/services'

export const metadata = { title: 'Nuevo servicio · Admin IMPECABLE' }

export default function NuevoServicioPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo servicio</h1>
        <p className="text-gray-500 mt-1">Añade un servicio a tu catálogo</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ServicioForm action={crearServicio} submitLabel="Crear servicio" />
      </div>
    </div>
  )
}
