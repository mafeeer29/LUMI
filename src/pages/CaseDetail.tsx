import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel } from '../lib/lumiStore'

function labelSignal(signal: string) {
  return signal.replaceAll('_', ' ')
}

export default function CaseDetail() {
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

  if (!data) {
    return (
      <AppShell title="Tu caso actual">
        <p className="text-sm text-[#716a7c]">Todavía no tienes un caso activo.</p>
        <Link to="/app/nuevo-caso" className="mt-5 inline-block rounded-2xl bg-[#6755c8] px-4 py-3 text-sm font-bold text-white">Crear caso</Link>
      </AppShell>
    )
  }

  const latestCheckin = data.checkins[0]
  const hasElevatedConduct = data.conduct === 'Atención elevada'
  const hasGrowingImpact = data.impact === 'Impacto creciente'
  const latestAIInteraction = data.interactions.find((interaction) => interaction.analysis)
  const latestAnalysis = latestAIInteraction?.analysis
  const detectedConducts = latestAnalysis?.conductas.filter((item) => item.detectada) ?? []
  const detectedImpacts = latestAnalysis?.impacto.filter((item) => item.detectado) ?? []

  return (
    <AppShell title="Tu caso actual">
      <div className="rounded-[26px] bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9389a5]">{data.activeCase.context}</p>
        <h2 className="mt-1 text-lg font-extrabold text-[#332e49]">{data.activeCase.title}</h2>
        {data.activeCase.personRelation && <p className="mt-1 text-sm text-[#77707f]">{data.activeCase.personRelation}</p>}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[22px] bg-[#f2edff] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Conducta</p>
          <p className="mt-2 text-sm font-extrabold text-[#3a354d]">{data.conduct}</p>
        </div>
        <div className="rounded-[22px] bg-[#fff7e6] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#977542]">Impacto</p>
          <p className="mt-2 text-sm font-extrabold text-[#3a354d]">{data.impact}</p>
        </div>
      </div>

      {latestAnalysis && (
        <section className="mt-6 rounded-[26px] bg-[#f4f0ff] p-5 ring-1 ring-[#e5dcfb]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7665c7]">Análisis con IA</p>
              <h2 className="mt-1 text-base font-extrabold text-[#342f5d]">Señales observadas por Lumi</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#6755c8]">{latestAnalysis.riesgo.nivelAtencion}</span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#5f5868]">{latestAnalysis.resumen}</p>

          <div className="mt-4 space-y-2 text-sm leading-5 text-[#5f5868]">
            {detectedConducts.length > 0 && (
              <p><strong>Conductas detectadas:</strong> {detectedConducts.map((item) => labelSignal(item.tipo)).join(', ')}.</p>
            )}
            {latestAnalysis.recurrencia.detectada && <p><strong>Recurrencia:</strong> se encontraron indicios explícitos de repetición o persistencia.</p>}
            {latestAnalysis.escalamiento.detectado && <p><strong>Escalamiento:</strong> {latestAnalysis.escalamiento.patron ?? 'se observaron cambios en frecuencia, presión o severidad.'}</p>}
            {detectedImpacts.length > 0 && (
              <p><strong>Impacto reportado:</strong> {detectedImpacts.map((item) => labelSignal(item.tipo)).join(', ')}.</p>
            )}
          </div>

          <div className="mt-4 rounded-2xl bg-white/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Siguiente paso sugerido</p>
            <p className="mt-2 text-sm leading-5 text-[#4f485d]">{latestAnalysis.riesgo.accionRecomendada}</p>
          </div>

          <p className="mt-3 text-[10px] leading-4 text-[#8f879a]">{latestAnalysis.disclaimer}</p>
        </section>
      )}

      <section className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9389a5]">Qué está observando Lumi</p>
        <div className="mt-3 space-y-2 rounded-[24px] bg-white p-4 text-sm leading-6 text-[#5f5868]">
          <p>• {data.interactions.length} interacción(es) registrada(s) en este caso.</p>
          {hasElevatedConduct && <p>• Hay señales de persistencia o cambio de canal que elevan la atención del patrón de contacto.</p>}
          {latestCheckin && latestCheckin.changes.length > 0 && <p>• En tu último check-in registraste cambios en: {latestCheckin.changes.join(', ')}.</p>}
          {hasGrowingImpact && <p>• El impacto registrado está creciendo, por lo que conviene priorizar apoyo y organización de la información.</p>}
          {!latestAnalysis && <p>• Registra una interacción con descripción para que Lumi pueda analizar señales semánticas con IA.</p>}
        </div>
      </section>

      <section className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9389a5]">Siguientes pasos sugeridos</p>
        <div className="mt-3 space-y-3">
          <div className="rounded-2xl bg-[#f7f4ff] p-4 text-sm text-[#5e566d]">Conserva información relevante y registra nuevas interacciones si lo consideras útil.</div>
          <div className="rounded-2xl bg-[#fff8eb] p-4 text-sm text-[#5e566d]">Revisa si la situación está modificando tus rutinas, estudios, trabajo o sensación de seguridad.</div>
          <div className="rounded-2xl bg-[#f1edff] p-4 text-sm text-[#5e566d]">Puedes preparar un resumen para una persona de confianza o una ruta de apoyo. Tú decides si compartirlo.</div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link to="/app/registrar" className="rounded-2xl bg-[#6755c8] px-4 py-3 text-center text-xs font-bold text-white">Registrar interacción</Link>
        <Link to="/app/checkin" className="rounded-2xl bg-[#fff0c8] px-4 py-3 text-center text-xs font-bold text-[#7d5d20]">Hacer check-in</Link>
      </div>

      <Link to="/app/bitacora" className="mt-3 block rounded-2xl border border-[#e8e0f2] bg-white px-4 py-3 text-center text-xs font-bold text-[#6655b6]">Ver bitácora completa</Link>

      <p className="mt-6 text-[11px] leading-5 text-[#9992a2]">
        Lumi organiza señales y cambios registrados por ti. No determina delitos, culpabilidad ni realiza diagnósticos clínicos.
      </p>
    </AppShell>
  )
}
