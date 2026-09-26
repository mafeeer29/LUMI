import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getNextSetupRoute, loginLocalUser } from '../lib/accountStore'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password.length < 6 || !loginLocalUser(email)) {
      setError('No encontramos una cuenta local con ese correo. Para la demo, usa el correo con el que te registraste.')
      return
    }
    navigate(getNextSetupRoute())
  }

  return (
    <div className="min-h-screen bg-[#fbf9ff] px-5 py-8 text-[#302d58]">
      <div className="mx-auto w-full max-w-[460px]">
        <Link to="/" className="text-sm font-bold text-[#6755c8]">← Volver</Link>
        <div className="mt-8 rounded-[30px] bg-white p-6 shadow-sm ring-1 ring-[#eee8f5]">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#81769d]">Sesión local</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Inicia sesión</h1>
          <p className="mt-3 text-sm leading-6 text-[#716a7c]">Este acceso es solo para el MVP y funciona en este navegador.</p>

          <div className="mt-4 rounded-2xl bg-[#f2edff] p-4 text-xs leading-5 text-[#5e5675]">
            <strong>Lumi utiliza IA como parte de su análisis.</strong> Al entrar se respetará tu configuración de consentimiento y de cuándo analizar. Si todavía no la configuraste, te llevaremos a ese paso antes de ingresar al dashboard.
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-bold">Correo
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#ddd5eb] px-4 py-3 font-normal outline-none focus:border-[#7665c7]" placeholder="tu@correo.com" />
            </label>
            <label className="block text-sm font-bold">Contraseña
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#ddd5eb] px-4 py-3 font-normal outline-none focus:border-[#7665c7]" placeholder="Tu contraseña" />
            </label>
            {error && <p className="rounded-2xl bg-[#fff2f2] p-3 text-xs text-[#9b4d56]">{error}</p>}
            <button className="w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Entrar</button>
          </form>

          <p className="mt-5 text-center text-xs text-[#716a7c]">¿Primera vez? <Link to="/registro" className="font-bold text-[#6755c8]">Crear cuenta</Link></p>
        </div>
      </div>
    </div>
  )
}
