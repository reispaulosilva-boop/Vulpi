'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { formulacoes } from '@/app/data/formulations'
import StatusBadge from './StatusBadge'
import ViaBadge from './ViaBadge'

interface FiltersState {
  search: string
  line: string
  statuses: Record<string, boolean>
}

export default function DashboardTable() {
  const searchParams = useSearchParams()
  const currentLine = searchParams.get('linha') || ''

  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    line: currentLine,
    statuses: {
      'EM USO': true,
      NOVO: true,
      PROPOSTO: true,
    },
  })

  // Filtrar formulações
  const filteredFormulacoes = useMemo(() => {
    let result = formulacoes

    // Filtro por linha terapêutica
    if (filters.line) {
      result = result.filter((f) => f.linhaSlug === filters.line)
    }

    // Filtro por status
    result = result.filter((f) => filters.statuses[f.status])

    // Filtro por busca (código, nome, ativos)
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter((f) => {
        const codigoMatch = f.id.toLowerCase().includes(query)
        const nomeMatch = f.nome.toLowerCase().includes(query)
        const ativosMatch = f.ativos.some((a) =>
          a.nome.toLowerCase().includes(query)
        )
        return codigoMatch || nomeMatch || ativosMatch
      })
    }

    return result
  }, [filters])

  // Estatísticas
  const stats = {
    total: formulacoes.length,
    emUso: formulacoes.filter((f) => f.status === 'EM USO').length,
    aguardandoValidacao: formulacoes.filter((f) => f.status === 'PROPOSTO')
      .length,
    linhasAtivas: new Set(formulacoes.map((f) => f.linhaSlug)).size,
  }

  const handleStatusToggle = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      statuses: {
        ...prev.statuses,
        [status]: !prev.statuses[status],
      },
    }))
  }

  return (
    <div className="space-y-8">
      {/* Barra superior */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <h1
            className="text-3xl font-semibold text-stone-900 mb-2"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Protocolos de Prescrição
          </h1>
        </div>
        <button className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap">
          Nova Prescrição
        </button>
      </div>

      {/* Busca */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por condição, código ou ativo..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
        />
        <svg
          className="absolute right-3 top-3 w-5 h-5 text-stone-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-stone-200 p-4">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-2">
            Total de Formulações
          </p>
          <p className="text-2xl font-semibold text-stone-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-stone-200 p-4">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-2">
            Em Uso Clínico
          </p>
          <p className="text-2xl font-semibold text-stone-900">{stats.emUso}</p>
        </div>
        <div className="bg-white rounded-lg border border-stone-200 p-4">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-2">
            Aguardando Validação
          </p>
          <p className="text-2xl font-semibold text-stone-900">
            {stats.aguardandoValidacao}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-stone-200 p-4">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-2">
            Linhas Ativas
          </p>
          <p className="text-2xl font-semibold text-stone-900">
            {stats.linhasAtivas}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white rounded-lg border border-stone-200 p-4">
        <div className="flex items-center gap-4">
          {['EM USO', 'NOVO', 'PROPOSTO'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusToggle(status)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filters.statuses[status]
                  ? 'bg-stone-100 text-stone-900'
                  : 'bg-stone-50 text-stone-400'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.statuses[status]}
                onChange={() => {}}
                className="w-4 h-4"
              />
              {status}
            </button>
          ))}
        </div>
        <div className="text-xs text-stone-500">
          {filteredFormulacoes.length} resultado
          {filteredFormulacoes.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-white rounded-lg border border-stone-200">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Código
              </th>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Nome
              </th>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Linha
              </th>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Via
              </th>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium text-stone-700 text-xs uppercase tracking-wider">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFormulacoes.length > 0 ? (
              filteredFormulacoes.map((formulacao) => (
                <tr
                  key={formulacao.id}
                  className="border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer"
                  onClick={() => {
                    // Redireciona para detalhe ao clicar na linha
                    window.location.href = `/formulacao/${formulacao.id}`
                  }}
                >
                  <td className="px-6 py-4">
                    <span
                      className="text-stone-600 font-mono text-xs tracking-wider"
                      style={{ fontFamily: 'var(--font-roboto-mono, monospace)' }}
                    >
                      {formulacao.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-800 font-medium">
                    {formulacao.nome}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-medium"
                      style={{ color: formulacao.acento_cor }}
                    >
                      {formulacao.linha}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ViaBadge via={formulacao.via} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={formulacao.status} />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/formulacao/${formulacao.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Prescrever
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                  Nenhuma formulação encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
