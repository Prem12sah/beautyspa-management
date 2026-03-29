import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
