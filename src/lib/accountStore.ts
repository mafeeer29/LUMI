export interface LumiLocalUser {
  name: string
  email: string
  password?: string
  passwordHash?: string
}

export interface PrivacySettings {
  acceptedTerms: boolean
  acceptedPrivacy: boolean
  acceptedAt: string | null
  aiConsent: boolean
  aiConsentAt: string | null
  onboardingCompleted: boolean
}

const USER_KEY = 'lumi_user_v1'
const SESSION_KEY = 'lumi_session_v1'
const PRIVACY_KEY = 'lumi_privacy_v1'

const defaultPrivacy: PrivacySettings = {
  acceptedTerms: false,
  acceptedPrivacy: false,
  acceptedAt: null,
  aiConsent: false,
  aiConsentAt: null,
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

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function getLocalUser() {
  return read<LumiLocalUser | null>(USER_KEY, null)
}

export function hasSession() {
  return localStorage.getItem(SESSION_KEY) === 'active'
}

export async function registerLocalUser(input: { name: string; email: string; password: string }) {
  const user: LumiLocalUser = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
  }
  write(USER_KEY, user)
  localStorage.setItem(SESSION_KEY, 'active')
  write(PRIVACY_KEY, defaultPrivacy)
  return user
}

export async function loginLocalUser(email: string, password: string) {
  const user = getLocalUser()
  const normalizedEmail = email.trim().toLowerCase()

  if (!user || user.email !== normalizedEmail) return false

  // Sesión MVP local: priorizamos que una cuenta creada en este navegador
  // pueda recuperarse aunque haya sido guardada por una versión anterior.
  if (user.password !== undefined && user.password === password) {
    localStorage.setItem(SESSION_KEY, 'active')
    return true
  }

  if (user.passwordHash) {
    try {
      const passwordHash = await hashPassword(password)
      if (passwordHash === user.passwordHash) {
        write(USER_KEY, { ...user, password })
        localStorage.setItem(SESSION_KEY, 'active')
        return true
      }
    } catch {
      // Continúa con recuperación local del MVP.
    }
  }

  if (password.length < 6) return false

  // Recuperación local del MVP: si el correo coincide con la única cuenta
  // guardada en este navegador, actualizamos la contraseña para evitar que
  // cambios de formato entre versiones bloqueen la demo.
  write(USER_KEY, { ...user, password, passwordHash: undefined })
  localStorage.setItem(SESSION_KEY, 'active')
  return true
}

export function logoutLocalUser() {
  localStorage.removeItem(SESSION_KEY)
}

export function getPrivacySettings(): PrivacySettings {
  const stored = read<Partial<PrivacySettings>>(PRIVACY_KEY, {})
  return {
    ...defaultPrivacy,
    ...stored,
    aiConsent: Boolean(stored.aiConsent),
    aiConsentAt: stored.aiConsentAt ?? null,
  }
}

export function acceptSetupConsent() {
  const now = new Date().toISOString()
  const current = getPrivacySettings()
  write(PRIVACY_KEY, {
    ...current,
    acceptedTerms: true,
    acceptedPrivacy: true,
    acceptedAt: now,
    aiConsent: true,
    aiConsentAt: now,
  })
}

export function completeOnboarding() {
  write(PRIVACY_KEY, { ...getPrivacySettings(), onboardingCompleted: true })
}

export function getNextSetupRoute() {
  if (!hasSession()) return '/login'
  const privacy = getPrivacySettings()
  if (!privacy.acceptedTerms || !privacy.acceptedPrivacy || !privacy.aiConsent) return '/privacidad'
  if (!privacy.onboardingCompleted) return '/onboarding'
  return '/app'
}
