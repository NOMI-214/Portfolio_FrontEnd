import { useState, useEffect } from 'react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../api/api'

const EMPTY = { name: '', category: 'Frontend', proficiency: 80, color: 'cyan', order: 0 }
const COLORS = ['cyan','purple','green','orange','pink','blue','teal','red','yellow','gray']
const CATS = ['Frontend','Backend','IoT & Systems','Tools','Networking','Security','Cloud','Language']

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || EMPTY)
  const [saving, setSaving] = useState(false)
  const onSubmit = async e => { e.preventDefault(); setSaving(true); await onSave({ ...form, proficiency: Number(form.proficiency), order: Number(form.order) }); setSaving(false) }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{item ? 'Edit' : 'Add'} Skill</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group"><label className="form-label">Name</label><input className="neu-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">Category</label>
              <select className="neu-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{CATS.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div className="form-group"><label className="form-label">Color</label>
              <select className="neu-input" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}>{COLORS.map(c => <option key={c}>{c}</option>)}</select>
            </div>
          </div>
          <div className="form-group"><label className="form-label">Proficiency: {form.proficiency}%</label>
            <input type="range" min="0" max="100" value={form.proficiency} onChange={e => setForm(f => ({ ...f, proficiency: e.target.value }))} style={{ width: '100%', accentColor: '#00d4ff' }} />
          </div>
          <div className="form-group"><label className="form-label">Order</label><input type="number" className="neu-input" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Skill'}</button>
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [modal, setModal] = useState(null)
  const load = () => getSkills().then(r => setSkills(r.data))
  useEffect(() => { load() }, [])
  const save = async payload => { if (modal.item) await updateSkill(modal.item.id, payload); else await createSkill(payload); setModal(null); load() }
  const del = async id => { if (confirm('Delete skill?')) { await deleteSkill(id); load() } }
  const grouped = skills.reduce((acc, s) => { (acc[s.category] = acc[s.category] || []).push(s); return acc }, {})

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>Skills</h1>
        <button className="btn-primary" onClick={() => setModal({ item: null })}>+ Add Skill</button>
      </div>
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{cat}</h3>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead><tr><th>Skill</th><th>Proficiency</th><th>Color</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${s.proficiency}%`, height: '100%', background: '#00d4ff', borderRadius: 3 }} />
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minWidth: 32 }}>{s.proficiency}%</span>
                      </div>
                    </td>
                    <td><span className={`tag tag-${s.color === 'gray' ? '' : s.color}`} style={{ fontSize: '0.72rem' }}>{s.color}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{s.order}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-ghost" onClick={() => setModal({ item: s })}>Edit</button>
                      <button className="btn-ghost" onClick={() => del(s.id)} style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,35,60,0.2)' }}>Delete</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {modal && <Modal item={modal.item} onClose={() => setModal(null)} onSave={save} />}
    </div>
  )
}
