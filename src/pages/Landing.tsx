import { FeatureCard } from '../components/FeatureCard'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'

const features = [
  {
    badge: 'Reconoce',
    title: 'Señales difíciles de nombrar',
    description:
      'Identifica mensajes, patrones y comportamientos que te dejan incómoda o confundida para entender mejor lo que está ocurriendo.',
    icon: '🔎',
  },
  {
    badge: 'Entiende',
    title: 'Su impacto en tu día a día',
    description:
      'Explora cómo el acoso digital afecta tu energía, tu confianza y tus decisiones para ponerle nombre con claridad.',
    icon: '🧠',
  },
  {
    badge: 'Actúa',
    title: 'Plan de respuesta y apoyo',
    description:
      'Descubre pasos concretos, recursos útiles y herramientas para cuidar tu bienestar antes de que la presión se vuelva abrumadora.',
    icon: '🛡️',
  },
]

const values = [
  'Privacidad y seguridad para tus datos',
  'Lenguaje claro, amable y respetuoso',
  'Acompañamiento pensado para tu bienestar',
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f7f5ff] text-slate-900">
      <Navbar />
      <main>
        <Hero />

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Cómo funciona</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Un espacio para entender lo que te está pasando
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="resources" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Recursos</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Información clara, sin juicios ni ruido
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
                Lumi te ayuda a poner palabras a una experiencia compleja para que puedas tomar decisiones con más calma, más contexto y más apoyo.
              </p>
            </div>

            <div className="grid gap-4">
              {values.map((item) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-800/80 p-5 shadow-lg shadow-slate-950/20">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/20 text-lg text-violet-200">
                    ✓
                  </div>
                  <p className="text-base font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-violet-100 bg-white p-8 shadow-[0_25px_60px_-38px_rgba(109,40,217,0.6)] md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-500 p-8 text-white shadow-xl shadow-violet-500/30">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">Lumi</p>
                <h3 className="mt-4 text-3xl font-black">Tu bienestar merece ser escuchado</h3>
              </div>

              <div>
                <p className="text-lg leading-8 text-slate-600">
                  En Lumi creemos que entender lo que está ocurriendo es el primer paso para recuperar la calma. No se trata de etiquetar a alguien ni de dramatizar, sino de darte claridad, acompañamiento y herramientas para cuidar tu vida con más seguridad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
