import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const IconEye = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconEyeOff = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errores, setErrores] = useState({})
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const [validToken, setValidToken] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setValidToken(false)
        mostrarNotificacion('Enlace inválido o expirado. Solicita un nuevo enlace de recuperación.', 'error')
      }
    }
    checkSession()
  }, [])

  const validarPassword = (valor) => {
    if (!valor) {
      return 'La contraseña es requerida'
    }
    if (valor.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres'
    }
    return ''
  }

  const validarConfirmPassword = (valor) => {
    if (!valor) {
      return 'Confirma tu contraseña'
    }
    if (valor !== password) {
      return 'Las contraseñas no coinciden'
    }
    return ''
  }

  const handlePasswordChange = (e) => {
    const valor = e.target.value
    setPassword(valor)
    const error = validarPassword(valor)
    setErrores(prev => ({ ...prev, password: error }))
    
    // Validar confirmación si ya tiene valor
    if (confirmPassword) {
      const confirmError = validarConfirmPassword(confirmPassword)
      setErrores(prev => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const valor = e.target.value
    setConfirmPassword(valor)
    const error = validarConfirmPassword(valor)
    setErrores(prev => ({ ...prev, confirmPassword: error }))
  }

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errorPassword = validarPassword(password)
    const errorConfirm = validarConfirmPassword(confirmPassword)

    setErrores({
      password: errorPassword,
      confirmPassword: errorConfirm
    })

    if (errorPassword || errorConfirm) {
      mostrarNotificacion('Por favor, corrige los errores del formulario')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      mostrarNotificacion('Error al actualizar la contraseña: ' + error.message)
    } else {
      mostrarNotificacion('Contraseña actualizada correctamente', 'success')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }

    setLoading(false)
  }

  if (!validToken) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
        {notificacion.mostrar && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'var(--error)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            zIndex: 9999,
            animation: 'slideIn 0.3s ease'
          }}>
            {notificacion.mensaje}
          </div>
        )}
        <nav className="navbar">
          <div className="container navbar-content">
            <button onClick={() => navigate('/login')} className="btn-nav">
              <span>←</span>
              Volver al login
            </button>
            <span className="logo">Vincobo</span>
          </div>
        </nav>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>El enlace de recuperación es inválido o ha expirado.</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light)' }}>
      {notificacion.mostrar && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notificacion.tipo === 'success' ? 'var(--success)' : 'var(--error)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease'
        }}>
          {notificacion.mensaje}
        </div>
      )}

      <nav className="navbar">
        <div className="container navbar-content">
          <button onClick={() => navigate('/login')} className="btn-nav">
            <span>←</span>
            Volver al login
          </button>
          <span className="logo">Vincobo</span>
        </div>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary)' }}>
            Restablecer contraseña
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Nueva contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-input"
                  value={password}
                  onChange={handlePasswordChange}
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
                <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>
                  {errores.password}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Repite tu nueva contraseña"
                  style={{
                    borderColor: errores.confirmPassword ? 'var(--error)' : '#E2E8F0',
                    paddingRight: '40px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
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
                  {mostrarConfirmPassword ? <IconEye /> : <IconEyeOff />}
                </button>
              </div>
              {errores.confirmPassword && (
                <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>
                  {errores.confirmPassword}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
