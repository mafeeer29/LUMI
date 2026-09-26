import { useEffect, useState } from 'react'
import { formatEvidenceSize, getEvidenceBlob } from '../lib/evidenceStore'
import type { LumiAttachmentMeta } from '../lib/lumiStore'

export default function EvidencePreview({ attachment }: { attachment: LumiAttachmentMeta }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false

    getEvidenceBlob(attachment.id)
      .then((blob) => {
        if (!blob || cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      })
      .catch(() => setUrl(null))

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [attachment.id])

  const isImage = attachment.type.startsWith('image/')
  const isAudio = attachment.type.startsWith('audio/')

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ece5f3] bg-[#fcfbff]">
      {isImage && url && (
        <img src={url} alt={`Evidencia ${attachment.name}`} className="max-h-56 w-full object-cover" />
      )}

      {isAudio && url && (
        <div className="p-3">
          <audio controls src={url} className="w-full" />
        </div>
      )}

      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold text-[#4a4456]">{attachment.name}</p>
          <p className="text-[9px] text-[#9992a2]">{formatEvidenceSize(attachment.size)}</p>
        </div>
        {url && (
          <a href={url} download={attachment.name} className="shrink-0 text-[10px] font-bold text-[#6a57c3]">
            Abrir
          </a>
        )}
      </div>
    </div>
  )
}
