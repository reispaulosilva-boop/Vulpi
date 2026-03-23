'use client'

import Link from 'next/link'

export default function Header() {
  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col">
            <span
              className="text-2xl font-bold uppercase tracking-widest text-stone-900 leading-none"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
            >
              VULPI
            </span>
            <span
              className="text-[10px] italic text-stone-400 tracking-wide leading-tight"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Ciência prescrita. Resultado real.
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              Home
            </Link>
            <Link
              href="/catalogo"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              Catálogo
            </Link>
            <Link
              href="/protocolos"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-150"
            >
              Protocolos
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors duration-150 ml-2"
            >
              Sair →
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
