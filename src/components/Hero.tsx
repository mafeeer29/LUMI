import { Link } from 'react-router-dom'
import { FloatingPreviewCards } from './FloatingPreviewCards'

const benefits = [
  { icon: '◇', label: 'Privado y seguro' },
  { icon: '◉', label: 'Tú mantienes el control' },
  { icon: '♡', label: 'Apoyo en cada paso' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fffaf5_0%,#f7f1ff_44%,#e8defe_100%)] pt-16 lg:pt-24">
      <div className="absolute -left-28 top-[18%] h-72 w-72 rounded-full bg-[#fff5ea]/80 blur-3xl" />
      <div className="absolute right-[-10%] top-[-5%] h-[460px] w-[460px] rounded-full bg-[#d9ccff]/70 blur-3xl" />
      <div className="absolute bottom-[-18%] left-[28%] h-80 w-80 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute left-[4%] top-[34%] text-2xl text-[#e8b84e]">✦</div>
      <div className="absolute left-[47%] top-[21%] text-sm text-[#efca77]">✦</div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-2 px-5 pb-8 sm:px-8 lg:min-h-[760px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:px-12 lg:pb-6">
        <div className="relative z-20 pt-6 lg:pt-0">
          <p className="text-[clamp(3.3rem,7vw,6.4rem)] font-black leading-[0.84] tracking-[-0.065em] text-[#312d58]">
            Lumi
          </p>

          <h1 className="mt-5 max-w-[620px] text-[clamp(2.3rem,4.4vw,4.4rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#302d58]">
            Tu historia sigue siendo <span className="text-[#6554ce]">tuya</span>
          </h1>

          <p className="mt-6 max-w-[610px] text-[15px] leading-7 text-[#655f76] sm:text-[17px]">
            Registra señales, comprende patrones y encuentra apoyo antes de que una situación de violencia digital empiece a afectar tu bienestar, tus decisiones o tu proyecto de vida.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#7564d8,#5f50c1)] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_16px_32px_-18px_rgba(95,80,193,0.78)] transition hover:brightness-105"
            >
              Comenzar <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full border border-[#d7cfea] bg-white/55 px-6 py-3.5 text-[14px] font-bold text-[#514a6a] backdrop-blur-md transition hover:bg-white"
            >
              Conoce más
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {benefits.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-[11px] font-semibold text-[#655f76]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/65 text-[#6c5dc6] shadow-sm">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 lg:mt-0">
          <FloatingPreviewCards />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(250,247,255,0.95),transparent)]" />
    </section>
  )
}
