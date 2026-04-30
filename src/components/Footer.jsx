import { usePortfolio } from '../context/PortfolioContext'

export default function Footer() {
  const { data } = usePortfolio()
  const contact = data?.contact || {}
  const year = new Date().getFullYear()

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ]

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 0 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(135deg,#00d4ff,#9d4edd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 12 }}>
              Muhammad Nouman
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Full Stack Developer · Frontend Engineer · IoT Engineer building premium digital experiences.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {contact.github && <a href={contact.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '8px 14px' }}>GitHub</a>}
              {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: '8px 14px' }}>LinkedIn</a>}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s', padding: 0 }}
                  onMouseEnter={e => e.target.style.color = '#00d4ff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={`mailto:${contact.email}`} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#00d4ff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                {contact.email || 'nomikhan201460@gmail.com'}
              </a>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{contact.phone || '(+92) 3482014604'}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{contact.location || 'Mardan, Pakistan'}</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© {year} Muhammad Nouman. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Built with <span style={{ color: '#00d4ff' }}>React</span> + <span style={{ color: '#06d6a0' }}>FastAPI</span> · NeoGlass X UI</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer .container > div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}
