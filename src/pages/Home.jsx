import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

// Iconos profesionales
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconHistory = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09A10 10 0 0 0 12 18a10 10 0 0 0 7.33-2.91z"/><path d="M5.78 9h12.44a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.07-.09A10 10 0 0 0 12 3a10 10 0 0 0-7.33 2.91l-.07.09A1.65 1.65 0 0 0 4.27 8a1.65 1.65 0 0 0 1.51 1z"/></svg>
const IconLogout = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconArrowDown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>

export default function Home() {
  const [carreras, setCarreras] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [user, setUser] = useState(null)
  const [userRol, setUserRol] = useState(null)
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const navigate = useNavigate()

  // Verificar si hay usuario logueado y su rol
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Obtener el rol del usuario
        const { data: perfil } = await supabase
          .from('perfiles')
          .select('rol')
          .eq('id', user.id)
          .single()
        
        setUserRol(perfil?.rol || 'usuario')
      }
    }
    checkUser()
  }, [])

  // Cargar carreras desde Supabase
  useEffect(() => {
    const cargarCarreras = async () => {
      const { data } = await supabase.from('carreras').select('*')
      setCarreras(data || [])
      setCargando(false)
    }
    cargarCarreras()
  }, [])

  const handleReservar = (carrera) => {
    localStorage.setItem('carreraSeleccionada', carrera.nombre)
    if (user) {
      navigate('/reserva')
    } else {
      navigate('/login')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUserRol(null)
    setMostrarMenu(false)
    navigate('/')
  }

  const handleVerHistorial = () => {
    setMostrarMenu(false)
    navigate('/historial')
  }

  // Filtrar carreras según búsqueda
  const carrerasFiltradas = carreras.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-content">
          <span className="logo">Vincobo</span>
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMostrarMenu(!mostrarMenu)}
                className="btn btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px'
                }}
              >
                <IconUser />
                <span>Mi cuenta</span>
                <IconArrowDown />
              </button>

              {/* Menú desplegable */}
              {mostrarMenu && (
                <>
                  <div
                    onClick={() => setMostrarMenu(false)}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999
                    }}
                  />
                  
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    width: '240px',
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={handleVerHistorial}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderBottom: '1px solid #E2E8F0',
                        color: 'var(--dark)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <IconHistory />
                      <span>Historial de reservas</span>
                    </button>
                    {(userRol !== 'usuario' && userRol !== null) && (
                      <button
                          onClick={() => {
                              setMostrarMenu(false)
                              navigate('/dashboard')
                          }}
                          style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: 'none',
                              background: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              borderBottom: '1px solid #E2E8F0',
                              color: 'var(--dark)'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                          <IconDashboard />
                          <span>Mi Dashboard</span>
                      </button>
                    )}

                    <button
                        onClick={() => {
                            setMostrarMenu(false)
                            navigate('/configuracion')
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            background: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            borderBottom: '1px solid #E2E8F0',
                            color: 'var(--dark)'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        <IconSettings />
                        <span>Mi configuración</span>
                    </button>
                    {/* Opción Admin - basada en ROL */}
                    {userRol === 'admin' && (
                      <button
                        onClick={() => {
                          setMostrarMenu(false)
                          navigate('/admin')
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          borderBottom: '1px solid #E2E8F0',
                          color: 'var(--primary)',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        <IconSettings />
                        <span>Administración</span>
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'var(--error)'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      <IconLogout />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-secondary"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        background: 'var(--primary)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            Deja de imaginar tu carrera... Empieza a conocerla
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>
            Conversa con quién estudia, lo que tú sueñas
          </p>
          
          {/* Buscador con icono */}
          <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="Busca tu carrera (ej: Medicina, Derecho...)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px 15px 50px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray)'
            }}>
              <IconSearch />
            </div>
          </div>
          
          <p style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
            {carrerasFiltradas.length} carreras disponibles
          </p>
        </div>
      </div>

      {/* Lista de carreras */}
      <div className="container">
        {cargando ? (
          <p className="text-center" style={{ padding: '40px' }}>Cargando carreras...</p>
        ) : (
          <div className="carreras-grid">
            {carrerasFiltradas.map(carrera => (
              <div key={carrera.id} className="carrera-card">
                <div className="carrera-nombre" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'left' }}>
                  <IconBook />
                  {carrera.nombre}
                </div>
                <button 
                  onClick={() => handleReservar(carrera)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Reservar Mentor
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}