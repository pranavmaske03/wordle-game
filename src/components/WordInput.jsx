import { useCallback, useRef, useState, useEffect } from 'react';
import Grid from './Grid';
import Result from './Result';

const MAX_GUESSES = 6;

function WordInput({ solution }) {
    const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [isTypingAllowed, setIsTypingAllowed] = useState(true);
    const [winner, setWinner] = useState(null);
    const timeoutId = useRef(null);

    const handleKey = useCallback((event) => {
        if (isGameOver || !isTypingAllowed) return;

        if (event.key === 'Enter') {
            if (currentGuess.length !== 5) return;

            const currentIndex = guesses.findIndex(val => val == null);
            if (currentIndex === -1) return;

            const newGuesses = [...guesses];
            newGuesses[currentIndex] = currentGuess.toLowerCase();
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
                const isLastGuess = currentIndex === MAX_GUESSES - 1;

                if (isCorrect) {
                    setIsGameOver(true);
                    setWinner(true);
                } else if (isLastGuess) {
                    setIsGameOver(true);
                    setWinner(false);
                }
            }, 2500);
        }
        if (event.key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }
        if (currentGuess.length >= 5) return;

        const isLetter = /^[a-zA-Z]$/.test(event.key);
        if (isLetter) {
            setCurrentGuess(prev => prev + event.key);
        }
    }, [currentGuess, isGameOver, guesses, isTypingAllowed, solution]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

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
        />
        )}
    </>
  );
}

export default WordInput;