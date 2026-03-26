'use client'

import { LaudoOperadora } from '@/types/biologicos'

const CID10_OPTIONS = [
  { value: 'L40.0', label: 'L40.0 — Psoríase vulgar' },
  { value: 'L40.1', label: 'L40.1 — Psoríase pustulosa generalizada' },
  { value: 'L40.4', label: 'L40.4 — Psoríase gutata' },
  { value: 'L40.5', label: 'L40.5 — Artropatia psoriásica' },
  { value: 'L20.8', label: 'L20.8 — Dermatite atópica' },
  { value: 'L50.1', label: 'L50.1 — Urticária idiopática' },
  { value: 'L73.2', label: 'L73.2 — Hidradenite supurativa' },
]

interface Etapa1Props {
  data: LaudoOperadora
  onChange: (field: keyof LaudoOperadora, value: string) => void
}

export default function Etapa1Identificacao({ data, onChange }: Etapa1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Identificação do Paciente
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Dados de identificação e diagnóstico principal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Nome completo do paciente *</label>
          <input
            type="text"
            value={data.pacienteNome}
            onChange={(e) => onChange('pacienteNome', e.target.value)}
            className="field-input"
            placeholder="Nome completo"
          />
        </div>

        <div>
          <label className="field-label">N° matrícula / carteirinha</label>
          <input
            type="text"
            value={data.pacienteMatricula}
            onChange={(e) => onChange('pacienteMatricula', e.target.value)}
            className="field-input"
            placeholder="000000000"
          />
        </div>

        <div>
          <label className="field-label">Data de nascimento</label>
          <input
            type="date"
            value={data.pacienteDataNascimento}
            onChange={(e) => onChange('pacienteDataNascimento', e.target.value)}
            className="field-input"
          />
        </div>

        <div>
          <label className="field-label">CID-10 principal *</label>
          <select
            value={data.cid10Principal}
            onChange={(e) => onChange('cid10Principal', e.target.value)}
            className="field-input"
          >
            <option value="">Selecionar</option>
            {CID10_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label">CID-10 secundário</label>
          <input
            type="text"
            value={data.cid10Secundario}
            onChange={(e) => onChange('cid10Secundario', e.target.value)}
            className="field-input"
            placeholder="Opcional"
          />
        </div>
      </div>

      <div
        className="border-l-2 border-stone-300 pl-4 py-1 bg-stone-50"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <p className="text-xs text-stone-500 leading-relaxed">
          Use o código de maior especificidade. Ex: L40.0 (psoríase vulgar), não apenas L40.
        </p>
      </div>
    </div>
  )
}
