import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ServicioForm } from '../../_components/ServicioForm'
import { editarServicio } from '@/app/actions/services'

export const metadata = { title: 'Editar servicio · Admin IMPECABLE' }

export default async function EditarServicioPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .single()

  const { data: servicio } = await supabase
    .from('services')
    .select('id, name, description, price, duration_minutes, icon, highlight')
    .eq('id', id)
    .eq('business_id', profile?.business_id)
    .single()

  if (!servicio) notFound()

  const action = editarServicio.bind(null, id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Editar servicio</h1>
        <p className="text-gray-500 mt-1">{servicio.name}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ServicioForm action={action} initialData={servicio} submitLabel="Guardar cambios" />
      </div>
    </div>
  )
}
