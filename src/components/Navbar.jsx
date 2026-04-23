import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>🍽️ Che-Ek Food</span>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ fontSize: '14px' }}>👤 {user}</span>
        <button
          onClick={() => navigate('/camera')}
          style={{
            background: '#16213e',
            color: 'white',
            border: '1px solid #0f3460',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
          📷 Cámara
        </button>
        <button
          onClick={() => navigate('/history')}
          style={{
            background: '#16213e',
            color: 'white',
            border: '1px solid #0f3460',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
          📋 Historial
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: '#e94560',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
          Salir
        </button>
      </div>
    </nav>
  )
}

export default Navbar