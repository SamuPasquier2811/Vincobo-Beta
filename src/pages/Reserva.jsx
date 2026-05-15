import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Loader from '../components/Loader'

// Iconos profesionales
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
const IconChild = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M5.5 20v-4a6.5 6.5 0 0 1 13 0v4"/></svg>
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconClock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconUniversity = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconBook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
const IconArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
const IconArrowRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const IconConsult = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
const IconCareer = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
const IconNotes = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
const IconPrice = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IconQuestion = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const IconTarget = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const IconBriefcase = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>

// Modal para Términos y Condiciones
const ModalTerminos = ({ isOpen, onClose }) => {
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
      animation: 'modalFadeIn 0.2s ease',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        maxWidth: '700px', 
        width: '100%', 
        maxHeight: '85vh', 
        overflowY: 'auto', 
        boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{ 
          padding: '16px 20px', 
          borderBottom: '1px solid #E2E8F0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          position: 'sticky', 
          top: 0, 
          background: 'white', 
          zIndex: 1,
          flexShrink: 0
        }}>
          <h3 style={{ color: 'var(--primary)', margin: 0, fontSize: 'clamp(16px, 5vw, 20px)' }}>Términos y Condiciones de Uso</h3>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '28px', 
              cursor: 'pointer', 
              color: 'var(--gray)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>
        <div style={{ 
          padding: '20px', 
          fontSize: 'clamp(12px, 4vw, 14px)', 
          lineHeight: '1.6',
          overflowY: 'auto',
          flex: 1
        }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: 'clamp(13px, 4vw, 16px)' }}>
            TÉRMINOS Y CONDICIONES DE USO – VINCOBO
          </p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>1. IDENTIFICACIÓN DEL SERVICIO</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO es una plataforma digital de mentoría académica que actúa como intermediaria tecnológica, conectando usuarios (estudiantes o personas en transición de carrera) con mentores (universitarios, egresados o profesionales), con el objetivo de brindar orientación educativa y profesional.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>2. ACEPTACIÓN DE LOS TÉRMINOS</h4>
          <p style={{ marginBottom: '12px' }}>El acceso, registro y uso de la plataforma implica la aceptación expresa, libre e informada de los presentes Términos y Condiciones.</p>
          <p style={{ marginBottom: '12px' }}>En el caso de usuarios menores de edad, la aceptación deberá ser realizada obligatoriamente por el padre, madre o tutor legal, quien asumirá la calidad de usuario responsable y contratante.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>3. DECLARACIÓN DE VERACIDAD Y RESPONSABILIDAD</h4>
          <p style={{ marginBottom: '12px' }}>El usuario declara que toda la información proporcionada es veraz, completa y actualizada.</p>
          <p style={{ marginBottom: '12px' }}>VINCOBO no será responsable por la falsedad, inexactitud o uso no autorizado de datos personales proporcionados por los usuarios.</p>
          <p style={{ marginBottom: '12px' }}>El usuario asume plena responsabilidad por cualquier daño o perjuicio derivado de la provisión de información falsa o del uso indebido de la identidad de terceros.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>4. CAPACIDAD LEGAL Y USO POR MENORES DE EDAD</h4>
          <p style={{ marginBottom: '12px' }}>El uso de la plataforma por menores de edad está permitido únicamente bajo supervisión y consentimiento expreso del padre, madre o tutor legal. A tal efecto, el adulto responsable deberá:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Crear la cuenta del menor.</li>
            <li>Autorizar el uso de la plataforma.</li>
            <li>Supervisar la participación del menor en las sesiones.</li>
            <li>El usuario garantiza contar con las autorizaciones necesarias para el uso de la plataforma por menores de edad, incluyendo su participación en sesiones que puedan ser grabadas.</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>Se deja claramente establecido que VINCOBO no será responsable por el uso indebido de la plataforma cuando estas obligaciones no sean cumplidas.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>5. SUPLANTACIÓN DE IDENTIDAD</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO no será responsable por registros realizados mediante suplantación de identidad, uso indebido de datos de terceros o cualquier forma de falsedad en la información proporcionada.</p>
          <p style={{ marginBottom: '12px' }}>En caso de detectarse estas conductas, la plataforma podrá suspender o cancelar la cuenta, sin perjuicio de iniciar las acciones legales correspondientes.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>6. NATURALEZA DEL SERVICIO</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO ofrece servicios de mentoría en las siguientes modalidades:</p>
          <ol style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Consulta</li>
            <li>Carrera</li>
            <li>Carrera+</li>
          </ol>
          <p style={{ marginBottom: '12px' }}>Las sesiones impartidas por VINCOBO:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Podrán ser supervisadas en tiempo real o de manera posterior.</li>
            <li>Serán grabadas por motivos de seguridad, control de calidad y resolución de posibles controversias.</li>
            <li>El usuario reconoce y acepta expresamente la grabación de las sesiones, declarando contar con las autorizaciones necesarias en caso de participación de menores de edad.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>7. OBLIGACIONES DE LOS USUARIOS</h4>
          <p style={{ marginBottom: '12px' }}>El usuario se compromete a:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Utilizar la plataforma de manera lícita y conforme a su finalidad.</li>
            <li>No grabar, reproducir, distribuir o comercializar el contenido recibido.</li>
            <li>No solicitar ni compartir datos personales con mentores (WhatsApp, redes sociales, etc.).</li>
            <li>Respetar las normas de conducta durante las sesiones.</li>
            <li>Proporcionar información veraz y no suplantar identidad de terceros.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>8. OBLIGACIONES DE LOS MENTORES</h4>
          <p style={{ marginBottom: '12px' }}>Los mentores deberán:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Brindar información veraz y adecuada.</li>
            <li>Mantener estándares profesionales (puntualidad, presentación, entorno adecuado).</li>
            <li>No compartir datos personales ni establecer contacto fuera de la plataforma.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>9. MODERACIÓN Y SEGURIDAD</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Todas las sesiones serán moderadas por personal designado.</li>
            <li>Se prohíbe expresamente: el intercambio de datos personales y conductas inapropiadas o riesgosas.</li>
            <li>La plataforma podrá suspender cuentas en caso de incumplimiento.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>10. PAGOS Y REEMBOLSOS</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Los pagos se realizan mediante QR, transferencia u otros medios habilitados.</li>
            <li>Política de reembolso: ✔ Procede si la sesión no se realiza por causas del mentor o la plataforma. ✘ No procede si la falla es atribuible al usuario, por ejemplo no acceder a las sesiones programadas.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>11. PROPIEDAD INTELECTUAL</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Todo el contenido (apuntes, videos, materiales) es para uso personal.</li>
            <li>Está prohibida su reproducción, distribución o comercialización.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>12. LIMITACIÓN DE RESPONSABILIDAD</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO no garantiza resultados académicos o profesionales derivados de las mentorías.</p>
          <p style={{ marginBottom: '12px' }}>La plataforma actúa como intermediaria y no sustituye formación académica formal.</p>
          <p style={{ marginBottom: '12px' }}>VINCOBO no será responsable por el uso indebido de la plataforma por parte de menores de edad cuando medie falsedad en la información proporcionada o ausencia de autorización del tutor legal.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>13. MODIFICACIONES</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO podrá modificar estos términos a tal efecto, notificará a los usuarios mediante la plataforma.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>14. LEGISLACIÓN APLICABLE</h4>
          <p style={{ marginBottom: '12px' }}>Estos términos se rigen por la normativa vigente del Estado Plurinacional de Bolivia, Constitución Política del Estado, Código Niño, Niña y Adolescente.</p>

          <p style={{ marginTop: '20px', fontSize: 'clamp(10px, 3vw, 12px)', color: 'var(--gray)' }}>Última actualización: 13 de mayo de 2026</p>
        </div>
        <div style={{ 
          padding: '16px 20px', 
          borderTop: '1px solid #E2E8F0', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          background: 'white', 
          position: 'sticky', 
          bottom: 0,
          flexShrink: 0
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-primary" 
            style={{ 
              padding: '10px 24px',
              fontSize: 'clamp(12px, 4vw, 14px)'
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
// Modal para Política de Privacidad - VERSIÓN RESPONSIVE
const ModalPrivacidad = ({ isOpen, onClose }) => {
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
      animation: 'modalFadeIn 0.2s ease',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        maxWidth: '700px', 
        width: '100%', 
        maxHeight: '85vh', 
        overflowY: 'auto', 
        boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <div style={{ 
          padding: '16px 20px', 
          borderBottom: '1px solid #E2E8F0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          position: 'sticky', 
          top: 0, 
          background: 'white', 
          zIndex: 1,
          flexShrink: 0
        }}>
          <h3 style={{ color: 'var(--primary)', margin: 0, fontSize: 'clamp(16px, 5vw, 20px)' }}>Política de Privacidad</h3>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '28px', 
              cursor: 'pointer', 
              color: 'var(--gray)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>
        <div style={{ 
          padding: '20px', 
          fontSize: 'clamp(12px, 4vw, 14px)', 
          lineHeight: '1.6',
          overflowY: 'auto',
          flex: 1
        }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: 'clamp(13px, 4vw, 16px)' }}>
            POLÍTICA DE PRIVACIDAD – VINCOBO
          </p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>1. RESPONSABLE DEL TRATAMIENTO</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO es responsable del tratamiento de datos personales recopilados a través de la plataforma.</p>
          <p style={{ marginBottom: '12px' }}>Los datos proporcionados serán considerados como declarados voluntariamente por el usuario bajo presunción de veracidad.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>2. DATOS RECOPILADOS</h4>
          <p style={{ marginBottom: '12px' }}>Se podrán recopilar:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Datos de identificación (nombre, edad, correo).</li>
            <li>Datos del tutor legal (en caso de menores).</li>
            <li>Información académica y de intereses.</li>
            <li>Registros de sesiones (video/audio).</li>
            <li>Datos de pago.</li>
            <li>VINCOBO presume que los datos de menores han sido proporcionados con autorización del tutor legal.</li>
            <li>VINCOBO no será responsable cuando exista falsedad o suplantación en la información proporcionada.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>3. FINALIDAD DEL TRATAMIENTO</h4>
          <p style={{ marginBottom: '12px' }}>Los datos serán utilizados para:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Gestionar el acceso a la plataforma.</li>
            <li>Coordinar mentorías.</li>
            <li>Garantizar la seguridad de las sesiones.</li>
            <li>Mejorar el servicio mediante análisis estadístico.</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>Los datos estadísticos serán utilizados de forma anonimizada y agregada.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>4. TRATAMIENTO DE DATOS DE MENORES</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>El tratamiento de datos de menores requiere consentimiento expreso del padre, madre o tutor legal.</li>
            <li>VINCOBO implementa medidas reforzadas de seguridad y control.</li>
            <li>No se recolectarán datos innecesarios del menor.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>5. CONSENTIMIENTO</h4>
          <p style={{ marginBottom: '12px' }}>El usuario (o su tutor legal) autoriza el tratamiento de sus datos al aceptar los términos.</p>
          <p style={{ marginBottom: '12px' }}>En el caso de menores:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>El consentimiento se verificará a partir del consentimiento expreso del padre, madre o tutor legal.</li>
            <li>Puede ser revocado en cualquier momento.</li>
            <li>El consentimiento se entenderá otorgado de buena fe con base en la información proporcionada por el usuario.</li>
            <li>VINCOBO podrá implementar mecanismos adicionales de verificación sin que ello implique obligación de garantizar la veracidad absoluta de los datos.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>6. SEGURIDAD DE LA INFORMACIÓN</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO adopta medidas técnicas y organizativas para proteger los datos contra:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Accesos no autorizados</li>
            <li>Pérdida o alteración</li>
            <li>Uso indebido</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>El usuario declara contar con las autorizaciones necesarias para la grabación, especialmente en caso de menores de edad.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>7. GRABACIÓN DE SESIONES</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Todas las sesiones son grabadas por razones de seguridad y control de calidad.</li>
            <li>El usuario acepta expresamente esta condición.</li>
            <li>Estas grabaciones no serán divulgadas públicamente.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>8. CESIÓN DE DATOS</h4>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>No se compartirán datos personales con terceros sin consentimiento.</li>
            <li>Solo se podrá compartir información anonimizada para fines comerciales o estadísticos.</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>9. DERECHOS DEL USUARIO</h4>
          <p style={{ marginBottom: '12px' }}>El usuario (o su tutor) podrá:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
            <li>Acceder a sus datos</li>
            <li>Solicitar rectificación</li>
            <li>Solicitar eliminación</li>
            <li>Oponerse al tratamiento</li>
          </ul>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>10. CONSERVACIÓN DE DATOS</h4>
          <p style={{ marginBottom: '12px' }}>Los datos serán conservados únicamente por el tiempo necesario para cumplir las finalidades descritas.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>11. MODIFICACIONES</h4>
          <p style={{ marginBottom: '12px' }}>VINCOBO podrá actualizar esta política en cualquier momento.</p>

          <h4 style={{ fontSize: 'clamp(14px, 4vw, 16px)', marginTop: '16px', marginBottom: '8px' }}>12. CONTACTO</h4>
          <p style={{ marginBottom: '12px' }}>Para consultas sobre privacidad o tratamiento de datos, el usuario podrá comunicarse con la plataforma mediante los canales oficiales.</p>

          <p style={{ marginTop: '20px', fontSize: 'clamp(10px, 3vw, 12px)', color: 'var(--gray)' }}>Última actualización: 13 de mayo de 2026</p>
        </div>
        <div style={{ 
          padding: '16px 20px', 
          borderTop: '1px solid #E2E8F0', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          background: 'white', 
          position: 'sticky', 
          bottom: 0,
          flexShrink: 0
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-primary" 
            style={{ 
              padding: '10px 24px',
              fontSize: 'clamp(12px, 4vw, 14px)'
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Reserva() {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [tipoUsuario, setTipoUsuario] = useState('mayor')
  const [cargando, setCargando] = useState(true)
  const [carreras, setCarreras] = useState([])
  const [instituciones, setInstituciones] = useState([])
  const [errores, setErrores] = useState({})
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '', tipo: '' })
  
  // Estados para el formulario
  const [nombreReservante, setNombreReservante] = useState('')
  const [emailReservante, setEmailReservante] = useState('')
  const [celularReservante, setCelularReservante] = useState('')
  const [nombreMenor, setNombreMenor] = useState('')
  const [carreraSeleccionada, setCarreraSeleccionada] = useState('')
  const [fecha, setFecha] = useState('')
  const [turno, setTurno] = useState('mañana')
  const [horarioEspecifico, setHorarioEspecifico] = useState('')
  const [situacionActual, setSituacionActual] = useState('')
  const [semestre, setSemestre] = useState('')
  const [universidad, setUniversidad] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [interesesMentoria, setInteresesMentoria] = useState([])
  
  // NUEVOS ESTADOS: Tipo de servicio
  const [tipoServicio, setTipoServicio] = useState('carrera')
  const [apuntesIncluidos, setApuntesIncluidos] = useState(false)
  const [temasInteres, setTemasInteres] = useState([])
  
  // Temas de interés para CONSULTA
  const temasConsulta = [
    'Examen de ingreso / Admisión',
    'Becas y beneficios estudiantiles',
    'Horarios y entorno de la facultad',
    'Vida universitaria y actividades',
    'Actividades extracurriculares',
    'Otros (Aclarar en comentarios)'
  ]
  
  // Intereses para CARRERA
  const interesesCarrera = [
    'Mercado laboral y salarios',
    'Malla curricular y nivel de dificultad',
    'Proyectos reales y qué se hace en clase',
    'Consejos para el examen de admisión/ingreso',
    'Experiencia personal del mentor',
    'Otros (Explicar en comentarios)'
  ]
  
  // Opciones para situación actual
  const opcionesSituacion = [
    'Estudiante de secundaria (colegio)',
    'Estudiante universitario',
    'Profesional (Egresado/Titulado)',
    'Otro'
  ]
  
  // Checkboxes de consentimiento
  const [aceptoTerminos, setAceptoTerminos] = useState(false)
  const [consentimientoMenor, setConsentimientoMenor] = useState(false)
  
  const [enviando, setEnviando] = useState(false)
  const [pasoActual, setPasoActual] = useState(1)
  const [haCambiadoPaso, setHaCambiadoPaso] = useState(false)

  const [mostrarTerminos, setMostrarTerminos] = useState(false)
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(false)

  const navigate = useNavigate()
  const carreraGuardada = localStorage.getItem('carreraSeleccionada') || ''

  // Calcular precio según tipo de servicio
  const calcularPrecio = () => {
    if (tipoServicio === 'consulta') return 30
    return apuntesIncluidos ? 85 : 60
  }

  // Calcular duración según tipo de servicio
  const calcularDuracion = () => {
    return tipoServicio === 'consulta' ? '15' : '45'
  }

  // Validaciones en tiempo real
  const validarCampo = (nombre, valor) => {
    let error = ''

    switch(nombre) {
      case 'nombreReservante':
      case 'nombreMenor':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/.test(valor)) {
          error = 'Solo se permiten letras'
        } else if (valor.length < 3 && valor.length > 0) {
          error = 'Mínimo 3 caracteres'
        }
        break
      case 'emailReservante':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          error = 'Email inválido'
        }
        break
      case 'celularReservante':
        if (!/^[0-9]{7,8}$/.test(valor)) {
          error = 'Celular inválido (7-8 dígitos)'
        }
        break
      default:
        break
    }

    setErrores(prev => ({ ...prev, [nombre]: error }))
    return !error
  }

  const handleNombreChange = (e) => {
    const valor = e.target.value
    setNombreReservante(valor)
    validarCampo('nombreReservante', valor)
  }

  const handleEmailChange = (e) => {
    const valor = e.target.value
    setEmailReservante(valor)
    validarCampo('emailReservante', valor)
  }

  const handleCelularChange = (e) => {
    const valor = e.target.value
    setCelularReservante(valor)
    validarCampo('celularReservante', valor)
  }

  const handleNombreMenorChange = (e) => {
    const valor = e.target.value
    setNombreMenor(valor)
    validarCampo('nombreMenor', valor)
  }

  const handleTemaChange = (tema) => {
    setTemasInteres(prev => 
      prev.includes(tema) 
        ? prev.filter(t => t !== tema)
        : [...prev, tema]
    )
  }

  const handleInteresCarreraChange = (interes) => {
    setInteresesMentoria(prev => 
      prev.includes(interes) 
        ? prev.filter(i => i !== interes)
        : [...prev, interes]
    )
  }

  const mostrarNotificacion = (mensaje, tipo = 'error') => {
    setNotificacion({ mostrar: true, mensaje, tipo })
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '', tipo: '' })
    }, 5000)
  }

  // Cargar datos del usuario, carreras e instituciones al entrar
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        navigate('/register')
        return
      }
      
      setUser(user)

      const { data: carrerasData } = await supabase.from('carreras').select('*')
      setCarreras(carrerasData || [])
      
      const { data: institucionesData } = await supabase
        .from('instituciones')
        .select('*')
        .eq('activo', true)
        .order('nombre', { ascending: true })
      setInstituciones(institucionesData || [])
      
      const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) {
        console.error('Error cargando perfil:', error)
      } else {
        setPerfil(data)
        setTipoUsuario(data.tipo_usuario)
        setNombreReservante(data.nombre_completo)
        setEmailReservante(data.email)
        setCelularReservante(data.celular)
        setNombreMenor(data.nombre_menor || '')
        setCarreraSeleccionada(carreraGuardada)
      }
      
      setCargando(false)
    }

    cargarDatos()
  }, [navigate, carreraGuardada])

  // Validar paso actual
  const validarPaso1 = () => {
    const validoNombre = validarCampo('nombreReservante', nombreReservante)
    const validoEmail = validarCampo('emailReservante', emailReservante)
    const validoCelular = validarCampo('celularReservante', celularReservante)
    
    if (tipoUsuario === 'tutor') {
      validarCampo('nombreMenor', nombreMenor)
    }

    if (!validoNombre || !validoEmail || !validoCelular) {
      mostrarNotificacion('Corrige los errores antes de continuar')
      return false
    }

    if (tipoUsuario === 'tutor' && !nombreMenor) {
      mostrarNotificacion('Ingresa el nombre del menor')
      return false
    }

    if (!situacionActual) {
      mostrarNotificacion('Selecciona tu situación actual')
      return false
    }

    return true
  }

  const validarPaso2 = () => {
    if (!carreraSeleccionada) {
      mostrarNotificacion('Selecciona una carrera')
      return false
    }
    if (!fecha) {
      mostrarNotificacion('Selecciona una fecha')
      return false
    }
    if (tipoServicio === 'consulta') {
      if (temasInteres.length === 0) {
        mostrarNotificacion('Selecciona al menos un tema de interés')
        return false
      }
      if (!comentarios) {
        mostrarNotificacion('Los comentarios son obligatorios para Consulta')
        return false
      }
    }
    return true
  }

  const handleSiguiente = () => {
    if (pasoActual === 1 && validarPaso1()) {
      setPasoActual(2)
      setHaCambiadoPaso(true)
    } else if (pasoActual === 2 && validarPaso2()) {
      setPasoActual(3)
      setHaCambiadoPaso(true)
    }
  }

  const handleAnterior = () => {
    setPasoActual(pasoActual - 1)
    setHaCambiadoPaso(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (haCambiadoPaso) {
      setHaCambiadoPaso(false)
      return
    }
    
    if (!aceptoTerminos) {
      mostrarNotificacion('Debes aceptar los términos y condiciones')
      return
    }

    if (tipoUsuario === 'tutor' && !consentimientoMenor) {
      mostrarNotificacion('Debes dar consentimiento para el menor')
      return
    }

    setEnviando(true)

    let comentariosFinales = comentarios
    if (tipoUsuario === 'tutor') {
      comentariosFinales = `[CONSENTIMIENTO: El/la padre/madre/tutor(a) ${perfil.nombre_completo} autoriza la mentoría para ${nombreMenor}] - ${comentarios}`
    }

    const precio = calcularPrecio()
    const duracion = calcularDuracion()
    
    // Determinar qué intereses guardar según el tipo de servicio
    const interesesAGuardar = tipoServicio === 'consulta' ? temasInteres : interesesMentoria

    const { error } = await supabase
      .from('reservas')
      .insert([{
        user_id: user.id,
        nombre_reservante: nombreReservante,
        email_reservante: emailReservante,
        celular_reservante: celularReservante,
        carrera: carreraSeleccionada,
        fecha_sugerida: fecha,
        turno: turno,
        horario_especifico: horarioEspecifico,
        situacion_actual: situacionActual,
        semestre_preferido: semestre,
        universidad_preferida: universidad || 'Cualquiera (sin preferencia)',
        comentarios_extra: comentariosFinales,
        estado_pago: 'pendiente',
        tipo_servicio: tipoServicio,
        duracion: duracion,
        precio: precio,
        apuntes_incluidos: apuntesIncluidos,
        temas_interes: interesesAGuardar
      }])

    if (error) {
      mostrarNotificacion('Error al crear la reserva: ' + error.message)
    } else {
      mostrarNotificacion('¡Reserva creada con éxito!', 'success')
      setTimeout(() => {
        navigate('/confirmacion', { 
          state: { 
            tipoUsuario,
            nombreReservante,
            nombreMenor,
            tipoServicio,
            apuntesIncluidos,
            temasInteres: interesesAGuardar,
            carrera: carreraSeleccionada,
            universidad: universidad || 'Cualquiera (sin preferencia)',
            fecha,
            turno,
            horarioEspecifico,
            situacionActual,
            semestre,
            comentarios,
            precio,
            duracion
          }
        })
      }, 2000)
    }
    
    setEnviando(false)
  }

  if (cargando) {
    return <Loader mensaje="Cargando tus datos..." />
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)',
    }}>
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
        <div className="card" style={{ 
          maxWidth: '800px', 
          width: '100%',
          borderTop: '4px solid var(--primary)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
            Formulario de Reserva de Mentoría
          </h2>

          {/* Header con indicador de pasos */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', padding: '0 10px' }}>
            {[1, 2, 3].map((num) => (
              <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  backgroundColor: pasoActual >= num ? 'var(--primary)' : '#E2E8F0',
                  color: pasoActual >= num ? 'white' : 'var(--gray)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', marginBottom: '5px', transition: 'all 0.3s ease'
                }}>
                  {num}
                </div>
                <span style={{ fontSize: '12px', color: pasoActual >= num ? 'var(--primary)' : 'var(--gray)', fontWeight: pasoActual >= num ? '500' : 'normal' }}>
                  {num === 1 ? 'Tus datos' : num === 2 ? 'Mentoría' : 'Confirmar'}
                </span>
              </div>
            ))}
          </div>

          {/* Datos del perfil */}
          <div style={{ 
            background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '30px',
            fontSize: '14px', 
            borderLeft: '4px solid var(--primary)',
            overflowX: 'auto'
          }}>
            <p style={{ marginBottom: '10px', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Datos de tu cuenta:
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <IconUser style={{ flexShrink: 0, marginTop: '2px' }} />
                <strong style={{ flexShrink: 0 }}>Nombre:</strong>
                <span style={{ wordBreak: 'break-word', flex: 1 }}>{perfil.nombre_completo}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <IconMail style={{ flexShrink: 0, marginTop: '2px' }} />
                <strong style={{ flexShrink: 0 }}>Email:</strong>
                <span style={{ wordBreak: 'break-word', flex: 1 }}>{perfil.email}</span>
              </div>
              {perfil.tipo_usuario === 'tutor' && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '8px',
                  flexWrap: 'wrap',
                  color: 'var(--primary)'
                }}>
                  <IconChild style={{ flexShrink: 0, marginTop: '2px' }} />
                  <strong style={{ flexShrink: 0 }}>Padre/Madre/Tutor de:</strong>
                  <span style={{ wordBreak: 'break-word', flex: 1 }}>{perfil.nombre_menor}</span>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {/* PASO 1: Datos del reservante */}
            {pasoActual === 1 && (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {tipoUsuario === 'tutor' ? 'Datos del padre/madre/tutor' : 'Tus datos'}
                </h3>
                
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconUser /> Nombre completo
                  </label>
                  <input type="text" className="form-input" required value={nombreReservante} onChange={handleNombreChange}
                    placeholder="Ej: Juan Pérez" style={{ borderColor: errores.nombreReservante ? 'var(--error)' : '#E2E8F0' }} />
                  {errores.nombreReservante && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errores.nombreReservante}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconMail /> Email de contacto
                  </label>
                  <input type="email" className="form-input" required value={emailReservante} onChange={handleEmailChange}
                    placeholder="correo@ejemplo.com" style={{ borderColor: errores.emailReservante ? 'var(--error)' : '#E2E8F0' }} />
                  {errores.emailReservante && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errores.emailReservante}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconPhone /> Celular de contacto
                  </label>
                  <input type="tel" className="form-input" required value={celularReservante} onChange={handleCelularChange}
                    placeholder="76543210" style={{ borderColor: errores.celularReservante ? 'var(--error)' : '#E2E8F0' }} />
                  {errores.celularReservante && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errores.celularReservante}</p>}
                </div>

                {tipoUsuario === 'tutor' && (
                  <>
                    <h4 style={{ margin: '20px 0 15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Datos del menor (Quién recibirá la mentoría)
                    </h4>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconChild /> Nombre del menor
                      </label>
                      <input type="text" className="form-input" required value={nombreMenor} onChange={handleNombreMenorChange}
                        placeholder="Ej: Carlitos Pérez" style={{ borderColor: errores.nombreMenor ? 'var(--error)' : '#E2E8F0' }} />
                      {errores.nombreMenor && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errores.nombreMenor}</p>}
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconTarget /> ¿Cuál es su situación actual? (De la persona que recibirá la mentoría)
                  </label>
                  <select className="form-input" value={situacionActual} onChange={(e) => setSituacionActual(e.target.value)} required>
                    <option value="">Selecciona una opción</option>
                    {opcionesSituacion.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* PASO 2: Detalles de la mentoría con selección de tipo */}
            {pasoActual === 2 && (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Escoge el tipo de la mentoría
                </h3>

                {/* Selección de tipo de servicio */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '15px', 
                  marginBottom: '25px' 
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setTipoServicio('carrera')
                      setApuntesIncluidos(false)
                    }}
                    style={{
                      padding: '20px',
                      border: tipoServicio === 'carrera' ? '2px solid var(--primary)' : '1px solid #E2E8F0',
                      borderRadius: '12px',
                      background: tipoServicio === 'carrera' ? 'var(--primary-soft)' : 'white',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--primary)', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>
                      Más Popular
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <IconCareer />
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>CARRERA</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--gray)' }}>Explicación completa: Introducción, malla curricular, proyectos reales y experiencias</p>
                    <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px' }}>Reunión Virtual de 45-60 minutos • 60 Bs</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTipoServicio('consulta')
                      setApuntesIncluidos(false)
                    }}
                    style={{
                      padding: '20px',
                      border: tipoServicio === 'consulta' ? '2px solid var(--primary)' : '1px solid #E2E8F0',
                      borderRadius: '12px',
                      background: tipoServicio === 'consulta' ? 'var(--primary-soft)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <IconConsult />
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>CONSULTA</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--gray)' }}>Dudas puntuales sobre ingreso o vida universitaria</p>
                    <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '8px' }}>Reunión Virtual de 15-25 minutos • 30 Bs</p>
                  </button>
                </div>
                {/* Opción de apuntes (solo para CARRERA, al final del formulario) */}
                {tipoServicio === 'carrera' && apuntesIncluidos && (
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '13px', color: 'var(--success)', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <IconCheck /> Apuntes digitales incluidos (+25 Bs)
                    </p>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconBook /> Carrera de Interés
                  </label>
                  <select className="form-input" value={carreraSeleccionada} onChange={(e) => setCarreraSeleccionada(e.target.value)} required>
                    <option value="">Selecciona una carrera</option>
                    {carreras.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCalendar /> Fecha para la mentoría
                  </label>
                  <input 
                    type="date" 
                    className="form-input" 
                    required 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                    min={(() => {
                      const fechaMin = new Date()
                      fechaMin.setDate(fechaMin.getDate() + 2)
                      return fechaMin.toISOString().split('T')[0]
                    })()} 
                    onKeyDown={(e) => e.preventDefault()}
                  />
                  <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '4px' }}>
                      Las reservas requieren 2 días de anticipación. La fecha más cercana disponible es {(() => {
                      const fechaMin = new Date()
                      fechaMin.setDate(fechaMin.getDate() + 2)
                      return fechaMin.toLocaleDateString()
                    })()}.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconClock /> Turno preferido (Horario para la mentoría)
                  </label>
                  <select className="form-input" value={turno} onChange={(e) => setTurno(e.target.value)} required>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                  </select>
                  <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '6px' }}>
                    Si tienes un horario específico, indícalo en el campo de abajo
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconClock /> Horario específico (opcional)
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={horarioEspecifico} 
                    onChange={(e) => setHorarioEspecifico(e.target.value)}
                    placeholder="Ej: Tengo disponibilidad entre 9:00 AM - 11:30 AM, etc."
                  />
                </div>

                {/* Recuadro de especificaciones */}
                <div style={{
                  border: '2px solid var(--primary-light)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: '20px',
                  backgroundColor: '#F8FAFC'
                }}>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: 'var(--primary)', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <IconTarget /> Selecciona lo que quieras y trataremos de cumplir tus requerimientos y especificaciones del mentor y sesión
                  </p>

                  {/* Temas de interés (solo para CONSULTA) */}
                  {tipoServicio === 'consulta' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <IconConsult /> Temas de interés
                      </label>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '12px',
                        background: 'white',
                        padding: '15px',
                        borderRadius: '10px'
                      }}>
                        {temasConsulta.map(tema => (
                          <label key={tema} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={temasInteres.includes(tema)}
                              onChange={() => handleTemaChange(tema)}
                              style={{ width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
                            />
                            <span style={{ fontSize: '14px', wordBreak: 'break-word', lineHeight: '1.4' }}>{tema}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Intereses para CARRERA */}
                  {tipoServicio === 'carrera' && (
                    <div style={{ marginBottom: '20px' }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <IconBriefcase /> ¿Qué temas te interesa profundizar?
                      </label>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '12px',
                        background: 'white',
                        padding: '15px',
                        borderRadius: '10px'
                      }}>
                        {interesesCarrera.map(interes => (
                          <label key={interes} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={interesesMentoria.includes(interes)}
                              onChange={() => handleInteresCarreraChange(interes)}
                              style={{ width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
                            />
                            <span style={{ fontSize: '14px', wordBreak: 'break-word', lineHeight: '1.4' }}>{interes}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconUniversity /> Universidad/Institución donde pertenece el mentor (opcional)
                    </label>
                    <select className="form-input" value={universidad} onChange={(e) => setUniversidad(e.target.value)}>
                      <option value="">Cualquiera (sin preferencia)</option>
                      {instituciones.map(inst => (
                        <option key={inst.id} value={inst.nombre}>
                          {inst.nombre}{inst.ciudad ? ` (${inst.ciudad})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconUniversity /> Semestre de preferencia del mentor (opcional)
                    </label>
                    <select className="form-input" value={semestre} onChange={(e) => setSemestre(e.target.value)}>
                      <option value="">Sin preferencia</option>
                      <option value="1er semestre (1er año)">1er semestre (1er año)</option>
                      <option value="2do semestre (1er año)">2do semestre (1er año)</option>
                      <option value="3er semestre (2do año)">3er semestre (2do año)</option>
                      <option value="4to semestre (2do año)">4to semestre (2do año)</option>
                      <option value="5to semestre (3er año)">5to semestre (3er año)</option>
                      <option value="6to semestre (3er año)">6to semestre (3er año)</option>
                      <option value="7mo semestre (4to año)">7mo semestre (4to año)</option>
                      <option value="8vo semestre (4to año)">8vo semestre (4to año)</option>
                      <option value="9no semestre (5to año)">9no semestre (5to año)</option>
                      <option value="10mo semestre (5to año)">10mo semestre (5to año)</option>
                      <option value="Egresado">Egresado</option>
                      <option value="Titulado">Titulado</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconBook /> Comentarios adicionales
                      {tipoServicio === 'consulta' && <span style={{ color: 'var(--error)', marginLeft: '4px' }}>*</span>}
                    </label>
                    <textarea 
                      className="form-input" 
                      value={comentarios} 
                      onChange={(e) => setComentarios(e.target.value)}
                      placeholder={tipoServicio === 'consulta' 
                        ? "Escribe aquí tus preguntas específicas (obligatorio) o cualquier detalle adicional. Se recomienda máximo 10-12 preguntas por el tiempo de la sesión."
                        : "Ej: Me gustaría que me diga cuáles son las materias más complicadas, que oportunidades extracurriculares tengo en la carrera, recomendaciones de donde hacer pasantías..."}
                      style={{ minHeight: '100px', resize: 'vertical' }} 
                      required={tipoServicio === 'consulta'}
                    />
                    {tipoServicio === 'consulta' && (
                      <p style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconQuestion /> Se recomienda máximo 10-12 preguntas por el tiempo de la sesión (Puede variar dependiendo de la profundización de la pregunta).
                      </p>
                    )}
                  </div>
                </div>

                {/* Opción de apuntes (solo para CARRERA, al final) */}
                {tipoServicio === 'carrera' && (
                  <div style={{
                    background: '#F1F5F9',
                    padding: '15px',
                    borderRadius: '10px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '15px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <IconNotes />
                      <div>
                        <p style={{ fontWeight: 'bold' }}>¿Deseas adicionar Apuntes Digitales?</p>
                        <p style={{ fontSize: '12px', color: 'var(--gray)' }}>Apuntes del mentor de materia representativa de la carrera para previsualización</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>+25 Bs</span>
                      <button
                        type="button"
                        onClick={() => setApuntesIncluidos(!apuntesIncluidos)}
                        style={{
                          width: '50px',
                          height: '26px',
                          background: apuntesIncluidos ? 'var(--primary)' : '#E2E8F0',
                          borderRadius: '20px',
                          border: 'none',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          background: 'white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '3px',
                          left: apuntesIncluidos ? '27px' : '3px',
                          transition: 'left 0.2s ease'
                        }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PASO 3: Confirmación y consentimiento */}
            {pasoActual === 3 && (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconCheck /> Confirmar mentoría
                </h3>

                <div style={{ background: '#F1F5F9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '15px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>Resumen de tu solicitud</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p><IconUser /> <strong>Reservante:</strong> {nombreReservante}</p>
                    {tipoUsuario === 'tutor' && <p><IconChild /> <strong>Menor:</strong> {nombreMenor}</p>}
                    <p><IconTarget /> <strong>Situación actual:</strong> {situacionActual}</p>
                    <p><IconConsult /> <strong>Tipo de servicio:</strong> {tipoServicio === 'consulta' ? 'VINCOBO CONSULTA (15-25 min)' : 'VINCOBO CARRERA (45-60 min)'}</p>
                    {tipoServicio === 'carrera' && apuntesIncluidos && <p><IconNotes /> <strong>Apuntes digitales:</strong> Incluidos (+25 Bs)</p>}
                    {tipoServicio === 'consulta' && temasInteres.length > 0 && <p><IconConsult /> <strong>Temas de interés:</strong> {temasInteres.join(', ')}</p>}
                    {tipoServicio === 'carrera' && interesesMentoria.length > 0 && <p><IconBriefcase /> <strong>Interés principal:</strong> {interesesMentoria.join(', ')}</p>}
                    <p><IconBook /> <strong>Carrera de Interés:</strong> {carreraSeleccionada}</p>
                    <p><IconCalendar /> <strong>Fecha:</strong> {new Date(fecha).toLocaleDateString()}</p>
                    <p><IconClock /> <strong>Turno:</strong> {turno}</p>
                    {horarioEspecifico && <p><IconClock /> <strong>Horario específico:</strong> {horarioEspecifico}</p>}
                    {universidad && <p><IconUniversity /> <strong>Universidad preferida:</strong> {universidad}</p>}
                    {semestre && <p><IconUniversity /> <strong>Semestre preferido:</strong> {semestre}</p>}
                    <p><IconPrice /> <strong>Precio total:</strong> {calcularPrecio()} Bs</p>
                    {comentarios && <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '8px' }}>
                      <p><strong>Comentarios:</strong> {comentarios}</p>
                    </div>}
                  </div>
                </div>

                {/* Checkboxes */}
                <div style={{ margin: '30px 0' }}>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="terminos" checked={aceptoTerminos} onChange={(e) => setAceptoTerminos(e.target.checked)} required />
                    <label htmlFor="terminos">
                      Acepto los{' '}
                      <button type="button" onClick={() => setMostrarTerminos(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                        Términos y Condiciones
                      </button>
                      {' y la '}
                      <button type="button" onClick={() => setMostrarPrivacidad(true)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
                        Política de Privacidad
                      </button>
                      {' y autorizo que la sesión sea grabada.'}
                    </label>
                  </div>

                  {tipoUsuario === 'tutor' && (
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                      <input type="checkbox" id="consentimiento" checked={consentimientoMenor} onChange={(e) => setConsentimientoMenor(e.target.checked)} required />
                      <label htmlFor="consentimiento">
                        <strong style={{ color: 'var(--primary)' }}>Consentimiento:</strong> Declaro que soy tutor de {nombreMenor} y autorizo su participación
                      </label>
                    </div>
                  )}
                </div>

                <ModalTerminos isOpen={mostrarTerminos} onClose={() => setMostrarTerminos(false)} />
                <ModalPrivacidad isOpen={mostrarPrivacidad} onClose={() => setMostrarPrivacidad(false)} />
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '12px', 
              marginTop: '30px' 
            }}>
              {pasoActual > 1 && (
                <button type="button" onClick={handleAnterior} className="btn btn-secondary" style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  padding: '12px 20px'
                }}>
                  <IconArrowLeft /> Anterior
                </button>
              )}
              {pasoActual < 3 ? (
                <button type="button" onClick={handleSiguiente} className="btn btn-primary" style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  padding: '12px 20px'
                }}>
                  Siguiente <IconArrowRight />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px',
                  padding: '12px 20px'
                }} disabled={enviando}>
                  {enviando ? 'Enviando...' : `Confirmar y Pagar ${calcularPrecio()} Bs`}
                  {!enviando && <IconCheck />}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 640px) {
          .card {
            padding: 16px !important;
          }
          
          .form-input, .btn, select, textarea {
            font-size: 14px !important;
          }
          
          h2 {
            font-size: 20px !important;
          }
          
          h3 {
            font-size: 18px !important;
          }
          
          /* Para el recuadro de datos */
          .card > div:first-of-type {
            overflow-x: auto;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 12px !important;
          }
          
          .form-label {
            font-size: 13px !important;
          }
          
          div[style*="width: 30px"] {
            width: 24px !important;
            height: 24px !important;
            font-size: 12px !important;
          }
          
          span[style*="font-size: 12px"] {
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  )
}
