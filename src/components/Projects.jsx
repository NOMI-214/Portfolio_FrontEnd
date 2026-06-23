import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ExternalLinkIcon, GitHubIcon } from './Icons'

const STATUS_COLOR = { 'Live': '#06d6a0', 'In Progress': '#ffd60a', 'Completed': '#00d4ff' }

const CAT_ABBR = {
  'IoT / Full Stack': 'IoT',
  'Frontend': 'FE',
  'JavaScript Application': 'JS',
  'JavaScript Game': 'GM',
  'Portfolio': 'PF',
}

const CAT_GRADIENT = {
  'IoT / Full Stack':        'linear-gradient(135deg,#2ec4b6,#06d6a0)',
  'Frontend':                'linear-gradient(135deg,#00d4ff,#4361ee)',
  'JavaScript Application':  'linear-gradient(135deg,#ffd60a,#fb8500)',
  'JavaScript Game':         'linear-gradient(135deg,#9d4edd,#f72585)',
  'Portfolio':               'linear-gradient(135deg,#4361ee,#9d4edd)',
}

export default function Projects() {
  const { data } = usePortfolio()
  const projects = data?.projects || []
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section">
      <style>{`
        .projects-filters { display:flex; gap:8px; flex-wrap:wrap; margin:36px 0 48px; }
        .filter-btn { padding:7px 18px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:var(--text-muted); font-size:0.82rem; font-weight:500; cursor:pointer; transition:all 0.25s; }
        .filter-btn:hover { border-color:rgba(0,212,255,0.25); color:var(--text-primary); }
        .filter-btn.active { background:rgba(0,212,255,0.08); border-color:rgba(0,212,255,0.3); color:#00d4ff; }
        .projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:22px; }
        .project-card { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:26px; display:flex; flex-direction:column; transition:all 0.35s ease; position:relative; overflow:hidden; }
        .project-card::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(0,212,255,0.03),transparent 60%); opacity:0; transition:opacity 0.35s; pointer-events:none; }
        .project-card:hover { transform:translateY(-6px); border-color:rgba(0,212,255,0.2); box-shadow:0 16px 48px rgba(0,0,0,0.45), 0 0 30px rgba(0,212,255,0.06); }
        .project-card:hover::after { opacity:1; }
        .project-card.featured { border-color:rgba(0,212,255,0.18); background:rgba(0,212,255,0.025); }
        .cat-badge { position:absolute; top:16px; right:16px; padding:4px 12px; border-radius:6px; font-size:0.68rem; font-weight:700; letter-spacing:.5px; }
        .fyp-badge { position:absolute; top:16px; right:16px; padding:3px 10px; background:linear-gradient(135deg,#00d4ff,#9d4edd); border-radius:6px; font-size:0.68rem; font-weight:700; color:#fff; letter-spacing:.5px; }
        .proj-icon { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; flex-shrink:0; }
        .proj-abbr { font-family:var(--font-heading); font-size:0.7rem; font-weight:800; color:#fff; letter-spacing:.5px; }
        .project-status { display:inline-flex; align-items:center; gap:6px; padding:3px 10px; border-radius:6px; font-size:0.7rem; font-weight:600; margin-bottom:12px; }
        .status-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }
        .project-title { font-family:var(--font-heading); font-weight:700; font-size:1.1rem; margin-bottom:10px; }
        .project-desc { color:var(--text-secondary); font-size:0.86rem; line-height:1.72; flex:1; margin-bottom:18px; }
        .project-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; }
        .project-links { display:flex; gap:8px; margin-top:auto; }
        .proj-link { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:8px; font-size:0.8rem; font-weight:600; transition:all 0.25s; border:1px solid; }
        .proj-link.live { background:rgba(0,212,255,0.07); border-color:rgba(0,212,255,0.22); color:#00d4ff; }
        .proj-link.live:hover { background:rgba(0,212,255,0.14); }
        .proj-link.gh { background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.1); color:var(--text-secondary); }
        .proj-link.gh:hover { background:rgba(255,255,255,0.07); color:var(--text-primary); }
        .proj-coming { font-size:0.78rem; color:var(--text-muted); padding:7px 0; }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">My Work</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>

        <div className="projects-filters reveal">
          {categories.map(c => (
            <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => {
            const statusColor = STATUS_COLOR[p.status] || '#00d4ff'
            const gradient = CAT_GRADIENT[p.category] || 'linear-gradient(135deg,#00d4ff,#9d4edd)'
            const abbr = CAT_ABBR[p.category] || '<>'
            return (
              <div key={p.id} className={`project-card reveal delay-${Math.min(i % 3 + 1, 5)}${p.featured ? ' featured' : ''}`}>
                {p.featured
                  ? <div className="fyp-badge">FYP</div>
                  : <div className="cat-badge" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>{p.category}</div>
                }
                <div className="proj-icon" style={{ background: gradient, boxShadow: `0 4px 16px rgba(0,212,255,0.15)` }}>
                  <span className="proj-abbr">{abbr}</span>
                </div>
                <div className="project-status" style={{ background: `${statusColor}10`, color: statusColor, border: `1px solid ${statusColor}25` }}>
                  <span className="status-dot" style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
                  {p.status}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags?.slice(0, 5).map(tag => (
                    <span key={tag} className="tag" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {p.live_link && <a href={p.live_link} target="_blank" rel="noreferrer" className="proj-link live"><ExternalLinkIcon size={12} /> Live</a>}
                  {p.github_link && <a href={p.github_link} target="_blank" rel="noreferrer" className="proj-link gh"><GitHubIcon size={14} /> GitHub</a>}
                  {!p.live_link && !p.github_link && <span className="proj-coming">Coming soon</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
