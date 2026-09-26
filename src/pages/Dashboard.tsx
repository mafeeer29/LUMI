import mascot from '../assets/lumi-mascot.png'

const timeline = [
  {
    title: '12 mensajes registrados',
    detail: 'Contacto reiterado durante la tarde',
    time: 'Hoy · 18:40',
    tone: 'violet',
  },
  {
    title: '8 llamadas sin respuesta',
    detail: 'Aumento de los intentos de contacto',
    time: 'Ayer · 20:15',
    tone: 'amber',
  },
  {
    title: 'Contacto desde otra cuenta',
    detail: 'Cambio de canal de contacto',
    time: '22 sep · 14:10',
    tone: 'rose',
  },
]

const impactOptions = ['Evito ciertos lugares', 'Afecta mis estudios', 'Cambié mi rutina']

const navItems = [
  { label: 'Inicio', icon: 'home', active: true },
  { label: 'Bitácora', icon: 'timeline', active: false },
  { label: 'Apoyo', icon: 'support', active: false },
  { label: 'Perfil', icon: 'profile', active: false },
]

function NavIcon({ type }: { type: string }) {
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3.5 10.8 12 3.8l8.5 7v8.5a1 1 0 0 1-1 1H15v-5.4H9v5.4H4.5a1 1 0 0 1-1-1v-8.5Z" />
      </svg>
    )
  }

  if (type === 'timeline') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 4v16M7 7h9.5M7 12h6.5M7 17h9.5" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (type === 'support') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20.2S4.8 16 4.8 10.3A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.2 2.7C19.2 16 12 20.2 12 20.2Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.8 20c.6-3.5 2.6-5.4 6.2-5.4s5.6 1.9 6.2 5.4" />
    </svg>
  )
}

