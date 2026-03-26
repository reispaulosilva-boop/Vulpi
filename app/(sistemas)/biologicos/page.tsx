'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SenhaGate from '@/components/biologicos/SenhaGate'

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

  return <SenhaGate onAutenticar={handleAutenticar} />
}
