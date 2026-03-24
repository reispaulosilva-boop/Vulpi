import { Suspense } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardTable from '@/components/DashboardTable'

export const metadata = {
  title: 'Dashboard | VULPI – Protocolos de Prescrição',
  description: 'Dashboard de protocolos de prescrição magistral dermatológica',
}

const SidebarFallback = () => (
  <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-60 bg-white border-r border-stone-200" />
)

const TableFallback = () => (
  <div className="flex items-center justify-center h-48 text-stone-400 text-sm">
    Carregando...
  </div>
)

export default function DashboardPage() {
  return (
    <div className="flex">
      <Suspense fallback={<SidebarFallback />}>
        <DashboardSidebar />
      </Suspense>

      <main className="flex-1 ml-60 px-6 sm:px-8 py-8">
        <Suspense fallback={<TableFallback />}>
          <DashboardTable />
        </Suspense>
      </main>
    </div>
  )
}
