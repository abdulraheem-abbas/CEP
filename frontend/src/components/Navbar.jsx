import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t, lang, setLang } = useLanguage()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/curriculum', label: t('nav.curriculum') },
    { path: '/skills', label: t('nav.skills') },
    { path: '/opportunities', label: t('nav.opportunities') },
    { path: '/verify', label: t('nav.verify') },
    { path: '/teachers', label: t('nav.teachers') },
    { path: '/first-curriculum', label: t('nav.firstCurriculum') },
    { path: '/rafiq', label: t('nav.rafiq') },
    { path: '/about', label: t('nav.about') },
  ]

  const isActive = (path) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path)

  // /chatbot should also highlight Rafiq
  const isRafiqActive = location.pathname === '/rafiq' || location.pathname === '/chatbot'

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
              style={{ background: 'linear-gradient(135deg, #1a3a6e, #1e40af)' }}>
              F
            </div>
            <div>
              <div className="font-black text-[#1a3a6e] text-base leading-none tracking-tight">Forsa</div>
              <div className="text-[9px] text-slate-400 leading-none">فرصة</div>
            </div>
          </Link>

          {/* Desktop nav — scrollable on narrow screens */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map(link => {
              const active = link.path === '/rafiq' ? isRafiqActive : isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-blue-50 text-[#1a3a6e] font-semibold'
                      : 'text-slate-600 hover:text-[#1a3a6e] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:border-[#1a3a6e] hover:text-[#1a3a6e] transition-colors bg-white"
            >
              <span className="text-sm">{lang === 'en' ? '🇸🇦' : '🇬🇧'}</span>
              {t('nav.switchLang')}
            </button>

            {/* Admin link */}
            <Link
              to="/admin"
              className={`hidden xl:block px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isActive('/admin')
                  ? 'bg-[#1a3a6e] text-white border-[#1a3a6e]'
                  : 'border-slate-200 text-slate-500 hover:border-[#1a3a6e] hover:text-[#1a3a6e]'
              }`}
            >
              {t('nav.admin')}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-5 h-0.5 bg-slate-700 transition-all mb-1.5 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-slate-700 transition-all mb-1.5 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-slate-700 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2">
          <div className="grid grid-cols-3 gap-1 mb-3">
            {navLinks.map(link => {
              const active = link.path === '/rafiq' ? isRafiqActive : isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-center ${
                    active
                      ? 'bg-blue-50 text-[#1a3a6e] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 text-center border border-slate-200"
            >
              {t('nav.admin')}
            </Link>
          </div>
          <button
            onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsOpen(false) }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#1a3a6e] hover:text-[#1a3a6e] transition-colors"
          >
            <span>{lang === 'en' ? '🇸🇦' : '🇬🇧'}</span>
            {t('nav.switchLang')}
          </button>
        </div>
      )}
    </nav>
  )
}
