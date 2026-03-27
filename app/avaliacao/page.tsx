'use client'

import { useState } from 'react'
import Link from 'next/link'
import BotaoVoltar from '@/components/BotaoVoltar'

// ── Types ─────────────────────────────────────────────────────────────────────

type Bloco = 1 | 2 | 3 | 'resultado'

interface Perfil {
  sexo: string
  faixaEtaria: string
  biotipo: string
  fitzpatrick: string
}

interface Contexto {
  procedimentosAnteriores: string
  procedimentos: string[]
  contraindicacoes: string[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const QUEIXAS = [
  'Rugas dinâmicas',
  'Rugas estáticas',
  'Perda de volume',
  'Flacidez facial',
  'Manchas / hiperpigmentação',
  'Olheiras',
  'Acne ativa',
  'Cicatrizes de acne',
  'Poros / oleosidade',
  'Contorno / papada',
  'Flacidez corporal',
  'Celulite',
]

const INDICACOES: Record<string, string[]> = {
  'Rugas dinâmicas': [
    'Toxina botulínica (1ª escolha)',
    'Peeling superficial (adjuvante)',
  ],
  'Rugas estáticas': [
    'Peeling médio',
    'Laser fracionado não ablativo',
    'Microagulhamento com fatores de crescimento',
  ],
  'Perda de volume': [
    'Preenchedores de ácido hialurônico',
    'Bioestimuladores (Sculptra / Radiesse)',
  ],
  'Flacidez facial': [
    'Ultrassom microfocado (HIFU)',
    'Radiofrequência fracionada',
    'Fios de PDO',
    'Bioestimuladores',
  ],
  'Manchas / hiperpigmentação': [
    'Peeling químico (conforme Fitzpatrick)',
    'Laser Nd:YAG / Q-Switch',
    'Fórmulas clareantes VULPI',
  ],
  'Olheiras': [
    'Preenchedores periorbital',
    'Carboxiterapia',
    'Toxina botulínica (músculo orbicular)',
  ],
  'Acne ativa': [
    'Laser de luz pulsada / PDL',
    'Peeling de ácido salicílico',
    'Tratamento tópico VULPI',
  ],
  'Cicatrizes de acne': [
    'Microagulhamento com RF',
    'Laser fracionado ablativo',
    'Peeling profundo',
  ],
  'Poros / oleosidade': [
    'Peeling de ácido salicílico',
    'Laser fracionado não ablativo',
    'Radiofrequência',
  ],
  'Contorno / papada': [
    'Toxina botulínica (masseter / platisma)',
    'Bioestimuladores',
    'Fios de sustentação',
  ],
  'Flacidez corporal': [
    'Radiofrequência corporal',
    'HIFU corporal',
    'Microagulhamento RF corporal',
  ],
  'Celulite': [
    'Radiofrequência',
    'Carboxiterapia',
    'Endermologia',
  ],
}

const FORMULACOES_MAP: Record<string, Array<{ codigo: string; nome: string }>> = {
  'Manchas / hiperpigmentação': [
    { codigo: 'VP-MEL-001', nome: 'Sérum Clareador Multi-Target' },
    { codigo: 'VP-MEL-O01', nome: 'Oral Clareador' },
  ],
  'Acne ativa': [
    { codigo: 'VP-ACN-001', nome: 'Sérum Seboregulador' },
    { codigo: 'VP-ACN-002', nome: 'Sérum Noturno Renovador' },
  ],
  'Rugas estáticas': [
    { codigo: 'VP-AGE-003', nome: 'Sérum Lift & Firm' },
    { codigo: 'VP-AGE-O01', nome: 'Skin Longevity Oral' },
  ],
  'Flacidez facial': [
    { codigo: 'VP-AGE-003', nome: 'Sérum Lift & Firm' },
    { codigo: 'VP-AGE-002', nome: 'Sérum Noturno Renovador 30+' },
  ],
  'Poros / oleosidade': [
    { codigo: 'VP-ACN-001', nome: 'Sérum Seboregulador' },
    { codigo: 'VP-DS-001', nome: 'Sérum Antisseborreico' },
  ],
  'Cicatrizes de acne': [
    { codigo: 'VP-POS-001', nome: 'Sérum Recovery Pós-Procedimento' },
  ],
  'Celulite': [
    { codigo: 'VP-CEL-001', nome: 'Creme Lipofibrolítico' },
    { codigo: 'VP-CEL-O01', nome: 'Oral Lipometabólico' },
  ],
}

const PROCEDIMENTOS_ANTERIORES = [
  'Toxina botulínica',
  'Preenchedores',
  'Laser',
  'Bioestimulador',
  'Outro',
]

const CONTRAINDICACOES_OPTIONS = [
  'Gestante ou amamentando',
  'Em uso de isotretinoína',
  'Anticoagulante / antiplaquetário',
  'Nenhuma',
]

const FITZPATRICK_OPTIONS = [
  { value: 'I–II', desc: 'Pele clara, queima fácil' },
  { value: 'III', desc: 'Pele média, queima moderada' },
  { value: 'IV', desc: 'Pele morena, raramente queima' },
  { value: 'V–VI', desc: 'Pele escura, nunca queima' },
]

// ── Filter logic ──────────────────────────────────────────────────────────────

function filtrarIndicacoes(indicacoes: string[], contraindicacoes: string[]): string[] {
  const gestante = contraindicacoes.includes('Gestante ou amamentando')
  const isotretinoinaAtiva = contraindicacoes.includes('Em uso de isotretinoína')

  return indicacoes.filter((ind) => {
    const l = ind.toLowerCase()
    if (gestante) {
      if (l.includes('toxina')) return false
      if (l.includes('preenched')) return false
      if (l.includes('laser')) return false
      if (l.includes('peeling médio') || l.includes('peeling profundo')) return false
    }
    if (isotretinoinaAtiva) {
      if (l.includes('ablativo')) return false
      if (l.includes('peeling médio') || l.includes('peeling profundo')) return false
      if (l.includes('microagulhamento')) return false
    }
    return true
  })
}

// ── UI primitives ─────────────────────────────────────────────────────────────

function SelectButton({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-xl px-4 py-3 text-sm cursor-pointer transition-all text-left ${
        selected
          ? 'border-stone-900 bg-stone-900 text-white'
          : 'border-stone-200 text-stone-700 hover:border-stone-400'
      }`}
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      {label}
    </button>
  )
}

function CheckCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-xl px-4 py-3 text-sm cursor-pointer transition-all text-left flex items-center justify-between gap-2 ${
        selected
          ? 'border-stone-900 bg-stone-50 text-stone-900 font-medium'
          : 'border-stone-200 text-stone-600 hover:border-stone-400'
      }`}
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      <span>{label}</span>
      {selected && (
        <span className="text-stone-900 text-xs flex-shrink-0">&#10003;</span>
      )}
    </button>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest text-stone-400 mb-3"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      {children}
    </p>
  )
}

function BlockTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2
        className="text-3xl font-semibold text-stone-900 mb-2"
        style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
      >
        {title}
      </h2>
      <p
        className="text-sm text-stone-400"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        {subtitle}
      </p>
    </div>
  )
}

