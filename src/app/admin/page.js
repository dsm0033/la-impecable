import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Users, Wrench, UserCheck } from 'lucide-react'

async function getStats(businessId) {
  const supabase = await createClient()
  const [
    { count: clients },
    { count: employees },
    { count: services },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client').eq('business_id', businessId),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'employee').eq('business_id', businessId),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
  ])
  return { clients: clients ?? 0, employees: employees ?? 0, services: services ?? 0 }
}

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_id')
    .single()

  const stats = await getStats(profile?.business_id)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido, {profile?.full_name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={Users} label="Clientes" value={stats.clients} color="blue" href="/admin/clientes" />
        <StatCard icon={UserCheck} label="Empleados" value={stats.employees} color="green" href="/admin/empleados" />
        <StatCard icon={Wrench} label="Servicios" value={stats.services} color="yellow" href="/admin/servicios" />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, href }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }
  return (
    <Link href={href} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 block transition-transform hover:-translate-y-1">
      <div className={`inline-flex p-3 rounded-lg ${colors[color]} mb-4`}>
        <Icon size={22} />
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </Link>
  )
}
