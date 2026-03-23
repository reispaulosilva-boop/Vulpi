import Link from "next/link";
import { getLinhas, formulacoes } from "@/app/data/formulations";

export default function Home() {
  const linhas = getLinhas();

  // Build a map of emUsoCount per linhaSlug
  const emUsoMap = new Map<string, number>();
  for (const f of formulacoes) {
    if (f.status === "EM USO") {
      emUsoMap.set(f.linhaSlug, (emUsoMap.get(f.linhaSlug) ?? 0) + 1);
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 60% 40%, #e8e4de 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #dce8e0 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Clínica Crepaldi
          </p>
          <h1
            className="text-7xl sm:text-8xl lg:text-9xl font-bold uppercase tracking-[0.15em] text-stone-900 mb-4 leading-none"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            VULPI
          </h1>
          <p
            className="text-lg sm:text-xl italic text-stone-500 mb-8 tracking-wide"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Alta Dermatologia Magistral
          </p>
          <div className="w-16 h-px bg-stone-300 mx-auto mb-8" />
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto mb-6">
            Formulações magistrais de alta performance, desenvolvidas pela
            Clínica Crepaldi para resultados reais e mensuráveis.
          </p>
          <p className="text-sm text-stone-400 leading-loose max-w-lg mx-auto mb-12 italic">
            A VULPI não nasceu de uma tendência de mercado. Nasceu da prática médica clínica — da necessidade de entregar tratamentos onde cada ativo, cada miligrama e cada veículo são desenhados para um alvo específico.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white text-sm tracking-wide rounded-full hover:bg-stone-700 transition-colors duration-200"
            >
              Ver Catálogo Completo
            </Link>
            <Link
              href="/protocolos"
              className="inline-flex items-center gap-2 px-8 py-3 border border-stone-300 text-stone-700 text-sm tracking-wide rounded-full hover:border-stone-500 hover:text-stone-900 transition-colors duration-200"
            >
              Protocolos Clínicos
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-stone-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Lines Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3">
              Linhas Terapêuticas
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-stone-900"
              style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
            >
              Formulações por Especialidade
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {linhas.map((linha) => (
              <Link
                key={linha.linhaSlug}
                href={`/catalogo?linha=${linha.linhaSlug}`}
                className="group relative bg-white rounded-xl border border-stone-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-stone-200 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: linha.acento_cor }}
                />
                <div className="pl-3">
                  <div
                    className="w-8 h-8 rounded-full mb-4 opacity-90"
                    style={{ backgroundColor: linha.acento_cor + "20", border: `2px solid ${linha.acento_cor}40` }}
                  />
                  <h3 className="text-sm font-semibold text-stone-800 mb-2 leading-snug group-hover:text-stone-900">
                    {linha.linha}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {linha.count} formulação{linha.count !== 1 ? "ões" : ""}
                  </p>
                  {(emUsoMap.get(linha.linhaSlug) ?? 0) > 0 && (
                    <p className="text-xs mt-1" style={{ color: linha.acento_cor }}>
                      {emUsoMap.get(linha.linhaSlug)} em uso
                    </p>
                  )}
                </div>
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-5"
                  style={{ backgroundColor: linha.acento_cor }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
              >
                {linhas.reduce((acc, l) => acc + l.count, 0)}
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Formulações
              </p>
            </div>
            <div>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
              >
                {linhas.length}
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Linhas
              </p>
            </div>
            <div>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
              >
                38
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Protocolos
              </p>
            </div>
            <div>
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
              >
                100%
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Magistral
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
            Nossa Filosofia
          </p>
          <blockquote
            className="text-2xl sm:text-3xl font-light italic text-stone-700 leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            "Ciência prescrita. Resultado real."
          </blockquote>
          <p className="text-sm text-stone-500 leading-loose">
            A VULPI não nasceu de uma tendência de mercado. Nasceu da prática médica clínica — da necessidade de entregar tratamentos onde cada ativo, cada miligrama e cada veículo são desenhados para um alvo específico.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-lg font-bold uppercase tracking-[0.2em] text-stone-400"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            VULPI
          </span>
          <p className="text-xs text-stone-400 text-center">
            Alta Dermatologia Magistral · Clínica Crepaldi · Uso exclusivo
            profissional
          </p>
        </div>
      </footer>
    </div>
  );
}
