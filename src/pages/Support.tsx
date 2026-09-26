import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel } from '../lib/lumiStore'

export default function Support() {
  const [prepared, setPrepared] = useState(false)
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
      <AppShell title="Tu red de apoyo">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para preparar un resumen.</p>
      </AppShell>
    )
  }

  const latestCheckin = data.checkins[0]

  return (
    <AppShell title="Tu red de apoyo">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Tú decides si compartir información y con quién. Lumi no envía nada automáticamente.
      </p>

      <section className="rounded-[26px] bg-[#f1edff] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Contacto de confianza</p>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-white/80 p-3">
          <div>
            <p className="text-sm font-extrabold text-[#3a354d]">Ana</p>
            <p className="text-xs text-[#817a88]">Hermana · contacto de demostración</p>
          </div>
          <span className="rounded-full bg-[#ece5ff] px-3 py-1.5 text-[10px] font-bold text-[#624cb1]">Confianza</span>
        </div>
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
          <div className="mt-4 rounded-2xl bg-[#fff8eb] p-3 text-xs leading-5 text-[#746b70]">
            Este resumen organiza información ingresada por la usuaria. No constituye una evaluación legal o clínica.
          </div>
          <button type="button" onClick={() => alert('Demo: aquí la usuaria elegiría cómo y con quién compartir el resumen.')} className="mt-4 w-full rounded-2xl border border-[#ddd4ef] bg-white px-4 py-3 text-sm font-bold text-[#6655b6]">Compartir resumen</button>
        </section>
      )}

      <section className="mt-6 rounded-[26px] bg-[#fff8eb] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#967744]">Rutas de apoyo</p>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[#625b6b]">
          <p>• Universidad: tutoría, bienestar universitario o canal institucional correspondiente.</p>
          <p>• Trabajo: persona de confianza, RR. HH. o canal interno disponible.</p>
          <p>• Si percibes un riesgo inmediato para tu seguridad, prioriza apoyo humano y los servicios de emergencia disponibles en tu ubicación.</p>
        </div>
      </section>
    </AppShell>
  )
}
