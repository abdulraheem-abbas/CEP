import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { apiUrl } from '../lib/api'

const WEEK_COLORS = [
  'border-sky-200 bg-sky-50', 'border-emerald-200 bg-emerald-50',
  'border-amber-200 bg-amber-50', 'border-violet-200 bg-violet-50',
  'border-red-200 bg-red-50', 'border-indigo-200 bg-indigo-50',
  'border-pink-200 bg-pink-50', 'border-teal-200 bg-teal-50',
]


export default function TeacherResources() {
  const { t, lang } = useLanguage()
  const [curriculum, setCurriculum] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openWeek, setOpenWeek] = useState(null)
  const [openToolkit, setOpenToolkit] = useState(null)

  useEffect(() => {
    fetch(apiUrl('/api/curriculum'))
      .then(r => r.json())
      .then(data => { setCurriculum(data); setLoading(false) })
      .catch(() => { setError(t('teachers.backendError')); setLoading(false) })
  }, [])

  // Returns Arabic field if lang=ar and field exists, otherwise English
  const loc = (item, field) => {
    const arField = `${field}_ar`
    if (lang === 'ar' && item[arField] != null) return item[arField]
    return item[field]
  }

  // For nested activity fields
  const locAct = (act, field) => {
    const arField = `${field}_ar`
    if (lang === 'ar' && act[arField] != null) return act[arField]
    return act[field]
  }

  const toolkitItems = t('teachers.toolkitItems')
  const toolkitContent = t('teachers.toolkitContent')

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('teachers.label')}</div>
        <h1 className="page-title mb-2">{t('teachers.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('teachers.subtitle')}</p>
      </div>

      {/* Program banner */}
      <div className="rounded-2xl p-6 mb-10 text-white flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'linear-gradient(135deg, #1a3a6e, #0891b2)' }}>
        <div className="text-4xl">📋</div>
        <div className="flex-1">
          <h2 className="font-bold text-lg mb-1">{t('teachers.programTitle')}</h2>
          <p className="text-blue-200 text-sm leading-relaxed">{t('teachers.programDesc')}</p>
        </div>
        <div className="flex gap-5 text-center shrink-0">
          {[
            { value: '8', key: 'weeks' },
            { value: '60–90', key: 'minPerSession' },
            { value: '0', key: 'cost' },
          ].map(s => (
            <div key={s.key}>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-blue-300 text-xs">{t(`teachers.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum */}
      <h2 className="font-bold text-[#1a3a6e] text-lg mb-5">{t('teachers.curriculumTitle')}</h2>

      {loading && <div className="text-center py-10 text-slate-500">{t('common.loading')}</div>}
      {error && <div className="card p-5 mb-6 bg-red-50 border-red-100 text-red-700 text-sm">⚠️ {error}</div>}

      {!loading && !error && (
        <div className="space-y-3 mb-12">
          {curriculum.map((week, idx) => (
            <div key={week.id || week.week} className={`rounded-2xl border-2 ${WEEK_COLORS[idx % WEEK_COLORS.length]} overflow-hidden`}>
              {/* Week header */}
              <button
                className="w-full p-5 flex items-center gap-4 text-start hover:brightness-95 transition-all"
                onClick={() => setOpenWeek(openWeek === idx ? null : idx)}
              >
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center font-extrabold text-[#1a3a6e] text-lg shrink-0">
                  {week.week}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('teachers.week')} {week.week}</p>
                  <h3 className="font-bold text-[#1a3a6e] text-sm">{loc(week, 'title')}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{loc(week, 'objective')}</p>
                </div>
                <span className="text-slate-400 text-sm">{openWeek === idx ? '▲' : '▼'}</span>
              </button>

              {/* Expanded */}
              {openWeek === idx && (
                <div className="px-5 pb-6 bg-white border-t border-slate-100">
                  <div className="my-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-700 mb-1">🎯 {t('teachers.objective')}</p>
                    <p className="text-xs text-blue-700 leading-relaxed">{loc(week, 'objective')}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">{t('teachers.sessionOutline')}</p>
                      <ol className="space-y-2">
                        {(loc(week, 'sessionOutline') || []).map((step, i) => (
                          <li key={i} className="flex gap-3 text-xs text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-[#1a3a6e] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">{t('teachers.activities')}</p>
                      <div className="space-y-3">
                        {(week.activities || []).map((act, i) => (
                          <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-bold text-amber-800 text-xs">{locAct(act, 'name')}</p>
                              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{act.duration}</span>
                            </div>
                            <p className="text-xs text-amber-700">{locAct(act, 'description')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mt-4">
                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">{t('teachers.materials')}</p>
                      <ul className="space-y-1">
                        {(loc(week, 'materials') || []).map((m, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                            <span className="text-emerald-500">✓</span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">{t('teachers.reflection')}</p>
                      <ul className="space-y-1.5">
                        {(loc(week, 'reflectionQuestions') || []).map((q, i) => (
                          <li key={i} className="text-xs text-slate-600 italic ps-3 border-s-2 border-amber-300">{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button className="mt-4 btn-primary text-xs">
                    ⬇ {t('teachers.downloadWeek')} {week.week} {t('teachers.materialsPDF')}
                    <span className="ms-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{t('teachers.comingSoon')}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toolkit */}
      <h2 className="font-bold text-[#1a3a6e] text-lg mb-2">{t('teachers.toolkitTitle')}</h2>
      <p className="text-slate-500 text-sm mb-5">{t('teachers.toolkitSubtitle')}</p>
      <div className="space-y-3 mb-10">
        {Array.isArray(toolkitItems) && toolkitItems.map((item, idx) => (
          <div key={idx} className="card overflow-hidden">
            <button
              className="w-full p-5 flex items-center gap-4 text-start hover:bg-slate-50 transition-colors"
              onClick={() => setOpenToolkit(openToolkit === idx ? null : idx)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1 font-semibold text-[#1a3a6e] text-sm">{item.title}</span>
              <span className="text-slate-400">{openToolkit === idx ? '▲' : '▼'}</span>
            </button>
            {openToolkit === idx && (
              <div className="px-5 pb-5 border-t border-slate-100">
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  {Array.isArray(toolkitContent) ? toolkitContent[idx] : ''}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="card p-6 bg-amber-50 border-amber-100 text-center">
        <div className="text-3xl mb-3">📬</div>
        <h3 className="font-bold text-[#1a3a6e] mb-2">{t('teachers.notifyTitle')}</h3>
        <p className="text-slate-600 text-sm mb-4">{t('teachers.notifyDesc')}</p>
        <button className="btn-primary">{t('teachers.notifyBtn')}</button>
      </div>
    </div>
  )
}
