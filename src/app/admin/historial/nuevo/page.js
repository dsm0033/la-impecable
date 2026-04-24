import { createClient } from '@/lib/supabase/server'
import { RegistroForm } from '../_components/RegistroForm'
import { crearRegistro } from '../actions'

export const metadata = { title: 'Registrar servicio · Admin IMPECABLE' }

export default async function NuevoRegistroPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const bid = profile?.business_id

  const [{ data: clientes }, { data: servicios }, { data: empleados }] = await Promise.all([
    supabase.from('customers').select('id, full_name').eq('business_id', bid).order('full_name'),
    supabase.from('services').select('id, name, price').eq('business_id', bid).eq('active', true).order('sort_order'),
    supabase.from('employees').select('id, full_name').eq('business_id', bid).eq('active', true).order('full_name'),
  ])

  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Registrar servicio</h1>
        <p className="text-gray-500 mt-1">Añade un servicio realizado al historial</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <RegistroForm
          action={crearRegistro}
          clientes={clientes ?? []}
          servicios={servicios ?? []}
          empleados={empleados ?? []}
          initialData={{ date: today }}
          submitLabel="Registrar servicio"
        />
      </div>
    </div>
  )
}
