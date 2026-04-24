import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RegistroForm } from '../../_components/RegistroForm'
import { editarRegistro } from '../../actions'

export const metadata = { title: 'Editar registro · Admin IMPECABLE' }

export default async function EditarRegistroPage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const bid = profile?.business_id

  const [{ data: registro }, { data: clientes }, { data: servicios }, { data: empleados }] =
    await Promise.all([
      supabase.from('service_records').select('*').eq('id', id).eq('business_id', bid).single(),
      supabase.from('customers').select('id, full_name').eq('business_id', bid).order('full_name'),
      supabase.from('services').select('id, name, price').eq('business_id', bid).order('sort_order'),
      supabase.from('employees').select('id, full_name').eq('business_id', bid).eq('active', true).order('full_name'),
    ])

  if (!registro) notFound()

  const action = editarRegistro.bind(null, id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Editar registro</h1>
        <p className="text-gray-500 mt-1">{new Date(registro.date).toLocaleDateString('es-ES')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <RegistroForm
          action={action}
          clientes={clientes ?? []}
          servicios={servicios ?? []}
          empleados={empleados ?? []}
          initialData={registro}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  )
}
