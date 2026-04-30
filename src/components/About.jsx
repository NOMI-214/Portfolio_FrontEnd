import { usePortfolio } from '../context/PortfolioContext'

function OrbitRing({ items, radius, duration, reverse = false }) {
  return (
    <div style={{ position: 'absolute', width: radius * 2, height: radius * 2, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', animation: `spin ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360
        const rad = (angle * Math.PI) / 180
        const x = radius * Math.cos(rad)
        const y = radius * Math.sin(rad)
        return (
          <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`, animation: `spin ${duration}s linear infinite${reverse ? ' reverse' : ''} reverse` }}>
            <span style={{ display: 'block', padding: '4px 10px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, color: '#00d4ff', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}>{item}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function About() {
  const { data } = usePortfolio()
  const about = data?.about || {}

  const inner = about.orbit_inner || ['React.js', 'JavaScript', 'Python', 'FastAPI']
  const middle = about.orbit_middle || ['HTML5', 'CSS3', 'Tailwind', 'MongoDB', 'Git']
  const outer = about.orbit_outer || ['IoT', 'CCNA', 'CEH', 'Bootstrap', 'SQL', 'AWS']

  return (
    <section id="about" className="section">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .orbit-wrapper { position: relative; width: 480px; height: 480px; margin: 0 auto; overflow: visible; }
        .orbit-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 90px; height: 90px; background: linear-gradient(135deg,rgba(0,212,255,0.2),rgba(157,78,221,0.2)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 700; font-size: 1.1rem; border: 2px solid rgba(0,212,255,0.35); box-shadow: 0 0 30px rgba(0,212,255,0.25), inset 0 0 20px rgba(0,212,255,0.08); z-index: 2; }
        .tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } .orbit-wrapper { width: 300px; height: 300px; } }
      `}</style>

      <div className="container">
        <div className="about-grid">
          <div className="reveal-left">
            <div className="orbit-wrapper">
              <OrbitRing items={inner} radius={105} duration={10} />
              <OrbitRing items={middle} radius={165} duration={18} reverse />
              <OrbitRing items={outer} radius={220} duration={26} />
              <div className="orbit-center">MN</div>
            </div>
          </div>

          <div className="reveal-right">
            <p className="section-label">About Me</p>
            <h2 className="section-title">Passionate Developer<br /><span className="gradient-text">& IoT Engineer</span></h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '20px' }}>
              {about.long_bio?.split('\n\n')[0] || `I'm Muhammad Nouman, a BS Computer Science student at UET Mardan with a deep passion for frontend development, UI/UX design, and IoT systems.`}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '28px' }}>
              {about.long_bio?.split('\n\n')[1] || `With hands-on internship experience at Developers Hub Corporation and EziTech Institute, I build scalable, pixel-perfect web experiences.`}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              {[
                { label: 'Degree', value: 'BS Computer Science' },
                { label: 'University', value: 'UET Mardan' },
                { label: 'Location', value: 'Mardan, Pakistan' },
                { label: 'Status', value: 'Open to Work' },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={about.cv_url || '/resume.pdf'} download className="btn-primary">Download CV</a>
              <a href={`mailto:${data?.contact?.email || 'nomikhan201460@gmail.com'}`} className="btn-outline">Email Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
