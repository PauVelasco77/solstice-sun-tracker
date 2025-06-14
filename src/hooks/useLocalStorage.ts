import { useState, useCallback } from 'react';

/**
 * Custom hook to manage a value in localStorage.
 * @param key The localStorage key
 * @param initialValue The initial value if nothing is stored
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from localStorage then fallback to initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Set value in state and localStorage
  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key],
  );

  // Remove value from state and localStorage
  const remove = useCallback(() => {
    setStoredValue(initialValue);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }, [initialValue, key]);

  return { value: storedValue, setValue, remove };
}
