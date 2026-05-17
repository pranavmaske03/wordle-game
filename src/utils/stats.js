const STATS_KEY_DAILY = 'wordle-stats-daily';
const STATS_KEY_RANDOM = 'wordle-stats-random';

const defaultStats = () => ({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
});

export function getStats(mode) {
    const key = mode === 'daily' ? STATS_KEY_DAILY : STATS_KEY_RANDOM;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultStats();
    } catch {
        return defaultStats();
    }
}

export function updateStats(mode, won, numGuesses) {
    const key = mode === 'daily' ? STATS_KEY_DAILY : STATS_KEY_RANDOM;
    const stats = getStats(mode);

    stats.gamesPlayed += 1;

    if (won) {
        stats.gamesWon += 1;
        stats.currentStreak += 1;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.distribution[numGuesses] = (stats.distribution[numGuesses] || 0) + 1;
    } else {
        stats.currentStreak = 0;
    }
    localStorage.setItem(key, JSON.stringify(stats));
}