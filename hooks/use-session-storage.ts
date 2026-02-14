'use client'

import { useState, useEffect, useRef } from 'react'

export function useSessionStorage<T>(key: string, initialValue: T) {
    // Initialize with initialValue to match SSR
    const [storedValue, setStoredValue] = useState<T>(initialValue)
    const isMounted = useRef(false)

    // Hydrate from sessionStorage after mount
    useEffect(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            if (item) {
                setStoredValue(JSON.parse(item))
            }
        } catch (error) {
            console.error(`Error loading ${key} from sessionStorage:`, error)
        }
    }, [key])

    // Update sessionStorage when value changes
    useEffect(() => {
        if (isMounted.current) {
            try {
                window.sessionStorage.setItem(key, JSON.stringify(storedValue))
            } catch (error) {
                console.error(`Error saving ${key} to sessionStorage:`, error)
            }
        } else {
            isMounted.current = true
        }
    }, [key, storedValue])

    const setValue = (value: T | ((val: T) => T)) => {
        setStoredValue((prev) => {
            try {
                const valueToStore = value instanceof Function ? value(prev) : value
                return valueToStore
            } catch (error) {
                console.error(`Error setting ${key}:`, error)
                return prev
            }
        })
    }

    return [storedValue, setValue] as const
}
