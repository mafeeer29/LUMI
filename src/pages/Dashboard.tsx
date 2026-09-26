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
    <div className="min-h-screen bg-[#f5f0ff] px-0 py-0 text-[#1f2a44] lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto w-full max-w-[480px] bg-[#f7f2ff] pb-20 pt-5 lg:max-w-[480px]">
        <header className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold tracking-[-0.04em] text-[#5b4b7d]">Lumi</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#f1ebff] ring-1 ring-[#e6dcff]">
              <img src={mascot} alt="Lumi mascot" className="h-7 w-auto object-contain" />
            </div>
          </div>
        </header>

        <main className="px-4">
          <section className="mb-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7d73a5]">Hola, Lucía</p>
            <p className="mt-2 max-w-[260px] text-[15px] leading-6 text-[#47516d]">
              Este es tu espacio. Tú decides qué registrar y qué pasos tomar.
            </p>
          </section>

          <section className="mb-5 rounded-[26px] bg-white/70 p-4 shadow-[0_12px_24px_-18px_rgba(115,92,170,0.35)] ring-1 ring-[#efe6ff]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7d73a5]">Tu caso actual</p>
                <h2 className="mt-2 text-[17px] font-black leading-6 text-[#2a2f46]">Situación con compañero de universidad</h2>
              </div>
              <span className="rounded-full bg-[#f8e7b5] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#7a5f18]">
                Requiere atención
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-[#5d6273]">
              <span>Última actualización</span>
              <span className="font-semibold text-[#2a2f46]">Hoy · 19:20</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="rounded-[18px] bg-[#f5f1ff] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#736597]">Conducta</p>
                <p className="mt-1 text-[13px] font-semibold text-[#2a2f46]">Atención elevada</p>
              </div>
              <div className="rounded-[18px] bg-[#f4efe9] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#856f42]">Impacto</p>
                <p className="mt-1 text-[13px] font-semibold text-[#2a2f46]">Impacto creciente</p>
              </div>
            </div>
          </section>

          <section className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-black text-[#2a2f46]">Tu línea de tiempo</h3>
              <button type="button" className="text-[11px] font-semibold text-[#5b4fb0]">
                Ver todo
              </button>
            </div>

            <div className="relative rounded-[24px] bg-white/65 px-3 py-3 shadow-[0_10px_24px_-20px_rgba(96,77,145,0.5)] ring-1 ring-[#efe6ff]">
              <div className="absolute left-5 top-3 bottom-3 w-px bg-[#d9ccf7]" />

              <div className="space-y-4 pl-7">
                {timeline.map((event) => (
                  <div key={event.title} className="relative flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`absolute -left-[26px] top-1.5 h-3.5 w-3.5 rounded-full ${event.color}`} />
                      <p className="text-[13px] font-medium text-[#2a2f46]">{event.title}</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#6d7286]">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-5 rounded-[24px] bg-[#f8f1ff] p-4 ring-1 ring-[#ecdefc]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe2ff] text-[18px] text-[#5846a8]">
                ✦
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-black text-[#2a2f46]">¿Qué está empezando a cambiar en tu vida?</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#5d6273]">Puedes contarnos solo lo que quieras compartir.</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-full bg-[#e8e1ff] px-4 py-3 text-[13px] font-bold text-[#4f3d9d]"
            >
              Hacer check-in
            </button>
          </section>

          <button
            type="button"
            className="mb-5 w-full rounded-full bg-[#5c4fc8] px-4 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_24px_-16px_rgba(92,79,200,0.75)]"
          >
            Registrar nueva interacción
          </button>

          <section className="rounded-[24px] bg-white/70 p-4 ring-1 ring-[#eee1ff] shadow-[0_10px_24px_-20px_rgba(96,77,145,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-black text-[#2a2f46]">Tu red de apoyo</h3>
              <button type="button" className="text-[11px] font-semibold text-[#5b4fb0]">
                Ver opciones
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-[#f7f1ff] p-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5ebff] text-[#3b4b75]">👤</div>
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#2a2f46]">Contacto de confianza</p>
                <p className="text-[11px] text-[#5d6273]">Ana · Amiga</p>
              </div>
              <button type="button" className="rounded-full bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#5640a6]">
                Ver
              </button>
            </div>
          </section>
        </main>

        <nav className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] border-t border-[#e6dbf6] bg-[#fdfbff]/95 px-2 py-2 backdrop-blur-sm shadow-[0_-8px_18px_-14px_rgba(86,73,123,0.4)]">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex min-w-[70px] flex-col items-center gap-1 rounded-full px-2 py-2 text-[10px] font-semibold transition ${
                  item.active ? 'bg-[#f1ebff] text-[#5b4fb0]' : 'text-[#6c7283]'
                }`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
