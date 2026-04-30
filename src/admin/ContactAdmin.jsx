import { useState, useEffect } from 'react'
import { getContact, updateContact } from '../api/api'

export default function ContactAdmin() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { getContact().then(r => setForm({ ...r.data, available_for: r.data.available_for?.join(', ') })) }, [])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    await updateContact({ ...form, available_for: form.available_for?.split(',').map(s=>s.trim()).filter(Boolean) })
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  if (!form) return <div className="loader-ring" style={{ margin: '80px auto' }} />

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>Contact Info</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 600 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 }}>
          {[['email','Email'],['phone','Phone'],['location','Location'],['linkedin','LinkedIn URL'],['github','GitHub URL'],['portfolio','Portfolio URL']].map(([name,label]) => (
            <div className="form-group" key={name}><label className="form-label">{label}</label><input name={name} className="neu-input" value={form[name]||''} onChange={onChange} /></div>
          ))}
          <div className="form-group">
            <label className="form-label">Available For (comma separated)</label>
            <input name="available_for" className="neu-input" value={form.available_for||''} onChange={onChange} placeholder="Freelance, Internships, Full-time" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 20 }}>
          <button type="submit" className="btn-primary" disabled={saving}>{saving?'Saving...':'Save Changes'}</button>
          {saved && <span style={{ color: '#06d6a0', fontSize: '0.85rem' }}>✅ Saved!</span>}
        </div>
      </form>
    </div>
  )
}
