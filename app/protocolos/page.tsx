import Link from "next/link";
import { getFormulacaoById } from "@/app/data/formulations";
import CopiarProtocolo from "@/components/CopiarProtocolo";

interface Protocolo {
  condicao: string;
  ids: string[];
}

const protocolos: Protocolo[] = [
  { condicao: "ACNE LEVE", ids: ["VP-ACN-001", "VP-ACN-002", "VP-ACN-003", "VP-FPS-001"] },
  { condicao: "ACNE MODERADA", ids: ["VP-ACN-001", "VP-ACN-002", "VP-ACN-003", "VP-ACN-O01", "VP-ACN-O02", "VP-ACN-O03"] },
  { condicao: "ACNE HORMONAL", ids: ["VP-ACN-001", "VP-ACN-002", "VP-ACN-003", "VP-ACN-O04"] },
  { condicao: "ACNE DORSO", ids: ["VP-ACN-004", "VP-ACN-003"] },
  { condicao: "ISOTRETINOÍNA", ids: ["VP-ISO-001", "VP-ISO-002", "VP-ISO-O01"] },
  { condicao: "MELASMA", ids: ["VP-MEL-001", "VP-MEL-002", "VP-MEL-O01", "VP-FPS-001", "VP-FPS-O01"] },
  { condicao: "MELASMA REFRATÁRIO", ids: ["VP-MEL-001B", "VP-MEL-002", "VP-MEL-O01", "VP-FPS-001", "VP-FPS-O01"] },
  { condicao: "MELASMA MANUTENÇÃO", ids: ["VP-MEL-003", "VP-FPS-001", "VP-FPS-O01"] },
  { condicao: "ROSÁCEA ATIVA", ids: ["VP-ROS-001", "VP-ROS-002", "VP-ROS-O01"] },
  { condicao: "ROSÁCEA MANUTENÇÃO", ids: ["VP-ROS-001", "VP-ROS-002", "VP-ROS-O02"] },
  { condicao: "ROSÁCEA CRISE SOS", ids: ["VP-ROS-003"] },
  { condicao: "DS FACIAL", ids: ["VP-DS-001", "VP-DS-002", "VP-FPS-001", "VP-DS-O01"] },
  { condicao: "DS COURO CABELUDO", ids: ["VP-DS-003", "VP-DS-O01"] },
  { condicao: "DS CRISE FACIAL SOS", ids: ["VP-DS-004"] },
  { condicao: "FOLICULITE BACTERIANA", ids: ["VP-FOL-001", "VP-FOL-O01"] },
  { condicao: "FOLICULITE MANUTENÇÃO", ids: ["VP-FOL-003"] },
  { condicao: "FOLICULITE PITIRIOSPÓRICA", ids: ["VP-FOL-002", "VP-FOL-O02"] },
  { condicao: "ANTI-AGING 20-30+", ids: ["VP-AGE-001", "VP-FPS-001"] },
  { condicao: "ANTI-AGING 30+", ids: ["VP-AGE-002", "VP-AGE-O01"] },
  { condicao: "ANTI-AGING 40+", ids: ["VP-AGE-003", "VP-AGE-O01", "VP-AGE-O02"] },
  { condicao: "PÓS-PROCEDIMENTO", ids: ["VP-POS-001", "VP-POS-O01"] },
  { condicao: "CELULITE GRAU 1-2", ids: ["VP-CEL-001", "VP-CEL-O01"] },
  { condicao: "CELULITE EDEMATOSA", ids: ["VP-CEL-002", "VP-CEL-O01"] },
  { condicao: "GORDURA LOCALIZADA", ids: ["VP-CEL-003"] },
  { condicao: "HIPERIDROSE", ids: ["VP-HIP-001", "VP-HIP-O01"] },
  { condicao: "HIPERIDROSE SENSÍVEL", ids: ["VP-HIP-002"] },
  { condicao: "CERATOSE PILAR", ids: ["VP-COR-001"] },
  { condicao: "BROMIDROSE", ids: ["VP-COR-002"] },
  { condicao: "ESTRIAS", ids: ["VP-COR-EST-001"] },
  { condicao: "MICOSES TÓPICA", ids: ["VP-MIC-001"] },
  { condicao: "MICOSES ORAL", ids: ["VP-MIC-O01", "VP-MIC-O03"] },
  { condicao: "CAPILAR QUEDA", ids: ["VP-CAP-001", "VP-CAP-002", "VP-CAP-O01"] },
  { condicao: "DERMATITE ATÓPICA", ids: ["VP-DA-001", "VP-DA-O01"] },
  { condicao: "VASOS FACIAIS", ids: ["VP-ESP-001"] },
  { condicao: "VITILIGO", ids: ["VP-VIT-001"] },
  { condicao: "PSORÍASE LEVE", ids: ["VP-PSO-001"] },
];

