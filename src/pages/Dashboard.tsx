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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fbf9ff] text-[#26324b]">
      <div className="mx-auto min-h-screen w-full max-w-[520px] pb-28">
        <section className="relative overflow-hidden rounded-b-[34px] bg-[linear-gradient(145deg,#efe8ff_0%,#e9e2ff_48%,#f8f4ff_100%)] px-5 pb-5 pt-5 shadow-[0_16px_40px_-30px_rgba(85,65,130,0.45)]">
          <div className="absolute -left-10 top-16 h-28 w-28 rounded-full border border-white/50" />
          <div className="absolute left-[42%] top-10 h-20 w-20 rounded-full border border-white/50" />
          <div className="absolute -right-14 -top-10 h-40 w-40 rounded-full bg-white/35 blur-[1px]" />
          <div className="absolute right-10 top-12 text-[#d5ad4a]">✦</div>
          <div className="absolute right-3 top-24 text-[10px] text-[#e0bc62]">✦</div>
          <div className="absolute left-[48%] top-[72%] text-[9px] text-[#d8b45a]">✦</div>

          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl bg-white/65 ring-1 ring-white/80 backdrop-blur-sm">
                <img src={mascot} alt="Mascota de Lumi" className="h-8 w-auto object-contain" />
              </div>
              <div>
                <p className="text-[18px] font-extrabold tracking-[-0.04em] text-[#4b4381]">Lumi</p>
                <p className="-mt-0.5 text-[10px] font-medium text-[#7f7698]">Tu espacio seguro</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Abrir perfil"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/65 text-[#665b85] ring-1 ring-white/80 backdrop-blur-sm"
            >
              <NavIcon type="profile" />
            </button>
          </header>

          <div className="relative z-10 mt-6 grid grid-cols-[1.05fr_0.95fr] items-end gap-2">
            <div className="pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#776c98]">Hola, Lucía</p>
              <h1 className="mt-2 text-[27px] font-extrabold leading-[1.03] tracking-[-0.045em] text-[#342f5d]">
                Este es tu espacio.
              </h1>
              <p className="mt-2 max-w-[230px] text-[12px] leading-[1.45] text-[#6f6685]">
                Tú decides qué registrar, qué compartir y qué paso tomar después.
              </p>
            </div>

            <div className="relative flex min-h-[150px] items-end justify-end">
              <div className="absolute bottom-2 right-0 h-28 w-28 rounded-full bg-white/35 blur-[1px]" />
              <div className="absolute bottom-4 right-2 h-20 w-20 rounded-full border border-white/60" />
              <img
                src={mascot}
                alt="Lumi te acompaña"
                className="relative z-10 -mb-2 h-40 w-auto object-contain drop-shadow-[0_16px_22px_rgba(76,61,126,0.18)]"
              />
            </div>
          </div>
        </section>

        <main className="space-y-5 px-5 pt-5">
          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9187a6]">Caso activo</p>
                <h2 className="mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-[#302b48]">Tu caso actual</h2>
              </div>
              <button type="button" className="text-[11px] font-semibold text-[#6b55c4]">Ver detalle</button>
            </div>

            <div className="rounded-[26px] bg-white p-4 shadow-[0_14px_38px_-28px_rgba(70,52,115,0.45)] ring-1 ring-[#eee8f5]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f1edff] text-[#6756b8]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 5.5h10M7 10h10M7 14.5h6M5 3.5h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[14px] font-bold leading-5 text-[#30354a]">Situación con compañero de universidad</h3>
                    <span className="shrink-0 rounded-full bg-[#fff1cc] px-2.5 py-1 text-[9px] font-bold text-[#8a6815]">Atención</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#8b8796]">Actualizado hoy · 19:20</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-[20px] bg-[#f7f4ff] p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#8e79e6]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#83779e]">Conducta</p>
                  </div>
                  <p className="mt-2 text-[13px] font-bold leading-4 text-[#39334f]">Atención elevada</p>
                </div>

                <div className="rounded-[20px] bg-[#fff8eb] p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#e6b455]" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#967744]">Impacto</p>
                  </div>
                  <p className="mt-2 text-[13px] font-bold leading-4 text-[#39334f]">Impacto creciente</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-2xl bg-[#6552c7] px-4 py-3.5 text-[13px] font-bold text-white shadow-[0_10px_22px_-14px_rgba(101,82,199,0.8)] transition hover:bg-[#5946b8]"
              >
                Registrar nueva interacción
              </button>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[17px] font-extrabold tracking-[-0.025em] text-[#302b48]">Tu línea de tiempo</h2>
              <button type="button" className="text-[11px] font-semibold text-[#6b55c4]">Ver todo</button>
            </div>

            <div className="rounded-[26px] bg-white px-4 py-4 shadow-[0_12px_34px_-30px_rgba(70,52,115,0.42)] ring-1 ring-[#eee8f5]">
              <div className="relative space-y-5 before:absolute before:bottom-2 before:left-[6px] before:top-2 before:w-px before:bg-[#e6def4]">
                {timeline.map((event) => {
                  const dotClass =
                    event.tone === 'violet'
                      ? 'bg-[#8e79e6]'
                      : event.tone === 'amber'
                        ? 'bg-[#e7b85b]'
                        : 'bg-[#dc8f98]'

                  return (
                    <div key={event.title} className="relative flex gap-3 pl-0.5">
                      <span className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-white ${dotClass}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[13px] font-bold text-[#383348]">{event.title}</p>
                          <span className="shrink-0 text-[9px] font-medium text-[#9993a4]">{event.time}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] leading-4 text-[#777383]">{event.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="rounded-[28px] bg-[#fff9ee] p-4 ring-1 ring-[#f5ead5]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fff0cf] text-[#9b7726]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3v2M12 19v2M4.2 7.5 6 8.6M18 15.4l1.8 1.1M4.2 16.5 6 15.4M18 8.6l1.8-1.1" />
                  <circle cx="12" cy="12" r="4.2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a7f54]">Check-in de impacto</p>
                <h2 className="mt-1 text-[15px] font-extrabold leading-5 text-[#3b3545]">¿Qué está empezando a cambiar en tu vida?</h2>
                <p className="mt-1 text-[11px] leading-4 text-[#746d72]">Marca solo lo que quieras compartir.</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {impactOptions.map((option) => (
                <span key={option} className="rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-[#71677c] ring-1 ring-[#eee2ce]">
                  {option}
                </span>
              ))}
            </div>

            <button type="button" className="mt-3 text-[11px] font-bold text-[#7a5f1f]">Hacer check-in →</button>
          </section>

          <section className="rounded-[26px] bg-[#f1edff] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#81769d]">Tu red de apoyo</p>
                <h2 className="mt-1 text-[15px] font-extrabold text-[#39334d]">No tienes que organizar todo sola.</h2>
                <p className="mt-1 text-[11px] leading-4 text-[#6d657d]">Puedes preparar un resumen y compartirlo solo si tú decides hacerlo.</p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#6655b6] shadow-sm">
                <NavIcon type="support" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-[18px] bg-white/80 px-3 py-2.5">
              <div>
                <p className="text-[11px] font-bold text-[#39334d]">Ana</p>
                <p className="text-[10px] text-[#8a8393]">Contacto de confianza</p>
              </div>
              <button type="button" className="rounded-full bg-[#eee8ff] px-3 py-1.5 text-[10px] font-bold text-[#654fb7]">Ver opciones</button>
            </div>
          </section>

          <button type="button" className="w-full rounded-2xl border border-dashed border-[#d8cdef] bg-white/70 px-4 py-3 text-[12px] font-bold text-[#665b7e]">
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
