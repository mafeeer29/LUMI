import mascot from '../assets/lumi-mascot.png'

const timeline = [
  { dot: 'bg-[#8f78e4]', label: 'Mensaje inquietante', meta: 'Hoy · 10:24' },
  { dot: 'bg-[#6e9ee7]', label: 'Solicitud no deseada', meta: 'Ayer · 18:03' },
  { dot: 'bg-[#df7f88]', label: 'Comentario ofensivo', meta: '3 oct · 14:21' },
  { dot: 'bg-[#8f78e4]', label: 'Intento de contacto', meta: '1 oct · 09:17' },
]

export function FloatingPreviewCards() {
  return (
    <div className="relative mx-auto min-h-[350px] w-full max-w-[700px] sm:min-h-[470px] lg:min-h-[590px]">
      <div className="absolute inset-x-[10%] bottom-0 top-[4%] rounded-[46%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.92),_rgba(235,227,255,0.42)_58%,_transparent_74%)]" />
      <div className="absolute left-[8%] top-[16%] h-20 w-20 rounded-full border border-white/65 sm:h-24 sm:w-24" />
      <div className="absolute right-[5%] top-[5%] text-lg text-[#e6b957]">✦</div>
      <div className="absolute left-[35%] top-[9%] text-xs text-[#f0ca75]">✦</div>

      <img
        src={mascot}
        alt="Lumi"
        className="absolute bottom-0 left-1/2 z-40 h-[300px] w-auto -translate-x-1/2 object-contain drop-shadow-[0_28px_30px_rgba(83,67,135,0.2)] sm:h-[400px] lg:left-[31%] lg:h-[510px] lg:-translate-x-1/2"
      />

      <div className="absolute right-[1%] top-[2%] z-30 hidden w-[285px] rounded-[28px] border border-white/75 bg-white/88 p-4 shadow-[0_20px_60px_-35px_rgba(73,58,122,0.4)] backdrop-blur-xl md:block lg:right-[1%] lg:top-[4%]">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ede8ff] text-[#7564ce]">◷</span>
            <p className="text-[13px] font-extrabold text-[#39344e]">Línea de tiempo</p>
          </div>
          <span className="text-[10px] font-semibold text-[#7d69c9]">Ver todo →</span>
        </div>

        <div className="space-y-2.5">
          {timeline.map((item) => (
            <div key={item.label} className="grid grid-cols-[10px_1fr_auto] items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
              <div className="rounded-[14px] bg-[#faf8ff] px-3 py-2">
                <p className="text-[10px] font-bold text-[#464057]">{item.label}</p>
                <p className="mt-0.5 text-[8.5px] text-[#91899d]">{item.meta}</p>
              </div>
              <span className="text-[#a39aad]">›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[2%] top-[50%] z-30 hidden w-[250px] rounded-[26px] border border-white/75 bg-white/90 p-4 shadow-[0_20px_60px_-36px_rgba(73,58,122,0.38)] backdrop-blur-xl lg:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe6eb] text-[#cf6c7d]">♡</span>
          <p className="text-[13px] font-extrabold text-[#39344e]">Impacto</p>
        </div>
        <p className="mt-3 text-[11px] font-bold text-[#4a4359]">¿Qué está empezando a cambiar?</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[9px] font-semibold text-[#766f80]">
          <span className="rounded-full bg-[#f6f2ff] px-2.5 py-1.5">Rutina</span>
          <span className="rounded-full bg-[#fff3db] px-2.5 py-1.5">Estudios</span>
          <span className="rounded-full bg-[#f6f2ff] px-2.5 py-1.5">Trabajo</span>
          <span className="rounded-full bg-[#fff0f2] px-2.5 py-1.5">Seguridad</span>
        </div>
      </div>

      <div className="absolute bottom-[4%] right-[7%] z-30 hidden w-[270px] rounded-[26px] border border-[#f2dfb5] bg-[#fff6df]/95 p-4 shadow-[0_20px_60px_-36px_rgba(132,98,29,0.34)] backdrop-blur-xl xl:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe7af] text-[#a66d15]">!</span>
          <p className="text-[12px] font-extrabold text-[#40394b]">¿Por qué importa esta señal?</p>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-[#71697a]">
          Un cambio de canal junto con contacto reiterado puede indicar escalamiento. Lumi explica las señales sin etiquetar ni diagnosticar.
        </p>
      </div>

      <div className="absolute bottom-[1%] left-1/2 z-50 w-[230px] -translate-x-1/2 rounded-[22px] border border-white/80 bg-white/90 p-3.5 shadow-[0_18px_50px_-34px_rgba(73,58,122,0.36)] backdrop-blur-xl sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7a69c4]">Tu caso</p>
            <p className="mt-1 text-[11px] font-extrabold text-[#39344e]">Atención elevada</p>
          </div>
          <span className="rounded-full bg-[#f2edff] px-2 py-1 text-[8px] font-bold text-[#705fc2]">Resumen</span>
        </div>
      </div>
    </div>
  )
}
