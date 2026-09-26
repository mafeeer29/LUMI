import fs from "fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project: "wtcideatech2daedicion",
  location: "us-central1",
});

const raw = fs.readFileSync("data/CorpusBullying.csv", "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);

const header = lines[0].split(";");

const idIndex = header.indexOf("ID");
const textIndex = header.indexOf("SpanishTweet");
const labelIndex = header.indexOf("Label");

const rows = lines.slice(1).map((line) => {
  const parts = line.split(";");

  return {
    id: parts[idIndex],
    text: parts[textIndex],
    label: Number(parts[labelIndex]),
  };
});

const positivos = rows.filter((r) => r.label === 1).slice(0, 10);
const negativos = rows.filter((r) => r.label === 0).slice(0, 10);

const muestra = [...positivos, ...negativos];

async function analizarTexto(texto) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: `
Analiza el siguiente texto para LUMI.

Tu tarea es determinar si el fragmento contiene evidencia suficiente
de una conducta compatible con bullying o cyberbullying.

IMPORTANTE:

No marques un caso como positivo únicamente porque exista:
- lenguaje vulgar,
- una opinión ofensiva,
- sarcasmo,
- una crítica,
- una discusión,
- una expresión discriminatoria aislada,
- o un comentario desagradable.

Para marcar detectado = true debe existir al menos una señal clara
de agresión dirigida, humillación, amenaza, intimidación,
hostigamiento, acoso o ataque hacia una persona o grupo.

No inventes:
- recurrencia,
- intención,
- relación entre las personas,
- contexto previo,
- desequilibrio de poder.

Si el texto es ambiguo o no existe evidencia suficiente,
marca detectado = false.

No realices diagnósticos psicológicos ni conclusiones legales.

Texto:
${texto}
`,

    config: {
      temperature: 0.1,

      responseMimeType: "application/json",

      responseJsonSchema: {
        type: "object",
        properties: {
          detectado: {
            type: "boolean"
          },
          explicacion: {
            type: "string"
          }
        },
        required: ["detectado", "explicacion"]
      }
    }
  });

  return JSON.parse(response.text);
}

async function main() {
  const resultados = [];

  for (let i = 0; i < muestra.length; i++) {
    const caso = muestra[i];

    console.log(
      `Analizando ${i + 1}/${muestra.length} - etiqueta real: ${caso.label}`
    );

    try {
      const analisis = await analizarTexto(caso.text);

      const prediccion = analisis.detectado ? 1 : 0;

      resultados.push({
        id: caso.id,
        texto: caso.text,
        etiqueta_real: caso.label,
        prediccion_lumi: prediccion,
        correcto: prediccion === caso.label,
        explicacion: analisis.explicacion
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error analizando caso:", caso.id, error.message);
    }
  }

  fs.writeFileSync(
    "data/resultados_lumi.json",
    JSON.stringify(resultados, null, 2)
  );

  let vp = 0;
  let vn = 0;
  let fp = 0;
  let fn = 0;

  for (const r of resultados) {
    if (r.etiqueta_real === 1 && r.prediccion_lumi === 1) vp++;
    if (r.etiqueta_real === 0 && r.prediccion_lumi === 0) vn++;
    if (r.etiqueta_real === 0 && r.prediccion_lumi === 1) fp++;
    if (r.etiqueta_real === 1 && r.prediccion_lumi === 0) fn++;
  }

  const accuracy = (vp + vn) / resultados.length;
  const precision = vp + fp === 0 ? 0 : vp / (vp + fp);
  const recall = vp + fn === 0 ? 0 : vp / (vp + fn);
  const f1 =
    precision + recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);

  console.log("\nRESULTADOS LUMI");
  console.log("----------------");
  console.log("VP:", vp);
  console.log("VN:", vn);
  console.log("FP:", fp);
  console.log("FN:", fn);
  console.log("Accuracy:", accuracy.toFixed(3));
  console.log("Precision:", precision.toFixed(3));
  console.log("Recall:", recall.toFixed(3));
  console.log("F1:", f1.toFixed(3));

  console.log("\nResultados guardados en data/resultados_lumi.json");
}

main().catch(console.error);