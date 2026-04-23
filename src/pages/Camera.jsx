import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { analizarImagen } from '../services/analyzer'
import { useHistory } from '../context/HistoryContext'

function Camera() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [foto, setFoto] = useState(null)
  const [camaraActiva, setCamaraActiva] = useState(false)
  const [analizando, setAnalizando] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { addEntry } = useHistory()

  const activarCamara = useCallback(async () => {
    setError('')
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      setCamaraActiva(true)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
        }
      }, 100)
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('❌ Permiso de cámara denegado. Por favor permite el acceso en tu navegador.')
      } else if (err.name === 'NotFoundError') {
        setError('❌ No se encontró ninguna cámara en este dispositivo.')
      } else {
        setError('❌ Error al acceder a la cámara. Intenta de nuevo.')
      }
    }
  }, [])

  const tomarFoto = useCallback(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    const imagen = canvas.toDataURL('image/jpeg')
    setFoto(imagen)
    stream.getTracks().forEach(track => track.stop())
    setCamaraActiva(false)
  }, [stream])

  const repetirFoto = useCallback(() => {
    setFoto(null)
    activarCamara()
  }, [activarCamara])

  const analizarFoto = useCallback(async () => {
    setAnalizando(true)
    setError('')
    try {
      const resultado = await analizarImagen(foto)
      const entrada = {
        id: Date.now(),
        imagen: foto,
        nombre: resultado.nombre,
        calorias: resultado.calorias,
        fecha: new Date().toLocaleDateString('es-MX'),
        hora: new Date().toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      addEntry(entrada)
      navigate('/result', { state: entrada })
    } catch {
      setError('❌ Error al analizar la imagen. Intenta de nuevo.')
    } finally {
      setAnalizando(false)
    }
  }, [foto, addEntry, navigate])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ marginBottom: '24px', color: '#1a1a2e' }}>📷 Capturar alimento</h2>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {!camaraActiva && !foto && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '24px', color: '#666' }}>
              Presiona el botón para activar la cámara y tomar una foto de tu alimento
            </p>
            <button
              onClick={activarCamara}
              style={{
                background: '#1a1a2e',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
              📷 Activar cámara
            </button>
          </div>
        )}

        {camaraActiva && (
          <div style={{ textAlign: 'center' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                borderRadius: '12px',
                marginBottom: '16px'
              }}
            />
            <button
              onClick={tomarFoto}
              style={{
                background: '#e94560',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
              📸 Tomar foto
            </button>
          </div>
        )}

        {foto && !analizando && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={foto}
              alt="Foto tomada"
              style={{
                width: '100%',
                borderRadius: '12px',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={repetirFoto}
                style={{
                  background: '#64748b',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '15px'
                }}>
                🔄 Repetir foto
              </button>
              <button
                onClick={analizarFoto}
                style={{
                  background: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                🔍 Analizar
              </button>
            </div>
          </div>
        )}

        {analizando && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <p style={{ fontSize: '18px', color: '#1a1a2e', fontWeight: '600' }}>
              Analizando tu alimento...
            </p>
            <p style={{ color: '#666', marginTop: '8px' }}>
              Esto puede tardar unos segundos
            </p>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}

export default Camera