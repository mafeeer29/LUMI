import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import lumiMascot from '../assets/lumi-mascot.png'
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

function buildSupportiveReply(changes: string[], note: string) {
  const text = note.toLowerCase()

  if (changes.includes('Siento temor por mi seguridad') || /miedo|temor|seguridad|amenaz/.test(text)) {
    return 'Gracias por decírmelo. Voy a guardar este cambio junto con lo que ya registraste. Si quieres, en la sección de apoyo puedes revisar opciones y preparar un resumen para alguien de confianza. Tú decides qué hacer y con quién compartirlo.'
  }

  if (changes.includes('Está afectando mis estudios') || /estudio|universidad|clase|curso|examen/.test(text)) {
    return 'Gracias por contármelo. Veo que esta situación está empezando a interferir con tus estudios. Lo guardaré como parte de tu seguimiento para que Lumi tenga en cuenta este impacto al organizar tus próximos pasos.'
  }

  if (changes.includes('Está afectando mi trabajo') || /trabajo|oficina|jefe|laboral/.test(text)) {
    return 'Gracias por compartirlo. Registrar que esto está afectando tu trabajo nos ayuda a ver mejor cómo la situación está impactando tu día a día. Lo guardaré para tenerlo en cuenta en tus recomendaciones.'
  }

  if (changes.includes('Me estoy alejando de otras personas') || /sola|aislad|alejando|amigos|familia/.test(text)) {
    return 'Gracias por confiarme eso. Voy a registrar este cambio para que no quede aislado del resto de lo que estás viviendo. Si lo deseas, también puedes revisar tu red de apoyo cuando te sientas lista.'
  }

  if (changes.includes('Por ahora no ha cambiado nada')) {
    return 'Entendido. Lo guardaré como parte de tu seguimiento. Si algo cambia más adelante, puedes volver y contármelo cuando quieras.'
  }

  if (note.trim()) {
    return 'Gracias por contármelo con tus propias palabras. Voy a guardar lo que compartiste junto con tu seguimiento para que Lumi pueda considerar este contexto sin que tengas que repetirlo después.'
  }

  if (changes.length > 0) {
    return 'Gracias por contármelo. Voy a guardar estos cambios como parte de tu seguimiento para que Lumi pueda tenerlos en cuenta junto con las demás señales registradas.'
  }

  return 'Está bien si hoy no quieres agregar más. Puedes volver a este espacio cuando lo necesites.'
}

export default function ImpactCheckin() {
  const navigate = useNavigate()
  const activeCase = useMemo(() => getActiveCase(), [])
  const [changes, setChanges] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [reply, setReply] = useState('')
  const [saved, setSaved] = useState(false)

  if (!activeCase) {
    return (
      <AppShell title="Check-in de impacto">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para registrar cómo está afectando la situación tu día a día.</p>
      </AppShell>
    )
  }

  function toggle(option: string) {
    if (saved) return
    setChanges((current) => {
      if (option === 'Por ahora no ha cambiado nada') return current.includes(option) ? [] : [option]
      const withoutNone = current.filter((item) => item !== 'Por ahora no ha cambiado nada')
      return withoutNone.includes(option) ? withoutNone.filter((item) => item !== option) : [...withoutNone, option]
    })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (saved) return
    addCheckin({ caseId: activeCase.id, changes, note: note.trim() })
    setReply(buildSupportiveReply(changes, note))
    setSaved(true)
  }

  return (
    <AppShell title="Un momento para ti">
      <div className="mb-5 flex items-end gap-3">
        <img src={lumiMascot} alt="Lumi" className="h-14 w-14 shrink-0 object-contain" />
        <div className="max-w-[82%] rounded-[22px] rounded-bl-md bg-[#eee8ff] px-4 py-3 text-sm leading-6 text-[#514873]">
          Hola. Quiero entender cómo te está afectando esta situación, sin que tengas que explicarlo todo de una vez.
        </div>
      </div>

      <div className="mb-5 ml-16 max-w-[82%] rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-[#625b6e] shadow-sm ring-1 ring-[#eee8f5]">
        Marca lo que se parezca a lo que estás viviendo y, si quieres, cuéntame algo más con tus propias palabras. Cuando termines, te respondo.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-2.5">
          {options.map((option) => {
            const selected = changes.includes(option)
            return (
              <button
                key={option}
                type="button"
                disabled={saved}
                onClick={() => toggle(option)}
                className={`w-full rounded-[20px] border px-4 py-3 text-left text-sm transition disabled:cursor-default ${selected ? 'border-[#8d78df] bg-[#f0ebff] text-[#453a71]' : 'border-[#ebe5f3] bg-white text-[#514b5e]'}`}
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

        <div className="mt-5 rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-[#eee8f5]">
          <p className="text-sm font-bold text-[#4d465c]">Si quieres, puedes contarme un poco más.</p>
          <p className="mt-1 text-xs leading-5 text-[#817a89]">Es opcional. Puedes escribirlo con tus propias palabras.</p>
          <textarea
            value={note}
            disabled={saved}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Ej. Dejé de ir al grupo de estudios porque me preocupa encontrarme con esa persona."
            className="mt-3 w-full resize-none rounded-2xl border border-[#ebe5f3] bg-[#fcfbff] px-4 py-3 text-sm outline-none focus:border-[#9b89dd] disabled:opacity-70"
          />
        </div>

        {!saved ? (
          <>
            <div className="mt-4 rounded-2xl bg-[#faf8fd] px-4 py-3 text-[11px] leading-5 text-[#898190]">
              Lumi usa lo que tú decides compartir para organizar señales e impacto. No realiza diagnósticos ni determina culpabilidad.
            </div>
            <button className="mt-5 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">
              Enviar a Lumi
            </button>
          </>
        ) : (
          <div className="mt-6">
            <div className="flex items-end gap-3">
              <img src={lumiMascot} alt="Lumi" className="h-14 w-14 shrink-0 object-contain" />
              <div className="max-w-[82%] rounded-[22px] rounded-bl-md bg-[#eee8ff] px-4 py-3 text-sm leading-6 text-[#514873]">
                {reply}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/app/caso')}
              className="mt-5 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white"
            >
              Continuar a mi caso
            </button>
          </div>
        )}
      </form>
    </AppShell>
  )
}
