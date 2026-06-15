"use client";

import { useState, useEffect } from "react";

/**
 * Delays updating `value` until after `delay` ms of inactivity.
 * Use this to debounce expensive operations like search API calls.
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
