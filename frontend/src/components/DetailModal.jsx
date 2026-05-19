import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { apiUrl } from '../lib/api'

const categoryStyle = {
  'communication':   'bg-sky-100 text-sky-700',
  'leadership':      'bg-violet-100 text-violet-700',
  'teamwork':        'bg-emerald-100 text-emerald-700',
  'confidence':      'bg-orange-100 text-orange-700',
  'critical thinking': 'bg-red-100 text-red-700',
  'creativity':      'bg-pink-100 text-pink-700',
  'problem solving': 'bg-indigo-100 text-indigo-700',
  'public speaking': 'bg-amber-100 text-amber-700',
  'career readiness':'bg-teal-100 text-teal-700',
}

const verificationStyle = {
  verified:   'bg-emerald-100 text-emerald-700',
  pending:    'bg-amber-100 text-amber-700',
  suspicious: 'bg-red-100 text-red-700',
}

const typeStyle = {
  'scholarship': 'bg-blue-100 text-blue-700',
  'competition': 'bg-amber-100 text-amber-700',
  'training':    'bg-emerald-100 text-emerald-700',
  'youth program':'bg-indigo-100 text-indigo-700',
  'fellowship':  'bg-rose-100 text-rose-700',
  'conference':  'bg-violet-100 text-violet-700',
  'volunteering':'bg-teal-100 text-teal-700',
  'workshop':    'bg-sky-100 text-sky-700',
}

export default function DetailModal({ item, type, onClose }) {
  const { t, lang } = useLanguage()
  const [summary, setSummary] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entry animation
    requestAnimationFrame(() => setVisible(true))

    // Fetch AI summary
    fetch(apiUrl('/api/summarize'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, item, lang }),
    })
      .then(r => r.json())
      .then(d => { setSummary(d); setSummaryLoading(false) })
      .catch(() => {
        const raw = item.description || ''
        setSummary({ summary: raw.length > 220 ? raw.slice(0, 220) + '…' : raw, poweredBy: 'fallback' })
        setSummaryLoading(false)
      })
  }, [item.id, lang, type])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 200)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const isCourse = type === 'course'
  const isOpp = type === 'opportunity'

  const categoryClass = isCourse
    ? (categoryStyle[item.category] || 'bg-slate-100 text-slate-600')
    : (typeStyle[item.type] || 'bg-slate-100 text-slate-600')

  const externalLink = isCourse ? item.link : item.applicationLink
  const externalBtnLabel = isCourse ? t('modal.openCourse') : t('modal.visitWebsite')

  const levelLabel = item.level ? t(`common.level.${item.level}`) || item.level : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ backgroundColor: `rgba(0,0,0,${visible ? 0.5 : 0})`, transition: 'background-color 0.2s ease' }}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      <div
        className={`bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className={`badge ${categoryClass} capitalize`}>
                {isCourse ? item.category : item.type}
              </span>
              {isCourse && levelLabel && (
                <span className="badge bg-slate-100 text-slate-600 capitalize">{levelLabel}</span>
              )}
              {isOpp && item.verificationStatus && (
                <span className={`badge ${verificationStyle[item.verificationStatus] || 'bg-slate-100 text-slate-600'} capitalize`}>
                  {item.verificationStatus === 'verified' ? '✓ ' : item.verificationStatus === 'suspicious' ? '⚠ ' : '⏳ '}
                  {t(`common.${item.verificationStatus}`)}
                </span>
              )}
            </div>
            <h2 className="font-extrabold text-[#1a3a6e] text-lg leading-snug">{item.title}</h2>
          </div>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 shrink-0"
            aria-label={t('modal.close')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">

          {/* AI Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">✨</span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t('modal.aiSummary')}</span>
              {!summaryLoading && summary && (
                <span className={`ms-auto text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  summary.poweredBy === 'gemini' ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {summary.poweredBy === 'gemini' ? `🤖 ${t('modal.poweredByGemini')}` : t('modal.poweredByFallback')}
                </span>
              )}
            </div>
            {summaryLoading ? (
              <div className="flex items-center gap-2 text-blue-500 text-sm">
                <span className="animate-spin">⟳</span> {t('modal.generatingSummary')}
              </div>
            ) : (
              <p className="text-slate-700 text-sm leading-relaxed">{summary?.summary || t('modal.noSummary')}</p>
            )}
          </div>

          {/* Quick details grid */}
          <div className="grid grid-cols-2 gap-3">
            {isCourse && item.provider && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{t('modal.provider')}</p>
                <p className="text-sm font-semibold text-slate-700">{item.provider}</p>
              </div>
            )}
            {isOpp && item.organization && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{t('modal.organization')}</p>
                <p className="text-sm font-semibold text-slate-700">{item.organization}</p>
              </div>
            )}
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-0.5">{t('modal.language')}</p>
              <p className="text-sm font-semibold text-slate-700">{item.language || '—'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-0.5">{t('modal.payment')}</p>
              <p className="text-sm font-semibold text-emerald-600">{t('modal.free')}</p>
            </div>
            {isCourse && item.duration && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{t('modal.duration')}</p>
                <p className="text-sm font-semibold text-slate-700">{item.duration}</p>
              </div>
            )}
            {isOpp && item.deadline && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{t('modal.deadline')}</p>
                <p className="text-sm font-semibold text-slate-700">{item.deadline}</p>
              </div>
            )}
            {isOpp && item.country && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{t('modal.country')}</p>
                <p className="text-sm font-semibold text-slate-700">{item.country}</p>
              </div>
            )}
          </div>

          {/* Eligibility */}
          {isOpp && item.eligibility && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('modal.eligibility')}</p>
              <p className="text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">{item.eligibility}</p>
            </div>
          )}

          {/* Skills */}
          {isOpp && item.skillsDeveloped?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('modal.skills')}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.skillsDeveloped.map(s => (
                  <span key={s} className="badge bg-blue-50 text-blue-600 capitalize">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          {item.description && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t('modal.description')}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t border-slate-100 shrink-0">
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm"
          >
            🌐 {externalBtnLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
