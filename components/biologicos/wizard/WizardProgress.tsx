'use client'

const ETAPAS = [
  { numero: 1, titulo: 'Identificação' },
  { numero: 2, titulo: 'Anamnese' },
  { numero: 3, titulo: 'Tratamentos' },
  { numero: 4, titulo: 'Screening' },
  { numero: 5, titulo: 'Prescrição' },
  { numero: 6, titulo: 'Conclusão' },
]

interface WizardProgressProps {
  etapaAtual: number
}

export default function WizardProgress({ etapaAtual }: WizardProgressProps) {
  return (
    <nav className="w-full mb-10">
      <ol className="flex items-start gap-0">
        {ETAPAS.map((etapa, idx) => {
          const concluida = etapa.numero < etapaAtual
          const atual = etapa.numero === etapaAtual
          const futura = etapa.numero > etapaAtual
          const ultimo = idx === ETAPAS.length - 1

          return (
            <li key={etapa.numero} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* Linha esquerda */}
                {idx > 0 && (
                  <div
                    className="flex-1 h-px transition-colors"
                    style={{ background: concluida || atual ? '#1c1917' : '#d6d3d1' }}
                  />
                )}

                {/* Indicador circular */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: atual ? '#1c1917' : concluida ? '#1c1917' : '#fafaf8',
                    border: futura ? '1.5px solid #d6d3d1' : '1.5px solid #1c1917',
                  }}
                >
                  {concluida ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#fafaf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span
                      className="text-[9px] font-medium"
                      style={{
                        fontFamily: 'var(--font-inter, sans-serif)',
                        color: atual ? '#fafaf8' : '#a8a29e',
                      }}
                    >
                      {etapa.numero}
                    </span>
                  )}
                </div>

                {/* Linha direita */}
                {!ultimo && (
                  <div
                    className="flex-1 h-px transition-colors"
                    style={{ background: concluida ? '#1c1917' : '#d6d3d1' }}
                  />
                )}
              </div>

              {/* Título da etapa */}
              <span
                className="mt-2 text-[10px] font-medium tracking-wide uppercase text-center leading-tight"
                style={{
                  fontFamily: 'var(--font-inter, sans-serif)',
                  color: atual ? '#1c1917' : concluida ? '#57534e' : '#a8a29e',
                }}
              >
                {etapa.titulo}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
