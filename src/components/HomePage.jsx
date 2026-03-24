export default function HomePage({ onEnter }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0b0e17 0%, #111626 50%, #0f1420 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Glow accent */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,56,41,0.08) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
        pointerEvents: 'none',
      }} />

      {/* Logo mark */}
      <div style={{
        width: 64, height: 64, borderRadius: 14,
        background: '#EF3829',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 28, color: '#fff',
        marginBottom: 32,
        boxShadow: '0 8px 32px rgba(239,56,41,0.35)',
      }}>H</div>

      {/* Title block */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#EF3829',
          letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16,
        }}>
          Honeywell Process Automation · Korea
        </div>
        <h1 style={{
          fontSize: 52, fontWeight: 700, color: '#ffffff',
          letterSpacing: '-1.5px', lineHeight: 1.1, margin: '0 0 16px',
        }}>
          Account Intelligence
        </h1>
        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.35)',
          fontWeight: 400, letterSpacing: '0.2px',
        }}>
          EPC 고객사 관리 · 파이프라인 · 경쟁사 인텔 · 어카운트 플랜
        </p>
      </div>

      {/* Enter button */}
      <button
        onClick={onEnter}
        style={{
          background: '#EF3829',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '14px 40px',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.2px',
          fontFamily: 'DM Sans, system-ui, sans-serif',
          boxShadow: '0 4px 20px rgba(239,56,41,0.4)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(239,56,41,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(239,56,41,0.4)';
        }}
      >
        대시보드 열기
      </button>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 28,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>
          PA Korea · Senior Account Manager
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.2px' }}>
          Personal demo project for interview purposes only. Not affiliated with or endorsed by Honeywell International Inc.
        </div>
      </div>
    </div>
  );
}
