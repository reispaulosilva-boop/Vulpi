import Link from "next/link";
import { getLinhas, formulacoes } from "@/app/data/formulations";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const linhas = getLinhas();

  const emUsoMap = new Map<string, number>();
  for (const f of formulacoes) {
    if (f.status === "EM USO") {
      emUsoMap.set(f.linhaSlug, (emUsoMap.get(f.linhaSlug) ?? 0) + 1);
    }
  }

  const totalFormulacoes = linhas.reduce((acc, l) => acc + l.count, 0);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Gradiente animado de fundo */}
        <div
          className="absolute inset-0 hero-gradient"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 65% 35%, #ede9e3 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, #dce8e0 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #e8e0ec 0%, transparent 45%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p
            className="anim-fade-in delay-100 text-xs uppercase tracking-[0.5em] text-stone-400 mb-6"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Clínica Crepaldi
          </p>

          {/* Título principal */}
          <h1
            className="anim-fade-up delay-200 text-7xl sm:text-8xl lg:text-9xl font-bold uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-cormorant, Georgia, serif)",
              color: "#1C1C1A",
              letterSpacing: "0.12em",
            }}
          >
            VULPI
          </h1>

          {/* Subtítulo */}
          <p
            className="anim-fade-up delay-300 text-lg sm:text-xl italic text-stone-500 mb-6 tracking-wide"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Alta Dermatologia Magistral
          </p>

          {/* Divisor animado */}
          <div className="anim-fade-in delay-400 flex items-center justify-center gap-4 mb-8">
            <div className="line-grow w-12 h-px bg-stone-300" />
            <span className="text-stone-300 text-xs tracking-widest">✦</span>
            <div className="line-grow w-12 h-px bg-stone-300" style={{ animationDelay: "0.1s" }} />
          </div>

          {/* Descrição */}
          <p
            className="anim-fade-up delay-500 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto mb-4"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Formulações magistrais de alta performance, desenvolvidas para
            resultados reais e mensuráveis.
          </p>

          <p
            className="anim-fade-up delay-600 text-sm text-stone-400 leading-loose max-w-lg mx-auto mb-12 italic"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            "A VULPI não nasceu de uma tendência. Nasceu da prática médica — da
            necessidade de entregar tratamentos onde cada ativo e cada
            miligrama são desenhados para um alvo específico."
          </p>

          {/* CTAs */}
          <div className="anim-fade-up delay-700 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white text-sm tracking-wide rounded-full hover:bg-stone-700 transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/20 hover:-translate-y-0.5"
            >
              Ver Catálogo Completo
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/protocolos"
              className="group inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 text-sm tracking-wide rounded-full hover:border-stone-600 hover:text-stone-900 transition-all duration-300 hover:-translate-y-0.5"
            >
              Protocolos Clínicos
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="anim-fade-in delay-700 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-300"
            style={{ fontFamily: "var(--font-inter)" }}>
            scroll
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <ScrollReveal>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: totalFormulacoes, label: "Formulações" },
                { value: linhas.length, label: "Linhas" },
                { value: 38, label: "Protocolos" },
                { value: "100%", label: "Magistral" },
              ].map(({ value, label }, i) => (
                <div key={label} className="anim-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <p
                    className="text-4xl sm:text-5xl font-bold mb-1 text-white"
                    style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-stone-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Linhas Terapêuticas ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-400 mb-3"
              style={{ fontFamily: "var(--font-inter)" }}>
              Linhas Terapêuticas
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-stone-900"
              style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
            >
              Formulações por Especialidade
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {linhas.map((linha, i) => (
              <ScrollReveal key={linha.linhaSlug} delay={i * 50}>
                <Link
                  href={`/catalogo?linha=${linha.linhaSlug}`}
                  className="group relative bg-white rounded-xl border border-stone-100 p-6 card-hover overflow-hidden flex flex-col h-full"
                  style={{ borderLeft: `3px solid ${linha.acento_cor}` }}
                >
                  {/* Fundo de cor ao hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: linha.acento_cor + "08" }}
                  />

                  {/* Círculo decorativo */}
                  <div
                    className="relative w-9 h-9 rounded-full mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: linha.acento_cor + "18",
                      border: `1.5px solid ${linha.acento_cor}30`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: linha.acento_cor }}
                    />
                  </div>

                  <div className="relative flex-1">
                    <h3
                      className="text-sm font-semibold text-stone-800 mb-2 leading-snug transition-colors duration-200 group-hover:text-stone-900"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {linha.linha}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {linha.count} formulação{linha.count !== 1 ? "ões" : ""}
                    </p>
                    {(emUsoMap.get(linha.linhaSlug) ?? 0) > 0 && (
                      <p className="text-xs mt-1 font-medium" style={{ color: linha.acento_cor }}>
                        {emUsoMap.get(linha.linhaSlug)} em uso
                      </p>
                    )}
                  </div>

                  {/* Seta */}
                  <div className="relative mt-4 flex items-center justify-end">
                    <span
                      className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 -translate-x-2"
                      style={{ color: linha.acento_cor, fontFamily: "var(--font-inter)" }}
                    >
                      Ver formulações →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <ScrollReveal>
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-stone-400 mb-6"
              style={{ fontFamily: "var(--font-inter)" }}>
              Nossa Filosofia
            </p>
            <blockquote
              className="text-2xl sm:text-3xl font-light italic text-stone-700 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
            >
              "Ciência prescrita. Resultado real."
            </blockquote>
            <div className="w-8 h-px bg-stone-300 mx-auto mb-8" />
            <p className="text-sm text-stone-500 leading-loose">
              A VULPI não nasceu de uma tendência de mercado. Nasceu da prática
              médica clínica — da necessidade de entregar tratamentos onde cada
              ativo, cada miligrama e cada veículo são desenhados para um alvo
              específico.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-lg font-bold uppercase tracking-[0.2em] text-stone-400"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            VULPI
          </span>
          <p className="text-xs text-stone-400 text-center">
            Alta Dermatologia Magistral · Clínica Crepaldi · Uso exclusivo profissional
          </p>
        </div>
      </footer>
    </div>
  );
}
