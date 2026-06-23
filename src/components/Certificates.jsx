import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ShieldIcon, BookIcon, AwardIcon, FlagIcon, ExternalLinkIcon, CalendarIcon } from './Icons'

const TYPE_META = {
  professional: { label: 'Professional', color: '#00d4ff',  Icon: ShieldIcon },
  course:        { label: 'Course',       color: '#9d4edd',  Icon: BookIcon   },
  achievement:   { label: 'Achievement',  color: '#06d6a0',  Icon: AwardIcon  },
  participation: { label: 'Participation',color: '#ffd60a',  Icon: FlagIcon   },
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
        .cert-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; margin-top:36px; }
        .cert-card { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:18px; padding:24px; transition:all 0.3s; position:relative; overflow:hidden; }
        .cert-card:hover { transform:translateY(-4px); border-color:rgba(0,212,255,0.2); box-shadow:0 16px 48px rgba(0,0,0,0.35); }
        .cert-card::before { content:''; position:absolute; top:0; right:0; width:100px; height:100px; background:radial-gradient(circle,var(--cert-c,#00d4ff) 0%,transparent 70%); opacity:0.05; border-radius:0 18px 0 100px; pointer-events:none; }
        .cert-header { display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; }
        .cert-icon-box { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cert-name { font-weight:700; font-size:0.92rem; line-height:1.35; margin-bottom:3px; }
        .cert-issuer { color:var(--text-secondary); font-size:0.8rem; }
        .cert-footer { display:flex; align-items:center; justify-content:space-between; margin-top:14px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.05); }
        .cert-date { color:var(--text-muted); font-size:0.76rem; display:flex; align-items:center; gap:5px; }
        .cert-verify { font-size:0.76rem; font-weight:600; color:#00d4ff; display:flex; align-items:center; gap:4px; text-decoration:none; }
        .cert-verify:hover { opacity:0.8; }
        .cert-note { font-size:0.76rem; color:var(--text-muted); margin-top:8px; font-style:italic; }
        .cert-num { font-size:0.72rem; color:rgba(255,255,255,0.2); margin-top:4px; font-family:monospace; }
        .type-btn { padding:7px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:var(--text-muted); font-size:0.8rem; font-weight:500; cursor:pointer; transition:all 0.25s; }
        .type-btn.active { background:rgba(0,212,255,0.08); border-color:rgba(0,212,255,0.25); color:#00d4ff; }
        .type-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:6px; font-size:0.7rem; font-weight:600; }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Certificates & <span className="gradient-text">Achievements</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '36px 0' }} className="reveal">
          {types.map(t => {
            const meta = TYPE_META[t]
            return (
              <button key={t} onClick={() => setFilter(t)} className={`type-btn${filter === t ? ' active' : ''}`}
                style={filter === t && meta ? { background: `${meta.color}12`, borderColor: `${meta.color}35`, color: meta.color } : {}}>
                {t === 'all' ? 'All Credentials' : meta?.label || t}
              </button>
            )
          })}
        </div>

        <div className="cert-grid">
          {filtered.map((cert, i) => {
            const meta = TYPE_META[cert.type] || { label: cert.type, color: '#00d4ff', Icon: AwardIcon }
            const { Icon } = meta
            return (
              <div key={cert.id} className={`cert-card reveal delay-${Math.min(i % 3 + 1, 5)}`} style={{ '--cert-c': meta.color }}>
                <div className="cert-header">
                  <div className="cert-icon-box" style={{ background: `${meta.color}10`, border: `1px solid ${meta.color}22` }}>
                    <span style={{ color: meta.color }}><Icon size={20} /></span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-issuer">{cert.issuer}{cert.platform ? ` · ${cert.platform}` : ''}</div>
                  </div>
                </div>
                {cert.note && <div className="cert-note">{cert.note}</div>}
                {cert.cert_number && <div className="cert-num">{cert.cert_number}</div>}
                <div className="cert-footer">
                  <span className="cert-date"><CalendarIcon size={11} />{cert.date}</span>
                  {cert.verify_url
                    ? <a href={cert.verify_url} target="_blank" rel="noreferrer" className="cert-verify">Verify <ExternalLinkIcon size={11} /></a>
                    : <span className="type-badge" style={{ background: `${meta.color}10`, color: meta.color, border: `1px solid ${meta.color}22` }}>{meta.label}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
