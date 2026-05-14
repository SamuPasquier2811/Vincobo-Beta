import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconCalendar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconHistory = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>

export default function Dashboard() {
    const [cargando, setCargando] = useState(true)
    const [user, setUser] = useState(null)
    const [perfil, setPerfil] = useState(null)
    const [pestanaActiva, setPestanaActiva] = useState('disponibles')
    const navigate = useNavigate()

    useEffect(() => {
        const cargarDatos = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            
            if (!user) {
                navigate('/login')
                return
            }
            
            setUser(user)
            
            // Obtener perfil completo
            const { data: perfil, error } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', user.id)
                .single()
            
            if (error) {
                console.error('Error cargando perfil:', error)
                navigate('/')
                return
            }
            
            // Verificar si la cuenta está activada
            if (perfil.cuenta_activada === false) {
                await supabase.auth.signOut()
                navigate('/login')
                return
            }

            if (perfil.rol === 'cliente') {
                navigate('/')
                return
            }
            
            setPerfil(perfil)
            setCargando(false)
        }
        
        cargarDatos()
    }, [navigate])

    const getSaludo = () => {
        const rol = perfil?.rol
        const nombre = perfil?.nombre_completo?.split(' ')[0] || 'Usuario'
        
        if (rol === 'mentor') return `Hola mentor(a) ${nombre}`
        if (rol === 'moderador') return `Hola moderador(a) ${nombre}`
        if (rol === 'mentor_moderador') return `Hola ${nombre}, tu rol es de mentor+moderador`
        if (rol === 'admin') return `Hola administrador(a) ${nombre}`
        return `Hola ${nombre}`
    }

    const getMensajeCarreras = () => {
        if (!perfil) return ''
        
        // Para admin, no mostrar este mensaje
        if (perfil.rol === 'admin') return ''
        
        // Obtener carreras del perfil
        let carrerasTexto = ''
        if (perfil.carreras && perfil.carreras.length > 0) {
            carrerasTexto = perfil.carreras.join(', ')
        } else if (perfil.carrera) {
            carrerasTexto = perfil.carrera
        } else {
            return ''
        }
        
        return `Usted está habilitado para dar mentorías de la(s) carrera(s): ${carrerasTexto} y ramas afines`
    }

    if (cargando) {
        return <Loader mensaje="Cargando panel..." />
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)' }}>
            {/* Navbar */}
            <nav className="navbar">
                <div className="container navbar-content">
                    <button onClick={() => navigate('/')} className="btn-nav">
                        <IconArrowLeft />
                        <span>Volver al inicio</span>
                    </button>
                    <span className="logo">Vincobo</span>
                </div>
            </nav>

            <div className="container" style={{ padding: '40px 20px' }}>
                {/* Saludo */}
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '10px' }}>
                        {getSaludo()}
                    </h1>
                    {getMensajeCarreras() && (
                        <p style={{ fontSize: '16px', color: 'var(--gray)' }}>
                            {getMensajeCarreras()}
                        </p>
                    )}
                </div>

                {/* Pestañas */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '30px',
                    borderBottom: '2px solid #E2E8F0',
                    paddingBottom: '10px'
                }}>
                    <button
                        onClick={() => setPestanaActiva('disponibles')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            background: pestanaActiva === 'disponibles' ? 'var(--primary)' : 'white',
                            color: pestanaActiva === 'disponibles' ? 'white' : 'var(--dark)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <IconCalendar /> Mentorías disponibles
                    </button>
                    <button
                        onClick={() => setPestanaActiva('realizadas')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            background: pestanaActiva === 'realizadas' ? 'var(--primary)' : 'white',
                            color: pestanaActiva === 'realizadas' ? 'white' : 'var(--dark)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <IconHistory /> Tus mentorías realizadas
                    </button>
                </div>

                {/* Contenido de pestañas - En construcción */}
                <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    {pestanaActiva === 'disponibles' ? (
                        <>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#F1F5F9',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <IconCalendar style={{ color: 'var(--primary)' }} />
                            </div>
                            <h3 style={{ marginBottom: '10px', color: 'var(--dark)' }}>
                                En construcción
                            </h3>
                            <p style={{ color: 'var(--gray)' }}>
                                Esta sección estará disponible próximamente. 
                                Aquí podrás ver y postularte a las mentorías disponibles.
                            </p>
                        </>
                    ) : (
                        <>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#F1F5F9',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <IconHistory style={{ color: 'var(--primary)' }} />
                            </div>
                            <h3 style={{ marginBottom: '10px', color: 'var(--dark)' }}>
                                En construcción
                            </h3>
                            <p style={{ color: 'var(--gray)' }}>
                                Esta sección estará disponible próximamente. 
                                Aquí podrás ver el historial de tus mentorías realizadas.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}