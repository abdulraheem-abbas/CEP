import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { WEEKS, PHASES } from '../data/firstCurriculumData'

// ── Week Card ─────────────────────────────────────────────────────────────────
function WeekCard({ week, isAr, isExpanded, onToggle }) {
  const title = isAr ? week.titleAr : week.title
  const skill = isAr ? week.skillAr : week.skill
  const overview = isAr ? week.overviewAr : week.overview
  const goals = isAr ? week.goalsAr : week.goals
  const activities = week.activities
  const outcomes = isAr ? week.outcomesAr : week.outcomes
  const materials = isAr ? week.materialsAr : week.materials

  const phaseBadge = week.phase === 'soft-skills'
    ? { label: isAr ? 'مهارات حياتية' : 'Soft Skills', cls: 'bg-blue-50 text-blue-700 border-blue-200' }
    : { label: isAr ? 'مشروع مجتمعي' : 'Community', cls: 'bg-amber-50 text-amber-700 border-amber-200' }

  return (
    <div className={`card rounded-2xl overflow-hidden transition-shadow ${isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
      {/* Week header */}
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className={`${week.bgClass} border-b ${week.borderClass} px-5 py-4`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {/* Week number badge */}
              <div className={`${week.accentClass} text-white rounded-xl w-12 h-12 flex flex-col items-center justify-center shrink-0 shadow`}>
                <span className="text-[10px] font-bold leading-none opacity-80">
                  {isAr ? 'أسبوع' : 'WK'}
                </span>
                <span className="text-xl font-black leading-none">{week.week}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-lg">{week.emoji}</span>
                  <h3 className={`font-black text-base ${week.textClass}`}>{title}</h3>
                </div>
                <p className="text-sm text-slate-600 font-medium">{skill}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`hidden sm:block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${phaseBadge.cls}`}>
                {phaseBadge.label}
              </span>
              <span className={`text-lg transition-transform ${isExpanded ? 'rotate-180' : ''} ${week.textClass}`}>⌄</span>
            </div>
          </div>
        </div>
      </button>

      {/* Overview always visible */}
      <div className="px-5 py-3">
        <p className="text-sm text-slate-500 leading-relaxed">{overview}</p>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-slate-100 space-y-5 pt-4">
          {/* Goals */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {isAr ? '🎯 أهداف هذا الأسبوع' : '🎯 Goals this week'}
            </p>
            <ul className="space-y-1.5">
              {goals.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className={`mt-0.5 shrink-0 font-bold ${week.textClass}`}>→</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {isAr ? '🎮 الأنشطة' : '🎮 Activities'}
            </p>
            <div className="space-y-3">
              {activities.map((act, i) => (
                <div key={i} className={`rounded-xl p-4 border ${week.bgClass} ${week.borderClass}`}>
                  <p className={`font-bold text-sm mb-1 ${week.textClass}`}>
                    {isAr ? act.nameAr : act.name}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? act.descAr : act.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes + Meta */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {isAr ? '✅ ما ستحققه' : '✅ What you\'ll achieve'}
              </p>
              <ul className="space-y-1">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>⏱</span>
                <span><strong>{isAr ? 'المدة:' : 'Duration:'}</strong> {week.duration}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <span>📦</span>
                <span><strong>{isAr ? 'المواد:' : 'Materials:'}</strong> {materials}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function FirstCurriculum() {
  const { t, lang } = useLanguage()
  const isAr = lang === 'ar'

  const [expandedWeeks, setExpandedWeeks] = useState(new Set([1]))

  const toggleWeek = (n) => {
    setExpandedWeeks(prev => {
      const next = new Set(prev)
      next.has(n) ? next.delete(n) : next.add(n)
      return next
    })
  }

  const expandAll = () => setExpandedWeeks(new Set(WEEKS.map(w => w.week)))
  const collapseAll = () => setExpandedWeeks(new Set())

  const softWeeks = WEEKS.filter(w => w.phase === 'soft-skills')
  const communityWeeks = WEEKS.filter(w => w.phase === 'community')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('firstCurriculum.label')}</div>
        <h1 className="page-title mb-2">{t('firstCurriculum.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('firstCurriculum.subtitle')}</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { value: t('firstCurriculum.statsWeeks'), label: isAr ? 'رحلة متكاملة' : 'Full Journey', icon: '📅' },
          { value: t('firstCurriculum.statsActivities'), label: isAr ? 'نشاطاً تفاعلياً' : 'Activities', icon: '🎮' },
          { value: t('firstCurriculum.statsFree'), label: isAr ? 'بدون تكلفة' : 'Always Free', icon: '✅' },
          { value: t('firstCurriculum.statsFor'), label: isAr ? 'لجميع الطلاب' : '', icon: '👩‍🎓' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="font-black text-[#1a3a6e] text-sm leading-tight">{stat.value}</div>
            {stat.label && <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>}
          </div>
        ))}
      </div>

      {/* Expand/Collapse controls */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">{t('firstCurriculum.joinNote')}</p>
        <div className="flex gap-2">
          <button onClick={expandAll} className="text-xs text-[#1a3a6e] hover:underline font-medium">
            {isAr ? 'فتح الكل' : 'Expand all'}
          </button>
          <span className="text-slate-300">|</span>
          <button onClick={collapseAll} className="text-xs text-slate-400 hover:underline">
            {isAr ? 'طيّ الكل' : 'Collapse all'}
          </button>
        </div>
      </div>

      {/* Phase 1 — Soft Skills */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-black shrink-0">1</div>
          <div>
            <h2 className="font-black text-[#1a3a6e] text-base">{t('firstCurriculum.phaseALabel')}</h2>
            <p className="text-xs text-slate-500">{t('firstCurriculum.phaseADesc')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {softWeeks.map(week => (
            <WeekCard
              key={week.week}
              week={week}
              isAr={isAr}
              isExpanded={expandedWeeks.has(week.week)}
              onToggle={() => toggleWeek(week.week)}
            />
          ))}
        </div>
      </div>

      {/* Phase divider */}
      <div className="relative flex items-center my-8">
        <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-amber-200" />
        <div className="mx-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-amber-200 shadow-sm">
          <span className="text-amber-500 text-sm">🌍</span>
          <span className="text-xs font-bold text-amber-700">
            {isAr ? 'انتقال إلى المشروع المجتمعي' : 'Now: Community Project'}
          </span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-blue-200" />
      </div>

      {/* Phase 2 — Community */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-amber-500 text-white rounded-full text-sm font-black shrink-0">2</div>
          <div>
            <h2 className="font-black text-[#1a3a6e] text-base">{t('firstCurriculum.phaseBLabel')}</h2>
            <p className="text-xs text-slate-500">{t('firstCurriculum.phaseBDesc')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {communityWeeks.map(week => (
            <WeekCard
              key={week.week}
              week={week}
              isAr={isAr}
              isExpanded={expandedWeeks.has(week.week)}
              onToggle={() => toggleWeek(week.week)}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 bg-gradient-to-br from-[#1a3a6e] to-[#1e40af] text-white text-center rounded-2xl shadow-lg">
        <div className="text-4xl mb-3">🚀</div>
        <h3 className="font-black text-xl mb-2">
          {isAr ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
        </h3>
        <p className="text-blue-200 text-sm mb-6">
          {isAr
            ? 'ابدأ من الأسبوع الأول. كل خطوة تقودك إلى التالية.'
            : 'Start with Week 1. Every step leads to the next.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => { setExpandedWeeks(new Set([1])); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="bg-amber-400 hover:bg-amber-300 text-[#1a3a6e] font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            {t('firstCurriculum.startJourney')}
          </button>
          <Link to="/rafiq"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm border border-white/20 transition-colors">
            {isAr ? 'اسأل رفيق 🦉' : 'Ask Rafiq 🦉'}
          </Link>
          <Link to="/teachers"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm border border-white/20 transition-colors">
            {isAr ? 'للمعلمين →' : 'For Teachers →'}
          </Link>
        </div>
        <p className="text-blue-300 text-xs mt-4">{t('firstCurriculum.downloadNote')}</p>
      </div>
    </div>
  )
}
