import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to debounce a value.
 * @param initialValue The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(initialValue: T, delay: number = 1000): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(initialValue);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [initialValue, delay]);

    return debouncedValue;
};