import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { acceptSetupConsent } from '../lib/accountStore'

export default function LegalConsent() {
  const navigate = useNavigate()
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [ai, setAI] = useState(false)

  function continueSetup() {
    if (!terms || !privacy || !ai) return
    acceptSetupConsent()
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Paso 1 de 2</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Antes de empezar</h1>
        <p className="mt-3 text-sm leading-6 text-[#716a7c]">Lumi organiza la información que decides registrar y usa IA para analizar señales y contexto. No determina delitos, culpabilidad ni diagnósticos, y no comparte información automáticamente.</p>

        <section className="mt-6 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-base font-extrabold">Términos de uso</h2>
          <p className="mt-3 text-xs leading-5 text-[#6d6677]">Lumi es una herramienta de intervención temprana, organización y orientación. Sus señales y recomendaciones son informativas y no sustituyen evaluación profesional, institucional o legal.</p>
          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
            <span>Acepto los Términos de uso del prototipo.</span>
          </label>
        </section>

        <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-base font-extrabold">Privacidad</h2>
          <p className="mt-3 text-xs leading-5 text-[#6d6677]">Para el MVP, la cuenta y los datos del caso se conservan localmente en este navegador. Lumi no envía información a contactos o terceros sin una acción explícita de la usuaria.</p>
          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
            <span>Acepto la Política de privacidad del prototipo.</span>
          </label>
        </section>

        <section className="mt-4 rounded-[26px] bg-[#f2edff] p-5 ring-1 ring-[#e2d9ff]">
          <h2 className="text-base font-extrabold">Análisis con IA</h2>
          <p className="mt-3 text-xs leading-5 text-[#625b73]">Autorizo a Lumi a usar IA para analizar la información y evidencias que yo decida registrar en la plataforma, con el objetivo de identificar señales, contexto y posibles cambios relevantes. La IA no toma decisiones por mí ni determina delitos.</p>
          <label className="mt-4 flex items-start gap-3 text-sm font-semibold leading-5">
            <input type="checkbox" checked={ai} onChange={(e) => setAI(e.target.checked)} className="mt-1" />
            <span>Autorizo el análisis con IA de lo que decida compartir en Lumi.</span>
          </label>
        </section>

        <button onClick={continueSetup} disabled={!terms || !privacy || !ai} className="mt-6 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continuar</button>
      </div>
    </div>
  )
}
