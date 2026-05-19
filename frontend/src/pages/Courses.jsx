import { useState, useEffect } from 'react'
import CourseCard from '../components/CourseCard'
import { useLanguage } from '../contexts/LanguageContext'

const CATEGORIES = ['all', 'communication', 'leadership', 'teamwork', 'confidence', 'critical thinking', 'creativity', 'problem solving', 'public speaking', 'career readiness']
const LEVELS = ['all', 'beginner', 'intermediate', 'advanced']
const LANGUAGES = ['all', 'English', 'Arabic']

export default function Courses() {
  const { t } = useLanguage()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')
  const [language, setLanguage] = useState('all')

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(data => { setCourses(data); setLoading(false) })
      .catch(() => { setError(t('common.backendError')); setLoading(false) })
  }, [])

  const filtered = courses.filter(c => {
    const q = search.toLowerCase()
    return (
      (c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) &&
      (category === 'all' || c.category === category) &&
      (level === 'all' || c.level === level) &&
      (language === 'all' || c.language === language)
    )
  })

  const hasFilters = search || category !== 'all' || level !== 'all' || language !== 'all'

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('courses.label')}</div>
        <h1 className="page-title mb-2">{t('courses.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('courses.subtitle')}</p>
      </div>

      {/* Filter bar */}
      <div className="card p-5 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="sm:col-span-2 lg:col-span-1 relative">
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
            <input
              className="input ps-9"
              type="text"
              placeholder={t('courses.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">{t('courses.allCategories')}</option>
            {CATEGORIES.slice(1).map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
          <select className="select" value={level} onChange={e => setLevel(e.target.value)}>
            <option value="all">{t('courses.allLevels')}</option>
            {LEVELS.slice(1).map(l => <option key={l} value={l} className="capitalize">{t(`common.level.${l}`)}</option>)}
          </select>
          <select className="select" value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="all">{t('courses.allLanguages')}</option>
            {LANGUAGES.slice(1).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-500">
            {t('common.showing')} <span className="font-bold text-[#1a3a6e]">{filtered.length}</span>{' '}
            {filtered.length === 1 ? t('courses.course') : t('courses.courses')}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setCategory('all'); setLevel('all'); setLanguage('all') }}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              {t('common.clearFilters')} ✕
            </button>
          )}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-20 text-slate-500">{t('common.loading')}</div>
      )}

      {error && (
        <div className="card p-6 text-center border-red-100 bg-red-50">
          <div className="text-3xl mb-3">⚠️</div>
          <p className="font-semibold text-red-700 mb-1">{t('common.backendNotConnected')}</p>
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <code className="text-xs bg-red-100 px-2 py-1 rounded text-red-700">{t('common.runBackend')}</code>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-bold text-slate-700 mb-1">{t('courses.noResults')}</h3>
          <p className="text-slate-500 text-sm">{t('courses.noResultsHint')}</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  )
}
