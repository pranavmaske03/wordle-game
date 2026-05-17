import { motion } from 'framer-motion';
import '../Style.css';

const WORD_LENGTH = 5;

function Grid({ guess, isFinal, solution }) {
  return (
    <div className='line'>
      {Array.from({ length: WORD_LENGTH }).map((_, i) => {
        const char = guess[i] || "";
        let bgColor = "var(--tile-empty)";
        if (isFinal) {
          if (char === solution[i]) bgColor = "var(--green)";
          else if (solution.includes(char)) bgColor = "var(--yellow)";
          else bgColor = "#787C7E";
        }
        return (
          <motion.div
            key={i}
            className='tile'
            initial={{ rotateX: 0, scale: 1, backgroundColor: "var(--tile-empty)" }}
            animate={
              isFinal
                ? { rotateX: [0, 90, 0], backgroundColor: bgColor }
                : { scale: char ? [1, 1.3, 1] : 1, backgroundColor: char ? 'var(--surface)' : 'var(--tile-empty)' }
            }
            transition={{
              duration: isFinal ? 0.5 : 0.1,
              delay: isFinal ? i * 0.5 : 0,
              ease: "easeInOut"
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}

export default Grid;