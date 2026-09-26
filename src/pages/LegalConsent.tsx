import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { acceptLegalDocuments } from '../lib/accountStore'

export default function LegalConsent() {
  const navigate = useNavigate()
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)

  function continueSetup() {
    if (!terms || !privacy) return
    acceptLegalDocuments()
    navigate('/preferencia-ia')
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Paso 1 de 3</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Antes de empezar</h1>
        <p className="mt-3 text-sm leading-6 text-[#716a7c]">Lumi organiza información que tú registras. No determina delitos, culpabilidad ni diagnósticos, y no comparte información automáticamente.</p>

        <section className="mt-6 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-base font-extrabold">Términos de uso</h2>
          <div className="mt-3 max-h-40 overflow-y-auto rounded-2xl bg-[#faf8fd] p-4 text-xs leading-5 text-[#6d6677]">
            <p>Lumi es una herramienta de intervención temprana, organización y orientación. Las señales y recomendaciones que muestra son informativas y no sustituyen evaluación profesional, institucional o legal.</p>
            <p className="mt-2">La usuaria mantiene el control sobre lo que registra, analiza y comparte. Para este MVP, la información del prototipo puede mantenerse localmente en el dispositivo.</p>
          </div>
          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
            <span>Acepto los Términos de uso del prototipo.</span>
          </label>
        </section>

        <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
          <h2 className="text-base font-extrabold">Política de privacidad</h2>
          <div className="mt-3 max-h-40 overflow-y-auto rounded-2xl bg-[#faf8fd] p-4 text-xs leading-5 text-[#6d6677]">
            <p>En el MVP, Lumi usa almacenamiento local del navegador para conservar cuenta, preferencias y datos del caso. Las evidencias del prototipo permanecen en el dispositivo salvo que la usuaria decida compartirlas.</p>
            <p className="mt-2">Aceptar esta política no significa autorizar el análisis con IA. Esa decisión se configura por separado en el siguiente paso y puede modificarse después.</p>
          </div>
          <label className="mt-4 flex items-start gap-3 text-sm leading-5">
            <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
            <span>Acepto la Política de privacidad del prototipo.</span>
          </label>
        </section>

        <button onClick={continueSetup} disabled={!terms || !privacy} className="mt-6 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continuar</button>
      </div>
    </div>
  )
}
