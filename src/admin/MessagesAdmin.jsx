import { useState, useEffect } from 'react'
import { getMessages, markRead, deleteMessage } from '../api/api'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)
  const load = () => getMessages().then(r => setMessages(r.data))
  useEffect(() => { load() }, [])

  const open = async msg => {
    setSelected(msg)
    if (!msg.read) { await markRead(msg.id); load() }
  }

  const del = async id => { if (confirm('Delete message?')) { await deleteMessage(id); setSelected(null); load() } }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>Messages <span style={{ fontSize: '0.85rem', color: 'var(--accent-red)', fontWeight: 400 }}>({messages.filter(m => !m.read).length} unread)</span></h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          <table className="admin-table">
            <thead><tr><th>From</th><th>Subject</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {messages.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '32px' }}>No messages yet</td></tr>}
              {messages.map(m => (
                <tr key={m.id} onClick={() => open(m)} style={{ cursor: 'pointer', background: selected?.id === m.id ? 'rgba(0,212,255,0.04)' : m.read ? '' : 'rgba(0,212,255,0.02)' }}>
                  <td>
                    {!m.read && <span style={{ display: 'inline-block', width: 7, height: 7, background: '#00d4ff', borderRadius: '50%', marginRight: 8 }} />}
                    <span style={{ fontWeight: m.read ? 400 : 600 }}>{m.name}</span>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.email}</div>
                  </td>
                  <td style={{ color: m.read ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: m.read ? 400 : 500, fontSize: '0.88rem' }}>{m.subject}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                  <td><button className="btn-ghost" onClick={e => { e.stopPropagation(); del(m.id) }} style={{ color: 'var(--accent-red)' }}>Del</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{selected.subject}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600 }}>{selected.name}</div>
              <a href={`mailto:${selected.email}`} style={{ color: '#00d4ff', fontSize: '0.85rem' }}>{selected.email}</a>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: 20 }}>{new Date(selected.created_at).toLocaleString()}</div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{selected.message}</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>Reply</a>
              <button onClick={() => del(selected.id)} className="btn-outline" style={{ color: 'var(--accent-red)', borderColor: 'rgba(239,35,60,0.3)', fontSize: '0.85rem', padding: '10px 20px' }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
