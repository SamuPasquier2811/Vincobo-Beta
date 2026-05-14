import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const IconKey = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>

const sanitizarNombre = (nombre) => {
    return nombre
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
}

export default function Configuracion() {
    const [cargando, setCargando] = useState(true)
    const [user, setUser] = useState(null)
    const [perfil, setPerfil] = useState(null)
    const [editando, setEditando] = useState(false)
    const [formData, setFormData] = useState({})
    const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
    const [subiendo, setSubiendo] = useState({ 
        carnet_front: false, 
        carnet_back: false, 
        documento_estudiante: false 
    })
    const [cambiandoPassword, setCambiandoPassword] = useState(false)
    const [nuevaPassword, setNuevaPassword] = useState('')
    const [confirmarNuevaPassword, setConfirmarNuevaPassword] = useState('')
    const [mostrarNuevaPassword, setMostrarNuevaPassword] = useState(false)
    const [cambiandoPasswordEstado, setCambiandoPasswordEstado] = useState(false)
    const navigate = useNavigate()
    
    // Documentos a subir
    const [carnetFront, setCarnetFront] = useState(null)
    const [carnetBack, setCarnetBack] = useState(null)
    const [documentoEstudiante, setDocumentoEstudiante] = useState(null)

    const mostrarNotificacion = (mensaje, tipo = 'error') => {
        setNotificacion({ mostrar: true, mensaje, tipo })
        setTimeout(() => setNotificacion({ mostrar: false, mensaje: '', tipo: '' }), 5000)
    }

    useEffect(() => {
        const cargarDatos = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                navigate('/login')
                return
            }
            setUser(user)
            
            const { data: perfil } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', user.id)
                .single()
            
            setPerfil(perfil)
            setFormData({
                edad: perfil?.edad !== null && perfil?.edad !== undefined ? perfil.edad : '',
                email: perfil?.email || '',
                celular: perfil?.celular || ''
            })
            setCargando(false)
        }
        
        const abortController = new AbortController()
        cargarDatos()
        
        return () => {
            abortController.abort()
        }
    }, [navigate])

    const subirArchivo = async (file, carpeta) => {
        if (!file) return null
        const nombreLimpio = sanitizarNombre(perfil.nombre_completo)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${carpeta}/${nombreLimpio}/${fileName}`
        
        const { error } = await supabase.storage
            .from('mentores')
            .upload(filePath, file)
        
        if (error) {
            console.error('Error subiendo archivo:', error)
            return null
        }
        
        const { data: urlData } = supabase.storage.from('mentores').getPublicUrl(filePath)
        return urlData.publicUrl
    }

    const handleActualizarDocumento = async (tipoDocumento) => {
        let file = null
        let campo = ''
        
        if (tipoDocumento === 'carnet_front') {
            file = carnetFront
            campo = 'carnet_front'
        } else if (tipoDocumento === 'carnet_back') {
            file = carnetBack
            campo = 'carnet_back'
        } else if (tipoDocumento === 'documento_estudiante') {
            file = documentoEstudiante
            campo = 'documento_estudiante'
        }
        
        if (!file) {
            mostrarNotificacion('Selecciona un archivo primero', 'error')
            return
        }
        
        setSubiendo(prev => ({ ...prev, [tipoDocumento]: true }))
        
        const url = await subirArchivo(file, tipoDocumento === 'documento_estudiante' ? 'documentos_estudiante' : 'carnets')
        
        if (url) {
            const urlsActuales = perfil[campo] ? perfil[campo].split(',') : []
            const nuevasUrls = [...urlsActuales, url]
            
            const { error } = await supabase
                .from('perfiles')
                .update({ [campo]: nuevasUrls.join(',') })
                .eq('id', user.id)
            
            if (!error) {
                mostrarNotificacion('Documento añadido correctamente', 'success')
                setPerfil({ ...perfil, [campo]: nuevasUrls.join(',') })
                if (tipoDocumento === 'carnet_front') setCarnetFront(null)
                if (tipoDocumento === 'carnet_back') setCarnetBack(null)
                if (tipoDocumento === 'documento_estudiante') setDocumentoEstudiante(null)
            } else {
                mostrarNotificacion('Error al guardar: ' + error.message)
            }
        } else {
            mostrarNotificacion('Error al subir el archivo')
        }
        setSubiendo(prev => ({ ...prev, [tipoDocumento]: false }))
    }

    const handleGuardar = async () => {
        const updates = {}
        
        const edadNumerica = parseInt(formData.edad)
        if (!isNaN(edadNumerica) && edadNumerica !== perfil.edad) {
            if (edadNumerica < 18 || edadNumerica > 99) {
                mostrarNotificacion('La edad debe estar entre 18 y 99 años', 'error')
                return
            }
            updates.edad = edadNumerica
        }
        
        if (formData.email !== perfil.email) updates.email = formData.email
        if (formData.celular !== perfil.celular) updates.celular = formData.celular
        
        if (Object.keys(updates).length === 0) {
            setEditando(false)
            return
        }
        
        const { error } = await supabase
            .from('perfiles')
            .update(updates)
            .eq('id', user.id)
        
        if (!error) {
            mostrarNotificacion('Datos actualizados correctamente', 'success')
            setPerfil({ ...perfil, ...updates })
            setEditando(false)
        } else {
            mostrarNotificacion('Error al actualizar: ' + error.message)
        }
    }

    const handleCambiarPassword = async () => {
        if (nuevaPassword !== confirmarNuevaPassword) {
            mostrarNotificacion('Las contraseñas no coinciden', 'error')
            return
        }
        
        if (nuevaPassword.length < 6) {
            mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error')
            return
        }
        
        setCambiandoPasswordEstado(true)
        
        const { error } = await supabase.auth.updateUser({
            password: nuevaPassword
        })
        
        if (error) {
            mostrarNotificacion('Error al cambiar contraseña: ' + error.message, 'error')
        } else {
            mostrarNotificacion('Contraseña actualizada correctamente', 'success')
            setCambiandoPassword(false)
            setNuevaPassword('')
            setConfirmarNuevaPassword('')
        }
        
        setCambiandoPasswordEstado(false)
    }

    if (cargando) return <Loader mensaje="Cargando..." />

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)' }}>
            {notificacion.mostrar && (
                <div style={{
                    position: 'fixed', top: '20px', right: '20px',
                    backgroundColor: notificacion.tipo === 'success' ? 'var(--success)' : 'var(--error)',
                    color: 'white', padding: '12px 24px', borderRadius: '8px',
                    zIndex: 9999, animation: 'slideIn 0.3s ease'
                }}>{notificacion.mensaje}</div>
            )}

            <nav className="navbar">
                <div className="container navbar-content">
                    <button onClick={() => navigate('/')} className="btn-nav">
                        <IconArrowLeft /> Volver al inicio
                    </button>
                    <span className="logo">Vincobo</span>
                </div>
            </nav>

            <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="card">
                    <h2 style={{ marginBottom: '30px', color: 'var(--primary)' }}>Mis datos</h2>
                    
                    {/* Nombre - Solo lectura para todos */}
                    <div className="form-group">
                        <label className="form-label"><IconUser /> Nombre completo</label>
                        <input type="text" className="form-input" value={perfil.nombre_completo || ''} disabled />
                    </div>
                    
                    {/* Edad - Editable solo para no clientes */}
                    <div className="form-group">
                        <label className="form-label"><IconCalendar /> Edad</label>
                        <input 
                            type="number" 
                            className="form-input" 
                            value={formData.edad === null || formData.edad === undefined ? '' : formData.edad} 
                            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                            disabled={perfil.rol === 'usuario' || (!editando && perfil.rol !== 'admin')}
                            min="18"
                            max="99"
                        />
                    </div>
                    
                    {/* Email - Editable solo para no clientes */}
                    <div className="form-group">
                        <label className="form-label"><IconMail /> Correo electrónico</label>
                        <input 
                            type="email" 
                            className="form-input" 
                            value={formData.email || ''} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={perfil.rol === 'usuario' || (!editando && perfil.rol !== 'admin')}
                        />
                    </div>
                    
                    {/* Celular - Editable solo para no clientes */}
                    <div className="form-group">
                        <label className="form-label"><IconPhone /> Celular</label>
                        <input 
                            type="tel" 
                            className="form-input" 
                            value={formData.celular || ''} 
                            onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                            disabled={perfil.rol === 'usuario' || (!editando && perfil.rol !== 'admin')}
                        />
                    </div>
                    
                    {/* Rol - Solo lectura */}
                    <div className="form-group">
                        <label className="form-label">Rol</label>
                        <input type="text" className="form-input" value={
                            perfil.rol === 'mentor' ? 'Mentor' :
                            perfil.rol === 'moderador' ? 'Moderador' :
                            perfil.rol === 'mentor_moderador' ? 'Mentor + Moderador' :
                            perfil.rol === 'admin' ? 'Administrador' : 'Cliente'
                        } disabled />
                    </div>
                    
                    {/* Para mentores: mostrar carreras y universidades */}
                    {(perfil.rol === 'mentor' || perfil.rol === 'mentor_moderador') && (
                        <>
                            <div className="form-group">
                                <label className="form-label"><IconUniversity /> Universidad(es)/Institución(es)</label>
                                {perfil.universidades && perfil.universidades.length > 0 ? (
                                    perfil.universidades.map((u, i) => <input key={i} type="text" className="form-input" value={u} disabled style={{ marginBottom: '5px' }} />)
                                ) : (
                                    <input type="text" className="form-input" value={perfil.universidad || 'No especificado'} disabled />
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label"><IconBook /> Carrera(s)</label>
                                {perfil.carreras && perfil.carreras.length > 0 ? (
                                    perfil.carreras.map((c, i) => (
                                        <div key={i} style={{ marginBottom: '10px' }}>
                                            <input type="text" className="form-input" value={c} disabled />
                                            {perfil.semestres && perfil.semestres[i] && (
                                                <input type="text" className="form-input" value={`Semestre: ${perfil.semestres[i]}`} disabled style={{ marginTop: '5px' }} />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <input type="text" className="form-input" value={perfil.carrera || 'No especificado'} disabled />
                                        <input type="text" className="form-input" value={`Semestre: ${perfil.semestre || 'No especificado'}`} disabled style={{ marginTop: '5px' }} />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    
                    {/* Sección de documentos - Solo para mentores/moderadores */}
                    {(perfil.rol === 'mentor' || perfil.rol === 'moderador' || perfil.rol === 'mentor_moderador') && (
                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Documentación</h3>
                            
                            <div className="form-group">
                                <label className="form-label">Carnet de Identidad (Frente)</label>
                                <input type="file" accept="image/*,.pdf" onChange={(e) => setCarnetFront(e.target.files[0])} className="form-input" />
                                <button 
                                    onClick={() => handleActualizarDocumento('carnet_front')}
                                    className="btn btn-secondary" 
                                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    disabled={subiendo.carnet_front}
                                >
                                    <IconUpload /> {subiendo.carnet_front ? 'Subiendo...' : 'Añadir nuevo carnet (frente)'}
                                </button>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Carnet de Identidad (Dorso)</label>
                                <input type="file" accept="image/*,.pdf" onChange={(e) => setCarnetBack(e.target.files[0])} className="form-input" />
                                <button 
                                    onClick={() => handleActualizarDocumento('carnet_back')}
                                    className="btn btn-secondary" 
                                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    disabled={subiendo.carnet_back}
                                >
                                    <IconUpload /> {subiendo.carnet_back ? 'Subiendo...' : 'Añadir nuevo carnet (dorso)'}
                                </button>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Documento que acredite estudios</label>
                                <input type="file" accept="image/*,.pdf" onChange={(e) => setDocumentoEstudiante(e.target.files[0])} className="form-input" />
                                <button 
                                    onClick={() => handleActualizarDocumento('documento_estudiante')}
                                    className="btn btn-secondary" 
                                    style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    disabled={subiendo.documento_estudiante}
                                >
                                    <IconUpload /> {subiendo.documento_estudiante ? 'Subiendo...' : 'Añadir nuevo documento de estudio'}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Botón para cambiar contraseña (para todos los usuarios) */}
                    {!cambiandoPassword ? (
                        <button 
                            onClick={() => setCambiandoPassword(true)}
                            className="btn btn-secondary"
                            style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <IconKey /> Cambiar contraseña
                        </button>
                    ) : (
                        <div style={{ marginTop: '20px', padding: '20px', background: '#F1F5F9', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '15px', color: 'var(--primary)' }}>Cambiar contraseña</h4>
                            <div className="form-group">
                                <label className="form-label">Nueva contraseña</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type={mostrarNuevaPassword ? 'text' : 'password'}
                                        className="form-input" 
                                        value={nuevaPassword} 
                                        onChange={(e) => setNuevaPassword(e.target.value)}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarNuevaPassword(!mostrarNuevaPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {mostrarNuevaPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirmar nueva contraseña</label>
                                <input 
                                    type="password"
                                    className="form-input" 
                                    value={confirmarNuevaPassword} 
                                    onChange={(e) => setConfirmarNuevaPassword(e.target.value)}
                                    placeholder="Repite tu nueva contraseña"
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button 
                                    onClick={() => {
                                        setCambiandoPassword(false)
                                        setNuevaPassword('')
                                        setConfirmarNuevaPassword('')
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleCambiarPassword}
                                    className="btn btn-primary"
                                    disabled={cambiandoPasswordEstado || !nuevaPassword || !confirmarNuevaPassword}
                                >
                                    {cambiandoPasswordEstado ? 'Actualizando...' : 'Actualizar contraseña'}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Botones de acción para edición de datos personales */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'flex-end' }}>
                        {perfil.rol === 'usuario' ? (
                            <p style={{ color: 'var(--gray)', fontSize: '14px', textAlign: 'center', width: '100%' }}>
                                Si necesita actualizar su información, contacte al soporte técnico.
                            </p>
                        ) : (
                            !editando ? (
                                <button onClick={() => setEditando(true)} className="btn btn-primary">
                                    Editar datos
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => setEditando(false)} className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                    <button onClick={handleGuardar} className="btn btn-primary">
                                        Guardar cambios
                                    </button>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>

            <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        </div>
    )
}