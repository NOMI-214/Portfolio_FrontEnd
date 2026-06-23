import { usePortfolio } from '../context/PortfolioContext'
import { CalendarIcon, MapPinIcon } from './Icons'

export default function Experience() {
  const { data } = usePortfolio()
  const experience = data?.experience || []
  const work = experience.filter(e => e.type === 'work')
  const education = experience.filter(e => e.type === 'education')

  const Panel = ({ items, title, icon }) => (
    <div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', letterSpacing: '.3px' }}>
        <span style={{ fontSize: '1.1rem' }}>{icon}</span>{title}
      </h3>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 13, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom,rgba(0,212,255,0.4),rgba(157,78,221,0.15))', borderRadius: 1 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map((item, i) => (
            <div key={item.id} className={`reveal delay-${Math.min(i+1,4)}`} style={{ paddingLeft: 40, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 7, top: 14, width: 12, height: 12, background: item.current ? '#00d4ff' : 'rgba(255,255,255,0.08)', borderRadius: '50%', border: item.current ? '2px solid rgba(0,212,255,0.4)' : '1.5px solid rgba(255,255,255,0.15)', boxShadow: item.current ? '0 0 10px rgba(0,212,255,0.45)' : 'none' }} />
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 22px', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.18)'; e.currentTarget.style.background = 'rgba(0,212,255,0.025)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</h4>
                  {item.current && <span style={{ padding: '2px 10px', background: 'rgba(0,212,255,0.1)', color: '#00d4ff', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, border: '1px solid rgba(0,212,255,0.2)', letterSpacing: '.3px' }}>CURRENT</span>}
                </div>
                <div style={{ color: '#00d4ff', fontWeight: 600, fontSize: '0.88rem', marginBottom: 8 }}>{item.organization}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <MapPinIcon />{item.location}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <CalendarIcon />{item.duration}
                  </span>
                </div>
                {item.bullets?.length > 0 && (
                  <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
                    {item.bullets.map((b, j) => (
                      <li key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.75, marginBottom: 5, paddingLeft: 14, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: '0.55em', width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,212,255,0.5)', display: 'block' }} />
                        {b}
                      </li>
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
          <Panel items={work} title="Work Experience" icon="◈" />
          <Panel items={education} title="Education" icon="◇" />
        </div>
      </div>
      <style>{`@media(max-width:768px){#experience .container > div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
