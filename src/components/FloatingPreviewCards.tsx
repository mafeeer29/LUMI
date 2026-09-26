import mascot from '../assets/lumi-mascot.png'

export function FloatingPreviewCards() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center">
      <div className="absolute -left-8 top-8 rounded-2xl border border-violet-200 bg-white/90 p-4 shadow-xl shadow-violet-200/50 backdrop-blur-sm">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-600">Señales</div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg shadow-md shadow-violet-500/30">⚠️</div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Patrones</p>
            <p className="text-xs text-slate-500">7 cambios detectados</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 bottom-10 rounded-2xl border border-emerald-200 bg-white/90 p-4 shadow-xl shadow-emerald-200/50 backdrop-blur-sm">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Apoyo</div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-lg shadow-md shadow-emerald-500/25">💬</div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Checklist</p>
            <p className="text-xs text-slate-500">6 recursos listos</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 rounded-[32px] border border-violet-200/80 bg-gradient-to-br from-[#f9f7ff] via-white to-[#f3f6ff] p-6 shadow-[0_30px_80px_-32px_rgba(76,29,149,0.6)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-2xl shadow-inner shadow-violet-200">
          🌱
        </div>
        <img src={mascot} alt="Lumi mascot" className="mx-auto h-52 w-auto drop-shadow-[0_28px_30px_rgba(109,40,217,0.2)]" />
        <div className="mt-6 rounded-2xl bg-slate-900 px-4 py-3 text-left text-white shadow-lg shadow-slate-900/15">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-violet-200">
            <span>Estado</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] text-emerald-300">Seguro</span>
          </div>
          <p className="mt-2 text-lg font-semibold">Tu bienestar está en foco</p>
        </div>
      </div>
    </div>
  )
}
