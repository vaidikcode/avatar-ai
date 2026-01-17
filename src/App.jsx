import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { CreateAvatar } from './pages/CreateAvatar'
import { OldCreationFlow } from './pages/OldCreationFlow'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateAvatar />} />
        <Route path="/old" element={<OldCreationFlow />} />
      </Routes>
    </Router>
  )
}

export default App