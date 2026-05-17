
function Header({ mode, setMode, onStatsClick, onSettingsClick, darkMode }) {
  return (
    <header style={{
      width: '100%',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', gap: 6, zIndex: 1 }}>
        {['daily', 'random'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '5px 14px',
              borderRadius: 50,
              border: mode === m ? '1px solid var(--green)' : '1px solid var(--border)',
              cursor: 'pointer',
              background: mode === m ? 'rgba(83,141,78,0.15)' : 'transparent',
              color: mode === m ? '#6aaf60' : 'var(--muted)',
              transition: 'all 0.2s',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.15em',
          background: 'linear-gradient(135deg, #f5c842 0%, #f09830 50%, #e07820 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}>
          WORDLE QUEST
        </h1>
        <p style={{
          fontSize: 9,
          letterSpacing: '0.3em',
          color: '#f5c842',
          opacity: 0.5,
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
          marginTop: 4,
        }}>
          guess the word
        </p>
      </div>
      <div style={{ display: 'flex', gap: 4, zIndex: 1 }}>
        <button
          onClick={onStatsClick}
          style={{
            background: 'none', border: 'none',
            color: 'var(--muted)', fontSize: 18,
            cursor: 'pointer', padding: '6px 8px',
            borderRadius: 8, transition: 'color 0.2s',
          }}
          title="Statistics"
        >
          📊
        </button>
        <button
          onClick={onSettingsClick}
          style={{
            background: 'none', border: 'none',
            color: 'var(--muted)', fontSize: 18,
            cursor: 'pointer', padding: '6px 8px',
            borderRadius: 8, transition: 'color 0.2s',
          }}
          title="Settings"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}

export default Header;