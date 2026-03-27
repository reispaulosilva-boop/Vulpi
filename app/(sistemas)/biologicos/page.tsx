'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SenhaGate from '@/components/biologicos/SenhaGate'
import BotaoVoltar from '@/components/BotaoVoltar'

export default function BiologicosPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const autenticado = sessionStorage.getItem('biologicos_auth')
      if (autenticado === 'true') {
        router.replace('/biologicos/selecao')
      }
    }
  }, [router])

  function handleAutenticar() {
    sessionStorage.setItem('biologicos_auth', 'true')
    router.push('/biologicos/selecao')
  }

  return (
    <div className="relative">
      <div className="absolute top-6 left-6">
        <BotaoVoltar />
      </div>
      <SenhaGate onAutenticar={handleAutenticar} />
    </div>
  )
}
