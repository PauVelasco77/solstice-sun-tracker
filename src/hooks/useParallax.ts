import { MotionValue, useTransform } from 'motion/react';

export function useParallax(
  value: MotionValue<number>,
  distance: number,
): MotionValue<number> {
  return useTransform(value, [0, 1], [-distance, distance]);
}
