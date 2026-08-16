'use client';

import { motion } from 'framer-motion';

const sentenceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function TextReveal({ children, style, className }: { children: string, style?: React.CSSProperties, className?: string }) {
  // Split the text into words, then letters for the reveal effect.
  // We'll just split by words for a slightly cleaner "Text Split Reveal" that is performant.
  const words = children.split(' ');

  return (
    <motion.p
      className={className}
      style={style}
      variants={sentenceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingRight: '0.25em' }}>
          <motion.span variants={letterVariants} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
