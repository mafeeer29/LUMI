import mascot from '../assets/lumi-mascot.png'

const timeline = [
  { title: '12 mensajes registrados', time: 'Hoy', color: 'bg-violet-400' },
  { title: '8 llamadas sin respuesta', time: 'Ayer', color: 'bg-amber-400' },
  { title: 'Contacto desde otra cuenta', time: '12 abr', color: 'bg-rose-400' },
]

const navItems = [
  { label: 'Inicio', icon: '⌂', active: true },
  { label: 'Bitácora', icon: '✎', active: false },
  { label: 'Apoyo', icon: '❤', active: false },
  { label: 'Perfil', icon: '◉', active: false },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f1ebff] px-3 py-3 text-[#1f2a44] sm:px-4 lg:flex lg:items-center lg:justify-center lg:py-6">
      <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[36px] border border-[#e5daf7] bg-[#f9f4ff] shadow-[0_28px_60px_-32px_rgba(119,91,180,0.4)] lg:max-w-[480px]">
        <div className="relative overflow-hidden rounded-[36px] bg-[#f3efff] px-4 pb-3 pt-3">
          <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.7),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.6),transparent_20%)]" />

          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-center">
              <div className="h-1.5 w-20 rounded-full bg-[#2b2544]/25" />
            </div>

            <header className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold tracking-[-0.04em] text-[#62557f]">Lumi</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d7ccf5] bg-white/80 text-[18px]">
                ☼
              </div>
            </header>

            <section className="mb-4 flex items-start justify-between gap-3 px-1">
              <div className="w-[58%]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7d73a5]">Hola, Lucía</p>
                <h1 className="mt-2 text-[2.1rem] font-black leading-[0.9] tracking-[-0.06em] text-[#2d2a43]">
                  Tu historia
                  <br />
                  sigue siendo
                  <br />
                  tuya.
                </h1>
              </div>

              <div className="relative mt-1 flex w-[42%] items-end justify-end">
                <div className="absolute -left-4 top-3 h-24 w-24 rounded-full border border-[#d9c8f8] opacity-80" />
                <div className="absolute -left-8 top-10 h-12 w-12 rounded-full border border-[#d9c8f8] opacity-80" />
                <img src={mascot} alt="Lumi mascot" className="relative z-10 h-32 w-auto drop-shadow-[0_12px_18px_rgba(103,80,167,0.18)]" />
              </div>
            </section>

            <div className="mb-4 rounded-[22px] border border-[#e8dbff] bg-white/85 px-3 py-3 shadow-[0_12px_24px_-18px_rgba(121,90,178,0.45)]">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e8e5ff] text-[#4a3f7f]">
                  ☰
                </div>
                <div className="flex-1">
                  <h2 className="text-[15px] font-black text-[#2d2a43]">Tu caso actual</h2>
                  <p className="mt-1 text-[13px] font-semibold text-[#2d2a43]">Situación con compañero de universidad</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f9e7b5] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7a5f18]">
                      Requiere atención
                    </span>
                    <span className="text-[11px] font-medium text-[#5d6273]">Hoy · 19:20</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-[18px] bg-[#f6f1ff] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#736597]">Conducta</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#2d2a43]">Atención elevada</p>
                </div>
                <div className="rounded-[18px] bg-[#f5f0eb] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#876f47]">Impacto</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#2d2a43]">Impacto creciente</p>
                </div>
              </div>
            </div>

            <section className="mb-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-[15px] font-black text-[#2d2a43]">Tu línea de tiempo</h3>
                <button type="button" className="text-[11px] font-semibold text-[#5b4fb0]">
                  Ver todo
                </button>
              </div>

              <div className="relative rounded-[22px] border border-[#e8dbff] bg-white/80 px-3 py-3 shadow-[0_12px_24px_-18px_rgba(121,90,178,0.45)]">
                <div className="absolute left-4 top-3 bottom-3 w-px bg-[#d9ccf7]" />

                <div className="space-y-4 pl-7">
                  {timeline.map((event) => (
                    <div key={event.title} className="relative flex items-start gap-3">
                      <span className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full ${event.color}`} />
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-[#2d2a43]">{event.title}</p>
                      </div>
                      <span className="text-[10px] font-medium text-[#706d82]">{event.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-4 rounded-[22px] border border-[#e8dbff] bg-white/85 p-3 shadow-[0_12px_24px_-18px_rgba(121,90,178,0.45)]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe8ff] text-lg text-[#4a3f7f]">
                  ✦
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-black text-[#2d2a43]">¿Qué está empezando a cambiar en tu vida?</h3>
                  <p className="mt-1 text-[12px] leading-5 text-[#5d6273]">Puedes contarnos solo lo que quieras compartir.</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-3 w-full rounded-full bg-[#e8e1ff] px-4 py-3 text-[13px] font-bold text-[#5640a6]"
              >
                Hacer check-in
              </button>
            </section>

            <button
              type="button"
              className="mb-4 flex w-full items-center justify-center rounded-full bg-[#6054bf] px-4 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_24px_-16px_rgba(96,84,191,0.8)]"
            >
              Registrar nueva interacción
            </button>

            <section className="rounded-[22px] border border-[#e8dbff] bg-white/85 p-3 shadow-[0_12px_24px_-18px_rgba(121,90,178,0.45)]">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-black text-[#2d2a43]">Tu red de apoyo</h3>
                <button type="button" className="text-[11px] font-semibold text-[#5b4fb0]">
                  Ver opciones
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-[#f7f1ff] p-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe5ff] text-[#3a446f]">👤</div>
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#2d2a43]">Contacto de confianza</p>
                  <p className="text-[11px] text-[#5d6273]">Ana · Amiga de confianza</p>
                </div>
                <button type="button" className="rounded-full bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#5640a6]">
                  Ver
                </button>
              </div>
            </section>
          </div>
        </div>

        <nav className="flex items-center justify-around border-t border-[#e6dbf6] bg-[#fffefd] px-1 py-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex min-w-[70px] flex-col items-center gap-1 rounded-full px-2 py-2 text-[10px] font-semibold transition ${
                item.active ? 'bg-[#f2ebff] text-[#5b4fb0]' : 'text-[#6c7283] hover:bg-[#f7f3ff]'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
