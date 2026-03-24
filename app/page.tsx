'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

type View = 'home' | 'paciente' | 'profissional'

// ── Botão voltar ─────────────────────────────────────────────────────────────

function BotaoVoltar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors duration-200 mb-10 group"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
      Voltar
    </button>
  )
}

// ── VIEW: home ────────────────────────────────────────────────────────────────

function HomeView({
  onPaciente,
  onProfissional,
}: {
  onPaciente: () => void
  onProfissional: () => void
}) {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Gradiente animado de fundo */}
      <div
        className="absolute inset-0 hero-gradient"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 65% 35%, #ede9e3 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, #dce8e0 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #e8e0ec 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Eyebrow */}
        <p
          className="anim-fade-in delay-100 text-xs uppercase tracking-[0.5em] text-stone-400 mb-6"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Ecossistema de Dermatologia
        </p>

        {/* Título */}
        <h1
          className="anim-fade-up delay-200 text-7xl sm:text-8xl lg:text-9xl font-bold uppercase leading-none mb-4"
          style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            color: '#1C1C1A',
            letterSpacing: '0.12em',
          }}
        >
          VULPI
        </h1>

        {/* Subtítulo */}
        <p
          className="anim-fade-up delay-300 text-lg sm:text-xl italic text-stone-500 mb-6 tracking-wide"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          Ciência aplicada. Decisão segura.
        </p>

        {/* Divisor */}
        <div className="anim-fade-in delay-400 flex items-center justify-center gap-4 mb-8">
          <div className="line-grow w-12 h-px bg-stone-300" />
          <span className="text-stone-300 text-xs tracking-widest">✦</span>
          <div className="line-grow w-12 h-px bg-stone-300" style={{ animationDelay: '0.1s' }} />
        </div>

        {/* Descrição */}
        <p
          className="anim-fade-up delay-500 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto mb-12"
          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
        >
          Ferramentas clínicas e de cuidado com a pele, desenvolvidas por um dermatologista para orientar decisões com base em evidência — não em tendência.
        </p>

        {/* Cards de seleção */}
        <div className="anim-fade-up delay-700 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Paciente */}
          <button
            onClick={onPaciente}
            className="group bg-white border border-stone-100 rounded-xl p-8 card-hover cursor-pointer text-left flex flex-col justify-between min-h-[160px] transition-all duration-300"
          >
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Sou
              </p>
              <p
                className="text-3xl font-semibold text-stone-900 leading-tight mb-2"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
              >
                Paciente
              </p>
              <p
                className="text-xs text-stone-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Acesse recursos desenvolvidos para guiar seu cuidado com a pele com segurança e clareza.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <span className="text-stone-300 group-hover:text-stone-500 transition-colors duration-200 text-base">
                →
              </span>
            </div>
          </button>

          {/* Profissional */}
          <button
            onClick={onProfissional}
            className="group bg-white border border-stone-100 rounded-xl p-8 card-hover cursor-pointer text-left flex flex-col justify-between min-h-[160px] transition-all duration-300"
          >
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Sou
              </p>
              <p
                className="text-3xl font-semibold text-stone-900 leading-tight mb-2"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
              >
                Profissional de Saúde
              </p>
              <p
                className="text-xs text-stone-400 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Acesse os sistemas clínicos, de prescrição e de gestão da Clínica Crepaldi.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <span className="text-stone-300 group-hover:text-stone-500 transition-colors duration-200 text-base">
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

// ── VIEW: paciente ────────────────────────────────────────────────────────────

