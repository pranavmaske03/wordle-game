
const Header = ({ mode, setMode }) => {
  return (
    <div className="w-full bg-gray-900 text-center py-4 pt-8 border-b border-gray-700">
      <h1 className="text-5xl font-extrabold uppercase tracking-widest 
                     bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 
                     text-transparent bg-clip-text drop-shadow-lg">
        Wordle Quest
      </h1>
      <p className="text-lg text-gray-400 mt-2 italic">Guess the correct word!</p>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setMode('daily')}
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
            ${mode === 'daily'
              ? 'bg-yellow-400 text-gray-900'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          📅 Daily
        </button>
        <button
          onClick={() => setMode('random')}
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
            ${mode === 'random'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          🎲 Random
        </button>
      </div>
    </div>
  );
};

export default Header;