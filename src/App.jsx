import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import WordInput from './components/WordInput';
import Result from './components/Result';
import { getDailyWord, loadDailyResult } from './utils/getDailyWord';
import words from './data/words.json';

const StatsModal = lazy(() => import('./components/StatsModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));

function App() {
  const [solution, setSolution] = useState('');
  const [mode, setMode] = useState('daily');
  const [gameKey, setGameKey] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedDaily, setCompletedDaily] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [colorBlind, setColorBlind] = useState(false);

  useEffect(() => {
    if (mode === 'daily') {
      setSolution(getDailyWord());
      setCompletedDaily(loadDailyResult());
    } else {
      setSolution(words[Math.floor(Math.random() * words.length)].toLowerCase());
      setCompletedDaily(null);
    }
  }, [mode, gameKey]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--bg', '#0f1117');
      root.style.setProperty('--surface', '#111827');
      root.style.setProperty('--border', '#1f2937');
      root.style.setProperty('--text', '#e5e7eb');
      root.style.setProperty('--muted', '#6b7280');
      root.style.setProperty('--tile-empty', '#1a2035');
    } else {
      root.style.setProperty('--bg', '#f9fafb');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--border', '#d1d5db');
      root.style.setProperty('--text', '#111827');
      root.style.setProperty('--muted', '#6b7280');
      root.style.setProperty('--tile-empty', '#ffffff');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorBlind) {
      root.style.setProperty('--green', '#f5793a');
      root.style.setProperty('--yellow', '#85c0f9');
    } else {
      root.style.setProperty('--green', '#538d4e');
      root.style.setProperty('--yellow', '#b59f3b');
    }
  }, [colorBlind]);

  const handleSetMode = (m) => {
    setMode(m);
    setGameKey(k => k + 1);
  };

  return (
    <div className="app-wrapper">
      <Header
        mode={mode}
        setMode={handleSetMode}
        onStatsClick={() => setShowStats(true)}
        onSettingsClick={() => setShowSettings(true)}
        darkMode={darkMode}
      />

      <Suspense fallback={null}>
        {showStats && <StatsModal onClose={() => setShowStats(false)} />}
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            colorBlind={colorBlind}
            setColorBlind={setColorBlind}
          />
        )}
      </Suspense>

      <div className="game-area">
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
              onNewGame={mode === 'random' ? () => setGameKey(k => k + 1) : null}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;