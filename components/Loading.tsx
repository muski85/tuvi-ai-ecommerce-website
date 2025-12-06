"use client"
import React from 'react'
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='fixed min-h-screen w-full bg-white left-0 top-0 flex items-center justify-center z-50'>
      <motion.div 
        className='flex flex-col justify-center items-center gap-6'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Pulsing Logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-4xl text-darkColor font-black tracking-wider uppercase">Tuvi</h2>
        </motion.div>

        {/* Spinning Loader */}
        <motion.div className='flex items-center space-x-3 text-green-800'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className='w-6 h-6'/>
          </motion.div>
          <span className='font-semibold tracking-wide'>Tuvi is loading...</span>
        </motion.div>

        {/* Progress Bar */}
        <div className='w-48 h-1 bg-gray-200 rounded-full overflow-hidden mt-4'>
          <motion.div
            className='h-full bg-green-600 rounded-full'
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Loading