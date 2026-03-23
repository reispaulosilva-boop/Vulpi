"use client";

import { useState, useMemo } from "react";
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

  const linhas = getLinhas();

  const filtered = useMemo(() => {
    return formulacoes.filter((f) => {
      const matchLinha =
        selectedLinha === "todos" || f.linhaSlug === selectedLinha;
      const matchStatus =
        selectedStatus === "todos" || f.status === selectedStatus;
      const matchVia = selectedVia === "todos" || f.via === selectedVia;
      const matchSearch =
        search === "" ||
        f.nome.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase()) ||
        f.indicacao.toLowerCase().includes(search.toLowerCase());
      return matchLinha && matchStatus && matchVia && matchSearch;
    });
  }, [selectedLinha, selectedStatus, selectedVia, search]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-2">
            VULPI
          </p>
          <h1
            className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Catálogo de Formulações
          </h1>
          <p className="text-sm text-stone-500">
            {filtered.length} formulação{filtered.length !== 1 ? "ões" : ""}{" "}
            encontrada{filtered.length !== 1 ? "s" : ""}
            {formulacoes.length !== filtered.length &&
              ` de ${formulacoes.length} total`}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome, código ou indicação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 bg-white"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Linha filter */}
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
              Linha
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLinha("todos")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                  selectedLinha === "todos"
                    ? "bg-stone-900 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
                }`}
              >
                Todos
              </button>
              {linhas.map((l) => (
                <button
                  key={l.linhaSlug}
                  onClick={() => setSelectedLinha(l.linhaSlug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                    selectedLinha === l.linhaSlug
                      ? "text-white"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
                  }`}
                  style={
                    selectedLinha === l.linhaSlug
                      ? { backgroundColor: l.acento_cor }
                      : {}
                  }
                >
                  {l.linha}
                </button>
              ))}
            </div>
          </div>

          {/* Status and Via filters */}
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                Status
              </p>
              <div className="flex gap-2">
                {["todos", "EM USO", "NOVO", "PROPOSTO"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                      selectedStatus === s
                        ? "bg-stone-900 text-white"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    {s === "todos" ? "Todos" : s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                Via
              </p>
              <div className="flex gap-2">
                {["todos", "VT", "VO"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVia(v)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 ${
                      selectedVia === v
                        ? "bg-stone-900 text-white"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400"
                    }`}
                  >
                    {v === "todos" ? "Todos" : v === "VT" ? "Tópico" : "Oral"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 text-sm">
              Nenhuma formulação encontrada com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((f) => (
              <FormulacaoCard key={f.id} formulacao={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400 text-sm">Carregando...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
