import { motion } from 'framer-motion';
import '../Style.css';

const WORD_LENGTH = 5;

function Grid({ guess, isFinal, solution }) {
  return (
    <div className='line flex gap-2'>
      {Array.from({ length: WORD_LENGTH }).map((_, i) => {
        const char = guess[i] || "";
        let bgColor = "#1F2937";
        if (isFinal) {
          if (char === solution[i]) bgColor = "#538d4e";
          else if (solution.includes(char)) bgColor = "#b59f3b";
          else bgColor = "#787C7E";
        }
        return (
          <motion.div
            key={i}
            className='tile'
            style={{ color: 'white' }}
            initial={{ rotateX: 0, scale: 1, backgroundColor: "#1F2937" }}
            animate={
              isFinal
                ? { rotateX: [0, 90, 0], backgroundColor: bgColor }
                : { scale: char ? [1, 1.3, 1] : 1, backgroundColor: char ? '#000000' : '#1F2937' }
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