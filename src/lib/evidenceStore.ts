export interface StoredEvidenceMeta {
  id: string
  name: string
  type: string
  size: number
}

interface StoredEvidenceRecord extends StoredEvidenceMeta {
  blob: Blob
}

const DB_NAME = 'lumi_evidence_db'
const STORE_NAME = 'files'
const DB_VERSION = 1

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveEvidence(file: File): Promise<StoredEvidenceMeta> {
  const db = await openDb()
  const id = `evidence_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const record: StoredEvidenceRecord = {
    id,
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    blob: file,
  }

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put(record)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })

  db.close()
  return { id, name: record.name, type: record.type, size: record.size }
}

export async function getEvidenceBlob(id: string): Promise<Blob | null> {
  const db = await openDb()

  const record = await new Promise<StoredEvidenceRecord | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const request = tx.objectStore(STORE_NAME).get(id)
    request.onsuccess = () => resolve(request.result as StoredEvidenceRecord | undefined)
    request.onerror = () => reject(request.error)
  })

  db.close()
  return record?.blob ?? null
}

export function formatEvidenceSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
