"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 21st.dev / Aceternity UI style FlipWords animation.
 * Smoothly flips through an array of phrases/words with spring physics and blur transitions.
 */
export function FlipWords({
  words = [],
  duration = 2600,
  className = "",
}) {
  const [currentWord, setCurrentWord] = useState(words[0] || "");
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    if (!words.length) return;
    const nextIndex = (words.indexOf(currentWord) + 1) % words.length;
    setCurrentWord(words[nextIndex]);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating && words.length > 1) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation, words.length]);

  if (!words.length) return null;

  return (
    <span className="inline-block relative overflow-hidden align-baseline">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.span
          key={currentWord}
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -18,
            filter: "blur(6px)",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className={`inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] via-[#60A5FA] to-[#F87000] ${className}`}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default FlipWords;
