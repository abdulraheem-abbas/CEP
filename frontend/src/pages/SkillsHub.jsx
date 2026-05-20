import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { SKILL_PATHWAYS, PATHWAY_CATEGORIES } from '../data/skillsData'
import { apiUrl } from '../lib/api'
import { useEffect } from 'react'

// ── Static fallback courses ───────────────────────────────────────────────────
const FALLBACK_COURSES = [
  { id: 1, title: 'Effective Communication Skills', category: 'communication', provider: 'Coursera', level: 'beginner', language: 'English', link: 'https://www.coursera.org/learn/wharton-communication-skills', duration: '4 weeks' },
  { id: 2, title: 'Leadership Fundamentals', category: 'leadership', provider: 'LinkedIn Learning', level: 'intermediate', language: 'English', link: 'https://www.linkedin.com/learning/leadership-foundations', duration: '5 weeks' },
  { id: 3, title: 'Teamwork and Collaborative Skills', category: 'teamwork', provider: 'FutureLearn', level: 'beginner', language: 'English', link: 'https://www.futurelearn.com/courses/collaboration', duration: '3 weeks' },
  { id: 4, title: 'Building Self-Confidence', category: 'confidence', provider: 'Udemy', level: 'beginner', language: 'Arabic', link: 'https://www.udemy.com/course/self-confidence-arabic', duration: '3 weeks' },
  { id: 5, title: 'Critical Thinking and Problem Solving', category: 'critical thinking', provider: 'Coursera', level: 'intermediate', language: 'English', link: 'https://www.coursera.org/learn/critical-thinking-skills', duration: '6 weeks' },
  { id: 6, title: 'Public Speaking and Presentation Skills', category: 'public speaking', provider: 'edX', level: 'beginner', language: 'English', link: 'https://www.edx.org/course/public-speaking', duration: '4 weeks' },
  { id: 7, title: 'مهارات حل المشكلات للشباب', category: 'problem solving', provider: 'إدراك', level: 'beginner', language: 'Arabic', link: 'https://www.edraak.org/courses', duration: '4 weeks' },
  { id: 8, title: 'Career Readiness and Professional Skills', category: 'career readiness', provider: 'LinkedIn Learning', level: 'intermediate', language: 'English', link: 'https://www.linkedin.com/learning/career-essentials', duration: '5 weeks' },
  { id: 9, title: 'Creative Thinking and Innovation', category: 'creativity', provider: 'edX', level: 'beginner', language: 'English', link: 'https://www.edx.org/course/creative-thinking-techniques', duration: '4 weeks' },
  { id: 10, title: 'Active Listening and Emotional Intelligence', category: 'communication', provider: 'Coursera', level: 'beginner', language: 'English', link: 'https://www.coursera.org/learn/emotional-intelligence-eq', duration: '3 weeks' },
]

const LEVEL_COLORS = {
  beginner: 'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-blue-50 text-blue-700',
  advanced: 'bg-violet-50 text-violet-700',
}

