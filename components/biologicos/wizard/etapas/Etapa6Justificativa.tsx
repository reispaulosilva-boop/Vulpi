'use client'

import { LaudoOperadora } from '@/types/biologicos'

interface Etapa6Props {
  data: LaudoOperadora
  onChange: (field: keyof LaudoOperadora, value: string) => void
}

export default function Etapa6Justificativa({ data, onChange }: Etapa6Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Justificativa, Ancoragem Regulatória e Conclusão
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Narrativa clínica e fundamentação regulatória do laudo
        </p>
      </div>

      {/* Bloco A */}
      <div>
        <p
          className="text-xs font-medium text-stone-600 uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Bloco A — Diagnóstico de certeza
        </p>
        <textarea
          value={data.justificativaClinica}
          onChange={(e) => onChange('justificativaClinica', e.target.value)}
          className="field-input min-h-[100px] resize-y"
          placeholder="Critérios diagnósticos utilizados, tempo de evolução e gravidade documentada."
          rows={4}
        />
      </div>

      {/* Bloco B é parte da justificativa geral — reutilizamos campo único da estrutura */}
      {/* Ancoragem regulatória */}
      <div>
        <p
          className="text-xs font-medium text-stone-600 uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Ancoragem Regulatória
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="field-label">DUT ANS</label>
            <input
              type="text"
              value={data.dutANS}
              onChange={(e) => onChange('dutANS', e.target.value)}
              className="field-input"
              placeholder="Ex: DUT 65.5 — ANS RN 465/2021"
            />
          </div>
          <div>
            <label className="field-label">Registro ANVISA</label>
            <input
              type="text"
              value={data.registroANVISA}
              onChange={(e) => onChange('registroANVISA', e.target.value)}
              className="field-input"
              placeholder="N° do registro"
            />
          </div>
          <div>
            <label className="field-label">Guideline de referência</label>
            <input
              type="text"
              value={data.guideline}
              onChange={(e) => onChange('guideline', e.target.value)}
              className="field-input"
              placeholder="Ex: SBD 2024; AAD-NPF 2019"
            />
          </div>
        </div>
      </div>

      {/* Conclusão */}
      <div>
        <p
          className="text-xs font-medium text-stone-600 uppercase tracking-widest mb-3"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Conclusão
        </p>
        <div className="space-y-4">
          <div>
            <label className="field-label">Síntese clínica *</label>
            <textarea
              value={data.conclusaoSintese}
              onChange={(e) => onChange('conclusaoSintese', e.target.value)}
              className="field-input min-h-[80px] resize-y"
              placeholder="Síntese objetiva do caso: diagnóstico, gravidade, falha terapêutica e indicação do biológico."
              rows={3}
            />
          </div>
          <div>
            <label className="field-label">Solicitação formal *</label>
            <textarea
              value={data.conclusaoSolicitacao}
              onChange={(e) => onChange('conclusaoSolicitacao', e.target.value)}
              className="field-input min-h-[80px] resize-y"
              placeholder="Solicito a autorização para uso de [molécula] conforme indicação clínica documentada acima, dentro dos critérios da DUT ANS vigente."
              rows={3}
            />
          </div>
          <div>
            <label className="field-label">Comprometimento de seguimento</label>
            <textarea
              value={data.conclusaoSeguimento}
              onChange={(e) => onChange('conclusaoSeguimento', e.target.value)}
              className="field-input min-h-[80px] resize-y"
              placeholder="Comprometo-me a monitorar a resposta terapêutica e realizar reavaliação em [prazo], com documentação formal dos resultados."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div
        className="border-l-2 border-stone-300 pl-4 py-1 bg-stone-50"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <p className="text-xs text-stone-500 leading-relaxed">
          A justificativa clínica deve referenciar explicitamente os dados das etapas anteriores: diagnóstico (Etapa 1), gravidade (Etapa 2), falha terapêutica (Etapa 3) e screening (Etapa 4).
        </p>
      </div>
    </div>
  )
}
