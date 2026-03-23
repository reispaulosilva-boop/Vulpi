import Link from "next/link";
import { Formulacao } from "@/app/data/formulations";
import StatusBadge from "./StatusBadge";
import ViaBadge from "./ViaBadge";

interface FormulacaoCardProps {
  formulacao: Formulacao;
}

export default function FormulacaoCard({ formulacao }: FormulacaoCardProps) {
  return (
    <Link href={`/formulacao/${formulacao.id}`} className="group block h-full">
      <div
        className="relative bg-white rounded-lg border border-stone-150 p-4 h-full flex flex-col overflow-hidden card-hover"
        style={{ borderLeft: `3px solid ${formulacao.acento_cor}` }}
      >
        {/* Fundo de cor sutil ao hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: formulacao.acento_cor + "06" }}
        />

        {/* Conteúdo */}
        <div className="relative">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span
              className="text-[11px] text-stone-400 tracking-wider transition-colors duration-200 group-hover:text-stone-600"
              style={{ fontFamily: "var(--font-roboto-mono, monospace)" }}
            >
              {formulacao.id}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <StatusBadge status={formulacao.status} />
            </div>
          </div>

          <h3 className="text-sm font-medium text-stone-800 leading-snug mb-3 flex-grow transition-colors duration-200 group-hover:text-stone-900">
            {formulacao.nome}
          </h3>

          <div className="flex items-center justify-between gap-2 mt-auto">
            <ViaBadge via={formulacao.via} />
            <span
              className="text-xs truncate max-w-[110px] font-medium opacity-70 group-hover:opacity-100 transition-opacity duration-200"
              title={formulacao.linha}
              style={{ color: formulacao.acento_cor }}
            >
              {formulacao.linha}
            </span>
          </div>
        </div>

        {/* Indicator dot */}
        <div
          className="absolute bottom-0 right-0 w-12 h-12 rounded-tl-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: formulacao.acento_cor }}
        />
      </div>
    </Link>
  );
}