const grupos: Record<string, string[]> = {
  Acne: ["ACNE LEVE", "ACNE MODERADA", "ACNE HORMONAL", "ACNE DORSO"],
  "Isotretinoína": ["ISOTRETINOÍNA"],
  Melasma: ["MELASMA", "MELASMA REFRATÁRIO", "MELASMA MANUTENÇÃO"],
  "Rosácea": ["ROSÁCEA ATIVA", "ROSÁCEA MANUTENÇÃO", "ROSÁCEA CRISE SOS"],
  "Dermatite Seborreica": ["DS FACIAL", "DS COURO CABELUDO", "DS CRISE FACIAL SOS"],
  Foliculite: ["FOLICULITE BACTERIANA", "FOLICULITE MANUTENÇÃO", "FOLICULITE PITIRIOSPÓRICA"],
  "Anti-Aging": ["ANTI-AGING 20-30+", "ANTI-AGING 30+", "ANTI-AGING 40+"],
  "Pós-Procedimento": ["PÓS-PROCEDIMENTO"],
  Corporal: ["CELULITE GRAU 1-2", "CELULITE EDEMATOSA", "GORDURA LOCALIZADA", "HIPERIDROSE", "HIPERIDROSE SENSÍVEL", "CERATOSE PILAR", "BROMIDROSE", "ESTRIAS"],
  Micoses: ["MICOSES TÓPICA", "MICOSES ORAL"],
  Capilar: ["CAPILAR QUEDA"],
  "Condições Especiais": ["DERMATITE ATÓPICA", "VASOS FACIAIS", "VITILIGO", "PSORÍASE LEVE"],
};

const grupoColors: Record<string, string> = {
  Acne: "#1B4FD8",
  "Isotretinoína": "#6B2737",
  Melasma: "#4A5C3F",
  "Rosácea": "#B5614A",
  "Dermatite Seborreica": "#4A6172",
  Foliculite: "#2E6B5E",
  "Anti-Aging": "#6B2737",
  "Pós-Procedimento": "#7A7A7A",
  Corporal: "#5C4B7A",
  Micoses: "#8B4513",
  Capilar: "#B07D3A",
  "Condições Especiais": "#4A6172",
};

function ProtocoloChip({ id }: { id: string }) {
  const formulacao = getFormulacaoById(id);
  const via = formulacao?.via;
  const nome = formulacao?.nome;

  return (
    <Link href={`/formulacao/${id}`}>
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm transition-all duration-150 cursor-pointer"
        title={nome}
      >
        {via === "VO" && (
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
        )}
        {via === "VT" && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
        )}
        <span
          className="font-mono text-stone-600"
          style={{ fontFamily: "var(--font-roboto-mono, monospace)" }}
        >
          {id}
        </span>
      </span>
    </Link>
  );
}

export default function ProtocolosPage() {
  const protocoloMap = new Map(protocolos.map((p) => [p.condicao, p]));

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-2">
            VULPI
          </p>
          <h1
            className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3"
            style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
          >
            Protocolos Clínicos
          </h1>
          <p className="text-sm text-stone-500">
            {protocolos.length} protocolos · Clínica Crepaldi
          </p>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs text-stone-500">Tópico (VT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs text-stone-500">Oral (VO)</span>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-10">
          {Object.entries(grupos).map(([grupo, condicoes]) => (
            <div key={grupo}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: grupoColors[grupo] }}
                />
                <h2
                  className="text-lg font-semibold text-stone-800"
                  style={{ fontFamily: "var(--font-cormorant, Georgia, serif)" }}
                >
                  {grupo}
                </h2>
                <div className="flex-1 h-px bg-stone-100" />
              </div>

              <div className="space-y-3">
                {condicoes.map((condicao) => {
                  const protocolo = protocoloMap.get(condicao);
                  if (!protocolo) return null;

                  return (
                    <div
                      key={condicao}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 py-3 px-4 bg-white rounded-lg border border-stone-100 hover:border-stone-200 transition-colors"
                    >
                      <div className="sm:w-56 flex-shrink-0 flex items-center justify-between sm:block gap-2">
                        <p className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                          {condicao}
                        </p>
                        <div className="sm:hidden">
                          <CopiarProtocolo condicao={condicao} codigos={protocolo.ids} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 flex-1">
                        {protocolo.ids.map((id) => (
                          <ProtocoloChip key={id} id={id} />
                        ))}
                      </div>
                      <div className="hidden sm:block flex-shrink-0">
                        <CopiarProtocolo condicao={condicao} codigos={protocolo.ids} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-4 bg-stone-50 rounded-lg border border-stone-100">
          <p className="text-xs text-stone-500 leading-relaxed">
            <strong className="font-semibold text-stone-700">
              Uso exclusivo profissional.
            </strong>{" "}
            Estes protocolos foram desenvolvidos pela equipe da Clínica Crepaldi
            para orientação da prática clínica. A prescrição deve ser
            individualizada conforme avaliação médica.
          </p>
        </div>
      </div>
    </div>
  );
}
