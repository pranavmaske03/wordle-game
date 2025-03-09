import React from 'react';
import { motion } from 'framer-motion';

function Result({ winner, solution }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            {winner ? (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-6xl font-extrabold text-green-400 text-center"
                >
                    🎉 YOU WON! 🎉
                    <p className="text-xl text-green-300 mt-6 px-4">
                        You crack it. Impressive...! 🚀
                    </p>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-6xl font-extrabold text-red-500 text-center"
                >
                    😔 YOU LOSE! 😔
                    <p className="text-lg text-red-300 mt-6 px-4">
                        Better luck next time! Don't give up, you're getting closer each try. 🔥
                    </p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-xl text-yellow-400 mt-4 px-4"
                    >
                        The correct word was: <span className="font-bold">{solution.toUpperCase()}</span>
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
}

export default Result;
