import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar
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

    // Intentar iniciar sesión
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      mostrarNotificacion('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    // Verificar si la cuenta está activada
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

    // Si la cuenta está desactivada (solo para mentores/moderadores pendientes)
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
      {/* Notificación flotante */}
      {notificacion.mostrar && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notificacion.tipo === 'success' ? 'var(--success)' : notificacion.tipo === 'warning' ? 'var(--warning)' : 'var(--error)',
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
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center" style={{ marginBottom: '30px' }}>
            Iniciar Sesión
          </h2>

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
                  {mostrarPassword ? '👁️' : '👁️‍🗨️'}
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
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

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