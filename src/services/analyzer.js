const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const alimentos = [
  { nombre: 'Manzana', calorias: 95 },
  { nombre: 'Plátano', calorias: 105 },
  { nombre: 'Naranja', calorias: 62 },
  { nombre: 'Pizza (porción)', calorias: 285 },
  { nombre: 'Hamburguesa', calorias: 540 },
  { nombre: 'Ensalada César', calorias: 180 },
  { nombre: 'Arroz con pollo', calorias: 420 },
  { nombre: 'Tacos (2 piezas)', calorias: 350 },
  { nombre: 'Yogurt natural', calorias: 100 },
  { nombre: 'Huevos revueltos', calorias: 200 },
  { nombre: 'Sandwich de jamón', calorias: 320 },
  { nombre: 'Sopa de verduras', calorias: 120 },
  { nombre: 'Pasta con salsa', calorias: 380 },
  { nombre: 'Pollo a la plancha', calorias: 250 },
  { nombre: 'Fresas', calorias: 50 },
  { nombre: 'Quesadilla', calorias: 310 },
  { nombre: 'Enchiladas', calorias: 390 },
  { nombre: 'Tamales', calorias: 285 },
  { nombre: 'Chilaquiles', calorias: 360 },
  { nombre: 'Torta de jamón', calorias: 450 },
]

async function analizarConGemini(imagenBase64) {
  const base64Data = imagenBase64.split(',')[1]
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Analiza esta imagen de alimento y responde ÚNICAMENTE en este formato JSON exacto, sin texto extra:
{
  "nombre": "nombre del alimento en español",
  "calorias": número estimado de calorías por porción estándar,
  "encontrado": true o false
}
Si no hay alimento visible responde con encontrado: false y nombre: "No identificado" y calorias: 0`
            },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Data
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 256,
        }
      })
    }
  )
  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error?.message || 'Error Gemini')
  }
  const data = await response.json()
  const texto = data.candidates[0].content.parts[0].text
  const limpio = texto.replace(/```json|```/g, '').trim()
  return JSON.parse(limpio)
}

function analizarConSimulacion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = alimentos[Math.floor(Math.random() * alimentos.length)]
      resolve({
        nombre: resultado.nombre,
        calorias: resultado.calorias,
        encontrado: true
      })
    }, 2000)
  })
}

export async function analizarImagen(imagenBase64) {
  if (GEMINI_API_KEY) {
    try {
      const resultado = await analizarConGemini(imagenBase64)
      return {
        nombre: resultado.nombre,
        calorias: resultado.calorias,
        exito: resultado.encontrado
      }
    } catch {
      // Si Gemini falla, cae a simulación
      const resultado = await analizarConSimulacion()
      return { ...resultado, exito: true }
    }
  } else {
    const resultado = await analizarConSimulacion()
    return { ...resultado, exito: true }
  }
}