// formulations.ts — VULPI Dataset Completo
// Versão 0 — Março 2026 | Clínica Crepaldi
// 66 formulações | 12 linhas terapêuticas

export type Status = "EM USO" | "NOVO" | "PROPOSTO"
export type Via = "VT" | "VO"

export interface Ativo {
  nome: string
  concentracao: string
  fornecedor: string
}

export interface Formulacao {
  codigo: string
  nome: string
  linha: string
  via: Via
  status: Status
  indicacao: string
  ativos: Ativo[]
  veiculo: string
  duracao: string
  posologia: string
  obs?: string
  equivalenteIndustrializado?: string
}

export const formulacoes: Formulacao[] = [

  // ─────────────────────────────────────────
  // 1. LINHA ACNE & CONTROLE DE OLEOSIDADE
  // ─────────────────────────────────────────

  {
    codigo: "VP-ACN-001",
    nome: "Sérum Seboregulador Diurno",
    linha: "Acne & Oleosidade",
    via: "VT",
    status: "NOVO",
    indicacao: "Controle de oleosidade, redução de poros visíveis, anti-inflamatório leve. Acne comedonênica leve.",
    ativos: [
      { nome: "Niacinamida", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Ácido Azelaico", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Zinco PCA", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Gel-creme oil-free | pH-alvo 5,0–5,5 | qsp 30 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar pela manhã na face limpa, antes do fotoprotetor.",
    obs: "Compatível com adapaleno à noite. Conservar em temperatura ambiente (90 dias).",
    equivalenteIndustrializado: "Sebium Pore Refiner / Pore Control Serum",
  },
  {
    codigo: "VP-ACN-002",
    nome: "Sérum Noturno Renovador Acne",
    linha: "Acne & Oleosidade",
    via: "VT",
    status: "NOVO",
    indicacao: "Acne comedoniana e inflamatória leve a moderada. Substituto magistral do Epiduo.",
    ativos: [
      { nome: "Adapaleno", concentracao: "0,1%", fornecedor: "Galena" },
      { nome: "Alistin™ (Biotec)", concentracao: "0,5%", fornecedor: "Biotec Dermo" },
      { nome: "Peróxido de Benzoíla", concentracao: "2,5%", fornecedor: "Galena" },
      { nome: "Sepicontrol A5®", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Gel reepitelizante | qsp 30 g",
    duracao: "Manutenção 12 semanas",
    posologia: "Aplicar à noite. S/Q/S 1ª sem → alternados 2ª sem → diário 3ª sem em diante.",
    obs: "Fotossensibilizante — fotoprotetor obrigatório. Contraindicado em gestantes.",
    equivalenteIndustrializado: "Epiduo Gel / Azelan Gel",
  },
  {
    codigo: "VP-ACN-002B",
    nome: "Sérum Noturno Acne (Sem Peróxido — Pele Sensível)",
    linha: "Acne & Oleosidade",
    via: "VT",
    status: "NOVO",
    indicacao: "Acne leve-moderada com intolerância ao peróxido de benzoíla. Pele sensibilizada.",
    ativos: [
      { nome: "Adapaleno", concentracao: "0,1%", fornecedor: "Galena" },
      { nome: "Ácido Azelaico", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Bisabolol", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Gel suave | qsp 30 g",
    duracao: "12 semanas",
    posologia: "Aplicar à noite. Mesmo escalonamento do VP-ACN-002.",
    obs: "Alternativa para pacientes intolerantes ao BPO. pH-alvo 5,0–5,5.",
  },
  {
    codigo: "VP-ACN-003",
    nome: "Sabonete Líquido Purificante",
    linha: "Acne & Oleosidade",
    via: "VT",
    status: "NOVO",
    indicacao: "Limpeza com esfoliação suave para pele oleosa/acneica.",
    ativos: [
      { nome: "Ácido Salicílico", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Gluconolactona (PHA)", concentracao: "2%", fornecedor: "Galena" },
      { nome: "D-Pantenol", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Base Syndet suave | pH-alvo 4,5–5,5 | qsp 120 ml",
    duracao: "Uso contínuo",
    posologia: "Lavar rosto 2x/dia, enxaguar em seguida.",
    equivalenteIndustrializado: "Effaclar Gel / Cetaphil Pro AC / Actine / Glycare Control",
  },
  {
    codigo: "VP-ACN-004",
    nome: "Gel Tratamento Acne de Dorso",
    linha: "Acne & Oleosidade",
    via: "VT",
    status: "NOVO",
    indicacao: "Acne de tronco moderada a grave.",
    ativos: [
      { nome: "Enxofre Precipitado", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Nicotinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Ácido Glicólico", concentracao: "10%", fornecedor: "Galena" },
      { nome: "Ácido Azelaico", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Alfa-bisabolol", concentracao: "2%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | qsp 100 g",
    duracao: "8–12 semanas",
    posologia: "Aplicar no dorso à noite. Lavar pela manhã.",
    equivalenteIndustrializado: "Acneben Body Spray",
  },
  {
    codigo: "VP-ACN-O01",
    nome: "Antibioticoterapia Oral Acne (Doxiciclina Manipulada)",
    linha: "Acne & Oleosidade",
    via: "VO",
    status: "NOVO",
    indicacao: "Acne moderada. Alternativa manipulada ao Tetralysal/Doxiciclina industrializado.",
    ativos: [
      { nome: "Doxiciclina Hiclato", concentracao: "100 mg", fornecedor: "Galena / Pharmaespecial" },
    ],
    veiculo: "Cápsula | qsp dose",
    duracao: "4 semanas (leve-moderada) / 8 semanas (grave)",
    posologia: "1 cápsula 12/12h com alimento.",
    obs: "Fotossensibilidade: fotoprotetor rigoroso obrigatório. Contraindicado em gestantes.",
  },
  {
    codigo: "VP-ACN-O01B",
    nome: "Limeciclina Oral (Industrializado — 1ª Escolha)",
    linha: "Acne & Oleosidade",
    via: "VO",
    status: "EM USO",
    indicacao: "Acne moderada. Primeira escolha pela menor fotossensibilidade.",
    ativos: [
      { nome: "Limeciclina (Tetralysal®)", concentracao: "300 mg/dia", fornecedor: "Industrializado" },
    ],
    veiculo: "Cápsula industrializada (Tetralysal®)",
    duracao: "4–8 semanas",
    posologia: "300 mg/dia — 1 cápsula ao dia.",
    obs: "Mantido como industrializado por ausência de matéria-prima manipulável no Brasil.",
  },
  {
    codigo: "VP-ACN-O02",
    nome: "Suporte Durante Antibioticoterapia",
    linha: "Acne & Oleosidade",
    via: "VO",
    status: "NOVO",
    indicacao: "Adjuvante anti-inflamatório e proteção do microbioma intestinal durante antibioticoterapia.",
    ativos: [
      { nome: "Zinco Quelado", concentracao: "30 mg", fornecedor: "Galena" },
      { nome: "Probiótico (L. rhamnosus + L. acidophilus)", concentracao: "10 bi UFC", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula | qsp dose",
    duracao: "Concomitante ao antibiótico + 30 dias após",
    posologia: "1 cápsula ao dia durante a antibioticoterapia.",
  },
  {
    codigo: "VP-ACN-O03",
    nome: "Pós-Ciclo: Restauração da Microbiota",
    linha: "Acne & Oleosidade",
    via: "VO",
    status: "NOVO",
    indicacao: "Restauração do microbioma intestinal após antibioticoterapia.",
    ativos: [
      { nome: "Probiótico (L. rhamnosus + S. boulardii)", concentracao: "5 bi UFC", fornecedor: "Galena" },
      { nome: "Niacinamida (B3)", concentracao: "250 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "30 dias após término do antibiótico",
    posologia: "1 cápsula ao dia.",
  },
  {
    codigo: "VP-ACN-O04",
    nome: "Anti-Androgênico Oral Acne Hormonal Feminina",
    linha: "Acne & Oleosidade",
    via: "VO",
    status: "EM USO",
    indicacao: "Acne hormonal feminina com distribuição mandibular/cervical.",
    ativos: [
      { nome: "Espironolactona", concentracao: "50–100 mg/dia", fornecedor: "Industrializado (RDC)" },
      { nome: "Zinco Quelado", concentracao: "30 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula/Comprimido",
    duracao: "6–12 meses com ajuste por resposta",
    posologia: "50–100 mg/dia — conforme avaliação clínica.",
    obs: "Controlar potássio sérico a cada 3 meses. Contracepção obrigatória.",
  },

  // Suporte Isotretinoína
  {
    codigo: "VP-ISO-001",
    nome: "Bálsamo Reparador Intensivo (Face)",
    linha: "Isotretinoína",
    via: "VT",
    status: "NOVO",
    indicacao: "Xerose e ressecamento facial induzidos pela isotretinoína.",
    ativos: [
      { nome: "Ceramidas Complex", concentracao: "2%", fornecedor: "Galena" },
      { nome: "D-Pantenol", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Aquaporine Active AQP-3 (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Ácido Hialurônico Multipeso", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Creme barreira lipídico | qsp 50 g",
    duracao: "Concomitante à isotretinoína",
    posologia: "Aplicar na face 2x/dia sobre pele úmida.",
  },
  {
    codigo: "VP-ISO-002",
    nome: "Bálsamo Labial Reparador",
    linha: "Isotretinoína",
    via: "VT",
    status: "NOVO",
    indicacao: "Queilite por isotretinoína.",
    ativos: [
      { nome: "Manteiga de Karité", concentracao: "15%", fornecedor: "Biovital" },
      { nome: "Ceramidas Complex", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Vitamina E", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Lanolina Anidra", concentracao: "5%", fornecedor: "Biovital" },
    ],
    veiculo: "Bálsamo labial | qsp 15 g",
    duracao: "Concomitante à isotretinoína",
    posologia: "Aplicar nos lábios conforme necessário, várias vezes ao dia.",
    obs: "ALERTA: Lanolina pode sensibilizar pacientes atópicos. Avaliar histórico antes de prescrever.",
    equivalenteIndustrializado: "Cicaplast Labial / Aquaphor SOS / Epidrat Hyalu Stick",
  },
  {
    codigo: "VP-ISO-O01",
    nome: "Suporte Oral Isotretinoína",
    linha: "Isotretinoína",
    via: "VO",
    status: "NOVO",
    indicacao: "Proteção hepatocítica, redução de dislipidemia e melhora da xerose sistêmica.",
    ativos: [
      { nome: "Ômega 3 (EPA/DHA)", concentracao: "1000 mg", fornecedor: "Galena" },
      { nome: "Vitamina E", concentracao: "400 UI", fornecedor: "Galena" },
      { nome: "Coenzima Q10", concentracao: "50 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Concomitante à isotretinoína",
    posologia: "1 cápsula ao dia durante a refeição.",
    obs: "Ômega 3 melhora o perfil lipídico — monitorar triglicérides no laboratório.",
  },

  // ─────────────────────────────────────────
  // 2. LINHA MELASMA & HIPERPIGMENTAÇÃO
  // ─────────────────────────────────────────

  {
    codigo: "VP-MEL-001",
    nome: "Sérum Clareador Multi-Target (Diurno)",
    linha: "Melasma",
    via: "VT",
    status: "NOVO",
    indicacao: "Melasma facial ativo — fase de ataque. 4 vias de ação simultâneas.",
    ativos: [
      { nome: "Ácido Tranexâmico", concentracao: "3%", fornecedor: "Galena" },
      { nome: "EvenSkin A3™ (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Vitamina C Estável (VC-IP)", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Ácido Ferúlico", concentracao: "0,5%", fornecedor: "Galena" },
      { nome: "EDTA Dissódico", concentracao: "0,1%", fornecedor: "Galena" },
    ],
    veiculo: "Sérum aquoso | pH-alvo 5,0–6,0 | qsp 30 g",
    duracao: "12–24 semanas",
    posologia: "Aplicar pela manhã na face limpa, antes do fotoprotetor. FPS 50+ obrigatório.",
    obs: "Compatibilidade VC-IP com niacinamida neste pH validada. Evitar combinação com vit C pura (L-AA) na mesma formulação.",
  },
  {
    codigo: "VP-MEL-001B",
    nome: "Sérum Clareador Multi-Target (Alternativa Refratário)",
    linha: "Melasma",
    via: "VT",
    status: "NOVO",
    indicacao: "Melasma refratário — alternativa com Nopigmerin® para casos que não responderam ao protocolo padrão.",
    ativos: [
      { nome: "Ácido Tranexâmico", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Nopigmerin®", concentracao: "2%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Vitamina C Estável (VC-IP)", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Ácido Ferúlico", concentracao: "0,5%", fornecedor: "Galena" },
      { nome: "EDTA Dissódico", concentracao: "0,1%", fornecedor: "Galena" },
    ],
    veiculo: "Sérum aquoso | pH-alvo 5,0–6,0 | qsp 30 g",
    duracao: "12–24 semanas",
    posologia: "Aplicar pela manhã na face limpa, antes do fotoprotetor. FPS 50+ obrigatório.",
    obs: "Usar quando VP-MEL-001 não apresentar resposta após 12 semanas.",
  },
  {
    codigo: "VP-MEL-002",
    nome: "Creme Noturno Despigmentante Intensivo",
    linha: "Melasma",
    via: "VT",
    status: "NOVO",
    indicacao: "Melasma resistente. Fase noturna com cisteamína + retinoide. Sem risco de ocronose.",
    ativos: [
      { nome: "Cisteamína", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Retinaldeído", concentracao: "0,05%", fornecedor: "Galena" },
      { nome: "Alistin™ (Biotec)", concentracao: "0,5%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "3%", fornecedor: "Galena" },
    ],
    veiculo: "Creme emoliente | qsp 30 g",
    duracao: "12–24 semanas",
    posologia: "Aplicar à noite na face. Lavar pela manhã. Fotoprotetor rigoroso.",
    obs: "Cisteamína: odor leve (sulfuroso) — lavar após 15–20 min inicialmente até adaptação. Contraindicado em gestantes.",
  },
  {
    codigo: "VP-MEL-003",
    nome: "Creme Manutenção Melasma (Pós-Clareamento)",
    linha: "Melasma",
    via: "VT",
    status: "NOVO",
    indicacao: "Manutenção pós-clareamento para prevenir recidiva. Sem retinoides — apto para uso a longo prazo.",
    ativos: [
      { nome: "Ácido Tranexâmico", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Vitamina C Estável (VC-IP)", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Ácido Kójico Dipalmitato", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Creme leve | qsp 30 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar à noite na face. Continuar fotoprotetor oral e tópico.",
  },
  {
    codigo: "VP-MEL-O01",
    nome: "Oral Clareador + Antiglicante",
    linha: "Melasma",
    via: "VO",
    status: "NOVO",
    indicacao: "Melasma: inibição sistêmica da plasmina (TXA) + antiglicação + fotoproteção endógena.",
    ativos: [
      { nome: "Ácido Tranexâmico", concentracao: "250 mg", fornecedor: "Galena" },
      { nome: "Glycoxil™ (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
      { nome: "Luteína", concentracao: "10 mg", fornecedor: "Galena" },
      { nome: "Vitamina C", concentracao: "250 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "12–24 semanas",
    posologia: "1 cápsula 2x/dia (manhã e noite).",
    obs: "Contraindicação: histórico de trombose (TXA). Avaliar risco-benefício.",
  },

  // ─────────────────────────────────────────
  // 3. LINHA ROSÁCEA & PELE SENSÍVEL
  // ─────────────────────────────────────────

  {
    codigo: "VP-ROS-001",
    nome: "Sérum Calm Control (Tratamento Principal)",
    linha: "Rosácea",
    via: "VT",
    status: "NOVO",
    indicacao: "Rosácea papulopustular leve a moderada. Anti-inflamatório + antimicrobiano + barreira.",
    ativos: [
      { nome: "Ácido Azelaico Micronizado", concentracao: "15%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Glicirrizinato de Dipotássio", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Bisabolol", concentracao: "0,3%", fornecedor: "Galena" },
    ],
    veiculo: "Gel Natrosol 2% | pH-alvo 4,5–5,0 | qsp 30 g",
    duracao: "8–12 semanas",
    posologia: "Aplicar 1–2x/dia na face limpa.",
    equivalenteIndustrializado: "Azelan Gel",
  },
  {
    codigo: "VP-ROS-002",
    nome: "Creme Reparador de Barreira",
    linha: "Rosácea",
    via: "VT",
    status: "NOVO",
    indicacao: "Restauração da barreira cutânea comprometida na rosácea. Uso diário como hidratante.",
    ativos: [
      { nome: "Ectoína", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Ceramidas Complex", concentracao: "1,5%", fornecedor: "Galena" },
      { nome: "Aquaporine Active AQP-3 (Biotec)", concentracao: "2%", fornecedor: "Biotec Dermo" },
      { nome: "Bisabolol", concentracao: "0,3%", fornecedor: "Galena" },
    ],
    veiculo: "Creme barreira hipoalergênico | qsp 50 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar 2x/dia após o sérum.",
    equivalenteIndustrializado: "Bioderma Sensibio DS+ Creme",
  },
  {
    codigo: "VP-ROS-003",
    nome: "Creme SOS Crise Rosácea (Fase Aguda)",
    linha: "Rosácea",
    via: "VT",
    status: "NOVO",
    indicacao: "Controle de eritema e flushing durante crises agudas de rosácea.",
    ativos: [
      { nome: "Ivermectina", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Glicirrizinato de Dipotássio", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Ectoína", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Extrato de Camomila", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Gel-creme refrescante | qsp 30 g",
    duracao: "Uso pontual nas crises",
    posologia: "Aplicar fina camada nas áreas eritematosas 2–3x/dia durante a crise.",
    obs: "Não usar corticoide tópico por mais de 7 dias consecutivos.",
  },
  {
    codigo: "VP-ROS-O01",
    nome: "Suporte Oral Rosácea (com Antibioticoterapia)",
    linha: "Rosácea",
    via: "VO",
    status: "NOVO",
    indicacao: "Adjuvante durante tratamento com doxiciclina/limeciclina.",
    ativos: [
      { nome: "Zinco Quelado", concentracao: "30 mg", fornecedor: "Galena" },
      { nome: "Probiótico (L. rhamnosus + B. lactis)", concentracao: "10 bi UFC", fornecedor: "Galena" },
      { nome: "Ômega 3 (EPA/DHA)", concentracao: "1000 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Concomitante ao antibiótico + 30 dias após",
    posologia: "1 dose ao dia.",
  },
  {
    codigo: "VP-ROS-O02",
    nome: "Adjuvante Oral Rosácea (sem Antibiótico)",
    linha: "Rosácea",
    via: "VO",
    status: "PROPOSTO",
    indicacao: "Rosácea em manutenção sem antibiótico. Anti-inflamatório + modulação vascular.",
    ativos: [
      { nome: "Nicotinamida", concentracao: "250 mg", fornecedor: "Galena" },
      { nome: "L-Optizinc", concentracao: "25 mg", fornecedor: "Galena" },
      { nome: "Cobre Quelado", concentracao: "1,5 mg", fornecedor: "Galena" },
      { nome: "Quatrefolic (Ác. Fólico Ativo)", concentracao: "400 mcg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "8 semanas",
    posologia: "1 cápsula 2x/dia.",
  },

  // ─────────────────────────────────────────
  // 4. LINHA DERMATITE SEBORREICA
  // ─────────────────────────────────────────

  {
    codigo: "VP-DS-001",
    nome: "Sérum Antisseborreico Facial",
    linha: "Dermatite Seborreica",
    via: "VT",
    status: "NOVO",
    indicacao: "DS facial: controle de Malassezia + anti-inflamatório + seboregulação.",
    ativos: [
      { nome: "Piritionato de Zinco", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Glicirrizinato de Dipotássio", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "1,5%", fornecedor: "Galena" },
      { nome: "Enxofre Precipitado", concentracao: "2%", fornecedor: "Galena" },
    ],
    veiculo: "Gel-creme oil-free | pH-alvo 4,5–5,0 | qsp 30 g",
    duracao: "4–8 semanas (ataque) / Manutenção 2–3x/sem",
    posologia: "Aplicar 1x/dia à noite nas áreas seborreicas.",
    equivalenteIndustrializado: "Bioderma Sensibio DS+ / ISDIN Micellar",
  },
  {
    codigo: "VP-DS-002",
    nome: "Creme Barreira DS (Hidratação Diária)",
    linha: "Dermatite Seborreica",
    via: "VT",
    status: "NOVO",
    indicacao: "Hidratação diária da pele com DS. Restauração de barreira sem ingredientes comedogênicos.",
    ativos: [
      { nome: "Ectoína", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Ceramidas Complex", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Pantenol", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Extrato de Aveia Coloidal", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Creme leve hipoalergênico | qsp 50 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar 2x/dia.",
  },
  {
    codigo: "VP-DS-003",
    nome: "Xampu Antisseborreico Magistral",
    linha: "Dermatite Seborreica",
    via: "VT",
    status: "NOVO",
    indicacao: "DS do couro cabeludo. Controle de Malassezia + anti-inflamatório.",
    ativos: [
      { nome: "Ciclopirox Olamina", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Piritionato de Zinco", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Glicirrizinato de Dipotássio", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Base Syndet suave | pH-alvo 5,0–5,5 | qsp 100 ml",
    duracao: "3x/semana (ataque 4 sem) → 2x/sem (manutenção)",
    posologia: "Massagear 3–5 min, enxaguar.",
  },
  {
    codigo: "VP-DS-004",
    nome: "Gel SOS Crise DS (Fase Aguda Facial)",
    linha: "Dermatite Seborreica",
    via: "VT",
    status: "NOVO",
    indicacao: "Crises agudas de DS com eritema intenso, prurido e descamação.",
    ativos: [
      { nome: "Desonida", concentracao: "0,05%", fornecedor: "Galena" },
      { nome: "Glicirrizinato de Dipotássio", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Piritionato de Zinco", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | qsp 30 g",
    duracao: "Máximo 7–10 dias",
    posologia: "Aplicar fina camada 2x/dia durante a crise.",
    obs: "Desonida: menor risco de atrofia. Suspender ao controlar a crise.",
  },
  {
    codigo: "VP-DS-O01",
    nome: "Suporte Oral DS Anti-Inflamatório",
    linha: "Dermatite Seborreica",
    via: "VO",
    status: "NOVO",
    indicacao: "DS moderada-grave ou recorrente.",
    ativos: [
      { nome: "Zinco Quelado", concentracao: "30 mg", fornecedor: "Galena" },
      { nome: "Probiótico (L. rhamnosus + B. breve)", concentracao: "10 bi UFC", fornecedor: "Galena" },
      { nome: "Vitamina D3", concentracao: "2000 UI", fornecedor: "Galena" },
      { nome: "Ômega 3 (EPA/DHA)", concentracao: "1000 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "8 semanas / repetir conforme recidiva",
    posologia: "1 dose ao dia.",
  },
  {
    codigo: "VP-DS-O02",
    nome: "Antifúngico Oral DS Grave / Recorrente",
    linha: "Dermatite Seborreica",
    via: "VO",
    status: "EM USO",
    indicacao: "DS grave ou com frequência de recidiva > 2x/ano.",
    ativos: [
      { nome: "Itraconazol", concentracao: "200 mg/dia", fornecedor: "Industrializado (preferência)" },
    ],
    veiculo: "Cápsula industrializada (Sporanox / Itracox)",
    duracao: "4–8 semanas",
    posologia: "200 mg/dia por 2–4 semanas (ataque) → 200 mg/semana (manutenção).",
    obs: "ALERTA: Itraconazol manipulado tem biodisponibilidade crítica. Preferência obrigatória pelo industrializado. Monitorar função hepática.",
  },

  // ─────────────────────────────────────────
  // 5. LINHA FOLICULITE
  // ─────────────────────────────────────────

  {
    codigo: "VP-FOL-001",
    nome: "Loção Antimicrobiana Foliculite (Ataque)",
    linha: "Foliculite",
    via: "VT",
    status: "NOVO",
    indicacao: "Foliculite bacteriana superficial — fase de ataque.",
    ativos: [
      { nome: "Eritromicina", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Ácido Glicólico", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Enxofre Precipitado", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "BHT (estabilizante)", concentracao: "0,05%", fornecedor: "Galena" },
    ],
    veiculo: "Gel | qsp 100 g",
    duracao: "4–6 semanas",
    posologia: "Aplicar 2x/dia nas áreas afetadas na pele limpa e seca.",
    obs: "Eritromicina tópica: atenção a resistência em uso prolongado — não exceder 8 semanas.",
  },
  {
    codigo: "VP-FOL-002",
    nome: "Gel Foliculite Pitiriospórica (Ataque)",
    linha: "Foliculite",
    via: "VT",
    status: "NOVO",
    indicacao: "Foliculite por Malassezia — tronco, costas.",
    ativos: [
      { nome: "Ciclopirox Olamina", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Piritionato de Zinco", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "2%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | pH 4,5–5,0 | qsp 30 g",
    duracao: "4 semanas",
    posologia: "Aplicar 1x/dia (noite) nas áreas afetadas.",
  },
  {
    codigo: "VP-FOL-003",
    nome: "Creme Manutenção Foliculite (Pós-Ataque)",
    linha: "Foliculite",
    via: "VT",
    status: "NOVO",
    indicacao: "Manutenção pós-tratamento foliculite.",
    ativos: [
      { nome: "Ácido Salicílico", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Pantenol", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Ureia", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Creme corporal leve | qsp 100 g",
    duracao: "Uso contínuo 3x/semana",
    posologia: "Aplicar após banho.",
  },
  {
    codigo: "VP-FOL-O01",
    nome: "Antibioticoterapia Oral Foliculite Bacteriana",
    linha: "Foliculite",
    via: "VO",
    status: "NOVO",
    indicacao: "Foliculite profunda / recorrente / refratária ao tópico.",
    ativos: [
      { nome: "Doxiciclina Hiclato", concentracao: "100 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "7–14 dias",
    posologia: "1 cápsula 12/12h.",
    obs: "Manter tópico concomitante. Cultura se recorrência > 3x/ano.",
  },
  {
    codigo: "VP-FOL-O02",
    nome: "Antifúngico Oral Foliculite Pitiriospórica",
    linha: "Foliculite",
    via: "VO",
    status: "EM USO",
    indicacao: "Foliculite pitiriospórica moderada-grave.",
    ativos: [
      { nome: "Itraconazol", concentracao: "200 mg/dia", fornecedor: "Industrializado (preferência)" },
    ],
    veiculo: "Cápsula industrializada",
    duracao: "4 semanas (ataque) → 200 mg/sem por 4 sem",
    posologia: "200 mg/dia na fase de ataque.",
    obs: "ALERTA: Itraconazol manipulado: preferência obrigatória pelo industrializado.",
  },

  // ─────────────────────────────────────────
  // 6. LINHA ANTI-AGING & REJUVENESCIMENTO
  // ─────────────────────────────────────────

  {
    codigo: "VP-AGE-001",
    nome: "Sérum Antioxidante First Defense (Diurno)",
    linha: "Anti-Aging",
    via: "VT",
    status: "NOVO",
    indicacao: "Prevenção de fotoenvelhecimento. Proteção antioxidante diurna 20–30+.",
    ativos: [
      { nome: "Vitamina C Estável (VC-IP)", concentracao: "10%", fornecedor: "Galena" },
      { nome: "Vitamina E", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Ácido Ferúlico", concentracao: "0,5%", fornecedor: "Galena" },
      { nome: "OTZ 10™ (Biotec)", concentracao: "1%", fornecedor: "Biotec Dermo" },
    ],
    veiculo: "Sérum aquoso leve | qsp 30 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar pela manhã antes do fotoprotetor.",
    equivalenteIndustrializado: "Redermic Hyalu C / Improve C30 Biotic",
  },
  {
    codigo: "VP-AGE-002",
    nome: "Sérum Noturno Renovador 30+",
    linha: "Anti-Aging",
    via: "VT",
    status: "NOVO",
    indicacao: "Estímulo de colágeno sem irritação. Retinoides encapsulados + peptídeos. 30+.",
    ativos: [
      { nome: "CycloRetin™ (Biotec)", concentracao: "1%", fornecedor: "Biotec Dermo" },
      { nome: "Arct-Alg™ (Biotec)", concentracao: "1%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "4%", fornecedor: "Galena" },
      { nome: "Ácido Hialurônico Multipeso", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Emulsão Pickering | qsp 30 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar à noite na face limpa.",
  },
  {
    codigo: "VP-AGE-003",
    nome: "Sérum Lift & Firm (Noturno) 40+",
    linha: "Anti-Aging",
    via: "VT",
    status: "NOVO",
    indicacao: "Firmeza e densidade dérmica. Retinoide ativo + peptídeos tensor + estimulador de matriz. 40+.",
    ativos: [
      { nome: "Retinaldeído", concentracao: "0,1%", fornecedor: "Galena" },
      { nome: "Progeline™ (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Densiskin D+™ (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "3%", fornecedor: "Galena" },
    ],
    veiculo: "Creme emoliente rico | qsp 30 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar à noite na face, pescoço e colo.",
    obs: "Contraindicado em gestantes. Usar com escalonamento na 1ª semana.",
    equivalenteIndustrializado: "Cetaphil Health Renew Noturno / Liftactiv Neovadiol Noite",
  },
  {
    codigo: "VP-AGE-O01",
    nome: "Skin Longevity Oral 30+",
    linha: "Anti-Aging",
    via: "VO",
    status: "NOVO",
    indicacao: "Suporte antioxidante sistêmico, antiglicação e anti-inflamatório. 30+.",
    ativos: [
      { nome: "Bio-Arct™ (Biotec)", concentracao: "200 mg", fornecedor: "Biotec Dermo" },
      { nome: "Glycoxil™ (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
      { nome: "In.Cell® (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
      { nome: "Resveratrol Lipossomado", concentracao: "50 mg", fornecedor: "Galena" },
      { nome: "Coenzima Q10 Lipossomada", concentracao: "50 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Uso contínuo",
    posologia: "1 dose/dia pela manhã.",
  },
  {
    codigo: "VP-AGE-O02",
    nome: "Modulador Neuroendócrino 40+ (Opcional)",
    linha: "Anti-Aging",
    via: "VO",
    status: "NOVO",
    indicacao: "Inflammaging, estresse crônico, peri/pós-menopausa. 40+.",
    ativos: [
      { nome: "Modulip GC™ (Biotec)", concentracao: "200 mg", fornecedor: "Biotec Dermo" },
      { nome: "Glycoxil™ (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
      { nome: "Ashwagandha (Withania somnifera)", concentracao: "300 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Ciclos de 3 meses",
    posologia: "1 dose às 16h.",
  },

  // ─────────────────────────────────────────
  // 7. LINHA CORPORAL
  // ─────────────────────────────────────────

  {
    codigo: "VP-COR-EST-001",
    nome: "Creme Magistral Estrias",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Estrias recentes (eritematosas).",
    ativos: [
      { nome: "Retinol Encapsulado", concentracao: "0,3%", fornecedor: "Galena" },
      { nome: "Ácido Glicólico", concentracao: "8%", fornecedor: "Galena" },
      { nome: "Extrato de Centella Asiática", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Vitamina E", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Óleo de Rosa Mosqueta", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Creme corporal | qsp 100 g",
    duracao: "12 semanas",
    posologia: "Aplicar 1x/dia (noite) com massagem circular.",
    obs: "Contraindicado em gestantes.",
  },
  {
    codigo: "VP-COR-001",
    nome: "Creme Ceratose Pilar",
    linha: "Corporal",
    via: "VT",
    status: "EM USO",
    indicacao: "Ceratose pilar em braços.",
    ativos: [
      { nome: "Ureia", concentracao: "20%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "3%", fornecedor: "Galena" },
    ],
    veiculo: "Creme | qsp 200 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar em braços 2x/dia.",
  },
  {
    codigo: "VP-COR-002",
    nome: "Gel Bromidrose",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Bromidrose plantar. Antimicrobiano tópico.",
    ativos: [
      { nome: "Peróxido de Benzoíla", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Clorexidina Digluconato", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | qsp 50 g",
    duracao: "4–8 semanas",
    posologia: "Aplicar nos pés à noite antes de dormir.",
  },
  {
    codigo: "VP-HIP-001",
    nome: "Solução Antissudorípara Magistral",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Hiperidrose axilar, palmar ou plantar.",
    ativos: [
      { nome: "Cloreto de Alumínio Hexaidratado", concentracao: "20%", fornecedor: "Galena" },
      { nome: "Álcool Isopropílico 70%", concentracao: "qsp 50 ml", fornecedor: "Galena" },
    ],
    veiculo: "Solução roll-on | qsp 50 ml",
    duracao: "4 semanas (ataque 3x/sem → 1x/sem manutenção)",
    posologia: "Aplicar na pele limpa e seca à noite antes de dormir.",
    obs: "Para palmar/plantar considerar 25–30%.",
    equivalenteIndustrializado: "Perspirex Original",
  },
  {
    codigo: "VP-HIP-002",
    nome: "Gel Antissudoríparo Leve (Pele Sensível)",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Hiperidrose leve ou pele com intolerância ao cloreto de alumínio concentrado.",
    ativos: [
      { nome: "Cloreto de Alumínio Hexaidratado", concentracao: "10%", fornecedor: "Galena" },
      { nome: "Aloe Vera Gel", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Bisabolol", concentracao: "0,3%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | qsp 50 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar 1x/dia.",
  },
  {
    codigo: "VP-HIP-O01",
    nome: "Suporte Oral Hiperidrose (Adjuvante)",
    linha: "Corporal",
    via: "VO",
    status: "PROPOSTO",
    indicacao: "Hiperidrose moderada-grave. Ação anticolinérgica suave + ansiolítica.",
    ativos: [
      { nome: "Extrato de Valeriana", concentracao: "300 mg", fornecedor: "Galena" },
      { nome: "Magnésio Quelado (Glicinato)", concentracao: "200 mg", fornecedor: "Galena" },
      { nome: "Extrato de Borragem", concentracao: "150 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "8–12 semanas",
    posologia: "1 cápsula 30 min antes de situações de maior estresse/calor.",
  },
  {
    codigo: "VP-CEL-001",
    nome: "Creme Lipofibrolítico Corporal (Celulite Grau 1–2)",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Celulite fibrótica e edematosa.",
    ativos: [
      { nome: "Cafeína Anidra", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Extrato de Centella Asiática", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Extrato de Hera (Hedera helix)", concentracao: "2%", fornecedor: "Galena" },
      { nome: "L-Carnitina", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Retinol Encapsulado", concentracao: "0,3%", fornecedor: "Galena" },
      { nome: "Extrato de Castanha da Índia", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Creme corporal emoliente | qsp 200 g",
    duracao: "12 semanas + manutenção",
    posologia: "Aplicar 2x/dia com massagem circular por 3–5 min.",
  },
  {
    codigo: "VP-CEL-002",
    nome: "Gel Corporal Drenante Leve (Celulite Edematosa)",
    linha: "Corporal",
    via: "VT",
    status: "NOVO",
    indicacao: "Celulite edematosa com retenção hídrica.",
    ativos: [
      { nome: "Cafeína Anidra", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Extrato de Cavalinha", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Extrato de Ginkgo Biloba", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Mentol", concentracao: "0,3%", fornecedor: "Galena" },
      { nome: "Hialuronidase Vegetal", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso fresco | qsp 200 g",
    duracao: "8–12 semanas",
    posologia: "Aplicar 1x/dia de baixo para cima.",
  },
  {
    codigo: "VP-CEL-003",
    nome: "Sérum Body Contouring (Gordura Localizada)",
    linha: "Corporal",
    via: "VT",
    status: "PROPOSTO",
    indicacao: "Gordura localizada abdominal/culotes.",
    ativos: [
      { nome: "Cafeína Anidra", concentracao: "3%", fornecedor: "Galena" },
      { nome: "L-Carnitina", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Sinefrina", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Extrato de Centella Asiática", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Algas Marinhas (Fucus vesiculosus)", concentracao: "2%", fornecedor: "Galena" },
    ],
    veiculo: "Sérum bifásico | qsp 100 ml",
    duracao: "12 semanas",
    posologia: "Aplicar 2x/dia com massagem vigorosa.",
  },
  {
    codigo: "VP-CEL-O01",
    nome: "Oral Lipometabólico Celulite",
    linha: "Corporal",
    via: "VO",
    status: "PROPOSTO",
    indicacao: "Celulite grau 2–3. Suporte sistêmico.",
    ativos: [
      { nome: "Extrato Seco de Centella Asiática", concentracao: "150 mg", fornecedor: "Galena" },
      { nome: "L-Carnitina Tartarato", concentracao: "500 mg", fornecedor: "Galena" },
      { nome: "Oligômeros Proantocianídicos (OPC)", concentracao: "100 mg", fornecedor: "Galena" },
      { nome: "Vitamina C", concentracao: "200 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "12 semanas",
    posologia: "1 dose ao dia.",
  },

  // ─────────────────────────────────────────
  // 8. LINHA PÓS-PROCEDIMENTO
  // ─────────────────────────────────────────

  {
    codigo: "VP-POS-001",
    nome: "Sérum Recovery Pós-Procedimento",
    linha: "Pós-Procedimento",
    via: "VT",
    status: "NOVO",
    indicacao: "Recuperação após laser, microagulhamento, peeling químico.",
    ativos: [
      { nome: "Overnight Repair™ (Biotec)", concentracao: "5%", fornecedor: "Biotec Dermo" },
      { nome: "SWT-7® (Biotec)", concentracao: "2%", fornecedor: "Biotec Dermo" },
      { nome: "Alistin™ (Biotec)", concentracao: "1%", fornecedor: "Biotec Dermo" },
      { nome: "Pantenol", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Ácido Hialurônico Baixo Peso", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Sérum aquoso leve | qsp 30 g",
    duracao: "30 dias pós-procedimento",
    posologia: "Aplicar 2x/dia a partir de 24h após o procedimento.",
  },
  {
    codigo: "VP-POS-O01",
    nome: "Oral Pós-Procedimento",
    linha: "Pós-Procedimento",
    via: "VO",
    status: "NOVO",
    indicacao: "Aceleração da cicatrização e redução de inflamação.",
    ativos: [
      { nome: "Bio-Arct™ (Biotec)", concentracao: "200 mg", fornecedor: "Biotec Dermo" },
      { nome: "Vitamina C", concentracao: "200 mg", fornecedor: "Galena" },
      { nome: "Exsynutriment™ (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
    ],
    veiculo: "Cápsula",
    duracao: "Iniciar 3 dias antes + manter 30 dias após",
    posologia: "1 dose/dia.",
  },

  // ─────────────────────────────────────────
  // 9. LINHA MICOSES & INFECÇÕES FÚNGICAS
  // ─────────────────────────────────────────

  {
    codigo: "VP-MIC-001",
    nome: "Gel Antifúngico Tópico Magistral",
    linha: "Micoses",
    via: "VT",
    status: "NOVO",
    indicacao: "Tinea corporis, tinea pedis, intertrigo, pitiríase versicolor tópica.",
    ativos: [
      { nome: "Ciclopirox Olamina", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Nistatina", concentracao: "100.000 UI/g", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Gel aquoso | pH 4,5–5,0 | qsp 50 g",
    duracao: "4–8 semanas",
    posologia: "Aplicar 2x/dia na área afetada e ao redor (2 cm de margem).",
  },
  {
    codigo: "VP-MIC-O01",
    nome: "Antifúngico Oral Opção 1 (Fluconazol)",
    linha: "Micoses",
    via: "VO",
    status: "EM USO",
    indicacao: "Antifúngico oral sistêmico — opção semanal.",
    ativos: [
      { nome: "Fluconazol", concentracao: "150 mg/semana", fornecedor: "Industrializado" },
    ],
    veiculo: "Cápsula industrializada",
    duracao: "8–12 semanas",
    posologia: "150 mg/semana.",
  },
  {
    codigo: "VP-MIC-O02",
    nome: "Antifúngico Oral Opção 2 (Terbinafina)",
    linha: "Micoses",
    via: "VO",
    status: "EM USO",
    indicacao: "Antifúngico oral sistêmico — opção diária.",
    ativos: [
      { nome: "Terbinafina", concentracao: "250 mg/dia", fornecedor: "Industrializado" },
    ],
    veiculo: "Comprimido industrializado",
    duracao: "8 sem (tineas) / 12–24 sem (onicomicose)",
    posologia: "250 mg/dia.",
  },
  {
    codigo: "VP-MIC-O03",
    nome: "Suporte Oral Antifúngico",
    linha: "Micoses",
    via: "VO",
    status: "NOVO",
    indicacao: "Suporte durante tratamento antifúngico oral.",
    ativos: [
      { nome: "Saccharomyces boulardii", concentracao: "5 bi UFC", fornecedor: "Galena" },
      { nome: "Zinco Quelado", concentracao: "15 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Concomitante ao antifúngico",
    posologia: "1 dose ao dia.",
  },

  // ─────────────────────────────────────────
  // 10. LINHA SAÚDE CAPILAR
  // ─────────────────────────────────────────

  {
    codigo: "VP-CAP-001",
    nome: "Tônico Capilar Antiqueda",
    linha: "Saúde Capilar",
    via: "VT",
    status: "NOVO",
    indicacao: "Alopecia androgênica e eflúvio. Estímulo folicular + anti-inflamatório + ancoragem.",
    ativos: [
      { nome: "Capixyl™ (Biotec)", concentracao: "5%", fornecedor: "Biotec Dermo" },
      { nome: "Arct-Alg™ (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Alistin™ (Biotec)", concentracao: "2%", fornecedor: "Biotec Dermo" },
    ],
    veiculo: "Tônico fosfolipídico | qsp 30 ml",
    duracao: "12–24 semanas",
    posologia: "20 gotas no couro cabeludo limpo à noite. Massagear.",
  },
  {
    codigo: "VP-CAP-002",
    nome: "Xampu Antiqueda com Cegaba",
    linha: "Saúde Capilar",
    via: "VT",
    status: "EM USO",
    indicacao: "Xampu antiqueda para uso regular.",
    ativos: [
      { nome: "Cegaba", concentracao: "0,5%", fornecedor: "Galena" },
      { nome: "Tintura de Quina", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Xampu base | qsp 100 ml",
    duracao: "3x/semana",
    posologia: "Massagear 2–3 min, enxaguar.",
  },
  {
    codigo: "VP-CAP-O01",
    nome: "Oral Reestruturador Capilar",
    linha: "Saúde Capilar",
    via: "VO",
    status: "NOVO",
    indicacao: "Suporte oral para alopecia e fragilidade capilar.",
    ativos: [
      { nome: "Bio-Arct™ (Biotec)", concentracao: "100 mg", fornecedor: "Biotec Dermo" },
      { nome: "Exsynutriment™ (Biotec)", concentracao: "150 mg", fornecedor: "Biotec Dermo" },
      { nome: "Glycoxil™ (Biotec)", concentracao: "75 mg", fornecedor: "Biotec Dermo" },
      { nome: "Biotina", concentracao: "5 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "3–6 meses",
    posologia: "2 cápsulas ao dia.",
  },

  // ─────────────────────────────────────────
  // 11. CONDIÇÕES ESPECIAIS
  // ─────────────────────────────────────────

  {
    codigo: "VP-DA-001",
    nome: "Creme Emoliente Magistral DA",
    linha: "Condições Especiais",
    via: "VT",
    status: "PROPOSTO",
    indicacao: "DA leve a moderada.",
    ativos: [
      { nome: "Aveia Coloidal Micronizada", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Ceramidas Complex", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Glicerina", concentracao: "5%", fornecedor: "Galena" },
      { nome: "Manteiga de Karité", concentracao: "10%", fornecedor: "Galena" },
      { nome: "Pantenol", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Creme lipídico hipoalergênico | qsp 100 g",
    duracao: "Uso contínuo",
    posologia: "Aplicar 2–3x/dia após banho morno.",
  },
  {
    codigo: "VP-DA-O01",
    nome: "Oral Modulador DA",
    linha: "Condições Especiais",
    via: "VO",
    status: "PROPOSTO",
    indicacao: "Suporte oral para dermatite atópica.",
    ativos: [
      { nome: "Ômega 3 (EPA/DHA)", concentracao: "1000 mg", fornecedor: "Galena" },
      { nome: "Probiótico (L. rhamnosus GG)", concentracao: "10 bi UFC", fornecedor: "Galena" },
      { nome: "Vitamina D3", concentracao: "2000 UI", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "3 meses",
    posologia: "1 dose ao dia.",
  },
  {
    codigo: "VP-ESP-001",
    nome: "Sérum Vasos Faciais",
    linha: "Condições Especiais",
    via: "VT",
    status: "NOVO",
    indicacao: "Telangiectasias faciais.",
    ativos: [
      { nome: "Alfa-Arbutin", concentracao: "2%", fornecedor: "Galena" },
      { nome: "Meiyanol® (Sambucus nigra)", concentracao: "1%", fornecedor: "Biotec Dermo" },
      { nome: "Troxerutina", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Ácido Hialurônico Baixo Peso", concentracao: "1%", fornecedor: "Galena" },
      { nome: "Niacinamida", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Sérum gel aquoso | qsp 30 g",
    duracao: "12 semanas",
    posologia: "2x/dia na pele limpa, focando áreas com vasos. FPS rigoroso.",
  },
  {
    codigo: "VP-VIT-001",
    nome: "Creme Repigmentante Vitiligo",
    linha: "Condições Especiais",
    via: "VT",
    status: "NOVO",
    indicacao: "Vitiligo estável.",
    ativos: [
      { nome: "Tacrolimus", concentracao: "0,1%", fornecedor: "Galena" },
      { nome: "Calcipotriol", concentracao: "0,005%", fornecedor: "Galena" },
      { nome: "Khellin", concentracao: "2%", fornecedor: "Galena" },
    ],
    veiculo: "Creme emoliente | qsp 30 g",
    duracao: "12–24 semanas + fototerapia UVB",
    posologia: "Aplicar 2x/dia. Usar com fototerapia UVB narrow-band.",
    obs: "ALERTA: Tacrolimus aumenta fotossensibilidade. Fotoprotetor rigoroso obrigatório.",
  },
  {
    codigo: "VP-ESC-001",
    nome: "Loção Permetrina Magistral",
    linha: "Condições Especiais",
    via: "VT",
    status: "PROPOSTO",
    indicacao: "Tratamento tópico de escabiose.",
    ativos: [
      { nome: "Permetrina", concentracao: "5%", fornecedor: "Galena" },
    ],
    veiculo: "Loção cremosa | qsp 60 g",
    duracao: "1 aplicação (repetir em 10 dias)",
    posologia: "Aplicar em tronco e membros à noite. Lavar após 8–12h.",
  },
  {
    codigo: "VP-PSO-001",
    nome: "Creme Magistral Psoríase Leve-Moderada",
    linha: "Condições Especiais",
    via: "VT",
    status: "PROPOSTO",
    indicacao: "Psoríase em placas leve a moderada.",
    ativos: [
      { nome: "Calcipotriol", concentracao: "0,005%", fornecedor: "Galena" },
      { nome: "Ureia", concentracao: "10%", fornecedor: "Galena" },
      { nome: "Ácido Salicílico", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Extrato de Alcaçuz", concentracao: "1%", fornecedor: "Galena" },
    ],
    veiculo: "Creme emoliente | qsp 100 g",
    duracao: "8–12 semanas (ciclos)",
    posologia: "Aplicar 2x/dia nas placas.",
    obs: "Calcipotriol requer refrigeração.",
  },

  // ─────────────────────────────────────────
  // 12. LINHA FOTOPROTEÇÃO
  // ─────────────────────────────────────────

  {
    codigo: "VP-FPS-001",
    nome: "Fotoprotetor Tópico Urbano Premium",
    linha: "Fotoproteção",
    via: "VT",
    status: "NOVO",
    indicacao: "Proteção solar transversal: UV + luz azul + poluição + IR.",
    ativos: [
      { nome: "Filtro Solar Amplo Espectro", concentracao: "FPS 50+", fornecedor: "Pharmaespecial" },
      { nome: "ProShield MDC™ (Biotec)", concentracao: "3%", fornecedor: "Biotec Dermo" },
      { nome: "Niacinamida", concentracao: "3%", fornecedor: "Galena" },
      { nome: "Vitamina E", concentracao: "0,5%", fornecedor: "Galena" },
    ],
    veiculo: "Fluida toque seco | qsp 50 g",
    duracao: "Uso diário",
    posologia: "Aplicar 30 min antes da exposição. Reaplicar a cada 2–3h.",
  },
  {
    codigo: "VP-FPS-O01",
    nome: "Fotoprotetor Oral Universal",
    linha: "Fotoproteção",
    via: "VO",
    status: "NOVO",
    indicacao: "Fotoproteção endógena transversal.",
    ativos: [
      { nome: "Polypodium leucotomos ext. seco 30:1", concentracao: "250 mg", fornecedor: "Galena" },
      { nome: "Pycnogenol (Pinus pinaster >95%)", concentracao: "100 mg", fornecedor: "Galena" },
      { nome: "Luteína", concentracao: "10 mg", fornecedor: "Galena" },
      { nome: "Betacaroteno", concentracao: "15 mg", fornecedor: "Galena" },
    ],
    veiculo: "Cápsula",
    duracao: "Uso contínuo",
    posologia: "1 cápsula pela manhã.",
    obs: "Unifica o que o Dr. Paulo já prescrevia individualmente em uma única cápsula.",
  },
]

// ─────────────────────────────────────────
// HELPERS UTILITÁRIOS
// ─────────────────────────────────────────

export const linhas = [...new Set(formulacoes.map(f => f.linha))]

export const formulacoesPorLinha = (linha: string) =>
  formulacoes.filter(f => f.linha === linha)

export const formulacoesPorStatus = (status: Status) =>
  formulacoes.filter(f => f.status === status)

export const buscarFormulacoes = (query: string) => {
  const q = query.toLowerCase()
  return formulacoes.filter(f =>
    f.codigo.toLowerCase().includes(q) ||
    f.nome.toLowerCase().includes(q) ||
    f.linha.toLowerCase().includes(q) ||
    f.indicacao.toLowerCase().includes(q) ||
    f.ativos.some(a => a.nome.toLowerCase().includes(q))
  )
}

export const totais = {
  formulacoes: formulacoes.length,
  emUso: formulacoes.filter(f => f.status === "EM USO").length,
  novo: formulacoes.filter(f => f.status === "NOVO").length,
  proposto: formulacoes.filter(f => f.status === "PROPOSTO").length,
  linhasAtivas: linhas.length,
}
