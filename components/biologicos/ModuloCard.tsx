'use client'

import Link from 'next/link'

interface ModuloCardProps {
  titulo: string
  descricao: string
  href: string
  ativo: boolean
}

export default function ModuloCard({ titulo, descricao, href, ativo }: ModuloCardProps) {
  if (!ativo) {
    return (
      <div
        className="relative border border-stone-200 bg-white p-8 rounded-sm opacity-50 cursor-not-allowed select-none"
      >
        <span
          className="absolute top-4 right-4 text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 border border-stone-300 text-stone-400"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Em breve
        </span>
        <h2
          className="text-2xl text-stone-900 mb-3"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          {titulo}
        </h2>
        <p
          className="text-sm text-stone-500 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          {descricao}
        </p>
      </div>
    )
  }

  return (
    <Link href={href} className="group block">
      <div className="relative border border-stone-200 bg-white p-8 rounded-sm transition-all duration-200 group-hover:border-stone-400">
        <h2
          className="text-2xl text-stone-900 mb-3"
          style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 500 }}
        >
          {titulo}
        </h2>
        <p
          className="text-sm text-stone-500 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          {descricao}
        </p>
      </div>
    </Link>
  )
}
