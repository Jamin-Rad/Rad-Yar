'use client'
import { createContext, useContext, useState } from 'react'
import { translations } from '@/data/translations'

const LanguageContext = createContext({
  lang: 'de',
  texts: translations.de,
  setLang: () => {},
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de')
  const texts = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, texts, setLang }}>
      <div dir={texts.dir} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
