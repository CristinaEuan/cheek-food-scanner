const alimentos = [
  { nombre: 'manzana', calorias: 95 },
  { nombre: 'plátano', calorias: 105 },
  { nombre: 'naranja', calorias: 62 },
  { nombre: 'pizza', calorias: 285 },
  { nombre: 'hamburguesa', calorias: 540 },
  { nombre: 'ensalada', calorias: 180 },
  { nombre: 'arroz', calorias: 420 },
  { nombre: 'tacos', calorias: 350 },
  { nombre: 'yogurt', calorias: 100 },
  { nombre: 'huevos', calorias: 200 },
  { nombre: 'sandwich', calorias: 320 },
  { nombre: 'sopa', calorias: 120 },
  { nombre: 'pasta', calorias: 380 },
  { nombre: 'pollo', calorias: 250 },
  { nombre: 'fresas', calorias: 50 },
  { nombre: 'quesadilla', calorias: 310 },
  { nombre: 'enchiladas', calorias: 390 },
  { nombre: 'tamales', calorias: 285 },
  { nombre: 'chilaquiles', calorias: 360 },
  { nombre: 'torta', calorias: 450 },
  { nombre: 'ajo', calorias: 15 },
  { nombre: 'zanahoria', calorias: 41 },
  { nombre: 'brócoli', calorias: 55 },
  { nombre: 'aguacate', calorias: 160 },
  { nombre: 'mango', calorias: 99 },
]

export function analizarImagen(nombreAlimento) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nombre = nombreAlimento.toLowerCase().trim()
      const encontrado = alimentos.find(a => nombre.includes(a.nombre) || a.nombre.includes(nombre))
      if (encontrado) {
        resolve({ nombre: encontrado.nombre, calorias: encontrado.calorias, exito: true })
      } else {
        resolve({ nombre: nombreAlimento, calorias: 150, exito: true })
      }
    }, 1000)
  })
}