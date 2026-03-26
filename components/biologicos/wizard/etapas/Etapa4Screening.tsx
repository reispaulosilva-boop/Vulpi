'use client'

import { LaudoOperadora, ExameScreening } from '@/types/biologicos'

interface Etapa4Props {
  data: LaudoOperadora
  onChangeExame: (index: number, field: keyof ExameScreening, value: string) => void
}

export default function Etapa4Screening({ data, onChangeExame }: Etapa4Props) {
  const obrigatorios = data.exames.filter((e) => e.obrigatorio)
  const condicionais = data.exames.filter((e) => !e.obrigatorio)
  const obrigatoriosSemResultado = obrigatorios.filter((e) => !e.resultado).length

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl text-stone-900 mb-1"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          Screening Pré-Biológico
        </h2>
        <p
          className="text-sm text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Exames laboratoriais e de imagem obrigatórios antes do início do biológico
        </p>
      </div>

      {obrigatoriosSemResultado > 0 && (
        <div
          className="px-3 py-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          {obrigatoriosSemResultado} exame{obrigatoriosSemResultado !== 1 ? 's' : ''} obrigatório{obrigatoriosSemResultado !== 1 ? 's' : ''} sem resultado preenchido.
        </div>
      )}

      <ExamesTabela
        titulo="Exames obrigatórios"
        exames={obrigatorios}
        indexOffset={0}
        todosExames={data.exames}
        onChangeExame={onChangeExame}
      />

      <ExamesTabela
        titulo="Exames condicionais"
        exames={condicionais}
        indexOffset={obrigatorios.length}
        todosExames={data.exames}
        onChangeExame={onChangeExame}
      />

      <div
        className="border-l-2 border-stone-300 pl-4 py-1 bg-stone-50"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <p className="text-xs text-stone-500 leading-relaxed">
          Exames obrigatórios sem resultado destacados em amarelo. A etapa pode ser avançada com pendências, mas todas devem constar no laudo final.
        </p>
      </div>
    </div>
  )
}

interface ExamesTabelaProps {
  titulo: string
  exames: ExameScreening[]
  indexOffset: number
  todosExames: ExameScreening[]
  onChangeExame: (index: number, field: keyof ExameScreening, value: string) => void
}

function ExamesTabela({
  titulo,
  exames,
  indexOffset,
  todosExames,
  onChangeExame,
}: ExamesTabelaProps) {
  if (exames.length === 0) return null

  return (
    <div>
      <p
        className="text-xs font-medium text-stone-600 uppercase tracking-widest mb-3"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        {titulo}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-stone-200">
              {['Exame', 'Resultado', 'Data'].map((col) => (
                <th
                  key={col}
                  className="py-2 px-3 text-left text-[10px] font-medium text-stone-500 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exames.map((exame) => {
              const globalIndex = todosExames.indexOf(exame)
              const semResultado = exame.obrigatorio && !exame.resultado

              return (
                <tr
                  key={globalIndex}
                  className="border-b border-stone-100"
                  style={semResultado ? { borderLeft: '2px solid #fbbf24' } : {}}
                >
                  <td
                    className="py-2 px-3 text-stone-700 text-xs align-middle"
                    style={{ fontFamily: 'var(--font-inter, sans-serif)', minWidth: '220px' }}
                  >
                    {exame.nome}
                    {exame.obrigatorio && (
                      <span className="ml-1 text-stone-400">*</span>
                    )}
                  </td>
                  <td className="py-1.5 px-1 align-middle">
                    <input
                      type="text"
                      value={exame.resultado}
                      onChange={(e) => onChangeExame(globalIndex, 'resultado', e.target.value)}
                      className={`field-input text-xs py-1.5 ${semResultado ? 'border-amber-400' : ''}`}
                      placeholder="Ex: Negativo"
                    />
                  </td>
                  <td className="py-1.5 px-1 align-middle">
                    <input
                      type="date"
                      value={exame.data}
                      onChange={(e) => onChangeExame(globalIndex, 'data', e.target.value)}
                      className="field-input text-xs py-1.5"
                      style={{ minWidth: '130px' }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
