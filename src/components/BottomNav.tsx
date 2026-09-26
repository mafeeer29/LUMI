import { Link, useLocation } from 'react-router-dom'

const items = [
  { to: '/app', label: 'Inicio', icon: '⌂' },
  { to: '/app/caso', label: 'Caso', icon: '◉' },
  { to: '/app/bitacora', label: 'Bitácora', icon: '≡' },
  { to: '/app/apoyo', label: 'Apoyo', icon: '♡' },
  { to: '/app/perfil/privacidad-ia', label: 'Perfil', icon: '⚙' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] border-t border-[#eee8f5] bg-[#fffdfd]/95 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = item.to === '/app'
            ? location.pathname === '/app'
            : location.pathname.startsWith(item.to)

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center rounded-2xl px-1 py-1.5 text-[9px] font-semibold transition ${active ? 'bg-[#f1edff] text-[#654fc0]' : 'text-[#9a94a6]'}`}
            >
              <span className="text-[14px] leading-none" aria-hidden="true">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
