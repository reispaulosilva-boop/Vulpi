'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ModuloCard from '@/components/biologicos/ModuloCard'

export default function SelecaoPage() {
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
            Sistema Biológicos
          </p>
          <h1
            className="text-3xl text-stone-900"
            style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 400 }}
          >
            Selecione o módulo
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ModuloCard
            titulo="Prescritor"
            descricao="Geração de laudos para autorização de medicamentos biológicos"
            href="/biologicos/prescritor"
            ativo={true}
          />
          <ModuloCard
            titulo="Auditor"
            descricao="Análise e revisão de laudos recebidos"
            href="/biologicos/auditor"
            ativo={false}
          />
        </div>
      </div>
    </div>
  )
}
