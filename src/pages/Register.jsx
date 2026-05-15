import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
const IconEye = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconEyeOff = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
export default function Register() {
  const [tipo, setTipo] = useState('mayor')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre_completo: '',
    celular: '',
    nombre_menor: '',
    fecha_nacimiento: '',
    fecha_nacimiento_menor: ''
  })
  const [errores, setErrores] = useState({})
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const navigate = useNavigate()

  // Función para calcular edad a partir de fecha de nacimiento
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

  // Validaciones en tiempo real
  const validarCampo = (nombre, valor) => {
    let error = ''

    switch(nombre) {
      case 'nombre_completo':
      case 'nombre_menor':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(valor)) {
          error = 'Solo se permiten letras (sin números ni caracteres especiales)'
        } else if (valor.length < 3) {
          error = 'Debe tener al menos 3 caracteres'
        }
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          error = 'Ingresa un email válido'
        }
        break
      case 'password':
        if (valor.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres'
        }
        break
      case 'celular':
        if (!/^[0-9]{7,8}$/.test(valor)) {
          error = 'Ingresa un celular válido (7-8 dígitos)'
        }
        break
      case 'fecha_nacimiento':
        if (!valor) {
          error = 'La fecha de nacimiento es requerida'
        } else {
          const edad = calcularEdad(valor)
          if (edad < 18) {
            error = 'Debes ser mayor de 18 años para registrarte (selecciona la opción "Tutor" si eres menor)'
          } else if (edad > 100) {
            error = 'Por favor, verifica tu fecha de nacimiento'
          }
        }
        break
      case 'fecha_nacimiento_menor':
        if (tipo === 'tutor' && !valor) {
          error = 'La fecha de nacimiento del menor es requerida'
        } else if (valor && tipo === 'tutor') {
          const edadMenor = calcularEdad(valor)
          if (edadMenor < 0 || edadMenor > 17) {
            error = 'El menor debe tener entre 0 y 17 años'
          }
        }
        break
      default:
        break
    }

    setErrores(prev => ({ ...prev, [nombre]: error }))
    return !error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validarCampo(name, value)
  }

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  // Función para traducir errores de Supabase
  const traducirErrorSupabase = (error) => {
    const errores = {
      'User already registered': 'Este correo electrónico ya está registrado',
      'Invalid email': 'Correo electrónico inválido',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      'Email signups are disabled': 'Los registros están temporalmente desactivados',
      'Signup requires a valid password': 'La contraseña es requerida',
      'Signup requires a valid email': 'El correo electrónico es requerido',
      'Unable to validate email address: invalid format': 'Formato de correo electrónico inválido',
      'Email rate limit exceeded': 'Demasiados intentos, espera unos minutos',
      'Invalid login credentials': 'Credenciales inválidas',
      'Email not confirmed': 'Correo electrónico no confirmado'
    }

    return errores[error] || `Error: ${error}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar todos los campos antes de enviar
    const camposAValidar = ['email', 'password', 'nombre_completo', 'celular', 'fecha_nacimiento']
    let valido = true
    
    camposAValidar.forEach(campo => {
      if (!validarCampo(campo, formData[campo])) {
        valido = false
      }
    })

    if (tipo === 'tutor') {
      if (!formData.nombre_menor) {
        setErrores(prev => ({ ...prev, nombre_menor: 'Este campo es requerido' }))
        valido = false
      } else if (!validarCampo('nombre_menor', formData.nombre_menor)) {
        valido = false
      }
      
      if (!validarCampo('fecha_nacimiento_menor', formData.fecha_nacimiento_menor)) {
        valido = false
      }
    }

    if (!valido) {
      mostrarNotificacion('Por favor, corrige los errores en el formulario')
      return
    }

    setLoading(true)

    // Calcular edad automáticamente
    const edad = calcularEdad(formData.fecha_nacimiento)

    // PASO 1: Registrar en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
      mostrarNotificacion(traducirErrorSupabase(authError.message))
      setLoading(false)
      return
    }

    // PASO 2: Guardar perfil en la tabla 'perfiles'
    if (authData.user) {
        const { error: profileError } = await supabase
            .from('perfiles')
            .insert([{
              id: authData.user.id,
              email: formData.email,
              nombre_completo: formData.nombre_completo,
              celular: formData.celular,
              tipo_usuario: tipo,
              nombre_menor: tipo === 'tutor' ? formData.nombre_menor : null,
              rol: 'usuario',
              edad: edad,
              fecha_nacimiento_mayor: formData.fecha_nacimiento,
              fecha_nacimiento_menor: tipo === 'tutor' ? formData.fecha_nacimiento_menor : null
            }])

        if (profileError) {
            mostrarNotificacion('Error al guardar perfil: ' + profileError.message)
        } else {
            mostrarNotificacion('Registro exitoso! Ahora inicia sesión', 'success')
            setTimeout(() => {
            navigate('/login')
            }, 2000)
        }
    }
    setLoading(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--light)',
    }}>
      {/* Notificación flotante */}
      {notificacion.mostrar && (
        <div className={`notification notification-${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      {/* Navbar con botón volver */}
      <nav className="navbar">
        <div className="container navbar-content">
          <button
            onClick={() => navigate('/')}
            className="btn-nav"
            >
            <span>←</span>
            Volver al inicio
          </button>
          <span className="logo">Vincobo</span>
        </div>
      </nav>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="text-center" style={{ marginBottom: '30px' }}>
            Crear cuenta en Vincobo
          </h2>

          {/* AVISO IMPORTANTE PARA MENORES */}
          <div style={{
            background: 'var(--warning-bg)',
            border: '1px solid #F59E0B',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            color: 'var(--warning-text)'
          }}>
            <strong>IMPORTANTE:</strong> Si el estudiante que recibirá la mentoría es <strong>MENOR DE 18 AÑOS</strong>, 
            debe seleccionar la opción "Tutor (menor de 18)" y registrarse con los datos del padre/madre/tutor.
          </div>

          {/* Toggle Mayor / Tutor */}
          <div className="toggle-container">
            <button
              className={`toggle-option ${tipo === 'mayor' ? 'active' : ''}`}
              onClick={() => setTipo('mayor')}
            >
              18 años o más
            </button>
            <button
              className={`toggle-option ${tipo === 'tutor' ? 'active' : ''}`}
              onClick={() => setTipo('tutor')}
            >
              Tutor (menor de 18)
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                style={{
                  borderColor: errores.email ? 'var(--error)' : '#E2E8F0'
                }}
              />
              {errores.email && (
                <p className="error-message">{errores.email}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  style={{
                    borderColor: errores.password ? 'var(--error)' : '#E2E8F0',
                    paddingRight: '40px'
                  }}
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
              {errores.password && (
                <p className="error-message">{errores.password}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                {tipo === 'mayor' ? 'Nombre completo' : 'Nombre completo del tutor'}
              </label>
              <input
                type="text"
                name="nombre_completo"
                className="form-input"
                value={formData.nombre_completo}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                style={{
                  borderColor: errores.nombre_completo ? 'var(--error)' : '#E2E8F0'
                }}
              />
              {errores.nombre_completo && (
                <p className="error-message">{errores.nombre_completo}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Fecha de nacimiento {tipo === 'mayor' ? '' : '(del tutor)'}
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                className="form-input"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                style={{
                  borderColor: errores.fecha_nacimiento ? 'var(--error)' : '#E2E8F0'
                }}
                onKeyDown={(e) => e.preventDefault()}
              />
              {errores.fecha_nacimiento && (
                <p className="error-message">{errores.fecha_nacimiento}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Celular</label>
              <input
                type="tel"
                name="celular"
                className="form-input"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Ej: 76543210"
                style={{
                  borderColor: errores.celular ? 'var(--error)' : '#E2E8F0'
                }}
              />
              {errores.celular && (
                <p className="error-message">{errores.celular}</p>
              )}
            </div>

            {tipo === 'tutor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Nombre del menor (tu hijo/a, quién recibirá la mentoría)</label>
                  <input
                    type="text"
                    name="nombre_menor"
                    className="form-input"
                    value={formData.nombre_menor}
                    onChange={handleChange}
                    placeholder="Ej: Carlitos Pérez"
                    style={{
                      borderColor: errores.nombre_menor ? 'var(--error)' : '#E2E8F0'
                    }}
                  />
                  {errores.nombre_menor && (
                    <p className="error-message">{errores.nombre_menor}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Fecha de nacimiento del menor</label>
                  <input
                    type="date"
                    name="fecha_nacimiento_menor"
                    className="form-input"
                    value={formData.fecha_nacimiento_menor}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    style={{
                      borderColor: errores.fecha_nacimiento_menor ? 'var(--error)' : '#E2E8F0'
                    }}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                  {errores.fecha_nacimiento_menor && (
                    <p className="error-message">{errores.fecha_nacimiento_menor}</p>
                  )}
                </div>
              </>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: '20px' }}>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '16px'
              }}
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
