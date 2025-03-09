import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import WordInput from './components/WordInput';

const API_URL = '/api/api/fe/wordle-words';      // https://api.frontendexpert.io/api/api/fe/wordle-words

function App() {
  const [solution, setSolution] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      console.log(randomWord);
      setSolution(randomWord.toLowerCase());
      setIsFetched(true);
    };
    fetchWords();
  }, []);

  return (
    <>
      <Header/>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        { !isFetched ? (
          <div className="flex flex-col justify-center items-center flex-grow">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.p
              className="mt-4 text-lg font-semibold text-gray-300"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              Loading...
            </motion.p>
          </div>
          ) : (          
          <WordInput solution={solution} />
        )}
      </div>
    </>
  );
}

export default App;
