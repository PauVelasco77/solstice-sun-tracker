import { useCallback } from 'react';
import { SunTimingResults } from '../types/sunTiming';

export const useSolstice = () => {
  const getLongestDay = useCallback((sunTiming: SunTimingResults[]) => {
    return sunTiming.reduce((longest, current) => {
      return current.day_length > longest.day_length ? current : longest;
    }, sunTiming[0]);
  }, []);

  return { getLongestDay };
};
