import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos profesionales
const IconDashboard = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
const IconBell = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const IconChild = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M5.5 20v-4a6.5 6.5 0 0 1 13 0v4"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconClock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconMessageSquare = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
const IconEdit = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/></svg>
const IconSave = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
const IconCancel = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const IconReservas = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconUsuarios = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
const IconNotes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconConsult = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
const IconCareer = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconPrice = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IconFolder = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
const IconDownload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>

const formatearFechaHoraBolivia = (fecha) => {
    if (!fecha) return 'No disponible'
    const fechaObj = new Date(fecha)
    fechaObj.setHours(fechaObj.getHours() - 4)
    return fechaObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

const sanitizarNombre = (nombre) => {
    return nombre
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '')
}

export default function Admin() {
    const [user, setUser] = useState(null)
    const [perfil, setPerfil] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [reservas, setReservas] = useState([])
    const [notificaciones, setNotificaciones] = useState([])
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false)
    
    // Estados para pestañas principales
    const [pestanaActiva, setPestanaActiva] = useState('reservas')
    const [filtroRolStaff, setFiltroRolStaff] = useState('todos')
    
    // Estados separados para usuarios
    const [clientes, setClientes] = useState([])
    const [staff, setStaff] = useState([])
    const [cargandoClientes, setCargandoClientes] = useState(false)
    const [cargandoStaff, setCargandoStaff] = useState(false)
    
    // Estados para búsqueda
    const [busquedaClientes, setBusquedaClientes] = useState('')
    const [busquedaStaff, setBusquedaStaff] = useState('')
    
    // Estados para edición
    const [editandoUsuario, setEditandoUsuario] = useState(null)
    const [editandoReserva, setEditandoReserva] = useState(null)
    const [formUsuario, setFormUsuario] = useState({})
    const [formReserva, setFormReserva] = useState({})
    
    const navigate = useNavigate()
    
    const [notificacionesInicialesCargadas, setNotificacionesInicialesCargadas] = useState(false)
    const [notificacionesLeidasIds, setNotificacionesLeidasIds] = useState(() => {
        const saved = localStorage.getItem('notificacionesLeidas')
        return saved ? JSON.parse(saved) : []
    })
    
    const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })

    // Estados para subida de documentos
    const [mostrarModalDocumento, setMostrarModalDocumento] = useState(false)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [tipoDocumento, setTipoDocumento] = useState('documento_estudiante')
    const [nuevoArchivo, setNuevoArchivo] = useState(null)
    const [subiendo, setSubiendo] = useState(false)

    const mostrarNotificacion = (mensaje, tipo = 'error') => {
        setNotificacion({ mostrar: true, mensaje, tipo })
        setTimeout(() => {
            setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
        }, 5000)
    }

    // Función para mover archivos
    const moverArchivosStorage = async (userId, nombreAntiguo, nombreNuevo, documentosActuales) => {
        if (nombreAntiguo === nombreNuevo) return { exito: true, nuevasUrls: {} }
        
        const nombreAntiguoLim = sanitizarNombre(nombreAntiguo)
        const nombreNuevoLim = sanitizarNombre(nombreNuevo)
        
        console.log(`=== RENOMBRANDO CARPETA ===`)
        console.log(`De: "${nombreAntiguo}" → A: "${nombreNuevo}"`)
        console.log(`Sanitizado: "${nombreAntiguoLim}" → "${nombreNuevoLim}"`)
        
        const { data: userData } = await supabase
            .from('perfiles')
            .select('carnet_front, carnet_back, documento_estudiante')
            .eq('id', userId)
            .single()
        
        const carpetas = [
            { nombre: 'carnets', urls: ['carnet_front', 'carnet_back'] },
            { nombre: 'documentos_estudiante', urls: ['documento_estudiante'] }
        ]
        
        const nuevasUrls = {
            carnet_front: null,
            carnet_back: null,
            documento_estudiante: null
        }
        
        try {
            for (const carpetaInfo of carpetas) {
                const carpeta = carpetaInfo.nombre
                let carpetaActual = null
                
                for (const urlCampo of carpetaInfo.urls) {
                    const url = userData?.[urlCampo]
                    if (url) {
                        const regex = new RegExp(`${carpeta}\\/([^\\/]+)\\/`)
                        const match = url.match(regex)
                        if (match && match[1]) {
                            carpetaActual = match[1]
                            break
                        }
                    }
                }
                
                if (!carpetaActual) continue
                
                const oldPath = `${carpeta}/${carpetaActual}/`
                const newPath = `${carpeta}/${nombreNuevoLim}/`
                
                if (carpetaActual === nombreNuevoLim) continue
                
                const { data: files, error: listError } = await supabase.storage
                    .from('mentores')
                    .list(oldPath)
                
                if (listError || !files || files.length === 0) continue
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    const oldFile = `${oldPath}${file.name}`
                    const newFile = `${newPath}${file.name}`
                    
                    const { data: fileData, error: downloadError } = await supabase.storage
                        .from('mentores')
                        .download(oldFile)
                    
                    if (downloadError) continue
                    
                    await supabase.storage.from('mentores').upload(newFile, fileData, { upsert: true })
                    await supabase.storage.from('mentores').remove([oldFile])
                    
                    const { data: urlData } = supabase.storage.from('mentores').getPublicUrl(newFile)
                    const nuevaUrl = urlData.publicUrl
                    
                    if (carpeta === 'carnets') {
                        const nombreLower = file.name.toLowerCase()
                        if (nombreLower.includes('front') || nombreLower.includes('frente') || i === 0) {
                            nuevasUrls.carnet_front = nuevaUrl
                        } else if (nombreLower.includes('back') || nombreLower.includes('dorso') || i === 1) {
                            nuevasUrls.carnet_back = nuevaUrl
                        }
                    } else if (carpeta === 'documentos_estudiante') {
                        nuevasUrls.documento_estudiante = nuevaUrl
                    }
                }
            }
            
            return { exito: true, nuevasUrls }
        } catch (err) {
            console.error('Error en moverArchivosStorage:', err)
            return { exito: false, nuevasUrls: {} }
        }
    }

    useEffect(() => {
        const verificarAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { navigate('/'); return }
            
            const { data: perfilData } = await supabase
                .from('perfiles')
                .select('rol')
                .eq('id', user.id)
                .single()
            
            if (!perfilData || perfilData.rol !== 'admin') { navigate('/'); return }
            
            setUser(user)
            setPerfil(perfilData)
            await cargarDatos()
            setCargando(false)
        }

        verificarAdmin()

        const subscription = supabase
            .channel('reservas_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservas' }, (payload) => {
                setNotificaciones(prev => {
                    const yaExiste = prev.some(n => n.id === payload.new.id)
                    if (!yaExiste) {
                        return [{ id: payload.new.id, mensaje: `Nueva reserva: ${payload.new.carrera} - ${payload.new.nombre_reservante}`, leida: false, timestamp: payload.new.created_at }, ...prev]
                    }
                    return prev
                })
                cargarDatos()
            })
            .subscribe()

        return () => { subscription.unsubscribe() }
    }, [navigate])

    const cargarDatos = async () => {
        // Cargar reservas
        const { data: reservasData } = await supabase.from('reservas').select('*').order('created_at', { ascending: false })
        setReservas(reservasData || [])
        
        // Cargar clientes por separado (solo rol 'cliente')
        setCargandoClientes(true)
        const { data: clientesData } = await supabase
            .from('perfiles')
            .select('*')
            .eq('rol', 'usuario')
            .order('created_at', { ascending: false })
        setClientes(clientesData || [])
        setCargandoClientes(false)
        
        // Cargar staff por separado (mentor, moderador, mentor_moderador, admin)
        setCargandoStaff(true)
        const { data: staffData } = await supabase
            .from('perfiles')
            .select('*')
            .in('rol', ['mentor', 'moderador', 'mentor_moderador', 'admin'])
            .order('created_at', { ascending: false })
        setStaff(staffData || [])
        setCargandoStaff(false)
        
        // Notificaciones
        if (!notificacionesInicialesCargadas && reservasData) {
            const nuevasReservas = reservasData.filter(r => {
                const fechaReserva = new Date(r.created_at).getTime()
                const hace24h = Date.now() - 24 * 60 * 60 * 1000
                return fechaReserva > hace24h && !notificacionesLeidasIds.includes(r.id)
            })
            setNotificaciones(nuevasReservas.map(r => ({ id: r.id, mensaje: `Nueva reserva: ${r.carrera} - ${r.nombre_reservante}`, leida: false, timestamp: r.created_at })))
            setNotificacionesInicialesCargadas(true)
        }
    }

    const actualizarReserva = async (id) => {
        const { error } = await supabase.from('reservas').update(formReserva).eq('id', id)
        if (!error) {
            setReservas(reservas.map(r => r.id === id ? { ...r, ...formReserva } : r))
            setEditandoReserva(null)
            setFormReserva({})
            mostrarNotificacion('Reserva actualizada correctamente', 'success')
        } else {
            mostrarNotificacion('Error al actualizar reserva: ' + error.message, 'error')
        }
    }

    const actualizarUsuario = async (id, listaUsuarios, setListaUsuarios) => {
        const usuarioOriginal = listaUsuarios.find(u => u.id === id)
        const nombreOriginal = usuarioOriginal?.nombre_completo
        const nombreNuevo = formUsuario.nombre_completo
        let nuevasUrls = {}
        
        if (nombreOriginal && nombreNuevo && nombreOriginal !== nombreNuevo) {
            const documentosActuales = {
                carnet_front: usuarioOriginal.carnet_front || null,
                carnet_back: usuarioOriginal.carnet_back || null,
                documento_estudiante: usuarioOriginal.documento_estudiante || null
            }
            const resultado = await moverArchivosStorage(id, nombreOriginal, nombreNuevo, documentosActuales)
            if (resultado.exito) {
                nuevasUrls = resultado.nuevasUrls
            }
        }
        
        const datosActualizados = { ...formUsuario }
        if (nuevasUrls.carnet_front) datosActualizados.carnet_front = nuevasUrls.carnet_front
        if (nuevasUrls.carnet_back) datosActualizados.carnet_back = nuevasUrls.carnet_back
        if (nuevasUrls.documento_estudiante) datosActualizados.documento_estudiante = nuevasUrls.documento_estudiante
        
        const { error } = await supabase.from('perfiles').update(datosActualizados).eq('id', id)
        if (!error) {
            setListaUsuarios(listaUsuarios.map(u => u.id === id ? { ...u, ...datosActualizados } : u))
            setEditandoUsuario(null)
            setFormUsuario({})
            mostrarNotificacion('Usuario actualizado correctamente', 'success')
        } else {
            mostrarNotificacion('Error al actualizar usuario: ' + error.message, 'error')
        }
    }

    const reemplazarDocumento = async () => {
        if (!nuevoArchivo || !usuarioSeleccionado) return
        
        setSubiendo(true)
        
        try {
            const nombreLimpio = sanitizarNombre(usuarioSeleccionado.nombre_completo)
            let oldPath = null
            let campoActualizar = ''
            
            if (tipoDocumento === 'carnet_front' && usuarioSeleccionado.carnet_front) {
                const url = usuarioSeleccionado.carnet_front
                const match = url.match(/carnets\/([^\/]+)\/([^\/]+)$/)
                if (match) oldPath = `carnets/${match[1]}/${match[2]}`
                campoActualizar = 'carnet_front'
            } else if (tipoDocumento === 'carnet_back' && usuarioSeleccionado.carnet_back) {
                const url = usuarioSeleccionado.carnet_back
                const match = url.match(/carnets\/([^\/]+)\/([^\/]+)$/)
                if (match) oldPath = `carnets/${match[1]}/${match[2]}`
                campoActualizar = 'carnet_back'
            } else if (tipoDocumento === 'documento_estudiante' && usuarioSeleccionado.documento_estudiante) {
                const url = usuarioSeleccionado.documento_estudiante
                const match = url.match(/documentos_estudiante\/([^\/]+)\/([^\/]+)$/)
                if (match) oldPath = `documentos_estudiante/${match[1]}/${match[2]}`
                campoActualizar = 'documento_estudiante'
            }
            
            if (oldPath) {
                await supabase.storage.from('mentores').remove([oldPath])
            }
            
            const fileExt = nuevoArchivo.name.split('.').pop()
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
            let newPath = ''
            
            if (tipoDocumento === 'carnet_front' || tipoDocumento === 'carnet_back') {
                newPath = `carnets/${nombreLimpio}/${fileName}`
            } else {
                newPath = `documentos_estudiante/${nombreLimpio}/${fileName}`
            }
            
            const { error: uploadError } = await supabase.storage
                .from('mentores')
                .upload(newPath, nuevoArchivo)
            
            if (uploadError) {
                mostrarNotificacion('Error al subir el archivo: ' + uploadError.message, 'error')
                setSubiendo(false)
                return
            }
            
            const { data: urlData } = supabase.storage.from('mentores').getPublicUrl(newPath)
            
            const { error: updateError } = await supabase
                .from('perfiles')
                .update({ [campoActualizar]: urlData.publicUrl })
                .eq('id', usuarioSeleccionado.id)
            
            if (updateError) {
                mostrarNotificacion('Error al actualizar la base de datos: ' + updateError.message, 'error')
            } else {
                mostrarNotificacion('Documento actualizado correctamente', 'success')
                
                // Actualizar en ambas listas
                setClientes(clientes.map(u => u.id === usuarioSeleccionado.id ? { ...u, [campoActualizar]: urlData.publicUrl } : u))
                setStaff(staff.map(u => u.id === usuarioSeleccionado.id ? { ...u, [campoActualizar]: urlData.publicUrl } : u))
                
                setMostrarModalDocumento(false)
                setNuevoArchivo(null)
            }
        } catch (err) {
            console.error('Error:', err)
            mostrarNotificacion('Error al reemplazar el documento', 'error')
        }
        
        setSubiendo(false)
    }

    const marcarNotificacionesLeidas = () => {
        const nuevosIdsLeidas = [...notificacionesLeidasIds, ...notificaciones.map(n => n.id)]
        setNotificacionesLeidasIds(nuevosIdsLeidas)
        localStorage.setItem('notificacionesLeidas', JSON.stringify(nuevosIdsLeidas))
        setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })))
    }

    // Función para exportar datos a CSV/Excel
    const exportarAExcel = () => {
        // Combinar clientes y staff para exportar todos los usuarios
        const todosLosUsuarios = [...clientes, ...staff]
        
        if (todosLosUsuarios.length === 0) {
            mostrarNotificacion('No hay datos para exportar', 'error')
            return
        }
        
        // Definir las columnas a exportar (mapeo de nombres amigables)
        const columnas = [
            { key: 'nombre_completo', label: 'Nombre Completo' },
            { key: 'email', label: 'Email' },
            { key: 'celular', label: 'Celular' },
            { key: 'rol', label: 'Rol' },
            { key: 'tipo_usuario', label: 'Tipo de Usuario' },
            { key: 'nombre_menor', label: 'Nombre del Menor (si aplica)' },
            { key: 'edad', label: 'Edad' },
            { key: 'universidad', label: 'Universidad Principal' },
            { key: 'carrera', label: 'Carrera Principal' },
            { key: 'semestre', label: 'Semestre Principal' },
            { key: 'carreras', label: 'Carreras (todas)' },
            { key: 'semestres', label: 'Semestres' },
            { key: 'universidades', label: 'Universidades' },
            { key: 'bio', label: 'Biografía' },
            { key: 'calificacion', label: 'Calificación' },
            { key: 'numero_mentorias', label: 'Nº Mentorías' },
            { key: 'documentos_verificados', label: 'Documentos Verificados' },
            { key: 'cuenta_activada', label: 'Cuenta Activada' },
            { key: 'contrato_aceptado', label: 'Contrato Aceptado' },
            { key: 'created_at', label: 'Fecha de Registro' },
            { key: 'fecha_registro_mentor', label: 'Fecha Registro Mentor' },
            { key: 'fecha_nacimiento_mayor', label: 'Fecha Nacimiento Mayor' },
            { key: 'fecha_nacimiento_menor', label: 'Fecha Nacimiento Menor' },
        ]
        
        // Convertir datos a formato CSV
        const filas = todosLosUsuarios.map(usuario => {
            return columnas.map(columna => {
                let valor = usuario[columna.key]
                
                // Formatear valores especiales
                if (columna.key === 'created_at' || columna.key === 'fecha_registro_mentor') {
                    valor = valor ? formatearFechaHoraBolivia(valor) : ''
                } else if (columna.key === 'cuenta_activada' || columna.key === 'contrato_aceptado' || columna.key === 'documentos_verificados') {
                    valor = valor ? 'Sí' : 'No'
                } else if (columna.key === 'carreras' || columna.key === 'semestres' || columna.key === 'universidades') {
                    valor = valor && Array.isArray(valor) ? valor.join('; ') : (valor || '')
                } else if (valor === null || valor === undefined) {
                    valor = ''
                }
                
                // Escapar comillas y comas para CSV
                if (typeof valor === 'string') {
                    valor = valor.replace(/"/g, '""')
                    if (valor.includes(',') || valor.includes('"') || valor.includes('\n')) {
                        valor = `"${valor}"`
                    }
                }

                if (columna.key === 'fecha_nacimiento_mayor' || columna.key === 'fecha_nacimiento_menor') {
                    valor = valor ? new Date(valor).toLocaleDateString('es-ES') : ''
                }
                
                return valor
            }).join(',')
        })
        
        // Crear encabezados
        const encabezados = columnas.map(c => c.label).join(',')
        const csvContent = [encabezados, ...filas].join('\n')
        
        // Agregar BOM para caracteres especiales (acentos, ñ)
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
        
        // Crear enlace de descarga
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.href = url
        link.setAttribute('download', `vincobo_usuarios_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        mostrarNotificacion(`Exportados ${todosLosUsuarios.length} usuarios correctamente`, 'success')
    }

    if (cargando) return <Loader mensaje="Cargando panel de administración..." />

    // Componente de tarjeta de usuario (reutilizable)
    const UserCard = ({ usuario, listaType, setLista }) => {
        const isEditing = editandoUsuario === usuario.id
        
        return (
            <div className="card" style={{ borderLeft: `4px solid ${usuario.rol === 'admin' ? 'var(--error)' : usuario.rol === 'mentor' || usuario.rol === 'mentor_moderador' ? 'var(--success)' : 'var(--primary)'}` }}>
                {isEditing ? (
                    // Modo edición
                    <div>
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Editar Usuario</h3>
                        
                        <div className="form-group"><label className="form-label"><IconUser /> Nombre completo</label><input type="text" className="form-input" value={formUsuario.nombre_completo !== undefined ? formUsuario.nombre_completo : usuario.nombre_completo || ''} onChange={(e) => setFormUsuario({ ...formUsuario, nombre_completo: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label"><IconUser /> Edad</label><input type="number" className="form-input" value={formUsuario.edad !== undefined ? formUsuario.edad : usuario.edad || ''} onChange={(e) => setFormUsuario({ ...formUsuario, edad: e.target.value })} /></div>
                        {/* En el modo edición, después del campo edad agrega: */}
                        <div className="form-group">
                            <label className="form-label"><IconCalendar /> Fecha Nacimiento Mayor</label>
                            <input 
                                type="date" 
                                className="form-input" 
                                value={formUsuario.fecha_nacimiento_mayor !== undefined ? formUsuario.fecha_nacimiento_mayor : usuario.fecha_nacimiento_mayor || ''} 
                                onChange={(e) => setFormUsuario({ ...formUsuario, fecha_nacimiento_mayor: e.target.value })} 
                            />
                        </div>
                        {usuario.tipo_usuario === 'tutor' && (
                        <div className="form-group">
                            <label className="form-label"><IconCalendar /> Fecha Nacimiento Menor</label>
                            <input 
                            type="date" 
                            className="form-input" 
                            value={formUsuario.fecha_nacimiento_menor !== undefined ? formUsuario.fecha_nacimiento_menor : usuario.fecha_nacimiento_menor || ''} 
                            onChange={(e) => setFormUsuario({ ...formUsuario, fecha_nacimiento_menor: e.target.value })} 
                            />
                        </div>
                        )}
                        {usuario.rol !== 'cliente' && (
                            <>
                                <div className="form-group"><label className="form-label"><IconUniversity /> Universidad principal</label><input type="text" className="form-input" value={formUsuario.universidad !== undefined ? formUsuario.universidad : usuario.universidad || ''} onChange={(e) => setFormUsuario({ ...formUsuario, universidad: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label"><IconBook /> Carrera principal</label><input type="text" className="form-input" value={formUsuario.carrera !== undefined ? formUsuario.carrera : usuario.carrera || ''} onChange={(e) => setFormUsuario({ ...formUsuario, carrera: e.target.value })} /></div>
                                <div className="form-group"><label className="form-label"><IconBook /> Semestre principal</label><input type="text" className="form-input" value={formUsuario.semestre !== undefined ? formUsuario.semestre : usuario.semestre || ''} onChange={(e) => setFormUsuario({ ...formUsuario, semestre: e.target.value })} /></div>
                                
                                {usuario.carreras && usuario.carreras.length > 0 && (
                                    <div className="form-group">
                                        <label className="form-label"><IconBook /> Carreras adicionales</label>
                                        {usuario.carreras.map((carr, idx) => (
                                            <div key={idx} style={{ marginBottom: '8px' }}>
                                                <input type="text" className="form-input" value={formUsuario.carreras?.[idx] !== undefined ? formUsuario.carreras[idx] : carr} onChange={(e) => {
                                                    const nuevasCarreras = [...(formUsuario.carreras || usuario.carreras || [])]
                                                    nuevasCarreras[idx] = e.target.value
                                                    setFormUsuario({ ...formUsuario, carreras: nuevasCarreras })
                                                }} placeholder={`Carrera ${idx + 1}`} />
                                                {usuario.semestres && usuario.semestres[idx] && (
                                                    <input type="text" className="form-input" style={{ marginTop: '4px' }} value={formUsuario.semestres?.[idx] !== undefined ? formUsuario.semestres[idx] : usuario.semestres[idx]} onChange={(e) => {
                                                        const nuevosSemestres = [...(formUsuario.semestres || usuario.semestres || [])]
                                                        nuevosSemestres[idx] = e.target.value
                                                        setFormUsuario({ ...formUsuario, semestres: nuevosSemestres })
                                                    }} placeholder={`Semestre ${idx + 1}`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <div className="form-group"><label className="form-label"><IconMessageSquare /> Biografía</label><textarea className="form-input" rows="3" value={formUsuario.bio !== undefined ? formUsuario.bio : usuario.bio || ''} onChange={(e) => setFormUsuario({ ...formUsuario, bio: e.target.value })} /></div>
                            </>
                        )}
                        
                        <div className="form-group"><label className="form-label"><IconMail /> Email</label><input type="email" className="form-input" value={formUsuario.email !== undefined ? formUsuario.email : usuario.email || ''} onChange={(e) => setFormUsuario({ ...formUsuario, email: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label"><IconPhone /> Celular</label><input type="tel" className="form-input" value={formUsuario.celular !== undefined ? formUsuario.celular : usuario.celular || ''} onChange={(e) => setFormUsuario({ ...formUsuario, celular: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label"><IconUser /> Rol</label><select className="form-input" value={formUsuario.rol !== undefined ? formUsuario.rol : usuario.rol || 'cliente'} onChange={(e) => setFormUsuario({ ...formUsuario, rol: e.target.value })}><option value="cliente">Cliente</option><option value="mentor">Mentor</option><option value="moderador">Moderador</option><option value="mentor_moderador">Mentor + Moderador</option><option value="admin">Administrador</option></select></div>
                        <div className="form-group"><label className="form-label"><IconUser /> Tipo de usuario</label><select className="form-input" value={formUsuario.tipo_usuario !== undefined ? formUsuario.tipo_usuario : usuario.tipo_usuario || 'mayor'} onChange={(e) => setFormUsuario({ ...formUsuario, tipo_usuario: e.target.value })}><option value="mayor">Mayor de edad</option><option value="tutor">Tutor (menor)</option></select></div>
                        {usuario.tipo_usuario === 'tutor' && <div className="form-group"><label className="form-label"><IconChild /> Nombre del menor</label><input type="text" className="form-input" value={formUsuario.nombre_menor !== undefined ? formUsuario.nombre_menor : usuario.nombre_menor || ''} onChange={(e) => setFormUsuario({ ...formUsuario, nombre_menor: e.target.value })} /></div>}
                        
                        <div className="form-group"><label className="form-label"><IconCheck /> Calificación (mentor)</label><input type="number" step="0.1" className="form-input" value={formUsuario.calificacion !== undefined ? formUsuario.calificacion : usuario.calificacion || ''} onChange={(e) => setFormUsuario({ ...formUsuario, calificacion: parseFloat(e.target.value) })} /></div>
                        <div className="form-group"><label className="form-label"><IconCheck /> Número de mentorías</label><input type="number" className="form-input" value={formUsuario.numero_mentorias !== undefined ? formUsuario.numero_mentorias : usuario.numero_mentorias || ''} onChange={(e) => setFormUsuario({ ...formUsuario, numero_mentorias: parseInt(e.target.value) })} /></div>
                        
                        <div className="form-group"><label className="form-label"><IconCheck /> Cuenta Activada</label><select className="form-input" value={formUsuario.cuenta_activada !== undefined ? formUsuario.cuenta_activada : usuario.cuenta_activada} onChange={(e) => setFormUsuario({ ...formUsuario, cuenta_activada: e.target.value === 'true' })}><option value="true">Activada</option><option value="false">Desactivada</option></select></div>
                        <div className="form-group"><label className="form-label"><IconCheck /> Contrato Aceptado</label><select className="form-input" value={formUsuario.contrato_aceptado !== undefined ? formUsuario.contrato_aceptado : usuario.contrato_aceptado} onChange={(e) => setFormUsuario({ ...formUsuario, contrato_aceptado: e.target.value === 'true' })}><option value="true">Sí</option><option value="false">No</option></select></div>
                        
                        <div className="form-group"><label className="form-label"><IconFolder /> Documentos</label>
                            {usuario.carnet_front && <p><a href={usuario.carnet_front} target="_blank" rel="noopener noreferrer">Ver Carnet Frente</a></p>}
                            {usuario.carnet_back && <p><a href={usuario.carnet_back} target="_blank" rel="noopener noreferrer">Ver Carnet Dorso</a></p>}
                            {usuario.documento_estudiante && <p><a href={usuario.documento_estudiante} target="_blank" rel="noopener noreferrer">Ver Documento de Estudio</a></p>}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button onClick={() => actualizarUsuario(usuario.id, listaType === 'clientes' ? clientes : staff, listaType === 'clientes' ? setClientes : setStaff)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconSave /> Guardar</button>
                            <button onClick={() => { setEditandoUsuario(null); setFormUsuario({}); }} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconCancel /> Cancelar</button>
                        </div>
                    </div>
                ) : (
                    // Modo vista
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <h3 style={{ color: 'var(--primary)' }}>{usuario.nombre_completo || 'Sin nombre'}</h3>
                                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', backgroundColor: usuario.rol === 'admin' ? 'var(--error)' : usuario.rol === 'mentor' || usuario.rol === 'mentor_moderador' ? 'var(--success)' : 'var(--primary)', color: 'white' }}>
                                    {usuario.rol === 'admin' ? 'Admin' : usuario.rol === 'mentor' ? 'Mentor' : usuario.rol === 'moderador' ? 'Moderador' : usuario.rol === 'mentor_moderador' ? 'Mentor+Mod' : 'Cliente'}
                                </span>
                                {usuario.cuenta_activada === false && <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', backgroundColor: '#F59E0B', color: 'white' }}>Pendiente</span>}
                                {usuario.contrato_aceptado === true && usuario.rol !== 'cliente' && <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', backgroundColor: 'var(--success)', color: 'white' }}>Contrato ✓</span>}
                                {usuario.documentos_verificados === true && <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', backgroundColor: '#3B82F6', color: 'white' }}>Documentos ✓</span>}
                            </div>
                            <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', backgroundColor: usuario.tipo_usuario === 'tutor' ? '#F59E0B' : 'var(--primary)', color: 'white' }}>
                                {usuario.tipo_usuario === 'tutor' ? 'Tutor' : 'Mayor'}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                            <div>
                                <p><IconMail /> <strong>Email:</strong> {usuario.email || 'No especificado'}</p>
                                <p><IconPhone /> <strong>Celular:</strong> {usuario.celular || 'No especificado'}</p>
                                <p><IconUser /> <strong>Edad:</strong> {usuario.edad || 'No especificada'}</p>
                                <p><IconCalendar /> <strong>Fecha Nac. Mayor:</strong> {usuario.fecha_nacimiento_mayor ? new Date(usuario.fecha_nacimiento_mayor).toLocaleDateString('es-ES') : 'No especificada'}</p>
                                {usuario.tipo_usuario === 'tutor' && (
                                    <p><IconCalendar /> <strong>Fecha Nac. Menor:</strong> {usuario.fecha_nacimiento_menor ? new Date(usuario.fecha_nacimiento_menor).toLocaleDateString('es-ES') : 'No especificada'}</p>
                                )}
                                {usuario.tipo_usuario === 'tutor' && <p><IconChild /> <strong>Menor a cargo:</strong> {usuario.nombre_menor || 'No especificado'}</p>}
                                <p><IconCheck /> <strong>Documentos verificados:</strong> {usuario.documentos_verificados ? 'Sí' : 'No'}</p>
                            </div>
                            <div>
                                {usuario.universidad && <p><IconUniversity /> <strong>Universidad principal:</strong> {usuario.universidad}</p>}
                                {usuario.carrera && <p><IconBook /> <strong>Carrera principal:</strong> {usuario.carrera}</p>}
                                {usuario.semestre && <p><IconBook /> <strong>Semestre principal:</strong> {usuario.semestre}</p>}
                            </div>
                        </div>

                        {usuario.carreras && usuario.carreras.length > 0 && (
                            <div style={{ marginTop: '15px', padding: '12px', background: '#F1F5F9', borderRadius: '8px' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '8px' }}><IconBook /> Estudios adicionales:</p>
                                {usuario.carreras.map((carr, idx) => (
                                    <div key={idx} style={{ marginTop: '5px' }}>
                                        📍 <strong>{carr}</strong>
                                        {usuario.semestres && usuario.semestres[idx] && <span> - Semestre: {usuario.semestres[idx]}</span>}
                                        {usuario.universidades && usuario.universidades[idx] && <span> - Universidad: {usuario.universidades[idx]}</span>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {usuario.bio && (
                            <div style={{ marginTop: '15px', padding: '12px', background: '#F1F5F9', borderRadius: '8px' }}>
                                <p><IconMessageSquare /> <strong>Biografía:</strong> {usuario.bio}</p>
                            </div>
                        )}

                        {(usuario.calificacion > 0 || usuario.numero_mentorias > 0) && (
                            <div style={{ marginTop: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                {usuario.calificacion > 0 && <p><IconPrice /> <strong>Calificación:</strong> ⭐ {usuario.calificacion} / 5</p>}
                                {usuario.numero_mentorias > 0 && <p><IconCheck /> <strong>Mentorías realizadas:</strong> {usuario.numero_mentorias}</p>}
                            </div>
                        )}

                        <div style={{ marginTop: '15px', padding: '12px', background: '#F1F5F9', borderRadius: '8px' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}><IconFolder /> Documentos:</p>
                            <p><strong>Carnet Frente:</strong> {usuario.carnet_front ? <><a href={usuario.carnet_front} target="_blank" rel="noopener noreferrer">Ver</a> {' | '}<button onClick={() => { setUsuarioSeleccionado(usuario); setTipoDocumento('carnet_front'); setMostrarModalDocumento(true); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Actualizar</button></> : 'No disponible'}</p>
                            <p><strong>Carnet Dorso:</strong> {usuario.carnet_back ? <><a href={usuario.carnet_back} target="_blank" rel="noopener noreferrer">Ver</a> {' | '}<button onClick={() => { setUsuarioSeleccionado(usuario); setTipoDocumento('carnet_back'); setMostrarModalDocumento(true); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Actualizar</button></> : 'No disponible'}</p>
                            <p><strong>Documento Estudio:</strong> {usuario.documento_estudiante ? <><a href={usuario.documento_estudiante} target="_blank" rel="noopener noreferrer">Ver</a> {' | '}<button onClick={() => { setUsuarioSeleccionado(usuario); setTipoDocumento('documento_estudiante'); setMostrarModalDocumento(true); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Actualizar</button></> : 'No disponible'}</p>
                        </div>

                        <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '15px' }}>Registrado: {formatearFechaHoraBolivia(usuario.created_at)}</p>

                        <button onClick={() => { setEditandoUsuario(usuario.id); setFormUsuario({}); }} className="btn btn-primary" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconEdit /> Editar
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
            {/* Notificación flotante */}
            {notificacion.mostrar && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: notificacion.tipo === 'success' ? 'var(--success)' : 'var(--error)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                    animation: 'slideIn 0.3s ease'
                }}>
                    {notificacion.mensaje}
                </div>
            )}

            <nav className="navbar" style={{ background: 'var(--primary)', color: 'white' }}>
                <div className="container navbar-content">
                    <button onClick={() => navigate('/')} className="btn-nav" style={{ background: 'white', color: 'var(--primary)', borderColor: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconArrowLeft /> Volver al inicio
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconDashboard /><span style={{ color: 'white', fontWeight: 'bold' }}>Panel Admin</span>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <button onClick={() => { setMostrarNotificaciones(!mostrarNotificaciones); marcarNotificacionesLeidas(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', position: 'relative', padding: '8px' }}>
                                <IconBell />
                                {notificaciones.filter(n => !n.leida).length > 0 && (
                                    <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--error)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {notificaciones.filter(n => !n.leida).length}
                                    </span>
                                )}
                            </button>
                            {mostrarNotificaciones && (
                                <>
                                    <div onClick={() => setMostrarNotificaciones(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }} />
                                    <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', width: '350px', zIndex: 1000, maxHeight: '450px', overflowY: 'auto', border: '1px solid #E2E8F0' }}>
                                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px', position: 'sticky', top: 0, background: 'white', fontSize: '16px' }}>
                                            <IconBell /> Notificaciones {notificaciones.length > 0 && <span style={{ background: 'var(--primary)', color: 'white', borderRadius: '20px', padding: '2px 10px', fontSize: '12px', marginLeft: 'auto' }}>{notificaciones.length}</span>}
                                        </div>
                                        {notificaciones.length === 0 ? (
                                            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--gray)', fontSize: '14px' }}>No hay notificaciones nuevas</div>
                                        ) : (
                                            notificaciones.map(n => (
                                                <div key={n.id} style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', backgroundColor: n.leida ? 'white' : '#F0F9FF', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = n.leida ? 'white' : '#F0F9FF'}>
                                                    <p style={{ fontSize: '14px', marginBottom: '6px', fontWeight: n.leida ? 'normal' : '600', color: 'var(--dark)', lineHeight: '1.5' }}>{n.mensaje}</p>
                                                    <p style={{ fontSize: '11px', color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: '4px' }}><IconClock /> {new Date(n.timestamp).toLocaleDateString()} {new Date(n.timestamp).toLocaleTimeString()}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: '40px 20px' }}>
                {/* Pestañas principales */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px' }}>
                        <button onClick={() => setPestanaActiva('reservas')} style={{ padding: '12px 24px', border: 'none', background: pestanaActiva === 'reservas' ? 'var(--primary)' : 'white', color: pestanaActiva === 'reservas' ? 'white' : 'var(--dark)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconReservas /> Reservas ({reservas.length})
                        </button>
                        <button onClick={() => setPestanaActiva('clientes')} style={{ padding: '12px 24px', border: 'none', background: pestanaActiva === 'clientes' ? 'var(--primary)' : 'white', color: pestanaActiva === 'clientes' ? 'white' : 'var(--dark)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconUser /> Clientes ({clientes.length})
                        </button>
                        <button onClick={() => setPestanaActiva('staff')} style={{ padding: '12px 24px', border: 'none', background: pestanaActiva === 'staff' ? 'var(--primary)' : 'white', color: pestanaActiva === 'staff' ? 'white' : 'var(--dark)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconUsuarios /> Staff ({staff.length})
                        </button>
                    </div>
                    {/* Botón de exportación a Excel */}
                    <button 
                        onClick={exportarAExcel}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                    >
                        <IconDownload /> Exportar a Excel
                    </button>
                </div>
                {/* Sub-pestañas para Staff */}
                {pestanaActiva === 'staff' && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                        <button onClick={() => setFiltroRolStaff('todos')} style={{ padding: '8px 16px', border: 'none', background: filtroRolStaff === 'todos' ? 'var(--primary)' : '#F1F5F9', color: filtroRolStaff === 'todos' ? 'white' : 'var(--dark)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                            Todos ({staff.length})
                        </button>
                        <button onClick={() => setFiltroRolStaff('mentor')} style={{ padding: '8px 16px', border: 'none', background: filtroRolStaff === 'mentor' ? 'var(--primary)' : '#F1F5F9', color: filtroRolStaff === 'mentor' ? 'white' : 'var(--dark)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                            Mentores ({staff.filter(s => s.rol === 'mentor').length})
                        </button>
                        <button onClick={() => setFiltroRolStaff('moderador')} style={{ padding: '8px 16px', border: 'none', background: filtroRolStaff === 'moderador' ? 'var(--primary)' : '#F1F5F9', color: filtroRolStaff === 'moderador' ? 'white' : 'var(--dark)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                            Moderadores ({staff.filter(s => s.rol === 'moderador').length})
                        </button>
                        <button onClick={() => setFiltroRolStaff('mentor_moderador')} style={{ padding: '8px 16px', border: 'none', background: filtroRolStaff === 'mentor_moderador' ? 'var(--primary)' : '#F1F5F9', color: filtroRolStaff === 'mentor_moderador' ? 'white' : 'var(--dark)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                            Mentor+Mod ({staff.filter(s => s.rol === 'mentor_moderador').length})
                        </button>
                        <button onClick={() => setFiltroRolStaff('admin')} style={{ padding: '8px 16px', border: 'none', background: filtroRolStaff === 'admin' ? 'var(--primary)' : '#F1F5F9', color: filtroRolStaff === 'admin' ? 'white' : 'var(--dark)', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
                            Admins ({staff.filter(s => s.rol === 'admin').length})
                        </button>
                    </div>
                )}

                {/* Panel de Reservas */}
                {pestanaActiva === 'reservas' && (
                    <div>
                        <h2 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}><IconReservas /> Gestión de Reservas</h2>
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {reservas.map(reserva => (
                                <div key={reserva.id} className="card" style={{ borderLeft: `4px solid ${reserva.estado_pago === 'pagado' ? 'var(--success)' : reserva.estado_pago === 'pendiente' ? '#F59E0B' : 'var(--error)'}` }}>
                                    {editandoReserva === reserva.id ? (
                                        <div>
                                            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Editar Reserva</h3>
                                            <div className="form-group"><label className="form-label">Estado</label><select className="form-input" value={formReserva.estado_pago || reserva.estado_pago} onChange={(e) => setFormReserva({ ...formReserva, estado_pago: e.target.value })}><option value="pendiente">Pendiente</option><option value="pagado">Pagado</option><option value="cancelado">Cancelado</option></select></div>
                                            <div className="form-group"><label className="form-label">Tipo de servicio</label><select className="form-input" value={formReserva.tipo_servicio || reserva.tipo_servicio} onChange={(e) => setFormReserva({ ...formReserva, tipo_servicio: e.target.value })}><option value="consulta">CONSULTA (15-25 min)</option><option value="carrera">CARRERA (45-60 min)</option></select></div>
                                            <div className="form-group"><label className="form-label">Apuntes incluidos</label><select className="form-input" value={formReserva.apuntes_incluidos !== undefined ? formReserva.apuntes_incluidos : reserva.apuntes_incluidos} onChange={(e) => setFormReserva({ ...formReserva, apuntes_incluidos: e.target.value === 'true' })}><option value="false">No</option><option value="true">Sí (+25 Bs)</option></select></div>
                                            <div className="form-group"><label className="form-label">Nombre del reservante</label><input type="text" className="form-input" value={formReserva.nombre_reservante || reserva.nombre_reservante || ''} onChange={(e) => setFormReserva({ ...formReserva, nombre_reservante: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" value={formReserva.email_reservante || reserva.email_reservante || ''} onChange={(e) => setFormReserva({ ...formReserva, email_reservante: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Celular</label><input type="tel" className="form-input" value={formReserva.celular_reservante || reserva.celular_reservante || ''} onChange={(e) => setFormReserva({ ...formReserva, celular_reservante: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Carrera</label><input type="text" className="form-input" value={formReserva.carrera || reserva.carrera || ''} onChange={(e) => setFormReserva({ ...formReserva, carrera: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Fecha sugerida</label><input type="date" className="form-input" value={formReserva.fecha_sugerida || reserva.fecha_sugerida || ''} onChange={(e) => setFormReserva({ ...formReserva, fecha_sugerida: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Turno</label><select className="form-input" value={formReserva.turno || reserva.turno || 'mañana'} onChange={(e) => setFormReserva({ ...formReserva, turno: e.target.value })}><option value="mañana">Mañana</option><option value="tarde">Tarde</option><option value="noche">Noche</option></select></div>
                                            <div className="form-group"><label className="form-label">Universidad preferida</label><input type="text" className="form-input" value={formReserva.universidad_preferida || reserva.universidad_preferida || ''} onChange={(e) => setFormReserva({ ...formReserva, universidad_preferida: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Semestre preferido</label><input type="text" className="form-input" value={formReserva.semestre_preferido || reserva.semestre_preferido || ''} onChange={(e) => setFormReserva({ ...formReserva, semestre_preferido: e.target.value })} /></div>
                                            <div className="form-group"><label className="form-label">Comentarios</label><textarea className="form-input" rows="4" value={formReserva.comentarios_extra || reserva.comentarios_extra || ''} onChange={(e) => setFormReserva({ ...formReserva, comentarios_extra: e.target.value })} /></div>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                                <button onClick={() => actualizarReserva(reserva.id)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconSave /> Guardar</button>
                                                <button onClick={() => { setEditandoReserva(null); setFormReserva({}); }} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconCancel /> Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                                <h3 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    {reserva.tipo_servicio === 'consulta' ? <IconConsult /> : <IconCareer />}
                                                    {reserva.tipo_servicio === 'consulta' ? 'CONSULTA' : 'CARRERA'} - {reserva.carrera || 'Sin especificar'}
                                                </h3>
                                                <span style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: reserva.estado_pago === 'pagado' ? 'var(--success)' : reserva.estado_pago === 'pendiente' ? '#F59E0B' : 'var(--error)', color: 'white' }}>{reserva.estado_pago || 'pendiente'}</span>
                                            </div>
                                            {reserva.apuntes_incluidos && <p><IconNotes /> <strong>Apuntes digitales:</strong> Incluidos (+25 Bs)</p>}
                                            <div style={{ display: 'grid', gap: '12px' }}>
                                                <p><IconUser /> <strong>Reservante:</strong> {reserva.nombre_reservante || 'No especificado'}</p>
                                                <p><IconMail /> <strong>Email:</strong> {reserva.email_reservante || 'No especificado'}</p>
                                                <p><IconPhone /> <strong>Celular:</strong> {reserva.celular_reservante || 'No especificado'}</p>
                                                <p><IconBook /> <strong>Carrera:</strong> {reserva.carrera || 'No especificada'}</p>
                                                <p><IconCalendar /> <strong>Fecha:</strong> {reserva.fecha_sugerida ? new Date(reserva.fecha_sugerida).toLocaleDateString() : 'No especificada'}</p>
                                                <p><IconClock /> <strong>Turno:</strong> {reserva.turno === 'mañana' ? 'Mañana' : reserva.turno === 'tarde' ? 'Tarde' : 'Noche'}</p>
                                                <p><IconUniversity /> <strong>Universidad:</strong> {reserva.universidad_preferida || 'Sin preferencia'}</p>
                                                <p><IconBook /> <strong>Semestre preferido:</strong> {reserva.semestre_preferido || 'Sin preferencia'}</p>
                                                {reserva.temas_interes && reserva.temas_interes.length > 0 && <p><IconConsult /> <strong>Temas de interés:</strong> {reserva.temas_interes.join(', ')}</p>}
                                                {reserva.comentarios_extra && <div style={{ marginTop: '10px', padding: '15px', background: '#F1F5F9', borderRadius: '8px' }}><p><IconMessageSquare /> <strong>Comentarios:</strong> {reserva.comentarios_extra}</p></div>}
                                                <p style={{ fontSize: '12px', color: 'var(--gray)' }}><IconPrice /> <strong>Precio:</strong> {reserva.precio || (reserva.tipo_servicio === 'consulta' ? 30 : (reserva.apuntes_incluidos ? 85 : 60))} Bs • <strong>Duración:</strong> {reserva.duracion || (reserva.tipo_servicio === 'consulta' ? '15-25 min' : '45-60 min')}</p>
                                                <p style={{ fontSize: '12px', color: 'var(--gray)' }}>Creado: {formatearFechaHoraBolivia(reserva.created_at)}</p>
                                            </div>
                                            <button onClick={() => { setEditandoReserva(reserva.id); setFormReserva({}); }} className="btn btn-primary" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><IconEdit /> Editar</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Panel de Clientes */}
                {pestanaActiva === 'clientes' && (
                    <div>
                        <h2 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconUser /> Gestión de Clientes
                        </h2>
                        
                        <div style={{ marginBottom: '25px' }}>
                            <div style={{ position: 'relative', maxWidth: '400px' }}>
                                <input type="text" placeholder="Buscar por nombre o email..." value={busquedaClientes} onChange={(e) => setBusquedaClientes(e.target.value)} style={{ width: '100%', padding: '12px 20px 12px 45px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px' }} />
                                <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}><IconSearch /></div>
                            </div>
                        </div>

                        {cargandoClientes ? (
                            <Loader mensaje="Cargando clientes..." />
                        ) : (
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {clientes.filter(c => {
                                    const textoCoincide = (c.nombre_completo?.toLowerCase() || '').includes(busquedaClientes.toLowerCase()) ||
                                        (c.email?.toLowerCase() || '').includes(busquedaClientes.toLowerCase())
                                    return textoCoincide
                                }).length === 0 ? (
                                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}><p style={{ color: 'var(--gray)' }}>No se encontraron clientes</p></div>
                                ) : (
                                    clientes.filter(c => {
                                        const textoCoincide = (c.nombre_completo?.toLowerCase() || '').includes(busquedaClientes.toLowerCase()) ||
                                            (c.email?.toLowerCase() || '').includes(busquedaClientes.toLowerCase())
                                        return textoCoincide
                                    }).map(usuario => (
                                        <UserCard key={usuario.id} usuario={usuario} listaType="clientes" setLista={setClientes} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Panel de Staff */}
                {pestanaActiva === 'staff' && (
                    <div>
                        <h2 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconUsuarios /> Gestión de Staff
                        </h2>
                        
                        <div style={{ marginBottom: '25px' }}>
                            <div style={{ position: 'relative', maxWidth: '400px' }}>
                                <input type="text" placeholder="Buscar por nombre o email..." value={busquedaStaff} onChange={(e) => setBusquedaStaff(e.target.value)} style={{ width: '100%', padding: '12px 20px 12px 45px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px' }} />
                                <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}><IconSearch /></div>
                            </div>
                        </div>

                        {cargandoStaff ? (
                            <Loader mensaje="Cargando staff..." />
                        ) : (
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {staff.filter(u => {
                                    const textoCoincide = (u.nombre_completo?.toLowerCase() || '').includes(busquedaStaff.toLowerCase()) ||
                                        (u.email?.toLowerCase() || '').includes(busquedaStaff.toLowerCase())
                                    const rolCoincide = filtroRolStaff === 'todos' || u.rol === filtroRolStaff
                                    return textoCoincide && rolCoincide
                                }).length === 0 ? (
                                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}><p style={{ color: 'var(--gray)' }}>No se encontraron miembros del staff</p></div>
                                ) : (
                                    staff.filter(u => {
                                        const textoCoincide = (u.nombre_completo?.toLowerCase() || '').includes(busquedaStaff.toLowerCase()) ||
                                            (u.email?.toLowerCase() || '').includes(busquedaStaff.toLowerCase())
                                        const rolCoincide = filtroRolStaff === 'todos' || u.rol === filtroRolStaff
                                        return textoCoincide && rolCoincide
                                    }).map(usuario => (
                                        <UserCard key={usuario.id} usuario={usuario} listaType="staff" setLista={setStaff} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal para actualizar documento */}
            {mostrarModalDocumento && (
                <>
                    <div onClick={() => setMostrarModalDocumento(false)} style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 9998
                    }} />
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%',
                        zIndex: 9999,
                        boxShadow: '0 20px 35px rgba(0,0,0,0.2)'
                    }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>
                            Actualizar {tipoDocumento === 'carnet_front' ? 'Carnet Frente' : tipoDocumento === 'carnet_back' ? 'Carnet Dorso' : 'Documento de Estudio'}
                        </h3>
                        <p style={{ marginBottom: '15px', color: 'var(--gray)' }}>
                            Usuario: <strong>{usuarioSeleccionado?.nombre_completo}</strong>
                        </p>
                        <input 
                            type="file" 
                            accept="image/*,.pdf"
                            onChange={(e) => setNuevoArchivo(e.target.files[0])}
                            className="form-input"
                            style={{ marginBottom: '20px' }}
                        />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => {
                                    setMostrarModalDocumento(false)
                                    setNuevoArchivo(null)
                                }}
                                className="btn btn-secondary"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={reemplazarDocumento}
                                className="btn btn-primary"
                                disabled={!nuevoArchivo || subiendo}
                            >
                                {subiendo ? 'Subiendo...' : 'Actualizar'}
                            </button>
                        </div>
                    </div>
                </>
            )}
            
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    )
}
