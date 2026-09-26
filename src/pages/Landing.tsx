import { FeatureCard } from '../components/FeatureCard'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'

const features = [
  {
    badge: 'Registra',
    title: 'Señales y cambios relevantes',
    description:
      'Guarda interacciones importantes en una bitácora cronológica para observar persistencia, cambios de canal y otros patrones sin perder contexto.',
    icon: '✦',
  },
  {
    badge: 'Comprende',
    title: 'Conducta e impacto por separado',
    description:
      'Lumi organiza lo que está ocurriendo y también lo que empieza a cambiar en tu rutina, estudios, trabajo o sensación de seguridad.',
    icon: '◉',
  },
  {
    badge: 'Decide',
    title: 'Apoyo sin quitarte el control',
    description:
      'Recibe explicaciones claras y opciones de apoyo. Tú decides qué registrar, qué compartir y qué acción tomar después.',
    icon: '♡',
  },
]

const principles = [
  {
    title: 'Privacidad primero',
    text: 'Lumi prioriza información sintética o autorizada y evita exponer datos sensibles innecesariamente.',
  },
  {
    title: 'IA explicable',
    text: 'No entrega porcentajes arbitrarios ni afirmaciones absolutas: muestra señales concretas y por qué pueden importar.',
  },
  {
    title: 'Sin diagnósticos ni etiquetas',
    text: 'Lumi no determina delitos, no diagnostica condiciones y no decide por la usuaria. Orienta y organiza información.',
  },
]

const faqs = [
  {
    q: '¿Lumi decide si una persona es acosadora?',
    a: 'No. Lumi identifica señales registradas y ayuda a entender patrones, pero no etiqueta personas ni determina responsabilidades legales.',
  },
  {
    q: '¿Puede compartir mi información automáticamente?',
    a: 'No. Preparar o compartir un resumen con una persona de confianza requiere una acción explícita de la usuaria.',
  },
  {
    q: '¿Lumi reemplaza ayuda profesional o institucional?',
    a: 'No. Lumi es una herramienta de intervención temprana y organización. Puede facilitar rutas de apoyo, pero no sustituye atención profesional ni institucional.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#302d58]">
      <Navbar />
      <main>
        <Hero />

        <section id="how-it-works" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7564c9]">Cómo funciona</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#302d58] sm:text-4xl">
              Entender antes de que la situación empiece a decidir por ti
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#70697f]">
              Lumi combina registro, análisis de señales e impacto para ayudarte a detectar escalamiento temprano y proteger tu continuidad académica, laboral y personal.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="resources" className="relative overflow-hidden bg-[linear-gradient(135deg,#f0eaff_0%,#fff9ee_55%,#f8f3ff_100%)] py-20 lg:py-24">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/55 blur-3xl" />
          <div className="absolute right-[-6%] top-[15%] h-72 w-72 rounded-full bg-[#ded3ff]/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7564c9]">Recursos</p>
              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-[-0.04em] text-[#302d58] sm:text-4xl">
                Claridad, contexto y apoyo sin perder el control de tu historia
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#6f687c]">
                Lumi organiza lo que registras para mostrar señales comprensibles y ayudarte a decidir qué hacer después. La información se presenta como orientación, no como diagnóstico o sentencia.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {principles.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-white/75 bg-white/78 p-5 shadow-[0_18px_45px_-34px_rgba(76,61,126,0.38)] backdrop-blur-md"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eee8ff] text-[13px] font-black text-[#6d5cc4]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[14px] font-extrabold text-[#3b3650]">{item.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-5 text-[#766f7f]">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-8 overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#302d58_0%,#55478d_58%,#7564cf_100%)] p-8 text-white shadow-[0_28px_70px_-42px_rgba(49,45,88,0.72)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ddd4ff]">Por qué existe Lumi</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Proteger tu trayectoria, no solo registrar un incidente
              </h2>
            </div>
            <div>
              <p className="text-[15px] leading-7 text-[#ece8ff]">
                Una situación de violencia digital puede empezar con mensajes insistentes y terminar afectando decisiones, oportunidades, estudios, trabajo o espacios cotidianos. Lumi busca intervenir antes de que ese impacto escale, manteniendo siempre a la usuaria en control de sus datos y decisiones.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-[980px] px-5 pb-24 sm:px-8">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7564c9]">Preguntas frecuentes</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#302d58]">Lumi acompaña, no decide por ti</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-[24px] border border-[#ebe5f4] bg-white/80 px-5 py-4 shadow-[0_14px_35px_-32px_rgba(74,58,120,0.4)]">
                <summary className="cursor-pointer list-none text-[14px] font-extrabold text-[#3a354e]">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-[#7a68ca] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-[12px] leading-6 text-[#756e7d]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
