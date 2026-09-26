import { Link } from 'react-router-dom'
import mascot from '../assets/lumi-mascot.png'

const navItems = [
  { label: 'Inicio', active: true },
  { label: 'Bitácora', active: false },
  { label: 'Apoyo', active: false },
  { label: 'Perfil', active: false },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] px-3 py-4 text-[#1f2a44] sm:px-5 lg:flex lg:items-center lg:justify-center lg:py-10">
      <div className="mx-auto w-full max-w-[430px] rounded-[32px] border border-[#eadff7] bg-[#fffdfb] shadow-[0_24px_60px_-32px_rgba(129,96,183,0.55)] lg:max-w-[980px] lg:px-4 lg:py-5">
        <div className="rounded-[28px] bg-[#f6f1ff] p-4 shadow-inner shadow-violet-100/60 lg:p-6">
          <header className="flex items-center justify-between pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a6f93]">Lumi</p>
              <h1 className="mt-1 text-[2rem] font-black leading-none text-[#1f2a44]">Hola, Lucía</h1>
            </div>

            <Link
              to="/"
              className="rounded-full border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-[#3a3f5d] transition hover:border-violet-300 hover:text-violet-700"
            >
              Inicio
            </Link>
          </header>

          <div className="mb-4 flex items-center gap-3 rounded-[24px] border border-[#efe2ff] bg-white/90 px-3 py-3 shadow-sm shadow-violet-100/30">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f2ebff]">
              <img src={mascot} alt="Lumi mascot" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm leading-5 text-[#42506d]">
              Este es tu espacio. Tú decides qué registrar y qué pasos tomar.
            </p>
          </div>

          <main className="space-y-4">
            <section className="rounded-[28px] bg-white p-4 shadow-[0_18px_30px_-24px_rgba(90,74,121,0.35)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7ca3]">Tus casos</p>
                  <h2 className="mt-1 text-lg font-bold text-[#1f2a44]">Situación con compañero de universidad</h2>
                </div>
                <span className="rounded-full bg-[#f9e8b5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7a5f18]">
                  Requiere atención
                </span>
              </div>

              <div className="mt-4 space-y-3 rounded-[22px] bg-[#f9f5ff] p-3">
                <div className="flex items-center justify-between text-xs text-[#53607a]">
                  <span>Última actualización</span>
                  <span className="font-medium text-[#1f2a44]">Hoy · 19:20</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="rounded-2xl border border-[#e9ddff] bg-white px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a6f93]">Conducta</p>
                    <p className="mt-1 text-sm font-semibold text-[#1f2a44]">Atención elevada</p>
                  </div>
                  <div className="rounded-2xl border border-[#f6dfc0] bg-white px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8d7140]">Impacto</p>
                    <p className="mt-1 text-sm font-semibold text-[#1f2a44]">Impacto creciente</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3 sm:flex-row lg:gap-4">
              <button
                type="button"
                className="flex-1 rounded-full bg-[#7b5de6] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_25px_-12px_rgba(123,93,230,0.8)] transition hover:bg-[#6f52d8]"
              >
                Registrar nueva interacción
              </button>
              <button
                type="button"
                className="rounded-full border border-[#d8c9f9] bg-white px-4 py-3.5 text-sm font-semibold text-[#3a3f5d] transition hover:border-violet-300 hover:text-violet-700"
              >
                + Crear nuevo caso
              </button>
            </section>

            <section className="rounded-[28px] bg-[#fffaf2] p-4 text-[#1f2a44] shadow-[0_18px_30px_-24px_rgba(90,74,121,0.25)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8d7140]">Bitácora</p>
              <h3 className="mt-2 text-lg font-bold">Tu bitácora está al día</h3>
              <p className="mt-2 text-sm leading-6 text-[#4f5a73]">
                Los registros se organizan cronológicamente para que puedas revisarlos con calma y decidir qué seguir anotando.
              </p>
            </section>
          </main>
        </div>

        <nav className="mt-4 flex items-center justify-around rounded-[24px] border border-[#e8ddf8] bg-white/90 px-2 py-3 shadow-[0_18px_35px_-26px_rgba(91,68,129,0.5)] backdrop-blur-sm lg:mt-6 lg:max-w-[420px] lg:mx-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex min-w-[70px] flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition ${
                item.active
                  ? 'bg-[#f2ebff] text-[#5d3bc2]'
                  : 'text-[#66728d] hover:bg-[#f7f3ff] hover:text-[#3a3f5d]'
              }`}
            >
              <span className="text-base">{item.label === 'Inicio' ? '⌂' : item.label === 'Bitácora' ? '✎' : item.label === 'Apoyo' ? '❤' : '◉'}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
