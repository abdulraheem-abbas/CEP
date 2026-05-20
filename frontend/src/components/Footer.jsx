import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()
  const isAr = lang === 'ar'

  return (
    <footer className="bg-[#0f2347] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg"
                style={{ background: 'linear-gradient(135deg, #1e40af, #0891b2)' }}>
                F
              </div>
              <div>
                <div className="font-black text-lg leading-none">Forsa</div>
                <div className="text-blue-400 text-[10px]">فرصة</div>
              </div>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-3 italic">
              "{t('home.tagline').replace(/"/g, '')}"
            </p>
            <div className="flex gap-2">
              <span className="badge bg-emerald-900 text-emerald-300">🇪🇬 Egypt</span>
              <span className="badge bg-blue-900 text-blue-300">🇾🇪 Yemen</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              {isAr ? 'المنصة' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li><Link to="/curriculum" className="hover:text-white transition-colors">{t('nav.curriculum')}</Link></li>
              <li><Link to="/skills" className="hover:text-white transition-colors">{t('nav.skills')}</Link></li>
              <li><Link to="/opportunities" className="hover:text-white transition-colors">{t('nav.opportunities')}</Link></li>
              <li><Link to="/verify" className="hover:text-white transition-colors">{t('nav.verify')}</Link></li>
              <li><Link to="/rafiq" className="hover:text-white transition-colors">{t('nav.rafiq')} 🦉</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              {isAr ? 'التعلم' : 'Learn'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li><Link to="/first-curriculum" className="hover:text-white transition-colors">{t('nav.firstCurriculum')}</Link></li>
              <li><Link to="/teachers" className="hover:text-white transition-colors">{t('nav.teachers')}</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">{isAr ? 'كل الدورات' : 'All Courses'}</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-4">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('about.gap.title')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('about.platform.title')}</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">{t('nav.admin')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-blue-500">
          <p>© 2025 Forsa Platform · A prototype for public school education equity.</p>
          <p>Free · Open · Prototype v2.0 · Powered by Gemini AI · Rafiq 🦉</p>
        </div>
      </div>
    </footer>
  )
}
