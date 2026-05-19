import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const EXAMPLES = [
  {
    key: 'sampleLegit',
    text: 'UNICEF Youth Leadership Program 2025. Organized by UNICEF Egypt. Open to youth ages 15-25 from Egypt and Yemen. Deadline: August 30, 2025. Apply at unicef.org/egypt. No registration fee. Contact: egypt.youth@unicef.org. Eligibility: must be enrolled in school or university.',
    url: 'https://www.unicef.org/egypt/youth',
  },
  {
    key: 'sampleSuspicious',
    text: 'Amazing scholarship opportunity! Win $5000! Apply now, limited spots. Send your details to claim your scholarship. Registration fee of $50 required to process your application. Act fast!',
    url: 'http://bit.ly/win-scholarship-now',
  },
]

function ScoreCircle({ score, color }) {
  const stroke = color === 'green' ? '#059669' : color === 'amber' ? '#d97706' : '#dc2626'
  const dash = (score / 100) * 251
  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={stroke} strokeWidth="12"
          strokeDasharray={`${dash} 251`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-extrabold text-slate-800">{score}</span>
      </div>
    </div>
  )
}

const STATUS_CONFIG = {
  likely_credible: { bg: 'bg-emerald-50', border: 'border-emerald-200', textColor: 'text-emerald-700', icon: '✅', barColor: 'bg-emerald-500' },
  needs_caution:   { bg: 'bg-amber-50',   border: 'border-amber-200',   textColor: 'text-amber-700',   icon: '⚠️', barColor: 'bg-amber-400' },
  suspicious:      { bg: 'bg-red-50',     border: 'border-red-200',     textColor: 'text-red-700',     icon: '🚨', barColor: 'bg-red-500' },
}

export default function VerifyOpportunity() {
  const { t } = useLanguage()
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleVerify = async () => {
    if (!text.trim() && !url.trim()) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, url }),
      })
      setResult(await res.json())
    } catch {
      setError(t('verify.backendError') + ' ' + t('common.backendError'))
    } finally {
      setLoading(false)
    }
  }

  const loadExample = (ex) => { setText(ex.text); setUrl(ex.url); setResult(null) }

  const sc = result ? STATUS_CONFIG[result.status] || STATUS_CONFIG.needs_caution : null
  const statusLabel = result
    ? t(`verify.statusLabels.${result.status}`) || result.statusLabel
    : ''

  const checkItems = t('verify.checkItems')
  const tips = t('verify.tips')

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{t('verify.label')}</div>
        <h1 className="page-title mb-2">{t('verify.title')}</h1>
        <p className="text-slate-500 text-sm max-w-xl">{t('verify.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* ── Left: Form ── */}
        <div>
          {/* What we check */}
          <div className="card p-5 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-[#1a3a6e]">{t('verify.whatWeCheck')}</span>
              <span className="ms-auto text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">
                {t('verify.poweredByAI')}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {Array.isArray(checkItems) && checkItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-[#1a3a6e] font-bold">→</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-slate-500">{t('verify.tryExample')}</span>
            {EXAMPLES.map(ex => (
              <button key={ex.key} onClick={() => loadExample(ex)}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#1a3a6e] hover:text-[#1a3a6e] transition-colors">
                {t(`verify.${ex.key}`)}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="card p-5">
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                {t('verify.descLabel')} <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={6}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={t('verify.descPlaceholder')}
                className="input resize-none"
              />
            </div>
            <div className="mb-5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                {t('verify.urlLabel')}{' '}
                <span className="text-slate-400 font-normal normal-case tracking-normal">({t('verify.optional')})</span>
              </label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                placeholder={t('verify.urlPlaceholder')} className="input" />
            </div>
            <button
              onClick={handleVerify}
              disabled={loading || (!text.trim() && !url.trim())}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <>⟳ {t('verify.analyzing')}</> : <>🔍 {t('verify.analyzeBtn')}</>}
            </button>
            {error && <p className="text-red-600 text-xs mt-3 text-center">{error}</p>}
          </div>
        </div>

        {/* ── Right: Results ── */}
        <div>
          {!result && !loading && (
            <div className="card p-6">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                🛡️ {t('verify.tipsTitle')}
              </h3>
              <ul className="space-y-3">
                {Array.isArray(tips) && tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-amber-500 shrink-0 mt-0.5 font-bold">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loading && (
            <div className="card p-10 text-center">
              <div className="text-5xl mb-4 animate-spin inline-block">⟳</div>
              <p className="text-slate-500">{t('verify.analyzing')}</p>
              <p className="text-xs text-violet-500 mt-2">{t('verify.poweredByAI')}</p>
            </div>
          )}

          {result && sc && (
            <div className={`card border ${sc.border} overflow-hidden`}>
              {/* Score header */}
              <div className={`${sc.bg} p-5 border-b ${sc.border}`}>
                <div className="flex items-center gap-5">
                  <ScoreCircle score={result.score} color={result.color} />
                  <div>
                    <div className="text-3xl mb-1">{sc.icon}</div>
                    <h2 className={`text-xl font-extrabold ${sc.textColor}`}>{statusLabel}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{t('verify.scoreLabel')}: {result.score}/100</p>
                    <span className={`inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      result.poweredBy === 'gemini' ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {result.poweredBy === 'gemini' ? '🤖 ' + t('verify.aiAnalysis') : t('verify.ruleAnalysis')}
                    </span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>0</span><span>40</span><span>70</span><span>100</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className={`h-full ${sc.barColor} rounded-full transition-all duration-700`} style={{ width: `${result.score}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Gemini-style results */}
                {result.poweredBy === 'gemini' && (
                  <>
                    {result.positiveSignals?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-emerald-700 mb-2">✓ {t('verify.positiveSignals')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.positiveSignals.map((s, i) => (
                            <span key={i} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.redFlags?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-red-600 mb-2">⚠ {t('verify.redFlags')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.redFlags.map((s, i) => (
                            <span key={i} className="text-xs bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.missingInformation?.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-amber-600 mb-2">? {t('verify.missingInfo')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.missingInformation.map((s, i) => (
                            <span key={i} className="text-xs bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.recommendedAction && (
                      <div className="p-3 bg-slate-50 rounded-xl text-xs">
                        <span className="font-semibold text-slate-700">{t('verify.recommendedAction')}: </span>
                        <span className="text-slate-600">{result.recommendedAction}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Rule-based checklist */}
                {result.poweredBy === 'rules' && result.checks && (
                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-2">{t('verify.checklistTitle')}</p>
                    <div className="space-y-2">
                      {result.checks.map(check => (
                        <div key={check.id} className={`flex items-center gap-3 p-2.5 rounded-xl text-xs ${
                          check.passed ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'
                        }`}>
                          <span className={check.passed ? 'text-emerald-600 font-bold' : 'text-red-400'}>
                            {check.passed ? '✓' : '✗'}
                          </span>
                          <span className={check.passed ? 'text-emerald-800' : 'text-red-700'}>{check.label}</span>
                          <span className="ms-auto text-slate-400">+{check.weight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Advice */}
                <div className={`p-4 rounded-xl border-s-4 ${sc.border.replace('border-', 'border-s-')} ${sc.bg}`}>
                  <p className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">🛡️ {t('verify.safetyAdvice')}</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{result.advice}</p>
                </div>

                <button onClick={() => { setResult(null); setText(''); setUrl('') }}
                  className="text-xs text-slate-500 hover:text-slate-700 font-medium">
                  {t('verify.checkAnother')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