// ── Pathway Card ─────────────────────────────────────────────────────────────
function PathwayCard({ pathway, courses, isAr, onSelect, isSelected }) {
  const matchedCourses = courses.filter(c => c.category === pathway.category)

  return (
    <div
      className={`card rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected
          ? `shadow-lg ring-2 ring-offset-2 ring-${pathway.color}-400 scale-[1.01]`
          : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
      onClick={() => onSelect(pathway.id)}
    >
      {/* Colour accent bar */}
      <div className={`h-1.5 ${pathway.accentClass || `bg-${pathway.color}-500`}`} style={{
        background: pathway.id === 'communication' ? '#0ea5e9' :
                    pathway.id === 'leadership' ? '#7c3aed' :
                    pathway.id === 'problem-solving' ? '#4f46e5' :
                    pathway.id === 'time-management' ? '#d97706' :
                    pathway.id === 'self-confidence' ? '#ea580c' :
                    pathway.id === 'teamwork' ? '#059669' :
                    pathway.id === 'critical-thinking' ? '#dc2626' :
                    pathway.id === 'languages' ? '#0d9488' :
                    pathway.id === 'coding' ? '#2563eb' :
                    pathway.id === 'career' ? '#475569' :
                    pathway.id === 'digital' ? '#0891b2' : '#16a34a'
      }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pathway.icon}</span>
            <div>
              <h3 className="font-bold text-[#0f172a] text-sm leading-tight">
                {isAr ? pathway.nameAr : pathway.name}
              </h3>
              <span className={`text-[11px] font-medium ${pathway.textClass}`}>
                {isAr ? pathway.weeksAr : pathway.weeks}
              </span>
            </div>
          </div>
          {matchedCourses.length > 0 && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${pathway.badgeClass}`}>
              {matchedCourses.length} {isAr ? 'دورات' : 'courses'}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {isAr ? pathway.descriptionAr : pathway.description}
        </p>

        {/* Sub-skills preview */}
        <div className="flex flex-wrap gap-1.5">
          {(isAr ? pathway.skillsAr : pathway.skills).slice(0, 3).map((s, i) => (
            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full border ${pathway.badgeClass}`}>
              {s}
            </span>
          ))}
          {pathway.skills.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-50 text-slate-500 border-slate-200">
              +{pathway.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Course Mini-Card ──────────────────────────────────────────────────────────
function CourseCard({ course, isAr }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-bold text-[#0f172a] text-sm leading-snug flex-1">{course.title}</h4>
        <span className="badge bg-emerald-50 text-emerald-700 text-[10px] shrink-0">
          {isAr ? 'مجاني' : 'Free'}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs text-slate-400">{course.provider}</span>
        <span className="text-slate-200">·</span>
        <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-medium ${LEVEL_COLORS[course.level] || 'bg-slate-50 text-slate-600'}`}>
          {isAr
            ? course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'
            : course.level}
        </span>
        {course.duration && (
          <>
            <span className="text-slate-200">·</span>
            <span className="text-xs text-slate-400">{course.duration}</span>
          </>
        )}
      </div>
      <a href={course.link} target="_blank" rel="noopener noreferrer"
        className="btn-primary text-xs px-4 py-2 rounded-lg inline-block">
        {isAr ? 'فتح الدورة →' : 'Open Course →'}
      </a>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SkillsHub() {
  const { t, lang } = useLanguage()
  const isAr = lang === 'ar'

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPathway, setSelectedPathway] = useState(null)
  const [courses, setCourses] = useState(FALLBACK_COURSES)

  useEffect(() => {
    fetch(apiUrl('/api/courses')).then(r => r.json()).then(setCourses).catch(() => {})
  }, [])

  const filteredPathways = useMemo(() => {
    if (selectedCategory === 'all') return SKILL_PATHWAYS
    const cat = PATHWAY_CATEGORIES.find(c => c.id === selectedCategory)
    if (!cat || !cat.ids) return SKILL_PATHWAYS
    return SKILL_PATHWAYS.filter(p => cat.ids.includes(p.id))
  }, [selectedCategory])

  const activePathway = selectedPathway ? SKILL_PATHWAYS.find(p => p.id === selectedPathway) : null
  const pathwayCourses = activePathway ? courses.filter(c => c.category === activePathway.category) : []

  const handleSelect = (id) => {
    setSelectedPathway(prev => prev === id ? null : id)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('skills.label')}</div>
        <h1 className="page-title mb-2">{t('skills.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('skills.subtitle')}</p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: t('skills.allPathways'), labelAr: 'كل المهارات' },
          { id: 'soft', label: 'Soft Skills', labelAr: 'المهارات الشخصية' },
          { id: 'thinking', label: 'Thinking', labelAr: 'مهارات التفكير' },
          { id: 'career', label: 'Career & Digital', labelAr: 'المهنة والرقمية' },
          { id: 'language', label: 'Language & Life', labelAr: 'اللغة والحياة' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategory(cat.id); setSelectedPathway(null) }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              selectedCategory === cat.id
                ? 'bg-[#1a3a6e] text-white border-[#1a3a6e]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#1a3a6e] hover:text-[#1a3a6e]'
            }`}
          >
            {isAr ? cat.labelAr : cat.label}
          </button>
        ))}
      </div>

      {/* Grid of pathway cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {filteredPathways.map(pathway => (
          <PathwayCard
            key={pathway.id}
            pathway={pathway}
            courses={courses}
            isAr={isAr}
            onSelect={handleSelect}
            isSelected={selectedPathway === pathway.id}
          />
        ))}
      </div>

      {/* Expanded pathway detail panel */}
      {activePathway && (
        <div className={`card rounded-2xl overflow-hidden shadow-md mb-8 border-2 ${activePathway.borderClass}`}>
          <div className={`px-6 py-5 ${activePathway.bgClass}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{activePathway.icon}</span>
                <div>
                  <h2 className={`font-black text-xl ${activePathway.textClass}`}>
                    {isAr ? activePathway.nameAr : activePathway.name}
                  </h2>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {isAr ? activePathway.descriptionAr : activePathway.description}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedPathway(null)}
                className="text-slate-400 hover:text-slate-700 text-xl shrink-0">✕</button>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Why this skill */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                {isAr ? 'لماذا هذه المهارة؟' : 'Why This Skill?'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {isAr ? activePathway.whyAr : activePathway.why}
              </p>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-5 mb-3">
                {t('skills.subSkills')}
              </p>
              <div className="flex flex-wrap gap-2">
                {(isAr ? activePathway.skillsAr : activePathway.skills).map((s, i) => (
                  <span key={i} className={`text-xs px-3 py-1 rounded-full border font-medium ${activePathway.badgeClass}`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                {isAr ? 'دورات موصى بها' : 'Recommended Courses'}
              </p>
              {pathwayCourses.length > 0 ? (
                <div className="space-y-3">
                  {pathwayCourses.slice(0, 3).map(c => (
                    <CourseCard key={c.id} course={c} isAr={isAr} />
                  ))}
                  {pathwayCourses.length > 3 && (
                    <Link to="/courses" className={`block text-center text-sm font-semibold ${activePathway.textClass} hover:underline`}>
                      {t('skills.browseAll')}
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-400 mb-3">{t('skills.noCoursesNote')}</p>
                  <Link to="/courses" className="btn-primary text-sm px-5 py-2.5 rounded-xl inline-block">
                    {t('skills.browseAll')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Why these skills section */}
      <div className="card p-8 text-center shadow-sm bg-gradient-to-br from-[#f0f6ff] to-white border-blue-100">
        <div className="text-3xl mb-3">💡</div>
        <h3 className="font-black text-[#1a3a6e] text-lg mb-2">{t('skills.whySkills')}</h3>
        <p className="text-slate-500 text-sm max-w-lg mx-auto mb-6">{t('skills.whyDesc')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/first-curriculum" className="btn-primary px-6 py-3 rounded-xl text-sm">
            {isAr ? 'ابدأ رحلتك من هنا' : 'Start Your Journey →'}
          </Link>
          <Link to="/courses" className="btn-secondary px-6 py-3 rounded-xl text-sm">
            {t('skills.browseAll')}
          </Link>
        </div>
      </div>
    </div>
  )
}
