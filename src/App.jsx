import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { HistoryProvider } from './context/HistoryContext'
import Login from './pages/Login'
import Camera from './pages/Camera'
import Result from './pages/Result'
import History from './pages/History'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HistoryProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/camera" element={
              <PrivateRoute>
                <Camera />
              </PrivateRoute>
            } />
            <Route path="/result" element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            } />
            <Route path="/history" element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            } />
          </Routes>
        </HistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App