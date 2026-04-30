import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const n = parseInt(target)
        let start = 0
        const step = Math.ceil(n / 40)
        const id = setInterval(() => {
          start += step
          if (start >= n) { setCount(n); clearInterval(id) }
          else setCount(start)
        }, 40)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const ORBIT_TECH = [
  { label: 'React', angle: 0 },
  { label: 'Node.js', angle: 90 },
  { label: 'MongoDB', angle: 180 },
  { label: 'FastAPI', angle: 270 },
]

export default function Hero() {
  const { data } = usePortfolio()
  const about = data?.about || {}

  const stats = about.stats || [
    { value: '6+', label: 'Projects Built' },
    { value: '7+', label: 'Certifications' },
    { value: '2', label: 'Internships' },
    { value: '15+', label: 'Technologies' },
  ]

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative' }}>
      <style>{`
        .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; }
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2); border-radius: 30px; font-size: 0.85rem; color: #00d4ff; margin-bottom: 24px; animation: fadeSlideDown 0.8s ease both; }
        .hero-tag::before { content:''; width:8px; height:8px; background:#00d4ff; border-radius:50%; animation: hpulse 2s infinite; }
        .hero-name { font-family: var(--font-heading); font-size: clamp(2.6rem,5vw,4rem); font-weight: 700; line-height: 1.1; margin-bottom: 12px; animation: fadeSlideDown 0.8s 0.1s ease both; }
        .hero-title { font-size: clamp(0.95rem,2vw,1.2rem); color: var(--text-secondary); margin-bottom: 20px; animation: fadeSlideDown 0.8s 0.2s ease both; }
        .hero-desc { color: var(--text-secondary); line-height: 1.8; max-width: 480px; margin-bottom: 36px; animation: fadeSlideDown 0.8s 0.3s ease both; }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; animation: fadeSlideDown 0.8s 0.4s ease both; }
        .hero-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 52px; animation: fadeSlideDown 0.8s 0.5s ease both; }
        .hero-stat { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 20px 16px; text-align: center; transition: all 0.3s; }
        .hero-stat:hover { border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.05); transform: translateY(-3px); }
        .hero-stat-num { font-family: var(--font-heading); font-size: 1.9rem; font-weight: 700; background: linear-gradient(135deg,#00d4ff,#9d4edd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-stat-lbl { font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; }

        /* Visual / orbit system */
        .hero-visual { display: flex; justify-content: center; align-items: center; animation: fadeSlideDown 0.8s 0.2s ease both; }
        .orbit-system { position: relative; width: 380px; height: 380px; }

        /* Avatar center */
        .avatar-core { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 130px; height: 130px; border-radius: 50%; background: linear-gradient(135deg, rgba(0,212,255,0.18), rgba(157,78,221,0.18)); border: 2px solid rgba(0,212,255,0.35); display: flex; align-items: center; justify-content: center; z-index: 4; box-shadow: 0 0 40px rgba(0,212,255,0.2), inset 0 0 30px rgba(0,212,255,0.06); }
        .avatar-initials { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 700; background: linear-gradient(135deg,#00d4ff,#9d4edd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

        /* Rotating rings */
        .orbit-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 1px solid; transform-origin: center; }
        .orbit-ring-1 { width: 210px; height: 210px; margin: -105px 0 0 -105px; border-color: rgba(0,212,255,0.22); animation: spinRing 12s linear infinite; }
        .orbit-ring-1::before { content:''; position:absolute; top:-5px; left:50%; width:10px; height:10px; background:#00d4ff; border-radius:50%; transform:translateX(-50%); box-shadow:0 0 14px #00d4ff; }
        .orbit-ring-2 { width: 310px; height: 310px; margin: -155px 0 0 -155px; border-color: rgba(157,78,221,0.15); animation: spinRing 22s linear infinite reverse; }
        .orbit-ring-2::before { content:''; position:absolute; top:-5px; left:50%; width:8px; height:8px; background:#9d4edd; border-radius:50%; transform:translateX(-50%); box-shadow:0 0 12px #9d4edd; }
        .orbit-ring-3 { width: 370px; height: 370px; margin: -185px 0 0 -185px; border-color: rgba(0,212,255,0.07); animation: spinRing 35s linear infinite; border-style: dashed; }

        /* Orbiting tech labels on ring-1 */
        .orbit-label-wrap { position: absolute; top: 50%; left: 50%; width: 210px; height: 210px; margin: -105px 0 0 -105px; animation: spinRing 12s linear infinite; pointer-events: none; }
        .orbit-label { position: absolute; top: 50%; left: 50%; animation: spinRing 12s linear infinite reverse; white-space: nowrap; }
        .orbit-label span { display: block; padding: 4px 10px; background: rgba(7,7,15,0.85); border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; font-size: 0.72rem; font-weight: 600; color: #00d4ff; backdrop-filter: blur(8px); box-shadow: 0 0 10px rgba(0,212,255,0.15); }

        /* Floating badges */
        .floating-badge { position: absolute; background: rgba(7,7,15,0.88); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 14px; backdrop-filter: blur(12px); font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 8px; z-index: 5; }
        .badge-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .badge-open { bottom: 14px; left: 10px; animation: floatY 4s ease-in-out infinite; }
        .badge-stack { top: 20px; right: 0px; animation: floatY 4s ease-in-out infinite 2s; }
        .badge-mern { bottom: 60px; right: -10px; animation: floatY 4s ease-in-out infinite 1s; }

        @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .scroll-hint { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; animation: fadeSlideDown 1s 1s ease both; }
        .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, transparent, #00d4ff); animation: scrollPulse 2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hero-visual { order: -1; }
          .orbit-system { width: 280px; height: 280px; }
          .orbit-ring-1 { width: 160px; height: 160px; margin: -80px 0 0 -80px; }
          .orbit-ring-2 { width: 240px; height: 240px; margin: -120px 0 0 -120px; }
          .orbit-ring-3 { width: 278px; height: 278px; margin: -139px 0 0 -139px; }
          .orbit-label-wrap { width: 160px; height: 160px; margin: -80px 0 0 -80px; }
          .avatar-core { width: 100px; height: 100px; }
          .avatar-initials { font-size: 1.7rem; }
          .hero-btns { justify-content: center; }
          .hero-desc { margin: 0 auto 36px; }
        }
        @media (max-width: 480px) { .hero-stats { grid-template-columns: repeat(2,1fr); } }
      `}</style>

      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-tag">
              <span>Available for Opportunities</span>
            </div>
            <h1 className="hero-name">
              Hi, I'm <span className="gradient-text">{about.name || 'Muhammad Nouman'}</span>
            </h1>
            <p className="hero-title">{about.title || 'Full Stack Developer · MERN Stack · Frontend Engineer · IoT Engineer'}</p>
            <p className="hero-desc">{about.short_bio || 'Passionate CS student building premium, responsive web experiences with React.js and modern technologies.'}</p>
            <div className="hero-btns">
              <a href={about.cv_url || '/resume.pdf'} download className="btn-primary">Download CV</a>
              <button className="btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get In Touch
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="hero-stat-num">
                    <Counter target={parseInt(s.value) || 0} suffix={s.value?.includes('+') ? '+' : ''} />
                  </div>
                  <div className="hero-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-system">
              {/* Rings */}
              <div className="orbit-ring orbit-ring-1" />
              <div className="orbit-ring orbit-ring-2" />
              <div className="orbit-ring orbit-ring-3" />

              {/* Orbiting tech labels on inner ring */}
              <div className="orbit-label-wrap">
                {ORBIT_TECH.map((t) => {
                  const rad = (t.angle * Math.PI) / 180
                  const r = 105
                  const x = r * Math.cos(rad)
                  const y = r * Math.sin(rad)
                  return (
                    <div key={t.label} className="orbit-label" style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}>
                      <span>{t.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Center avatar */}
              <div className="avatar-core">
                {about.profile_image
                  ? <img src={about.profile_image} alt="Muhammad Nouman" className="avatar-img"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  : null}
                <span className="avatar-initials" style={about.profile_image ? { display: 'none' } : {}}>MN</span>
              </div>

              {/* Floating badges */}
              <div className="floating-badge badge-open">
                <div className="badge-dot" style={{ background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' }} />
                <span>Open to Work</span>
              </div>
              <div className="floating-badge badge-stack">
                <div className="badge-dot" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span>MERN + FastAPI</span>
              </div>
              <div className="floating-badge badge-mern">
                <div className="badge-dot" style={{ background: '#9d4edd', boxShadow: '0 0 8px #9d4edd' }} />
                <span>IoT Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
