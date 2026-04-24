import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

const protectedPaths = ['/admin', '/empleado', '/cliente']
const authPaths = ['/login']

export async function proxy(request) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Valida y refresca el token contra el servidor de Supabase
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isProtected = protectedPaths.some(p => path.startsWith(p))
  const isAuthPath = authPaths.includes(path)

  // Sin sesión intentando entrar a ruta protegida → login
  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Con sesión intentando entrar al login → su panel
  if (isAuthPath && user) {
    const role = request.cookies.get('user-role')?.value
    const dest = role === 'admin' ? '/admin' : role === 'employee' ? '/empleado' : '/cliente'
    return NextResponse.redirect(new URL(dest, request.nextUrl))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}
