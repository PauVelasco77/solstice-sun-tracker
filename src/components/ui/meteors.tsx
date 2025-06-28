'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ScrollReveal } from './scroll-reveal';

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    // Reduce meteors on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const meteorCount = isMobile ? Math.floor(number / 2) : number;

    const styles = [...new Array(meteorCount)].map(() => ({
      '--angle': -angle + 'deg',
      top: '-5%',
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + 's',
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        's',
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <ScrollReveal animation="fadeIn" duration={2} delay={0.5}>
      <>
        {[...meteorStyles].map((style, idx) => (
          // Meteor Head
          <span
            key={idx}
            style={{ ...style }}
            className={cn(
              'animate-meteor pointer-events-none absolute size-0.5 rotate-[var(--angle)] rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]',
              className,
            )}
          >
            {/* Meteor Tail */}
            <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[30px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent md:w-[50px]" />
          </span>
        ))}
      </>
    </ScrollReveal>
  );
};
