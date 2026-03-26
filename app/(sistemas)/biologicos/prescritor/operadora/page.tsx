'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WizardContainer from '@/components/biologicos/wizard/WizardContainer'

export default function OperadoraPage() {
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
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-4">
        <p
          className="text-xs text-stone-400 uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Sistema Biológicos — Prescritor — Operadora de Saúde
        </p>
      </div>
      <WizardContainer />
    </div>
  )
}
