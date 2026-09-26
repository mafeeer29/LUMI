import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "wtcideatech2daedicion",
  location: "us-central1",
});

const mensaje = `
Te dije que me respondas.
Si sigues ignorándome voy a publicar las fotos que me mandaste.
Sé dónde estudias y voy a esperarte afuera.
`;

function calcularRiesgo(analisis) {
  let puntuacion = 0;
  const razones = [];

  // 1. Severidad de conductas
  const pesos = {
    insistencia: 1,
    control: 2,
    humillacion: 2,
    agresion: 2,
    amenaza: 3,
    hostigamiento_sexual: 3,
    otra: 1,
  };

  for (const conducta of analisis.conductas) {
    if (conducta.detectada) {
      puntuacion += pesos[conducta.tipo] ?? 1;
      razones.push(`Conducta detectada: ${conducta.tipo}`);
    }
  }

  // 2. Recurrencia
  if (analisis.recurrencia.detectada) {
    puntuacion += 1;
    razones.push("Existe recurrencia en la conducta");
  }

  // 3. Evolución / escalamiento
  if (analisis.escalamiento.detectado) {
    puntuacion += 2;
    razones.push("Existe evolución o escalamiento");
  }

  // 4. Impacto reportado
  const impactosDetectados = analisis.impacto.filter(
    (i) => i.detectado
  ).length;

  if (impactosDetectados > 0) {
    puntuacion += Math.min(impactosDetectados, 3);
    razones.push(
      `Se reportan ${impactosDetectados} señales de posible impacto`
    );
  }

  let nivelAtencion;

  if (puntuacion >= 7) {
    nivelAtencion = "alto";
  } else if (puntuacion >= 3) {
    nivelAtencion = "moderado";
  } else {
    nivelAtencion = "bajo";
  }

  let accionRecomendada;

  if (nivelAtencion === "alto") {
    accionRecomendada =
      "Organizar y preservar la evidencia y considerar activar apoyo de una persona de confianza o recurrir a orientación especializada.";
  } else if (nivelAtencion === "moderado") {
    accionRecomendada =
      "Registrar la situación, preservar la evidencia y observar si la conducta continúa o escala.";
  } else {
    accionRecomendada =
      "Mantener registro del contexto si la situación continúa y revisar nuevas señales.";
  }

  return {
    puntuacion,
    nivelAtencion,
    razones,
    accionRecomendada,
  };
}

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
Eres el módulo de identificación de señales de LUMI.

LUMI busca organizar señales dispersas relacionadas con posibles
situaciones de acoso digital para facilitar una intervención temprana.

Tu función es EXTRAER señales observables.

NO debes:
- determinar definitivamente que existe acoso;
- diagnosticar condiciones psicológicas;
- determinar culpabilidad;
- emitir conclusiones legales;
- inventar impacto que la persona no haya expresado.

Analiza:

1. CONDUCTAS observables:
   insistencia, control, amenaza, humillación,
   agresión, hostigamiento sexual u otras.

2. RECURRENCIA:
   identifica si existen indicios explícitos de repetición
   o persistencia.

3. IMPACTO REPORTADO:
   miedo, aislamiento, evitación, pérdida de interés,
   problemas de concentración o cambios de rutina.
   Solo márcalo si aparece explícitamente en el relato.

4. ESCALAMIENTO:
   identifica si las conductas aumentan en frecuencia,
   presión, intrusión o severidad.

Contenido:
${mensaje}
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
                    "otra"
                  ]
                },
                detectada: {
                  type: "boolean"
                },
                evidencia: {
                  type: ["string", "null"]
                }
              },
              required: ["tipo", "detectada", "evidencia"]
            }
          },

          recurrencia: {
            type: "object",
            properties: {
              detectada: {
                type: "boolean"
              },
              evidencia: {
                type: ["string", "null"]
              }
            },
            required: ["detectada", "evidencia"]
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
                    "otro"
                  ]
                },
                detectado: {
                  type: "boolean"
                },
                evidencia: {
                  type: ["string", "null"]
                }
              },
              required: ["tipo", "detectado", "evidencia"]
            }
          },

          escalamiento: {
            type: "object",
            properties: {
              detectado: {
                type: "boolean"
              },
              patron: {
                type: ["string", "null"]
              }
            },
            required: ["detectado", "patron"]
          },

          resumen: {
            type: "string"
          }
        },

        required: [
          "conductas",
          "recurrencia",
          "impacto",
          "escalamiento",
          "resumen"
        ]
      }
    }
  });

  const analisisIA = JSON.parse(response.text);

  const riesgo = calcularRiesgo(analisisIA);

  const resultadoLumi = {
    ...analisisIA,
    riesgo,
  };

  console.log(JSON.stringify(resultadoLumi, null, 2));
}

main().catch(console.error);