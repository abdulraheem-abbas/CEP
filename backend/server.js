require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const rateLimit = require('express-rate-limit')

const coursesRouter = require('./routes/courses')
const opportunitiesRouter = require('./routes/opportunities')
const curriculumRouter = require('./routes/curriculum')
const organizationsRouter = require('./routes/organizations')

const app = express()
const PORT = process.env.PORT || 4567

// --- Gemini setup ---
let verifyModel = null
let chatModel = null
let geminiAvailable = false

if (process.env.GEMINI_API_KEY) {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    verifyModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    chatModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })
    geminiAvailable = true
    console.log('✅ Gemini AI connected  (verify: gemini-2.5-flash | chat: gemini-2.5-flash-lite)')
  } catch (e) {
    console.warn('⚠️  Gemini setup failed:', e.message)
  }
} else {
  console.log('ℹ️  No GEMINI_API_KEY — using rule-based fallback for verify & chat')
}

// --- Middleware ---
app.use(cors())
app.use(express.json())

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment and try again.' },
})

// --- Routes ---
// Vercel Services may pass backend requests with or without the /api prefix.
app.use(['/api/courses', '/courses'], coursesRouter)
app.use(['/api/opportunities', '/opportunities'], opportunitiesRouter)
app.use(['/api/curriculum', '/curriculum'], curriculumRouter)
app.use(['/api/organizations', '/organizations'], organizationsRouter)

app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    ok: true,
    service: 'forsa-backend',
    gemini: geminiAvailable,
  })
})

// --- Gemini: Verification ---
async function analyzeWithGemini(text, url) {
  const prompt = `You are an AI assistant helping youth in Egypt and Yemen (ages 13-25) verify whether an opportunity — scholarship, competition, fellowship, program, or internship — is legitimate and safe.

Analyze the following carefully:
${url ? `URL: ${url}` : ''}
${text ? `\nDescription:\n${text}` : ''}

Check for: payment requests, vague/missing organizer, unrealistic promises, missing deadline, no contact info, suspicious URL patterns, and other scam signals common in the MENA region.

Return ONLY a valid JSON object — no markdown, no code blocks, no extra text:
{
  "score": <integer 0-100, where 100 = fully credible>,
  "riskLevel": <"safe" | "caution" | "high-risk">,
  "redFlags": [<strings, be specific>],
  "positiveSignals": [<strings, be specific>],
  "missingInformation": [<important missing details>],
  "recommendedAction": <one clear sentence>,
  "studentFriendlyAdvice": <warm, practical advice for a student aged 14-25, 2-3 sentences>
}`

  const result = await verifyModel.generateContent(prompt)
  const raw = result.response.text().trim()
  const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const parsed = JSON.parse(jsonStr)

  const statusMap = {
    safe: { status: 'likely_credible', statusLabel: 'Likely Credible', color: 'green' },
    caution: { status: 'needs_caution', statusLabel: 'Needs Caution', color: 'amber' },
    'high-risk': { status: 'suspicious', statusLabel: 'Suspicious', color: 'red' },
  }
  const mapped = statusMap[parsed.riskLevel] || statusMap.caution

  return {
    score: Math.min(100, Math.max(0, parseInt(parsed.score) || 0)),
    riskLevel: parsed.riskLevel || 'caution',
    ...mapped,
    redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
    positiveSignals: Array.isArray(parsed.positiveSignals) ? parsed.positiveSignals : [],
    missingInformation: Array.isArray(parsed.missingInformation) ? parsed.missingInformation : [],
    recommendedAction: parsed.recommendedAction || '',
    advice: parsed.studentFriendlyAdvice || '',
    poweredBy: 'gemini',
  }
}

