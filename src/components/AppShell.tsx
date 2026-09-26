import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function AppShell({ title, children, backTo = '/app' }: { title: string; children: ReactNode; backTo?: string }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fbf9ff] text-[#2f2b45]">
      <div className="mx-auto min-h-screen w-full max-w-[520px] px-5 pb-28 pt-5">
        <header className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6758b7] shadow-sm"
            aria-label="Volver"
          >
            ←
          </button>
          <Link to="/app" className="text-sm font-extrabold text-[#4b4381]">Lumi</Link>
          <Link to="/app/perfil/privacidad-ia" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm text-[#7969c8] shadow-sm" aria-label="Perfil y privacidad">⚙</Link>
        </header>

        <main>
          <h1 className="mb-5 text-[25px] font-extrabold leading-tight tracking-[-0.03em]">{title}</h1>
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
