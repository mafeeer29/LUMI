import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel } from '../lib/lumiStore'

type TrustedContact = {
  name: string
  relationship: string
  contact: string
  shareSummary: boolean
  shareTimeline: boolean
  shareEvidence: boolean
}

const CONTACT_KEY = 'lumi_trusted_contact_v1'

const defaultContact: TrustedContact = {
  name: '',
  relationship: '',
  contact: '',
  shareSummary: true,
  shareTimeline: false,
  shareEvidence: false,
}

function loadContact(): TrustedContact {
  try {
    const raw = localStorage.getItem(CONTACT_KEY)
    return raw ? { ...defaultContact, ...JSON.parse(raw) } : defaultContact
  } catch {
    return defaultContact
  }
}

export default function Support() {
  const [prepared, setPrepared] = useState(false)
  const [contact, setContact] = useState<TrustedContact>(loadContact)
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

  function saveContact() {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contact))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
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
        Tú decides qué compartir, con quién y cuándo. Lumi no envía nada automáticamente.
      </p>

      <section className="rounded-[26px] bg-[#f1edff] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Contacto de confianza</p>
        <div className="mt-4 space-y-3">
          <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Nombre" className="w-full rounded-2xl border border-[#ddd5eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
          <input value={contact.relationship} onChange={(e) => setContact({ ...contact, relationship: e.target.value })} placeholder="Relación: hermana, amiga, tutor..." className="w-full rounded-2xl border border-[#ddd5eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
          <input value={contact.contact} onChange={(e) => setContact({ ...contact, contact: e.target.value })} placeholder="Teléfono o correo (opcional)" className="w-full rounded-2xl border border-[#ddd5eb] bg-white px-4 py-3 text-sm outline-none focus:border-[#7665c7]" />
        </div>

        <div className="mt-5 rounded-2xl bg-white/80 p-4">
          <p className="text-sm font-extrabold text-[#3a354d]">Qué podría recibir</p>
          <p className="mt-1 text-xs leading-5 text-[#817a88]">Estas opciones solo preparan el contenido. Nada se envía sin una acción tuya.</p>
          <div className="mt-3 space-y-3 text-sm">
            <label className="flex items-center gap-3"><input type="checkbox" checked={contact.shareSummary} onChange={(e) => setContact({ ...contact, shareSummary: e.target.checked })} /> Resumen del caso</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={contact.shareTimeline} onChange={(e) => setContact({ ...contact, shareTimeline: e.target.checked })} /> Bitácora cronológica</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={contact.shareEvidence} onChange={(e) => setContact({ ...contact, shareEvidence: e.target.checked })} /> Evidencias adjuntas</label>
          </div>
        </div>

        {saved && <p className="mt-3 text-center text-xs font-bold text-[#4d7b61]">Contacto y permisos guardados.</p>}
        <button type="button" onClick={saveContact} className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#6655b6] shadow-sm">Guardar contacto</button>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-extrabold text-[#312b49]">Preparar resumen</h2>
        <p className="mt-1 text-sm leading-6 text-[#716a7c]">Genera una vista breve para revisar antes de compartir.</p>
        <button onClick={() => setPrepared(true)} className="mt-4 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Preparar resumen del caso</button>
      </section>

      {prepared && (
        <section className="mt-5 rounded-[26px] bg-white p-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9187a6]">Resumen preparado</p>
          <h3 className="mt-2 text-base font-extrabold text-[#393449]">{data.activeCase.title}</h3>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[#625b6b]">
            <p><strong>Conducta:</strong> {data.conduct}</p>
            <p><strong>Impacto:</strong> {data.impact}</p>
            <p><strong>Registros:</strong> {data.interactions.length} interacción(es)</p>
            {latestCheckin && latestCheckin.changes.length > 0 && <p><strong>Cambios registrados:</strong> {latestCheckin.changes.join(', ')}</p>}
          </div>

          <div className="mt-4 rounded-2xl bg-[#f7f4ff] p-3 text-xs leading-5 text-[#625b6b]">
            <strong>Preparado para compartir:</strong>{' '}
            {[contact.shareSummary && 'resumen', contact.shareTimeline && 'bitácora', contact.shareEvidence && 'evidencias'].filter(Boolean).join(', ') || 'ningún contenido seleccionado'}.
            {contact.name && <span> Contacto: {contact.name}{contact.relationship ? ` (${contact.relationship})` : ''}.</span>}
          </div>

          <div className="mt-3 rounded-2xl bg-[#fff8eb] p-3 text-xs leading-5 text-[#746b70]">
            Este resumen organiza información registrada por la usuaria y no constituye por sí solo una evaluación legal ni una evidencia certificada.
          </div>
          <button type="button" onClick={() => alert('Demo: Lumi preparó el contenido seleccionado. La usuaria decide por qué medio compartirlo.')} className="mt-4 w-full rounded-2xl border border-[#ddd4ef] bg-white px-4 py-3 text-sm font-bold text-[#6655b6]">Continuar para compartir</button>
        </section>
      )}

      <section className="mt-6 rounded-[26px] bg-[#fff8eb] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#967744]">Rutas de apoyo</p>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[#625b6b]">
          {data.interactions.length >= 3 && <p>• Hay varios registros en el caso: conserva la cronología y revisa límites y privacidad entre plataformas.</p>}
          {latestCheckin?.changes?.some((item) => item.toLowerCase().includes('estudio')) && <p>• Si la situación está afectando tus estudios, puedes considerar tutoría, bienestar universitario o un canal institucional.</p>}
          {latestCheckin?.changes?.some((item) => item.toLowerCase().includes('trabajo')) && <p>• Si está afectando tu trabajo, puedes considerar una persona de confianza, RR. HH. o un canal interno.</p>}
          <p>• Si percibes un riesgo inmediato para tu seguridad, prioriza apoyo humano y los servicios de emergencia disponibles en tu entorno.</p>
        </div>
      </section>
    </AppShell>
  )
}
