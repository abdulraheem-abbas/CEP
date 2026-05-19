import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

// ── Static data cache (pre-fetched, updated from API) ──────────────────────
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
  { id: 4, title: 'Global Youth Innovation Challenge', type: 'competition', country: 'Online', deadline: '2025-08-01', skillsDeveloped: ['creativity', 'problem solving'], applicationLink: 'https://globalyouthinnovation.org', verificationStatus: 'verified', organization: 'Global Youth Council', eligibility: 'Ages 14-25' },
  { id: 5, title: 'Chevening Scholarship', type: 'scholarship', country: 'United Kingdom', deadline: '2025-11-05', skillsDeveloped: ['leadership', 'critical thinking'], applicationLink: 'https://www.chevening.org', verificationStatus: 'verified', organization: 'UK Government', eligibility: 'Egyptian/Yemeni nationals, 2+ yrs work experience' },
  { id: 6, title: 'Mercy Corps Youth Program Yemen', type: 'youth program', country: 'Yemen', deadline: '2025-07-31', skillsDeveloped: ['career readiness', 'communication'], applicationLink: 'https://www.mercycorps.org', verificationStatus: 'verified', organization: 'Mercy Corps', eligibility: 'Yemeni youth ages 16-24' },
  { id: 7, title: 'Youth Leadership Fellowship — MENA', type: 'fellowship', country: 'Online', deadline: '2025-07-01', skillsDeveloped: ['leadership', 'teamwork'], applicationLink: 'https://menayouthfellowship.org', verificationStatus: 'verified', organization: 'MENA Youth Foundation', eligibility: 'Ages 20-30, community project experience' },
  { id: 8, title: 'UNDP Youth Volunteer Initiative', type: 'volunteering', country: 'Egypt', deadline: '2025-06-30', skillsDeveloped: ['teamwork', 'leadership'], applicationLink: 'https://www.undp.org/egypt/youth', verificationStatus: 'verified', organization: 'UNDP Egypt', eligibility: 'Ages 18-30' },
  { id: 9, title: 'Arab Youth Leadership Summit', type: 'conference', country: 'Egypt', deadline: '2025-07-15', skillsDeveloped: ['leadership', 'public speaking'], applicationLink: 'https://arabyouthsummit.org', verificationStatus: 'verified', organization: 'Arab Youth Organization', eligibility: 'Ages 18-30, Arab nationals' },
  { id: 10, title: 'World Bank Youth Summit', type: 'conference', country: 'Online', deadline: '2025-09-20', skillsDeveloped: ['public speaking', 'critical thinking'], applicationLink: 'https://www.worldbank.org/youthsummit', verificationStatus: 'verified', organization: 'World Bank', eligibility: 'Ages 18-30, developing countries' },
]

