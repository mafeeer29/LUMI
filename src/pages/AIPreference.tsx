import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { acceptAIConsent, type AIPreference, getPrivacySettings } from '../lib/accountStore'

const options: { value: AIPreference; title: string; description: string }[] = [
  {
    value: 'automatic',
    title: 'Analizar automáticamente',
    description: 'Lumi analiza el texto que registres cuando lo guardas para identificar señales y explicar el contexto.',
  },
  {
    value: 'ask',
    title: 'Preguntarme antes de cada análisis',
    description: 'Antes de analizar un registro con IA, Lumi te pedirá confirmación. Puedes decidir caso por caso.',
  },
]

export default function AIPreferencePage() {
  const navigate = useNavigate()
  const privacy = getPrivacySettings()
  const [selected, setSelected] = useState<AIPreference | null>(privacy.aiPreference ?? 'ask')
  const [consent, setConsent] = useState(privacy.aiConsent)
  const [shareContext, setShareContext] = useState(privacy.aiDataPermissions.shareCaseContext)
  const [shareImages, setShareImages] = useState(privacy.aiDataPermissions.shareImages)

  function continueSetup() {
    if (!selected || !consent) return
    acceptAIConsent(selected, {
      shareCaseContext: shareContext,
      shareImages,
    })
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Paso 2 de 3</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">IA con tu consentimiento</h1>
        <p className="mt-3 text-sm leading-6 text-[#716a7c]">La IA es parte esencial de Lumi para comprender el lenguaje y ayudarte a identificar señales. Tú decides cuándo se ejecuta y qué información adicional puede acompañar al texto.</p>

        <section className="mt-6 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-sm font-extrabold">¿Cuándo quieres que analice?</h2>
          <div className="mt-4 space-y-3">
            {options.map((option) => {
              const active = selected === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelected(option.value)}
                  className={`w-full rounded-[22px] border p-4 text-left transition ${active ? 'border-[#7665c7] bg-[#f0ebff] ring-2 ring-[#ded6ff]' : 'border-[#ebe5f3] bg-white'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-extrabold">{option.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-[#716a7c]">{option.description}</p>
                    </div>
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${active ? 'border-[#6755c8] bg-[#6755c8] text-white' : 'border-[#cfc7dd]'}`}>{active ? '✓' : ''}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-sm font-extrabold">¿Qué puede acompañar al análisis?</h2>
          <p className="mt-2 text-xs leading-5 text-[#716a7c]">El texto registrado es la entrada principal del análisis de IA en este MVP.</p>

          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={shareContext} onChange={(e) => setShareContext(e.target.checked)} className="mt-1" />
            <span><strong>Contexto del caso</strong><br /><span className="text-xs text-[#716a7c]">Permite considerar registros previos y datos generales del caso cuando ayuden a interpretar el texto.</span></span>
          </label>

          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={shareImages} onChange={(e) => setShareImages(e.target.checked)} className="mt-1" />
            <span><strong>Imágenes adjuntas</strong><br /><span className="text-xs text-[#716a7c]">Queda preparado como permiso opcional. El análisis de imágenes solo se activará si se integra al MVP.</span></span>
          </label>

          <div className="mt-4 rounded-2xl bg-[#faf8fd] p-3 text-xs leading-5 text-[#716a7c]">Los audios se adjuntan como evidencia y no se analizan con IA en el MVP.</div>
        </section>

        <label className="mt-5 flex items-start gap-3 rounded-[22px] bg-[#f2edff] p-4 text-sm leading-5 text-[#4d456f]">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
          <span>Autorizo a Lumi a usar IA para analizar la información que decida registrar y compartir con el análisis, de acuerdo con la configuración elegida arriba.</span>
        </label>

        <p className="mt-3 text-xs leading-5 text-[#81798b]">Lumi usa la IA para identificar señales y generar explicaciones. No determina delitos, culpabilidad, diagnósticos ni predice una agresión como certeza.</p>

        <button onClick={continueSetup} disabled={!selected || !consent} className="mt-6 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Guardar y continuar</button>
      </div>
    </div>
  )
}
