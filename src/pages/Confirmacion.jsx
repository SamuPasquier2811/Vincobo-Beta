import { useNavigate, useLocation } from 'react-router-dom'

// Iconos profesionales
const IconCheckCircle = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconChild = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M5.5 20v-4a6.5 6.5 0 0 1 13 0v4"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconClock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconMessageSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const IconNotes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconPrice = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IconWhatsApp = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16 15.5v.01"/><path d="M12 15.5v.01"/><path d="M8 15.5v.01"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const IconConsult = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
const IconCareer = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconTarget = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const IconBriefcase = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>

export default function Confirmacion() {
    const navigate = useNavigate()
    const location = useLocation()
    const { 
        tipoUsuario, 
        nombreReservante, 
        nombreMenor,
        tipoServicio,
        apuntesIncluidos,
        temasInteres,
        interesesMentoria,
        situacionActual,
        horarioEspecifico,
        carrera,
        universidad,
        fecha,
        turno,
        semestre,
        comentarios,
        precio,
        duracion
    } = location.state || {}
    
    const carreraStorage = localStorage.getItem('carreraSeleccionada') || 'tu mentoría'
    const carreraMostrar = carrera || carreraStorage

    const getPrecioTexto = () => {
        if (precio) return precio
        if (tipoServicio === 'consulta') return 30
        return apuntesIncluidos ? 85 : 60
    }

    const getDuracionTexto = () => {
        if (duracion === 15) return '15-25 minutos'
        if (duracion === 45) return '45-60 minutos'
        return tipoServicio === 'consulta' ? '15-25 minutos' : '45-60 minutos'
    }

    const getNombreServicio = () => {
        if (tipoServicio === 'consulta') return 'VINCOBO CONSULTA'
        if (apuntesIncluidos) return 'VINCOBO CARRERA+'
        return 'VINCOBO CARRERA'
    }

    const generarMensajeWhatsApp = () => {
        const servicioTexto = getNombreServicio()
        const duracionTexto = getDuracionTexto()
        const precioTexto = getPrecioTexto()
        
        if (tipoUsuario === 'tutor') {
            return `Hola Vincobo, soy ${nombreReservante || '[Nombre del tutor]'}, padre/madre/tutor(a) de ${nombreMenor || '[Nombre del menor]'}. 
Acabo de solicitar una mentoría "${servicioTexto}" (${duracionTexto}) para la carrera ${carreraMostrar}. 
Precio: ${precioTexto} Bs.
${apuntesIncluidos ? '✅ Incluye apuntes digitales (+25 Bs)' : ''}
${temasInteres && temasInteres.length > 0 ? `📌 Temas de interés: ${temasInteres.join(', ')}` : ''}
${interesesMentoria && interesesMentoria.length > 0 ? `📌 Interés principal: ${interesesMentoria.join(', ')}` : ''}
${situacionActual ? `📌 Situación actual: ${situacionActual}` : ''}
${horarioEspecifico ? `📌 Horario específico: ${horarioEspecifico}` : ''}
Quisiera coordinar los detalles de la sesión. 
Doy mi consentimiento para que ${nombreMenor || 'mi hijo/a'} participe en la mentoría y la misma sea grabada para precautelar la seguridad. 
Quedo atento a su confirmación. ¡Gracias!`
        } else {
            return `Hola Vincobo, soy ${nombreReservante || '[Nombre]'}. 
Acabo de solicitar una mentoría "${servicioTexto}" (${duracionTexto}) para la carrera ${carreraMostrar}.
Precio: ${precioTexto} Bs.
${apuntesIncluidos ? '✅ Incluye apuntes digitales (+25 Bs)' : ''}
${temasInteres && temasInteres.length > 0 ? `📌 Temas de interés: ${temasInteres.join(', ')}` : ''}
${interesesMentoria && interesesMentoria.length > 0 ? `📌 Interés principal: ${interesesMentoria.join(', ')}` : ''}
${situacionActual ? `📌 Situación actual: ${situacionActual}` : ''}
${horarioEspecifico ? `📌 Horario específico: ${horarioEspecifico}` : ''}
Quisiera coordinar los detalles de la sesión. 
Quedo atento a su confirmación. ¡Gracias!`
        }
    }

    const handleWhatsApp = () => {
        const mensaje = generarMensajeWhatsApp()
        window.open(`https://wa.me/59171285999?text=${encodeURIComponent(mensaje)}`, '_blank')
    }

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return 'No especificada'
        return new Date(fechaStr).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)',
            padding: 'clamp(16px, 5vw, 40px)'
        }}>
            <div className="card" style={{ 
                maxWidth: '600px', 
                width: '100%',
                borderTop: '4px solid var(--primary)',
                animation: 'fadeInUp 0.6s ease',
                padding: 'clamp(20px, 5vw, 30px)'
            }}>
                <div style={{
                    width: 'clamp(60px, 15vw, 80px)',
                    height: 'clamp(60px, 15vw, 80px)',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    boxShadow: '0 10px 20px rgba(10, 38, 71, 0.2)',
                    animation: 'scaleIn 0.5s ease'
                }}>
                    <IconCheckCircle />
                </div>

                <h2 style={{ 
                    marginBottom: '25px',
                    color: 'var(--primary)',
                    fontSize: 'clamp(22px, 6vw, 28px)',
                    fontWeight: '600',
                    textAlign: 'center'
                }}>
                    ¡Solicitud recibida!
                </h2>

                <div style={{
                    background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                    padding: 'clamp(16px, 4vw, 25px)',
                    borderRadius: '12px',
                    marginBottom: '25px',
                    textAlign: 'left',
                    borderLeft: '4px solid var(--primary)'
                }}>
                    <h4 style={{ marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(14px, 4vw, 16px)' }}>
                        <IconBook /> Resumen de tu solicitud
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                            <IconUser style={{ flexShrink: 0, marginTop: '2px' }} /> 
                            <strong style={{ flexShrink: 0 }}>Reservante:</strong> 
                            <span style={{ wordBreak: 'break-word', flex: 1 }}>{nombreReservante || 'No especificado'}</span>
                        </p>
                        
                        {tipoUsuario === 'tutor' && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconChild style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Menor:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{nombreMenor || 'No especificado'}</span>
                            </p>
                        )}
                        
                        {situacionActual && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconTarget style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Situación actual:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{situacionActual}</span>
                            </p>
                        )}
                        
                        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                            {tipoServicio === 'consulta' ? <IconConsult style={{ flexShrink: 0 }} /> : <IconCareer style={{ flexShrink: 0 }} />}
                            <strong style={{ flexShrink: 0 }}>Tipo de servicio:</strong> 
                            <span style={{ wordBreak: 'break-word', flex: 1 }}>{getNombreServicio()} ({getDuracionTexto()})</span>
                        </p>
                        
                        {tipoServicio === 'carrera' && apuntesIncluidos && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconNotes style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Apuntes digitales:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>Incluidos (+25 Bs)</span>
                            </p>
                        )}
                        
                        {tipoServicio === 'consulta' && temasInteres && temasInteres.length > 0 && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconConsult style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Temas de interés:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{temasInteres.join(', ')}</span>
                            </p>
                        )}
                        
                        {tipoServicio === 'carrera' && interesesMentoria && interesesMentoria.length > 0 && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconBriefcase style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Interés principal:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{interesesMentoria.join(', ')}</span>
                            </p>
                        )}
                        
                        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                            <IconBook style={{ flexShrink: 0, marginTop: '2px' }} /> 
                            <strong style={{ flexShrink: 0 }}>Carrera de interés:</strong> 
                            <span style={{ wordBreak: 'break-word', flex: 1 }}>{carreraMostrar}</span>
                        </p>
                        
                        {universidad && universidad !== 'Cualquiera' && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconUniversity style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Universidad de preferencia:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{universidad}</span>
                            </p>
                        )}
                        
                        {fecha && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconCalendar style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Fecha:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{formatearFecha(fecha)}</span>
                            </p>
                        )}
                        
                        {turno && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconClock style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Turno:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{
                                    turno === 'mañana' ? 'Mañana' :
                                    turno === 'tarde' ? 'Tarde' : 'Noche'
                                }</span>
                            </p>
                        )}
                        
                        {horarioEspecifico && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconClock style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Horario específico:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{horarioEspecifico}</span>
                            </p>
                        )}
                        
                        {semestre && semestre !== '' && (
                            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                <IconUniversity style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                <strong style={{ flexShrink: 0 }}>Semestre de preferencia:</strong> 
                                <span style={{ wordBreak: 'break-word', flex: 1 }}>{semestre}</span>
                            </p>
                        )}
                        
                        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                            <IconPrice style={{ flexShrink: 0, marginTop: '2px' }} /> 
                            <strong style={{ flexShrink: 0 }}>Precio total:</strong> 
                            <span style={{ wordBreak: 'break-word', flex: 1 }}>{getPrecioTexto()} Bs</span>
                        </p>
                        
                        {comentarios && (
                            <div style={{ 
                                marginTop: '10px',
                                padding: '12px',
                                background: 'white',
                                borderRadius: '8px'
                            }}>
                                <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px', fontSize: 'clamp(13px, 3.5vw, 14px)' }}>
                                    <IconMessageSquare style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                    <strong style={{ flexShrink: 0 }}>Comentarios adicionales:</strong>
                                </p>
                                <p style={{ marginLeft: 'clamp(0px, 5vw, 30px)', fontSize: 'clamp(13px, 3.5vw, 14px)', fontStyle: 'italic', color: 'var(--dark)', wordBreak: 'break-word' }}>
                                    {comentarios}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <p style={{ 
                    color: 'var(--gray)', 
                    marginBottom: '25px', 
                    lineHeight: '1.6',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    textAlign: 'left',
                    background: '#F8FAFC',
                    padding: 'clamp(12px, 4vw, 15px)',
                    borderRadius: '8px'
                }}>
                    Hemos recibido tu solicitud correctamente. Para agilizar el proceso, 
                    puedes contactarnos por WhatsApp haciendo clic en el botón de abajo. 
                    De todas formas, nosotros nos comunicaremos contigo a la brevedad 
                    para coordinar los detalles de tu mentoría.
                </p>

                <button
                    onClick={handleWhatsApp}
                    className="btn btn-primary"
                    style={{
                        background: '#25D366',
                        border: 'none',
                        padding: 'clamp(12px, 4vw, 16px) clamp(20px, 5vw, 30px)',
                        fontSize: 'clamp(14px, 4vw, 18px)',
                        marginBottom: '20px',
                        width: '100%',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                    }}
                >
                    <IconWhatsApp />
                    Contactar por WhatsApp
                </button>

                <p style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: 'var(--gray)', marginBottom: '20px', textAlign: 'center' }}>
                    Una vez coordinada la sesión, te enviaremos el link de la reunión (Zoom/Meet).
                </p>

                <button
                    onClick={() => {
                        localStorage.removeItem('carreraSeleccionada')
                        navigate('/')
                    }}
                    className="btn-nav"
                    style={{
                        margin: '10px auto 0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: 'clamp(8px, 3vw, 10px) clamp(16px, 4vw, 20px)',
                        width: 'auto'
                    }}
                >
                    <IconArrowLeft />
                    Volver al inicio
                </button>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scaleIn {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }
                
                /* Responsive adicional */
                @media (max-width: 480px) {
                    .card {
                        padding: 16px !important;
                    }
                    
                    p, .form-label, span, strong {
                        font-size: 12px !important;
                    }
                    
                    h4 {
                        font-size: 14px !important;
                    }
                }
            `}</style>
        </div>
    )
}
