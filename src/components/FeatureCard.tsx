type FeatureCardProps = {
  badge: string
  title: string
  description: string
  icon: string
}

export function FeatureCard({ badge, title, description, icon }: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-violet-100 bg-white/80 p-6 shadow-[0_18px_45px_-30px_rgba(124,58,237,0.45)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_26px_65px_-32px_rgba(124,58,237,0.55)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl shadow-inner shadow-violet-200/60">
        {icon}
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">{badge}</p>
      <h3 className="mb-3 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </article>
  )
}
