'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const therapeuticLines = [
  {
    slug: '',
    label: 'Todas as Linhas',
    color: '#1C1C1E', // cinza chumbo
  },
  {
    slug: 'acne',
    label: 'Acne & Oleosidade',
    color: '#1D4ED8', // azul cobalto
  },
  {
    slug: 'melasma',
    label: 'Melasma',
    color: '#3D5A2A', // verde oliva
  },
  {
    slug: 'rosacea',
    label: 'Rosácea',
    color: '#C17D5A', // terracota
  },
  {
    slug: 'anti-aging',
    label: 'Anti-Aging',
    color: '#6B1E3D', // bordeaux
  },
  {
    slug: 'dermatite-seborreica',
    label: 'Dermatite Seborreica',
    color: '#B45309', // âmbar
  },
  {
    slug: 'foliculite',
    label: 'Foliculite',
    color: '#2E6B5E', // verde
  },
  {
    slug: 'corporal',
    label: 'Corporal',
    color: '#5C4B7A', // púrpura
  },
  {
    slug: 'pos-procedimento',
    label: 'Pós-Procedimento',
    color: '#78716C', // cinza
  },
  {
    slug: 'micoses',
    label: 'Micoses',
    color: '#8B4513', // marrom
  },
  {
    slug: 'capilar',
    label: 'Capilar',
    color: '#B07D3A', // ouro
  },
  {
    slug: 'especiais',
    label: 'Condições Especiais',
    color: '#4A6172', // azul-cinza
  },
  {
    slug: 'fotoproteção',
    label: 'Fotoproteção',
    color: '#7A7A7A', // cinza médio
  },
  {
    slug: 'isotretinoina',
    label: 'Isotretinoína',
    color: '#6B2737', // vinho
  },
]

export default function DashboardSidebar() {
  const searchParams = useSearchParams()
  const currentLine = searchParams.get('linha') || ''

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-60 bg-white border-r border-stone-200 overflow-y-auto">
      {/* Topo */}
      <div className="p-6 border-b border-stone-200">
        <h2
          className="text-xl font-bold text-stone-900 leading-none mb-1"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          VULPI
        </h2>
        <p className="text-[10px] text-stone-400 font-medium">
          Alta Dermatologia Magistral
        </p>
      </div>

      {/* Navegação */}
      <nav className="p-4 space-y-1">
        {therapeuticLines.map((line) => {
          const isActive = currentLine === line.slug
          return (
            <Link
              key={line.slug}
              href={line.slug ? `/dashboard?linha=${line.slug}` : '/dashboard'}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-stone-50 text-stone-900 font-medium'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: line.color }}
              />
              <span>{line.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Rodapé - Card do usuário */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-200 bg-stone-50">
        <div className="bg-white rounded-lg p-4 border border-stone-200">
          <p className="text-xs font-medium text-stone-900">Dr. Paulo Reis</p>
          <p className="text-xs text-stone-500">Dermatologista</p>
        </div>
      </div>
    </aside>
  )
}
