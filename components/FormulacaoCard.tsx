import Link from "next/link";
import { Formulacao } from "@/app/data/formulations";
import StatusBadge from "./StatusBadge";
import ViaBadge from "./ViaBadge";

interface FormulacaoCardProps {
  formulacao: Formulacao;
}

export default function FormulacaoCard({ formulacao }: FormulacaoCardProps) {
  return (
    <Link href={`/formulacao/${formulacao.id}`}>
      <div
        className="bg-white rounded-lg border border-stone-200 p-4 hover:shadow-md transition-all duration-200 hover:border-stone-300 h-full flex flex-col"
        style={{ borderLeft: `4px solid ${formulacao.acento_cor}` }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="text-xs font-mono text-stone-400 tracking-wider"
            style={{ fontFamily: "var(--font-roboto-mono, monospace)" }}
          >
            {formulacao.id}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <StatusBadge status={formulacao.status} />
          </div>
        </div>
        <h3 className="text-sm font-medium text-stone-800 leading-snug mb-3 flex-grow">
          {formulacao.nome}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <ViaBadge via={formulacao.via} />
          <span
            className="text-xs truncate max-w-[120px] font-medium"
            title={formulacao.linha}
            style={{ color: formulacao.acento_cor }}
          >
            {formulacao.linha}
          </span>
        </div>
      </div>
    </Link>
  );
}
