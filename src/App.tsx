import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import NewCase from './pages/NewCase'
import RegisterInteraction from './pages/RegisterInteraction'
import ImpactCheckin from './pages/ImpactCheckin'
import CaseDetail from './pages/CaseDetail'
import Timeline from './pages/Timeline'
import Support from './pages/Support'
import Register from './pages/Register'
import Login from './pages/Login'
import LegalConsent from './pages/LegalConsent'
import AIPreferencePage from './pages/AIPreference'
import Onboarding from './pages/Onboarding'
import { getNextSetupRoute, hasSession } from './lib/accountStore'

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!hasSession()) return <Navigate to="/login" replace />
  const nextRoute = getNextSetupRoute()
  if (nextRoute !== '/app') return <Navigate to={nextRoute} replace />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacidad" element={hasSession() ? <LegalConsent /> : <Navigate to="/login" replace />} />
      <Route path="/preferencia-ia" element={hasSession() ? <AIPreferencePage /> : <Navigate to="/login" replace />} />
      <Route path="/onboarding" element={hasSession() ? <Onboarding /> : <Navigate to="/login" replace />} />

      <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/app/nuevo-caso" element={<ProtectedRoute><NewCase /></ProtectedRoute>} />
      <Route path="/app/registrar" element={<ProtectedRoute><RegisterInteraction /></ProtectedRoute>} />
      <Route path="/app/checkin" element={<ProtectedRoute><ImpactCheckin /></ProtectedRoute>} />
      <Route path="/app/caso" element={<ProtectedRoute><CaseDetail /></ProtectedRoute>} />
      <Route path="/app/bitacora" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
      <Route path="/app/apoyo" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
