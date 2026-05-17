import React, { useCallback, useRef, useState, useEffect } from 'react';
import Grid from './Grid';
import Result from './Result';
import { updateStats } from '../utils/stats';
import { saveDailyResult } from '../utils/getDailyWord';

function WordInput({ solution, mode, onGameOver }) {
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [isTypingAllowed, setIsTypingAllowed] = useState(true);
    const [winner, setWinner] = useState(null);
    const timeoutId = useRef(null);

    const handleKey = useCallback((event) => {
        if (isGameOver || !isTypingAllowed) return;

        if (event.key === 'Enter') {
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
        }

        if (event.key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }

        if (currentGuess.length >= 5) return;

        if (event.key.match(/^[a-zA-Z]$/)) {
            setCurrentGuess(prev => prev + event.key);
        }
    }, [currentGuess, isGameOver, guesses, isTypingAllowed, solution, mode, onGameOver]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    return (
    <>
      {!isGameOver ? (
        <div className="flex flex-col items-center mt-10">
          <div className="board flex flex-col gap-2">
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
        </div>
        ) : (
        <Result
          winner={winner}
          solution={solution}
          mode={mode}
          guesses={guesses.filter(g => g != null)}
          onNewGame={mode === 'random' ? () => window.location.reload() : null}
        />
      )}
    </>
  );
}

export default WordInput;