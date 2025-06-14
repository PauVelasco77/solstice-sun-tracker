import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to read a value from localStorage.
 * @param key The localStorage key
 */
export function useReadLocalStorage<T>(key: string): T | undefined {
  const readValue = useCallback((): T | undefined => {
    if (typeof window === 'undefined') return undefined;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch {
      return undefined;
    }
  }, [key]);

  const [value, setValue] = useState<T | undefined>(readValue);

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}
