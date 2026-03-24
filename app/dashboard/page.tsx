import { Suspense } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardTable from '@/components/DashboardTable'

export const metadata = {
  title: 'Dashboard | VULPI – Protocolos de Prescrição',
  description: 'Dashboard de protocolos de prescrição magistral dermatológica',
}

function DashboardContent() {
  return <DashboardTable />
}

export default function DashboardPage() {
  return (
    <div className="flex">
      <DashboardSidebar />

      {/* Área principal */}
      <main className="flex-1 ml-60 px-6 sm:px-8 py-8">
        <Suspense fallback={<div className="text-stone-500">Carregando...</div>}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  )
}
