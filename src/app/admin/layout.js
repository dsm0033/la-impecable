import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/AdminSidebar'

export const metadata = {
  title: 'Panel Admin · IMPECABLE',
}

export default async function AdminLayout({ children }) {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('business_id')
    .single()

  const { count: pendingCount } = await supabase
    .from('service_records')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', profile?.business_id)
    .eq('status', 'pendiente')

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar pendingCount={pendingCount ?? 0} />
      <main className="w-full md:ml-64 flex-1 p-4 md:p-8 pt-18 md:pt-8">
        {children}
      </main>
    </div>
  )
}
