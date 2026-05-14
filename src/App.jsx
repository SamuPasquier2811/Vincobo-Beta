import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Reserva from './pages/Reserva'
import Confirmacion from './pages/Confirmacion'
import Historial from './pages/Historial'
import Admin from './pages/Admin'
import RegistroMentor from './pages/RegistroMentor'
import Dashboard from './pages/Dashboard'
import Configuracion from './pages/Configuracion'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reserva" element={<Reserva />} />
                <Route path="/confirmacion" element={<Confirmacion />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/admin" element={<Admin />} /> 
                <Route path="/registro-mentor" element={<RegistroMentor/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App