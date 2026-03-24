// linha-config.ts — Color map, slugs, and helpers for the VULPI linha system
import { formulacoes, Formulacao } from './formulations'

const LINHA_COLORS: Record<string, string> = {
  'Acne & Oleosidade': '#1D4ED8',
  'Isotretinoína': '#6B2737',
  'Melasma': '#3D5A2A',
  'Rosácea': '#C17D5A',
  'Dermatite Seborreica': '#B45309',
  'Foliculite': '#2E6B5E',
  'Anti-Aging': '#6B1E3D',
  'Corporal': '#5C4B7A',
  'Pós-Procedimento': '#78716C',
  'Micoses': '#8B4513',
  'Saúde Capilar': '#B07D3A',
  'Condições Especiais': '#4A6172',
  'Fotoproteção': '#7A7A7A',
}

// Slugs must match what DashboardSidebar passes as ?linha=
const LINHA_SLUGS: Record<string, string> = {
  'Acne & Oleosidade': 'acne',
  'Isotretinoína': 'isotretinoina',
  'Melasma': 'melasma',
  'Rosácea': 'rosacea',
  'Dermatite Seborreica': 'dermatite-seborreica',
  'Foliculite': 'foliculite',
  'Anti-Aging': 'anti-aging',
  'Corporal': 'corporal',
  'Pós-Procedimento': 'pos-procedimento',
  'Micoses': 'micoses',
  'Saúde Capilar': 'capilar',
  'Condições Especiais': 'especiais',
  'Fotoproteção': 'fotoproteção',
}

export function getLinhaColor(linha: string): string {
  return LINHA_COLORS[linha] ?? '#78716c'
}

export function getLinhaSlug(linha: string): string {
  return LINHA_SLUGS[linha] ?? linha.toLowerCase().replace(/\s+/g, '-')
}

export interface LinhaInfo {
  linha: string
  linhaSlug: string
  acento_cor: string
  count: number
}

export function getLinhas(): LinhaInfo[] {
  const map = new Map<string, number>()
  for (const f of formulacoes) {
    map.set(f.linha, (map.get(f.linha) ?? 0) + 1)
  }
  return Array.from(map.entries()).map(([linha, count]) => ({
    linha,
    linhaSlug: getLinhaSlug(linha),
    acento_cor: getLinhaColor(linha),
    count,
  }))
}

export function getFormulacaoById(codigo: string): Formulacao | undefined {
  return formulacoes.find((f) => f.codigo === codigo)
}