// ── Smart intent extraction ─────────────────────────────────────────────────
function extractIntent(msg) {
  const lower = msg.toLowerCase()
  const result = { type: null, lang: null, skill: null, country: null, oppType: null, level: null }

  // What they want
  const courseKW = ['course', 'دورة', 'دورات', 'learn', 'تعلم', 'class', 'study', 'skill', 'مهارة', 'مهارات', 'training course', 'lesson']
  const oppKW = ['opportunity', 'opportunities', 'scholarship', 'فرصة', 'فرص', 'منحة', 'منح', 'competition', 'مسابقة', 'fellowship', 'زمالة', 'program', 'برنامج', 'volunteer', 'تطوع', 'internship', 'youth program', 'conference', 'workshop', 'training', 'تدريب']
  const teacherKW = ['teacher', 'معلم', 'curriculum', 'منهج', 'classroom', 'فصل', 'lesson plan', 'خطة درس', 'teaching', 'تدريس']
  const adviceKW = ['advice', 'نصيحة', 'help', 'مساعدة', 'guide', 'دليل', 'how', 'كيف', 'what should', 'ماذا أفعل']

  if (courseKW.some(k => lower.includes(k))) result.type = 'course'
  else if (oppKW.some(k => lower.includes(k))) result.type = 'opportunity'
  else if (teacherKW.some(k => lower.includes(k))) result.type = 'teacher'
  else if (adviceKW.some(k => lower.includes(k))) result.type = 'advice'

  // Language preference
  if (['arabic', 'عرب', 'عربي', 'عربية', 'في العربية', 'باللغة العربية'].some(k => lower.includes(k))) result.lang = 'Arabic'
  else if (['english', 'إنجليز', 'انجليز', 'الإنجليزية'].some(k => lower.includes(k))) result.lang = 'English'

  // Skill
  const skillMap = {
    'communication': ['communication', 'تواصل', 'تواصل'],
    'leadership': ['leadership', 'leader', 'قيادة', 'قائد'],
    'teamwork': ['teamwork', 'team', 'فريق', 'عمل جماعي'],
    'confidence': ['confidence', 'confident', 'ثقة', 'ثقة بالنفس'],
    'critical thinking': ['critical thinking', 'analytical', 'تفكير نقدي', 'تحليل'],
    'problem solving': ['problem solving', 'problem', 'حل مشكلات', 'مشكلات'],
    'creativity': ['creativity', 'creative', 'إبداع', 'إبداعي'],
    'public speaking': ['public speaking', 'speech', 'speaking', 'خطابة', 'تحدث'],
    'career readiness': ['career', 'job', 'work', 'مهني', 'وظيفة', 'عمل', 'career readiness'],
  }
  for (const [skill, terms] of Object.entries(skillMap)) {
    if (terms.some(t => lower.includes(t))) { result.skill = skill; break }
  }

  // Country
  if (['egypt', 'cairo', 'مصر', 'القاهرة', 'مصري', 'المصر'].some(k => lower.includes(k))) result.country = 'Egypt'
  else if (['yemen', 'sanaa', 'aden', 'اليمن', 'يمن', 'صنعاء', 'عدن'].some(k => lower.includes(k))) result.country = 'Yemen'
  else if (['online', 'remote', 'إنترنت', 'أونلاين', 'عن بعد'].some(k => lower.includes(k))) result.country = 'Online'

  // Opportunity type
  const typeMap = {
    'scholarship': ['scholarship', 'منحة', 'منح', 'full scholarship', 'funded'],
    'competition': ['competition', 'contest', 'مسابقة', 'challenge', 'تحدي'],
    'fellowship': ['fellowship', 'زمالة', 'fellows'],
    'training': ['training', 'تدريب', 'workshop', 'ورشة'],
    'volunteering': ['volunteer', 'volunteering', 'تطوع', 'متطوع'],
    'conference': ['conference', 'summit', 'مؤتمر', 'قمة'],
    'youth program': ['youth program', 'youth', 'برنامج شبابي', 'شباب'],
    'internship': ['internship', 'intern', 'تدريب مهني'],
  }
  for (const [type, terms] of Object.entries(typeMap)) {
    if (terms.some(t => lower.includes(t))) { result.oppType = type; break }
  }

  // Level
  if (['beginner', 'مبتدئ', 'starter', 'never done'].some(k => lower.includes(k))) result.level = 'beginner'
  else if (['intermediate', 'متوسط', 'some experience'].some(k => lower.includes(k))) result.level = 'intermediate'
  else if (['advanced', 'متقدم', 'experienced'].some(k => lower.includes(k))) result.level = 'advanced'

  return result
}

function smartFilter(courses, opps, intent) {
  let matchedCourses = [], matchedOpps = []

  if (intent.type === 'course' || intent.type === 'advice' || !intent.type) {
    let r = [...courses]
    if (intent.lang && intent.lang !== 'all') r = r.filter(c => c.language === intent.lang)
    if (intent.skill) r = r.filter(c => c.category === intent.skill)
    if (intent.level) r = r.filter(c => c.level === intent.level)
    if (r.length === 0) {
      // Relax filters
      r = courses.filter(c => (!intent.skill || c.category === intent.skill))
    }
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
    if (r.length === 0) {
      r = opps.filter(o => o.verificationStatus === 'verified')
    }
    matchedOpps = r.slice(0, 3)
  }

  return { matchedCourses, matchedOpps }
}

