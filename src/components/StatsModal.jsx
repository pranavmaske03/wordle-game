import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStats } from '../utils/stats';

function Bar({ label, value, max }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span style={{ color: 'var(--muted)', fontSize: 13, width: 12, textAlign: 'right' }}>{label}</span>
      <div style={{ flex: 1, background: 'var(--tile-empty)', borderRadius: 4, height: 24, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, value > 0 ? 8 : 0)}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'var(--green)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8,
          }}
        >
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{value}</span>
        </motion.div>
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text)' }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function StatsPanel({ mode }) {
  const stats = getStats(mode);
  const winPct = stats.gamesPlayed === 0 ? 0 : Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
  const maxDist = Math.max(...Object.values(stats.distribution));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 28 }}>
        <StatBox label="Played" value={stats.gamesPlayed} />
        <StatBox label="Win %" value={winPct} />
        <StatBox label="Streak" value={stats.currentStreak} />
        <StatBox label="Best" value={stats.maxStreak} />
      </div>

      <p style={{
        fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'var(--muted)', marginBottom: 12, fontFamily: 'monospace',
      }}>
        Guess Distribution
      </p>
      {[1, 2, 3, 4, 5, 6].map(n => (
        <Bar
          key={n}
          label={n}
          value={stats.distribution[n] || 0}
          max={maxDist}
        />
      ))}
    </div>
  );
}

function StatsModal({ onClose }) {
  const [tab, setTab] = useState('daily');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '28px 32px',
            width: '100%',
            maxWidth: 400,
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 20,
              background: 'none', border: 'none',
              color: 'var(--muted)', fontSize: 22, cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <p style={{
            textAlign: 'center', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: 20, fontFamily: 'monospace',
          }}>
            Statistics
          </p>
          <div style={{
            display: 'flex', background: 'var(--tile-empty)',
            borderRadius: 50, padding: 4, marginBottom: 24,
          }}>
            {['daily', 'random'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '8px 0',
                  background: tab === t ? 'var(--green)' : 'transparent',
                  border: 'none', borderRadius: 50,
                  color: tab === t ? 'white' : 'var(--muted)',
                  fontWeight: 700, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <StatsPanel mode={tab} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StatsModal;