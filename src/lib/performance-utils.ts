/**
 * Performance utilities for optimizing animations on mobile devices
 */

/**
 * Detect if user is on mobile device
 */
export const useIsMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || 'ontouchstart' in window;
};

/**
 * Get optimized animation duration based on device capabilities
 */
export const getOptimizedDuration = (
  baseDuration: number,
  isMobile: boolean,
  shouldReduceMotion: boolean,
): number => {
  if (shouldReduceMotion) return 0.01;
  return isMobile ? baseDuration * 0.7 : baseDuration;
};

/**
 * Get optimized animation delay based on device capabilities
 */
export const getOptimizedDelay = (
  baseDelay: number,
  isMobile: boolean,
  shouldReduceMotion: boolean,
): number => {
  if (shouldReduceMotion) return 0;
  return isMobile ? baseDelay * 0.5 : baseDelay;
};

/**
 * Performance monitoring for animations
 */
export const measureAnimationPerformance = (
  animationName: string,
  callback: () => void,
): void => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;

    if (duration > 16.67) {
      // More than one frame at 60fps
      console.warn(
        `Animation "${animationName}" took ${duration.toFixed(2)}ms (>16.67ms)`,
      );
    }
  } else {
    callback();
  }
};

/**
 * Debounce function for resize events
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if device supports hardware acceleration
 */
export const supportsHardwareAcceleration = (): boolean => {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
};

/**
 * Animation configuration presets for different devices
 */
export const animationPresets = {
  mobile: {
    duration: 0.3,
    delay: 0.05,
    ease: 'easeOut' as const,
    staggerDelay: 0.03,
  },
  desktop: {
    duration: 0.6,
    delay: 0.1,
    ease: 'easeOut' as const,
    staggerDelay: 0.1,
  },
  reducedMotion: {
    duration: 0.01,
    delay: 0,
    ease: 'linear' as const,
    staggerDelay: 0,
  },
} as const;

/**
 * Get animation preset based on device and user preferences
 */
export const getAnimationPreset = (
  isMobile: boolean,
  shouldReduceMotion: boolean,
) => {
  if (shouldReduceMotion) return animationPresets.reducedMotion;
  return isMobile ? animationPresets.mobile : animationPresets.desktop;
};
