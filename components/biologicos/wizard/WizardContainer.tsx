'use client'

import { useReducer, useState } from 'react'
import { LaudoOperadora, TratamentoAnterior, ExameScreening } from '@/types/biologicos'
import WizardProgress from './WizardProgress'
import Etapa1Identificacao from './etapas/Etapa1Identificacao'
import Etapa2Anamnese from './etapas/Etapa2Anamnese'
import Etapa3Tratamentos from './etapas/Etapa3Tratamentos'
import Etapa4Screening from './etapas/Etapa4Screening'
import Etapa5Prescricao from './etapas/Etapa5Prescricao'
import Etapa6Justificativa from './etapas/Etapa6Justificativa'

// ── Estado inicial ──────────────────────────────────────────────────────────

const EXAMES_INICIAIS: ExameScreening[] = [
  { nome: 'PPD ou IGRA (QuantiFERON)', resultado: '', data: '', obrigatorio: true },
  { nome: 'Radiografia de tórax', resultado: '', data: '', obrigatorio: true },
  { nome: 'Sorologia HBsAg, Anti-HBc, Anti-HBs', resultado: '', data: '', obrigatorio: true },
  { nome: 'Sorologia Anti-HCV', resultado: '', data: '', obrigatorio: true },
  { nome: 'Sorologia HIV 1/2', resultado: '', data: '', obrigatorio: true },
  { nome: 'Hemograma completo', resultado: '', data: '', obrigatorio: true },
  { nome: 'Função hepática (TGO, TGP, FA, GGT)', resultado: '', data: '', obrigatorio: true },
  { nome: 'Função renal (creatinina, ureia)', resultado: '', data: '', obrigatorio: true },
  { nome: 'FAN', resultado: '', data: '', obrigatorio: false },
  { nome: 'Status vacinal', resultado: '', data: '', obrigatorio: false },
]

const ESTADO_INICIAL: LaudoOperadora = {
  pacienteNome: '',
  pacienteMatricula: '',
  pacienteDataNascimento: '',
  cid10Principal: '',
  cid10Secundario: '',
  tempoDeDoeanca: '',
  pasi: null,
  bsa: null,
  dlqi: null,
  iga: null,
  localizacao: '',
  impactoFuncional: '',
  comorbidades: '',
  tratamentos: [],
  exames: EXAMES_INICIAIS,
  moleculaDCB: '',
  nomeComercial: '',
  apresentacao: '',
  viaAdministracao: '',
  posologiaInducao: '',
  posologiaManutencao: '',
  duracaoPrevista: '',
  quantidadeSolicitada: '',
  justificativaClinica: '',
  dutANS: '',
  registroANVISA: '',
  guideline: '',
  conclusaoSintese: '',
  conclusaoSolicitacao: '',
  conclusaoSeguimento: '',
}

// ── Reducer ─────────────────────────────────────────────────────────────────

type WizardAction =
  | { type: 'SET_FIELD'; field: keyof LaudoOperadora; value: LaudoOperadora[keyof LaudoOperadora] }
  | { type: 'ADD_TRATAMENTO' }
  | { type: 'REMOVE_TRATAMENTO'; index: number }
  | { type: 'SET_TRATAMENTO'; index: number; field: keyof TratamentoAnterior; value: string }
  | { type: 'SET_EXAME'; index: number; field: keyof ExameScreening; value: string }

function wizardReducer(state: LaudoOperadora, action: WizardAction): LaudoOperadora {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }

    case 'ADD_TRATAMENTO':
      return {
        ...state,
        tratamentos: [
          ...state.tratamentos,
          { medicamento: '', dose: '', periodo: '', motivoDescontinuacao: '' },
        ],
      }

    case 'REMOVE_TRATAMENTO':
      return {
        ...state,
        tratamentos: state.tratamentos.filter((_, i) => i !== action.index),
      }

    case 'SET_TRATAMENTO': {
      const tratamentos = [...state.tratamentos]
      tratamentos[action.index] = { ...tratamentos[action.index], [action.field]: action.value }
      return { ...state, tratamentos }
    }

    case 'SET_EXAME': {
      const exames = [...state.exames]
      exames[action.index] = { ...exames[action.index], [action.field]: action.value }
      return { ...state, exames }
    }

    default:
      return state
  }
}

// ── Validação por etapa ──────────────────────────────────────────────────────

