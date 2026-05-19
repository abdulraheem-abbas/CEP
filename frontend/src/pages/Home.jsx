import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const SKILLS = ['Communication', 'Leadership', 'Teamwork', 'Confidence', 'Critical Thinking', 'Problem Solving', 'Creativity', 'Public Speaking', 'Career Readiness']

const AUDIENCE_KEYS = ['students', 'teachers', 'providers']
const AUDIENCE_ICONS = { students: '🎒', teachers: '👩‍🏫', providers: '🏢' }

const FEATURE_KEYS = ['courses', 'opportunities', 'verify', 'curriculum', 'chatbot', 'toolkit']
const FEATURE_ICONS = { courses: '📚', opportunities: '🌟', verify: '🔍', curriculum: '📋', chatbot: '💬', toolkit: '🧰' }
const FEATURE_LINKS = { courses: '/courses', opportunities: '/opportunities', verify: '/verify', curriculum: '/teachers', chatbot: '/chatbot', toolkit: '/teachers' }

export default function Home() {
  const { t } = useLanguage()
  const whyStats = t('home.whyMatters.stats')

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #f0f6ff 0%, #ffffff 50%, #f0fdf4 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #dbeafe, transparent)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 start-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #d1fae5, transparent)', transform: 'translate(-30%,30%)' }} />

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <div>
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                {t('home.badge')}
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a3a6e] leading-tight mb-5">
                {t('home.heroTitle1')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-amber-500">{t('home.heroHighlight')}</span>
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-100 -z-0 rounded" />
                </span>
                {t('home.heroTitle2')}
              </h1>

              <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md">
                {t('home.subtitle')}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/courses" className="btn-amber shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  {t('home.ctaExplore')}
                </Link>
                <Link to="/opportunities" className="btn-secondary">
                  {t('home.ctaOpportunities')}
                </Link>
                <Link to="/teachers" className="btn-ghost border border-slate-200">
                  {t('home.ctaTeachers')}
                </Link>
              </div>

              <p className="text-slate-400 text-sm italic mt-6 ps-1">{t('home.tagline')}</p>
            </div>

            {/* Right: AI preview card */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                {/* Main preview card */}
                <div className="card p-5 shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-slate-500">{t('home.previewTitle')}</span>
                    <span className="ms-auto text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">Gemini AI</span>
                  </div>

                  <p className="text-xs text-slate-400 mb-1">{t('home.previewDesc')}</p>
                  <p className="font-bold text-[#1a3a6e] text-sm mb-4">UNICEF Youth Leadership Program</p>

                  {/* Score */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#059669" strokeWidth="12"
                          strokeDasharray="214 239" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-extrabold text-emerald-700 text-lg">87</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-700 text-sm">{t('home.previewBadge')}</div>
                      <div className="text-xs text-slate-400">Credibility Score</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['✓ Official URL', '✓ Named organizer', '✓ No fees'].map(s => (
                      <span key={s} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -end-4 bg-amber-400 text-[#1a3a6e] text-xs font-black px-3 py-1.5 rounded-full shadow-md rotate-3">
                  Free · مجاني
                </div>

                {/* Mini chatbot card */}
                <div className="card p-3 mt-3 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#1a3a6e] flex items-center justify-center text-white text-xs font-bold">F</div>
                    <span className="text-xs font-semibold text-slate-700">Forsa Guide</span>
                    <span className="ms-auto w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  </div>
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2">
                    "I found 3 courses in leadership for you — all free and beginner-friendly."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-y border-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10+', key: 'courses', icon: '📚' },
            { value: '12+', key: 'opportunities', icon: '🌟' },
            { value: '8', key: 'weeks', icon: '📋' },
            { value: '2', key: 'countries', icon: '🌍' },
          ].map(s => (
            <div key={s.key}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-extrabold text-[#1a3a6e]">{s.value}</div>
              <div className="text-slate-500 text-xs font-medium">{t(`home.stats.${s.key}`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What is Forsa ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-3">{t('home.whatIsForsa.label')}</div>
            <h2 className="section-title mb-5">{t('home.whatIsForsa.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">{t('home.whatIsForsa.p1')}</p>
            <p className="text-slate-600 mb-6 leading-relaxed">{t('home.whatIsForsa.p2')}</p>
            <Link to="/about" className="btn-primary">{t('home.whatIsForsa.learnMore')}</Link>
          </div>
          <div className="card p-7 shadow-md">
            <p className="font-semibold text-[#1a3a6e] mb-4 text-sm">{t('home.whatIsForsa.skillsTitle')}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {SKILLS.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-[#1a3a6e]">{s}</span>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border-s-4 border-amber-400">
              <p className="text-xs text-amber-800 leading-relaxed">{t('home.whatIsForsa.researchNote')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we serve ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-2">{t('home.whoWeServe.label')}</div>
            <h2 className="section-title">{t('home.whoWeServe.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {AUDIENCE_KEYS.map(key => (
              <div key={key} className="card-hover p-7 text-center group">
                <div className="text-5xl mb-4">{AUDIENCE_ICONS[key]}</div>
                <h3 className="font-bold text-[#1a3a6e] text-base mb-2">{t(`home.whoWeServe.${key}.title`)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t(`home.whoWeServe.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-2">{t('home.features.label')}</div>
            <h2 className="section-title">{t('home.features.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURE_KEYS.map(key => (
              <Link
                key={key}
                to={FEATURE_LINKS[key]}
                className="card-hover p-6 group block"
              >
                <div className="text-3xl mb-3">{FEATURE_ICONS[key]}</div>
                <h3 className="font-bold text-[#1a3a6e] text-sm mb-2">{t(`home.features.${key}.title`)}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{t(`home.features.${key}.desc`)}</p>
                <span className="text-xs font-semibold text-amber-500 group-hover:text-amber-600 transition-colors">
                  {t(`home.features.${key}.cta`)} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-2">{t('home.whyMatters.label')}</div>
            <h2 className="section-title">{t('home.whyMatters.title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {Array.isArray(whyStats) && whyStats.map((item, i) => (
              <div key={i} className="card p-6 flex gap-5 items-start">
                <div className="text-3xl font-extrabold text-amber-500 shrink-0 w-20 text-end leading-none pt-1">{item.stat}</div>
                <div>
                  <p className="text-slate-700 text-sm mb-1.5">{item.desc}</p>
                  <p className="text-xs text-slate-400 italic">{item.src}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #1a3a6e 0%, #1e40af 100%)' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t('home.cta.title')}</h2>
          <p className="text-blue-200 mb-8 text-base">{t('home.cta.subtitle')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-amber shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              {t('home.ctaGetStarted')}
            </Link>
            <Link to="/chatbot" className="btn-secondary border-white text-white hover:bg-white/10 hover:text-white">
              {t('home.ctaChatbot')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