function PacienteView({ onVoltar }: { onVoltar: () => void }) {
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="anim-fade-up">
          <BotaoVoltar onClick={onVoltar} />

          <p
            className="text-xs uppercase tracking-[0.35em] text-stone-400 mb-3"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            VULPI
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Área do Paciente
          </h2>
          <p
            className="text-sm text-stone-400 mb-12 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Ferramentas criadas para que você tome decisões mais seguras sobre a sua pele.
          </p>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-4">
            {/* Clube Pele Segura — Em breve */}
            <div
              className="bg-white border border-stone-100 rounded-xl p-6 opacity-60 cursor-default"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span
                  className="text-xs bg-stone-100 text-stone-400 px-3 py-1 rounded-full"
                  style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                >
                  Em breve
                </span>
              </div>
              <p
                className="text-xl font-semibold text-stone-900 mb-2"
                style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
              >
                Clube Pele Segura
              </p>
              <p
                className="text-xs text-stone-500 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Skincare personalizado com base no seu biotipo e nas suas queixas reais. Produtos e rotinas recomendados por um dermatologista — sem achismo, sem exagero.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── VIEW: profissional ────────────────────────────────────────────────────────

const sistemas = [
  {
    id: 'farmacia',
    titulo: 'Sistema Farmácia',
    descricao: 'Catálogo completo de formulações magistrais VULPI, protocolos terapêuticos por linha e geração de prescrições.',
    status: 'ativo' as const,
  },
  {
    id: 'avaliacao',
    titulo: 'Sistema Avaliação',
    descricao: 'Assistente de consulta para avaliação rápida de queixas e indicação de procedimentos estéticos com base em evidência.',
    status: 'em-breve' as const,
  },
  {
    id: 'biologicos',
    titulo: 'Sistema Biológicos',
    descricao: 'Gestão de solicitações, auditorias e laudos para terapia biológica em psoríase e outras dermatoses inflamatórias.',
    status: 'em-breve' as const,
  },
  {
    id: 'viral',
    titulo: 'Sistema Viral',
    descricao: 'Monitoramento de tendências, análise de engajamento e geração de roteiros para conteúdo dermatológico em redes sociais.',
    status: 'em-breve' as const,
  },
]

function ProfissionalView({ onVoltar }: { onVoltar: () => void }) {
  return (
    <section className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="anim-fade-up">
          <BotaoVoltar onClick={onVoltar} />

          <p
            className="text-xs uppercase tracking-[0.35em] text-stone-400 mb-3"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            VULPI
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-1"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Área do Profissional
          </h2>
          <p
            className="text-xs text-stone-400 mb-12 tracking-wide"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Acesso restrito · Clínica Crepaldi
          </p>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sistemas.map((s, i) => {
              const ativo = s.status === 'ativo'
              return (
                <div
                  key={s.id}
                  onClick={ativo ? () => { window.location.href = '/login' } : undefined}
                  className={`anim-fade-up bg-white rounded-xl p-6 flex flex-col justify-between min-h-[160px] transition-all duration-300 ${
                    ativo
                      ? 'border border-stone-200 card-hover cursor-pointer group'
                      : 'border border-stone-100 opacity-50 cursor-default'
                  }`}
                  style={{
                    borderLeft: ativo ? '3px solid #1C1C1A' : undefined,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {ativo ? (
                        <span
                          className="text-xs bg-stone-900 text-white px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                        >
                          Disponível
                        </span>
                      ) : (
                        <span
                          className="text-xs bg-stone-100 text-stone-400 px-3 py-1 rounded-full"
                          style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                        >
                          Em breve
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xl font-semibold text-stone-900 mb-2"
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
                    >
                      {s.titulo}
                    </p>
                    <p
                      className="text-xs text-stone-500 leading-relaxed"
                      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
                    >
                      {s.descricao}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <span
                      className={`text-base transition-colors duration-200 ${
                        ativo ? 'text-stone-400 group-hover:text-stone-700' : 'text-stone-200'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-lg font-bold uppercase tracking-[0.2em] text-stone-400"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          VULPI
        </span>
        <p className="text-xs text-stone-400 text-center">
          Alta Dermatologia Magistral · Clínica Crepaldi · Uso exclusivo profissional
        </p>
      </div>
    </footer>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function Home() {
  const [view, setView] = useState<View>('home')

  return (
    <div>
      <div key={view}>
        {view === 'home' && (
          <HomeView
            onPaciente={() => setView('paciente')}
            onProfissional={() => setView('profissional')}
          />
        )}
        {view === 'paciente' && (
          <PacienteView onVoltar={() => setView('home')} />
        )}
        {view === 'profissional' && (
          <ProfissionalView onVoltar={() => setView('home')} />
        )}
      </div>
      <Footer />
    </div>
  )
}
