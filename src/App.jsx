import { useMemo, useState } from 'react';
import Header from './components/Header';
import WordInput from './components/WordInput';
import words from './data/words.json';
import { getDailyWord, getTodayKey } from './utils/getDailyWord';

function App() {

  const [mode, setMode] = useState('daily');
  const dailyWord = useMemo(() => getDailyWord(), []);

  const [randomWord, setRandomWord] = useState(() =>
    words[Math.floor(Math.random() * words.length)].toLowerCase()
  );
  const solution = mode === 'daily' ? dailyWord : randomWord;

  const savedDailyState = useMemo(() => {
    if (mode !== 'daily') return null;
    try {
      const saved = localStorage.getItem(getTodayKey());
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, [mode]);

  const handleNewRandomGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    setRandomWord(newWord);
  };

  return (
    <>
      <Header mode = {mode} setMode={setMode} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <WordInput
          key = {mode === 'daily' ? 'daily' : randomWord}
          solution = {solution}
          mode = {mode}
          savedState = {savedDailyState}
          onNewGame = {mode === 'random' ? handleNewRandomGame : null}
        />
      </div>
    </>
  );
}

export default App;