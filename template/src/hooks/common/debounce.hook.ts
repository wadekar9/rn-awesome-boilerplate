import { useEffect, useRef, useState } from "react";

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