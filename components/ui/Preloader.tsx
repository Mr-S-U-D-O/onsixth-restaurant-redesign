'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep it fast so it doesn't annoy returning users
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--obsidian)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cream)',
            overflow: 'hidden'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-tighter)',
              lineHeight: 1,
              margin: 0
            }}
          >
            ON SIXTH
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
