import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const STATUS_COLOR = { 'Live': '#06d6a0', 'In Progress': '#ffd60a', 'Completed': '#00d4ff' }

export default function Projects() {
  const { data } = usePortfolio()
  const projects = data?.projects || []
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(projects.map(p => p.category))]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section">
      <style>{`
        .projects-filters { display: flex; gap: 10px; flex-wrap: wrap; margin: 40px 0 48px; }
        .filter-btn { padding: 8px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: var(--text-secondary); font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all 0.3s; }
        .filter-btn:hover { border-color: rgba(0,212,255,0.3); color: var(--text-primary); }
        .filter-btn.active { background: rgba(0,212,255,0.12); border-color: rgba(0,212,255,0.4); color: #00d4ff; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(340px,1fr)); gap: 24px; }
        .project-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; display: flex; flex-direction: column; transition: all 0.35s ease; position: relative; overflow: hidden; }
        .project-card::before { content:''; position:absolute; inset:0; background: linear-gradient(135deg,rgba(0,212,255,0.04),transparent); opacity:0; transition:opacity 0.35s; }
        .project-card:hover { transform: translateY(-6px); border-color: rgba(0,212,255,0.25); box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,212,255,0.08); }
        .project-card:hover::before { opacity:1; }
        .project-card.featured { border-color: rgba(0,212,255,0.2); background: rgba(0,212,255,0.04); }
        .project-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
        .project-icon { width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg,rgba(0,212,255,0.15),rgba(157,78,221,0.15)); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 1px solid rgba(0,212,255,0.15); }
        .project-status { padding: 4px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
        .project-title { font-family: var(--font-heading); font-weight: 700; font-size: 1.15rem; margin-bottom: 10px; }
        .project-desc { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.7; flex: 1; margin-bottom: 20px; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .project-links { display: flex; gap: 10px; }
        .proj-link { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; transition: all 0.3s; border: 1px solid; }
        .proj-link.live { background: rgba(0,212,255,0.08); border-color: rgba(0,212,255,0.25); color: #00d4ff; }
        .proj-link.live:hover { background: rgba(0,212,255,0.15); }
        .proj-link.github { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); color: var(--text-secondary); }
        .proj-link.github:hover { background: rgba(255,255,255,0.08); color: var(--text-primary); }
        .featured-badge { position: absolute; top: 16px; right: 16px; padding: 3px 10px; background: linear-gradient(135deg,#00d4ff,#9d4edd); border-radius: 20px; font-size: 0.7rem; font-weight: 700; color: #fff; }
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
            const icons = { 'IoT / Full Stack': '🔌', Frontend: '🎨', 'JavaScript Application': '⚡', 'JavaScript Game': '🎮', Portfolio: '💼', Default: '🚀' }
            const icon = icons[p.category] || icons.Default
            return (
              <div key={p.id} className={`project-card reveal delay-${Math.min(i % 3 + 1, 5)}${p.featured ? ' featured' : ''}`}>
                {p.featured && <div className="featured-badge">⭐ FYP</div>}
                <div className="project-top">
                  <div className="project-icon">{icon}</div>
                  <div className="project-status" style={{ background: `${statusColor}18`, color: statusColor, border: `1px solid ${statusColor}40` }}>{p.status}</div>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags?.slice(0, 5).map(tag => <span key={tag} className="tag" style={{ fontSize: '0.72rem' }}>{tag}</span>)}
                </div>
                <div className="project-links">
                  {p.live_link && <a href={p.live_link} target="_blank" rel="noreferrer" className="proj-link live">🔗 Live</a>}
                  {p.github_link && <a href={p.github_link} target="_blank" rel="noreferrer" className="proj-link github">GitHub</a>}
                  {!p.live_link && !p.github_link && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Coming soon</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
