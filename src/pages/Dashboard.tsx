import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import mascot from '../assets/lumi-mascot.png'
import BottomNav from '../components/BottomNav'
import { getLocalUser } from '../lib/accountStore'
import {
  getActiveCase,
  getCaseCheckins,
  getCaseInteractions,
  getConductLevel,
  getImpactLevel,
  seedDemoCase,
} from '../lib/lumiStore'

function formatDate(date: string) {
  const value = new Date(date)
  return {
    day: value.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }),
    time: value.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default function Dashboard() {
  const user = getLocalUser()
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Lucía'

  const data = useMemo(() => {
    seedDemoCase()
    const activeCase = getActiveCase()
    if (!activeCase) return null
    return {
      activeCase,
      interactions: getCaseInteractions(activeCase.id),
      checkins: getCaseCheckins(activeCase.id),
      conduct: getConductLevel(activeCase.id),
      impact: getImpactLevel(activeCase.id),
    }
  }, [])

  if (!data) return null

  return (
    <div className="min-h-screen bg-[#fbf9ff] text-[#26324b]">
      <div className="mx-auto min-h-screen w-full max-w-[520px] pb-28">
        <section className="relative overflow-hidden bg-[linear-gradient(145deg,#efe8ff_0%,#e9e2ff_48%,#f8f4ff_100%)] px-5 pb-6 pt-3 shadow-[0_16px_40px_-30px_rgba(85,65,130,0.45)]">
          <div className="absolute -left-12 top-24 h-28 w-28 rounded-full border border-white/45" />
          <div className="absolute -right-16 -top-12 h-40 w-40 rounded-full bg-white/28" />
          <div className="absolute right-7 top-[92px] text-[11px] text-[#d8b45a]">✦</div>

          <header className="relative z-10 flex items-center justify-between">
            <p className="text-[20px] font-extrabold tracking-[-0.045em] text-[#4b4381]">Lumi</p>
            <Link to="/app/perfil/privacidad-ia" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/45 text-[#6d6487]" aria-label="Perfil y privacidad">⚙</Link>
          </header>

          <div className="relative z-10 mt-2 grid grid-cols-[1.02fr_0.98fr] items-end gap-0">
            <div className="pb-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#776c98]">Hola, {firstName}</p>
              <h1 className="mt-2 text-[30px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#342f5d]">Este es tu espacio.</h1>
              <p className="mt-2 max-w-[220px] text-[13px] leading-[1.5] text-[#6f6685]">Tú decides qué registrar, qué compartir y qué paso tomar después.</p>
            </div>

            <div className="relative flex min-h-[150px] items-end justify-start pl-1">
              <img src={mascot} alt="Lumi te acompaña" className="relative z-10 -mb-1 -ml-2 h-[12rem] w-auto object-contain drop-shadow-[0_14px_20px_rgba(76,61,126,0.16)]" />
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
              <Link to="/app/caso" className="text-[11px] font-semibold text-[#6a55be]">Ver detalle</Link>
            </div>

            <div className="rounded-[28px] bg-white p-4 shadow-[0_16px_36px_-30px_rgba(70,52,115,0.42)] ring-1 ring-[#f0ebf6]">
              <h3 className="text-[14px] font-bold leading-5 text-[#313348]">{data.activeCase.title}</h3>
              <p className="mt-1 text-[11px] text-[#96909e]">Actualizado {formatDate(data.activeCase.updatedAt).day} · {formatDate(data.activeCase.updatedAt).time}</p>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-[20px] bg-[#f7f4ff] p-3.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#877ca0]">Conducta</p>
                  <p className="mt-2 text-[13px] font-bold leading-4 text-[#3a354d]">{data.conduct}</p>
                </div>
                <div className="rounded-[20px] bg-[#fff8eb] p-3.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#947746]">Impacto</p>
                  <p className="mt-2 text-[13px] font-bold leading-4 text-[#3a354d]">{data.impact}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[30px] bg-white/75 p-4 shadow-[0_16px_40px_-32px_rgba(74,58,120,0.32)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-extrabold tracking-[-0.03em] text-[#312b49]">Tu línea de tiempo</h2>
              <Link to="/app/bitacora" className="text-[10px] font-semibold text-[#7665c7]">Ver todo ›</Link>
            </div>

            <div className="relative">
              <div className="absolute bottom-4 left-[7px] top-4 w-px bg-[#e4dcf0]" />
              <div className="space-y-3.5">
                {data.interactions.slice(0, 3).map((event, index) => {
                  const colors = ['bg-[#9884e7]', 'bg-[#e7b557]', 'bg-[#dd8d96]']
                  const date = formatDate(event.occurredAt)
                  return (
                    <div key={event.id} className="relative grid grid-cols-[14px_1fr_auto] items-center gap-3">
                      <span className={`relative z-10 h-3.5 w-3.5 rounded-full ring-[5px] ring-[#fffdfb] ${colors[index % colors.length]}`} />
                      <div>
                        <p className="text-[13px] font-bold leading-4 text-[#393449]">{event.description}</p>
                        <p className="mt-0.5 text-[10.5px] leading-4 text-[#817a88]">{event.channel}</p>
                      </div>
                      <div className="text-right text-[8.5px] leading-4 text-[#9f99a7]">{date.day}<br />{date.time}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Link to="/app/registrar" className="mt-4 flex w-full items-center justify-between rounded-full bg-[linear-gradient(90deg,#7a69d7_0%,#6757c4_100%)] px-4 py-2.5 text-[12.5px] font-semibold text-white">
              <span>+ Registrar interacción</span><span>›</span>
            </Link>
          </section>

          <section className="rounded-[28px] bg-[linear-gradient(135deg,#fff9ed_0%,#fff3d5_100%)] p-[18px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9b7a3d]">Check-in de impacto</p>
            <h2 className="mt-1.5 text-[17px] font-extrabold leading-[1.18] text-[#3d3546]">¿Qué está empezando a cambiar en tu vida?</h2>
            <p className="mt-2 text-[11px] leading-[1.5] text-[#746b70]">Rutina, estudios, trabajo o seguridad. Tú decides qué contar.</p>
            <Link to="/app/checkin" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-[12px] font-bold text-[#7d5d20]">Hacer check-in →</Link>
          </section>

          <section className="rounded-[28px] bg-[#f1edff] p-[18px]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#82779d]">Tu red de apoyo</p>
            <h2 className="mt-1 text-[16px] font-extrabold text-[#39334d]">Tú decides cuándo compartir.</h2>
            <p className="mt-1.5 text-[11px] leading-4 text-[#6c657a]">Prepara un resumen de tu caso y revísalo antes de compartirlo con alguien de confianza.</p>
            <Link to="/app/apoyo" className="mt-4 inline-block rounded-full bg-white/85 px-4 py-2 text-[11px] font-bold text-[#624cb1]">Ver opciones de apoyo</Link>
          </section>

          <Link to="/app/nuevo-caso" className="block w-full rounded-[20px] border border-dashed border-[#d8cdef] bg-white/65 px-4 py-3 text-center text-[12px] font-bold text-[#675c7e]">+ Crear nuevo caso</Link>
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
