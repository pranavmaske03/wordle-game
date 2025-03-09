import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import Grid from './Grid';

function WordInput({ solution }) {
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [isTypingAllowed, setTypingAllowed] = useState(true);
  
    const handleKey = useCallback((event) => {
        if (isGameOver || !isTypingAllowed) return;

        if (event.key === 'Enter') {
            if (currentGuess.length !== 5) return;

            const newGuesses = [...guesses];
            newGuesses[guesses.findIndex(val => val == null)] = currentGuess.toLowerCase();
            setGuesses(newGuesses);
            setCurrentGuess('');

            const isCorrect = currentGuess === solution;
            if (isCorrect) setIsGameOver(true);  
        }

        if (event.key === 'Backspace') {
            setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
            return;
        }
        if (currentGuess.length >= 5) return;
        const isLetter = event.key.match(/^[a-zA-Z]$/);

        if (isLetter) setCurrentGuess(currentGuess + event.key);
    }, [currentGuess, isGameOver, guesses]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    return (
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
                            isTypingAllowed={isTypingAllowed}
                            setTypingAllowed={setTypingAllowed}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default WordInput;