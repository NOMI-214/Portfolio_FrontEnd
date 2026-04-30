import { useState, useEffect } from 'react'
import { getExperience, createExp, updateExp, deleteExp } from '../api/api'

const EMPTY = { type: 'work', title: '', organization: '', location: '', duration: '', description: '', bullets: '', current: false, order: 0 }

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item ? { ...item, bullets: item.bullets?.join('\n') } : EMPTY)
  const [saving, setSaving] = useState(false)
  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    await onSave({ ...form, bullets: form.bullets.split('\n').map(b => b.trim()).filter(Boolean), order: Number(form.order) })
    setSaving(false)
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{item ? 'Edit' : 'Add'} Experience</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">Type</label>
              <select className="neu-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}><option value="work">Work</option><option value="education">Education</option></select>
            </div>
            <div className="form-group"><label className="form-label">Order</label><input type="number" className="neu-input" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} /></div>
          </div>
          {[['title','Title',true],['organization','Organization/Company',true],['location','Location',false],['duration','Duration (e.g. Jan 2025 – Present)',false],['description','Short Description',false]].map(([name,label,req]) => (
            <div className="form-group" key={name}><label className="form-label">{label}</label><input className="neu-input" value={form[name]||''} onChange={e => setForm(f=>({...f,[name]:e.target.value}))} required={req} /></div>
          ))}
          <div className="form-group">
            <label className="form-label">Bullet Points (one per line)</label>
            <textarea className="neu-input" rows={5} value={form.bullets||''} onChange={e => setForm(f=>({...f,bullets:e.target.value}))} placeholder="One bullet point per line" />
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={form.current} onChange={e => setForm(f=>({...f,current:e.target.checked}))} /> Currently working here
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving?'Saving...':'Save'}</button>
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ExperienceAdmin() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const load = () => getExperience().then(r => setItems(r.data))
  useEffect(() => { load() }, [])
  const save = async p => { if (modal.item) await updateExp(modal.item.id, p); else await createExp(p); setModal(null); load() }
  const del = async id => { if (confirm('Delete?')) { await deleteExp(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>Experience</h1>
        <button className="btn-primary" onClick={() => setModal({ item: null })}>+ Add Entry</button>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead><tr><th>Type</th><th>Title</th><th>Organization</th><th>Duration</th><th>Current</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td><span className={`tag ${item.type === 'work' ? '' : 'tag-purple'}`} style={{ fontSize: '0.72rem' }}>{item.type}</span></td>
                <td style={{ fontWeight: 500 }}>{item.title}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.organization}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{item.duration}</td>
                <td>{item.current ? '✅' : '—'}</td>
                <td><div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setModal({ item })}>Edit</button>
                  <button className="btn-ghost" onClick={() => del(item.id)} style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,35,60,0.2)' }}>Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && <Modal item={modal.item} onClose={() => setModal(null)} onSave={save} />}
    </div>
  )
}
