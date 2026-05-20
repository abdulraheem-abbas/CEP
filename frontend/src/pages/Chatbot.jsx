import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { apiUrl } from '../lib/api'

// ── Rafiq Owl SVG mascot ──────────────────────────────────────────────────────
function OwlMascot({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
      {/* Ear tufts */}
      <ellipse cx="24" cy="13" rx="5" ry="9" fill="#d97706" transform="rotate(-20 24 13)" />
      <ellipse cx="56" cy="13" rx="5" ry="9" fill="#d97706" transform="rotate(20 56 13)" />
      {/* Body */}
      <ellipse cx="40" cy="54" rx="22" ry="23" fill="#f59e0b" />
      {/* Head */}
      <circle cx="40" cy="28" r="20" fill="#f59e0b" />
      {/* Wing patches */}
      <ellipse cx="20" cy="54" rx="9" ry="15" fill="#d97706" transform="rotate(-15 20 54)" />
      <ellipse cx="60" cy="54" rx="9" ry="15" fill="#d97706" transform="rotate(15 60 54)" />
      {/* Belly */}
      <ellipse cx="40" cy="57" rx="13" ry="16" fill="#fef3c7" />
      {/* Eye whites */}
      <circle cx="30" cy="27" r="10" fill="white" />
      <circle cx="50" cy="27" r="10" fill="white" />
      {/* Glasses frames */}
      <circle cx="30" cy="27" r="10" fill="none" stroke="#1a3a6e" strokeWidth="2.5" />
      <circle cx="50" cy="27" r="10" fill="none" stroke="#1a3a6e" strokeWidth="2.5" />
      {/* Glasses bridge */}
      <path d="M40 27 H40" stroke="#1a3a6e" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="27" x2="40" y2="27" stroke="#1a3a6e" strokeWidth="2" />
      <path d="M20 25 Q16 23 16 20" stroke="#1a3a6e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 25 Q64 23 64 20" stroke="#1a3a6e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Pupils */}
      <circle cx="30" cy="27" r="5" fill="#1a3a6e" />
      <circle cx="50" cy="27" r="5" fill="#1a3a6e" />
      {/* Shine in eyes */}
      <circle cx="32" cy="25" r="2" fill="white" />
      <circle cx="52" cy="25" r="2" fill="white" />
      {/* Beak */}
      <path d="M37 33 L43 33 L40 39 Z" fill="#d97706" />
      {/* Feet */}
      <path d="M33 74 Q31 77 28 76 M33 74 Q33 77 33 77 M33 74 Q35 77 38 76" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M47 74 Q45 77 42 76 M47 74 Q47 77 47 77 M47 74 Q49 77 52 76" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// ── Static data cache ─────────────────────────────────────────────────────────
const FALLBACK_COURSES = [
  { id: 1, title: 'Effective Communication Skills', category: 'communication', provider: 'Coursera', level: 'beginner', language: 'English', link: 'https://www.coursera.org/learn/wharton-communication-skills' },
  { id: 2, title: 'Leadership Fundamentals', category: 'leadership', provider: 'LinkedIn Learning', level: 'intermediate', language: 'English', link: 'https://www.linkedin.com/learning/leadership-foundations' },
  { id: 3, title: 'Teamwork and Collaborative Skills', category: 'teamwork', provider: 'FutureLearn', level: 'beginner', language: 'English', link: 'https://www.futurelearn.com/courses/collaboration' },
  { id: 4, title: 'Building Self-Confidence', category: 'confidence', provider: 'Udemy', level: 'beginner', language: 'Arabic', link: 'https://www.udemy.com/course/self-confidence-arabic' },
  { id: 5, title: 'Critical Thinking and Problem Solving', category: 'critical thinking', provider: 'Coursera', level: 'intermediate', language: 'English', link: 'https://www.coursera.org/learn/critical-thinking-skills' },
  { id: 6, title: 'Public Speaking and Presentation Skills', category: 'public speaking', provider: 'edX', level: 'beginner', language: 'English', link: 'https://www.edx.org/course/public-speaking' },
  { id: 7, title: 'مهارات حل المشكلات للشباب', category: 'problem solving', provider: 'إدراك', level: 'beginner', language: 'Arabic', link: 'https://www.edraak.org/courses' },
  { id: 8, title: 'Career Readiness and Professional Skills', category: 'career readiness', provider: 'LinkedIn Learning', level: 'intermediate', language: 'English', link: 'https://www.linkedin.com/learning/career-essentials' },
  { id: 9, title: 'Creative Thinking and Innovation', category: 'creativity', provider: 'edX', level: 'beginner', language: 'English', link: 'https://www.edx.org/course/creative-thinking-techniques' },
  { id: 10, title: 'Active Listening and Emotional Intelligence', category: 'communication', provider: 'Coursera', level: 'beginner', language: 'English', link: 'https://www.coursera.org/learn/emotional-intelligence-eq' },
]

const FALLBACK_OPPS = [
  { id: 1, title: 'UNICEF Youth Leadership Program', type: 'youth program', country: 'Online', deadline: '2025-08-30', skillsDeveloped: ['leadership', 'communication'], applicationLink: 'https://www.unicef.org/youth', verificationStatus: 'verified', organization: 'UNICEF', eligibility: 'Ages 15-25, Egypt or Yemen' },
  { id: 2, title: 'INJAZ Egypt Student Company Program', type: 'competition', country: 'Egypt', deadline: '2025-10-01', skillsDeveloped: ['teamwork', 'leadership', 'creativity'], applicationLink: 'https://injaz-egypt.org', verificationStatus: 'verified', organization: 'INJAZ Egypt', eligibility: 'High school students aged 15-18' },
  { id: 3, title: 'British Council YouthConnect Training', type: 'training', country: 'Online', deadline: '2025-09-15', skillsDeveloped: ['communication', 'career readiness'], applicationLink: 'https://www.britishcouncil.org', verificationStatus: 'verified', organization: 'British Council', eligibility: 'Ages 16-25' },
  { id: 4, title: 'Chevening Scholarship', type: 'scholarship', country: 'United Kingdom', deadline: '2025-11-05', skillsDeveloped: ['leadership', 'critical thinking'], applicationLink: 'https://www.chevening.org', verificationStatus: 'verified', organization: 'UK Government', eligibility: 'Egyptian/Yemeni nationals, 2+ yrs work experience' },
  { id: 5, title: 'Mercy Corps Youth Program Yemen', type: 'youth program', country: 'Yemen', deadline: '2025-07-31', skillsDeveloped: ['career readiness', 'communication'], applicationLink: 'https://www.mercycorps.org', verificationStatus: 'verified', organization: 'Mercy Corps', eligibility: 'Yemeni youth ages 16-24' },
]

// ── Intent extraction ─────────────────────────────────────────────────────────
function extractIntent(msg) {
  const lower = msg.toLowerCase()
  const result = { type: null, lang: null, skill: null, country: null, oppType: null, level: null }

  const courseKW = ['course', 'دورة', 'دورات', 'learn', 'تعلم', 'class', 'study', 'skill', 'مهارة', 'مهارات', 'training course', 'lesson']
  const oppKW = ['opportunity', 'opportunities', 'scholarship', 'فرصة', 'فرص', 'منحة', 'منح', 'competition', 'مسابقة', 'fellowship', 'زمالة', 'program', 'برنامج', 'volunteer', 'تطوع', 'internship', 'youth program', 'conference', 'workshop', 'training', 'تدريب']
  const teacherKW = ['teacher', 'معلم', 'curriculum', 'منهج', 'classroom', 'فصل', 'lesson plan', 'خطة درس', 'teaching', 'تدريس']
  const curriculumKW = ['curriculum hub', 'grade', 'صف', 'الصف', 'subject', 'مادة', 'math', 'رياضيات', 'science', 'علوم', 'arabic language', 'عربي', 'english', 'إنجليزي', 'textbook', 'كتاب']
  const adviceKW = ['advice', 'نصيحة', 'help', 'مساعدة', 'guide', 'دليل', 'how', 'كيف', 'what should', 'ماذا أفعل', 'start', 'ابدأ', 'first', 'أول']

  if (curriculumKW.some(k => lower.includes(k))) result.type = 'curriculum'
  else if (courseKW.some(k => lower.includes(k))) result.type = 'course'
  else if (oppKW.some(k => lower.includes(k))) result.type = 'opportunity'
  else if (teacherKW.some(k => lower.includes(k))) result.type = 'teacher'
  else if (adviceKW.some(k => lower.includes(k))) result.type = 'advice'

  if (['arabic', 'عرب', 'عربي', 'عربية'].some(k => lower.includes(k))) result.lang = 'Arabic'
  else if (['english', 'إنجليز', 'انجليز'].some(k => lower.includes(k))) result.lang = 'English'

  const skillMap = {
    'communication': ['communication', 'تواصل'],
    'leadership': ['leadership', 'leader', 'قيادة', 'قائد'],
    'teamwork': ['teamwork', 'team', 'فريق', 'عمل جماعي'],
    'confidence': ['confidence', 'confident', 'ثقة', 'ثقة بالنفس'],
    'critical thinking': ['critical thinking', 'analytical', 'تفكير نقدي', 'تحليل'],
    'problem solving': ['problem solving', 'problem', 'حل مشكلات', 'مشكلات'],
    'creativity': ['creativity', 'creative', 'إبداع', 'إبداعي'],
    'public speaking': ['public speaking', 'speech', 'speaking', 'خطابة', 'تحدث'],
    'career readiness': ['career', 'job', 'work', 'مهني', 'وظيفة', 'عمل'],
  }
  for (const [skill, terms] of Object.entries(skillMap)) {
    if (terms.some(t => lower.includes(t))) { result.skill = skill; break }
  }

  if (['egypt', 'cairo', 'مصر', 'القاهرة'].some(k => lower.includes(k))) result.country = 'Egypt'
  else if (['yemen', 'sanaa', 'اليمن', 'يمن'].some(k => lower.includes(k))) result.country = 'Yemen'
  else if (['online', 'remote', 'إنترنت', 'أونلاين'].some(k => lower.includes(k))) result.country = 'Online'

  const typeMap = {
    'scholarship': ['scholarship', 'منحة', 'منح', 'funded'],
    'competition': ['competition', 'contest', 'مسابقة', 'challenge'],
    'fellowship': ['fellowship', 'زمالة'],
    'training': ['training', 'تدريب', 'workshop'],
    'volunteering': ['volunteer', 'volunteering', 'تطوع'],
    'conference': ['conference', 'summit', 'مؤتمر'],
    'youth program': ['youth program', 'youth', 'برنامج شبابي'],
  }
  for (const [type, terms] of Object.entries(typeMap)) {
    if (terms.some(t => lower.includes(t))) { result.oppType = type; break }
  }

  if (['beginner', 'مبتدئ'].some(k => lower.includes(k))) result.level = 'beginner'
  else if (['intermediate', 'متوسط'].some(k => lower.includes(k))) result.level = 'intermediate'
  else if (['advanced', 'متقدم'].some(k => lower.includes(k))) result.level = 'advanced'

  return result
}

function smartFilter(courses, opps, intent) {
  let matchedCourses = [], matchedOpps = []

  if (intent.type === 'course' || intent.type === 'advice' || !intent.type) {
    let r = [...courses]
    if (intent.lang) r = r.filter(c => c.language === intent.lang)
    if (intent.skill) r = r.filter(c => c.category === intent.skill)
    if (intent.level) r = r.filter(c => c.level === intent.level)
    if (r.length === 0) r = courses.filter(c => (!intent.skill || c.category === intent.skill))
    matchedCourses = r.slice(0, 3)
  }

  if (intent.type === 'opportunity' || intent.type === 'advice' || !intent.type) {
    let r = [...opps]
    if (intent.oppType) r = r.filter(o => o.type === intent.oppType)
    if (intent.skill) r = r.filter(o => (o.skillsDeveloped || []).includes(intent.skill))
    if (intent.country && intent.country !== 'all') {
      r = r.filter(o => o.country === intent.country || o.country === 'Online')
    }
    r = r.filter(o => o.verificationStatus === 'verified')
    if (r.length === 0) r = opps.filter(o => o.verificationStatus === 'verified')
    matchedOpps = r.slice(0, 3)
  }

  return { matchedCourses, matchedOpps }
}

function buildSmartReply(msg, intent, matchedCourses, matchedOpps, isAr) {
  const lower = msg.toLowerCase()

  if (intent.type === 'curriculum') {
    return {
      text: isAr
        ? 'يمكنني مساعدتك في العثور على محتوى المنهج الدراسي! توجّه إلى مركز المناهج واختر صفّك من الأول إلى الثاني عشر.'
        : 'I can help with curriculum! Head to the Curriculum Hub and select your grade (1–12) to find clear explanations for every subject.',
      link: { to: '/curriculum', label: isAr ? 'مركز المناهج →' : 'Curriculum Hub →' }
    }
  }

  if (intent.type === 'teacher') {
    return {
      text: isAr
        ? 'صفحة موارد المعلمين تحتوي على منهج فرصة الكامل لـ 8 أسابيع مع خطط الجلسات والأنشطة والمواد.'
        : 'The Teacher Resources page has the complete 8-week Forsa curriculum with session plans, activities, materials, and the full teacher toolkit.',
      link: { to: '/teachers', label: isAr ? 'موارد المعلمين →' : 'Teacher Resources →' }
    }
  }

  if (intent.type === 'advice' && !intent.skill) {
    return {
      text: isAr
        ? 'إليك ما يمكنني مساعدتك به:\n\n📚 الدورات المجانية — لتطوير مهاراتك\n🌟 الفرص الموثّقة — منح ومسابقات وبرامج\n🗺️ مركز المناهج — شرح المواد الدراسية\n🧭 منهجك الأول — رحلة 8 أسابيع\n\nماذا تريد تحديداً؟'
        : 'Here\'s what I can help you with:\n\n📚 Free Courses — build your skills\n🌟 Verified Opportunities — scholarships, competitions, programs\n🗺️ Curriculum Hub — school subjects explained\n🧭 First Curriculum — your 8-week journey\n\nWhat would you like to explore?',
    }
  }

  if (intent.type === 'course' && matchedCourses.length > 0) {
    const intro = isAr
      ? intent.skill ? `إليك ${matchedCourses.length} دورة في ${intent.skill}:` : `إليك ${matchedCourses.length} دورات مقترحة لك:`
      : intent.skill ? `Here are ${matchedCourses.length} ${intent.skill} course${matchedCourses.length > 1 ? 's' : ''}:` : `Here are ${matchedCourses.length} courses I recommend:`
    return { text: intro, courses: matchedCourses }
  }

  if (intent.type === 'opportunity' && matchedOpps.length > 0) {
    const intro = isAr
      ? `إليك ${matchedOpps.length} فرصة موثّقة:`
      : `Here are ${matchedOpps.length} verified opportunities for you:`
    return { text: intro, opportunities: matchedOpps }
  }

  if (['scam', 'fake', 'suspicious', 'safe', 'مشبوه', 'احتيال', 'نصب', 'أمان'].some(k => lower.includes(k))) {
    return {
      text: isAr
        ? 'للتحقق من أي فرصة، استخدم أداة التحقق! ألصق وصفها أو رابطها واحصل على درجة مصداقية فورية.'
        : 'To check if an opportunity is safe, use the Verification Tool! Paste the description or link and get an instant credibility score.',
      link: { to: '/verify', label: isAr ? 'أداة التحقق →' : 'Verify an Opportunity →' }
    }
  }

  return {
    text: isAr
      ? 'يمكنني مساعدتك في إيجاد دورات مجانية، فرص موثّقة، أو شرح مادة دراسية. أخبرني بما تحتاجه!'
      : "I can help you find free courses, verified opportunities, understand a school subject, or start your 8-week journey. Tell me more about what you need!",
  }
}

// ── Motivational ticker ───────────────────────────────────────────────────────
function MotivationalTicker({ messages, isAr }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % messages.length), 4000)
    return () => clearInterval(timer)
  }, [messages.length])

  return (
    <div className="text-center py-1 overflow-hidden h-5">
      <p key={idx} className="text-[11px] text-amber-600 font-medium animate-pulse">
        {messages[idx]}
      </p>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Chatbot() {
  const { t, lang } = useLanguage()
  const isAr = lang === 'ar'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [poweredBy, setPoweredBy] = useState(null)

  const [courses, setCourses] = useState(FALLBACK_COURSES)
  const [opps, setOpps] = useState(FALLBACK_OPPS)

  const chatScrollRef = useRef(null)
  const inputRef = useRef(null)

  const motivationalMessages = t('rafiq.motivational') || []

  useEffect(() => {
    fetch(apiUrl('/api/courses')).then(r => r.json()).then(setCourses).catch(() => {})
    fetch(apiUrl('/api/opportunities')).then(r => r.json()).then(setOpps).catch(() => {})
  }, [])

  useEffect(() => {
    const greeting = t('rafiq.greeting')
    const suggestions = t('rafiq.suggestions')
    setMessages([{ from: 'bot', text: greeting, options: Array.isArray(suggestions) ? suggestions : [] }])
    setPoweredBy(null)
  }, [lang])

  useEffect(() => {
    const el = chatScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  const addBotMsg = useCallback((payload) => {
    setMessages(prev => [...prev, { from: 'bot', ...payload }])
  }, [])

  const addUserMsg = useCallback((text) => {
    setMessages(prev => [...prev, { from: 'user', text }])
  }, [])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    addUserMsg(trimmed)
    setLoading(true)

    try {
      const history = messages
        .filter(m => (m.from === 'user' || m.from === 'bot') && m.text)
        .slice(-8)
        .map(m => ({ from: m.from, text: m.text }))

      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, lang }),
      })
      const data = await res.json()
      setPoweredBy(data.poweredBy)

      if (data.poweredBy === 'gemini') {
        addBotMsg({ text: data.reply })
      } else {
        const intent = extractIntent(trimmed)
        const { matchedCourses, matchedOpps } = smartFilter(courses, opps, intent)
        const reply = buildSmartReply(trimmed, intent, matchedCourses, matchedOpps, isAr)
        addBotMsg(reply)
      }
    } catch {
      const intent = extractIntent(trimmed)
      const { matchedCourses, matchedOpps } = smartFilter(courses, opps, intent)
      const reply = buildSmartReply(trimmed, intent, matchedCourses, matchedOpps, isAr)
      addBotMsg(reply)
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [loading, messages, lang, courses, opps, isAr, addUserMsg, addBotMsg])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  const reset = useCallback(() => {
    const greeting = t('rafiq.greeting')
    const suggestions = t('rafiq.suggestions')
    setMessages([{ from: 'bot', text: greeting, options: Array.isArray(suggestions) ? suggestions : [] }])
    setPoweredBy(null)
    setInput('')
  }, [t])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-6 flex items-start gap-4">
        <OwlMascot size={56} />
        <div>
          <div className="section-label mb-1">{t('rafiq.label')}</div>
          <h1 className="page-title mb-1">{t('rafiq.title')}</h1>
          <p className="text-slate-500 text-sm">{t('rafiq.subtitle')}</p>
        </div>
      </div>

      {/* Motivational ticker */}
      {motivationalMessages.length > 0 && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
          <MotivationalTicker messages={motivationalMessages} isAr={isAr} />
        </div>
      )}

      <div className="card overflow-hidden shadow-md">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-[#1a3a6e]">
          <div className="shrink-0">
            <OwlMascot size={36} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {isAr ? 'رفيق' : 'Rafiq'}
              </span>
              <span className="text-amber-400 text-xs font-medium">🦉</span>
            </div>
            <div className="text-blue-300 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              {t('rafiq.online')}
            </div>
          </div>
          {poweredBy && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
              poweredBy === 'gemini' ? 'bg-violet-500/20 text-violet-200' : 'bg-emerald-500/20 text-emerald-200'
            }`}>
              {poweredBy === 'gemini' ? `🤖 ${t('rafiq.poweredBy')}` : '🧠 Smart'}
            </span>
          )}
          <button onClick={reset}
            className="text-xs text-blue-200 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1 rounded-full transition-colors shrink-0">
            {t('rafiq.startOver')}
          </button>
        </div>

        {/* Messages */}
        <div ref={chatScrollRef} className="p-4 space-y-3 bg-slate-50 overflow-y-auto" style={{ height: '480px' }}>
          {messages.map((msg, i) => {
            const isLastBot = msg.from === 'bot' && i === messages.length - 1

            if (msg.from === 'bot') {
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    <OwlMascot size={28} />
                  </div>
                  <div className="flex-1 max-w-sm">
                    {msg.text && (
                      <div className="bg-white rounded-2xl rounded-ss-none px-4 py-3 text-sm text-slate-700 leading-relaxed shadow-sm border border-slate-100 whitespace-pre-line">
                        {msg.text}
                      </div>
                    )}

                    {/* Suggestion chips */}
                    {msg.options && isLastBot && Array.isArray(msg.options) && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.options.map((opt, j) => (
                          <button key={j} onClick={() => sendMessage(opt)} disabled={loading}
                            className="text-xs px-3 py-1.5 rounded-full border border-[#1a3a6e] text-[#1a3a6e] bg-white hover:bg-[#1a3a6e] hover:text-white transition-colors disabled:opacity-40">
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Internal page link */}
                    {msg.link && (
                      <div className="mt-2">
                        <Link to={msg.link.to}
                          className="inline-block text-xs font-semibold text-[#1a3a6e] border border-[#1a3a6e] px-4 py-2 rounded-full hover:bg-[#1a3a6e] hover:text-white transition-colors">
                          {msg.link.label}
                        </Link>
                      </div>
                    )}

                    {/* Course cards */}
                    {msg.courses && (
                      <div className="mt-2 space-y-2">
                        {msg.courses.map((c, j) => (
                          <div key={j} className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-bold text-[#1a3a6e] text-xs leading-snug">{c.title}</p>
                              <span className="badge bg-emerald-50 text-emerald-700 text-[10px] shrink-0">
                                {isAr ? 'مجاني' : 'Free'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mb-2 capitalize">{c.provider} · {c.language} · {c.level}</p>
                            <a href={c.link} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold text-amber-500 hover:text-amber-600">
                              {t('rafiq.openCourseBtn')}
                            </a>
                          </div>
                        ))}
                        <Link to="/courses" className="block text-center text-xs font-medium text-[#1a3a6e] hover:underline mt-1">
                          {t('rafiq.seeCourses')}
                        </Link>
                      </div>
                    )}

                    {/* Opportunity cards */}
                    {msg.opportunities && (
                      <div className="mt-2 space-y-2">
                        {msg.opportunities.map((o, j) => (
                          <div key={j} className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-bold text-[#1a3a6e] text-xs leading-snug">{o.title}</p>
                              <span className="badge bg-emerald-50 text-emerald-700 text-[10px] shrink-0">✓</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mb-0.5 capitalize">{o.type} · {o.country}</p>
                            {o.eligibility && <p className="text-[11px] text-slate-400 mb-2">{o.eligibility}</p>}
                            <p className="text-[11px] text-slate-400 mb-2">📅 {o.deadline}</p>
                            <a href={o.applicationLink} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold text-amber-500 hover:text-amber-600">
                              {t('rafiq.viewOppBtn')}
                            </a>
                          </div>
                        ))}
                        <Link to="/opportunities" className="block text-center text-xs font-medium text-[#1a3a6e] hover:underline mt-1">
                          {t('rafiq.seeOpps')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )
            }

            return (
              <div key={i} className="flex justify-end">
                <div className="bg-[#1a3a6e] text-white rounded-2xl rounded-se-none px-4 py-3 text-sm max-w-xs leading-relaxed shadow-sm">
                  {msg.text}
                </div>
              </div>
            )
          })}

          {loading && (
            <div className="flex items-start gap-2.5">
              <OwlMascot size={28} />
              <div className="bg-white rounded-2xl rounded-ss-none px-4 py-3 shadow-sm border border-slate-100">
                <div className="flex items-center gap-1">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-100 bg-white">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('rafiq.placeholder')}
              disabled={loading}
              className="flex-1 input resize-none py-2.5 text-sm disabled:bg-slate-50"
              style={{ maxHeight: '80px', overflowY: 'auto' }}
            />
            <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
              className="btn-primary px-4 py-2.5 rounded-xl shrink-0 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? '⟳' : '↑'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1 px-1">{isAr ? 'Enter للإرسال' : 'Enter to send'}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        <Link to="/courses" className="text-xs text-[#1a3a6e] hover:underline font-medium">{t('rafiq.seeCourses')}</Link>
        <span className="text-slate-300">·</span>
        <Link to="/opportunities" className="text-xs text-[#1a3a6e] hover:underline font-medium">{t('rafiq.seeOpps')}</Link>
        <span className="text-slate-300">·</span>
        <Link to="/curriculum" className="text-xs text-[#1a3a6e] hover:underline font-medium">
          {isAr ? 'مركز المناهج →' : 'Curriculum Hub →'}
        </Link>
        <span className="text-slate-300">·</span>
        <Link to="/first-curriculum" className="text-xs text-[#1a3a6e] hover:underline font-medium">
          {isAr ? 'منهجك الأول →' : 'First Curriculum →'}
        </Link>
      </div>

      {/* About note */}
      <div className="card p-4 mt-5 bg-blue-50 border-blue-100">
        <p className="text-xs font-semibold text-blue-700 mb-1">💡 {t('rafiq.aboutNote')}</p>
        <p className="text-xs text-blue-600 leading-relaxed">{t('rafiq.aboutDesc')}</p>
      </div>
    </div>
  )
}