// --- Gemini: Chat ---
async function chatWithGemini(message, history, lang) {
  const coursesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/courses.json'), 'utf8'))
  const oppsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/opportunities.json'), 'utf8'))
  const isAr = lang === 'ar'

  const coursesList = coursesData.slice(0, 8).map(c =>
    `• "${c.title}" | ${c.category} | ${c.provider} | ${c.level} | ${c.language}`
  ).join('\n')

  const oppsList = oppsData.slice(0, 8).map(o =>
    `• "${o.title}" | ${o.type} | ${o.country} | Deadline: ${o.deadline}`
  ).join('\n')

  const recentHistory = history.slice(-6).map(m =>
    `${m.from === 'user' ? (isAr ? 'طالب' : 'Student') : (isAr ? 'مساعد' : 'Guide')}: ${m.text}`
  ).join('\n')

  const prompt = isAr
    ? `أنت مساعد فرصة الذكي — مستشار تعليمي ودود ومتخصص لمنصة فرصة، تساعد طلاب المدارس الحكومية في مصر واليمن (أعمار 13-25) في إيجاد الدورات المجانية والفرص التعليمية.

شخصيتك: دافئ، محدد، عملي. مثل أخ أكبر أو معلم يعرف الموارد المتاحة ويريد مساعدتك.

قواعد مهمة:
- أجب بـ 3-5 جمل مفيدة وواضحة
- استخدم العربية الفصحى البسيطة الدافئة المناسبة للشباب
- عندما توصي بدورة أو فرصة، اذكر اسمها الكامل ومقدّمها ورابطها
- إذا سأل الطالب عن مهارة محددة، اقترح 2-3 دورات من القائمة أدناه
- إذا سأل عن فرص في دولة، اذكر الفرص المتاحة هناك أو الأونلاين
- دائماً اقترح التحقق من الفرص قبل التقديم
- إذا لم تجد ما يناسب في البيانات، قل ذلك بصراحة واقترح تصفح صفحة الدورات أو الفرص

الدورات المتاحة (اذكرها باسمها الكامل عند التوصية):
${coursesList}

الفرص المتاحة (اذكرها باسمها الكامل مع الموعد النهائي عند التوصية):
${oppsList}

${recentHistory ? `سياق المحادثة:\n${recentHistory}\n` : ''}
طالب: ${message}
مساعد فرصة:`
    : `You are Forsa Guide — a knowledgeable, warm education advisor for Forsa platform, helping public school students in Egypt and Yemen (ages 13-25) find free courses and safe opportunities.

Your personality: Like a helpful older sibling or mentor who knows the resources and genuinely wants to help you succeed.

Important rules:
- Give 3-5 sentences of genuinely useful, specific advice
- When recommending a course or opportunity, always mention its full name and provider
- If asked about a skill, recommend 2-3 specific courses from the list below
- If asked about opportunities in a country, list what's available there plus online options
- Always include the application link when recommending opportunities
- Suggest verifying any opportunity before applying
- Be conversational, not robotic — avoid bullet lists, use flowing sentences
- If nothing in the database matches, say so honestly and suggest browsing the full pages

Available courses (use full names when recommending):
${coursesList}

Available opportunities (include deadlines when recommending):
${oppsList}

${recentHistory ? `Conversation context:\n${recentHistory}\n` : ''}
Student: ${message}
Forsa Guide:`

  const result = await chatModel.generateContent(prompt)
  return result.response.text().trim()
}

