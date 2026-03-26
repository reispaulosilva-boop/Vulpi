'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DestinoCard from '@/components/biologicos/DestinoCard'

export default function PrescritorPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const autenticado = sessionStorage.getItem('biologicos_auth')
      if (autenticado !== 'true') {
        router.replace('/biologicos')
      }
    }
  }, [router])

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: '#FAFAF8' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p
            className="text-xs text-stone-400 uppercase tracking-widest mb-2"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Sistema Biológicos — Prescritor
          </p>
          <h1
            className="text-3xl text-stone-900"
            style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 400 }}
          >
            Destino do laudo
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DestinoCard
            titulo="Operadora de Saúde"
            descricao="Laudo para solicitação de autorização em plano de saúde privado"
            href="/biologicos/prescritor/operadora"
            ativo={true}
          />
          <DestinoCard
            titulo="SUS"
            descricao="Laudo para solicitação via sistema público de saúde"
            href="/biologicos/prescritor/sus"
            ativo={false}
          />
        </div>
      </div>
    </div>
  )
}
