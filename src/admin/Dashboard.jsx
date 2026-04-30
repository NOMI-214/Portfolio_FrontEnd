import { useEffect, useState } from 'react'
import { getStats } from '../api/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => { getStats().then(r => setStats(r.data)).catch(() => {}) }, [])

  const cards = [
    { label: 'Projects', value: stats?.projects ?? '—', icon: '🚀', color: '#00d4ff' },
    { label: 'Skills', value: stats?.skills ?? '—', icon: '⚡', color: '#9d4edd' },
    { label: 'Certificates', value: stats?.certificates ?? '—', icon: '🏆', color: '#06d6a0' },
    { label: 'Experience', value: stats?.experience ?? '—', icon: '💼', color: '#ffd60a' },
    { label: 'Messages', value: stats?.messages ?? '—', icon: '✉️', color: '#fb8500' },
    { label: 'Unread', value: stats?.unread_messages ?? '—', icon: '🔔', color: '#ef233c' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>Welcome back 👋</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Here's an overview of your portfolio content.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 20, marginBottom: 40 }}>
        {cards.map(c => (
          <div key={c.label} className="admin-stat-card">
            <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{c.icon}</div>
            <div className="admin-stat-number" style={{ color: c.color }}>{c.value}</div>
            <div className="admin-stat-label">{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 28px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 16 }}>Quick Links</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {[['🚀 Add Project', '/admin/projects'], ['⚡ Add Skill', '/admin/skills'], ['✉️ Read Messages', '/admin/messages']].map(([label, href]) => (
            <a key={label} href={href} className="btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>{label}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
