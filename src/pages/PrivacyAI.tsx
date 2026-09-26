import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import {
  getPrivacySettings,
  logoutLocalUser,
  setAIDataPermissions,
  setAIPreference,
  type AIPreference,
} from '../lib/accountStore'

export default function PrivacyAI() {
  const navigate = useNavigate()
  const privacy = getPrivacySettings()
  const [preference, setPreference] = useState<AIPreference>(privacy.aiPreference ?? 'ask')
  const [shareContext, setShareContext] = useState(privacy.aiDataPermissions.shareCaseContext)
  const [shareImages, setShareImages] = useState(privacy.aiDataPermissions.shareImages)
  const [saved, setSaved] = useState(false)

  function saveSettings() {
    setAIPreference(preference)
    setAIDataPermissions({
      shareCaseContext: shareContext,
      shareImages,
    })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  function logout() {
    logoutLocalUser()
    navigate('/login', { replace: true })
  }

  return (
    <AppShell title="Privacidad e IA">
      <p className="-mt-2 mb-5 text-sm leading-6 text-[#716a7c]">Controla cuándo Lumi analiza tus registros y qué información adicional puede acompañar al texto.</p>

      <section className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#81769d]">Consentimiento de IA</p>
            <h2 className="mt-1 text-base font-extrabold text-[#312b49]">Activo</h2>
          </div>
          <span className="rounded-full bg-[#e9f7ef] px-3 py-1 text-[11px] font-bold text-[#3d7a58]">✓ Autorizado</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#716a7c]">La IA forma parte del funcionamiento de Lumi. Puedes elegir análisis automático o confirmación previa para cada registro.</p>
      </section>

      <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
        <h2 className="text-sm font-extrabold">Cuándo analizar</h2>
        <div className="mt-4 space-y-3">
          <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${preference === 'automatic' ? 'border-[#7665c7] bg-[#f4f0ff]' : 'border-[#ebe5f3]'}`}>
            <input type="radio" name="ai-preference" checked={preference === 'automatic'} onChange={() => setPreference('automatic')} className="mt-1" />
            <span><strong className="text-sm">Automáticamente</strong><br /><span className="text-xs leading-5 text-[#716a7c]">Analizar al guardar un registro de texto.</span></span>
          </label>
          <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${preference === 'ask' ? 'border-[#7665c7] bg-[#f4f0ff]' : 'border-[#ebe5f3]'}`}>
            <input type="radio" name="ai-preference" checked={preference === 'ask'} onChange={() => setPreference('ask')} className="mt-1" />
            <span><strong className="text-sm">Preguntarme antes</strong><br /><span className="text-xs leading-5 text-[#716a7c]">Confirmar cada análisis antes de enviar el texto a la IA.</span></span>
          </label>
        </div>
      </section>

      <section className="mt-4 rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
        <h2 className="text-sm font-extrabold">Qué compartir con el análisis</h2>
        <p className="mt-2 text-xs leading-5 text-[#716a7c]">El texto que eliges analizar es la entrada principal. Estos permisos controlan información adicional.</p>

        <label className="mt-4 flex items-start gap-3 text-sm leading-5">
          <input type="checkbox" checked={shareContext} onChange={(e) => setShareContext(e.target.checked)} className="mt-1" />
          <span><strong>Contexto del caso</strong><br /><span className="text-xs text-[#716a7c]">Registros previos y datos generales cuando sean útiles para interpretar el mensaje.</span></span>
        </label>

        <label className="mt-4 flex items-start gap-3 text-sm leading-5">
          <input type="checkbox" checked={shareImages} onChange={(e) => setShareImages(e.target.checked)} className="mt-1" />
          <span><strong>Imágenes adjuntas</strong><br /><span className="text-xs text-[#716a7c]">Permiso preparado para cuando el análisis de imágenes esté habilitado.</span></span>
        </label>

        <div className="mt-4 rounded-2xl bg-[#faf8fd] p-3 text-xs leading-5 text-[#716a7c]">Audio: se conserva como evidencia, pero no se analiza con IA en este MVP.</div>
      </section>

      <section className="mt-4 rounded-[22px] bg-[#fff8eb] p-4 text-xs leading-5 text-[#746b70]">
        Lumi identifica señales y genera explicaciones; no determina delitos, culpabilidad o diagnósticos y no comparte información automáticamente con terceros.
      </section>

      {saved && <p className="mt-4 rounded-2xl bg-[#e9f7ef] p-3 text-center text-xs font-bold text-[#3d7a58]">Preferencias guardadas.</p>}
      <button type="button" onClick={saveSettings} className="mt-5 w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Guardar cambios</button>
      <button type="button" onClick={logout} className="mt-3 w-full rounded-2xl border border-[#e4dce8] bg-white px-4 py-3 text-sm font-bold text-[#8a5260]">Cerrar sesión</button>
    </AppShell>
  )
}
