import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ChecklistForm } from '../../_components/ChecklistForm'
import { editarChecklist } from '../../actions'

export const metadata = { title: 'Editar checklist · Admin IMPECABLE' }

export default async function EditarChecklistPage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .eq('id', user?.id)
    .single()

  const { data: checklist } = await supabase
    .from('checklists')
    .select('id, name, items')
    .eq('id', id)
    .eq('business_id', profile?.business_id)
    .single()

  if (!checklist) notFound()

  const action = editarChecklist.bind(null, id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Editar checklist</h1>
        <p className="text-gray-500 mt-1">{checklist.name}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ChecklistForm action={action} initialData={checklist} submitLabel="Guardar cambios" />
      </div>
    </div>
  )
}
