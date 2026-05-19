import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import DetailModal from './DetailModal'

const categoryStyle = {
  'communication':   { pill: 'bg-sky-100 text-sky-700',    bar: 'bg-sky-500' },
  'leadership':      { pill: 'bg-violet-100 text-violet-700', bar: 'bg-violet-500' },
  'teamwork':        { pill: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500' },
  'confidence':      { pill: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500' },
  'critical thinking': { pill: 'bg-red-100 text-red-700',  bar: 'bg-red-500' },
  'creativity':      { pill: 'bg-pink-100 text-pink-700',  bar: 'bg-pink-500' },
  'problem solving': { pill: 'bg-indigo-100 text-indigo-700', bar: 'bg-indigo-500' },
  'public speaking': { pill: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500' },
  'career readiness':{ pill: 'bg-teal-100 text-teal-700',  bar: 'bg-teal-500' },
}

const levelColors = {
  beginner:     'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced:     'bg-red-50 text-red-700',
}

export default function CourseCard({ course }) {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const style = categoryStyle[course.category] || { pill: 'bg-slate-100 text-slate-600', bar: 'bg-slate-400' }
  const levelLabel = t(`common.level.${course.level}`) || course.level

  return (
    <>
      <div
        className="card-hover flex flex-col h-full overflow-hidden cursor-pointer group"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setShowModal(true)}
      >
        {/* Category colour bar */}
        <div className={`h-1 ${style.bar}`} />

        <div className="p-4 flex flex-col flex-1">
          {/* Badges */}
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            <span className={`badge ${style.pill} capitalize text-[11px]`}>{course.category}</span>
            <span className={`badge ${levelColors[course.level] || 'bg-slate-100 text-slate-600'} capitalize text-[11px]`}>
              {levelLabel}
            </span>
            <span className="badge bg-slate-100 text-slate-500 text-[11px] ms-auto">{course.language}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#1a3a6e] text-sm leading-snug mb-1.5 line-clamp-2 flex-1">
            {course.title}
          </h3>

          {/* Provider + duration */}
          <p className="text-xs text-amber-600 font-semibold mb-4">
            {t('common.via')} {course.provider}
            {course.duration && <span className="text-slate-400 font-normal"> · {course.duration}</span>}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); setShowModal(true) }}
              className="flex-1 text-center text-xs font-semibold border border-[#1a3a6e] text-[#1a3a6e] py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              {t('common.learnMore')}
            </button>
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 text-center text-xs font-bold bg-[#1a3a6e] text-white py-2 rounded-xl hover:bg-[#1e40af] transition-colors"
            >
              {t('common.openCourse')} →
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <DetailModal
          item={course}
          type="course"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
