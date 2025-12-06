"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

interface AnimatedHeartProps {
  onToggle?: (isLiked: boolean) => void;
  className?: string;
}

const AnimatedHeart = ({ onToggle, className }: AnimatedHeartProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleClick = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    
    if (newState) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 1000);
    }
    
    onToggle?.(newState);
  };

  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10">
      {/* Heart Button */}
      <motion.button
        onClick={handleClick}
        className={`relative z-10 ${className}`}
        whileTap={{ scale: 0.8 }}
      >
        <motion.div
          animate={
            isLiked
              ? {
                  scale: [1, 1.4, 1],
                  rotate: [0, -15, 15, -10, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Burst Animation */}
      <AnimatePresence>
        {showBurst && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Outer Ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-red-300 rounded-full"
              initial={{ width: 20, height: 20, opacity: 0.8 }}
              animate={{
                width: 60,
                height: 60,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Particles - 12 dots */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12;
              const distance = 25;
              
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.05,
                  }}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      i % 3 === 0
                        ? "bg-red-400"
                        : i % 3 === 1
                        ? "bg-pink-400"
                        : "bg-red-300"
                    }`}
                  />
                </motion.div>
              );
            })}

            {/* Center glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full blur-md"
              initial={{ width: 0, height: 0, opacity: 0.6 }}
              animate={{
                width: 30,
                height: 30,
                opacity: 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeart;