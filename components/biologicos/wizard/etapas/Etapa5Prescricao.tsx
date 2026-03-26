'use client'

import { LaudoOperadora } from '@/types/biologicos'

const MOLECULAS = [
  'Secuquinumabe',
  'Ixequizumabe',
  'Bimekizumabe',
  'Guselcumabe',
  'Risanquizumabe',
  'Ustequinumabe',
  'Dupilumabe',
  'Tralokinumabe',
  'Omalizumabe',
  'Adalimumabe',
]

const POSOLOGIA_MAP: Record<string, { inducao: string; manutencao: string }> = {
  Secuquinumabe: {
    inducao: '300 mg SC sem 0,1,2,3,4',
    manutencao: '300 mg SC /4 semanas',
  },
  Ixequizumabe: {
    inducao: '160 mg SC sem 0; 80 mg sem 2,4,6,8,10,12',
    manutencao: '80 mg SC /4 semanas',
  },
  Bimekizumabe: {
    inducao: '320 mg SC sem 0,4,8,12,16',
    manutencao: '320 mg SC /8 semanas',
  },
  Guselcumabe: {
    inducao: '100 mg SC sem 0,4',
    manutencao: '100 mg SC /8 semanas',
  },
  Risanquizumabe: {
    inducao: '150 mg SC sem 0,4',
    manutencao: '150 mg SC /12 semanas',
  },
  Ustequinumabe: {
    inducao: '45 mg (≤100 kg) ou 90 mg (>100 kg) SC sem 0,4',
    manutencao: '/12 semanas',
  },
  Dupilumabe: {
    inducao: '600 mg SC dose única',
    manutencao: '300 mg SC /2 semanas',
  },
  Tralokinumabe: {
    inducao: '600 mg SC sem 0; 300 mg sem 2,4',
    manutencao: '300 mg SC /2 semanas',
  },
  Omalizumabe: {
    inducao: '—',
    manutencao: '300 mg SC /4 semanas',
  },
  Adalimumabe: {
    inducao: '80 mg SC sem 0; 40 mg sem 1',
    manutencao: '40 mg SC /2 semanas',
  },
}

const VIA_OPTIONS = [
  { value: 'SC', label: 'SC — Subcutânea' },
  { value: 'IV', label: 'IV — Intravenosa' },
  { value: 'VO', label: 'VO — Via oral' },
]

interface Etapa5Props {
  data: LaudoOperadora
  onChange: (field: keyof LaudoOperadora, value: string) => void
}

export default function Etapa5Prescricao({ data, onChange }: Etapa5Props) {
  function handleMolecula(molecula: string) {
    onChange('moleculaDCB', molecula)
    if (molecula && POSOLOGIA_MAP[molecula]) {
      onChange('posologiaInducao', POSOLOGIA_MAP[molecula].inducao)
      onChange('posologiaManutencao', POSOLOGIA_MAP[molecula].manutencao)
    } else {
      onChange('posologiaInducao', '')
      onChange('posologiaManutencao', '')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Prescrição do Biológico
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Molécula, posologia e detalhes da solicitação
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="field-label">Molécula (DCB) *</label>
          <select
            value={data.moleculaDCB}
            onChange={(e) => handleMolecula(e.target.value)}
            className="field-input"
          >
            <option value="">Selecionar molécula</option>
            {MOLECULAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label">Nome comercial</label>
          <input
            type="text"
            value={data.nomeComercial}
            onChange={(e) => onChange('nomeComercial', e.target.value)}
            className="field-input"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label className="field-label">Apresentação / concentração</label>
          <input
            type="text"
            value={data.apresentacao}
            onChange={(e) => onChange('apresentacao', e.target.value)}
            className="field-input"
            placeholder="Ex: 150 mg/mL, seringa preenchida"
          />
        </div>

        <div>
          <label className="field-label">Via de administração</label>
          <select
            value={data.viaAdministracao}
            onChange={(e) => onChange('viaAdministracao', e.target.value)}
            className="field-input"
          >
            <option value="">Selecionar</option>
            {VIA_OPTIONS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label">Duração prevista de avaliação</label>
          <input
            type="text"
            value={data.duracaoPrevista}
            onChange={(e) => onChange('duracaoPrevista', e.target.value)}
            className="field-input"
            placeholder="Ex: 16 semanas"
          />
        </div>

        <div>
          <label className="field-label">Posologia de indução</label>
          <input
            type="text"
            value={data.posologiaInducao}
            onChange={(e) => onChange('posologiaInducao', e.target.value)}
            className="field-input"
            placeholder="Pré-preenchida ao selecionar molécula"
          />
        </div>

        <div>
          <label className="field-label">Posologia de manutenção *</label>
          <input
            type="text"
            value={data.posologiaManutencao}
            onChange={(e) => onChange('posologiaManutencao', e.target.value)}
            className="field-input"
            placeholder="Pré-preenchida ao selecionar molécula"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="field-label">Quantidade solicitada no período</label>
          <input
            type="text"
            value={data.quantidadeSolicitada}
            onChange={(e) => onChange('quantidadeSolicitada', e.target.value)}
            className="field-input max-w-xs"
            placeholder="Ex: 5 seringas"
          />
        </div>
      </div>

      {data.moleculaDCB && POSOLOGIA_MAP[data.moleculaDCB] && (
        <div
          className="border-l-2 border-stone-300 pl-4 py-2 bg-stone-50"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          <p className="text-xs text-stone-600 font-medium mb-1">
            Posologia padrão — {data.moleculaDCB}
          </p>
          <p className="text-xs text-stone-500">
            Indução: {POSOLOGIA_MAP[data.moleculaDCB].inducao}
          </p>
          <p className="text-xs text-stone-500">
            Manutenção: {POSOLOGIA_MAP[data.moleculaDCB].manutencao}
          </p>
          <p className="text-xs text-stone-400 mt-1">Os valores podem ser editados acima.</p>
        </div>
      )}
    </div>
  )
}
