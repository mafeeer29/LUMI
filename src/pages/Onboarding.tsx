import { useNavigate } from 'react-router-dom'
import { completeOnboarding } from '../lib/accountStore'

const steps = [
  ['1', 'Registra lo que ocurre', 'Guarda interacciones y evidencias importantes sin tener que contarlo todo de una vez.'],
  ['2', 'Observa cambios', 'Lumi separa señales de conducta e impacto en tu rutina, estudios, trabajo o seguridad.'],
  ['3', 'Tú mantienes el control', 'Revisa recomendaciones y decide qué guardar, analizar o compartir con alguien de confianza.'],
]

export default function Onboarding() {
  const navigate = useNavigate()

  function finish() {
    completeOnboarding()
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[520px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Paso 3 de 3</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Tu espacio, a tu ritmo</h1>
        <p className="mt-3 text-sm leading-6 text-[#716a7c]">Lumi te ayuda a organizar señales e impacto para que puedas decidir tus siguientes pasos con más contexto.</p>

        <div className="mt-7 space-y-3">
          {steps.map(([number, title, description]) => (
            <div key={number} className="flex gap-4 rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eee8ff] text-sm font-extrabold text-[#6755c8]">{number}</span>
              <div>
                <h2 className="text-sm font-extrabold">{title}</h2>
                <p className="mt-1.5 text-xs leading-5 text-[#716a7c]">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[#f1edff] p-4 text-xs leading-5 text-[#665f76]">
          Lumi no determina delitos ni diagnostica condiciones. Sus estados y recomendaciones buscan ser explicables y mantenerte en control.
        </div>

        <button onClick={finish} className="mt-6 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Entrar a Lumi</button>
      </div>
    </div>
  )
}
