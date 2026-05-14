export default function Loader({ mensaje = 'Cargando...' }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(5px)'
    }}>
      {/* Círculo giratorio */}
      <div style={{
        width: '60px',
        height: '60px',
        border: '4px solid var(--primary-light)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }} />
      
      <p style={{
        fontSize: '18px',
        color: 'var(--primary)',
        fontWeight: '500',
        marginTop: '20px'
      }}>
        {mensaje}
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}