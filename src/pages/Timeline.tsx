import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { getActiveCase, getCaseCheckins, getCaseInteractions } from '../lib/lumiStore'

export default function Timeline() {
  const entries = useMemo(() => {
    const activeCase = getActiveCase()
    if (!activeCase) return { activeCase: null, entries: [] as Array<{ id: string; title: string; detail: string; date: string; kind: string }> }

    const interactions = getCaseInteractions(activeCase.id).map((item) => ({
      id: item.id,
      title: item.description,
      detail: `${item.channel}${item.attempts > 1 ? ` · ${item.attempts} intentos` : ''}`,
      date: item.occurredAt,
      kind: 'Interacción',
    }))

    const checkins = getCaseCheckins(activeCase.id).map((item) => ({
      id: item.id,
      title: 'Check-in de impacto',
      detail: item.changes.length ? item.changes.join(' · ') : 'Sin cambios seleccionados',
      date: item.createdAt,
      kind: 'Impacto',
    }))

    return {
      activeCase,
      entries: [...interactions, ...checkins].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }
  }, [])

  return (
    <AppShell title="Tu bitácora">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Registro cronológico de la información que tú decidiste guardar. No equivale por sí solo a evidencia legal certificada.
      </p>

      {!entries.activeCase ? (
        <p className="text-sm text-[#716a7c]">Todavía no tienes un caso activo.</p>
      ) : entries.entries.length === 0 ? (
        <div className="rounded-2xl bg-white p-4 text-sm text-[#716a7c]">Aún no hay registros en este caso.</div>
      ) : (
        <div className="relative space-y-4 pl-5 before:absolute before:bottom-3 before:left-[6px] before:top-3 before:w-px before:bg-[#ded5ef]">
          {entries.entries.map((entry) => (
            <article key={`${entry.kind}-${entry.id}`} className="relative rounded-[22px] bg-white p-4 shadow-sm">
              <span className="absolute -left-[19px] top-5 h-3 w-3 rounded-full bg-[#8d78df] ring-4 ring-[#fbf9ff]" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9187a6]">{entry.kind}</p>
                  <h2 className="mt-1 text-sm font-extrabold text-[#383348]">{entry.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#7c7685]">{entry.detail}</p>
                </div>
                <time className="shrink-0 text-right text-[9px] leading-4 text-[#a09aa7]">
                  {new Date(entry.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}<br />
                  {new Date(entry.date).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link to="/app/registrar" className="mt-6 block w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-center text-sm font-bold text-white">+ Registrar interacción</Link>
    </AppShell>
  )
}