// ── Build a smart local reply ───────────────────────────────────────────────
function buildSmartReply(msg, intent, matchedCourses, matchedOpps, isAr) {
  const lower = msg.toLowerCase()

  // Teacher resources
  if (intent.type === 'teacher') {
    return {
      text: isAr
        ? 'يمكنك الاطلاع على منهج فرصة الكامل لـ 8 أسابيع في صفحة موارد المعلمين، مع خطط الجلسات والأنشطة والمواد جاهزة للاستخدام في أي فصل دراسي.'
        : "The Teacher Resources page has the complete 8-week Forsa curriculum with session plans, activities, materials lists, and reflection questions — ready to use in any classroom. The toolkit also includes guides for large classes and encouraging quiet students.",
      link: { to: '/teachers', label: isAr ? 'موارد المعلمين →' : 'Teacher Resources →' }
    }
  }

  // General advice
  if (intent.type === 'advice' && !intent.skill && !intent.country) {
    return {
      text: isAr
        ? 'فرصة توفر لك ثلاثة مسارات: (1) الدورات المجانية لتطوير مهارات التواصل والقيادة وغيرها، (2) الفرص الموثّقة كالمنح والمسابقات والبرامج الشبابية، (3) منهج 8 أسابيع للمعلمين. أخبرني أكثر: ماذا تريد تطوير؟'
        : "Forsa has three main paths: (1) Free courses to build communication, leadership, and other life skills, (2) Verified opportunities like scholarships, competitions, and youth programs, (3) An 8-week classroom curriculum for teachers. What would you like to explore?",
    }
  }

  // Courses found
  if (intent.type === 'course' && matchedCourses.length > 0) {
    let intro = ''
    if (isAr) {
      intro = intent.skill
        ? `وجدت ${matchedCourses.length} دورة في ${intent.skill}${intent.lang ? ` باللغة ${intent.lang === 'Arabic' ? 'العربية' : 'الإنجليزية'}` : ''}:`
        : `إليك أفضل ${matchedCourses.length} دورات متاحة الآن:`
    } else {
      intro = intent.skill
        ? `Here are ${matchedCourses.length} ${intent.skill} course${matchedCourses.length > 1 ? 's' : ''}${intent.lang ? ` in ${intent.lang}` : ''}:`
        : `Here are ${matchedCourses.length} courses I recommend for you:`
    }
    return { text: intro, courses: matchedCourses }
  }

  // Opportunities found
  if (intent.type === 'opportunity' && matchedOpps.length > 0) {
    let intro = ''
    if (isAr) {
      intro = intent.oppType
        ? `وجدت ${matchedOpps.length} فرصة ${intent.oppType}${intent.country && intent.country !== 'Online' ? ` في ${intent.country === 'Egypt' ? 'مصر' : 'اليمن'}` : ''}:`
        : `إليك أفضل ${matchedOpps.length} فرص موثّقة:`
    } else {
      intro = intent.oppType
        ? `Found ${matchedOpps.length} ${intent.oppType} opportunity/opportunities${intent.country ? ` in/for ${intent.country}` : ''}:`
        : `Here are ${matchedOpps.length} verified opportunities for you:`
    }
    return { text: intro, opportunities: matchedOpps }
  }

  // Verify prompt
  if (['scam', 'fake', 'suspicious', 'safe', 'مشبوه', 'احتيال', 'نصب', 'أمان'].some(k => lower.includes(k))) {
    return {
      text: isAr
        ? 'لمعرفة ما إذا كانت فرصة ما آمنة، استخدم أداة التحقق من الفرص. ألصق وصف الفرصة أو رابطها وستحصل على درجة مصداقية فورية.'
        : "To check if an opportunity is safe, use our Opportunity Verification Tool. Paste the description or link and get an instant credibility score powered by AI.",
      link: { to: '/verify', label: isAr ? 'التحقق من الفرص →' : 'Verify an Opportunity →' }
    }
  }

  // Default helpful response
  return {
    text: isAr
      ? 'يمكنني مساعدتك في إيجاد دورات مجانية، فرص موثّقة (منح ومسابقات وبرامج)، أو موارد للمعلمين. أخبرني بما تبحث عنه تحديداً!'
      : "I can help you find free courses, verified opportunities (scholarships, competitions, programs), or teacher resources. Tell me more about what you're looking for!",
  }
}

