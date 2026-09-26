import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { getPrivacySettings, logoutLocalUser } from '../lib/accountStore'

export default function PrivacyAI() {
  const navigate = useNavigate()
  const privacy = getPrivacySettings()

  function logout() {
    logoutLocalUser()
    navigate('/login', { replace: true })
  }

  return (
    <AppShell title="Privacidad e IA">
      <p className="-mt-2 mb-5 text-sm leading-6 text-[#716a7c]">Consulta cómo Lumi usa la IA y recuerda que solo analiza la información que decides registrar en la plataforma.</p>

      <section className="rounded-[26px] bg-white p-5 shadow-sm ring-1 ring-[#eee8f5]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#81769d]">Análisis con IA</p>
            <h2 className="mt-1 text-base font-extrabold text-[#312b49]">{privacy.aiConsent ? 'Autorizado' : 'Pendiente'}</h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${privacy.aiConsent ? 'bg-[#e9f7ef] text-[#3d7a58]' : 'bg-[#fff3e6] text-[#9a6a2f]'}`}>
            {privacy.aiConsent ? '✓ Activo' : 'Pendiente'}
          </span>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#716a7c]">Al comenzar autorizaste a Lumi a analizar con IA la información y evidencias que tú decidas compartir dentro de la app. Lumi usa ese análisis para identificar señales y contexto, pero no determina delitos, culpabilidad ni diagnósticos.</p>
      </section>

      <section className="mt-4 rounded-[26px] bg-[#f2edff] p-5 ring-1 ring-[#e2d9ff]">
        <h2 className="text-sm font-extrabold text-[#3d3657]">Tú sigues teniendo el control</h2>
        <div className="mt-3 space-y-2 text-xs leading-5 text-[#625b73]">
          <p>• Decides qué texto, imágenes o audios registrar.</p>
          <p>• Lumi no comparte automáticamente información con tus contactos.</p>
          <p>• Antes de compartir un resumen, puedes revisar qué incluye.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[22px] bg-[#fff8eb] p-4 text-xs leading-5 text-[#746b70]">
        Para este MVP, el análisis con IA forma parte del funcionamiento principal de Lumi. Si no deseas continuar usando la plataforma, puedes cerrar sesión.
      </section>

      <button type="button" onClick={logout} className="mt-5 w-full rounded-2xl border border-[#e4dce8] bg-white px-4 py-3 text-sm font-bold text-[#8a5260]">Cerrar sesión</button>
    </AppShell>
  )
}