function TimelineIcon({ tone }: { tone: string }) {
  if (tone === 'amber') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7.4 4.5h2l1.2 3.2-1.6 1.4a13 13 0 0 0 5.9 5.9l1.4-1.6 3.2 1.2v2c0 1.1-.9 2-2 2C10.9 18.6 5.4 13.1 5.4 6.5c0-1.1.9-2 2-2Z" />
      </svg>
    )
  }

  if (tone === 'rose') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="2.5" />
        <path d="M4.5 17c.4-2.7 2-4.2 4.5-4.2s4.1 1.5 4.5 4.2M16.5 7v5M14 9.5h5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 4.5h8l3 3v12H7z" />
      <path d="M15 4.5v3h3M9.5 11h6M9.5 14h6M9.5 17h4" />
    </svg>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fbf9ff] text-[#26324b]">
      <div className="mx-auto min-h-screen w-full max-w-[520px] pb-28">
        <section className="relative overflow-hidden bg-[linear-gradient(145deg,#efe8ff_0%,#e9e2ff_48%,#f8f4ff_100%)] px-5 pb-6 pt-3 shadow-[0_16px_40px_-30px_rgba(85,65,130,0.45)]">
          <div className="absolute -left-12 top-24 h-28 w-28 rounded-full border border-white/45" />
          <div className="absolute -right-16 -top-12 h-40 w-40 rounded-full bg-white/28" />
          <div className="absolute right-7 top-[92px] text-[11px] text-[#d8b45a]">✦</div>

          <header className="relative z-10 flex items-center justify-between">
            <p className="text-[20px] font-extrabold tracking-[-0.045em] text-[#4b4381]">Lumi</p>

            <button
              type="button"
              aria-label="Abrir perfil"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/45 text-[#6d6487] transition hover:bg-white/65"
            >
              <NavIcon type="profile" />
            </button>
          </header>

          <div className="relative z-10 mt-2 grid grid-cols-[1.02fr_0.98fr] items-end gap-0">
            <div className="pb-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#776c98]">
                Hola, Lucía
              </p>

              <h1 className="mt-2 text-[30px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#342f5d]">
                Este es tu espacio.
              </h1>

              <p className="mt-2 max-w-[220px] text-[13px] leading-[1.5] text-[#6f6685]">
                Tú decides qué registrar, qué compartir y qué paso tomar después.
              </p>
            </div>

            <div className="relative flex min-h-[150px] items-end justify-start pl-1">
              <div className="absolute bottom-3 right-3 h-24 w-24 rounded-full bg-white/30 blur-[1px]" />
              <div className="absolute bottom-6 right-6 h-16 w-16 rounded-full border border-white/55" />

              <img
                src={mascot}
                alt="Lumi te acompaña"
                className="relative z-10 -mb-1 -ml-2 h-[12rem] w-auto object-contain drop-shadow-[0_14px_20px_rgba(76,61,126,0.16)]"
              />
            </div>
          </div>
        </section>

        <main className="space-y-6 px-5 pt-6">
          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a90ab]">Caso activo</p>
                <h2 className="mt-1 text-[19px] font-extrabold tracking-[-0.03em] text-[#312b49]">Tu caso actual</h2>
              </div>
              <button type="button" className="text-[11px] font-semibold text-[#6a55be]">Ver detalle</button>
            </div>

            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_16px_36px_-30px_rgba(70,52,115,0.42)] ring-1 ring-[#f0ebf6]">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0ebff] text-[#6756b8]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M7 5.5h10M7 10h10M7 14.5h6M5 3.5h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-bold leading-5 text-[#313348]">Situación con compañero de universidad</h3>
                      <span className="shrink-0 rounded-full bg-[#fff2cb] px-2.5 py-1 text-[9px] font-bold text-[#856516]">Atención</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#96909e]">Actualizado hoy · 19:20</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className="rounded-[20px] bg-[#f7f4ff] p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#8d78df]" />
                      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#877ca0]">Conducta</p>
                    </div>
                    <p className="mt-2 text-[13px] font-bold leading-4 text-[#3a354d]">Atención elevada</p>
                  </div>

                  <div className="rounded-[20px] bg-[#fff8eb] p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#e1ae4e]" />
                      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#947746]">Impacto</p>
                    </div>
                    <p className="mt-2 text-[13px] font-bold leading-4 text-[#3a354d]">Impacto creciente</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-extrabold tracking-[-0.03em] text-[#312b49]">Tu línea de tiempo</h2>
              <button type="button" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6a55be]">
                Ver todo <span aria-hidden="true">›</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute bottom-5 left-[6px] top-5 w-px bg-[#ded5ef]" />

              <div className="space-y-4">
                {timeline.map((event) => {
                  const dotClass =
                    event.tone === 'violet'
                      ? 'bg-[#9783e8]'
                      : event.tone === 'amber'
                        ? 'bg-[#ebb953]'
                        : 'bg-[#df8b91]'

                  const iconClass =
                    event.tone === 'violet'
                      ? 'bg-[#eee9ff] text-[#7b65cf]'
                      : event.tone === 'amber'
                        ? 'bg-[#fff3da] text-[#c98d28]'
                        : 'bg-[#fde9ea] text-[#c96f77]'

                  return (
                    <div key={event.title} className="relative grid grid-cols-[14px_38px_1fr_auto] items-center gap-3">
                      <span className={`relative z-10 h-3.5 w-3.5 rounded-full ring-[5px] ring-[#fbf9ff] ${dotClass}`} />

                      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClass}`}>
                        <TimelineIcon tone={event.tone} />
                      </div>

                      <div className="min-w-0 py-1">
                        <p className="text-[13px] font-bold leading-4 text-[#393449]">{event.title}</p>
                        <p className="mt-1 text-[11px] leading-4 text-[#7c7685]">{event.detail}</p>
                      </div>

                      <div className="self-start pt-1 text-right">
                        <p className="whitespace-nowrap text-[9px] font-medium leading-4 text-[#a09aa7]">{event.time.split(' · ')[0]}</p>
                        <p className="whitespace-nowrap text-[9px] font-medium leading-4 text-[#b0aab5]">{event.time.split(' · ')[1]}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-between rounded-full bg-[linear-gradient(90deg,#7563d6_0%,#5f50be_100%)] px-4 py-3 text-[13px] font-bold text-white shadow-[0_14px_26px_-18px_rgba(95,80,190,0.75)] transition hover:brightness-[0.98]"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[18px] font-medium leading-none text-[#6653c7]">+</span>
                  Registrar interacción
                </span>
                <span aria-hidden="true" className="text-lg font-light">›</span>
              </button>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] bg-[#fff8eb] p-[18px] ring-1 ring-[#f4ead7]">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/45" />
            <div className="relative z-10 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fff0cb] text-[#9a7422]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3v2M12 19v2M4.2 7.5 6 8.6M18 15.4l1.8 1.1M4.2 16.5 6 15.4M18 8.6l1.8-1.1" />
                  <circle cx="12" cy="12" r="4.2" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a8056]">Check-in de impacto</p>
                <h2 className="mt-1 text-[16px] font-extrabold leading-5 text-[#3d3748]">¿Qué está empezando a cambiar en tu vida?</h2>
                <p className="mt-1 text-[11px] leading-4 text-[#746e77]">Puedes marcar solo lo que quieras compartir.</p>
              </div>
            </div>

            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {impactOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-[#6e6677] ring-1 ring-[#eee2cf] transition hover:bg-white"
                >
                  {option}
                </button>
              ))}
            </div>

            <button type="button" className="relative z-10 mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#785d20]">
              Hacer check-in <span aria-hidden="true">→</span>
            </button>
          </section>

          <section className="rounded-[28px] bg-[#f1edff] p-[18px]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#82779d]">Tu red de apoyo</p>
                <h2 className="mt-1 text-[16px] font-extrabold leading-5 text-[#39334d]">Tú decides cuándo compartir.</h2>
                <p className="mt-1.5 text-[11px] leading-4 text-[#6c657a]">
                  Prepara un resumen de tu caso y compártelo con alguien de confianza solo si quieres hacerlo.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#6655b6] shadow-sm">
                <NavIcon type="support" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[20px] bg-white/80 px-3.5 py-3">
              <div>
                <p className="text-[12px] font-bold text-[#39334d]">Ana</p>
                <p className="text-[10px] text-[#8a8393]">Contacto de confianza</p>
              </div>

              <button type="button" className="rounded-full bg-[#ece5ff] px-3 py-1.5 text-[10px] font-bold text-[#624cb1]">
                Ver opciones
              </button>
            </div>
          </section>

          <button
            type="button"
            className="w-full rounded-[20px] border border-dashed border-[#d8cdef] bg-white/65 px-4 py-3 text-[12px] font-bold text-[#675c7e] transition hover:bg-white"
          >
            + Crear nuevo caso
          </button>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] border-t border-[#eee8f5] bg-[#fffdfd]/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-[9px] font-semibold transition ${item.active ? 'text-[#654fc0]' : 'text-[#9a94a6]'}`}
              >
                <span className={`flex h-7 w-10 items-center justify-center rounded-full ${item.active ? 'bg-[#eee8ff]' : ''}`}>
                  <NavIcon type={item.icon} />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
