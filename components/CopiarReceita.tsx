'use client'
import { useState } from 'react'
import { Formulacao } from '@/app/data/formulations'

export default function CopiarReceita({ formulacao }: { formulacao: Formulacao }) {
  const [copiado, setCopiado] = useState(false)

  const gerarTexto = () => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    const ativos = formulacao.ativos
      .map(a => `• ${a.nome} — ${a.concentracao}${a.via ? ` (${a.via})` : ''}${a.fornecedor ? ` — ${a.fornecedor}` : ''}`)
      .join('\n')

    return `─────────────────────────────────────
VULPI — Alta Dermatologia Magistral
Clínica Crepaldi | Dr. Paulo Silva Reis
─────────────────────────────────────
FORMULAÇÃO: ${formulacao.nome}
CÓDIGO: ${formulacao.id}
LINHA: ${formulacao.linha}
STATUS: ${formulacao.status}
─────────────────────────────────────
INDICAÇÃO:
${formulacao.indicacao}

ATIVOS:
${ativos}

VEÍCULO: ${formulacao.veiculo}
DURAÇÃO: ${formulacao.duracao}
VIA: ${formulacao.via}

POSOLOGIA:
${formulacao.posologia}${formulacao.observacoes ? '\n\nOBSERVAÇÕES CLÍNICAS:\n' + formulacao.observacoes : ''}${formulacao.equivalente_industrializado ? '\n\nEQUIVALENTE INDUSTRIALIZADO: ' + formulacao.equivalente_industrializado : ''}
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
      className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded transition-all duration-200 hover:opacity-80"
    >
      {copiado ? '✓ Copiado!' : '📋 Copiar Receita'}
    </button>
  )
}
