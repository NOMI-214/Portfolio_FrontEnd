import { useState, useEffect } from 'react'
import { getCertificates, createCert, updateCert, deleteCert } from '../api/api'

const EMPTY = { name: '', issuer: '', platform: '', date: '', type: 'course', verify_url: '', cert_number: '', note: '', order: 0 }
const TYPES = ['course', 'professional', 'achievement', 'participation']

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || EMPTY)
  const [saving, setSaving] = useState(false)
  const onSubmit = async e => { e.preventDefault(); setSaving(true); await onSave({ ...form, order: Number(form.order) }); setSaving(false) }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 className="modal-title" style={{ margin: 0 }}>{item ? 'Edit' : 'Add'} Certificate</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>×</button>
        </div>
        <form onSubmit={onSubmit}>
          {[['name','Certificate Name',true],['issuer','Issuer',true],['platform','Platform (e.g. Coursera)',false],['date','Date',true],['verify_url','Verify URL',false],['cert_number','Certificate Number',false],['note','Note',false]].map(([name,label,req]) => (
            <div className="form-group" key={name}><label className="form-label">{label}</label><input className="neu-input" value={form[name]||''} onChange={e=>setForm(f=>({...f,[name]:e.target.value}))} required={req} /></div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">Type</label>
              <select className="neu-input" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{TYPES.map(t=><option key={t}>{t}</option>)}</select>
            </div>
            <div className="form-group"><label className="form-label">Order</label><input type="number" className="neu-input" value={form.order} onChange={e=>setForm(f=>({...f,order:e.target.value}))} /></div>
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

export default function CertificatesAdmin() {
  const [certs, setCerts] = useState([])
  const [modal, setModal] = useState(null)
  const load = () => getCertificates().then(r => setCerts(r.data))
  useEffect(() => { load() }, [])
  const save = async p => { if (modal.item) await updateCert(modal.item.id,p); else await createCert(p); setModal(null); load() }
  const del = async id => { if (confirm('Delete?')) { await deleteCert(id); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>Certificates</h1>
        <button className="btn-primary" onClick={() => setModal({ item: null })}>+ Add Certificate</button>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Issuer</th><th>Type</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {certs.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{c.issuer}</td>
                <td><span className="tag" style={{ fontSize: '0.72rem' }}>{c.type}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{c.date}</td>
                <td><div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setModal({ item: c })}>Edit</button>
                  <button className="btn-ghost" onClick={() => del(c.id)} style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,35,60,0.2)' }}>Delete</button>
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
