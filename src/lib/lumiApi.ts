export type LumiAnalysis = {
  conductas: {
    tipo: string
    detectada: boolean
    evidencia: string | null
  }[]

  recurrencia: {
    detectada: boolean
    evidencia: string | null
  }

  impacto: {
    tipo: string
    detectado: boolean
    evidencia: string | null
  }[]

  escalamiento: {
    detectado: boolean
    patron: string | null
  }

  resumen: string

  riesgo: {
    puntuacion: number
    nivelAtencion: "bajo" | "moderado" | "alto"
    razones: string[]
    accionRecomendada: string
  }

  disclaimer: string
}

const API_URL = (import.meta.env.VITE_LUMI_API_URL || "http://localhost:3001").replace(/\/$/, "")

export async function analizarConLumi(
  texto: string
): Promise<LumiAnalysis> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      texto,
    }),
  })

  if (!response.ok) {
    throw new Error("No se pudo analizar el contenido")
  }

  return response.json()
}
