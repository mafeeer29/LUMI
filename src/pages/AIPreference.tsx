import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type AIPreference, getPrivacySettings, setAIPreference } from '../lib/accountStore'

const options: { value: AIPreference; title: string; description: string }[] = [
  {
    value: 'automatic',
    title: 'Analizar automáticamente',
    description: 'Lumi podrá analizar con IA el texto que registres sin pedir confirmación cada vez.',
  },
  {
    value: 'ask',
    title: 'Preguntarme antes',
    description: 'Lumi te pedirá permiso antes de enviar cada texto al análisis con IA.',
  },
  {
    value: 'disabled',
    title: 'No analizar con IA',
    description: 'Tus registros seguirán funcionando con las reglas objetivas del prototipo, sin análisis de IA.',
  },
]

export default function AIPreferencePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<AIPreference | null>(getPrivacySettings().aiPreference)

  function continueSetup() {
    if (!selected) return
    setAIPreference(selected)
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Paso 2 de 3</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">¿Cómo quieres usar la IA?</h1>
        <p className="mt-3 text-sm leading-6 text-[#716a7c]">Esta elección es independiente de los Términos y la Política de privacidad. Podrás cambiarla luego desde Perfil → Privacidad e IA.</p>

        <div className="mt-6 space-y-3">
          {options.map((option) => {
            const active = selected === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                className={`w-full rounded-[24px] border p-5 text-left transition ${active ? 'border-[#7665c7] bg-[#f0ebff] ring-2 ring-[#ded6ff]' : 'border-[#ebe5f3] bg-white'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-extrabold">{option.title}</h2>
                    <p className="mt-2 text-xs leading-5 text-[#716a7c]">{option.description}</p>
                  </div>
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${active ? 'border-[#6755c8] bg-[#6755c8] text-white' : 'border-[#cfc7dd]'}`}>{active ? '✓' : ''}</span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-[#fff8eb] p-4 text-xs leading-5 text-[#746b70]">
          Para el MVP, la preferencia se aplica al análisis de texto. El audio se adjunta solo como evidencia.
        </div>

        <button onClick={continueSetup} disabled={!selected} className="mt-6 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Guardar preferencia</button>
      </div>
    </div>
  )
}
