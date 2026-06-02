import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const IconEye = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconEyeOff = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recuperando, setRecuperando] = useState(false)
  const [emailRecuperacion, setEmailRecuperacion] = useState('')
  const [enviandoEmail, setEnviandoEmail] = useState(false)
  const [errores, setErrores] = useState({})
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const navigate = useNavigate()

  const validarEmail = (valor) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      return 'Ingresa un email válido'
    }
    return ''
  }

  const validarPassword = (valor) => {
    if (valor.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres'
    }
    return ''
  }

  const handleEmailChange = (e) => {
    const valor = e.target.value
    setEmail(valor)
    const error = validarEmail(valor)
    setErrores(prev => ({ ...prev, email: error }))
  }

  const handlePasswordChange = (e) => {
    const valor = e.target.value
    setPassword(valor)
    const error = validarPassword(valor)
    setErrores(prev => ({ ...prev, password: error }))
  }

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  const handleRecuperarPassword = async (e) => {
    e.preventDefault()
    
    const errorEmail = validarEmail(emailRecuperacion)
    if (errorEmail) {
      mostrarNotificacion('Ingresa un email válido')
      return
    }

    setEnviandoEmail(true)

    const { error } = await supabase.auth.resetPasswordForEmail(emailRecuperacion, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      mostrarNotificacion('Error al enviar el enlace: ' + error.message)
    } else {
      mostrarNotificacion('Te enviamos un enlace a tu correo para restablecer tu contraseña', 'success')
      setEmailRecuperacion('')
      // Opcional: volver al login después de 3 segundos
      setTimeout(() => {
        setRecuperando(false)
      }, 3000)
    }
    setEnviandoEmail(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errorEmail = validarEmail(email)
    const errorPassword = validarPassword(password)
    
    setErrores({
      email: errorEmail,
      password: errorPassword
    })

    if (errorEmail || errorPassword) {
      mostrarNotificacion('Por favor, corrige los errores')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      mostrarNotificacion('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    const { data: perfil, error: perfilError } = await supabase
      .from('perfiles')
      .select('cuenta_activada, rol')
      .eq('id', data.user.id)
      .single()

    if (perfilError) {
      mostrarNotificacion('Error al verificar tu cuenta')
      setLoading(false)
      return
    }

    if (perfil.cuenta_activada === false) {
      await supabase.auth.signOut()
      mostrarNotificacion('Tu cuenta está pendiente de verificación.', 'warning')
      setLoading(false)
      return
    }

    mostrarNotificacion('¡Bienvenido!', 'success')
    setTimeout(() => {
      navigate('/reserva')
    }, 1500)
    setLoading(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--light)',
    }}>
      {notificacion.mostrar && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notificacion.tipo === 'success' ? 'var(--success)' : notificacion.tipo === 'warning' ? '#F59E0B' : 'var(--error)',
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
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center" style={{ marginBottom: '30px' }}>
            {recuperando ? 'Recuperar contraseña' : 'Iniciar Sesión'}
          </h2>

          {!recuperando ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="ejemplo@correo.com"
                  style={{
                    borderColor: errores.email ? 'var(--error)' : '#E2E8F0'
                  }}
                />
                {errores.email && (
                  <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>
                    {errores.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Tu contraseña"
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
                  <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>
                    {errores.password}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginBottom: '15px' }}
                disabled={loading}
              >
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>

              {/* ¿Olvidaste tu contraseña? debajo del botón */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setRecuperando(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRecuperarPassword}>
              <div className="form-group">
                <label className="form-label">Email registrado</label>
                <input
                  type="email"
                  className="form-input"
                  value={emailRecuperacion}
                  onChange={(e) => setEmailRecuperacion(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  required
                />
                <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '8px' }}>
                  Te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setRecuperando(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={enviandoEmail}
                >
                  {enviandoEmail ? 'Enviando...' : 'Enviar enlace'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center" style={{ marginTop: '20px' }}>
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '16px'
              }}
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
