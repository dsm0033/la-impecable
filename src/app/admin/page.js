import { logout } from '@/app/actions/auth'

export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Panel Admin</h1>
        <p className="text-gray-500 mb-6">Bienvenido, Diego</p>
        <form action={logout}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  )
}
