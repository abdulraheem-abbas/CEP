import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { apiUrl } from '../lib/api'

const TABS = ['courses', 'opportunities', 'curriculum']

const COURSE_FIELDS = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'select', required: true, options: ['communication', 'leadership', 'teamwork', 'confidence', 'critical thinking', 'creativity', 'problem solving', 'public speaking', 'career readiness'] },
  { key: 'provider', label: 'Provider', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'level', label: 'Level', type: 'select', required: true, options: ['beginner', 'intermediate', 'advanced'] },
  { key: 'language', label: 'Language', type: 'select', required: true, options: ['English', 'Arabic', 'Both'] },
  { key: 'link', label: 'Course URL', type: 'url', required: true },
  { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 4 weeks' },
]

const OPP_FIELDS = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'type', label: 'Type', type: 'select', required: true, options: ['scholarship', 'conference', 'competition', 'training', 'volunteering', 'internship', 'youth program', 'workshop', 'fellowship'] },
  { key: 'country', label: 'Country', type: 'text', required: true },
  { key: 'deadline', label: 'Deadline', type: 'date', required: true },
  { key: 'eligibility', label: 'Eligibility', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'skillsDeveloped', label: 'Skills (comma-separated)', type: 'text', placeholder: 'leadership, teamwork' },
  { key: 'applicationLink', label: 'Application URL', type: 'url', required: true },
  { key: 'organization', label: 'Organization', type: 'text' },
  { key: 'verificationStatus', label: 'Verification Status', type: 'select', required: true, options: ['verified', 'pending', 'suspicious'] },
]

const CURRICULUM_FIELDS = [
  { key: 'week', label: 'Week Number', type: 'number', required: true },
  { key: 'title', label: 'Week Title', type: 'text', required: true },
  { key: 'objective', label: 'Learning Objective', type: 'textarea', required: true },
]

const STATUS_COLORS = {
  verified: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  suspicious: 'bg-red-100 text-red-700',
}

