import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const IconEye = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconEyeOff = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  const [validToken, setValidToken] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si el usuario viene de un enlace válido de recuperación
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setValidToken(false)
        mostrarNotificacion('Enlace inválido o expirado. Solicita un nuevo enlace de recuperación.', 'error')
      }
    }
    checkSession()
  }, [])

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      mostrarNotificacion('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      mostrarNotificacion('Las contraseñas no coinciden')
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nueva contraseña</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
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
                    cursor: 'pointer'
                  }}
                >
                  {mostrarPassword ? <IconEye /> : <IconEyeOff />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu nueva contraseña"
                required
              />
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
