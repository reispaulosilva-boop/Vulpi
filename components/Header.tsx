'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const [lastY, setLastY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 10)
      setVisible(y < lastY || y < 80)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/login'
  }

  const navLink = (href: string, label: string) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`text-sm transition-colors duration-200 ${
          active ? 'text-stone-900 font-medium' : 'text-stone-400 hover:text-stone-900'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        atTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col group">
            <span
              className="text-2xl font-bold uppercase tracking-widest text-stone-900 leading-none transition-opacity duration-200 group-hover:opacity-70"
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
            {navLink('/', 'Home')}
            {(pathname.startsWith('/dashboard') ||
              pathname.startsWith('/catalogo') ||
              pathname.startsWith('/protocolos') ||
              pathname.startsWith('/formulacao')) && (
              <>
                {navLink('/dashboard', 'Dashboard')}
                {navLink('/catalogo', 'Catálogo')}
                {navLink('/protocolos', 'Protocolos')}
                <button
                  onClick={handleLogout}
                  className="text-sm text-stone-300 hover:text-stone-600 transition-colors duration-200 ml-2"
                >
                  Sair →
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
