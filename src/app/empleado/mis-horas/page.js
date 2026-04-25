import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'

export const metadata = { title: 'Mis horas · IMPECABLE' }

// Primer día de la semana en curso (lunes)
function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay() // 0=dom, 1=lun...
  const diff = day === 0 ? 6 : day - 1
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function minutosEntreFechas(inicio, fin) {
  return Math.round((new Date(fin) - new Date(inicio)) / 60000)
}

function formatHoras(minutos) {
  if (minutos <= 0) return '0h'
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  if (h === 0) return `${m}min`
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

function formatHora(iso) {
  return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export default async function MisHorasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: employee } = await supabase
    .from('employees')
    .select('id, full_name')
    .eq('email', user.email)
    .single()
  if (!employee) redirect('/empleado')

  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const semanaInicio = startOfWeek(now).toISOString().split('T')[0]
  const mesInicio = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  // Historial: últimos 2 meses
  const historialInicio = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0]

  const [{ data: entradas }, { data: schedules }] = await Promise.all([
    supabase
      .from('time_entries')
      .select('id, date, clock_in, clock_out, notes')
      .eq('employee_id', employee.id)
      .gte('date', historialInicio)
      .order('date', { ascending: false })
      .order('clock_in', { ascending: false }),
    supabase
      .from('employee_schedules')
      .select('day_of_week, contracted_minutes')
      .eq('employee_id', employee.id)
      .is('effective_until', null),
  ])

  const todas = entradas ?? []

  // Mapa day_of_week → contracted_minutes (0 = libre)
  // Conversión JS getDay() [0=dom] → convención española [0=lun]
  const horario = Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [i, 0])
  )
  ;(schedules ?? []).forEach(s => { horario[s.day_of_week] = s.contracted_minutes })

  function jsDayToEs(jsDay) {
    return jsDay === 0 ? 6 : jsDay - 1
  }

  function contratadosParaDia(dateStr) {
    const d = new Date(dateStr)
    return horario[jsDayToEs(d.getDay())] ?? 0
  }

  // Calcular minutos para un subconjunto de entradas
  function calcMinutos(lista) {
    return lista.reduce((acc, e) => {
      const fin = e.clock_out ?? now.toISOString()
      return acc + minutosEntreFechas(e.clock_in, fin)
    }, 0)
  }

  const minHoy = calcMinutos(todas.filter(e => e.date === today))
  const minSemana = calcMinutos(todas.filter(e => e.date >= semanaInicio))
  const minMes = calcMinutos(todas.filter(e => e.date >= mesInicio))

  // Agrupar por semana para el listado
  function getWeekKey(dateStr) {
    const d = new Date(dateStr)
    const lunes = startOfWeek(d)
    return lunes.toISOString().split('T')[0]
  }

  const porSemana = todas.reduce((acc, e) => {
    const key = getWeekKey(e.date)
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  const semanas = Object.entries(porSemana).sort(([a], [b]) => b.localeCompare(a))

  // Tarjetas de resumen
  const resumen = [
    { label: 'Hoy', valor: formatHoras(minHoy) },
    { label: 'Esta semana', valor: formatHoras(minSemana) },
    { label: 'Este mes', valor: formatHoras(minMes) },
  ]

  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#E8E6E1]">
      <header className="bg-[#111820] border-b border-[#1E2A38] px-4 py-4 flex items-center gap-4">
        <Link href="/empleado" className="text-[#8A9AAC] hover:text-[#C9A84C] transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <p className="text-xs text-[#C9A84C] font-medium uppercase tracking-wider">IMPECABLE</p>
          <h1 className="font-bold text-lg">Mis horas</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Tarjetas resumen */}
        <div className="grid grid-cols-3 gap-3">
          {resumen.map(({ label, valor }) => (
            <div key={label} className="bg-[#111820] border border-[#1E2A38] rounded-xl px-4 py-4 text-center">
              <p className="text-xl font-bold text-[#C9A84C]">{valor}</p>
              <p className="text-xs text-[#8A9AAC] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Listado por semana */}
        {semanas.length === 0 ? (
          <div className="bg-[#111820] border border-[#1E2A38] rounded-xl p-10 text-center">
            <Clock size={32} className="mx-auto mb-3 text-[#8A9AAC]" />
            <p className="text-[#8A9AAC]">Aún no tienes fichajes registrados.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {semanas.map(([lunesStr, entradasSemana]) => {
              const lunes = new Date(lunesStr)
              const domingo = new Date(lunes)
              domingo.setDate(lunes.getDate() + 6)
              const labelSemana = `${lunes.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} – ${domingo.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
              const minTotalSemana = calcMinutos(entradasSemana)

              // Agrupar por día dentro de la semana
              const porDia = entradasSemana.reduce((acc, e) => {
                if (!acc[e.date]) acc[e.date] = []
                acc[e.date].push(e)
                return acc
              }, {})
              const dias = Object.entries(porDia).sort(([a], [b]) => b.localeCompare(a))

              return (
                <div key={lunesStr}>
                  {/* Cabecera semana */}
                  <div className="bg-[#111820] border border-[#1E2A38] rounded-xl px-4 py-3 mb-2 flex items-center justify-between">
                    <p className="font-semibold text-[#C9A84C] text-sm">{labelSemana}</p>
                    <p className="text-sm font-semibold text-[#C9A84C]">{formatHoras(minTotalSemana)}</p>
                  </div>

                  {/* Días de la semana */}
                  <div className="space-y-1">
                    {dias.map(([dia, fichajesDia]) => {
                      const minDia = calcMinutos(fichajesDia)
                      const labelDia = new Date(dia).toLocaleDateString('es-ES', {
                        weekday: 'long', day: 'numeric', month: 'long',
                      })
                      const contratados = contratadosParaDia(dia)
                      const extra = contratados > 0 ? minDia - contratados : null

                      return (
                        <div key={dia} className="bg-[#111820] border border-[#1E2A38] rounded-xl px-4 py-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-[#E8E6E1]">{labelDia.replace(/^\w/, c => c.toUpperCase())}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-[#C9A84C]">{formatHoras(minDia)}</p>
                              {extra !== null && extra !== 0 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${extra > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                  {extra > 0 ? '+' : ''}{formatHoras(extra)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="space-y-1">
                            {fichajesDia.map((e) => (
                              <div key={e.id} className="flex items-center justify-between text-xs text-[#8A9AAC]">
                                <span>
                                  {formatHora(e.clock_in)} → {e.clock_out ? formatHora(e.clock_out) : 'En curso'}
                                </span>
                                <span className="text-[#C9A84C]">{formatHoras(minutosEntreFechas(e.clock_in, e.clock_out ?? now.toISOString()))}</span>
                              </div>
                            ))}
                            {contratados > 0 && (
                              <p className="text-xs text-[#8A9AAC]/50 pt-0.5">Jornada: {formatHoras(contratados)}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
