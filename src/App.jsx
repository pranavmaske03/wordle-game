import { useEffect, useState } from 'react';
import Header from './components/Header';
import WordInput from './components/WordInput';
import Result from './components/Result';
import StatsModal from './components/StatsModal';
import { getDailyWord, loadDailyResult } from './utils/getDailyWord';
import words from './data/words.json';

function App() {
  const [solution, setSolution] = useState('');
  const [mode, setMode] = useState('daily');
  const [gameKey, setGameKey] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const [completedDaily, setCompletedDaily] = useState(null);
  useEffect(() => {
    if (mode === 'daily') {
      setSolution(getDailyWord());
      const saved = loadDailyResult();
      setCompletedDaily(saved);
    } else {
      setSolution(words[Math.floor(Math.random() * words.length)].toLowerCase());
      setCompletedDaily(null);
    }
  }, [mode, gameKey]);

  const handleSetMode = (m) => {
    setMode(m);
    setGameKey(k => k + 1);
  };

  const handleNewRandomGame = () => {
    setGameKey(k => k + 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111827', color: 'white' }}>
    <Header
      mode={mode}
      setMode={handleSetMode}
      onStatsClick={() => setShowStats(true)}
    />
    {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    {solution && (
      mode === 'daily' && completedDaily ? (
        <Result
          winner={completedDaily.winner}
          solution={solution}
          mode="daily"
          guesses={completedDaily.guesses.filter(g => g != null)}
          onNewGame={null}
        />
        ) : (
        <WordInput
          key={gameKey}
          solution={solution}
          mode={mode}
          onGameOver={() => {
            if (mode === 'daily') setCompletedDaily(loadDailyResult());
          }}
          onNewGame={mode === 'random' ? handleNewRandomGame : null}
        />
      )
    )}
    </div>
  );
}

export default App;