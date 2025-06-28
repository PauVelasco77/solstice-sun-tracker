import { useInView } from 'motion/react';
import { useRef } from 'react';

interface ScrollRevealOptions {
  readonly threshold?: number;
  readonly triggerOnce?: boolean;
  readonly rootMargin?: string;
  readonly delay?: number;
}

interface ScrollRevealVariants {
  readonly hidden: {
    readonly opacity: number;
    readonly y?: number;
    readonly x?: number;
    readonly scale?: number;
    readonly rotate?: number;
  };
  readonly visible: {
    readonly opacity: number;
    readonly y?: number;
    readonly x?: number;
    readonly scale?: number;
    readonly rotate?: number;
    readonly transition?: {
      readonly duration?: number;
      readonly delay?: number;
      readonly ease?: string;
      readonly staggerChildren?: number;
      readonly delayChildren?: number;
    };
  };
}

/**
 * Predefined animation variants for scroll reveal effects
 */
export const scrollVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
} as const satisfies Record<string, ScrollRevealVariants>;

/**
 * Hook for scroll-reveal animations
 * @param options Configuration options for the intersection observer
 * @returns Object containing ref, inView state, and animation controls
 */
export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, delay = 0 } = options;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  const getVariant = (variantName: keyof typeof scrollVariants) => {
    const variant = scrollVariants[variantName];

    // Add delay if specified
    if (delay > 0) {
      return {
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible.transition,
            delay: delay,
          },
        },
      };
    }

    return variant;
  };

  return {
    ref,
    isInView,
    getVariant,
    // Helper methods for common patterns
    controls: {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
    },
  };
};

/**
 * Hook specifically for staggered animations (useful for lists/grids)
 */
export const useStaggeredScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { ref, isInView, getVariant } = useScrollReveal(options);

  return {
    ref,
    isInView,
    containerVariant: getVariant('staggerContainer'),
    itemVariant: getVariant('staggerItem'),
    containerControls: {
      initial: 'hidden',
      animate: isInView ? 'visible' : 'hidden',
    },
  };
};
