import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { formatEvidenceSize, saveEvidence } from '../lib/evidenceStore'
import { analizarConLumi } from '../lib/lumiApi'
import { addInteraction, getActiveCase, type InteractionType, type LumiAttachmentMeta } from '../lib/lumiStore'

const MAX_FILES = 4
const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function RegisterInteraction() {
  const navigate = useNavigate()
  const activeCase = useMemo(() => getActiveCase(), [])
  const [type, setType] = useState<InteractionType>('mensaje')
  const [channel, setChannel] = useState('Mensajería')
  const [description, setDescription] = useState('')
  const [attempts, setAttempts] = useState(1)
  const [fromNewAccount, setFromNewAccount] = useState(false)
  const [intimidatingLanguage, setIntimidatingLanguage] = useState(false)
  const [occurredAt, setOccurredAt] = useState(() => new Date().toISOString().slice(0, 16))
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  if (!activeCase) {
    return (
      <AppShell title="Registrar interacción">
        <p className="text-sm text-[#716a7c]">Primero crea un caso para poder registrar interacciones.</p>
        <button onClick={() => navigate('/app/nuevo-caso')} className="mt-5 rounded-2xl bg-[#6755c8] px-4 py-3 text-sm font-bold text-white">Crear caso</button>
      </AppShell>
    )
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? [])
    setFileError('')

    const unsupported = selected.find((file) => !file.type.startsWith('image/') && !file.type.startsWith('audio/'))
    if (unsupported) {
      setFileError('Por ahora Lumi admite imágenes y audios.')
      event.target.value = ''
      return
    }

    const oversized = selected.find((file) => file.size > MAX_FILE_SIZE)
    if (oversized) {
      setFileError(`Cada archivo debe pesar máximo ${formatEvidenceSize(MAX_FILE_SIZE)}.`)
      event.target.value = ''
      return
    }

    if (selected.length > MAX_FILES) {
      setFileError(`Puedes adjuntar hasta ${MAX_FILES} archivos por interacción.`)
      event.target.value = ''
      return
    }

    setFiles(selected)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setFileError('')
    setStatusMessage('Guardando evidencia...')

    const cleanDescription = description.trim() || 'Interacción registrada.'

    try {
      const attachments: LumiAttachmentMeta[] = []
      for (const file of files) {
        attachments.push(await saveEvidence(file))
      }

      let analysis
      try {
        setStatusMessage('Lumi está analizando las señales...')
        analysis = await analizarConLumi(cleanDescription)
      } catch {
        setStatusMessage('No se pudo completar el análisis IA. Guardaremos el registro igualmente.')
      }

      addInteraction({
        caseId: activeCase.id,
        type,
        channel: channel.trim(),
        description: cleanDescription,
        occurredAt: new Date(occurredAt).toISOString(),
        attempts: Math.max(1, attempts),
        fromNewAccount,
        intimidatingLanguage,
        attachments,
        analysis,
      })

      navigate('/app/caso')
    } catch {
      setFileError('No pudimos guardar los adjuntos. Intenta nuevamente o registra la interacción sin archivos.')
      setStatusMessage('')
      setSaving(false)
    }
  }

  return (
    <AppShell title="Registrar interacción">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Añade hechos observables y, si quieres, adjunta capturas o audios. Lumi organiza patrones; no determina culpabilidad ni delitos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Tipo</span>
          <select value={type} onChange={(e) => setType(e.target.value as InteractionType)} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm">
            <option value="mensaje">Mensaje</option>
            <option value="llamada">Llamada</option>
            <option value="cuenta_nueva">Contacto desde otra cuenta</option>
            <option value="presencial">Situación presencial</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Canal</span>
          <input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="WhatsApp, llamadas, Instagram..." className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Fecha y hora</span>
          <input type="datetime-local" value={occurredAt} onChange={(e) => setOccurredAt(e.target.value)} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Qué ocurrió</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe brevemente lo que pasó." className="w-full resize-none rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Cantidad de intentos</span>
          <input type="number" min={1} value={attempts} onChange={(e) => setAttempts(Number(e.target.value))} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm" />
        </label>

        <div className="rounded-[22px] border border-dashed border-[#d9cfee] bg-[#faf8ff] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#81759a]">Evidencia opcional</p>
              <p className="mt-1 text-xs leading-5 text-[#77707f]">Adjunta capturas o audios. Máximo {MAX_FILES} archivos de hasta 10 MB cada uno.</p>
            </div>
            <span className="text-xl" aria-hidden="true">＋</span>
          </div>

          <label className="mt-3 block cursor-pointer rounded-2xl bg-white px-4 py-3 text-center text-xs font-bold text-[#6655b6] shadow-sm">
            Seleccionar archivos
            <input type="file" accept="image/*,audio/*" multiple onChange={handleFiles} className="sr-only" />
          </label>

          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file) => (
                <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold text-[#4a4456]">{file.name}</p>
                    <p className="text-[9px] text-[#9992a2]">{file.type.startsWith('audio/') ? 'Audio' : 'Imagen'} · {formatEvidenceSize(file.size)}</p>
                  </div>
                  <button type="button" onClick={() => setFiles((current) => current.filter((item) => item !== file))} className="text-[10px] font-bold text-[#b46b75]">Quitar</button>
                </div>
              ))}
            </div>
          )}

          <p className="mt-3 text-[10px] leading-4 text-[#9a93a2]">
            En este prototipo los archivos quedan guardados localmente en este dispositivo. No se envían automáticamente a terceros.
          </p>
          {fileError && <p className="mt-2 text-[11px] font-semibold text-[#b85f6c]">{fileError}</p>}
        </div>

        <div className="space-y-3 rounded-2xl bg-white p-4">
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={fromNewAccount} onChange={(e) => setFromNewAccount(e.target.checked)} className="mt-1" />
            <span>El contacto llegó desde otra cuenta, número o canal.</span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={intimidatingLanguage} onChange={(e) => setIntimidatingLanguage(e.target.checked)} className="mt-1" />
            <span>El mensaje contenía lenguaje que percibí como intimidatorio, coercitivo o amenazante.</span>
          </label>
        </div>

        {statusMessage && <p className="rounded-2xl bg-[#f2edff] p-3 text-center text-xs font-semibold text-[#6655b6]">{statusMessage}</p>}

        <button disabled={saving} className="w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white disabled:opacity-60">
          {saving ? 'Guardando y analizando...' : 'Guardar interacción'}
        </button>
      </form>
    </AppShell>
  )
}
