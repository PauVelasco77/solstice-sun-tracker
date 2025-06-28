'use client';

import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import { motion } from 'motion/react';

interface TextRevealByWordProps {
  paragraph: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  paragraph,
  className,
}) => {
  const words = paragraph.split(' ');

  return (
    <div className={cn('relative z-0', className)}>
      <div className="mx-auto flex max-w-4xl items-center bg-transparent px-4 py-8 md:px-8 md:py-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-wrap text-xl font-bold text-black md:text-2xl lg:text-3xl xl:text-4xl dark:text-white"
        >
          {words.map((word, i) => (
            <Word key={i} index={i}>
              {word}
            </Word>
          ))}
        </motion.p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  index: number;
}

const Word: FC<WordProps> = ({ children, index }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
      className="relative mx-1 lg:mx-2"
    >
      {children}
    </motion.span>
  );
};

export default TextRevealByWord;
