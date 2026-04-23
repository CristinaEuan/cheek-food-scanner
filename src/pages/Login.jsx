import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña')
      return
    }
    const success = login(username, password)
    if (success) {
      navigate('/camera')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#1a1a2e' }}>
          🍽️ Che-Ek Food
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px', fontSize: '14px' }}>
          Analiza tus alimentos con IA
        </p>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
          Iniciar sesión
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999' }}>
          Usuario: <strong>admin</strong> | Contraseña: <strong>1234</strong>
        </p>
      </div>
    </div>
  )
}

export default Login