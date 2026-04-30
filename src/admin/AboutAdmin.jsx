import { useState, useEffect } from 'react'
import { getAbout, updateAbout } from '../api/api'

export default function AboutAdmin() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getAbout().then(r => setForm({ ...r.data, orbit_inner: r.data.orbit_inner?.join(', '), orbit_middle: r.data.orbit_middle?.join(', '), orbit_outer: r.data.orbit_outer?.join(', ') }))
  }, [])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, orbit_inner: form.orbit_inner?.split(',').map(s=>s.trim()).filter(Boolean), orbit_middle: form.orbit_middle?.split(',').map(s=>s.trim()).filter(Boolean), orbit_outer: form.orbit_outer?.split(',').map(s=>s.trim()).filter(Boolean) }
    await updateAbout(payload)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  if (!form) return <div className="loader-ring" style={{ margin: '80px auto' }} />

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>About Section</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 700 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 20, fontSize: '1rem' }}>Hero Info</h3>
          {[['name','Full Name'],['title','Title / Roles'],['tagline','Tagline'],['cv_url','CV URL'],['profile_image','Profile Image URL']].map(([name,label]) => (
            <div className="form-group" key={name}><label className="form-label">{label}</label><input name={name} className="neu-input" value={form[name]||''} onChange={onChange} /></div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 20, fontSize: '1rem' }}>Bio</h3>
          <div className="form-group"><label className="form-label">Short Bio (Hero section)</label><textarea name="short_bio" rows={3} className="neu-input" value={form.short_bio||''} onChange={onChange} /></div>
          <div className="form-group"><label className="form-label">Long Bio (About section)</label><textarea name="long_bio" rows={8} className="neu-input" value={form.long_bio||''} onChange={onChange} /></div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 20, fontSize: '1rem' }}>Orbit Labels (comma separated)</h3>
          {[['orbit_inner','Inner Ring'],['orbit_middle','Middle Ring'],['orbit_outer','Outer Ring']].map(([name,label]) => (
            <div className="form-group" key={name}><label className="form-label">{label}</label><input name={name} className="neu-input" value={form[name]||''} onChange={onChange} /></div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="submit" className="btn-primary" disabled={saving}>{saving?'Saving...':'Save Changes'}</button>
          {saved && <span style={{ color: '#06d6a0', fontSize: '0.85rem' }}>✅ Saved!</span>}
        </div>
      </form>
    </div>
  )
}