function BtnAvancar({
  onClick,
  disabled,
  label = 'Avançar',
}: {
  onClick: () => void
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-stone-900 text-white rounded-full px-8 py-3 text-sm tracking-wide hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      {label}
    </button>
  )
}

function BtnVoltar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-stone-200 text-stone-500 rounded-full px-6 py-3 text-sm hover:bg-stone-50 transition-colors"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      Voltar
    </button>
  )
}

// ── Sub-header ────────────────────────────────────────────────────────────────

function SubHeader() {
  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-100 print:hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-baseline gap-3">
        <span
          className="text-base font-bold uppercase tracking-widest text-stone-900"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          VULPI
        </span>
        <span
          className="text-xs text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Sistema Avaliação
        </span>
      </div>
    </div>
  )
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ bloco }: { bloco: Bloco }) {
  const steps: Array<{ n: 1 | 2 | 3; label: string }> = [
    { n: 1, label: 'PERFIL' },
    { n: 2, label: 'QUEIXAS' },
    { n: 3, label: 'CONTEXTO' },
  ]
  const current = bloco === 'resultado' ? 4 : bloco

  return (
    <div className="print:hidden flex items-center justify-center gap-0 py-8">
      {steps.map((s, i) => {
        const done = current > s.n
        const active = current === s.n
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  done || active
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-300'
                }`}
              >
                {done ? <span>&#10003;</span> : s.n}
              </div>
              <span
                className={`text-xs uppercase tracking-widest transition-colors ${
                  active ? 'text-stone-900' : done ? 'text-stone-500' : 'text-stone-300'
                }`}
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 h-px mx-2 mb-5 transition-colors ${
                  current > s.n ? 'bg-stone-900' : 'bg-stone-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Bloco 1 — Perfil do Paciente ──────────────────────────────────────────────

function Bloco1({
  perfil,
  onChange,
  onAvancar,
}: {
  perfil: Perfil
  onChange: (p: Perfil) => void
  onAvancar: () => void
}) {
  const ready = !!(perfil.sexo && perfil.faixaEtaria && perfil.biotipo && perfil.fitzpatrick)

  return (
    <div className="anim-fade-up space-y-8">
      <BlockTitle
        title="Perfil do Paciente"
        subtitle="Dados essenciais para calibrar as indicações."
      />

      <div>
        <FieldLabel>Sexo biológico</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {['Feminino', 'Masculino'].map((v) => (
            <SelectButton
              key={v}
              label={v}
              selected={perfil.sexo === v}
              onClick={() => onChange({ ...perfil, sexo: v })}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Faixa etária</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {['18–25', '26–35', '36–45', '46–55', '56+'].map((v) => (
            <SelectButton
              key={v}
              label={v}
              selected={perfil.faixaEtaria === v}
              onClick={() => onChange({ ...perfil, faixaEtaria: v })}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Biotipo de pele</FieldLabel>
        <div className="flex flex-wrap gap-3">
          {['Normal', 'Oleosa', 'Seca', 'Mista', 'Sensível'].map((v) => (
            <SelectButton
              key={v}
              label={v}
              selected={perfil.biotipo === v}
              onClick={() => onChange({ ...perfil, biotipo: v })}
            />
          ))}
        </div>
      </div>

      <div>
        <FieldLabel>Fitzpatrick</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FITZPATRICK_OPTIONS.map(({ value, desc }) => (
            <button
              key={value}
              onClick={() => onChange({ ...perfil, fitzpatrick: value })}
              className={`border rounded-xl px-4 py-3 text-left cursor-pointer transition-all ${
                perfil.fitzpatrick === value
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 text-stone-700 hover:border-stone-400'
              }`}
            >
              <p
                className="text-sm font-medium mb-1"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                {value}
              </p>
              <p
                className={`text-xs leading-snug ${
                  perfil.fitzpatrick === value ? 'text-stone-300' : 'text-stone-400'
                }`}
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                {desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <BtnAvancar onClick={onAvancar} disabled={!ready} />
      </div>
    </div>
  )
}

// ── Bloco 2 — Queixas Principais ──────────────────────────────────────────────

function Bloco2({
  queixas,
  onToggle,
  onVoltar,
  onAvancar,
}: {
  queixas: string[]
  onToggle: (q: string) => void
  onVoltar: () => void
  onAvancar: () => void
}) {
  return (
    <div className="anim-fade-up space-y-8">
      <BlockTitle
        title="Queixas Principais"
        subtitle="Selecione todas as queixas relevantes para esta consulta."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUEIXAS.map((q) => (
          <CheckCard
            key={q}
            label={q}
            selected={queixas.includes(q)}
            onClick={() => onToggle(q)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <BtnVoltar onClick={onVoltar} />
        <BtnAvancar onClick={onAvancar} disabled={queixas.length === 0} />
      </div>
    </div>
  )
}

// ── Bloco 3 — Contexto Clínico ────────────────────────────────────────────────

function Bloco3({
  contexto,
  onChange,
  onVoltar,
  onAvancar,
}: {
  contexto: Contexto
  onChange: (c: Contexto) => void
  onVoltar: () => void
  onAvancar: () => void
}) {
  const toggleProcedimento = (p: string) => {
    const list = contexto.procedimentos.includes(p)
      ? contexto.procedimentos.filter((x) => x !== p)
      : [...contexto.procedimentos, p]
    onChange({ ...contexto, procedimentos: list })
  }

  const toggleContraindicacao = (c: string) => {
    if (c === 'Nenhuma') {
      onChange({ ...contexto, contraindicacoes: ['Nenhuma'] })
      return
    }
    const semNenhuma = contexto.contraindicacoes.filter((x) => x !== 'Nenhuma')
    const list = semNenhuma.includes(c)
      ? semNenhuma.filter((x) => x !== c)
      : [...semNenhuma, c]
    onChange({ ...contexto, contraindicacoes: list })
  }

  const ready =
    contexto.procedimentosAnteriores !== '' && contexto.contraindicacoes.length > 0

  return (
    <div className="anim-fade-up space-y-8">
      <BlockTitle
        title="Contexto Clínico"
        subtitle="Informações que influenciam diretamente a conduta."
      />

      <div>
        <FieldLabel>Procedimentos anteriores</FieldLabel>
        <div className="flex gap-3">
          {['Nenhum', 'Sim'].map((v) => (
            <SelectButton
              key={v}
              label={v}
              selected={contexto.procedimentosAnteriores === v}
              onClick={() =>
                onChange({
                  ...contexto,
                  procedimentosAnteriores: v,
                  procedimentos: v === 'Nenhum' ? [] : contexto.procedimentos,
                })
              }
            />
          ))}
        </div>

        {contexto.procedimentosAnteriores === 'Sim' && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROCEDIMENTOS_ANTERIORES.map((p) => (
              <CheckCard
                key={p}
                label={p}
                selected={contexto.procedimentos.includes(p)}
                onClick={() => toggleProcedimento(p)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <FieldLabel>Contraindicações ativas</FieldLabel>
        <div className="space-y-3">
          {CONTRAINDICACOES_OPTIONS.map((c) => (
            <CheckCard
              key={c}
              label={c}
              selected={contexto.contraindicacoes.includes(c)}
              onClick={() => toggleContraindicacao(c)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <BtnVoltar onClick={onVoltar} />
        <BtnAvancar onClick={onAvancar} disabled={!ready} label="Ver Protocolo" />
      </div>
    </div>
  )
}

// ── Resultado ─────────────────────────────────────────────────────────────────

function Resultado({
  perfil,
  queixas,
  contexto,
  onNova,
}: {
  perfil: Perfil
  queixas: string[]
  contexto: Contexto
  onNova: () => void
}) {
  const temAviso =
    contexto.contraindicacoes.includes('Gestante ou amamentando') ||
    contexto.contraindicacoes.includes('Em uso de isotretinoína')

  const formulacoesSelecionadas = (() => {
    const seen = new Set<string>()
    const result: Array<{ codigo: string; nome: string }> = []
    for (const q of queixas) {
      for (const f of FORMULACOES_MAP[q] ?? []) {
        if (!seen.has(f.codigo)) {
          seen.add(f.codigo)
          result.push(f)
        }
      }
    }
    return result
  })()

  const perfilItems = [
    { label: 'Sexo', value: perfil.sexo },
    { label: 'Faixa etária', value: perfil.faixaEtaria },
    { label: 'Biotipo', value: perfil.biotipo },
    { label: 'Fitzpatrick', value: perfil.fitzpatrick },
    { label: 'Queixas', value: queixas.join(' · ') },
    {
      label: 'Procedimentos anteriores',
      value:
        contexto.procedimentosAnteriores === 'Sim' && contexto.procedimentos.length > 0
          ? contexto.procedimentos.join(', ')
          : contexto.procedimentosAnteriores,
    },
    { label: 'Contraindicações', value: contexto.contraindicacoes.join(' · ') },
  ]

  return (
    <div className="anim-fade-up space-y-8 pt-8">
      {temAviso && (
        <p
          className="text-xs text-amber-700 bg-amber-50 rounded-lg px-4 py-2"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Protocolo adaptado: contraindicações ativas consideradas.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Perfil avaliado */}
        <div className="bg-white border border-stone-100 rounded-xl p-6">
          <h3
            className="text-2xl font-semibold text-stone-900 mb-6"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Perfil Avaliado
          </h3>
          <div className="space-y-4">
            {perfilItems.map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-xs uppercase tracking-widest text-stone-400 mb-0.5"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  {label}
                </p>
                <p
                  className="text-sm text-stone-800"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Protocolo indicado */}
        <div>
          <h3
            className="text-2xl font-semibold text-stone-900 mb-6"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Protocolo Indicado
          </h3>
          <div className="space-y-5">
            {queixas.map((q, i) => {
              const inds = filtrarIndicacoes(
                INDICACOES[q] ?? [],
                contexto.contraindicacoes
              )
              if (inds.length === 0) return null
              return (
                <div
                  key={q}
                  className={
                    i < queixas.length - 1 ? 'pb-5 border-b border-stone-100' : ''
                  }
                >
                  <p
                    className="text-xs uppercase tracking-widest text-stone-400 mb-2"
                    style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                  >
                    {q}
                  </p>
                  <div className="space-y-1">
                    {inds.map((ind) => (
                      <p
                        key={ind}
                        className="text-sm text-stone-800"
                        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                      >
                        → {ind}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Protocolo magistral complementar */}
      {formulacoesSelecionadas.length > 0 && (
        <div className="bg-white border border-stone-100 rounded-xl p-6">
          <h3
            className="text-2xl font-semibold text-stone-900 mb-1"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Protocolo Magistral Complementar
          </h3>
          <p
            className="text-xs text-stone-400 mb-6"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Formulações VULPI indicadas para as queixas identificadas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formulacoesSelecionadas.map((f) => (
              <div
                key={f.codigo}
                className="bg-white border border-stone-100 rounded-xl p-5 card-hover"
              >
                <p
                  className="text-xs text-stone-400 mb-1"
                  style={{ fontFamily: 'var(--font-roboto-mono, monospace)' }}
                >
                  {f.codigo}
                </p>
                <p
                  className="text-sm font-medium text-stone-800 mb-3"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  {f.nome}
                </p>
                <Link
                  href={`/formulacao/${f.codigo}`}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  Ver formulação →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-wrap items-center gap-4 print:hidden">
        <button
          onClick={onNova}
          className="border border-stone-200 text-stone-600 rounded-full px-8 py-3 text-sm hover:bg-stone-50 transition-colors"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Nova Avaliação
        </button>
        <button
          onClick={() => window.print()}
          className="bg-stone-900 text-white rounded-full px-8 py-3 text-sm tracking-wide hover:bg-stone-800 transition-colors"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Imprimir Protocolo
        </button>
      </div>
    </div>
  )
}

// ── Initial state ─────────────────────────────────────────────────────────────

const PERFIL_INIT: Perfil = { sexo: '', faixaEtaria: '', biotipo: '', fitzpatrick: '' }
const CONTEXTO_INIT: Contexto = {
  procedimentosAnteriores: '',
  procedimentos: [],
  contraindicacoes: [],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AvaliacaoPage() {
  const [bloco, setBloco] = useState<Bloco>(1)
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_INIT)
  const [queixas, setQueixas] = useState<string[]>([])
  const [contexto, setContexto] = useState<Contexto>(CONTEXTO_INIT)

  const toggleQueixa = (q: string) =>
    setQueixas((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]
    )

  const resetar = () => {
    setBloco(1)
    setPerfil(PERFIL_INIT)
    setQueixas([])
    setContexto(CONTEXTO_INIT)
  }

  return (
    <>
      <SubHeader />
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <BotaoVoltar />
          {bloco !== 'resultado' && <StepIndicator bloco={bloco} />}

          <div key={String(bloco)}>
            {bloco === 1 && (
              <Bloco1
                perfil={perfil}
                onChange={setPerfil}
                onAvancar={() => setBloco(2)}
              />
            )}
            {bloco === 2 && (
              <Bloco2
                queixas={queixas}
                onToggle={toggleQueixa}
                onVoltar={() => setBloco(1)}
                onAvancar={() => setBloco(3)}
              />
            )}
            {bloco === 3 && (
              <Bloco3
                contexto={contexto}
                onChange={setContexto}
                onVoltar={() => setBloco(2)}
                onAvancar={() => setBloco('resultado')}
              />
            )}
            {bloco === 'resultado' && (
              <Resultado
                perfil={perfil}
                queixas={queixas}
                contexto={contexto}
                onNova={resetar}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
