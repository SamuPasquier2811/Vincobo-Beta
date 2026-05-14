import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos profesionales (SIN EMOJIS)
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconClock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconPrice = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IconMessageSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const IconNotes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconConsult = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
const IconCareer = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>

export default function Historial() {
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Función para formatear fecha y hora CORRECTAMENTE (sin UTC offset)
  const formatearFecha = (fecha) => {
    if (!fecha) return 'No especificada'
    const fechaObj = new Date(fecha)
    // Ajustar a UTC-4 (Bolivia)
    fechaObj.setHours(fechaObj.getHours() - 4)
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatearFechaHora = (fecha) => {
    if (!fecha) return 'No especificada'
    const fechaObj = new Date(fecha)
    fechaObj.setHours(fechaObj.getHours() - 4)
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' - ' + fechaObj.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const getColorEstado = (estado) => {
    switch(estado) {
      case 'pagado': return 'var(--success)'
      case 'pendiente': return '#F59E0B'
      case 'cancelado': return 'var(--error)'
      default: return 'var(--gray)'
    }
  }

  const getNombreEstado = (estado) => {
    switch(estado) {
      case 'pagado': return 'Completado'
      case 'pendiente': return 'Pendiente'
      case 'cancelado': return 'Cancelado'
      default: return estado
    }
  }

  useEffect(() => {
    const cargarHistorial = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        navigate('/login')
        return
      }
      
      setUser(user)

      const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error cargando historial:', error)
      } else {
        setReservas(data || [])
      }
      setCargando(false)
    }

    cargarHistorial()
  }, [navigate])

  if (cargando) {
    return <Loader mensaje="Cargando tus datos..." />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
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
        <h1 style={{ marginBottom: '30px' }}>Historial de reservas</h1>

        {reservas.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ fontSize: '18px', color: 'var(--gray)', marginBottom: '20px' }}>
              No tienes reservas aún
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Explorar carreras
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reservas.map((reserva) => (
              <div key={reserva.id} className="card">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {reserva.tipo_servicio === 'consulta' ? <IconConsult /> : <IconCareer />}
                    <h3 style={{ color: 'var(--primary)' }}>
                      {reserva.tipo_servicio === 'consulta' ? 'Vincobo CONSULTA' : 'Vincobo CARRERA'}
                    </h3>
                    {reserva.apuntes_incluidos && (
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: 'var(--primary-soft)',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: 'var(--primary)'
                      }}>
                        <IconNotes width="12" height="12" /> +Apuntes
                      </span>
                    )}
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: getColorEstado(reserva.estado_pago) + '20',
                    color: getColorEstado(reserva.estado_pago)
                  }}>
                    {getNombreEstado(reserva.estado_pago)}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '15px'
                }}>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconUser /> Reservado por
                    </p>
                    <p style={{ fontWeight: '500' }}>{reserva.nombre_reservante}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconBook /> Carrera
                    </p>
                    <p style={{ fontWeight: '500' }}>{reserva.carrera}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconCalendar /> Fecha
                    </p>
                    <p>{formatearFecha(reserva.fecha_sugerida)} - {reserva.turno === 'mañana' ? 'Mañana' : reserva.turno === 'tarde' ? 'Tarde' : 'Noche'}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconClock /> Duración
                    </p>
                    <p>{reserva.tipo_servicio === 'consulta' ? '15-25 minutos' : '45-60 minutos'}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconPrice /> Precio
                    </p>
                    <p>{reserva.precio || (reserva.tipo_servicio === 'consulta' ? 30 : (reserva.apuntes_incluidos ? 85 : 60))} Bs</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconUniversity /> Universidad preferida
                    </p>
                    <p>{reserva.universidad_preferida || 'Sin preferencia'}</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconBook /> Semestre preferido
                    </p>
                    <p>{reserva.semestre_preferido || 'Sin preferencia'}</p>
                  </div>

                  {reserva.temas_interes && reserva.temas_interes.length > 0 && (
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconConsult /> Temas de interés
                      </p>
                      <p style={{ fontSize: '13px' }}>{reserva.temas_interes.join(', ')}</p>
                    </div>
                  )}
                </div>

                {reserva.comentarios_extra && (
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: '#F1F5F9',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}>
                    <p style={{ color: 'var(--gray)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconMessageSquare /> Comentarios:
                    </p>
                    <p>{reserva.comentarios_extra}</p>
                  </div>
                )}

                <p style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '12px', textAlign: 'right' }}>
                  Solicitado el: {formatearFechaHora(reserva.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}