import Link from "next/link";
import { notFound } from "next/navigation";
import { formulacoes, getFormulacaoById } from "@/app/data/formulations";
import StatusBadge from "@/components/StatusBadge";
import ViaBadge from "@/components/ViaBadge";
import CopiarReceita from "@/components/CopiarReceita";

export async function generateStaticParams() {
  return formulacoes.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const formulacao = getFormulacaoById(id);
  if (!formulacao) return { title: "Formulação não encontrada" };
  return {
    title: `${formulacao.id} – ${formulacao.nome} | VULPI`,
    description: formulacao.indicacao,
  };
}

export default async function FormulacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const formulacao = getFormulacaoById(id);

  if (!formulacao) notFound();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar ao Catálogo
        </Link>

        {/* Card */}
        <div
          className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm"
          style={{ borderTop: `4px solid ${formulacao.acento_cor}` }}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-stone-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="text-xs font-mono text-stone-400 tracking-wider bg-stone-50 px-2 py-1 rounded"
                    style={{ fontFamily: "var(--font-roboto-mono, monospace)" }}
                  >
                    {formulacao.id}
                  </span>
                  <span
                    className="text-xs font-medium px-2 py-1 rounded text-white"
                    style={{ backgroundColor: formulacao.acento_cor }}
                  >
                    {formulacao.linha}
                  </span>
                </div>
                <h1
                  className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-4"
                  style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
                >
                  {formulacao.nome}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={formulacao.status} />
                  <ViaBadge via={formulacao.via} />
                </div>
              </div>
              <div className="flex-shrink-0">
                <CopiarReceita formulacao={formulacao} />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Indicação */}
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                Indicação Clínica
              </p>
              <p className="text-stone-700">{formulacao.indicacao}</p>
            </div>

            {/* Ativos */}
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                Ativos
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left py-2 pr-4 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Ativo
                      </th>
                      <th className="text-left py-2 font-medium text-stone-500 text-xs uppercase tracking-wider">
                        Concentração
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formulacao.ativos.map((ativo, i) => (
                      <tr
                        key={i}
                        className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                      >
                        <td className="py-2.5 pr-4 text-stone-800 font-medium">
                          {ativo.nome}
                        </td>
                        <td
                          className="py-2.5 text-stone-600 font-mono text-xs"
                          style={{
                            fontFamily: "var(--font-roboto-mono, monospace)",
                          }}
                        >
                          {ativo.concentracao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                  Veículo
                </p>
                <p className="text-sm text-stone-700">{formulacao.veiculo}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                  Posologia
                </p>
                <p className="text-sm text-stone-700">{formulacao.posologia}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                  Duração
                </p>
                <p className="text-sm text-stone-700">{formulacao.duracao}</p>
              </div>
            </div>

            {/* Equivalente */}
            {formulacao.equivalente_industrializado && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-xs font-medium text-blue-700 uppercase tracking-wider mb-0.5">
                    Equivalente Industrializado
                  </p>
                  <p className="text-sm text-blue-600">
                    {formulacao.equivalente_industrializado}
                  </p>
                </div>
              </div>
            )}

            {/* Observações */}
            {formulacao.observacoes && (
              <div
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  formulacao.observacoes.includes("ALERTA") ||
                  formulacao.observacoes.includes("contraindicado") ||
                  formulacao.observacoes.includes("Contraindicado")
                    ? "bg-amber-50 border-amber-200"
                    : "bg-stone-50 border-stone-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    formulacao.observacoes.includes("ALERTA") ||
                    formulacao.observacoes.includes("contraindicado") ||
                    formulacao.observacoes.includes("Contraindicado")
                      ? "text-amber-500"
                      : "text-stone-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <div>
                  <p
                    className={`text-xs font-medium uppercase tracking-wider mb-0.5 ${
                      formulacao.observacoes.includes("ALERTA") ||
                      formulacao.observacoes.includes("contraindicado") ||
                      formulacao.observacoes.includes("Contraindicado")
                        ? "text-amber-700"
                        : "text-stone-500"
                    }`}
                  >
                    Observações Clínicas
                  </p>
                  <p
                    className={`text-sm ${
                      formulacao.observacoes.includes("ALERTA") ||
                      formulacao.observacoes.includes("contraindicado") ||
                      formulacao.observacoes.includes("Contraindicado")
                        ? "text-amber-700"
                        : "text-stone-600"
                    }`}
                  >
                    {formulacao.observacoes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copiar Receita — botão principal visível */}
        <div className="mt-6">
          <CopiarReceita formulacao={formulacao} />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Link
            href="/catalogo"
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            ← Catálogo
          </Link>
          <Link
            href="/protocolos"
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            Ver Protocolos →
          </Link>
        </div>
      </div>
    </div>
  );
}
