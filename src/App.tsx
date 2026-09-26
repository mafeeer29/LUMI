import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import NewCase from './pages/NewCase'
import RegisterInteraction from './pages/RegisterInteraction'
import ImpactCheckin from './pages/ImpactCheckin'
import CaseDetail from './pages/CaseDetail'
import Timeline from './pages/Timeline'
import Support from './pages/Support'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Dashboard />} />
      <Route path="/app/nuevo-caso" element={<NewCase />} />
      <Route path="/app/registrar" element={<RegisterInteraction />} />
      <Route path="/app/checkin" element={<ImpactCheckin />} />
      <Route path="/app/caso" element={<CaseDetail />} />
      <Route path="/app/bitacora" element={<Timeline />} />
      <Route path="/app/apoyo" element={<Support />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App