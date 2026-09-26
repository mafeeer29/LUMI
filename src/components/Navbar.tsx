import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Recursos', href: '#resources' },
  { label: 'Nosotras', href: '#about' },
  { label: 'Preguntas frecuentes', href: '#faq' },
]

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2" aria-label="Lumi home">
          <span className="text-[28px] leading-none text-[#e9b34e]">✦</span>
          <span className="text-2xl font-extrabold tracking-[-0.04em] text-[#302d58]">Lumi</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[13px] font-semibold text-[#615a77] transition hover:text-[#6454c5]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/app"
            className="hidden rounded-full border border-[#d8d0ec] bg-white/55 px-5 py-2.5 text-[12px] font-semibold text-[#51496a] shadow-sm backdrop-blur-md transition hover:bg-white sm:inline-flex"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/app"
            className="inline-flex rounded-full bg-[linear-gradient(90deg,#7564d8,#5e50bf)] px-5 py-2.5 text-[12px] font-semibold text-white shadow-[0_10px_26px_-14px_rgba(94,80,191,0.75)] transition hover:brightness-105"
          >
            Comenzar
          </Link>
        </div>
      </div>
    </header>
  )
}
