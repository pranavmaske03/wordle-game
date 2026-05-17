import { motion, AnimatePresence } from 'framer-motion';

function Toggle({ label, description, value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: '1px solid #1f2937',
    }}>
      <div>
        <p style={{ color: '#e5e7eb', fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </p>
        <p style={{ color: '#4b5563', fontSize: 11, marginTop: 3 }}>{description}</p>
      </div>
      <motion.div
        onClick={onChange}
        style={{
          width: 44,
          height: 24,
          borderRadius: 50,
          background: value ? '#538d4e' : '#1f2937',
          border: value ? '1px solid #538d4e' : '1px solid #374151',
          cursor: 'pointer',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <motion.div
          animate={{ x: value ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            top: 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        />
      </motion.div>
    </div>
  );
}

function SettingsModal({ onClose, darkMode, setDarkMode, colorBlind, setColorBlind }) {
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
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: 20,
            padding: '28px 32px',
            width: '100%',
            maxWidth: 380,
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 20,
              background: 'none', border: 'none',
              color: '#6b7280', fontSize: 22, cursor: 'pointer',
            }}
          >✕</button>

          <p style={{
            textAlign: 'center', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#6b7280', marginBottom: 20,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Settings
          </p>

          <Toggle
            label="Dark Mode"
            description="Switch between dark and light theme"
            value={darkMode}
            onChange={() => setDarkMode(v => !v)}
          />
          <Toggle
            label="Color Blind Mode"
            description="Uses high contrast orange & blue"
            value={colorBlind}
            onChange={() => setColorBlind(v => !v)}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SettingsModal;