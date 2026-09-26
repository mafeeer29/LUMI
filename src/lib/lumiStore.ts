export type CaseContext = 'universidad' | 'trabajo' | 'otro'
export type InteractionType = 'mensaje' | 'llamada' | 'cuenta_nueva' | 'presencial' | 'otro'
export type ConductLevel = 'Sin señales suficientes' | 'Atención' | 'Atención elevada'
export type ImpactLevel = 'Sin cambios registrados' | 'Impacto inicial' | 'Impacto creciente'

export interface LumiInteraction {
  id: string
  caseId: string
  type: InteractionType
  channel: string
  description: string
  occurredAt: string
  attempts: number
  fromNewAccount: boolean
  intimidatingLanguage: boolean
  createdAt: string
}

export interface ImpactCheckin {
  id: string
  caseId: string
  changes: string[]
  note: string
  createdAt: string
}

export interface LumiCase {
  id: string
  title: string
  context: CaseContext
  personRelation: string
  notes: string
  createdAt: string
  updatedAt: string
}

const CASES_KEY = 'lumi_cases_v1'
const INTERACTIONS_KEY = 'lumi_interactions_v1'
const CHECKINS_KEY = 'lumi_checkins_v1'
const ACTIVE_CASE_KEY = 'lumi_active_case_v1'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function getCases() {
  return read<LumiCase[]>(CASES_KEY, [])
}

export function getInteractions() {
  return read<LumiInteraction[]>(INTERACTIONS_KEY, [])
}

export function getCheckins() {
  return read<ImpactCheckin[]>(CHECKINS_KEY, [])
}

export function getActiveCaseId() {
  return localStorage.getItem(ACTIVE_CASE_KEY)
}

export function setActiveCaseId(caseId: string) {
  localStorage.setItem(ACTIVE_CASE_KEY, caseId)
}

export function createCase(input: Omit<LumiCase, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString()
  const item: LumiCase = { ...input, id: makeId('case'), createdAt: now, updatedAt: now }
  const next = [item, ...getCases()]
  write(CASES_KEY, next)
  setActiveCaseId(item.id)
  return item
}

export function addInteraction(input: Omit<LumiInteraction, 'id' | 'createdAt'>) {
  const item: LumiInteraction = { ...input, id: makeId('int'), createdAt: new Date().toISOString() }
  write(INTERACTIONS_KEY, [item, ...getInteractions()])
  touchCase(input.caseId)
  return item
}

export function addCheckin(input: Omit<ImpactCheckin, 'id' | 'createdAt'>) {
  const item: ImpactCheckin = { ...input, id: makeId('chk'), createdAt: new Date().toISOString() }
  write(CHECKINS_KEY, [item, ...getCheckins()])
  touchCase(input.caseId)
  return item
}

function touchCase(caseId: string) {
  const now = new Date().toISOString()
  const next = getCases().map((item) => (item.id === caseId ? { ...item, updatedAt: now } : item))
  write(CASES_KEY, next)
}

export function getActiveCase() {
  const cases = getCases()
  const activeId = getActiveCaseId()
  return cases.find((item) => item.id === activeId) ?? cases[0] ?? null
}

export function getCaseInteractions(caseId: string) {
  return getInteractions()
    .filter((item) => item.caseId === caseId)
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
}

export function getCaseCheckins(caseId: string) {
  return getCheckins()
    .filter((item) => item.caseId === caseId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getConductLevel(caseId: string): ConductLevel {
  const items = getCaseInteractions(caseId)
  if (!items.length) return 'Sin señales suficientes'

  let score = 0
  for (const item of items) {
    if (item.attempts >= 8) score += 2
    else if (item.attempts >= 3) score += 1
    if (item.fromNewAccount) score += 2
    if (item.intimidatingLanguage) score += 2
  }

  if (score >= 5) return 'Atención elevada'
  if (score >= 2) return 'Atención'
  return 'Sin señales suficientes'
}

export function getImpactLevel(caseId: string): ImpactLevel {
  const latest = getCaseCheckins(caseId)[0]
  if (!latest || latest.changes.length === 0 || latest.changes.includes('Por ahora no ha cambiado nada')) {
    return 'Sin cambios registrados'
  }
  if (latest.changes.length >= 3 || latest.changes.includes('Siento temor por mi seguridad')) {
    return 'Impacto creciente'
  }
  return 'Impacto inicial'
}

export function seedDemoCase() {
  if (getCases().length) return getActiveCase()

  const demo = createCase({
    title: 'Situación con compañero de universidad',
    context: 'universidad',
    personRelation: 'Compañero de universidad',
    notes: 'Caso sintético para demostración del prototipo.',
  })

  const base = new Date()
  const iso = (daysAgo: number, hour: number, minute: number) => {
    const date = new Date(base)
    date.setDate(date.getDate() - daysAgo)
    date.setHours(hour, minute, 0, 0)
    return date.toISOString()
  }

  addInteraction({
    caseId: demo.id,
    type: 'mensaje',
    channel: 'Mensajería',
    description: '12 mensajes registrados durante la tarde.',
    occurredAt: iso(0, 18, 40),
    attempts: 12,
    fromNewAccount: false,
    intimidatingLanguage: false,
  })
  addInteraction({
    caseId: demo.id,
    type: 'llamada',
    channel: 'Llamadas',
    description: '8 llamadas sin respuesta.',
    occurredAt: iso(1, 20, 15),
    attempts: 8,
    fromNewAccount: false,
    intimidatingLanguage: false,
  })
  addInteraction({
    caseId: demo.id,
    type: 'cuenta_nueva',
    channel: 'Red social',
    description: 'Contacto desde otra cuenta.',
    occurredAt: iso(2, 14, 10),
    attempts: 1,
    fromNewAccount: true,
    intimidatingLanguage: false,
  })
  addCheckin({
    caseId: demo.id,
    changes: ['Está afectando mis estudios', 'He cambiado mis rutinas por miedo o incomodidad'],
    note: 'Dejé de asistir al grupo de estudios por esta situación.',
  })

  return demo
}
