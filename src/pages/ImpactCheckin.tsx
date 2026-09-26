import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { addCheckin, getActiveCase } from '../lib/lumiStore'

const options = [
  'Estoy evitando ciertos lugares',
  'He dejado de asistir a alguna actividad',
  'Está afectando mis estudios',
  'Está afectando mi trabajo',
  'He cambiado mis rutinas por miedo o incomodidad',
  'Me estoy alejando de otras personas',
  'Siento temor por mi seguridad',
  'Por ahora no ha cambiado nada',
]

export default function ImpactCheckin() {
  const navigate = useNavigate()
  const activeCase = useMemo(() => getActiveCase(), [])
  const [changes, setChanges] = useState<string[]>([])
  const [note, setNote] = useState('')

  if (!activeCase) {
    return (
      <AppShell title="Check-in de impacto">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para registrar cómo está afectando la situación tu día a día.</p>
      </AppShell>
    )
  }

  function toggle(option: string) {
    setChanges((current) => {
      if (option === 'Por ahora no ha cambiado nada') return current.includes(option) ? [] : [option]
      const withoutNone = current.filter((item) => item !== 'Por ahora no ha cambiado nada')
      return withoutNone.includes(option) ? withoutNone.filter((item) => item !== option) : [...withoutNone, option]
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    addCheckin({ caseId: activeCase.id, changes, note: note.trim() })
    navigate('/app/caso')
  }

  return (
    <AppShell title="¿Qué está empezando a cambiar en tu vida?">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Marca solo lo que quieras compartir. Lumi organiza los cambios que expresas; no realiza diagnósticos.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-2.5">
          {options.map((option) => {
            const selected = changes.includes(option)
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${selected ? 'border-[#8d78df] bg-[#f0ebff] text-[#453a71]' : 'border-[#ebe5f3] bg-white text-[#514b5e]'}`}
              >
                <span className="flex items-center justify-between gap-4">
                  {option}
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${selected ? 'border-[#8d78df] bg-[#8d78df] text-white' : 'border-[#d9d2e3]'}`}>
                    {selected ? '✓' : ''}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">¿Quieres contarnos algo más? · Opcional</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="Ej. Dejé de ir al grupo de estudios porque me preocupa encontrarme con esa persona." className="w-full resize-none rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <button className="mt-5 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Guardar check-in</button>
      </form>
    </AppShell>
  )
}