// --- Rule-based verification fallback ---
function ruleBasedVerify(text = '', url = '') {
  const combined = (text + ' ' + url).toLowerCase()
  const checks = []
  let score = 0

  const hasWebsite = url.includes('http') || combined.includes('http') || combined.includes('www.')
  checks.push({ id: 1, label: 'Has an official website or link', passed: hasWebsite, weight: 15 })
  if (hasWebsite) score += 15

  const organizerTerms = ['organized by', 'hosted by', 'foundation', 'organization', 'institute', 'council', 'unicef', 'undp', 'ministry', 'university', 'ngo', 'association']
  const hasOrganizer = organizerTerms.some(t => combined.includes(t))
  checks.push({ id: 2, label: 'Mentions a clear organizer', passed: hasOrganizer, weight: 20 })
  if (hasOrganizer) score += 20

  const paymentRed = ['pay to apply', 'registration fee required', 'application fee', 'send money', 'wire transfer', 'bitcoin', 'advance fee', 'pay first', 'processing fee']
  const hasSuspiciousPayment = paymentRed.some(t => combined.includes(t))
  checks.push({ id: 3, label: 'No suspicious payment requests', passed: !hasSuspiciousPayment, weight: 20 })
  if (!hasSuspiciousPayment) score += 20

  const deadlineTerms = ['deadline', 'apply by', 'due date', 'closing date', '2025', '2026']
  const hasDeadline = deadlineTerms.some(t => combined.includes(t))
  checks.push({ id: 4, label: 'Has a clear application deadline', passed: hasDeadline, weight: 15 })
  if (hasDeadline) score += 15

  const eligibilityTerms = ['eligible', 'eligibility', 'requirements', 'open to', 'ages', 'nationality', 'for students']
  const hasEligibility = eligibilityTerms.some(t => combined.includes(t))
  checks.push({ id: 5, label: 'Has clear eligibility criteria', passed: hasEligibility, weight: 15 })
  if (hasEligibility) score += 15

  const contactTerms = ['contact', 'email', '@', 'phone', 'reach us', 'inquiries']
  const hasContact = contactTerms.some(t => combined.includes(t))
  checks.push({ id: 6, label: 'Includes contact information', passed: hasContact, weight: 10 })
  if (hasContact) score += 10

  const suspiciousUrl = ['bit.ly', 'tinyurl', 'blogspot', 'free-host', 'weebly']
  const urlSafe = url === '' || !suspiciousUrl.some(t => url.toLowerCase().includes(t))
  checks.push({ id: 7, label: 'URL appears safe and credible', passed: urlSafe, weight: 5 })
  if (urlSafe) score += 5

  let status, statusLabel, color, advice
  if (score >= 70) {
    status = 'likely_credible'; statusLabel = 'Likely Credible'; color = 'green'
    advice = 'This opportunity shows strong signs of credibility. Always verify by visiting the official website directly and never share personal banking details.'
  } else if (score >= 40) {
    status = 'needs_caution'; statusLabel = 'Needs Caution'; color = 'amber'
    advice = 'This opportunity has some credibility indicators but is missing others. Research the organizer independently and ask a teacher before applying.'
  } else {
    status = 'suspicious'; statusLabel = 'Suspicious'; color = 'red'
    advice = 'This opportunity shows several red flags. Do not share personal information or pay any fees. Show it to a teacher before proceeding.'
  }

  return { score, status, statusLabel, color, checks, advice, poweredBy: 'rules' }
}

// --- /api/verify ---
app.post(['/api/verify', '/verify'], aiLimiter, async (req, res) => {
  const { text = '', url = '' } = req.body
  if (!text.trim() && !url.trim()) {
    return res.status(400).json({ error: 'Provide text or URL to analyze.' })
  }
  if (geminiAvailable) {
    try {
      return res.json(await analyzeWithGemini(text, url))
    } catch (err) {
      console.error('Gemini verify error:', err.message)
    }
  }
  res.json(ruleBasedVerify(text, url))
})

