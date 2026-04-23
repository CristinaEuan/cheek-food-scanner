import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('cheek_user') || null
  })

  const login = (username, password) => {
    // Usuarios permitidos (simulación local)
    const validUsers = [
      { username: 'admin', password: '1234' },
      { username: 'cheek', password: 'cheek123' },
    ]

    const found = validUsers.find(
      u => u.username === username && u.password === password
    )

    if (found) {
      localStorage.setItem('cheek_user', username)
      setUser(username)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('cheek_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}