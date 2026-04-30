import { usePortfolio } from '../context/PortfolioContext'

export default function Experience() {
  const { data } = usePortfolio()
  const experience = data?.experience || []
  const work = experience.filter(e => e.type === 'work')
  const education = experience.filter(e => e.type === 'education')

  const Panel = ({ items, title, icon }) => (
    <div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)' }}>
        <span style={{ fontSize: '1.3rem' }}>{icon}</span>{title}
      </h3>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,rgba(0,212,255,0.5),rgba(157,78,221,0.2))', borderRadius: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {items.map((item, i) => (
            <div key={item.id} className={`reveal delay-${Math.min(i+1,4)}`} style={{ paddingLeft: 44, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 8, top: 6, width: 14, height: 14, background: item.current ? '#00d4ff' : 'rgba(0,212,255,0.3)', borderRadius: '50%', border: '2px solid rgba(0,212,255,0.5)', boxShadow: item.current ? '0 0 10px rgba(0,212,255,0.5)' : 'none' }} />
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 24px', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; e.currentTarget.style.background = 'rgba(0,212,255,0.03)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem' }}>{item.title}</h4>
                  {item.current && <span style={{ padding: '2px 10px', background: 'rgba(0,212,255,0.1)', color: '#00d4ff', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(0,212,255,0.2)' }}>Current</span>}
                </div>
                <div style={{ color: '#00d4ff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{item.organization}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 12, display: 'flex', gap: 12 }}>
                  <span>📍 {item.location}</span><span>📅 {item.duration}</span>
                </div>
                {item.bullets?.length > 0 && (
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {item.bullets.map((b, j) => (
                      <li key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 4 }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section id="experience" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 60px' }}>
          <p className="section-label">My Journey</p>
          <h2 className="section-title">Work & <span className="gradient-text">Education</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <Panel items={work} title="Work Experience" icon="💼" />
          <Panel items={education} title="Education" icon="🎓" />
        </div>
      </div>
      <style>{`@media(max-width:768px){#experience .container > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
