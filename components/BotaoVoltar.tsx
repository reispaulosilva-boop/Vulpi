'use client'

export default function BotaoVoltar() {
  return (
    <button
      onClick={() => history.back()}
      className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors duration-200 mt-6 mb-2 group"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
      Voltar
    </button>
  )
}
