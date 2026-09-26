export type AIPreference = 'automatic' | 'ask'

export interface LumiLocalUser {
  name: string
  email: string
}

export interface AIDataPermissions {
  shareCaseContext: boolean
  shareImages: boolean
}

export interface PrivacySettings {
  acceptedTerms: boolean
  acceptedPrivacy: boolean
  acceptedAt: string | null
  aiConsent: boolean
  aiConsentAt: string | null
  aiPreference: AIPreference | null
  aiDataPermissions: AIDataPermissions
  onboardingCompleted: boolean
}

const USER_KEY = 'lumi_user_v1'
const SESSION_KEY = 'lumi_session_v1'
const PRIVACY_KEY = 'lumi_privacy_v1'

const defaultAIDataPermissions: AIDataPermissions = {
  shareCaseContext: true,
  shareImages: false,
}

const defaultPrivacy: PrivacySettings = {
  acceptedTerms: false,
  acceptedPrivacy: false,
  acceptedAt: null,
  aiConsent: false,
  aiConsentAt: null,
  aiPreference: null,
  aiDataPermissions: defaultAIDataPermissions,
  onboardingCompleted: false,
}

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

export function getLocalUser() {
  return read<LumiLocalUser | null>(USER_KEY, null)
}

export function hasSession() {
  return localStorage.getItem(SESSION_KEY) === 'active'
}

export function registerLocalUser(input: LumiLocalUser) {
  const user = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
  }
  write(USER_KEY, user)
  localStorage.setItem(SESSION_KEY, 'active')
  write(PRIVACY_KEY, defaultPrivacy)
  return user
}

export function loginLocalUser(email: string) {
  const user = getLocalUser()
  if (!user || user.email !== email.trim().toLowerCase()) return false
  localStorage.setItem(SESSION_KEY, 'active')
  return true
}

export function logoutLocalUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getPrivacySettings(): PrivacySettings {
  const stored = read<Partial<PrivacySettings> & { aiPreference?: AIPreference | 'disabled' | null }>(PRIVACY_KEY, {})

  // Migra silenciosamente preferencias antiguas del prototipo. Si antes estaba
  // en "disabled", se vuelve a pedir consentimiento en el nuevo flujo.
  const oldPreference = stored.aiPreference
  const validPreference = oldPreference === 'automatic' || oldPreference === 'ask' ? oldPreference : null
  const requiresNewConsent = oldPreference === 'disabled'

  return {
    ...defaultPrivacy,
    ...stored,
    aiConsent: requiresNewConsent ? false : Boolean(stored.aiConsent),
    aiConsentAt: requiresNewConsent ? null : stored.aiConsentAt ?? null,
    aiPreference: requiresNewConsent ? null : validPreference,
    aiDataPermissions: {
      ...defaultAIDataPermissions,
      ...(stored.aiDataPermissions ?? {}),
    },
  }
}

export function acceptLegalDocuments() {
  const current = getPrivacySettings()
  write(PRIVACY_KEY, {
    ...current,
    acceptedTerms: true,
    acceptedPrivacy: true,
    acceptedAt: new Date().toISOString(),
  })
}

export function acceptAIConsent(aiPreference: AIPreference, aiDataPermissions?: Partial<AIDataPermissions>) {
  const current = getPrivacySettings()
  write(PRIVACY_KEY, {
    ...current,
    aiConsent: true,
    aiConsentAt: new Date().toISOString(),
    aiPreference,
    aiDataPermissions: {
      ...current.aiDataPermissions,
      ...aiDataPermissions,
    },
  })
}

export function setAIPreference(aiPreference: AIPreference) {
  write(PRIVACY_KEY, { ...getPrivacySettings(), aiPreference })
}

export function setAIDataPermissions(aiDataPermissions: Partial<AIDataPermissions>) {
  const current = getPrivacySettings()
  write(PRIVACY_KEY, {
    ...current,
    aiDataPermissions: {
      ...current.aiDataPermissions,
      ...aiDataPermissions,
    },
  })
}

export function completeOnboarding() {
  write(PRIVACY_KEY, { ...getPrivacySettings(), onboardingCompleted: true })
}

export function getNextSetupRoute() {
  if (!hasSession()) return '/login'
  const privacy = getPrivacySettings()
  if (!privacy.acceptedTerms || !privacy.acceptedPrivacy) return '/privacidad'
  if (!privacy.aiConsent || !privacy.aiPreference) return '/preferencia-ia'
  if (!privacy.onboardingCompleted) return '/onboarding'
  return '/app'
}
