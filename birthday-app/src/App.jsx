import { HashRouter, Routes, Route } from 'react-router-dom'
import QRPage from './pages/QRPage'
import SurprisePage from './pages/SurprisePage'
import MessagePage from './pages/MessagePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<QRPage />} />
        <Route path="/surprise" element={<SurprisePage />} />
        <Route path="/message" element={<MessagePage />} />
      </Routes>
    </HashRouter>
  )
}
