"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { formulacoes, getLinhas } from "@/app/data/formulations";
import FormulacaoCard from "@/components/FormulacaoCard";

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialLinha = searchParams.get("linha") || "todos";

  const [selectedLinha, setSelectedLinha] = useState(initialLinha);
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedVia, setSelectedVia] = useState("todos");
  const [search, setSearch] = useState("");
  const [gridKey, setGridKey] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const linhas = getLinhas();

  const filtered = useMemo(() => {
    return formulacoes.filter((f) => {
      const matchLinha = selectedLinha === "todos" || f.linhaSlug === selectedLinha;
      const matchStatus = selectedStatus === "todos" || f.status === selectedStatus;
      const matchVia = selectedVia === "todos" || f.via === selectedVia;
      const matchSearch =
        search === "" ||
        f.nome.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase()) ||
        f.indicacao.toLowerCase().includes(search.toLowerCase());
      return matchLinha && matchStatus && matchVia && matchSearch;
    });
  }, [selectedLinha, selectedStatus, selectedVia, search]);

  // Atualiza key para re-animar o grid quando filtro muda
  useEffect(() => {
    setGridKey((k) => k + 1);
  }, [selectedLinha, selectedStatus, selectedVia, search]);

  const handleLinha = (slug: string) => setSelectedLinha(slug);
  const handleStatus = (s: string) => setSelectedStatus(s);
  const handleVia = (v: string) => setSelectedVia(v);

  const activeLinha = linhas.find((l) => l.linhaSlug === selectedLinha);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 anim-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-2"
            style={{ fontFamily: "var(--font-inter)" }}>
            VULPI
          </p>
          <h1
            className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Catálogo de Formulações
          </h1>
          <p className="text-sm text-stone-500 transition-all duration-300">
            <span className="font-medium" style={{ color: activeLinha?.acento_cor || "#78716c" }}>
              {filtered.length}
            </span>{" "}
            formulação{filtered.length !== 1 ? "ões" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
            {formulacoes.length !== filtered.length && (
              <span className="text-stone-400"> de {formulacoes.length} total</span>
            )}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 anim-fade-up delay-100">
          <div className="relative w-full sm:w-80">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Nome, código ou indicação..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 bg-white transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-4 mb-10 anim-fade-up delay-200">
          {/* Linha */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2.5"
              style={{ fontFamily: "var(--font-inter)" }}>
              Linha
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleLinha("todos")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedLinha === "todos"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-800"
                }`}
              >
                Todos
              </button>
              {linhas.map((l) => (
                <button
                  key={l.linhaSlug}
                  onClick={() => handleLinha(l.linhaSlug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedLinha === l.linhaSlug
                      ? "text-white shadow-sm"
                      : "bg-white border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800"
                  }`}
                  style={
                    selectedLinha === l.linhaSlug
                      ? { backgroundColor: l.acento_cor }
                      : { borderColor: l.acento_cor + "30" }
                  }
                >
                  {l.linha}
                </button>
              ))}
            </div>
          </div>

          {/* Status + Via */}
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2"
                style={{ fontFamily: "var(--font-inter)" }}>
                Status
              </p>
              <div className="flex gap-2">
                {[
                  { value: "todos", label: "Todos" },
                  { value: "EM USO", label: "Em Uso" },
                  { value: "NOVO", label: "Novo" },
                  { value: "PROPOSTO", label: "Proposto" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleStatus(value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedStatus === value
                        ? "bg-stone-900 text-white shadow-sm"
                        : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2"
                style={{ fontFamily: "var(--font-inter)" }}>
                Via
              </p>
              <div className="flex gap-2">
                {[
                  { value: "todos", label: "Todos" },
                  { value: "VT", label: "Tópico" },
                  { value: "VO", label: "Oral" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => handleVia(value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedVia === value
                        ? "bg-stone-900 text-white shadow-sm"
                        : "bg-white border border-stone-200 text-stone-500 hover:border-stone-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 anim-fade-in">
            <p className="text-stone-400 text-sm">
              Nenhuma formulação encontrada com os filtros selecionados.
            </p>
            <button
              onClick={() => { setSelectedLinha("todos"); setSelectedStatus("todos"); setSelectedVia("todos"); setSearch(""); }}
              className="mt-4 text-xs text-stone-500 underline hover:text-stone-800 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div
            key={gridKey}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((f, i) => (
              <div
                key={f.id}
                className="anim-scale-in"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <FormulacaoCard formulacao={f} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-3xl font-semibold text-stone-300 mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            VULPI
          </p>
          <p className="text-xs text-stone-300 tracking-widest uppercase">carregando...</p>
        </div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}
