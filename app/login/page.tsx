'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      if (res.ok) {
        window.location.href = '/'
      } else {
        setError('Credenciais inválidas. Tente novamente.')
      }
    } catch {
      setError('Credenciais inválidas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="w-full max-w-sm px-8 py-12">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-bold uppercase tracking-[0.3em] text-stone-900 leading-none"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            VULPI
          </h1>
          <p
            className="mt-2 text-sm italic text-stone-400 tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Ciência prescrita. Resultado real.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs uppercase tracking-widest text-stone-400 mb-1"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-transparent border border-stone-300 text-stone-900 text-sm outline-none focus:border-stone-600 transition-colors duration-150"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-widest text-stone-400 mb-1"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-transparent border border-stone-300 text-stone-900 text-sm outline-none focus:border-stone-600 transition-colors duration-150"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            />
          </div>

          {error && (
            <p
              className="text-xs text-red-800"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 text-sm uppercase tracking-widest text-white transition-opacity duration-150 disabled:opacity-50"
            style={{
              backgroundColor: '#1C1C1A',
              fontFamily: 'var(--font-inter, sans-serif)',
            }}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
