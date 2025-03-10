import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import Grid from './Grid';
import Result from './Result';

function WordInput({ solution }) {
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [isTypingAllowed, setIsTypingAllowed] = useState(true);
    const timeoutId = useRef(null);
    const [winner, setWinner] = useState(null);
  
    const handleKey = useCallback((event) => {
        if (isGameOver || !isTypingAllowed) {
            return;
        }

        if (event.key === 'Enter') {
            if (currentGuess.length !== 5) {
                return;
            }

            const newGuesses = [...guesses];
            newGuesses[guesses.findIndex(val => val == null)] = currentGuess.toLowerCase();
            setGuesses(newGuesses);
            setCurrentGuess('');

            if(timeoutId.current) {
                clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }

            setIsTypingAllowed(false);
            timeoutId.current = setTimeout(() => {
                setIsTypingAllowed(true);

                const isCorrect = currentGuess === solution;
                const isGridFull = guesses.findIndex(val => val == null);

                if(isCorrect) {
                    setIsGameOver(true);
                    setWinner(true);
                }
                if(isGridFull === 5 && currentGuess !== solution) {
                    setIsGameOver(true);
                    setWinner(false);
                }
            }, 2500)
        }

        if (event.key === 'Backspace') {
            setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
            return;
        }

        if (currentGuess.length >= 5) {
            return;
        }
        const isLetter = event.key.match(/^[a-zA-Z]$/);

        if (isLetter) {
            setCurrentGuess(currentGuess + event.key);
        }
        
    }, [currentGuess, isGameOver, guesses,isTypingAllowed]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    return (
        <>
        { !isGameOver ? (
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
            )
        }
        </>
    );
}

export default WordInput;
