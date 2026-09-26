import { Link } from 'react-router-dom'

const summaryCards = [
  { label: 'Señales', value: '7', accent: 'violet' },
  { label: 'Reflexiones', value: '12', accent: 'sky' },
  { label: 'Apoyo', value: '3', accent: 'emerald' },
]

const quickActions = [
  'Registrar una experiencia',
  'Revisar patrones recientes',
  'Ver recursos de apoyo',
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20 backdrop-blur">
          <div>
            <p className="text-sm text-slate-400">Panel de bienestar</p>
            <h1 className="text-2xl font-bold text-white">Lumi</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-violet-400 hover:text-white">
              Volver a inicio
            </Link>
          </div>
        </header>

        <main className="mt-8 space-y-8">
          <section className="grid gap-4 md:grid-cols-3">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-slate-950/25">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      card.accent === 'violet'
                        ? 'bg-violet-400'
                        : card.accent === 'sky'
                          ? 'bg-sky-400'
                          : 'bg-emerald-400'
                    }`}
                  />
                </div>
                <p className="mt-5 text-4xl font-black text-white">{card.value}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Resumen</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">¿Qué te está pasando?</h2>
                </div>
                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
                  En revisión
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Última nota</p>
                  <p className="mt-2 text-base leading-7 text-slate-200">
                    Has detectado cambios en la forma en que te hablan online y cómo te afectan emocionalmente. Es una señal de alerta que vale la pena acompañar con cuidado.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <p className="text-sm text-slate-400">Sugerencia</p>
                  <p className="mt-2 text-base leading-7 text-slate-200">
                    Toma un respiro, guarda evidencia y revisa tus recursos de apoyo en esta misma sesión.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Acciones rápidas</p>
              <div className="mt-6 space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={action}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:border-violet-500 hover:bg-slate-800/90"
                  >
                    <span>{action}</span>
                    <span className="text-violet-300">0{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
