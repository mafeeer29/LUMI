import { Link } from 'react-router-dom'
import { FloatingPreviewCards } from './FloatingPreviewCards'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_58%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28 lg:pt-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm shadow-violet-100">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
            Ciberseguridad emocional
          </div>

          <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tu historia sigue siendo <span className="text-violet-600">tuya</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Identifica señales de ciberacoso, comprende cómo están afectando tu vida y encuentra apoyo
            antes de que el ruido te haga perderte a ti misma.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-full bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500"
            >
              Comenzar gratis
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"
            >
              Ver cómo funciona
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-left">
            <div>
              <p className="text-3xl font-black text-slate-900">4x</p>
              <p className="text-sm text-slate-500">más claridad</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">24/7</p>
              <p className="text-sm text-slate-500">apoyo sensible</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">1</p>
              <p className="text-sm text-slate-500">espacio seguro</p>
            </div>
          </div>
        </div>

        <FloatingPreviewCards />
      </div>
    </section>
  )
}