function validarEtapa(state: LaudoOperadora, etapa: number): string[] {
  const erros: string[] = []
  switch (etapa) {
    case 1:
      if (!state.pacienteNome.trim()) erros.push('Nome do paciente é obrigatório.')
      if (!state.cid10Principal) erros.push('CID-10 principal é obrigatório.')
      break
    case 2:
      if (!state.tempoDeDoeanca.trim()) erros.push('Tempo de doença é obrigatório.')
      if (state.pasi === null) erros.push('PASI é obrigatório.')
      if (state.dlqi === null) erros.push('DLQI é obrigatório.')
      break
    case 3:
      if (state.tratamentos.length === 0) erros.push('Registre ao menos um tratamento anterior.')
      break
    case 4:
      // Avisos apenas, sem bloqueio total
      break
    case 5:
      if (!state.moleculaDCB) erros.push('Molécula (DCB) é obrigatória.')
      if (!state.posologiaManutencao.trim()) erros.push('Posologia de manutenção é obrigatória.')
      break
    case 6:
      if (!state.conclusaoSintese.trim()) erros.push('Síntese clínica é obrigatória.')
      if (!state.conclusaoSolicitacao.trim()) erros.push('Solicitação formal é obrigatória.')
      break
  }
  return erros
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function WizardContainer() {
  const [state, dispatch] = useReducer(wizardReducer, ESTADO_INICIAL)
  const [etapa, setEtapa] = useState(1)
  const [errosValidacao, setErrosValidacao] = useState<string[]>([])

  const totalEtapas = 6

  function handleSetField(field: keyof LaudoOperadora, value: LaudoOperadora[keyof LaudoOperadora]) {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  function handleAvancar() {
    const erros = validarEtapa(state, etapa)
    if (erros.length > 0) {
      setErrosValidacao(erros)
      return
    }
    setErrosValidacao([])
    setEtapa((e) => Math.min(e + 1, totalEtapas))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleVoltar() {
    setErrosValidacao([])
    setEtapa((e) => Math.max(e - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleGerarLaudo() {
    const erros = validarEtapa(state, 6)
    if (erros.length > 0) {
      setErrosValidacao(erros)
      return
    }
    setErrosValidacao([])
    console.log('LAUDO PRONTO PARA GERAÇÃO:', state)
    alert('Laudo pronto para geração. Dados registrados no console.')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <WizardProgress etapaAtual={etapa} />

      <div className="bg-white border border-stone-200 p-6 sm:p-8">
        {etapa === 1 && (
          <Etapa1Identificacao
            data={state}
            onChange={(field, value) => handleSetField(field, value as string)}
          />
        )}
        {etapa === 2 && (
          <Etapa2Anamnese
            data={state}
            onChange={(field, value) =>
              handleSetField(field, value as string | number | null)
            }
          />
        )}
        {etapa === 3 && (
          <Etapa3Tratamentos
            data={state}
            onAddTratamento={() => dispatch({ type: 'ADD_TRATAMENTO' })}
            onRemoveTratamento={(index) => dispatch({ type: 'REMOVE_TRATAMENTO', index })}
            onChangeTratamento={(index, field, value) =>
              dispatch({ type: 'SET_TRATAMENTO', index, field, value })
            }
          />
        )}
        {etapa === 4 && (
          <Etapa4Screening
            data={state}
            onChangeExame={(index, field, value) =>
              dispatch({ type: 'SET_EXAME', index, field, value })
            }
          />
        )}
        {etapa === 5 && (
          <Etapa5Prescricao
            data={state}
            onChange={(field, value) => handleSetField(field, value)}
          />
        )}
        {etapa === 6 && (
          <Etapa6Justificativa
            data={state}
            onChange={(field, value) => handleSetField(field, value)}
          />
        )}

        {/* Erros de validação */}
        {errosValidacao.length > 0 && (
          <div
            className="mt-6 border border-red-200 bg-red-50 px-4 py-3 space-y-1"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            {errosValidacao.map((erro, i) => (
              <p key={i} className="text-xs text-red-600">
                {erro}
              </p>
            ))}
          </div>
        )}

        {/* Navegação */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
          <div>
            {etapa > 1 && (
              <button
                type="button"
                onClick={handleVoltar}
                className="border border-stone-300 text-stone-700 text-sm px-5 py-2 hover:bg-stone-50 transition-colors"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Voltar
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-xs text-stone-400"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              {etapa} de {totalEtapas}
            </span>

            {etapa < totalEtapas ? (
              <button
                type="button"
                onClick={handleAvancar}
                className="bg-stone-900 text-white text-sm px-5 py-2 hover:bg-stone-800 transition-colors"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Avançar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGerarLaudo}
                className="bg-stone-900 text-white text-sm px-5 py-2 hover:bg-stone-800 transition-colors"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Gerar laudo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
