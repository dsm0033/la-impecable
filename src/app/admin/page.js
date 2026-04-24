import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Users, Wrench, UserCheck, ClipboardList } from 'lucide-react'

async function getStats(businessId) {
  const supabase = await createClient()

  const firstOfMonth = new Date()
  firstOfMonth.setDate(1)
  const desde = firstOfMonth.toISOString().split('T')[0]

  const [
    { count: clients },
    { count: employees },
    { count: services },
    { count: serviciosMes },
    { count: pendingCount },
  ] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('employees').select('*', { count: 'exact', head: true }).eq('business_id', businessId).eq('active', true),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('business_id', businessId).eq('active', true),
    supabase.from('service_records').select('*', { count: 'exact', head: true }).eq('business_id', businessId).gte('date', desde),
    supabase.from('service_records').select('*', { count: 'exact', head: true }).eq('business_id', businessId).eq('status', 'pendiente'),
  ])

  return {
    clients: clients ?? 0,
    employees: employees ?? 0,
    services: services ?? 0,
    serviciosMes: serviciosMes ?? 0,
    pendientes: pendingCount ?? 0,
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_id')
    .eq('id', user.id)
    .single()

  const stats = await getStats(profile?.business_id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido, {profile?.full_name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users}         label="Clientes"          value={stats.clients}      color="blue"   href="/admin/clientes" />
        <StatCard icon={UserCheck}     label="Empleados activos" value={stats.employees}    color="green"  href="/admin/empleados" />
        <StatCard icon={Wrench}        label="Servicios activos" value={stats.services}     color="yellow" href="/admin/servicios" />
        <StatCard icon={ClipboardList} label="Servicios este mes" value={stats.serviciosMes} color="purple" href="/admin/historial" pending={stats.pendientes} />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, href, pending }) {
  const colors = {
    blue:   'bg-blue-50 text-blue-600',
    green:  'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <Link href={href} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 block transition-transform hover:-translate-y-1">
      <div className={`inline-flex p-3 rounded-lg ${colors[color]} mb-4`}>
        <Icon size={22} />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      {pending > 0 && (
        <p className="text-xs text-red-500 font-medium mt-2">{pending} pendiente{pending > 1 ? 's' : ''}</p>
      )}
    </Link>
  )
}
