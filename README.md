# Che-Ek Food Scanner

Aplicación web que permite al usuario tomar una fotografía de un alimento usando la cámara de su dispositivo, identificarlo y estimar sus kilocalorías. Incluye historial de análisis con persistencia local y login de usuario.

## Stack utilizado

- **Frontend:** React 18 + Vite
- **Navegación:** React Router DOM
- **Análisis de imagen:** Gemini Vision API (con fallback a simulación local)
- **Persistencia:** localStorage
- **Autenticación:** Login local con usuarios predefinidos
- **Deploy:** Vercel

## Demo en línea

🌐 https://cheek-food-scanner.vercel.app

Usuario: `admin` | Contraseña: `1234`

## Requisitos previos

- Node.js v18 o superior
- npm v8 o superior
- Google Chrome (recomendado para acceso a cámara en localhost)

## Instalación

```bash
git clone https://github.com/CristinaEuan/cheek-food-scanner.git
cd cheek-food-scanner
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

Puedes obtener una API key gratuita en https://aistudio.google.com

> Si no configuras la key, la app funciona automáticamente con simulación local.

## Ejecución local

```bash
npm run dev
```

Abre http://localhost:5173 en Chrome.

### Configuración de cámara en localhost

La cámara requiere contexto seguro (HTTPS). Para habilitarla en localhost con Chrome:

1. Ve a `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Agrega `http://localhost:5173`
3. Cambia a "Habilitado" y reinicia Chrome

> En la demo de Vercel la cámara funciona directo sin configuración adicional.

## Credenciales de acceso

| Usuario | Contraseña |
|---------|------------|
| admin   | 1234       |
| cheek   | cheek123   |

## Cómo usar la aplicación

1. Inicia sesión con las credenciales
2. Haz click en **"Activar cámara"** y permite el acceso
3. Toma una foto de tu alimento
4. Confirma la imagen o repite la captura
5. Haz click en **"Analizar"**
6. Ve el resultado: nombre, calorías, fecha y hora
7. El resultado se guarda automáticamente en el historial
8. Consulta tu historial en la sección **"Historial"**

## Cómo funciona la identificación de alimentos

La app usa **Gemini Vision API** de Google. Se envía la imagen capturada en base64 y Gemini responde con el nombre del alimento en español y sus calorías estimadas en formato JSON.

Si no se configura la API key o Gemini falla por cualquier razón, la app usa una **simulación local** que selecciona un alimento aleatorio de una lista de 20 alimentos comunes mexicanos e internacionales.

**Para llevar a producción sin simulación:**
Reemplazar la función `analizarConSimulacion()` en `src/services/analyzer.js` con una llamada real a Gemini Vision API con una key válida con billing activado.

## Cómo se calculan las kilocalorías

Con Gemini: las calorías son estimadas por la IA basándose en una porción estándar del alimento detectado.

Con simulación: se usan valores nutricionales aproximados de referencia por porción estándar.

## Cómo funciona el historial

El historial se guarda en **localStorage** del navegador. Persiste aunque el usuario cambie de pantalla o cierre y vuelva a abrir la aplicación. Cada registro incluye imagen en miniatura, nombre del alimento, calorías estimadas, fecha y hora del análisis. El usuario puede eliminar registros individuales o limpiar todo el historial.

## Manejo de errores

| Situación | Comportamiento |
|-----------|---------------|
| Usuario rechaza cámara | Mensaje: "Permiso de cámara denegado" |
| No hay cámara disponible | Mensaje: "No se encontró ninguna cámara" |
| Error al acceder a cámara | Mensaje: "Error al acceder a la cámara" |
| Gemini falla o sin conexión | Cae automáticamente a simulación local |
| Error al guardar historial | Se maneja con try/catch sin romper la app |
| Error al leer historial | Inicia con historial vacío sin romper la app |

## Limitaciones

- Sin API key de Gemini con billing, el análisis es simulado
- La cámara en localhost requiere configuración adicional en Chrome
- El historial se pierde si se limpia el localStorage manualmente
- La simulación no identifica el alimento real de la imagen

## Mejoras futuras

- Integración completa con Gemini Vision con billing activado
- Identificación de múltiples alimentos en una imagen
- Edición manual del nombre y calorías detectadas
- Exportar historial a PDF o CSV
- Autenticación con base de datos real (Firebase, Supabase)
- Pruebas unitarias con Vitest
- PWA para instalación en móvil