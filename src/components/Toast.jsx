import { motion, AnimatePresence } from 'framer-motion';

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: 'fixed',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            color: '#111',
            fontWeight: 700,
            fontSize: 14,
            padding: '10px 24px',
            borderRadius: 50,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 9999,
            pointerEvents: 'none',
            letterSpacing: '0.05em',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;