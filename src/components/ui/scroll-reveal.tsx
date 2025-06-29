import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ScrollRevealProps {
  readonly children: ReactNode;
  readonly animation?:
    | 'fadeIn'
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn'
    | 'rotateIn';
  readonly delay?: number;
  readonly duration?: number;
  readonly threshold?: number;
  readonly once?: boolean;
  readonly className?: string;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
} as const;

/**
 * Detect if user is on mobile device
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * ScrollReveal component for easy scroll-triggered animations
 * Optimized for mobile performance
 */
export const ScrollReveal = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className,
}: ScrollRevealProps) => {
  const variant = animations[animation];
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Optimize settings for mobile
  const optimizedDuration = shouldReduceMotion
    ? 0.01
    : isMobile
      ? duration * 0.7
      : duration;
  const optimizedDelay = shouldReduceMotion
    ? 0
    : isMobile
      ? delay * 0.5
      : delay;
  const optimizedThreshold = isMobile
    ? Math.max(threshold * 0.5, 0.05)
    : threshold;

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView="visible"
      viewport={{
        once,
        amount: optimizedThreshold,
        margin: isMobile ? '-20px' : '-50px',
      }}
      variants={shouldReduceMotion ? undefined : variant}
      transition={{
        duration: optimizedDuration,
        delay: optimizedDelay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};
