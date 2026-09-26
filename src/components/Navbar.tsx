import { Link } from 'react-router-dom'
import logo from '../assets/lumi-logo.png'

const navItems = [
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Recursos', href: '#resources' },
  { label: 'Sobre Lumi', href: '#about' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#f8f6ff]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Lumi home">
          <img src={logo} alt="Lumi logo" className="h-10 w-auto" />
          <span className="text-xl font-semibold tracking-tight text-slate-900">Lumi</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
          >
            Comenzar gratis
          </Link>
        </div>
      </div>
    </header>
  )
}
