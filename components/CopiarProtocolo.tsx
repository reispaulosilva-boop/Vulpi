'use client'
import { useState } from 'react'
import { getFormulacaoById } from '@/app/data/linha-config'

export default function CopiarProtocolo({ condicao, codigos }: { condicao: string, codigos: string[] }) {
  const [copiado, setCopiado] = useState(false)

  const gerarTexto = () => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    const sep = '─────────────────────────────────────'
    const detalhes = codigos.map(codigo => {
      const f = getFormulacaoById(codigo)
      if (!f) return `${codigo} — (ver prescrição específica)`
      const ativos = f.ativos.map((a) => `${a.nome} ${a.concentracao}`).join(', ')
      return `${f.codigo} — ${f.nome}
Via: ${f.via} | Duração: ${f.duracao}
Posologia: ${f.posologia}
Ativos: ${ativos}
Veículo: ${f.veiculo}`
    }).join('\n\n')

    return `${sep}
VULPI — Protocolo Clínico
Clínica Crepaldi | Dr. Paulo Silva Reis
${sep}
CONDIÇÃO: ${condicao}
${sep}

FORMULAÇÕES DO PROTOCOLO:

${detalhes}

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
      className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-medium rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap cursor-pointer"
    >
      <span>{copiado ? '✓' : '📋'}</span>
      <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
    </button>
  )
}
