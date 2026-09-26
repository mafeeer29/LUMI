import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel } from '../lib/lumiStore'

export default function DigitalDossier() {
  const data = useMemo(() => {
    const activeCase = getActiveCase()
    if (!activeCase) return null
    const interactions = getCaseInteractions(activeCase.id)
    const checkins = getCaseCheckins(activeCase.id)
    return {
      activeCase,
      interactions,
      checkins,
      conduct: getConductLevel(activeCase.id),
      impact: getImpactLevel(activeCase.id),
    }
  }, [])

  if (!data) {
    return (
      <AppShell title="Expediente digital">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para generar un expediente.</p>
      </AppShell>
    )
  }

  const latestAnalysis = data.interactions.find((item) => item.analysis)?.analysis
  const latestCheckin = data.checkins[0]
  const evidenceCount = data.interactions.reduce((total, item) => total + (item.attachments?.length ?? 0), 0)

  return (
    <AppShell title="Expediente digital">
      <div className="print:hidden">
        <p className="-mt-2 mb-5 text-sm leading-6 text-[#716a7c]">
          Reúne la información que registraste para revisarla o compartirla. Tú decides con quién y cuándo.
        </p>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button onClick={() => window.print()} className="rounded-2xl bg-[#6755c8] px-4 py-3 text-xs font-bold text-white">Imprimir / Guardar PDF</button>
          <Link to="/app/apoyo" className="rounded-2xl border border-[#ddd4ef] bg-white px-4 py-3 text-center text-xs font-bold text-[#6655b6]">Preparar para compartir</Link>
        </div>
      </div>

      <article className="space-y-5 bg-white print:p-0">
        <header className="rounded-[26px] bg-[#f1edff] p-5 print:rounded-none print:bg-white print:p-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7665c7]">LUMI · Expediente digital</p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#312b49]">{data.activeCase.title}</h1>
          <p className="mt-2 text-sm text-[#716a7c]">Contexto: {data.activeCase.context} · Relación: {data.activeCase.personRelation || 'No indicada'}</p>
          <p className="mt-1 text-xs text-[#938b9d]">Creado: {new Date(data.activeCase.createdAt).toLocaleDateString('es-PE')}</p>
        </header>

        <section className="rounded-[24px] border border-[#eee8f5] p-5">
          <h2 className="text-sm font-extrabold text-[#3a354d]">1. Contexto del caso</h2>
          <p className="mt-3 text-sm leading-6 text-[#625b6b]">{data.activeCase.notes || 'Sin notas adicionales registradas.'}</p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-[22px] bg-[#f2edff] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#81769d]">Conducta</p>
            <p className="mt-2 text-sm font-extrabold text-[#3a354d]">{data.conduct}</p>
          </div>
          <div className="rounded-[22px] bg-[#fff7e6] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#977542]">Impacto</p>
            <p className="mt-2 text-sm font-extrabold text-[#3a354d]">{data.impact}</p>
          </div>
        </section>

        {latestAnalysis && (
          <section className="rounded-[24px] border border-[#eee8f5] p-5">
            <h2 className="text-sm font-extrabold text-[#3a354d]">2. Señales organizadas por Lumi</h2>
            <p className="mt-3 text-sm leading-6 text-[#625b6b]">{latestAnalysis.resumen}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {latestAnalysis.conductas.filter((item) => item.detectada).map((item) => (
                <span key={item.tipo} className="rounded-full bg-[#f1edff] px-3 py-1 text-[11px] font-bold text-[#6655b6]">{item.tipo.replaceAll('_', ' ')}</span>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-[24px] border border-[#eee8f5] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-[#3a354d]">3. Bitácora cronológica</h2>
            <span className="text-[10px] text-[#938b9d]">{data.interactions.length} registro(s) · {evidenceCount} evidencia(s)</span>
          </div>
          <div className="mt-4 space-y-4">
            {data.interactions.length === 0 ? <p className="text-sm text-[#7c7585]">Sin interacciones registradas.</p> : data.interactions.map((item) => (
              <div key={item.id} className="border-l-2 border-[#b9abe7] pl-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#81769d]">{new Date(item.occurredAt).toLocaleString('es-PE')}</p>
                <p className="mt-1 text-sm font-bold text-[#4a4456]">{item.description}</p>
                <p className="mt-1 text-xs text-[#7c7585]">{item.channel}{item.attempts > 1 ? ` · ${item.attempts} intentos` : ''}</p>
                {(item.attachments?.length ?? 0) > 0 && <p className="mt-1 text-xs text-[#6655b6]">Evidencia adjunta: {item.attachments?.map((a) => a.name).join(', ')}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-[#eee8f5] p-5">
          <h2 className="text-sm font-extrabold text-[#3a354d]">4. Impacto registrado</h2>
          {latestCheckin ? (
            <>
              <p className="mt-3 text-sm leading-6 text-[#625b6b]">{latestCheckin.changes.length ? latestCheckin.changes.join(' · ') : 'Sin cambios seleccionados.'}</p>
              {latestCheckin.note && <p className="mt-2 rounded-2xl bg-[#faf8fd] p-3 text-xs leading-5 text-[#6f6877]">“{latestCheckin.note}”</p>}
            </>
          ) : <p className="mt-3 text-sm text-[#7c7585]">Aún no hay check-ins registrados.</p>}
        </section>

        <section className="rounded-[24px] bg-[#fff8eb] p-5 text-xs leading-5 text-[#746b70]">
          <strong>Nota de Lumi:</strong> este expediente organiza información registrada por la usuaria y evidencia asociada. No constituye por sí solo una evaluación legal, evidencia certificada ni determinación de culpabilidad.
        </section>
      </article>
    </AppShell>
  )
}
