'use client'

import { useState } from 'react'

interface SenhaGateProps {
  onAutenticar: () => void
}

export default function SenhaGate({ onAutenticar }: SenhaGateProps) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (senha === 'vulpi2026') {
      setErro('')
      onAutenticar()
    } else {
      setErro('Senha incorreta. Verifique e tente novamente.')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#FAFAF8' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1
            className="text-4xl tracking-wide text-stone-900 mb-2"
            style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 400 }}
          >
            VULPI
          </h1>
          <p
            className="text-sm text-stone-500 tracking-wide"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Sistema Biológicos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="senha"
              className="block text-xs font-medium text-stone-600 uppercase tracking-widest mb-1.5"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Senha de acesso
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value)
                setErro('')
              }}
              autoFocus
              className="w-full border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400 transition-colors"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            />
            {erro && (
              <p
                className="mt-2 text-xs text-red-600"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                {erro}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-stone-900 text-white text-sm font-medium py-2.5 px-4 hover:bg-stone-800 transition-colors"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
