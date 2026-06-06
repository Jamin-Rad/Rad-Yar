'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'radyar-theme'
const SUPPORTED  = ['light', 'dark']

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

const normalize = (v) => SUPPORTED.includes(v) ? v : 'light'

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const t = normalize(theme)
  document.documentElement.dataset.theme = t
  document.documentElement.style.colorScheme = t
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const resolved = normalize(stored || system)
    setThemeState(resolved)
    applyTheme(resolved)
  }, [])

  const setTheme = (next) => {
    const t = normalize(next)
    setThemeState(t)
    applyTheme(t)
    try { window.localStorage.setItem(STORAGE_KEY, t) } catch (_) {}
  }

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
