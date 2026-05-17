import React, { useCallback, useRef, useState, useEffect } from 'react';
import Grid from './Grid';
import Result from './Result';
import Keyboard from './Keyboard';
import { updateStats } from '../utils/stats';
import { saveDailyResult } from '../utils/getDailyWord';

function WordInput({ solution, mode, onGameOver, onNewGame }) {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTypingAllowed, setIsTypingAllowed] = useState(true);
  const [winner, setWinner] = useState(null);
  const timeoutId = useRef(null);

  const handleKey = useCallback((key) => {
    if (isGameOver || !isTypingAllowed) return;

    if (key === 'Enter') {
      if (currentGuess.length !== 5) return;

      const newGuesses = [...guesses];
      const rowIndex = guesses.findIndex(val => val == null);
      newGuesses[rowIndex] = currentGuess.toLowerCase();
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }

      setIsTypingAllowed(false);
      timeoutId.current = setTimeout(() => {
        setIsTypingAllowed(true);
        const isCorrect = currentGuess.toLowerCase() === solution;
        const isGridFull = newGuesses.findIndex(val => val == null) === -1;

        if (isCorrect || isGridFull) {
          const won = isCorrect;
          const numGuesses = newGuesses.filter(g => g != null).length;
          updateStats(mode, won, numGuesses);
          if (mode === 'daily') saveDailyResult(newGuesses, won);
          onGameOver();
          setIsGameOver(true);
          setWinner(won);
        }
      }, 2500);
      return;
    }

    if (key === '⌫' || key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (currentGuess.length >= 5) return;

    if (key.match(/^[a-zA-Z]$/)) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, isGameOver, guesses, isTypingAllowed, solution, mode, onGameOver]);

  useEffect(() => {
    const handler = (e) => handleKey(e.key);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey]);

  return (
    <>
      {!isGameOver ? (
        <>
          <div className="board">
            {guesses.map((guess, index) => {
              const isCurrentGuess = index === guesses.findIndex(val => val == null);
              return (
                <Grid
                  key={index}
                  guess={isCurrentGuess ? currentGuess : guess ?? ""}
                  isFinal={!isCurrentGuess && guess != null}
                  solution={solution}
                />
              );
            })}
          </div>
          <Keyboard
            guesses={guesses}
            solution={solution}
            onKey={handleKey}
          />
        </>
      ) : (
        <Result
          winner={winner}
          solution={solution}
          mode={mode}
          guesses={guesses.filter(g => g != null)}
          onNewGame={onNewGame}
        />
      )}
    </>
  );
}

export default WordInput;