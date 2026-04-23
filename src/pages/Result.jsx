import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No hay resultado para mostrar.</p>
          <button onClick={() => navigate('/camera')} style={{
            marginTop: '16px',
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px'
          }}>
            Volver a la cámara
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ marginBottom: '24px', color: '#1a1a2e' }}>✅ Resultado del análisis</h2>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <img
            src={state.imagen}
            alt="Alimento analizado"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
          />

          <div style={{ padding: '24px' }}>
            <div style={{
              background: '#f0f4f8',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Alimento detectado
              </p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a2e' }}>
                🍽️ {state.nombre}
              </p>
            </div>

            <div style={{
              background: '#fff7ed',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Kilocalorías estimadas
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#ea580c' }}>
                🔥 {state.calorias} kcal
              </p>
            </div>

            <div style={{
              background: '#f0fdf4',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Fecha y hora del análisis
              </p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#16a34a' }}>
                📅 {state.fecha} — ⏰ {state.hora}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => navigate('/camera')}
                style={{
                  flex: 1,
                  background: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                📷 Nueva foto
              </button>
              <button
                onClick={() => navigate('/history')}
                style={{
                  flex: 1,
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                📋 Ver historial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result