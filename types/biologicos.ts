export interface TratamentoAnterior {
  medicamento: string
  dose: string
  periodo: string
  motivoDescontinuacao: string
}

export interface ExameScreening {
  nome: string
  resultado: string
  data: string
  obrigatorio: boolean
}

export interface LaudoOperadora {
  // Etapa 1 — Identificação
  pacienteNome: string
  pacienteMatricula: string
  pacienteDataNascimento: string
  cid10Principal: string
  cid10Secundario: string

  // Etapa 2 — Anamnese
  tempoDeDoeanca: string
  pasi: number | null
  bsa: number | null
  dlqi: number | null
  iga: number | null
  localizacao: string
  impactoFuncional: string
  comorbidades: string

  // Etapa 3 — Tratamentos anteriores
  tratamentos: TratamentoAnterior[]

  // Etapa 4 — Screening
  exames: ExameScreening[]

  // Etapa 5 — Prescrição
  moleculaDCB: string
  nomeComercial: string
  apresentacao: string
  viaAdministracao: string
  posologiaInducao: string
  posologiaManutencao: string
  duracaoPrevista: string
  quantidadeSolicitada: string

  // Etapa 6 — Justificativa e ancoragem
  justificativaClinica: string
  dutANS: string
  registroANVISA: string
  guideline: string
  conclusaoSintese: string
  conclusaoSolicitacao: string
  conclusaoSeguimento: string
}
