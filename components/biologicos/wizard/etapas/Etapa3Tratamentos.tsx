'use client'

import { LaudoOperadora, TratamentoAnterior } from '@/types/biologicos'

const SUGESTOES = ['Metotrexato', 'Acitretina', 'Ciclosporina', 'Fototerapia UVB']

interface Etapa3Props {
  data: LaudoOperadora
  onAddTratamento: () => void
  onRemoveTratamento: (index: number) => void
  onChangeTratamento: (index: number, field: keyof TratamentoAnterior, value: string) => void
}

export default function Etapa3Tratamentos({
  data,
  onAddTratamento,
  onRemoveTratamento,
  onChangeTratamento,
}: Etapa3Props) {
  const total = data.tratamentos.length

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Histórico de Tratamentos Anteriores
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Registre os tratamentos convencionais já realizados
        </p>
      </div>

      {/* Sugestões rápidas */}
      <div className="flex flex-wrap gap-2">
        {SUGESTOES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              onAddTratamento()
              // O índice da nova linha será total após adição
              setTimeout(() => onChangeTratamento(total, 'medicamento', s), 0)
            }}
            className="text-xs px-2.5 py-1 border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-colors"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            + {s}
          </button>
        ))}
      </div>

      {/* Tabela */}
      {total > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200">
                {['Medicamento / Procedimento', 'Dose / Regime', 'Período', 'Motivo de descontinuação', ''].map((col) => (
                  <th
                    key={col}
                    className="py-2 px-3 text-left text-[10px] font-medium text-stone-500 uppercase tracking-widest whitespace-nowrap"
                    style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tratamentos.map((t, i) => (
                <tr key={i} className="border-b border-stone-100">
                  <td className="py-1.5 px-1">
                    <input
                      type="text"
                      value={t.medicamento}
                      onChange={(e) => onChangeTratamento(i, 'medicamento', e.target.value)}
                      className="field-input text-xs py-1.5"
                      placeholder="Ex: Metotrexato"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      type="text"
                      value={t.dose}
                      onChange={(e) => onChangeTratamento(i, 'dose', e.target.value)}
                      className="field-input text-xs py-1.5"
                      placeholder="Ex: 15 mg/sem"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      type="text"
                      value={t.periodo}
                      onChange={(e) => onChangeTratamento(i, 'periodo', e.target.value)}
                      className="field-input text-xs py-1.5"
                      placeholder="Ex: 6 meses"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <input
                      type="text"
                      value={t.motivoDescontinuacao}
                      onChange={(e) => onChangeTratamento(i, 'motivoDescontinuacao', e.target.value)}
                      className="field-input text-xs py-1.5"
                      placeholder="Ex: Falha de eficácia"
                    />
                  </td>
                  <td className="py-1.5 px-1">
                    <button
                      type="button"
                      onClick={() => onRemoveTratamento(i)}
                      className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
                      aria-label="Remover tratamento"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onAddTratamento}
          className="text-sm border border-stone-300 text-stone-700 px-4 py-2 hover:bg-stone-50 transition-colors"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          + Adicionar tratamento
        </button>

        <span
          className="text-xs text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          {total} {total === 1 ? 'tratamento registrado' : 'tratamentos registrados'}
        </span>
      </div>

      {total < 2 && (
        <div
          className="px-3 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Mínimo recomendado: 2 tratamentos convencionais.
        </div>
      )}

      <div
        className="border-l-2 border-stone-300 pl-4 py-1 bg-stone-50"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <p className="text-xs text-stone-500 leading-relaxed">
          Demonstração de falha a pelo menos 2 imunossupressores convencionais é pré-requisito obrigatório na maioria das operadoras (ANS DUT 65.5).
        </p>
      </div>
    </div>
  )
}
