import './App.css'
import Home from './pages/home.jsx';
import LoginPage  from './pages/login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChangePassword from './pages/password.jsx';
import AuditPage from './pages/audit.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/audit" element={<AuditPage />} />
      </Routes>
    </Router>
  )
}

export default App
