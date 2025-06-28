import { useMemo } from 'react';

/**
 * Hook to calculate the next Sant Joan date (June 23rd) in Barcelona timezone
 */
export const useSantJoan = () => {
  const getNextSantJoan = useMemo((): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Create Sant Joan date for current year (June 23rd) at midnight in Barcelona timezone
    const santJoanDateString = `${currentYear}-06-23T00:00:00`;
    let santJoanDate = new Date(santJoanDateString);

    // If Sant Joan has already passed this year, get next year's date
    if (santJoanDate < now) {
      const nextYear = currentYear + 1;
      santJoanDate = new Date(`${nextYear}-06-23T00:00:00`);
    }

    return santJoanDate;
  }, []);

  return { getNextSantJoan };
};