// --- /api/chat ---
app.post(['/api/chat', '/chat'], aiLimiter, async (req, res) => {
  const { message = '', history = [], lang = 'en' } = req.body
  if (!message.trim()) return res.status(400).json({ error: 'Message is required.' })

  if (geminiAvailable) {
    try {
      const reply = await chatWithGemini(message, history, lang)
      return res.json({ reply, poweredBy: 'gemini' })
    } catch (err) {
      console.error('Gemini chat error:', err.message)
    }
  }

  // Rule-based fallback
  const lower = message.toLowerCase()
  const isAr = lang === 'ar'
  let reply = isAr
    ? 'شكراً لتواصلك مع مساعد فرصة. يمكنك تصفح الدورات والفرص المتاحة على المنصة.'
    : 'Thanks for reaching out! Browse our Courses and Opportunities pages to find resources that match your goals.'

  if (['course', 'دورة', 'learn', 'تعلم', 'skill', 'مهارة'].some(k => lower.includes(k))) {
    reply = isAr
      ? 'لدينا دورات مجانية في التواصل والقيادة والثقة بالنفس والتفكير النقدي والعمل الجماعي وأكثر. انتقل إلى صفحة الدورات للتصفح والتصفية.'
      : 'We have free courses in communication, leadership, confidence, critical thinking, teamwork, and more. Visit the Courses page to browse and filter by skill.'
  } else if (['opportunity', 'scholarship', 'فرصة', 'منحة', 'competition', 'مسابقة'].some(k => lower.includes(k))) {
    reply = isAr
      ? 'لدينا فرص موثّقة تشمل المنح والمسابقات والبرامج الشبابية والتدريبات. انتقل إلى صفحة الفرص للتصفح.'
      : 'We have verified opportunities including scholarships, competitions, youth programs, and trainings. Visit the Opportunities page to browse and filter.'
  } else if (['teacher', 'معلم', 'curriculum', 'منهج', 'classroom', 'فصل'].some(k => lower.includes(k))) {
    reply = isAr
      ? 'يمكنك الاطلاع على منهج فرصة الكامل لـ 8 أسابيع في صفحة موارد المعلمين، مع خطط الجلسات والأنشطة والمواد.'
      : "The Teacher Resources page has the complete 8-week Forsa curriculum with session plans, activities, materials, and a teaching toolkit."
  }

  res.json({ reply, poweredBy: 'fallback' })
})

// --- /api/summarize ---
app.post(['/api/summarize', '/summarize'], async (req, res) => {
  const { type, item, lang = 'en' } = req.body
  const isAr = lang === 'ar'

  if (geminiAvailable) {
    try {
      const model = verifyModel // reuse flash for summaries
      const prompt = isAr
        ? `اكتب ملخصاً لهذه ${type === 'course' ? 'الدورة' : 'الفرصة'} لطالب في مصر أو اليمن (عمر 13-25 سنة) في جملتين أو ثلاث. كن دافئاً ومحدداً واذكر ما سيكتسبه الطالب. أعد فقط الملخص بدون أي نص إضافي.\n${type}: ${JSON.stringify({ title: item.title, description: item.description, provider: item.provider || item.organization, category: item.category || item.type })}`
        : `Write a 2-3 sentence summary of this ${type} for a student in Egypt or Yemen (ages 13-25). Be warm, specific, and highlight what they will gain. Return only the summary, no extra text.\n${type}: ${JSON.stringify({ title: item.title, description: item.description, provider: item.provider || item.organization, category: item.category || item.type })}`

      const result = await model.generateContent(prompt)
      return res.json({ summary: result.response.text().trim(), poweredBy: 'gemini' })
    } catch (err) {
      console.error('Gemini summarize error:', err.message)
    }
  }

  // Fallback: use first 220 chars of description
  const raw = item.description || ''
  const summary = raw.length > 220 ? raw.slice(0, 220).trimEnd() + '…' : raw
  res.json({ summary: summary || (isAr ? 'لا يوجد ملخص متاح.' : 'No summary available.'), poweredBy: 'fallback' })
})

app.get(['/', '/api'], (req, res) => {
  res.json({ message: 'Forsa API is running', version: '2.0.0', gemini: geminiAvailable })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🌟 Forsa backend running on http://localhost:${PORT}`)
    console.log(`   /api/verify  →  ${geminiAvailable ? 'Gemini 2.5 Flash' : 'Rule-based fallback'}`)
    console.log(`   /api/chat    →  ${geminiAvailable ? 'Gemini 2.5 Flash Lite' : 'Rule-based fallback'}`)
  })
}

module.exports = app
