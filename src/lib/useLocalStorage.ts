import { useEffect, useRef, useState } from 'react'

/**
 * State that autosaves to localStorage under `key`.
 *
 * Reads once on mount (falling back to `initial` on miss or parse error) and
 * writes on every change, debounced to a frame so rapid keystrokes don't
 * thrash storage.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch {
        /* storage full or unavailable — ignore, state still works in-memory */
      }
    }, 200)
    return () => window.clearTimeout(timer.current)
  }, [key, value])

  return [value, setValue] as const
}
