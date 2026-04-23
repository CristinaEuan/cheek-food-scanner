import { createContext, useContext, useState } from 'react'

const HistoryContext = createContext()

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('cheek_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const addEntry = (entry) => {
    const newHistory = [entry, ...history]
    setHistory(newHistory)
    try {
      localStorage.setItem('cheek_history', JSON.stringify(newHistory))
    } catch {
      console.error('Error al guardar historial')
    }
  }

  const deleteEntry = (id) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem('cheek_history', JSON.stringify(newHistory))
  }
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('cheek_history')
  }

  return (
    <HistoryContext.Provider value={{ history, addEntry, deleteEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  return useContext(HistoryContext)
}