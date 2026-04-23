import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useHistory } from '../context/HistoryContext'

function History() {
  const { history, deleteEntry, clearHistory } = useHistory()
  const navigate = useNavigate()

  const hoy = new Date().toLocaleDateString('es-MX')
  const caloriasHoy = history
    .filter(item => item.fecha === hoy)
    .reduce((sum, item) => sum + item.calorias, 0)

  const getMensaje = () => {
    if (caloriasHoy === 0) return { texto: '¡Empieza a registrar tus alimentos!', color: '#666' }
    if (caloriasHoy < 1500) return { texto: '¡Vas muy bien con tus calorías hoy! 💪', color: '#16a34a' }
    if (caloriasHoy < 2000) return { texto: '¡Vas bien! Mantén el equilibrio 😊', color: '#ea580c' }
    return { texto: '¡Cuidado! Has consumido muchas calorías hoy 🚨', color: '#dc2626' }
  }

  const mensaje = getMensaje()

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px' }}>

        {/* Contador de calorías del día */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
            Calorías consumidas hoy
          </p>
          <p style={{ fontSize: '36px', fontWeight: '700', color: '#ea580c' }}>
            🔥 {caloriasHoy} kcal
          </p>
          <p style={{ color: mensaje.color, fontWeight: '600', marginTop: '8px' }}>
            {mensaje.texto}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ color: '#1a1a2e' }}>📋 Historial de análisis</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{
              background: '#1a1a2e',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              {history.length} registros
            </span>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Seguro que quieres limpiar todo el historial?')) {
                    clearHistory()
                  }
                }}
                style={{
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>
                🗑️ Limpiar todo
              </button>
            )}
          </div>
        </div>

        {history.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🍽️</p>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              No hay análisis todavía. ¡Toma tu primera foto!
            </p>
            <button
              onClick={() => navigate('/camera')}
              style={{
                background: '#1a1a2e',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600'
              }}>
              📷 Ir a la cámara
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((item) => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'stretch'
              }}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '16px', color: '#1a1a2e' }}>
                      🍽️ {item.nombre}
                    </p>
                    <p style={{ color: '#ea580c', fontWeight: '600', fontSize: '14px' }}>
                      🔥 {item.calorias} kcal
                    </p>
                    <p style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>
                      📅 {item.fecha} — ⏰ {item.hora}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(item.id)}
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    padding: '0 16px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History