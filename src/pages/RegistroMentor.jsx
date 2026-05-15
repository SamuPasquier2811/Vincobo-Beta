import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos profesionales
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconLock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IconEye = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconEyeOff = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
const IconPlus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IconMinus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>

// Modal para Contrato de Mentor
const ModalContrato = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'modalFadeIn 0.2s ease'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
        margin: '20px'
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1
        }}>
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>Contrato de Mentor/Moderador</h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: 'var(--gray)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}>×</button>
        </div>
        <div style={{ padding: '24px', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '15px' }}>
            CONTRATO DE PRESTACIÓN DE SERVICIOS - PLATAFORMA VINCOBO
            </p>
            
            <p>El presente documento constituye un contrato de prestación de servicios que regula la relación entre <strong>VINCOBO</strong> (en adelante, EL CONTRATANTE) y la persona natural que acepta los presentes términos mediante el registro en la plataforma (en adelante, EL CONTRATISTA), ya sea en calidad de <strong>Mentor</strong> o <strong>Moderador</strong>. La aceptación electrónica mediante el marcado del "checkbox" equivale a una firma vinculante.</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA PRIMERA: OBJETO</h4>
            <p>EL CONTRATISTA se obliga a prestar servicios de mentoría, orientación académica o moderación de sesiones con plena autonomía técnica. El servicio consiste en conectar experiencias educativas con estudiantes, bachilleres y cualquier usuario que requiera una orientación profesional en base a las experiencias de los mentores dentro de la plataforma.</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA SEGUNDA: MODALIDADES Y ACTIVIDADES</h4>
            <p>EL CONTRATISTA ejecutará sus servicios bajo las modalidades de: Vincobo Consulta (dudas puntuales), Vincobo Carrera (inmersión y malla curricular) y Vincobo Carrera+ (incluye carpeta de apuntes de autoría del mentor).</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA TERCERA: LOGÍSTICA Y PUNTUALIDAD</h4>
            <p>EL CONTRATISTA acepta las siguientes obligaciones estrictas de asistencia:</p>
            <ul style={{ marginLeft: '20px' }}>
            <li><strong>Confirmación Previa:</strong> EL CONTRATISTA debe enviar un mensaje de verificación al equipo de Vincobo 30 minutos antes del inicio de cada mentoría para confirmar su asistencia.</li>
            <li><strong>Preparación en Sala:</strong> EL CONTRATISTA debe ingresar a la sesión entre 5 y 7 minutos antes de la hora programada para verificar conexión, audio y video, asegurando que la mentoría inicie puntualmente.</li>
            <li><strong>Cámara y Entorno:</strong> Es obligatorio mantener la cámara encendida, estar en un lugar sin ruido y con vestimenta adecuada.</li>
            </ul>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA CUARTA: CONDUCTA, RESPETO Y OBJETIVIDAD</h4>
            <p>Tanto el Mentor como el Moderador deben regirse por los siguientes principios:</p>
            <ul style={{ marginLeft: '20px' }}>
            <li><strong>Máximo Respeto:</strong> Se debe mantener un trato profesional y respetuoso con todos los participantes en todo momento.</li>
            <li><strong>Presencia de Terceros:</strong> EL CONTRATISTA acepta y reconoce que en las sesiones, el padre, madre o tutor legal puede e ingresará a la mentoría para supervisar el proceso.</li>
            <li><strong>Objetividad Académica:</strong> Queda estrictamente prohibido emitir prejuicios u opiniones personales negativas sobre docentes, instituciones o terceros. EL CONTRATISTA debe mantenerse objetivo y basarse en hechos académicos. El Moderador es responsable de velar por que este principio se cumpla durante la sesión.</li>
            </ul>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA QUINTA: DESLINDE DE RESPONSABILIDAD (CONTACTO EXTERNO)</h4>
            <p>Vincobo prohíbe terminantemente el intercambio de datos personales (teléfonos, redes sociales, etc.) entre EL CONTRATISTA y los usuarios, lo que a su vez debe ser verificado y precautelado por el moderador para que el mismo no ocurra.</p>
            <p><strong>Deslinde:</strong> Si EL CONTRATISTA contacta al usuario por medios ajenos a la plataforma, dicha acción se considerará un incumplimiento grave del contrato.</p>
            <p><strong>Responsabilidad:</strong> Vincobo no se hace responsable por ninguna consecuencia, daño o situación derivada de interacciones ocurridas fuera de su supervisión y control directo.</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA SEXTA: PROPIEDAD INTELECTUAL (MODALIDAD CARRERA+)</h4>
            <p>En la modalidad Vincobo Carrera+, opera la cesión exclusiva de los derechos patrimoniales de los apuntes entregados a favor de Vincobo.</p>
            <p><strong>Uso Continuo:</strong> Vincobo podrá seguir utilizando dichos materiales incluso si EL CONTRATISTA decide dejar el proyecto. Esta cesión se compensa con el incremento en el pago de la sesión Carrera+ respecto a la modalidad Carrera.</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA SÉPTIMA: PRECIO Y FORMA DE PAGO</h4>
            <p>Los pagos (en Bolivianos - Bs) por sesión validada son:</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
                <tr><th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Servicio</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pago Mentor</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pago Moderador</th>
                </tr>
            </thead>
            <tbody>
                <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Vincobo Consulta</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>10 Bs</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>5 Bs</td></tr>
                <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Vincobo Carrera</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>25 Bs</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>10 Bs</td></tr>
                <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Vincobo Carrera+</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>35 Bs</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>10 Bs</td></tr>
            </tbody>
            </table>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA OCTAVA: DURACIÓN Y ACTUALIZACIÓN</h4>
            <p>El contrato es indefinido, pero Vincobo podrá remover a EL CONTRATISTA si:</p>
            <ul style={{ marginLeft: '20px' }}>
            <li>Supera los 3 años de egreso y/o su edad no se encuentra en el rango entre 18-27 años: Para garantizar que la información esté actualizada con la realidad académica vigente.</li>
            <li>Incumplimiento: Violación de normas de seguridad, falta de puntualidad o mala conducta.</li>
            </ul>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA NOVENA: GRABACIÓN Y SEGURIDAD</h4>
            <p>EL CONTRATISTA acepta que todas las sesiones serán grabadas íntegramente por motivos de seguridad, auditoría de calidad y para ser compartidas con los tutores legales de los usuarios.</p>

            <h4 style={{ marginTop: '20px', marginBottom: '10px', color: 'var(--primary)' }}>CLÁUSULA DÉCIMA: LEY APLICABLE</h4>
            <p>Para todos los efectos legales, el contrato se regirá por la normativa civil vigente en el Estado Plurinacional de Bolivia.</p>

            <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
            Al hacer clic en el "checkbox" de verificación "He leído y acepto el Contrato de Mentor/Moderador", usted confirma que ha leído y acepta estos términos para operar como Mentor o Moderador o Ambos en Vincobo.
            </p>

            <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--gray)' }}>Última actualización: 23 de abril de 2026</p>
        </div>
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'white',
          position: 'sticky',
          bottom: 0
        }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '8px 24px' }}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default function RegistroMentor() {
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const [mostrarContrato, setMostrarContrato] = useState(false)
  const [aceptoContrato, setAceptoContrato] = useState(false)
  const [errores, setErrores] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const navigate = useNavigate()

  // Datos básicos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [celular, setCelular] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [tipoRol, setTipoRol] = useState('mentor')

  // Listas desde BD
  const [instituciones, setInstituciones] = useState([])
  const [carrerasDisponibles, setCarrerasDisponibles] = useState([])

  // Carreras múltiples
  const [estudios, setEstudios] = useState([{ universidad: '', carrera: '', semestre: '' }])

  // Documentos
  const [carnetFront, setCarnetFront] = useState(null)
  const [carnetBack, setCarnetBack] = useState(null)
  const [documentoEstudiante, setDocumentoEstudiante] = useState(null)

  // Función para calcular edad
  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return null
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  // Función para formatear nombre (primera letra mayúscula, resto minúscula)
  const formatearNombre = (nombre) => {
    if (!nombre) return ''
    return nombre
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ')
  }

  // Validaciones
  const validarCampo = (nombre, valor) => {
    let error = ''

    switch(nombre) {
      case 'nombreCompleto':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(valor)) {
          error = 'Solo se permiten letras'
        } else if (valor.length < 3) {
          error = 'Mínimo 3 caracteres'
        }
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          error = 'Email inválido'
        }
        break
      case 'celular':
        if (!/^[0-9]{7,8}$/.test(valor)) {
          error = 'Celular inválido (7-8 dígitos)'
        }
        break
      case 'fechaNacimiento':
        if (!valor) {
          error = 'Fecha de nacimiento requerida'
        } else {
          const edad = calcularEdad(valor)
          if (edad < 18) {
            error = 'Debes tener al menos 18 años para ser mentor/moderador'
          } else if (edad > 99) {
            error = 'Edad fuera del rango permitido'
          }
        }
        break
      case 'password':
        if (valor.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres'
        }
        break
      case 'confirmPassword':
        if (valor !== password) {
          error = 'Las contraseñas no coinciden'
        }
        break
      default: break
    }

    setErrores(prev => ({ ...prev, [nombre]: error }))
    return !error
  }

  const handleNombreChange = (e) => {
    const valor = e.target.value
    setNombreCompleto(valor)
    validarCampo('nombreCompleto', valor)
  }

  const handleEmailChange = (e) => {
    const valor = e.target.value
    setEmail(valor)
    validarCampo('email', valor)
  }

  const handleCelularChange = (e) => {
    const valor = e.target.value
    setCelular(valor)
    validarCampo('celular', valor)
  }

  const handleFechaNacimientoChange = (e) => {
    const valor = e.target.value
    setFechaNacimiento(valor)
    validarCampo('fechaNacimiento', valor)
  }

  const handlePasswordChange = (e) => {
    const valor = e.target.value
    setPassword(valor)
    validarCampo('password', valor)
    if (confirmPassword) {
      validarCampo('confirmPassword', confirmPassword)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const valor = e.target.value
    setConfirmPassword(valor)
    validarCampo('confirmPassword', valor)
  }

  const agregarEstudio = () => {
    setEstudios([...estudios, { universidad: '', carrera: '', semestre: '' }])
  }

  const eliminarEstudio = (index) => {
    if (estudios.length === 1) return
    const nuevosEstudios = estudios.filter((_, i) => i !== index)
    setEstudios(nuevosEstudios)
  }

  const actualizarEstudio = (index, campo, valor) => {
    const nuevosEstudios = [...estudios]
    nuevosEstudios[index][campo] = valor
    setEstudios(nuevosEstudios)
  }

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  // Función para sanitizar el nombre (para usar como nombre de carpeta)
  const sanitizarNombre = (nombre) => {
    return nombre
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
  }

  // Función para subir archivos al bucket 'mentores' con subcarpeta por mentor
  const subirArchivo = async (file, carpeta, nombreMentor) => {
    if (!file) return null
    
    try {
      const nombreLimpio = sanitizarNombre(nombreMentor)
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

      const { data: urlData } = supabase.storage
        .from('mentores')
        .getPublicUrl(filePath)

      return urlData.publicUrl
    } catch (err) {
      console.error('Error en subirArchivo:', err)
      return null
    }
  }

  // Cargar datos
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: instData } = await supabase
        .from('instituciones')
        .select('*')
        .order('nombre', { ascending: true })
      setInstituciones(instData || [])

      const { data: carrerasData } = await supabase
        .from('carreras')
        .select('*')
        .order('nombre', { ascending: true })
      setCarrerasDisponibles(carrerasData || [])

      setCargando(false)
    }
    cargarDatos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validoNombre = validarCampo('nombreCompleto', nombreCompleto)
    const validoEmail = validarCampo('email', email)
    const validoCelular = validarCampo('celular', celular)
    const validoFecha = validarCampo('fechaNacimiento', fechaNacimiento)
    const validoPassword = validarCampo('password', password)
    const validoConfirm = validarCampo('confirmPassword', confirmPassword)

    if (!validoNombre || !validoEmail || !validoCelular || !validoFecha || !validoPassword || !validoConfirm) {
      mostrarNotificacion('Corrige los errores en el formulario')
      return
    }

    if (!email || !nombreCompleto || !celular || !fechaNacimiento || !password) {
      mostrarNotificacion('Completa todos los campos obligatorios')
      return
    }

    if (!aceptoContrato) {
      mostrarNotificacion('Debes aceptar el contrato')
      return
    }

    for (let i = 0; i < estudios.length; i++) {
      if (!estudios[i].universidad) {
        mostrarNotificacion(`Selecciona universidad para estudio ${i + 1}`)
        return
      }
      if (!estudios[i].carrera) {
        mostrarNotificacion(`Selecciona carrera para estudio ${i + 1}`)
        return
      }
      if (!estudios[i].semestre) {
        mostrarNotificacion(`Ingresa semestre para estudio ${i + 1}`)
        return
      }
    }

    if (!carnetFront || !carnetBack || !documentoEstudiante) {
      mostrarNotificacion('Debes subir todos los documentos')
      return
    }

    setEnviando(true)

    // PASO 1: Crear usuario en Auth con la contraseña proporcionada
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      mostrarNotificacion('Error al crear usuario: ' + authError.message)
      setEnviando(false)
      return
    }

    if (!authData.user) {
      mostrarNotificacion('Error al crear usuario')
      setEnviando(false)
      return
    }

    // PASO 2: Subir documentos con subcarpeta por nombre
    const carnetFrontUrl = await subirArchivo(carnetFront, 'carnets', nombreCompleto)
    const carnetBackUrl = await subirArchivo(carnetBack, 'carnets', nombreCompleto)
    const documentoUrl = await subirArchivo(documentoEstudiante, 'documentos_estudiante', nombreCompleto)

    if (!carnetFrontUrl || !carnetBackUrl || !documentoUrl) {
      mostrarNotificacion('Error al subir documentos')
      setEnviando(false)
      return
    }

    const universidadesArray = estudios.map(e => e.universidad)
    const carrerasArray = estudios.map(e => e.carrera)
    const semestresArray = estudios.map(e => e.semestre)

    let rol = 'usuario'
    if (tipoRol === 'mentor') rol = 'mentor'
    else if (tipoRol === 'moderador') rol = 'moderador'
    else if (tipoRol === 'mentor_moderador') rol = 'mentor_moderador'

    // Calcular edad desde la fecha de nacimiento
    const edadCalculada = calcularEdad(fechaNacimiento)

    // PASO 3: Guardar en perfiles
    const { error } = await supabase
      .from('perfiles')
      .insert([{
        id: authData.user.id,
        email,
        nombre_completo: formatearNombre(nombreCompleto), 
        celular,
        tipo_usuario: 'mayor',
        rol,
        universidad: universidadesArray[0],
        carrera: carrerasArray[0],
        semestre: semestresArray[0],
        universidades: universidadesArray,
        carreras: carrerasArray,
        semestres: semestresArray,
        edad: edadCalculada,
        fecha_nacimiento_mayor: fechaNacimiento,
        carnet_front: carnetFrontUrl,
        carnet_back: carnetBackUrl,
        documento_estudiante: documentoUrl,
        documentos_verificados: false,
        fecha_registro_mentor: new Date().toISOString(),
        cuenta_activada: false,
        contrato_aceptado: true
      }])

    if (error) {
      mostrarNotificacion('Error al registrar: ' + error.message)
      console.error('Error detallado:', error)
    } else {
      mostrarNotificacion('Registro exitoso! Tu cuenta será revisada por el administrador.', 'success')
      // Cerrar sesión después del registro
      await supabase.auth.signOut()
      setTimeout(() => {
        navigate('/')
      }, 4000)
    }
    setEnviando(false)
  }

  if (cargando) {
    return <Loader mensaje="Cargando formulario..." />
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)' }}>
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

      <nav className="navbar">
        <div className="container navbar-content">
          <button onClick={() => navigate('/')} className="btn-nav">
            <IconArrowLeft />
            <span>Volver al inicio</span>
          </button>
          <span className="logo">Vincobo</span>
        </div>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="card" style={{ maxWidth: '900px', width: '100%', borderTop: '4px solid var(--primary)' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
            Registro de Mentor / Moderador
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '30px' }}>
            Completa el formulario para unirte a nuestro equipo
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Datos Personales</h3>

            <div className="form-group">
              <label className="form-label"><IconMail /> Email</label>
              <input type="email" className="form-input" required value={email} onChange={handleEmailChange} placeholder="correo@ejemplo.com" style={{ borderColor: errores.email ? 'var(--error)' : '#E2E8F0' }} />
              {errores.email && <p className="error-message">{errores.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label"><IconLock /> Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-input" 
                  required 
                  value={password} 
                  onChange={handlePasswordChange} 
                  placeholder="Mínimo 6 caracteres"
                  style={{ borderColor: errores.password ? 'var(--error)' : '#E2E8F0', paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--gray)'
                  }}
                >
                  {mostrarPassword ? <IconEye /> : <IconEyeOff />}
                </button>
              </div>
              {errores.password && <p className="error-message">{errores.password}</p>}
            </div>

            <div className="form-group">
              <label className="form-label"><IconLock /> Confirmar Contraseña</label>
              <input 
                type="password"
                className="form-input" 
                required 
                value={confirmPassword} 
                onChange={handleConfirmPasswordChange} 
                placeholder="Repite tu contraseña"
                style={{ borderColor: errores.confirmPassword ? 'var(--error)' : '#E2E8F0' }}
              />
              {errores.confirmPassword && <p className="error-message">{errores.confirmPassword}</p>}
            </div>

            <div className="form-group">
              <label className="form-label"><IconUser /> Nombre Completo</label>
              <input type="text" className="form-input" required value={nombreCompleto} onChange={handleNombreChange} placeholder="Ej: Juan José Pérez Pérez" style={{ borderColor: errores.nombreCompleto ? 'var(--error)' : '#E2E8F0' }} />
              {errores.nombreCompleto && <p className="error-message">{errores.nombreCompleto}</p>}
            </div>

            <div className="form-group">
              <label className="form-label"><IconPhone /> Celular</label>
              <input type="tel" className="form-input" required value={celular} onChange={handleCelularChange} placeholder="76543210" style={{ borderColor: errores.celular ? 'var(--error)' : '#E2E8F0' }} />
              {errores.celular && <p className="error-message">{errores.celular}</p>}
            </div>

            <div className="form-group">
              <label className="form-label"><IconCalendar /> Fecha de Nacimiento</label>
              <input 
                type="date" 
                className="form-input" 
                required 
                value={fechaNacimiento} 
                onChange={handleFechaNacimientoChange}
                max={new Date().toISOString().split('T')[0]}
                style={{ borderColor: errores.fechaNacimiento ? 'var(--error)' : '#E2E8F0' }} 
                onKeyDown={(e) => e.preventDefault()}
              />
              {errores.fechaNacimiento && <p className="error-message">{errores.fechaNacimiento}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Rol deseado</label>
              <select className="form-input" required value={tipoRol} onChange={(e) => setTipoRol(e.target.value)}>
                <option value="mentor">Mentor</option>
                <option value="moderador">Moderador</option>
                <option value="mentor_moderador">Mentor + Moderador</option>
              </select>
            </div>

            <h3 style={{ marginBottom: '20px', marginTop: '30px', color: 'var(--primary)' }}>
              <IconBook /> Estudios realizando o realizados
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--gray)', marginBottom: '15px' }}>
              Puedes agregar múltiples carreras si estudiaste o estudias en diferentes universidades
            </p>

            {estudios.map((estudio, index) => (
              <div key={index} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--primary)', margin: 0 }}>Estudio {index + 1}</h4>
                  {estudios.length > 1 && (
                    <button type="button" onClick={() => eliminarEstudio(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', padding: '5px' }}>
                      <IconMinus /> Eliminar
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label"><IconUniversity /> Universidad/Institución</label>
                  <select className="form-input" value={estudio.universidad} onChange={(e) => actualizarEstudio(index, 'universidad', e.target.value)} required>
                    <option value="">Selecciona una institución</option>
                    {instituciones.map(inst => (
                      <option key={inst.id} value={inst.nombre}>{inst.nombre}{inst.ciudad ? ` (${inst.ciudad})` : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><IconBook /> Carrera</label>
                  <select className="form-input" value={estudio.carrera} onChange={(e) => actualizarEstudio(index, 'carrera', e.target.value)} required>
                    <option value="">Selecciona una carrera</option>
                    {carrerasDisponibles.map(c => (
                      <option key={c.id} value={c.nombre}>{c.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Semestre / Año actual</label>
                  <select className="form-input" value={estudio.semestre} onChange={(e) => actualizarEstudio(index, 'semestre', e.target.value)} required>
                    <option value="">Selecciona semestre/año</option>
                    <option value="1er semestre">1er semestre</option>
                    <option value="2do semestre">2do semestre</option>
                    <option value="3er semestre">3er semestre</option>
                    <option value="4to semestre">4to semestre</option>
                    <option value="5to semestre">5to semestre</option>
                    <option value="6to semestre">6to semestre</option>
                    <option value="7mo semestre">7mo semestre</option>
                    <option value="8vo semestre">8vo semestre</option>
                    <option value="9no semestre">9no semestre</option>
                    <option value="10mo semestre">10mo semestre</option>
                    <option value="Egresado">Egresado</option>
                    <option value="Titulado">Titulado</option>
                  </select>
                </div>
              </div>
            ))}

            <button type="button" onClick={agregarEstudio} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
              <IconPlus /> Agregar otra carrera/institución
            </button>

            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Documentación</h3>

            <div className="form-group">
              <label className="form-label">Carnet de Identidad (Frente)</label>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setCarnetFront(e.target.files[0])} required className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Carnet de Identidad (Dorso)</label>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setCarnetBack(e.target.files[0])} required className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Documento que acredite estudios actuales/finalizados (carnet universitario, matrícula, certificado de egreso u otro)</label>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setDocumentoEstudiante(e.target.files[0])} required className="form-input" />
            </div>

            <div style={{ margin: '30px 0' }}>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="contrato" checked={aceptoContrato} onChange={(e) => setAceptoContrato(e.target.checked)} required />
                <label htmlFor="contrato">
                  He leído y acepto el{' '}
                  <button type="button" onClick={() => setMostrarContrato(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
                    Contrato de Mentor/Moderador
                  </button>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={enviando}>
              {enviando ? 'Enviando solicitud...' : 'Enviar solicitud'}
            </button>
          </form>
        </div>
      </div>

      <ModalContrato isOpen={mostrarContrato} onClose={() => setMostrarContrato(false)} />

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .error-message { color: var(--error); font-size: 12px; margin-top: 4px; }
      `}</style>
    </div>
  )
}
