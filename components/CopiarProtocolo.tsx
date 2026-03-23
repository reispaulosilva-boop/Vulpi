'use client'
import { useState } from 'react'
import { getFormulacaoById } from '@/app/data/formulations'

export default function CopiarProtocolo({ condicao, codigos }: { condicao: string, codigos: string[] }) {
  const [copiado, setCopiado] = useState(false)

  const gerarTexto = () => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    const detalhes = codigos.map(codigo => {
      const f = getFormulacaoById(codigo)
      if (!f) return `${codigo} — (ver prescrição específica)`
      const ativos = f.ativos.map(a => `${a.nome} ${a.concentracao}`).join(', ')
      return `${f.id} — ${f.nome}
Via: ${f.via} | Duração: ${f.duracao}
Posologia: ${f.posologia}
Ativos: ${ativos}
Veículo: ${f.veiculo}`
    }).join('\n\n')

    return `─────────────────────────────────────
VULPI — Protocolo Clínico
Clínica Crepaldi | Dr. Paulo Silva Reis
─────────────────────────────────────
CONDIÇÃO: ${condicao}
─────────────────────────────────────

FORMULAÇÕES DO PROTOCOLO:

${detalhes}

─────────────────────────────────────
Prescrito por: Dr. Paulo Silva Reis — CRM-MT
Data: ${hoje}
─────────────────────────────────────`
  }

  const copiar = async () => {
    await navigator.clipboard.writeText(gerarTexto())
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <button
      onClick={copiar}
      style={{ backgroundColor: copiado ? '#2d6a4f' : '#1C1C1A' }}
      className="flex items-center gap-2 px-3 py-1.5 text-white text-xs font-medium rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap"
    >
      {copiado ? '✓ Copiado!' : '📋 Copiar'}
    </button>
  )
}
