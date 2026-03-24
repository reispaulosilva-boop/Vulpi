'use client'
import { useState } from 'react'
import { Formulacao } from '@/app/data/formulations'

export default function CopiarReceita({ formulacao }: { formulacao: Formulacao }) {
  const [copiado, setCopiado] = useState(false)

  const gerarTexto = () => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    const sep = '─────────────────────────────────────'
    const ativos = formulacao.ativos
      .map(a => `• ${a.nome} — ${a.concentracao}${a.fornecedor ? ` — ${a.fornecedor}` : ''}`)
      .join('\n')

    return `${sep}
VULPI — Alta Dermatologia Magistral
Clínica Crepaldi | Dr. Paulo Silva Reis
${sep}
FORMULAÇÃO: ${formulacao.nome}
CÓDIGO: ${formulacao.codigo}
LINHA: ${formulacao.linha}
STATUS: ${formulacao.status}
${sep}
INDICAÇÃO:
${formulacao.indicacao}

ATIVOS:
${ativos}

VEÍCULO: ${formulacao.veiculo}
DURAÇÃO: ${formulacao.duracao}
VIA: ${formulacao.via}

POSOLOGIA:
${formulacao.posologia}${formulacao.obs ? '\n\nOBSERVAÇÕES CLÍNICAS:\n' + formulacao.obs : ''}${formulacao.equivalenteIndustrializado ? '\n\nEQUIVALENTE INDUSTRIALIZADO: ' + formulacao.equivalenteIndustrializado : ''}
${sep}
Prescrito por: Dr. Paulo Silva Reis — CRM-MT
Data: ${hoje}
${sep}`
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(gerarTexto())
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      // fallback para navegadores sem suporte
      const el = document.createElement('textarea')
      el.value = gerarTexto()
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  return (
    <button
      onClick={copiar}
      style={{ backgroundColor: copiado ? '#2d6a4f' : '#1C1C1A' }}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-medium rounded transition-all duration-200 hover:opacity-80 cursor-pointer"
    >
      <span>{copiado ? '✓' : '📋'}</span>
      <span>{copiado ? 'Receita copiada!' : 'Copiar Receita para a Prescrição'}</span>
    </button>
  )
}
