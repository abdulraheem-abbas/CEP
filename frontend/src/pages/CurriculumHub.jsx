import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { GRADE_GROUPS, SUBJECTS, CURRICULUM, EXTERNAL_RESOURCES } from '../data/curriculumData'

// ── Helpers ──────────────────────────────────────────────────────────────────
function getGroupKey(grade) {
  if (grade <= 3) return '1-3'
  if (grade <= 6) return '4-6'
  if (grade <= 9) return '7-9'
  return '10-12'
}

function getGroupColor(grade) {
  const g = GRADE_GROUPS.find(g => grade >= g.range[0] && grade <= g.range[1])
  return g ? g.color : 'blue'
}

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  blue:    { bg: 'bg-blue-100',    text: 'text-blue-700',    ring: 'ring-blue-400',    btn: 'bg-blue-600 hover:bg-blue-700',    badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  violet:  { bg: 'bg-violet-100',  text: 'text-violet-700',  ring: 'ring-violet-400',  btn: 'bg-violet-600 hover:bg-violet-700',  badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  amber:   { bg: 'bg-amber-100',   text: 'text-amber-700',   ring: 'ring-amber-400',   btn: 'bg-amber-600 hover:bg-amber-700',   badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  sky:     { bg: 'bg-sky-100',     text: 'text-sky-700',     ring: 'ring-sky-400',     btn: 'bg-sky-600 hover:bg-sky-700',     badge: 'bg-sky-50 text-sky-700 border-sky-200' },
}

// ── Topic Card ────────────────────────────────────────────────────────────────
function TopicCard({ topic, isAr, externalResources, gradeColor }) {
  const [expanded, setExpanded] = useState(false)
  const c = COLOR_MAP[gradeColor] || COLOR_MAP.blue

  const title = isAr ? topic.titleAr : topic.title
  const explanation = isAr ? topic.explanationAr : topic.explanation
  const points = isAr ? topic.keyPointsAr : topic.keyPoints

  return (
    <div className={`card border rounded-2xl overflow-hidden transition-shadow ${expanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}>
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`w-2 h-2 rounded-full shrink-0 ${c.btn.split(' ')[0]}`} />
          <span className="font-semibold text-[#0f172a] text-sm leading-snug">{title}</span>
        </div>
        <span className={`text-lg transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">{explanation}</p>

          {points && points.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {isAr ? 'النقاط الرئيسية' : 'Key Points'}
              </p>
              <ul className="space-y-1.5">
                {points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-0.5 shrink-0 text-xs font-bold ${c.text}`}>✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {externalResources && externalResources.length > 0 && (
            <div className={`rounded-xl p-4 border ${c.badge}`}>
              <p className="text-xs font-bold mb-2">
                {isAr ? 'مصادر موثوقة للتعمق أكثر:' : 'Trusted sources to go deeper:'}
              </p>
              <div className="space-y-2">
                {externalResources.slice(0, 2).map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs hover:underline font-medium">
                    <span>🔗</span>
                    <span>{isAr ? r.nameAr : r.name}</span>
                    <span className="text-slate-400 font-normal truncate">— {isAr ? r.descAr : r.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CurriculumHub() {
  const { t, lang, isRTL } = useLanguage()
  const isAr = lang === 'ar'

  const [selectedGrade, setSelectedGrade] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState('math')
  const [search, setSearch] = useState('')

  const groupKey = selectedGrade ? getGroupKey(selectedGrade) : null
  const gradeColor = selectedGrade ? getGroupColor(selectedGrade) : 'blue'
  const c = COLOR_MAP[gradeColor] || COLOR_MAP.blue

  const subjectTopics = useMemo(() => {
    if (!groupKey) return []
    return CURRICULUM[groupKey]?.[selectedSubject] || []
  }, [groupKey, selectedSubject])

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return subjectTopics
    const q = search.toLowerCase()
    return subjectTopics.filter(tp =>
      tp.title.toLowerCase().includes(q) ||
      tp.titleAr.includes(q) ||
      tp.explanation.toLowerCase().includes(q) ||
      tp.explanationAr.includes(q)
    )
  }, [subjectTopics, search])

  const externalForSubject = EXTERNAL_RESOURCES[selectedSubject] || []

  const currentGroup = GRADE_GROUPS.find(g => selectedGrade >= g.range[0] && selectedGrade <= g.range[1])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('curriculum.label')}</div>
        <h1 className="page-title mb-2">{t('curriculum.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('curriculum.subtitle')}</p>
      </div>

      {/* Grade Selector */}
      <div className="card p-6 mb-6 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          {t('curriculum.pickGrade')}
        </p>
        <div className="space-y-4">
          {GRADE_GROUPS.map(group => {
            const gc = COLOR_MAP[group.color] || COLOR_MAP.blue
            return (
              <div key={group.label}>
                <p className={`text-xs font-semibold mb-2 ${gc.text}`}>
                  {isAr ? group.labelAr : group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: group.range[1] - group.range[0] + 1 }, (_, i) => group.range[0] + i).map(g => (
                    <button
                      key={g}
                      onClick={() => { setSelectedGrade(g); setSearch('') }}
                      className={`w-11 h-11 rounded-xl text-sm font-bold transition-all border-2 ${
                        selectedGrade === g
                          ? `${gc.btn.split(' ')[0]} text-white border-transparent shadow-md scale-110`
                          : `bg-white ${gc.text} ${gc.badge.split(' ')[2]} hover:${gc.bg}`
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      {!selectedGrade ? (
        <div className="card p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-slate-500 text-sm">{t('curriculum.selectGradePrompt')}</p>
          <Link to="/rafiq" className="inline-block mt-4 text-sm font-semibold text-[#1a3a6e] hover:underline">
            {t('curriculum.askRafiq')}
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar — subjects */}
          <aside className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
              {t('curriculum.subjectsLabel')}
            </p>
            {SUBJECTS.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedSubject(s.id); setSearch('') }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  selectedSubject === s.id
                    ? `${c.bg} ${c.text} font-bold`
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span>{isAr ? s.nameAr : s.name}</span>
              </button>
            ))}

            {/* Grade info badge */}
            {currentGroup && (
              <div className={`mt-4 rounded-xl p-3 border text-xs ${c.badge}`}>
                <p className="font-bold mb-1">
                  {isAr ? `الصف ${selectedGrade}` : `Grade ${selectedGrade}`}
                </p>
                <p>{isAr ? currentGroup.labelAr : currentGroup.label}</p>
              </div>
            )}
          </aside>

          {/* Topics */}
          <div>
            {/* Search + heading */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="flex-1">
                <h2 className="font-bold text-[#0f172a] text-lg mb-1">
                  {t('curriculum.topicsIn')} {isAr
                    ? SUBJECTS.find(s => s.id === selectedSubject)?.nameAr
                    : SUBJECTS.find(s => s.id === selectedSubject)?.name}
                  {' '}—{' '}
                  {isAr ? `الصف ${selectedGrade}` : `Grade ${selectedGrade}`}
                </h2>
                <p className="text-xs text-slate-400">
                  {filteredTopics.length} {isAr ? 'موضوع' : filteredTopics.length === 1 ? 'topic' : 'topics'}
                </p>
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('curriculum.searchPlaceholder')}
                className="input text-sm w-full sm:w-56"
              />
            </div>

            {filteredTopics.length === 0 ? (
              <div className="card p-8 text-center shadow-sm">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-500 text-sm mb-2">{t('curriculum.noTopics')}</p>

                {/* Always show external resources when no topics */}
                <div className="mt-6 text-left">
                  <p className="text-sm font-bold text-slate-700 mb-3">{t('curriculum.externalTitle')}</p>
                  <p className="text-xs text-slate-500 mb-4">{t('curriculum.externalDesc')}</p>
                  <div className="space-y-3">
                    {externalForSubject.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                        className={`flex items-start gap-3 p-3 rounded-xl border ${c.badge} hover:opacity-80 transition-opacity`}>
                        <span className="text-xl">🔗</span>
                        <div>
                          <p className="font-bold text-sm">{isAr ? r.nameAr : r.name}</p>
                          <p className="text-xs opacity-80">{isAr ? r.descAr : r.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTopics.map(tp => (
                  <TopicCard
                    key={tp.id}
                    topic={tp}
                    isAr={isAr}
                    externalResources={externalForSubject}
                    gradeColor={gradeColor}
                  />
                ))}

                {/* External resources footer */}
                <div className={`card p-5 border rounded-2xl shadow-sm mt-2 ${c.badge}`}>
                  <p className="text-sm font-bold mb-1">{t('curriculum.externalTitle')}</p>
                  <p className="text-xs mb-3 opacity-80">{t('curriculum.externalDesc')}</p>
                  <div className="flex flex-wrap gap-3">
                    {externalForSubject.map((r, i) => (
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-semibold underline hover:opacity-70 transition-opacity">
                        {isAr ? r.nameAr : r.name} ↗
                      </a>
                    ))}
                  </div>
                </div>

                {/* Ask Rafiq CTA */}
                <div className="flex items-center justify-between mt-2">
                  <Link to="/rafiq"
                    className={`text-sm font-semibold ${c.text} hover:underline`}>
                    {t('curriculum.askRafiq')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
