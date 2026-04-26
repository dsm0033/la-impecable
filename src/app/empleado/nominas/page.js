import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export const metadata = { title: 'Mis nóminas · IMPECABLE' }

function formatMonth(m) {
  const [y, mo] = m.split('-')
  return new Date(+y, +mo - 1, 1)
    .toLocaleString('es-ES', { month: 'long', year: 'numeric' })
    .replace(/^\w/, c => c.toUpperCase())
}

export default async function MisNominasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: employee } = await supabase
    .from('employees')
    .select('id, full_name')
    .eq('email', user.email)
    .single()

  if (!employee) redirect('/empleado')

  const { data: payslips } = await supabase
    .from('payslips')
    .select('id, month, uploaded_at')
    .eq('employee_id', employee.id)
    .order('month', { ascending: false })

  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#E8E6E1]">
      <header className="bg-[#111820] border-b border-[#1E2A38] px-4 py-4 flex items-center gap-3">
        <Link
          href="/empleado"
          className="text-[#8A9AAC] hover:text-[#E8E6E1] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <p className="text-xs text-[#C9A84C] font-medium uppercase tracking-wider">IMPECABLE</p>
          <h1 className="font-bold text-lg">Mis nóminas</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {!payslips?.length ? (
          <div className="bg-[#111820] rounded-xl border border-[#1E2A38] p-12 text-center">
            <FileText size={32} className="mx-auto mb-3 text-[#8A9AAC]" />
            <p className="text-[#8A9AAC]">No hay nóminas disponibles todavía.</p>
            <p className="text-xs text-[#4A5A6A] mt-1">Tu administrador las irá subiendo cada mes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {payslips.map(p => (
              <div
                key={p.id}
                className="bg-[#111820] rounded-xl border border-[#1E2A38] px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-[#C9A84C] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#E8E6E1]">{formatMonth(p.month)}</p>
                    <p className="text-xs text-[#8A9AAC] mt-0.5">
                      Disponible desde el {new Date(p.uploaded_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <a
                  href={`/api/nominas/${p.id}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3 py-1.5 text-xs font-semibold text-[#C9A84C] border border-[#C9A84C]/40 rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
                >
                  Descargar PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
