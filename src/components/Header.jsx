
const Header = () => {
    return (
      <div className="w-full bg-gray-900 text-center py-4 pt-8">
        <h1 className="text-5xl font-extrabold uppercase tracking-widest 
                       bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 
                       text-transparent bg-clip-text drop-shadow-lg">
          Wordle Quest
        </h1>
        <p className="text-lg text-gray-400 mt-2 italic">Guess the correct word!</p>
      </div>
    );
};

export default Header;
