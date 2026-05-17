
function Header({ mode, setMode, onStatsClick }) {
  return (
    <div style={{
      width: '100%',
      background: '#111827',
      borderBottom: '1px solid #1f2937',
      padding: '14px 20px',
    }}>
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <div style={{ display: 'flex', gap: 6 }}>
      {['daily', 'random'].map(m => (
        <button
          key={m}
          onClick={() => setMode(m)}
          style={{
            fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 50,
            border: 'none',
            cursor: 'pointer',
            background: mode === m ? '#538d4e' : '#1f2937',
            color: mode === m ? 'white' : '#6b7280',
            transition: 'all 0.2s',
          }}
        >
          {m}
        </button>
      ))}
    </div>
      <h1 style={{
        fontSize: 22, fontWeight: 900,
        textTransform: 'uppercase', letterSpacing: '0.15em',
        background: 'linear-gradient(90deg, #f5c842, #e05c5c, #9b59b6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: 0,
      }}>
        Wordle Quest
      </h1> 
      <button
        onClick={onStatsClick}
        style={{
          background: 'none', border: 'none',
          color: '#6b7280', fontSize: 22,
          cursor: 'pointer', padding: 4,
          transition: 'color 0.2s',
        }}
        title="Statistics"
      >
        📊
      </button>
      </div>
    </div>
  );
}

export default Header;