function Modal({ title, fields, initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {})
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    await onSave(form); setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#1a3a6e]">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {fields.map(f => (
            <div key={f.key}>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {f.label} {f.required && <span className="text-red-400">*</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea rows={3} value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                  required={f.required} placeholder={f.placeholder} className="input resize-none" />
              ) : f.type === 'select' ? (
                <select value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                  required={f.required} className="select capitalize">
                  <option value="">Select…</option>
                  {f.options.map(o => <option key={o} value={o} className="capitalize">{o}</option>)}
                </select>
              ) : (
                <input type={f.type} value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                  required={f.required} placeholder={f.placeholder} className="input" />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-50">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  const { t } = useLanguage()
  const [tab, setTab] = useState('courses')
  const [courses, setCourses] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [curriculum, setCurriculum] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [c, o, cu] = await Promise.all([
        fetch(apiUrl('/api/courses')).then(r => r.json()),
        fetch(apiUrl('/api/opportunities')).then(r => r.json()),
        fetch(apiUrl('/api/curriculum')).then(r => r.json()),
      ])
      setCourses(c); setOpportunities(o); setCurriculum(cu); setError(null)
    } catch {
      setError(t('admin.backendError') || 'Could not connect to the backend. Make sure it is running on port 4567.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleSave = async (item) => {
    const method = item.id ? 'PUT' : 'POST'
    const url = item.id ? apiUrl(`/api/${tab}/${item.id}`) : apiUrl(`/api/${tab}`)
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) })
    setModal(null); fetchAll()
  }

  const handleDelete = async (id) => {
    await fetch(apiUrl(`/api/${tab}/${id}`), { method: 'DELETE' })
    setDeleteConfirm(null); fetchAll()
  }

  const handleStatusChange = async (opp, newStatus) => {
    await fetch(apiUrl(`/api/opportunities/${opp.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...opp, verificationStatus: newStatus }),
    })
    fetchAll()
  }

  const currentFields = tab === 'courses' ? COURSE_FIELDS : tab === 'opportunities' ? OPP_FIELDS : CURRICULUM_FIELDS
  const currentData = tab === 'courses' ? courses : tab === 'opportunities' ? opportunities : curriculum
  const addLabel = tab === 'curriculum' ? t('admin.addWeek') : tab === 'courses' ? t('admin.addCourse') : t('admin.addOpportunity')
  const editLabel = tab === 'curriculum' ? t('admin.editWeek') : tab === 'courses' ? t('admin.editCourse') : t('admin.editOpportunity')

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="section-label mb-2">{t('admin.label')}</div>
        <h1 className="page-title mb-3">{t('admin.title')}</h1>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2 rounded-xl">
          ⚠️ {t('admin.warning')}
        </div>
      </div>

      {error && (
        <div className="card p-5 mb-6 bg-red-50 border-red-100">
          <p className="text-red-700 font-medium text-sm">⚠️ {error}</p>
          <code className="text-xs text-red-600 mt-1 block">cd backend &amp;&amp; npm install &amp;&amp; npm start</code>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {TABS.map(tp => (
          <button key={tp} onClick={() => setTab(tp)}
            className={`px-5 py-2.5 font-semibold text-sm capitalize transition-colors border-b-2 -mb-px ${
              tab === tp ? 'border-[#1a3a6e] text-[#1a3a6e]' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t(`admin.tabs.${tp}`)}
            {tab === tp && !loading && (
              <span className="ms-2 text-xs bg-[#1a3a6e] text-white px-1.5 py-0.5 rounded-full">{currentData.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={() => setModal({ item: null })} disabled={!!error}
          className="btn-amber disabled:opacity-50">
          + {addLabel}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-500">{t('common.loading')}</div>
      ) : (
        <div className="card overflow-hidden">
          {currentData.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-sm">{t('admin.noItems')}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    {tab === 'courses' && ['Title', 'Category', 'Provider', 'Level'].map(h => <th key={h} className="text-start px-4 py-3">{h}</th>)}
                    {tab === 'opportunities' && ['Title', 'Type', 'Country', 'Deadline', 'Status'].map(h => <th key={h} className="text-start px-4 py-3">{h}</th>)}
                    {tab === 'curriculum' && ['Week', 'Title', 'Objective'].map(h => <th key={h} className="text-start px-4 py-3">{h}</th>)}
                    <th className="text-end px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentData.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      {tab === 'courses' && <>
                        <td className="px-4 py-3 font-medium text-[#1a3a6e] max-w-xs truncate">{item.title}</td>
                        <td className="px-4 py-3"><span className="badge bg-blue-100 text-blue-700 capitalize">{item.category}</span></td>
                        <td className="px-4 py-3 text-slate-500">{item.provider}</td>
                        <td className="px-4 py-3 text-slate-500 capitalize">{item.level}</td>
                      </>}
                      {tab === 'opportunities' && <>
                        <td className="px-4 py-3 font-medium text-[#1a3a6e] max-w-xs truncate">{item.title}</td>
                        <td className="px-4 py-3"><span className="badge bg-violet-100 text-violet-700 capitalize">{item.type}</span></td>
                        <td className="px-4 py-3 text-slate-500">{item.country}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{item.deadline}</td>
                        <td className="px-4 py-3">
                          <select value={item.verificationStatus} onChange={e => handleStatusChange(item, e.target.value)}
                            className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[item.verificationStatus] || 'bg-slate-100 text-slate-600'}`}>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="suspicious">Suspicious</option>
                          </select>
                        </td>
                      </>}
                      {tab === 'curriculum' && <>
                        <td className="px-4 py-3 font-extrabold text-[#1a3a6e]">W{item.week}</td>
                        <td className="px-4 py-3 font-medium text-slate-700">{item.title}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">{item.objective}</td>
                      </>}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setModal({ item })}
                            className="text-xs px-3 py-1.5 rounded-lg border border-[#1a3a6e] text-[#1a3a6e] hover:bg-[#1a3a6e] hover:text-white transition-colors">
                            {t('common.edit')}
                          </button>
                          <button onClick={() => setDeleteConfirm(item)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            {t('common.delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit modal */}
      {modal && (
        <Modal
          title={modal.item ? editLabel : addLabel}
          fields={currentFields}
          initial={modal.item}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-2">{t('admin.deleteConfirm')}</h3>
            <p className="text-slate-500 text-sm mb-5">
              <span className="font-medium">{deleteConfirm.title || `Week ${deleteConfirm.week}`}</span>{' '}
              will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-xl hover:bg-red-600 transition-colors">
                {t('admin.yesDelete')}
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 justify-center">
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
