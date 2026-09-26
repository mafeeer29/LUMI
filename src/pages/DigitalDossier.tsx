import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import EvidencePreview from '../components/EvidencePreview'
import { getActiveCase, getCaseCheckins, getCaseInteractions, getConductLevel, getImpactLevel } from '../lib/lumiStore'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatMonth(value: string) {
  return new Date(value).toLocaleDateString('es-PE', { month: 'short' }).toUpperCase()
}

export default function DigitalDossier() {
  const data = useMemo(() => {
    const activeCase = getActiveCase()
    if (!activeCase) return null
    const interactions = getCaseInteractions(activeCase.id).slice().sort((a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime())
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

  const latestAnalysis = [...data.interactions].reverse().find((item) => item.analysis)?.analysis
  const latestCheckin = data.checkins[0]
  const evidenceCount = data.interactions.reduce((total, item) => total + (item.attachments?.length ?? 0), 0)
  const firstPageEntries = data.interactions.slice(0, 4)
  const remainingEntries = data.interactions.slice(4)
  const detectedSignals = latestAnalysis?.conductas.filter((item) => item.detectada) ?? []
  const firstDate = data.interactions[0]?.occurredAt ?? data.activeCase.createdAt
  const lastDate = data.interactions[data.interactions.length - 1]?.occurredAt ?? data.activeCase.updatedAt

  return (
    <AppShell title="Expediente digital">
      <div className="print:hidden">
        <p className="-mt-2 mb-5 text-sm leading-6 text-[#716a7c]">
          Vista final del expediente. Mientras más registros y evidencias agregues, más completa será la exportación.
        </p>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button onClick={() => window.print()} className="rounded-2xl bg-[#6755c8] px-4 py-3 text-xs font-bold text-white">Guardar como PDF</button>
          <Link to="/app/apoyo" className="rounded-2xl border border-[#ddd4ef] bg-white px-4 py-3 text-center text-xs font-bold text-[#6655b6]">Preparar para compartir</Link>
        </div>
      </div>

      <article className="space-y-6 print:space-y-0 print:bg-white print:text-black">
        {/* PÁGINA 1 */}
        <section className="mx-auto min-h-[1120px] max-w-[820px] bg-white p-8 shadow-sm print:min-h-0 print:max-w-none print:break-after-page print:p-0 print:shadow-none">
          <div className="mb-8 flex items-center justify-between border-b border-[#e6e0f0] pb-4 text-[10px] uppercase tracking-[0.16em] text-[#6f63a8]">
            <span className="font-extrabold">LUMI <span className="font-normal text-[#aaa2b6]">| EXPEDIENTE DIGITAL</span></span>
            <span className="normal-case tracking-normal text-[#aaa2b6]">Exportación del caso</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-[#29263b]">Expediente digital del caso</h1>
          <p className="mt-2 text-sm text-[#726b7c]">{data.activeCase.title}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold text-[#6755c8]">
            <span className="rounded-full bg-[#eee8ff] px-3 py-2">ID: {data.activeCase.id.slice(-10).toUpperCase()}</span>
            <span className="rounded-full bg-[#eee8ff] px-3 py-2">Periodo: {formatDate(firstDate)} – {formatDate(lastDate)}</span>
            <span className="rounded-full bg-[#eee8ff] px-3 py-2">Contexto: {data.activeCase.context}</span>
          </div>

          <section className="mt-7 rounded-[22px] border border-[#ddd6eb] bg-[#fcfbff] p-5">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">1. Contexto</h2>
            <p className="mt-3 text-sm leading-6 text-[#514b5e]">{data.activeCase.notes || `Caso registrado en contexto de ${data.activeCase.context}. Relación indicada: ${data.activeCase.personRelation || 'no especificada'}.`}</p>
          </section>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-[22px] bg-[#eee8ff] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b5baa]">Conducta · Lumi</p>
              <p className="mt-3 text-xl font-extrabold text-[#332d50]">{data.conduct.toUpperCase()}</p>
              <div className="mt-3 space-y-1 text-xs leading-5 text-[#5b5367]">
                {detectedSignals.length > 0 ? detectedSignals.slice(0, 4).map((item) => <p key={item.tipo}>• {item.tipo.replaceAll('_', ' ')}</p>) : <p>• Sin señales semánticas suficientes registradas.</p>}
                {latestAnalysis?.recurrencia.detectada && <p>• Recurrencia observada en el relato.</p>}
                {latestAnalysis?.escalamiento.detectado && <p>• Posible escalamiento observado.</p>}
              </div>
            </div>

            <div className="rounded-[22px] bg-[#f7f5fb] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b5baa]">Impacto registrado</p>
              <p className="mt-3 text-xl font-extrabold text-[#332d50]">{data.impact.toUpperCase()}</p>
              <div className="mt-3 space-y-1 text-xs leading-5 text-[#5b5367]">
                {latestCheckin?.changes?.length ? latestCheckin.changes.slice(0, 4).map((item) => <p key={item}>• {item}</p>) : <p>• Aún no hay cambios declarados en check-in.</p>}
              </div>
            </div>
          </div>

          <section className="mt-6 rounded-[22px] border border-[#e1dbea] p-5">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">2. Señales relevantes · ¿Por qué?</h2>
            <div className="mt-3 space-y-2 text-xs leading-5 text-[#56505f]">
              {detectedSignals.length > 0 ? detectedSignals.slice(0, 5).map((item) => (
                <p key={item.tipo}><strong>{item.tipo.replaceAll('_', ' ').toUpperCase()}:</strong> {item.evidencia || 'señal identificada en el texto registrado.'}</p>
              )) : <p>No existen suficientes señales semánticas analizadas todavía.</p>}
            </div>
          </section>

          <section className="mt-6 rounded-[22px] bg-[#faf9fd] p-5">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">3. Evolución del caso</h2>
            <div className="mt-6 grid grid-cols-4 gap-3 border-t-2 border-[#ab98e6] pt-4 text-center">
              {data.interactions.slice(0, 4).map((item) => (
                <div key={item.id}>
                  <p className="text-[10px] font-extrabold text-[#6755c8]">{formatMonth(item.occurredAt)}</p>
                  <p className="mt-2 text-[11px] font-bold text-[#4d4658]">{item.channel}</p>
                  <p className="mt-1 text-[9px] leading-4 text-[#85808b]">{item.description.slice(0, 65)}{item.description.length > 65 ? '…' : ''}</p>
                </div>
              ))}
              {data.interactions.length === 0 && <p className="col-span-4 text-xs text-[#85808b]">Aún no hay interacciones para mostrar una evolución temporal.</p>}
            </div>
          </section>

          <div className="mt-6 rounded-xl bg-[#fffaf0] px-4 py-3 text-[10px] leading-4 text-[#756f78]">
            <strong>NOTA DE LUMI:</strong> Este expediente organiza información registrada y evidencia asociada. No constituye por sí solo una evaluación legal, una evidencia certificada ni una determinación de culpabilidad.
          </div>
          <p className="mt-8 text-right text-[9px] text-[#aaa4b0]">Página 1/3 · by LUMI</p>
        </section>

        {/* PÁGINA 2 */}
        <section className="mx-auto min-h-[1120px] max-w-[820px] bg-white p-8 shadow-sm print:min-h-0 print:max-w-none print:break-after-page print:p-0 print:shadow-none">
          <div className="mb-8 flex items-center justify-between border-b border-[#e6e0f0] pb-4 text-[10px] uppercase tracking-[0.16em] text-[#6f63a8]">
            <span className="font-extrabold">LUMI <span className="font-normal text-[#aaa2b6]">| BITÁCORA CRONOLÓGICA</span></span>
            <span className="normal-case tracking-normal text-[#aaa2b6]">Expediente digital</span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#29263b]">Bitácora cronológica</h2>
          <p className="mt-2 text-sm text-[#726b7c]">Cada registro conserva fecha, descripción y evidencia asociada cuando existe.</p>

          <div className="mt-7 grid grid-cols-2 gap-4">
            {firstPageEntries.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[20px] border border-[#ddd6eb] bg-white p-4 break-inside-avoid">
                {(item.attachments?.length ?? 0) > 0 && (
                  <div className="mb-4 grid gap-2">
                    {item.attachments?.slice(0, 1).map((attachment) => <EvidencePreview key={attachment.id} attachment={attachment} />)}
                  </div>
                )}
                <p className="text-[10px] font-extrabold uppercase text-[#6755c8]">{formatDate(item.occurredAt)}</p>
                <h3 className="mt-2 text-sm font-extrabold text-[#393447]">{item.description}</h3>
                <p className="mt-2 text-xs text-[#746e7c]">{item.channel}{item.attempts > 1 ? ` · ${item.attempts} intentos` : ''}</p>
                {item.analysis?.resumen && <p className="mt-3 text-[10px] leading-4 text-[#898390]"><strong>Relevancia:</strong> {item.analysis.resumen}</p>}
              </article>
            ))}
            {firstPageEntries.length === 0 && <p className="col-span-2 text-sm text-[#7c7585]">Aún no existen registros para esta bitácora.</p>}
          </div>

          <p className="mt-8 text-right text-[9px] text-[#aaa4b0]">Página 2/3 · by LUMI</p>
        </section>

        {/* PÁGINA 3 */}
        <section className="mx-auto min-h-[1120px] max-w-[820px] bg-white p-8 shadow-sm print:min-h-0 print:max-w-none print:p-0 print:shadow-none">
          <div className="mb-8 flex items-center justify-between border-b border-[#e6e0f0] pb-4 text-[10px] uppercase tracking-[0.16em] text-[#6f63a8]">
            <span className="font-extrabold">LUMI <span className="font-normal text-[#aaa2b6]">| BITÁCORA + RESUMEN</span></span>
            <span className="normal-case tracking-normal text-[#aaa2b6]">Expediente digital</span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#29263b]">Continuidad, resumen y control</h2>
          <p className="mt-2 text-sm text-[#726b7c]">Los registros restantes completan la secuencia y permiten revisar el caso como un conjunto.</p>

          {remainingEntries.length > 0 && (
            <div className="mt-7 grid grid-cols-2 gap-4">
              {remainingEntries.slice(0, 4).map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[20px] border border-[#ddd6eb] bg-white p-4 break-inside-avoid">
                  {(item.attachments?.length ?? 0) > 0 && <div className="mb-3">{item.attachments?.slice(0, 1).map((attachment) => <EvidencePreview key={attachment.id} attachment={attachment} />)}</div>}
                  <p className="text-[10px] font-extrabold uppercase text-[#6755c8]">{formatDate(item.occurredAt)}</p>
                  <h3 className="mt-2 text-sm font-extrabold text-[#393447]">{item.description}</h3>
                </article>
              ))}
            </div>
          )}

          <section className="mt-7 rounded-[22px] bg-[#eee8ff] p-5">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">4. Resumen del expediente</h2>
            <p className="mt-3 text-sm leading-6 text-[#514b5e]">{latestAnalysis?.resumen || `El caso contiene ${data.interactions.length} interacción(es), ${evidenceCount} evidencia(s) adjunta(s) y ${data.checkins.length} check-in(s) registrados.`}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div><p className="text-lg font-extrabold text-[#4b3e8f]">{data.interactions.length}</p><p className="text-[10px] text-[#716a7c]">interacciones</p></div>
              <div><p className="text-lg font-extrabold text-[#4b3e8f]">{evidenceCount}</p><p className="text-[10px] text-[#716a7c]">evidencias</p></div>
              <div><p className="text-lg font-extrabold text-[#4b3e8f]">{data.checkins.length}</p><p className="text-[10px] text-[#716a7c]">check-ins</p></div>
            </div>
          </section>

          <section className="mt-6 rounded-[22px] border border-[#ddd6eb] p-5">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">5. Control de la usuaria</h2>
            <p className="mt-3 text-xs leading-5 text-[#5f5966]">La usuaria decide qué información guardar, qué evidencia adjuntar y qué parte del expediente compartir. LUMI no envía información automáticamente.</p>
          </section>

          <section className="mt-6 rounded-[22px] bg-[#faf9fd] p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#5f50a5]">Opciones de apoyo</p>
            <p className="mt-2 text-xs leading-5 text-[#5f5966]">Conservar registros y fechas · revisar privacidad y bloqueos · acudir a un canal institucional o profesional · elegir una persona de confianza.</p>
          </section>

          <div className="mt-8 rounded-xl bg-[#fffaf0] px-4 py-3 text-[10px] leading-4 text-[#756f78]">Documento generado por LUMI para organizar información del caso. No sustituye orientación profesional o legal.</div>
          <p className="mt-8 text-right text-[9px] text-[#aaa4b0]">Página 3/3 · by LUMI</p>
        </section>
      </article>
    </AppShell>
  )
}
