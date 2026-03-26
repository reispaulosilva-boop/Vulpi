'use client'

import { LaudoOperadora } from '@/types/biologicos'

const IGA_OPTIONS = [
  { value: '0', label: '0 — Pele limpa' },
  { value: '1', label: '1 — Quase limpa' },
  { value: '2', label: '2 — Leve' },
  { value: '3', label: '3 — Moderada' },
  { value: '4', label: '4 — Grave' },
]

interface Etapa2Props {
  data: LaudoOperadora
  onChange: (field: keyof LaudoOperadora, value: string | number | null) => void
}

export default function Etapa2Anamnese({ data, onChange }: Etapa2Props) {
  const pasi = data.pasi
  const dlqi = data.dlqi
  const criterioPreenchido = pasi !== null && dlqi !== null && pasi > 10 && dlqi > 10
  const criterioIncompleto =
    pasi !== null && dlqi !== null && (pasi <= 10 || dlqi <= 10)

  function handleNumero(field: keyof LaudoOperadora, raw: string) {
    if (raw === '') {
      onChange(field, null)
    } else {
      const n = parseFloat(raw)
      onChange(field, isNaN(n) ? null : n)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Anamnese Clínica Objetiva
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Gravidade documentada e impacto funcional
        </p>
      </div>

      <div>
        <label className="field-label">Tempo de doença *</label>
        <input
          type="text"
          value={data.tempoDeDoeanca}
          onChange={(e) => onChange('tempoDeDoeanca', e.target.value)}
          className="field-input max-w-xs"
          placeholder="Ex: 8 anos"
        />
      </div>

      {/* Scores de gravidade */}
      <div>
        <p
          className="text-xs font-medium text-stone-600 uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Scores de gravidade
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="field-label">PASI *</label>
            <input
              type="number"
              min="0"
              max="72"
              step="0.1"
              value={data.pasi ?? ''}
              onChange={(e) => handleNumero('pasi', e.target.value)}
              className="field-input"
              placeholder="0–72"
            />
          </div>
          <div>
            <label className="field-label">BSA %</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={data.bsa ?? ''}
              onChange={(e) => handleNumero('bsa', e.target.value)}
              className="field-input"
              placeholder="0–100"
            />
          </div>
          <div>
            <label className="field-label">DLQI /30 *</label>
            <input
              type="number"
              min="0"
              max="30"
              value={data.dlqi ?? ''}
              onChange={(e) => handleNumero('dlqi', e.target.value)}
              className="field-input"
              placeholder="0–30"
            />
          </div>
          <div>
            <label className="field-label">IGA</label>
            <select
              value={data.iga !== null ? String(data.iga) : ''}
              onChange={(e) =>
                onChange('iga', e.target.value === '' ? null : parseInt(e.target.value, 10))
              }
              className="field-input"
            >
              <option value="">—</option>
              {IGA_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Badge de critério DUT */}
        {criterioPreenchido && (
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Critério DUT preenchido — PASI {pasi} + DLQI {dlqi}
          </div>
        )}
        {criterioIncompleto && (
          <div
            className="mt-3 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Verificar critério de áreas especiais (face, genitália, unhas, palmoplantar).
          </div>
        )}
      </div>

      <div>
        <label className="field-label">Localização do acometimento</label>
        <textarea
          value={data.localizacao}
          onChange={(e) => onChange('localizacao', e.target.value)}
          className="field-input min-h-[80px] resize-y"
          placeholder="Descreva as áreas afetadas"
          rows={3}
        />
      </div>

      <div>
        <label className="field-label">Impacto funcional</label>
        <textarea
          value={data.impactoFuncional}
          onChange={(e) => onChange('impactoFuncional', e.target.value)}
          className="field-input min-h-[80px] resize-y"
          placeholder="Impacto na qualidade de vida, trabalho, sono, etc."
          rows={3}
        />
      </div>

      <div>
        <label className="field-label">Comorbidades relevantes</label>
        <textarea
          value={data.comorbidades}
          onChange={(e) => onChange('comorbidades', e.target.value)}
          className="field-input min-h-[80px] resize-y"
          placeholder="Ex: artrite psoriásica, síndrome metabólica, doença inflamatória intestinal"
          rows={3}
        />
      </div>

      <div
        className="border-l-2 border-stone-300 pl-4 py-1 bg-stone-50"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <p className="text-xs text-stone-500 leading-relaxed">
          PASI &gt; 10 + DLQI &gt; 10 = critério objetivo padrão para elegibilidade a imunobiológico (DUT 65.5 / ANS RN 465/2021).
        </p>
      </div>
    </div>
  )
}
