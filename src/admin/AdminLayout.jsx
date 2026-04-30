import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/projects', label: 'Projects', icon: '🚀' },
  { to: '/admin/skills', label: 'Skills', icon: '⚡' },
  { to: '/admin/experience', label: 'Experience', icon: '💼' },
  { to: '/admin/certificates', label: 'Certificates', icon: '🏆' },
  { to: '/admin/about', label: 'About', icon: '👤' },
  { to: '/admin/contact', label: 'Contact', icon: '📬' },
  { to: '/admin/messages', label: 'Messages', icon: '✉️' },
]

export default function AdminLayout() {
  const { admin, logout, loading } = useAuth()
  if (loading) return <div style={{ minHeight: '100vh', background: '#07070f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader-ring" /></div>
  if (!admin) return <Navigate to="/admin/login" replace />

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span className="gradient-text">MN Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}>
              <span>{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '0 16px 16px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 8, padding: '10px 4px' }}>🌐 View Portfolio</a>
          <button onClick={logout} style={{ width: '100%', padding: '10px', background: 'rgba(239,35,60,0.08)', border: '1px solid rgba(239,35,60,0.2)', borderRadius: 10, color: 'var(--accent-red)', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>
            Sign Out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Portfolio Dashboard</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, background: '#06d6a0', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{admin.username}</span>
          </div>
        </header>
        <div className="admin-content"><Outlet /></div>
      </main>
    </div>
  )
}
