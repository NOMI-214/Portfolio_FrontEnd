import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/admin')
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, background: 'linear-gradient(135deg,#00d4ff,#9d4edd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}>MN Admin</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Portfolio Dashboard</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 36 }}>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="neu-input" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required placeholder="admin" />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <input className="neu-input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="••••••••" />
            </div>
            {error && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: 16, textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <a href="/" style={{ color: '#00d4ff' }}>← Back to Portfolio</a>
        </p>
      </div>
    </div>
  )
}
