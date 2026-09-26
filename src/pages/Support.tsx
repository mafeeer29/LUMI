import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel, makeId } from '../lib/lumiStore'

type TrustedContact = {
  id: string
  name: string
  relationship: string
  contact: string
}

type SharePrefs = {
  shareSummary: boolean
  shareTimeline: boolean
  shareEvidence: boolean
}

const CONTACTS_KEY = 'lumi_trusted_contacts_v2'
const SELECTED_KEY = 'lumi_selected_contact_v2'
const PREFS_KEY = 'lumi_share_prefs_v2'

const defaultPrefs: SharePrefs = {
  shareSummary: true,
  shareTimeline: true,
  shareEvidence: false,
}

function loadContacts(): TrustedContact[] {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadPrefs(): SharePrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs
  } catch {
    return defaultPrefs
  }
}

export default function Support() {
  const [contacts, setContacts] = useState<TrustedContact[]>(loadContacts)
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem(SELECTED_KEY) ?? '')
  const [draft, setDraft] = useState({ name: '', relationship: '', contact: '' })
  const [prefs, setPrefs] = useState<SharePrefs>(loadPrefs)
  const [prepared, setPrepared] = useState(false)
  const [saved, setSaved] = useState(false)

  const data = useMemo(() => {
    const activeCase = getActiveCase()
    if (!activeCase) return null
    return {
      activeCase,
      interactions: getCaseInteractions(activeCase.id),
      checkins: getCaseCheckins(activeCase.id),
      conduct: getConductLevel(activeCase.id),
      impact: getImpactLevel(activeCase.id),
    }
  }, [])

  const selectedContact = contacts.find((item) => item.id === selectedId) ?? null

  function saveNewContact() {
    if (!draft.name.trim()) return
    const nextContact: TrustedContact = {
      id: makeId('contact'),
      name: draft.name.trim(),
      relationship: draft.relationship.trim(),
      contact: draft.contact.trim(),
    }
    const next = [...contacts, nextContact]
    setContacts(next)
    setSelectedId(nextContact.id)
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(next))
    localStorage.setItem(SELECTED_KEY, nextContact.id)
    setDraft({ name: '', relationship: '', contact: '' })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  function selectContact(id: string) {
    setSelectedId(id)
    localStorage.setItem(SELECTED_KEY, id)
  }

  function savePrefs(next: SharePrefs) {
    setPrefs(next)
    localStorage.setItem(PREFS_KEY, JSON.stringify(next))
  }

  if (!data) {
    return (
      <AppShell title="Tu red de apoyo">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para preparar un resumen.</p>
      </AppShell>
    )
  }

  const latestCheckin = data.checkins[0]

  return (
    <AppShell title="Tu red de apoyo">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Guarda tus contactos de confianza y elige a quién preparar información. Lumi no envía nada automáticamente.
      </p>

      <section className="rounded-[26px] bg-[#f1edff] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Contactos guardados</p>
            <h2 className="mt-1 text-base font-extrabold text-[#3a354d]">¿Con quién quieres contar?</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#6655b6]">{contacts.length}</span>
        </div>

        {contacts.length > 0 ? (
          <div className="mt-4 space-y-2">
            {contacts.map((item) => {
              const selected = selectedId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectContact(item.id)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${selected ? 'border-[#826ed1] bg-white shadow-sm' : 'border-transparent bg-white/70'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-[#3f394d]">{item.name}</p>
                      <p className="mt-0.5 text-xs text-[#817a88]">{item.relationship || 'Contacto de confianza'}{item.contact ? ` · ${item.contact}` : ''}</p>
                    </div>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${selected ? 'border-[#826ed1] bg-[#826ed1] text-white' : 'border-[#d8d0e5]'}`}>{selected ? '✓' : ''}</span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-white/75 p-4 text-xs leading-5 text-[#756e7e]">Todavía no tienes contactos guardados. Añade uno abajo y quedará disponible para futuras ocasiones.</div>
        )}
      </section>

      <section className="mt-4 rounded-[26px] bg-white p-4 shadow-sm ring-1 ring-[#eee8f5]">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Nuevo contacto</p>
        <div className="mt-3 space-y-3">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Nombre" className="w-full rounded-2xl border border-[#ddd5eb] px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
          <input value={draft.relationship} onChange={(e) => setDraft({ ...draft, relationship: e.target.value })} placeholder="Relación: amiga, hermana, tutor..." className="w-full rounded-2xl border border-[#ddd5eb] px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
          <input value={draft.contact} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} placeholder="Teléfono o correo (opcional)" className="w-full rounded-2xl border border-[#ddd5eb] px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
        </div>
        {saved && <p className="mt-3 text-center text-xs font-bold text-[#4d7b61]">Contacto guardado.</p>}
        <button type="button" onClick={saveNewContact} disabled={!draft.name.trim()} className="mt-4 w-full rounded-2xl bg-[#6755c8] px-4 py-3 text-sm font-bold text-white disabled:opacity-40">+ Guardar contacto</button>
      </section>

      <section className="mt-5 rounded-[26px] bg-[#faf8ff] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Qué preparar</p>
        <p className="mt-1 text-xs leading-5 text-[#817a88]">Selecciona qué contenido quieres dejar listo para compartir.</p>
        <div className="mt-3 space-y-3 text-sm">
          <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.shareSummary} onChange={(e) => savePrefs({ ...prefs, shareSummary: e.target.checked })} /> Resumen del caso</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.shareTimeline} onChange={(e) => savePrefs({ ...prefs, shareTimeline: e.target.checked })} /> Bitácora / expediente</label>
          <label className="flex items-center gap-3"><input type="checkbox" checked={prefs.shareEvidence} onChange={(e) => savePrefs({ ...prefs, shareEvidence: e.target.checked })} /> Evidencias adjuntas</label>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-extrabold text-[#312b49]">Preparar para compartir</h2>
        <p className="mt-1 text-sm leading-6 text-[#716a7c]">Genera una vista breve antes de decidir si la compartes.</p>
        <button onClick={() => setPrepared(true)} className="mt-4 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Preparar resumen</button>
      </section>

      {prepared && (
        <section className="mt-5 rounded-[26px] bg-white p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9187a6]">Contenido preparado</p>
          <h3 className="mt-2 text-base font-extrabold text-[#393449]">{data.activeCase.title}</h3>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[#625b6b]">
            <p><strong>Conducta:</strong> {data.conduct}</p>
            <p><strong>Impacto:</strong> {data.impact}</p>
            <p><strong>Registros:</strong> {data.interactions.length} interacción(es)</p>
            {latestCheckin && latestCheckin.changes.length > 0 && <p><strong>Cambios:</strong> {latestCheckin.changes.join(', ')}</p>}
          </div>

          <div className="mt-4 rounded-2xl bg-[#f7f4ff] p-3 text-xs leading-5 text-[#625b6b]">
            <strong>Destinatario seleccionado:</strong>{' '}
            {selectedContact ? `${selectedContact.name}${selectedContact.relationship ? ` (${selectedContact.relationship})` : ''}` : 'Aún no seleccionaste un contacto'}.
            <br />
            <strong>Incluye:</strong>{' '}
            {[prefs.shareSummary && 'resumen', prefs.shareTimeline && 'bitácora/expediente', prefs.shareEvidence && 'evidencias'].filter(Boolean).join(', ') || 'ningún contenido seleccionado'}.
          </div>

          <div className="mt-3 rounded-2xl bg-[#fff8eb] p-3 text-xs leading-5 text-[#746b70]">
            Este contenido organiza información registrada por la usuaria. No constituye por sí solo una evaluación legal ni evidencia certificada.
          </div>

          <button type="button" onClick={() => alert('Demo: el contenido quedó preparado. Lumi no lo envía automáticamente; la usuaria decide el medio y el momento.')} className="mt-4 w-full rounded-2xl border border-[#ddd4ef] bg-white px-4 py-3 text-sm font-bold text-[#6655b6]">Continuar para compartir</button>
        </section>
      )}

      <section className="mt-6 rounded-[26px] bg-[#fff8eb] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#967744]">Rutas de apoyo</p>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[#625b6b]">
          {data.interactions.length >= 3 && <p>• Hay varios registros: conserva la cronología y revisa límites y privacidad entre plataformas.</p>}
          {latestCheckin?.changes?.some((item) => item.toLowerCase().includes('estudio')) && <p>• Si afecta tus estudios, puedes considerar tutoría, bienestar universitario o un canal institucional.</p>}
          {latestCheckin?.changes?.some((item) => item.toLowerCase().includes('trabajo')) && <p>• Si afecta tu trabajo, puedes considerar una persona de confianza, RR. HH. o un canal interno.</p>}
          <p>• Si percibes un riesgo inmediato para tu seguridad, prioriza apoyo humano y los servicios de emergencia disponibles en tu entorno.</p>
        </div>
      </section>
    </AppShell>
  )
}
