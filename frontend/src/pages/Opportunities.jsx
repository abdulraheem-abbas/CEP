import { useState, useEffect } from 'react'
import OpportunityCard from '../components/OpportunityCard'
import { useLanguage } from '../contexts/LanguageContext'
import { apiUrl } from '../lib/api'

const TYPES = ['all', 'scholarship', 'conference', 'competition', 'training', 'volunteering', 'internship', 'youth program', 'workshop', 'fellowship']
const COUNTRIES = ['all', 'Egypt', 'Yemen', 'Online', 'United Kingdom']
const SKILLS = ['all', 'leadership', 'communication', 'teamwork', 'public speaking', 'critical thinking', 'creativity', 'problem solving', 'career readiness', 'community engagement']

export default function Opportunities() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [country, setCountry] = useState('all')
  const [skill, setSkill] = useState('all')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(() => {
    fetch(apiUrl('/api/opportunities'))
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false) })
      .catch(() => { setError(t('common.backendError')); setLoading(false) })
  }, [])

  const filtered = items.filter(o => {
    const q = search.toLowerCase()
    return (
      (o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || (o.organization || '').toLowerCase().includes(q)) &&
      (type === 'all' || o.type === type) &&
      (country === 'all' || o.country === country) &&
      (skill === 'all' || (o.skillsDeveloped || []).includes(skill)) &&
      (!verifiedOnly || o.verificationStatus === 'verified')
    )
  })

  const counts = {
    total: items.length,
    verified: items.filter(o => o.verificationStatus === 'verified').length,
    pending: items.filter(o => o.verificationStatus === 'pending').length,
  }

  const hasFilters = search || type !== 'all' || country !== 'all' || skill !== 'all' || verifiedOnly

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('opportunities.label')}</div>
        <h1 className="page-title mb-2">{t('opportunities.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('opportunities.subtitle')}</p>
      </div>

      {/* Status pills */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-slate-200 text-xs">
            <span className="font-bold text-[#1a3a6e]">{counts.total}</span>
            <span className="text-slate-500">{t('opportunities.total')}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 border border-emerald-200 text-xs">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="font-bold text-emerald-700">{counts.verified}</span>
            <span className="text-emerald-600">{t('opportunities.verifiedCount')}</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 rounded-full px-4 py-1.5 border border-amber-200 text-xs">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            <span className="font-bold text-amber-700">{counts.pending}</span>
            <span className="text-amber-600">{t('opportunities.pendingCount')}</span>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="card p-5 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="sm:col-span-2 lg:col-span-1 relative">
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
            <input
              className="input ps-9"
              type="text"
              placeholder={t('opportunities.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="select" value={type} onChange={e => setType(e.target.value)}>
            <option value="all">{t('opportunities.allTypes')}</option>
            {TYPES.slice(1).map(tp => <option key={tp} value={tp} className="capitalize">{tp}</option>)}
          </select>
          <select className="select" value={country} onChange={e => setCountry(e.target.value)}>
            <option value="all">{t('opportunities.allCountries')}</option>
            {COUNTRIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select" value={skill} onChange={e => setSkill(e.target.value)}>
            <option value="all">{t('opportunities.allSkills')}</option>
            {SKILLS.slice(1).map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${verifiedOnly ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${verifiedOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs font-medium text-slate-700">{t('opportunities.verifiedOnly')}</span>
          </label>
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500">
              {t('common.showing')} <span className="font-bold text-[#1a3a6e]">{filtered.length}</span>
            </p>
            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setType('all'); setCountry('all'); setSkill('all'); setVerifiedOnly(false) }}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                {t('common.clearFilters')} ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* States */}
      {loading && <div className="text-center py-20 text-slate-500">{t('common.loading')}</div>}

      {error && (
        <div className="card p-6 text-center border-red-100 bg-red-50">
          <div className="text-3xl mb-3">⚠️</div>
          <p className="font-semibold text-red-700 mb-1">{t('common.backendNotConnected')}</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-bold text-slate-700 mb-1">{t('opportunities.noResults')}</h3>
          <p className="text-slate-500 text-sm">{t('opportunities.noResultsHint')}</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(o => <OpportunityCard key={o.id} opportunity={o} />)}
        </div>
      )}
    </div>
  )
}
