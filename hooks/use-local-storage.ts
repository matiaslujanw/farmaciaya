'use client'

import { useState, useEffect, useRef } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize with initialValue to match SSR
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const isMounted = useRef(false)

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }, [key])

  // Update localStorage when value changes
  useEffect(() => {
    if (isMounted.current) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
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
