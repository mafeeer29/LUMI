import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { addInteraction, getActiveCase, type InteractionType } from '../lib/lumiStore'

export default function RegisterInteraction() {
  const navigate = useNavigate()
  const activeCase = useMemo(() => getActiveCase(), [])
  const [type, setType] = useState<InteractionType>('mensaje')
  const [channel, setChannel] = useState('Mensajería')
  const [description, setDescription] = useState('')
  const [attempts, setAttempts] = useState(1)
  const [fromNewAccount, setFromNewAccount] = useState(false)
  const [intimidatingLanguage, setIntimidatingLanguage] = useState(false)
  const [occurredAt, setOccurredAt] = useState(() => new Date().toISOString().slice(0, 16))

  if (!activeCase) {
    return (
      <AppShell title="Registrar interacción">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para poder registrar interacciones.</p>
        <button onClick={() => navigate('/app/nuevo-caso')} className="mt-5 rounded-2xl bg-[#6755c8] px-4 py-3 text-sm font-bold text-white">Crear caso</button>
      </AppShell>
    )
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    addInteraction({
      caseId: activeCase.id,
      type,
      channel: channel.trim(),
      description: description.trim() || 'Interacción registrada.',
      occurredAt: new Date(occurredAt).toISOString(),
      attempts: Math.max(1, attempts),
      fromNewAccount,
      intimidatingLanguage,
    })
    navigate('/app/caso')
  }

  return (
    <AppShell title="Registrar interacción">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Añade hechos observables. Lumi organiza patrones; no determina culpabilidad ni delitos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Tipo</span>
          <select value={type} onChange={(e) => setType(e.target.value as InteractionType)} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm">
            <option value="mensaje">Mensaje</option>
            <option value="llamada">Llamada</option>
            <option value="cuenta_nueva">Contacto desde otra cuenta</option>
            <option value="presencial">Situación presencial</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Canal</span>
          <input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="WhatsApp, llamadas, Instagram..." className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Fecha y hora</span>
          <input type="datetime-local" value={occurredAt} onChange={(e) => setOccurredAt(e.target.value)} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Qué ocurrió</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe brevemente lo que pasó." className="w-full resize-none rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Cantidad de intentos</span>
          <input type="number" min={1} value={attempts} onChange={(e) => setAttempts(Number(e.target.value))} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm" />
        </label>

        <div className="space-y-3 rounded-2xl bg-white p-4">
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={fromNewAccount} onChange={(e) => setFromNewAccount(e.target.checked)} className="mt-1" />
            <span>El contacto llegó desde otra cuenta, número o canal.</span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={intimidatingLanguage} onChange={(e) => setIntimidatingLanguage(e.target.checked)} className="mt-1" />
            <span>El mensaje contenía lenguaje que percibí como intimidatorio, coercitivo o amenazante.</span>
          </label>
        </div>

        <button className="w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Guardar interacción</button>
      </form>
    </AppShell>
  )
}
