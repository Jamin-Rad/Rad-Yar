'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'radyar-theme'
const SUPPORTED_THEMES = ['light', 'dark']

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

function normalizeTheme(value) {
  return SUPPORTED_THEMES.includes(value) ? value : 'light'
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const safeTheme = normalizeTheme(theme)
  document.documentElement.dataset.theme = safeTheme
  document.documentElement.style.colorScheme = safeTheme
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light')

  useEffect(() => {
    const savedTheme = normalizeTheme(window.localStorage.getItem(STORAGE_KEY))
    setThemeState(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const setTheme = (nextTheme) => {
    const safeTheme = normalizeTheme(nextTheme)
    setThemeState(safeTheme)
    applyTheme(safeTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, safeTheme)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
