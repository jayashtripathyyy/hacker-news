import { useState, useEffect, useCallback } from 'react'

function useDebounce<T>(value: T, delay: number): [T, () => void] { 
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const clearDebounce = useCallback(() => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }, [timeoutId]);

    useEffect(() => {
        const id = setTimeout(() => {    
            setDebouncedValue(value);
        }, delay);
        
        setTimeoutId(id);

        return () => {
            if (id) {
                window.clearTimeout(id);
            }
        };
    }, [value, delay]);

    return [debouncedValue, clearDebounce];
}

export default useDebounce