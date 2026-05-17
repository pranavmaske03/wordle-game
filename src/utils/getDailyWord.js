import words from '../data/words.json';

const START_DATE = new Date('2025-01-01');

export function getDayIndex() {
  const today = new Date();
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const utcStart = Date.UTC(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate());
  return Math.floor((utcToday - utcStart) / (1000 * 60 * 60 * 24));
}

export function getDailyWord() {
  const index = getDayIndex();
  return words[index % words.length].toLowerCase();
}

export function getTodayKey() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `wordle-daily-${yyyy}-${mm}-${dd}`;
}

export function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}

export function saveDailyResult(guesses, winner) {
  const key = getTodayKey();
  localStorage.setItem(key, JSON.stringify({ guesses, winner, completed: true }));
}

export function loadDailyResult() {
  const key = getTodayKey();
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}