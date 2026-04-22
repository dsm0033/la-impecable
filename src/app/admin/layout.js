import AdminSidebar from '@/components/AdminSidebar'

export const metadata = {
  title: 'Panel Admin · IMPECABLE',
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
