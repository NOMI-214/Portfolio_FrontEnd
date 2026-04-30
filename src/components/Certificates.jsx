import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const TYPE_META = {
  professional: { label: 'Professional', color: '#00d4ff', icon: '🏆' },
  course:        { label: 'Course',       color: '#9d4edd', icon: '📚' },
  achievement:   { label: 'Achievement',  color: '#06d6a0', icon: '⭐' },
  participation: { label: 'Participation',color: '#ffd60a', icon: '🎯' },
}

export default function Certificates() {
  const { data } = usePortfolio()
  const certs = data?.certificates || []
  const [filter, setFilter] = useState('all')

  const types = ['all', ...new Set(certs.map(c => c.type))]
  const filtered = filter === 'all' ? certs : certs.filter(c => c.type === filter)

  return (
    <section id="certificates" className="section">
      <style>{`
        .cert-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(300px,1fr)); gap: 20px; margin-top: 40px; }
        .cert-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 24px; transition: all 0.3s; position: relative; overflow: hidden; }
        .cert-card::after { content:''; position:absolute; top:0; right:0; width:80px; height:80px; background: radial-gradient(circle,var(--c) 0%,transparent 70%); opacity:0.08; border-radius:0 18px 0 80px; }
        .cert-card:hover { transform:translateY(-4px); border-color: rgba(0,212,255,0.25); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .cert-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .cert-icon { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
        .cert-name { font-weight:700; font-size:0.95rem; line-height:1.3; }
        .cert-issuer { color:var(--text-secondary); font-size:0.82rem; margin-top:2px; }
        .cert-footer { display:flex; align-items:center; justify-content:space-between; margin-top:16px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.05); }
        .cert-date { color:var(--text-muted); font-size:0.78rem; }
        .cert-verify { font-size:0.78rem; font-weight:600; color:#00d4ff; }
        .cert-note { font-size:0.78rem; color:var(--text-muted); margin-top:8px; font-style:italic; }
        .cert-num { font-size:0.75rem; color:var(--text-muted); margin-top:4px; }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certificates & <span className="gradient-text">Achievements</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '36px 0' }} className="reveal">
          {types.map(t => {
            const meta = TYPE_META[t] || { label: t, color: '#00d4ff' }
            return (
              <button key={t} onClick={() => setFilter(t)} className="filter-btn" style={{ background: filter === t ? `${meta.color}18` : 'rgba(255,255,255,0.03)', borderColor: filter === t ? `${meta.color}55` : 'rgba(255,255,255,0.1)', color: filter === t ? meta.color : 'var(--text-secondary)', padding: '7px 18px', borderRadius: 30, border: '1px solid', fontSize: '0.83rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s' }}>
                {t === 'all' ? 'All' : `${meta.icon} ${meta.label}`}
              </button>
            )
          })}
        </div>

        <div className="cert-grid">
          {filtered.map((cert, i) => {
            const meta = TYPE_META[cert.type] || { label: cert.type, color: '#00d4ff', icon: '📜' }
            return (
              <div key={cert.id} className={`cert-card reveal delay-${Math.min(i % 3 + 1, 5)}`} style={{ '--c': meta.color }}>
                <div className="cert-header">
                  <div className="cert-icon" style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}30` }}>{meta.icon}</div>
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-issuer">{cert.issuer}{cert.platform ? ` · ${cert.platform}` : ''}</div>
                  </div>
                </div>
                {cert.note && <div className="cert-note">{cert.note}</div>}
                {cert.cert_number && <div className="cert-num">ID: {cert.cert_number}</div>}
                <div className="cert-footer">
                  <span className="cert-date">📅 {cert.date}</span>
                  {cert.verify_url
                    ? <a href={cert.verify_url} target="_blank" rel="noreferrer" className="cert-verify">Verify ↗</a>
                    : <span className="tag" style={{ fontSize: '0.72rem', background: `${meta.color}12`, color: meta.color, border: `1px solid ${meta.color}25` }}>{meta.label}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
