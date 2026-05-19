import { createContext, useContext, useState, useEffect } from 'react'
import en from '../translations/en'
import ar from '../translations/ar'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('forsa-lang') || 'en')

  useEffect(() => {
    localStorage.setItem('forsa-lang', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const translations = lang === 'ar' ? ar : en

  const t = (key) => {
    const keys = key.split('.')
    let val = translations
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
