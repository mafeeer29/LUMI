import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { createCase, type CaseContext } from '../lib/lumiStore'

export default function NewCase() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [context, setContext] = useState<CaseContext>('universidad')
  const [personRelation, setPersonRelation] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!title.trim()) return
    createCase({ title: title.trim(), context, personRelation: personRelation.trim(), notes: notes.trim() })
    navigate('/app/caso')
  }

  return (
    <AppShell title="Crear un caso">
      <p className="-mt-2 mb-6 text-sm leading-6 text-[#716a7c]">
        Registra solo la información que quieras organizar. Puedes añadir interacciones después.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Nombre del caso</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ej. Situación con compañero de universidad" className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Contexto</span>
          <select value={context} onChange={(e) => setContext(e.target.value as CaseContext)} className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none">
            <option value="universidad">Universidad</option>
            <option value="trabajo">Trabajo</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Relación con la persona</span>
          <input value={personRelation} onChange={(e) => setPersonRelation(e.target.value)} placeholder="Ej. compañero, expareja, cliente..." className="w-full rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#8b819d]">Nota inicial opcional</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Contexto que te ayude a recordar qué está ocurriendo." className="w-full resize-none rounded-2xl border border-[#ebe5f3] bg-white px-4 py-3 text-sm outline-none focus:border-[#9b89dd]" />
        </label>

        <button className="w-full rounded-2xl bg-[#6755c8] px-4 py-3.5 text-sm font-bold text-white">Crear caso</button>
      </form>
    </AppShell>
  )
}