// ── Component ───────────────────────────────────────────────────────────────
export default function Chatbot() {
  const { t, lang } = useLanguage()
  const isAr = lang === 'ar'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [poweredBy, setPoweredBy] = useState(null)

  // Live data cache
  const [courses, setCourses] = useState(FALLBACK_COURSES)
  const [opps, setOpps] = useState(FALLBACK_OPPS)

  const chatScrollRef = useRef(null)
  const inputRef = useRef(null)

  // Pre-load fresh data from API
  useEffect(() => {
    fetch('/api/courses').then(r => r.json()).then(setCourses).catch(() => {})
    fetch('/api/opportunities').then(r => r.json()).then(setOpps).catch(() => {})
  }, [])

  // Reset on language change
  useEffect(() => {
    setMessages([{ from: 'bot', text: t('chatbot.welcome'), options: t('chatbot.suggestions') }])
    setPoweredBy(null)
  }, [lang])

  // Scroll the chat container (NOT the page)
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

  // ── Main send logic ────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    addUserMsg(trimmed)

    setLoading(true)

    try {
      // Always try the backend first — handles Gemini if available
      const history = messages
        .filter(m => (m.from === 'user' || m.from === 'bot') && m.text)
        .slice(-8)
        .map(m => ({ from: m.from, text: m.text }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, lang }),
      })
      const data = await res.json()
      setPoweredBy(data.poweredBy)

      if (data.poweredBy === 'gemini') {
        // Gemini gave a real answer — show it
        addBotMsg({ text: data.reply })
      } else {
        // Fallback mode — use our smart local engine
        const intent = extractIntent(trimmed)
        const { matchedCourses, matchedOpps } = smartFilter(courses, opps, intent)
        const reply = buildSmartReply(trimmed, intent, matchedCourses, matchedOpps, isAr)
        addBotMsg(reply)
      }
    } catch {
      // Network error — still use smart local engine
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
    setMessages([{ from: 'bot', text: t('chatbot.welcome'), options: t('chatbot.suggestions') }])
    setPoweredBy(null)
    setInput('')
  }, [t])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <div className="section-label mb-2">{t('chatbot.label')}</div>
        <h1 className="page-title mb-1">{t('chatbot.title')}</h1>
        <p className="text-slate-500 text-sm">{t('chatbot.subtitle')}</p>
      </div>

      <div className="card overflow-hidden shadow-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-[#1a3a6e]">
          <div className="w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center font-black text-[#1a3a6e] text-base shrink-0">F</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white text-sm">Forsa Guide</div>
            <div className="text-blue-300 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              {t('chatbot.online')}
            </div>
          </div>
          {poweredBy && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${
              poweredBy === 'gemini' ? 'bg-violet-500/20 text-violet-200' : 'bg-emerald-500/20 text-emerald-200'
            }`}>
              {poweredBy === 'gemini' ? `🤖 ${t('chatbot.poweredBy')}` : '🧠 Smart Guide'}
            </span>
          )}
          <button onClick={reset} className="text-xs text-blue-200 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1 rounded-full transition-colors shrink-0">
            {t('chatbot.startOver')}
          </button>
        </div>

        {/* Messages — fixed height, scrolls independently of the page */}
        <div ref={chatScrollRef} className="p-4 space-y-3 bg-slate-50 overflow-y-auto" style={{ height: '460px' }}>
          {messages.map((msg, i) => {
            const isLastBot = msg.from === 'bot' && i === messages.length - 1

            if (msg.from === 'bot') {
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-[#1a3a6e] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">F</div>
                  <div className="flex-1 max-w-sm">
                    {msg.text && (
                      <div className="bg-white rounded-2xl rounded-ss-none px-4 py-3 text-sm text-slate-700 leading-relaxed shadow-sm border border-slate-100 whitespace-pre-line">
                        {msg.text}
                      </div>
                    )}

                    {/* Suggestion chips — only on last bot message */}
                    {msg.options && isLastBot && (
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
                              <span className="badge bg-emerald-50 text-emerald-700 text-[10px] shrink-0">Free</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mb-2 capitalize">{c.provider} · {c.language} · {c.level}</p>
                            <a href={c.link} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold text-amber-500 hover:text-amber-600">
                              {t('chatbot.openCourseBtn')}
                            </a>
                          </div>
                        ))}
                        <Link to="/courses" className="block text-center text-xs font-medium text-[#1a3a6e] hover:underline mt-1">
                          {t('chatbot.seeCourses')}
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
                              {t('chatbot.viewOppBtn')}
                            </a>
                          </div>
                        ))}
                        <Link to="/opportunities" className="block text-center text-xs font-medium text-[#1a3a6e] hover:underline mt-1">
                          {t('chatbot.seeOpps')}
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
              <div className="w-7 h-7 bg-[#1a3a6e] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">F</div>
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
              placeholder={t('chatbot.placeholder')}
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

      <div className="flex gap-3 mt-4 justify-center">
        <Link to="/courses" className="text-xs text-[#1a3a6e] hover:underline font-medium">{t('chatbot.seeCourses')}</Link>
        <span className="text-slate-300">·</span>
        <Link to="/opportunities" className="text-xs text-[#1a3a6e] hover:underline font-medium">{t('chatbot.seeOpps')}</Link>
      </div>

      <div className="card p-4 mt-5 bg-blue-50 border-blue-100">
        <p className="text-xs font-semibold text-blue-700 mb-1">💡 {t('chatbot.aboutNote')}</p>
        <p className="text-xs text-blue-600 leading-relaxed">{t('chatbot.aboutDesc')}</p>
      </div>
    </div>
  )
}
