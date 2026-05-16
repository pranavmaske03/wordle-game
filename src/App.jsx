import { useMemo } from 'react';
import Header from './components/Header';
import WordInput from './components/WordInput';
import words from './data/words.json';

function App() {
  // Pick a random word once on mount — no API, no loading state needed
  const solution = useMemo(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord.toLowerCase();
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <WordInput solution={solution} />
      </div>
    </>
  );
}

export default App;