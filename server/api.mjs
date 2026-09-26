import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GOOGLE_CLOUD_PROJECT || "wtcideatech2daedicion",
  location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
});

function calcularRiesgo(analisis) {
  let puntuacion = 0;
  const razones = [];

  const pesos = {
    insistencia: 1,
    control: 2,
    humillacion: 2,
    agresion: 2,
    amenaza: 3,
    hostigamiento_sexual: 3,
    stalking_digital: 3,
    sextorsion: 4,
    difusion_intima_no_consentida: 4,
    doxing: 4,
    suplantacion: 3,
    otra: 1,
  };

  for (const conducta of analisis.conductas ?? []) {
    if (conducta.detectada) {
      puntuacion += pesos[conducta.tipo] ?? 1;
      razones.push(`Conducta detectada: ${conducta.tipo}`);
    }
  }

  if (analisis.recurrencia?.detectada) {
    puntuacion += 1;
    razones.push("Existe recurrencia en la conducta");
  }

  if (analisis.escalamiento?.detectado) {
    puntuacion += 2;
    razones.push("Existe evolución o escalamiento");
  }

  const impactos = (analisis.impacto ?? []).filter(
    (impacto) => impacto.detectado
  ).length;

  if (impactos > 0) {
    puntuacion += Math.min(impactos, 3);
    razones.push(`Se reportan ${impactos} señales de posible impacto`);
  }

  let nivelAtencion = "bajo";

  if (puntuacion >= 7) {
    nivelAtencion = "alto";
  } else if (puntuacion >= 3) {
    nivelAtencion = "moderado";
  }

  let accionRecomendada =
    "Mantener registro del contexto si la situación continúa y revisar nuevas señales.";

  if (nivelAtencion === "moderado") {
    accionRecomendada =
      "Registrar la situación, preservar la evidencia y observar si la conducta continúa o escala.";
  }

  if (nivelAtencion === "alto") {
    accionRecomendada =
      "Organizar y preservar la evidencia y considerar activar apoyo de una persona de confianza o recurrir a orientación especializada.";
  }

  return {
    puntuacion,
    nivelAtencion,
    razones,
    accionRecomendada,
  };
}

app.post("/api/analyze", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || typeof texto !== "string" || !texto.trim()) {
      return res.status(400).json({
        error: "Debes enviar un texto para analizar.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
Eres el módulo de identificación de señales de LUMI.

LUMI ayuda a organizar señales dispersas relacionadas con posibles
situaciones de acoso digital para facilitar una intervención temprana.

Tu función es EXTRAER señales observables.

NO debes:
- afirmar definitivamente que existe acoso;
- diagnosticar psicológicamente;
- determinar culpabilidad;
- emitir conclusiones legales;
- inventar información que la persona no haya expresado.

Analiza:

1. CONDUCTAS OBSERVABLES:
insistencia, control, amenaza, humillación, agresión,
hostigamiento sexual, stalking digital, sextorsión,
difusión íntima no consentida, doxing, suplantación u otras.

2. RECURRENCIA:
solo si existen indicios explícitos de repetición o persistencia.

3. IMPACTO REPORTADO:
miedo, aislamiento, evitación, pérdida de interés,
problemas de concentración o cambios de rutina.
Solo identifícalo si aparece expresamente en el relato.

4. ESCALAMIENTO:
identifica si aumenta la frecuencia, presión, intrusión
o severidad de las conductas.

Contenido:
${texto}
`,

      config: {
        temperature: 0.2,

        responseMimeType: "application/json",

        responseJsonSchema: {
          type: "object",

          properties: {
            conductas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tipo: {
                    type: "string",
                    enum: [
                      "insistencia",
                      "control",
                      "amenaza",
                      "humillacion",
                      "agresion",
                      "hostigamiento_sexual",
                      "stalking_digital",
                      "sextorsion",
                      "difusion_intima_no_consentida",
                      "doxing",
                      "suplantacion",
                      "otra",
                    ],
                  },

                  detectada: {
                    type: "boolean",
                  },

                  evidencia: {
                    type: ["string", "null"],
                  },
                },

                required: ["tipo", "detectada", "evidencia"],
              },
            },

            recurrencia: {
              type: "object",
              properties: {
                detectada: {
                  type: "boolean",
                },
                evidencia: {
                  type: ["string", "null"],
                },
              },
              required: ["detectada", "evidencia"],
            },

            impacto: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tipo: {
                    type: "string",
                    enum: [
                      "miedo",
                      "aislamiento",
                      "evitacion",
                      "perdida_interes",
                      "problemas_concentracion",
                      "cambio_rutina",
                      "otro",
                    ],
                  },

                  detectado: {
                    type: "boolean",
                  },

                  evidencia: {
                    type: ["string", "null"],
                  },
                },

                required: ["tipo", "detectado", "evidencia"],
              },
            },

            escalamiento: {
              type: "object",
              properties: {
                detectado: {
                  type: "boolean",
                },

                patron: {
                  type: ["string", "null"],
                },
              },

              required: ["detectado", "patron"],
            },

            resumen: {
              type: "string",
            },
          },

          required: [
            "conductas",
            "recurrencia",
            "impacto",
            "escalamiento",
            "resumen",
          ],
        },
      },
    });

    const analisis = JSON.parse(response.text);
    const riesgo = calcularRiesgo(analisis);

    return res.json({
      ...analisis,
      riesgo,
      disclaimer:
        "LUMI identifica señales y patrones observables. No reemplaza la evaluación de profesionales de psicología, derecho u otras áreas especializadas.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "No se pudo realizar el análisis.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "LUMI AI",
  });
});

const PORT = Number(process.env.PORT || 3001);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`LUMI AI ejecutándose en puerto ${PORT}`);
});
