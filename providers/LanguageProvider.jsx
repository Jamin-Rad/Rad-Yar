'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '@/data/translations'

const SUPPORTED_LANGS = ['de', 'en', 'fa']
const STORAGE_KEY = 'radyar-language'

const LanguageContext = createContext({
  lang: 'de',
  texts: translations.de,
  setLang: () => {},
})

function normalizeLang(value) {
  if (!value) return null
  const short = String(value).toLowerCase().slice(0, 2)
  return SUPPORTED_LANGS.includes(short) ? short : null
}

function getInitialBrowserLang() {
  if (typeof window === 'undefined') return 'de'

  const urlLang = normalizeLang(new URLSearchParams(window.location.search).get('lang'))
  if (urlLang) return urlLang

  const savedLang = normalizeLang(window.localStorage.getItem(STORAGE_KEY))
  if (savedLang) return savedLang

  return 'de'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('de')

  useEffect(() => {
    setLangState(getInitialBrowserLang())
  }, [])

  const setLang = (nextLang) => {
    const safeLang = normalizeLang(nextLang) || 'de'
    setLangState(safeLang)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, safeLang)

      const url = new URL(window.location.href)
      if (safeLang === 'de') {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', safeLang)
      }
      window.history.replaceState(null, '', url.toString())
    }
  }

  const texts = translations[lang] || translations.de
  const value = useMemo(() => ({ lang, texts, setLang }), [lang, texts])

  return (
    <LanguageContext.Provider value={value}>
      <div dir={texts.dir} lang={lang} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
