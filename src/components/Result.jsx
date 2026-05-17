import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getMsUntilMidnight } from '../utils/getDailyWord';
import Toast from './Toast';

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getMsUntilMidnight());
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getMsUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);
  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, '0');
  const mins  = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const secs  = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, '0');
  return `${hours}:${mins}:${secs}`;
}

function SolutionTile({ letter, index, winner }) {
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0, y: 20 }}
      animate={{ rotateY: 0, opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div style={{
        width: 56, height: 64,
        background: winner
          ? 'linear-gradient(135deg, #3d6b35 0%, #538d4e 50%, #6aaf60 100%)'
          : 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 50%, #444 100%)',
        border: winner ? '1px solid #6aaf60' : '1px solid #555',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, fontWeight: 900,
        color: winner ? '#d4edda' : '#bbb',
        textTransform: 'uppercase',
        boxShadow: winner
          ? '0 0 20px rgba(83,141,78,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        fontFamily: "'Georgia', serif",
      }}>
        {letter}
      </div>
    </motion.div>
  );
}

function Particle({ delay }) {
  const colors = ['#f5c842', '#e05c5c', '#7c5cbf', '#538d4e', '#4a9ede'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = `${5 + Math.random() * 90}%`;
  const size = Math.random() * 6 + 4;
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 1, rotate: 0 }}
      animate={{ y: '-10vh', x: (Math.random() - 0.5) * 160, opacity: 0, rotate: 360 }}
      transition={{ delay, duration: 2.2 + Math.random() * 1.5, ease: 'easeOut' }}
      style={{
        position: 'absolute', left, bottom: 0,
        width: size, height: size,
        borderRadius: Math.random() > 0.5 ? '50%' : 2,
        background: color, pointerEvents: 'none',
      }}
    />
  );
}

function buildEmojiGrid(guesses, solution) {
  return guesses.map(guess =>
    guess.split('').map((char, i) => {
      if (char === solution[i]) return '🟩';
      if (solution.includes(char)) return '🟨';
      return '⬛';
    }).join('')
  ).join('\n');
}

function Result({ winner, solution, mode, guesses = [], onNewGame }) {
  const countdown = useCountdown();
  const [showContent, setShowContent] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleShare = () => {
    const numGuesses = winner ? guesses.length : 'X';
    const emojiGrid = buildEmojiGrid(guesses, solution);
    const text = `Wordle Quest ${numGuesses}/6\n\n${emojiGrid}`;
    navigator.clipboard.writeText(text).then(() => {
      setToastMsg('Copied to clipboard!');
      setTimeout(() => setToastMsg(''), 2000);
    });
  };

  const particles = winner
    ? Array.from({ length: 30 }, (_, i) => ({ id: i, delay: i * 0.07 }))
    : [];

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: '#111827', padding: '2rem 1rem',
    }}>
      <Toast message={toastMsg} />
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: '38%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 560, height: 560, borderRadius: '50%',
          background: winner
            ? 'radial-gradient(circle, rgba(83,141,78,0.13) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(100,80,160,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map(p => <Particle key={p.id} delay={p.delay} />)}
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', zIndex: 10,
              width: '100%', maxWidth: 480,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: winner ? '#6aaf60' : '#6b7280',
                marginBottom: 14, fontFamily: 'monospace',
              }}
            >
              {winner ? '✦  Solved  ✦' : '✦  Game Over  ✦'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.75, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontSize: 'clamp(56px, 13vw, 100px)', fontWeight: 900,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                lineHeight: 1, marginBottom: 10,
                background: winner
                  ? 'linear-gradient(135deg, #f5c842 0%, #e09820 45%, #c07010 100%)'
                  : 'linear-gradient(135deg, #c0c0c0 0%, #909090 50%, #686868 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', textAlign: 'center',
              }}
            >
              {winner ? 'Brilliant!' : 'So close.'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                color: '#6b7280', fontSize: 15, fontStyle: 'italic',
                marginBottom: 44, fontFamily: "'Georgia', serif", textAlign: 'center',
              }}
            >
              {winner
                ? 'You cracked the code. Not everyone does.'
                : 'The word had you fooled this time.'}
            </motion.p>
            <div style={{ marginBottom: 36, textAlign: 'center' }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#4b5563', marginBottom: 14, fontFamily: 'monospace',
                }}
              >
                {winner ? 'the word was' : 'the answer was'}
              </motion.p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                {solution.toUpperCase().split('').map((letter, i) => (
                  <SolutionTile key={i} letter={letter} index={i} winner={winner} />
                ))}
              </div>
            </div>
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleShare}
              style={{
                padding: '12px 36px',
                background: 'linear-gradient(135deg, #538d4e, #6aaf60)',
                border: 'none', borderRadius: 50,
                color: 'white', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.06em',
                boxShadow: '0 6px 20px rgba(83,141,78,0.4)',
                fontFamily: 'monospace', marginBottom: 32,
              }}
            >
              📤 Share Result
            </motion.button>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.7 }}
              style={{
                width: 260, height: 1,
                background: 'linear-gradient(90deg, transparent, #374151, transparent)',
                marginBottom: 32,
              }}
            />
            {mode === 'daily' && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid #1f2937',
                  borderRadius: 18, padding: '20px 40px',
                }}
              >
                <p style={{
                  fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#4b5563', marginBottom: 10, fontFamily: 'monospace',
                }}>
                  Next word in
                </p>
                <p style={{
                  fontSize: 40, fontWeight: 700, color: '#e5e7eb',
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: '0.06em', lineHeight: 1,
                }}>
                  {countdown}
                </p>
              </motion.div>
            )}
            {mode === 'random' && onNewGame && (
              <motion.button
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNewGame}
                style={{
                  padding: '15px 44px',
                  background: 'linear-gradient(135deg, #6d4aad, #9660d8)',
                  border: 'none', borderRadius: 50,
                  color: 'white', fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.06em',
                  boxShadow: '0 8px 28px rgba(110,74,173,0.4)',
                  fontFamily: 'monospace',
                }}
              >
                🎲 Play Again
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Result;