import { motion } from 'framer-motion';

const ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['Enter','z','x','c','v','b','n','m','⌫'],
];

function getKeyColor(letter, guesses, solution) {
  if (!solution) return null;
  let result = null;
  for (const guess of guesses) {
    if (!guess) continue;
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== letter) continue;
      if (guess[i] === solution[i]) return 'green';
      if (solution.includes(guess[i])) result = result === 'green' ? 'green' : 'yellow';
      else result = result || 'gray';
    }
  }
  return result;
}

function Key({ label, onKey, color }) {
  const isWide = label === 'Enter' || label === '⌫';

  const bg = {
    green:  'linear-gradient(135deg, #3d6b35, #538d4e)',
    yellow: 'linear-gradient(135deg, #8a7520, #b59f3b)',
    gray:   'linear-gradient(135deg, #3a3a3a, #4a4a4a)',
  }[color] || 'linear-gradient(135deg, #1e2535, #252d40)';

  const border = {
    green:  '#538d4e',
    yellow: '#b59f3b',
    gray:   '#3a3a3a',
  }[color] || '#2d3748';

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onKey(label)}
      style={{
        width: isWide ? 56 : 36,
        height: 48,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 7,
        color: color ? 'white' : '#c9d1d9',
        fontSize: isWide ? 10 : 14,
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: isWide ? "'JetBrains Mono', monospace" : "'Playfair Display', serif",
        letterSpacing: isWide ? '0.05em' : '0',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'border-color 0.2s',
        flexShrink: 0,
      }}
    >
      {label.toUpperCase()}
    </motion.button>
  );
}

function Keyboard({ guesses, solution, onKey }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: '8px 0 12px',
      flexShrink: 0,
      width: '100%',
    }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 5 }}>
          {row.map(key => (
            <Key
              key={key}
              label={key}
              onKey={onKey}
              color={key.length === 1 ? getKeyColor(key, guesses, solution) : null}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;