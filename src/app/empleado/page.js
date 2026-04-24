import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ClipboardList, LogOut, Calendar, User, CheckCircle2, LayoutDashboard } from 'lucide-react'

export const metadata = { title: 'Mis trabajos · IMPECABLE' }

export default async function EmpleadoPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: employee }, { data: profile }] = await Promise.all([
    supabase.from('employees').select('id, full_name').eq('email', user.email).single(),
    supabase.from('profiles').select('role').eq('id', user.id).single(),
  ])

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

  const [{ data: pendientes }, { data: completados }] = await Promise.all([
    supabase
      .from('service_records')
      .select('id, date, checklist_progress, services(name, duration_minutes), customers(full_name)')
      .eq('employee_id', employee.id)
      .eq('status', 'pendiente')
      .order('date', { ascending: true }),
    supabase
      .from('service_records')
      .select('id, date, completed_at, services(name), customers(full_name)')
      .eq('employee_id', employee.id)
      .eq('status', 'completado')
      .order('completed_at', { ascending: false })
      .limit(20),
  ])

  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#E8E6E1]">
      <header className="bg-[#111820] border-b border-[#1E2A38] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#C9A84C] font-medium uppercase tracking-wider">IMPECABLE</p>
          <h1 className="font-bold text-lg">{employee.full_name}</h1>
        </div>
        <div className="flex items-center gap-3">
          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm text-[#8A9AAC] hover:text-[#C9A84C] transition-colors"
            >
              <LayoutDashboard size={16} />
              Admin
            </Link>
          )}
          <form action={logout}>
            <button type="submit" className="flex items-center gap-1 text-sm text-[#8A9AAC] hover:text-red-400 transition-colors">
              <LogOut size={16} />
              Salir
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">

        {/* Trabajos pendientes */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList size={22} color="#C9A84C" />
            <h2 className="text-lg font-semibold">Trabajos pendientes</h2>
            {pendientes?.length > 0 && (
              <span className="bg-[#C9A84C] text-[#0A0E14] text-xs font-bold px-2 py-0.5 rounded-full">
                {pendientes.length}
              </span>
            )}
          </div>

          {!pendientes?.length ? (
            <div className="bg-[#111820] rounded-xl border border-[#1E2A38] p-10 text-center">
              <p className="text-[#8A9AAC]">No tienes trabajos pendientes.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendientes.map((t) => {
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
                              weekday: 'long', day: 'numeric', month: 'long',
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
        </section>

        {/* Historial de trabajos completados */}
        {completados?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 size={22} color="#22c55e" />
              <h2 className="text-lg font-semibold">Trabajos completados</h2>
              <span className="text-xs text-[#8A9AAC]">(últimos {completados.length})</span>
            </div>

            <div className="space-y-2">
              {completados.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#111820] rounded-xl border border-[#1E2A38] px-4 py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#E8E6E1]">{t.services?.name ?? 'Servicio'}</p>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-[#8A9AAC]">
                      <User size={11} />
                      <span className="truncate">{t.customers?.full_name ?? '—'}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 text-xs text-[#8A9AAC]">
                    {t.completed_at
                      ? new Date(t.completed_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
                      : new Date(t.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
                    }
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
