import { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../api/api'

const EMPTY = { title: '', description: '', tech_stack: '', tags: '', category: 'Frontend', status: 'Completed', live_link: '', github_link: '', featured: false, order: 0 }

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item ? { ...item, tech_stack: item.tech_stack?.join(', '), tags: item.tags?.join(', ') } : EMPTY)
  const [saving, setSaving] = useState(false)

  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean), tags: form.tags.split(',').map(s => s.trim()).filter(Boolean), order: Number(form.order) }
    await onSave(payload); setSaving(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{item ? 'Edit' : 'Add'} Project</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          {[['title','Title','text',true],['description','Description','textarea',true],['tech_stack','Tech Stack (comma separated)','text',false],['tags','Tags (comma separated)','text',false],['live_link','Live URL','url',false],['github_link','GitHub URL','url',false]].map(([name, label, type, req]) => (
            <div className="form-group" key={name}>
              <label className="form-label">{label}</label>
              {type === 'textarea'
                ? <textarea name={name} rows={3} value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required={req} className="neu-input" />
                : <input name={name} type={type} value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required={req} className="neu-input" />}
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="neu-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {['Frontend','Backend','IoT / Full Stack','JavaScript Application','JavaScript Game','Portfolio'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="neu-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                {['Completed','Live','In Progress'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Order</label>
              <input type="number" className="neu-input" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
            </div>
            <div className="form-group" style={{ flex: 1, display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                Featured / FYP
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Project'}</button>
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [modal, setModal] = useState(null)

  const load = () => getProjects().then(r => setProjects(r.data))
  useEffect(() => { load() }, [])

  const save = async payload => {
    if (modal.item) await updateProject(modal.item.id, payload)
    else await createProject(payload)
    setModal(null); load()
  }

  const del = async id => { if (confirm('Delete project?')) { await deleteProject(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>Projects</h1>
        <button className="btn-primary" onClick={() => setModal({ item: null })}>+ Add Project</button>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Featured</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 500 }}>{p.title}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.category}</td>
                <td><span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: p.status === 'Live' ? 'rgba(6,214,160,0.12)' : 'rgba(0,212,255,0.08)', color: p.status === 'Live' ? '#06d6a0' : '#00d4ff' }}>{p.status}</span></td>
                <td>{p.featured ? '⭐' : '—'}</td>
                <td style={{ color: 'var(--text-muted)' }}>{p.order}</td>
                <td><div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setModal({ item: p })}>Edit</button>
                  <button className="btn-ghost" onClick={() => del(p.id)} style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,35,60,0.2)' }}>Delete</button>
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
