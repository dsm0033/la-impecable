import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ClipboardList, LogOut, Calendar, User } from 'lucide-react'

export const metadata = { title: 'Mis trabajos · IMPECABLE' }

export default async function EmpleadoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: employee } = await supabase
    .from('employees')
    .select('id, full_name')
    .eq('email', user.email)
    .single()

  if (!employee) {
    return (
      <main className="min-h-screen bg-[#0A0E14] text-[#E8E6E1] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8A9AAC] mb-6">Tu cuenta no está vinculada a ningún empleado.</p>
          <form action={logout}>
            <button type="submit" className="text-sm text-red-400 hover:underline">Cerrar sesión</button>
          </form>
        </div>
      </main>
    )
  }

  const { data: trabajos } = await supabase
    .from('service_records')
    .select('id, date, checklist_progress, services(name, duration_minutes), customers(full_name)')
    .eq('employee_id', employee.id)
    .eq('status', 'pendiente')
    .order('date', { ascending: true })

  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#E8E6E1]">
      <header className="bg-[#111820] border-b border-[#1E2A38] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#C9A84C] font-medium uppercase tracking-wider">IMPECABLE</p>
          <h1 className="font-bold text-lg">{employee.full_name}</h1>
        </div>
        <form action={logout}>
          <button type="submit" className="flex items-center gap-1 text-sm text-[#8A9AAC] hover:text-red-400 transition-colors">
            <LogOut size={16} />
            Salir
          </button>
        </form>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList size={24} color="#C9A84C" />
          <h2 className="text-xl font-semibold">Trabajos pendientes</h2>
        </div>

        {!trabajos || trabajos.length === 0 ? (
          <div className="bg-[#111820] rounded-xl border border-[#1E2A38] p-10 text-center">
            <p className="text-[#8A9AAC]">No tienes trabajos pendientes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trabajos.map((t) => {
              const progress = Array.isArray(t.checklist_progress) ? t.checklist_progress : []
              const enCurso = progress.length > 0
              return (
                <Link
                  key={t.id}
                  href={`/empleado/${t.id}`}
                  className="block bg-[#111820] rounded-xl border border-[#1E2A38] p-4 hover:border-[#C9A84C] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#E8E6E1]">{t.services?.name ?? 'Servicio'}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-[#8A9AAC]">
                        <User size={13} />
                        <span className="truncate">{t.customers?.full_name ?? 'Cliente no registrado'}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-[#8A9AAC]">
                        <Calendar size={13} />
                        <span>
                          {new Date(t.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {t.services?.duration_minutes && (
                        <p className="text-sm text-[#8A9AAC]">{t.services.duration_minutes} min</p>
                      )}
                      {enCurso && (
                        <p className="text-xs text-[#C9A84C] mt-1 font-medium">En curso</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
