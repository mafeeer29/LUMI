# LUMI 🌙

**LUMI** es un prototipo de intervención temprana que ayuda a organizar señales relacionadas con posibles situaciones de acoso digital, registrar evidencia, observar su evolución y preparar información para solicitar apoyo de manera informada.

> LUMI identifica y organiza señales observables. No determina culpabilidad, no realiza diagnósticos psicológicos y no reemplaza la evaluación de profesionales de psicología, derecho u otras áreas especializadas.

## ✨ ¿Qué problema aborda?

Las situaciones de acoso digital pueden aparecer como eventos aislados en distintos canales: mensajes insistentes, amenazas, control, humillación, suplantación, difusión de información o cambios progresivos en la conducta de la persona afectada.

LUMI busca reunir estas señales en un solo espacio para facilitar su seguimiento y permitir que la persona tenga mayor claridad sobre lo que está ocurriendo y sobre la información que desea conservar o compartir.

## 🧩 Funcionalidades del MVP

- Registro, inicio de sesión y sesión local para el prototipo.
- Consentimiento informado antes de utilizar el análisis con IA.
- Creación y seguimiento de casos.
- Registro cronológico de interacciones.
- Adjuntos y evidencia asociada a cada registro.
- Análisis de texto con Gemini mediante Vertex AI.
- Identificación de señales observables como insistencia, control, amenazas, humillación, stalking digital, sextorsión, doxing, suplantación y otras.
- Detección de recurrencia y posibles señales de escalamiento cuando están explícitamente presentes en el relato.
- Check-in de impacto en estudios, trabajo, rutinas, relaciones y percepción de seguridad.
- Nivel de atención calculado mediante reglas determinísticas y explicables.
- Línea de tiempo del caso.
- Generación de un expediente digital organizado para impresión o guardado como PDF.
- Configuración de contactos de confianza y selección de la información que la persona desea preparar para compartir.
- Configuración de privacidad y preferencias relacionadas con el uso de IA.

## 🤖 ¿Cómo utiliza IA?

LUMI utiliza **Gemini 2.5 Flash a través de Vertex AI** para extraer señales observables del texto ingresado por la persona.

La IA no decide por sí sola el nivel de atención. El flujo combina:

1. **Extracción semántica con Gemini**: identifica conductas, recurrencia, impacto reportado y posibles señales de escalamiento sin inventar información no mencionada.
2. **Reglas determinísticas**: asignan pesos a las señales detectadas y calculan un nivel de atención (`bajo`, `moderado` o `alto`).
3. **Explicabilidad**: el sistema muestra las señales encontradas, las razones consideradas y una recomendación general de siguiente paso.

El audio puede registrarse como evidencia dentro del MVP, pero no es analizado automáticamente por la IA.

## 🧪 Evaluación del módulo de IA

Para evaluar el comportamiento del análisis se preparó un script de evaluación utilizando muestras etiquetadas del **CorpusBullying**, con textos en español y clasificación binaria.

El dataset se utiliza para **evaluar el comportamiento del modelo y del prompting**, no para entrenar ni realizar fine-tuning de Gemini.

El script permite calcular métricas como:

- Accuracy
- Precision
- Recall
- F1-score
- Verdaderos positivos / negativos
- Falsos positivos / negativos

Archivo de evaluación:

```text
server/evaluateDataset.mjs
```

## 🛠️ Stack tecnológico

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend e IA

- Node.js
- Express
- Google Gen AI SDK
- Vertex AI
- Gemini 2.5 Flash

### Persistencia del MVP

El prototipo utiliza almacenamiento local del navegador (`localStorage`) para mantener la sesión y los datos del MVP. No debe considerarse una arquitectura de persistencia final para producción.

## 📁 Estructura principal

```text
LUMI/
├── server/
│   ├── api.mjs
│   ├── evaluateDataset.mjs
│   └── testGemini.mjs
├── src/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   └── App.tsx
├── public/
└── package.json
```

## 🔐 Privacidad y uso responsable

LUMI fue diseñado bajo un enfoque de control por parte de la persona usuaria:

- el análisis con IA requiere autorización;
- no se realizan envíos automáticos a contactos de confianza;
- la persona decide qué información desea conservar y preparar para compartir;
- el sistema evita conclusiones legales, diagnósticos o afirmaciones definitivas sobre una situación;
- las recomendaciones tienen carácter orientativo.

## 👩‍💻 Autores

- **Maria Fernanda Evangelista Aguedo**  
  Ingeniería de Telecomunicaciones — Universidad Nacional de Ingeniería, Perú

- **Sebastian Alexis Euribe Zambrano**  
  Ingeniería de Telecomunicaciones — Universidad Nacional de Ingeniería, Perú

- **Juan Carlos Pizarro Esperta**  
  Ingeniería de Telecomunicaciones — Universidad Nacional de Ingeniería, Perú

- **Gabriela Fernanda Peñaranda Reyes**  
  Ingeniería de Ciberseguridad — Universidad Nacional de Ingeniería, Perú

---

Si estás revisando este repositorio como parte de una demo, comienza por `src/pages/RegisterInteraction.tsx`, `src/pages/CaseDetail.tsx`, `src/pages/ImpactCheckin.tsx`, `src/pages/Timeline.tsx` y `server/api.mjs` para seguir el flujo principal de LUMI.
