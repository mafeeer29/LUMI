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

export async function analizarConLumi(
  texto: string
): Promise<LumiAnalysis> {
  const response = await fetch("http://localhost:3001/api/analyze", {
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