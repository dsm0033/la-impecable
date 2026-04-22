import AdminSidebar from '@/components/AdminSidebar'

export const metadata = {
  title: 'Panel Admin · IMPECABLE',
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="w-full md:ml-64 flex-1 p-4 md:p-8 pt-18 md:pt-8">
        {children}
      </main>
    </div>
  )
}
