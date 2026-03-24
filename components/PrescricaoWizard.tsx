'use client'

import { useState, useMemo } from 'react'
import { Formulacao, buscarFormulacoes } from '@/app/data/formulations'
import { getLinhaColor } from '@/app/data/linha-config'
import StatusBadge from './StatusBadge'
import ViaBadge from './ViaBadge'
import ReceitaPreview from './ReceitaPreview'

interface DadosPaciente {
  nome: string
  dataNascimento: string
  indicacao: string
}

type Etapa = 1 | 2 | 3

// ── Indicador de etapas ─────────────────────────────────────────────────────

function StepIndicator({ etapa }: { etapa: Etapa }) {
  const steps = [
    { n: 1, label: 'Paciente' },
    { n: 2, label: 'Formulações' },
    { n: 3, label: 'Receita' },
  ]
  return (
    <div className="print:hidden flex items-center gap-0 mb-8">
      {steps.map((s, i) => {
        const done = etapa > s.n
        const active = etapa === s.n
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  done
                    ? 'bg-stone-900 text-white'
                    : active
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-400'
                }`}
              >
                {done ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <span className={`text-xs mt-1 ${active ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 h-px mx-1 mb-4 ${etapa > s.n ? 'bg-stone-900' : 'bg-stone-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Etapa 1: Dados do paciente ───────────────────────────────────────────────

function EtapaPaciente({
  dados,
  onChange,
  onAvancar,
}: {
  dados: DadosPaciente
  onChange: (d: DadosPaciente) => void
  onAvancar: () => void
}) {
  return (
    <div className="max-w-xl w-full mx-auto">
      <h2
        className="text-2xl font-semibold text-stone-900 mb-1"
        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
      >
        Dados do Paciente
      </h2>
      <p className="text-sm text-stone-400 mb-8">Preencha as informações antes de selecionar as formulações.</p>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">
            Nome completo <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={dados.nome}
            onChange={(e) => onChange({ ...dados, nome: e.target.value })}
            placeholder="Nome do paciente"
            className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">
            Data de nascimento
          </label>
          <input
            type="date"
            value={dados.dataNascimento}
            onChange={(e) => onChange({ ...dados, dataNascimento: e.target.value })}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-1.5">
            Indicação clínica
          </label>
          <textarea
            value={dados.indicacao}
            onChange={(e) => onChange({ ...dados, indicacao: e.target.value })}
            placeholder="Ex: Acne moderada grau II, melasma malar bilateral..."
            rows={3}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-sm resize-none"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onAvancar}
          disabled={!dados.nome.trim()}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Avançar
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// ── Etapa 2: Seleção de formulações ─────────────────────────────────────────

function EtapaSelecao({
  selecionadas,
  onToggle,
  onRemover,
  onVoltar,
  onGerar,
}: {
  selecionadas: Formulacao[]
  onToggle: (f: Formulacao) => void
  onRemover: (codigo: string) => void
  onVoltar: () => void
  onGerar: () => void
}) {
  const [query, setQuery] = useState('')

  const resultados = useMemo(
    () => (query.trim() ? buscarFormulacoes(query) : buscarFormulacoes('')),
    [query]
  )

  const isSelected = (codigo: string) => selecionadas.some((f) => f.codigo === codigo)

  return (
    <div className="w-full">
      <h2
        className="text-2xl font-semibold text-stone-900 mb-1"
        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
      >
        Selecionar Formulações
      </h2>
      <p className="text-sm text-stone-400 mb-6">Busque e marque as formulações para incluir na receita.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Lista de busca */}
        <div className="flex-1 min-w-0">
          <div className="relative mb-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, código, ativo ou linha..."
              className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>

          <div className="border border-stone-200 rounded-lg overflow-hidden max-h-[480px] overflow-y-auto">
            {resultados.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-10">Nenhuma formulação encontrada.</p>
            ) : (
              resultados.map((f) => {
                const selected = isSelected(f.codigo)
                return (
                  <label
                    key={f.codigo}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-stone-100 last:border-b-0 transition-colors ${
                      selected ? 'bg-stone-50' : 'hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(f)}
                      className="mt-0.5 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span
                          className="font-mono text-xs text-stone-500"
                          style={{ fontFamily: 'var(--font-roboto-mono, monospace)' }}
                        >
                          {f.codigo}
                        </span>
                        <span
                          className="text-xs font-medium px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: getLinhaColor(f.linha) }}
                        >
                          {f.linha}
                        </span>
                        <ViaBadge via={f.via} />
                        <StatusBadge status={f.status} />
                      </div>
                      <p className="text-sm font-medium text-stone-800">{f.nome}</p>
                    </div>
                  </label>
                )
              })
            )}
          </div>
          <p className="text-xs text-stone-400 mt-2">{resultados.length} formulações</p>
        </div>

        {/* Painel lateral — receita atual */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="border border-stone-200 rounded-lg bg-stone-50 sticky top-4">
            <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Receita atual
              </span>
              <span className="text-xs text-stone-400">
                {selecionadas.length} {selecionadas.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {selecionadas.length === 0 ? (
              <p className="text-xs text-stone-400 text-center py-8 px-4">
                Marque formulações para adicioná-las aqui.
              </p>
            ) : (
              <ul className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                {selecionadas.map((f) => (
                  <li key={f.codigo} className="flex items-center gap-2 px-4 py-2.5">
                    <span
                      className="font-mono text-xs text-stone-500 flex-shrink-0"
                      style={{ fontFamily: 'var(--font-roboto-mono, monospace)' }}
                    >
                      {f.codigo}
                    </span>
                    <span className="text-xs text-stone-700 flex-1 truncate">{f.nome}</span>
                    <button
                      onClick={() => onRemover(f.codigo)}
                      className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0 text-lg leading-none"
                      aria-label={`Remover ${f.nome}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onVoltar}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={onGerar}
          disabled={selecionadas.length === 0}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Gerar Receita
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

// ── Etapa 3: Preview ─────────────────────────────────────────────────────────

function EtapaPreview({
  paciente,
  formulacoes,
  onVoltar,
  onNova,
}: {
  paciente: DadosPaciente
  formulacoes: Formulacao[]
  onVoltar: () => void
  onNova: () => void
}) {
  return (
    <div className="w-full">
      {/* Ações (somem no print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onVoltar}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors"
          >
            ← Voltar
          </button>
          <button
            onClick={onNova}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors"
          >
            Nova Prescrição
          </button>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
          </svg>
          Imprimir
        </button>
      </div>

      <ReceitaPreview paciente={paciente} formulacoes={formulacoes} />
    </div>
  )
}

// ── Wizard principal ─────────────────────────────────────────────────────────

export default function PrescricaoWizard() {
  const [etapa, setEtapa] = useState<Etapa>(1)
  const [paciente, setPaciente] = useState<DadosPaciente>({
    nome: '',
    dataNascimento: '',
    indicacao: '',
  })
  const [selecionadas, setSelecionadas] = useState<Formulacao[]>([])

  const toggleFormulacao = (f: Formulacao) => {
    setSelecionadas((prev) =>
      prev.some((s) => s.codigo === f.codigo)
        ? prev.filter((s) => s.codigo !== f.codigo)
        : [...prev, f]
    )
  }

  const removerFormulacao = (codigo: string) => {
    setSelecionadas((prev) => prev.filter((f) => f.codigo !== codigo))
  }

  const resetar = () => {
    setEtapa(1)
    setPaciente({ nome: '', dataNascimento: '', indicacao: '' })
    setSelecionadas([])
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <StepIndicator etapa={etapa} />

        {etapa === 1 && (
          <EtapaPaciente
            dados={paciente}
            onChange={setPaciente}
            onAvancar={() => setEtapa(2)}
          />
        )}

        {etapa === 2 && (
          <EtapaSelecao
            selecionadas={selecionadas}
            onToggle={toggleFormulacao}
            onRemover={removerFormulacao}
            onVoltar={() => setEtapa(1)}
            onGerar={() => setEtapa(3)}
          />
        )}

        {etapa === 3 && (
          <EtapaPreview
            paciente={paciente}
            formulacoes={selecionadas}
            onVoltar={() => setEtapa(2)}
            onNova={resetar}
          />
        )}
      </div>
    </div>
  )
}
