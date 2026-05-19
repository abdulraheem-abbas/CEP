import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const WEEK_SUMMARY = [
  { week: 1, title: 'Confidence & Self-Awareness' },
  { week: 2, title: 'Communication & Active Listening' },
  { week: 3, title: 'Public Speaking & Storytelling' },
  { week: 4, title: 'Teamwork & Cooperation' },
  { week: 5, title: 'Critical Thinking & Problem Solving' },
  { week: 6, title: 'Leadership & Initiative' },
  { week: 7, title: 'Community Problem Identification' },
  { week: 8, title: 'Student-Led Community Solution Project' },
]

const PLATFORM_FEATURES = [
  { icon: '📚', key: 'courses' }, { icon: '🌟', key: 'opportunities' },
  { icon: '🔍', key: 'verify' }, { icon: '👩‍🏫', key: 'curriculum' },
  { icon: '💬', key: 'chatbot' }, { icon: '🛠️', key: 'toolkit' },
]

const PLATFORM_DESCS = {
  courses: 'A curated library of free soft skills courses from Coursera, edX, FutureLearn, LinkedIn Learning, and Arabic platforms — filtered by skill, level, and language.',
  opportunities: 'Scholarships, fellowships, competitions, workshops, and youth programs — each reviewed for credibility before listing, so students never navigate scams alone.',
  verify: 'An AI-powered safety tool (Gemini) that analyzes any opportunity for red flags — payment requests, missing organizer info, suspicious URLs — and returns a credibility score.',
  curriculum: 'A complete classroom program — from confidence in Week 1 to a student-led community solution in Week 8 — with session plans, activities, and materials.',
  chatbot: 'A Gemini AI chatbot that asks about your goals, skills, location, and age — then recommends specific courses, opportunities, or teacher resources.',
  toolkit: 'A content management interface for adding, editing, and verifying courses and opportunities — structured for future role-based access.',
}

const VALUES = [
  { icon: '⚖️', title: 'Equity', desc: 'Every student deserves access to life skills, regardless of their school, neighborhood, or family income.' },
  { icon: '🤝', title: 'Community', desc: 'Skills are only meaningful when they connect students to each other and to the challenges around them.' },
  { icon: '🔍', title: 'Safety', desc: 'We verify every opportunity before listing it. Students should never have to navigate scams alone.' },
  { icon: '🌱', title: 'Growth', desc: 'Forsa is a prototype, not a finished product. It grows with every teacher, student, and partner who uses it.' },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(160deg, #f0f6ff 0%, #ffffff 50%, #f0fdf4 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            {t('about.badge')}
          </span>
          <h1 className="section-title text-4xl md:text-5xl mb-5">{t('about.title')}</h1>
          <p className="text-xl text-slate-500 italic mb-5">{t('home.tagline')}</p>
          <p className="text-slate-600 leading-relaxed">{t('about.intro')}</p>
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-3">{t('about.gap.label')}</div>
            <h2 className="section-title mb-5">{t('about.gap.title')}</h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>Millions of students in Egypt and Yemen attend school every day. But for most of them — especially in under-resourced public schools — school provides academic instruction, not life skills.</p>
              <p>Skills like communication, confidence, leadership, teamwork, creativity, and critical thinking are not luxuries. They are the difference between a student who gets opportunities and a student who watches others get them.</p>
              <p>These skills are widely taught in private schools and NGO-funded programs. In most public schools, they are absent. Forsa was built to change that.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { v: '~12M', d: 'Students in Egypt with no access to soft skills programs', c: 'text-red-500' },
              { v: '68%', d: 'Yemeni youth who report feeling unprepared for the future', c: 'text-amber-500' },
              { v: '93%', d: 'Of employers rank communication above degree subject', c: 'text-blue-600' },
              { v: '0', d: 'The cost to a student to use Forsa', c: 'text-emerald-600' },
            ].map(item => (
              <div key={item.v} className="card p-5 flex items-center gap-4">
                <div className={`text-3xl font-extrabold ${item.c} shrink-0 w-20 text-end`}>{item.v}</div>
                <p className="text-slate-600 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-2">{t('about.platform.label')}</div>
            <h2 className="section-title">{t('about.platform.title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PLATFORM_FEATURES.map(f => (
              <div key={f.key} className="card p-5">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#1a3a6e] mb-2 text-sm">{t(`home.features.${f.key}.title`)}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{PLATFORM_DESCS[f.key]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-week curriculum */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-2">{t('about.curriculum.label')}</div>
            <h2 className="section-title mb-3">{t('about.curriculum.title')}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">{t('about.curriculum.desc')}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {WEEK_SUMMARY.map(w => (
              <div key={w.week} className="card p-4 flex items-center gap-4 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#1a3a6e] text-white font-extrabold flex items-center justify-center shrink-0">
                  {w.week}
                </div>
                <div>
                  <p className="text-xs text-slate-400">Week {w.week}</p>
                  <p className="font-semibold text-slate-800 text-sm">{w.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/teachers" className="btn-primary">{t('teachers.curriculumTitle')} →</Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mb-2">{t('about.values.label')}</div>
            <h2 className="section-title">{t('about.values.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-[#1a3a6e] mb-2">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mb-2">{t('about.context.label')}</div>
            <h2 className="section-title">{t('about.context.title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { flag: '🇪🇬', country: 'Egypt', desc: "Egypt has one of the largest youth populations in the Middle East. Public schools serve millions of students who have little access to extracurricular life skills programming. Forsa's curriculum is designed to work in Egyptian public school classrooms of 40–50 students with minimal materials." },
              { flag: '🇾🇪', country: 'Yemen', desc: "Yemen's education system has been severely disrupted by conflict. Millions of students are enrolled in schools that face resource shortages and teacher capacity gaps. Forsa's low-resource, teacher-ready curriculum was developed with this context in mind." },
            ].map(ctx => (
              <div key={ctx.country} className="card p-6">
                <div className="text-4xl mb-3">{ctx.flag}</div>
                <h3 className="font-bold text-[#1a3a6e] text-base mb-3">{ctx.country}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{ctx.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype notice */}
      <section className="py-12 px-4 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-3xl mb-3">🚧</div>
          <h3 className="font-bold text-amber-800 text-xl mb-2">{t('about.prototype.title')}</h3>
          <p className="text-amber-700 text-sm leading-relaxed">{t('about.prototype.desc')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1a3a6e, #1e40af)' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-3">{t('about.cta.title')}</h2>
          <p className="text-blue-200 mb-8 text-sm">{t('about.cta.subtitle')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-amber shadow-lg">{t('home.ctaExplore')}</Link>
            <Link to="/teachers" className="btn-secondary border-white text-white hover:bg-white/10 hover:text-white">{t('nav.teachers')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
