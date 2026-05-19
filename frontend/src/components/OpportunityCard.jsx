import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import DetailModal from './DetailModal'

const typeStyle = {
  'scholarship':       'bg-blue-100 text-blue-700',
  'conference':        'bg-violet-100 text-violet-700',
  'competition':       'bg-amber-100 text-amber-700',
  'training':          'bg-emerald-100 text-emerald-700',
  'volunteering':      'bg-teal-100 text-teal-700',
  'internship':        'bg-orange-100 text-orange-700',
  'youth program':     'bg-indigo-100 text-indigo-700',
  'community activity':'bg-pink-100 text-pink-700',
  'workshop':          'bg-sky-100 text-sky-700',
  'fellowship':        'bg-rose-100 text-rose-700',
}

const verificationStyle = {
  verified:   { border: 'border-emerald-200', bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', icon: '✓' },
  pending:    { border: 'border-amber-200',   bar: 'bg-amber-400',   badge: 'bg-amber-100 text-amber-700',    icon: '⏳' },
  suspicious: { border: 'border-red-200',     bar: 'bg-red-500',     badge: 'bg-red-100 text-red-700',        icon: '⚠' },
}

function formatDeadline(dateStr, t) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  const diff = Math.ceil((date - new Date()) / 86400000)
  const fmt = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  if (diff < 0) return { text: `${t('opportunities.closed')}`, urgent: false }
  if (diff <= 7) return { text: `⚡ ${diff} ${diff === 1 ? t('opportunities.dayLeft') : t('opportunities.daysLeft')}`, urgent: true }
  if (diff <= 30) return { text: `${diff} ${t('opportunities.daysLeft')}`, urgent: false }
  return { text: fmt, urgent: false }
}

export default function OpportunityCard({ opportunity }) {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)

  const vs = verificationStyle[opportunity.verificationStatus] || verificationStyle.pending
  const typeClass = typeStyle[opportunity.type] || 'bg-slate-100 text-slate-600'
  const dl = formatDeadline(opportunity.deadline, t)

  return (
    <>
      <div
        className={`card-hover flex flex-col h-full overflow-hidden border ${vs.border} cursor-pointer group`}
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setShowModal(true)}
      >
        {/* Status bar */}
        <div className={`h-1 ${vs.bar}`} />

        <div className="p-4 flex flex-col flex-1">
          {/* Badges */}
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            <span className={`badge ${typeClass} capitalize text-[11px]`}>{opportunity.type}</span>
            <span className={`badge ${vs.badge} text-[11px]`}>
              {vs.icon} {t(`common.${opportunity.verificationStatus}`)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#1a3a6e] text-sm leading-snug mb-2 line-clamp-2 flex-1">
            {opportunity.title}
          </h3>

          {/* Meta — compact */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
            <span>📍 {opportunity.country}</span>
            {dl && (
              <span className={dl.urgent ? 'text-red-600 font-semibold' : ''}>
                📅 {dl.text}
              </span>
            )}
          </div>

          {/* Top 2 skills */}
          {opportunity.skillsDeveloped?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {opportunity.skillsDeveloped.slice(0, 2).map(s => (
                <span key={s} className="badge bg-blue-50 text-blue-600 capitalize text-[11px]">{s}</span>
              ))}
              {opportunity.skillsDeveloped.length > 2 && (
                <span className="badge bg-slate-100 text-slate-500 text-[11px]">+{opportunity.skillsDeveloped.length - 2}</span>
              )}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={e => { e.stopPropagation(); setShowModal(true) }}
            className="mt-auto w-full text-center text-xs font-bold bg-[#1a3a6e] text-white py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors"
          >
            {t('common.viewDetails')} →
          </button>
        </div>
      </div>

      {showModal && (
        <DetailModal
          item={opportunity}
          type="opportunity"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
