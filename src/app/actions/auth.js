'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Email o contraseña incorrectos' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  const cookieStore = await cookies()
  cookieStore.set('user-role', profile?.role ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  if (profile?.role === 'admin') redirect('/admin')
  else if (profile?.role === 'employee') redirect('/empleado')
  else redirect('/cliente')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const cookieStore = await cookies()
  cookieStore.delete('user-role')

  redirect('/login')
}
