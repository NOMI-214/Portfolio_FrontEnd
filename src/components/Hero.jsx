import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

/* ── Animated counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      const n = parseInt(target)
      let v = 0
      const step = Math.ceil(n / 40)
      const id = setInterval(() => { v += step; if (v >= n) { setCount(n); clearInterval(id) } else setCount(v) }, 40)
      io.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Typewriter cycling roles ─────────────────────────── */
const ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Frontend Engineer',
  'React.js Specialist',
  'IoT Engineer',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    const speed = isDeleting ? 45 : 85
    const pause = 2200

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIdx(i => (i + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIdx])

  return (
    <span className="typewriter-wrap">
      <span className="typewriter-text">{text}</span>
      <span className="type-cursor">|</span>
    </span>
  )
}

/* ── Main Hero ────────────────────────────────────────── */
export default function Hero() {
  const { data } = usePortfolio()
  const about = data?.about || {}
  const [imgFailed, setImgFailed] = useState(false)

  const stats = about.stats || [
    { value: '6+', label: 'Projects Built' },
    { value: '7+', label: 'Certifications' },
    { value: '2', label: 'Internships' },
    { value: '15+', label: 'Technologies' },
  ]

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative' }}>
      <style>{`
        /* Layout */
        .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; }

        /* Left column */
        .hero-tag { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; background: rgba(0,212,255,0.07); border: 1px solid rgba(0,212,255,0.18); border-radius: 30px; font-size: 0.82rem; color: #00d4ff; margin-bottom: 22px; animation: hFade 0.8s ease both; }
        .hero-tag::before { content:''; width:7px; height:7px; background:#00d4ff; border-radius:50%; animation: hpulse 2s infinite; flex-shrink:0; }
        .hero-name { font-family: var(--font-heading); font-size: clamp(2.4rem,4.8vw,3.8rem); font-weight: 700; line-height: 1.1; margin-bottom: 14px; animation: hFade 0.8s 0.1s ease both; }
        .hero-role { font-size: clamp(1rem,2vw,1.25rem); font-weight: 600; min-height: 1.8em; margin-bottom: 20px; animation: hFade 0.8s 0.2s ease both; }
        .hero-desc { color: var(--text-secondary); line-height: 1.8; max-width: 460px; margin-bottom: 34px; font-size: 0.95rem; animation: hFade 0.8s 0.3s ease both; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; animation: hFade 0.8s 0.4s ease both; }
        .hero-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-top: 48px; animation: hFade 0.8s 0.5s ease both; }
        .hero-stat { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 18px 12px; text-align: center; transition: all 0.3s; }
        .hero-stat:hover { border-color: rgba(0,212,255,0.25); background: rgba(0,212,255,0.04); transform: translateY(-3px); }
        .hero-stat-num { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; background: linear-gradient(135deg,#00d4ff,#9d4edd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-stat-lbl { font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; }

        /* Typewriter */
        .typewriter-wrap { display: inline; }
        .typewriter-text { background: linear-gradient(135deg,#00d4ff,#9d4edd); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .type-cursor { color: #00d4ff; font-weight: 300; animation: blink 1s step-end infinite; margin-left: 1px; -webkit-text-fill-color: #00d4ff; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Right column — profile photo */
        .hero-visual { display: flex; justify-content: center; align-items: center; animation: hFade 0.7s 0.15s ease both; }
        .profile-frame { position: relative; width: 310px; height: 310px; flex-shrink: 0; }

        /* Photo circle */
        .profile-photo { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; border: 2.5px solid rgba(0,212,255,0.28); box-shadow: 0 0 0 6px rgba(0,212,255,0.05), 0 0 60px rgba(0,212,255,0.12), 0 0 120px rgba(157,78,221,0.06); }
        .profile-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .profile-photo-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,rgba(0,212,255,0.12),rgba(157,78,221,0.12)); font-family: var(--font-heading); font-size: 3rem; font-weight: 700; background-clip: text; -webkit-background-clip: text; color: transparent; background-image: linear-gradient(135deg,#00d4ff,#9d4edd); }
        .profile-glow { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 30% 25%,rgba(0,212,255,0.1),transparent 55%); pointer-events: none; }

        /* Spinning rings */
        .p-ring { position: absolute; border-radius: 50%; border: 1.5px solid; animation: spinRing linear infinite; }
        .p-ring::before { content:''; position:absolute; border-radius:50%; }
        .p-ring-1 { inset: -24px; border-color: rgba(0,212,255,0.2); animation-duration: 14s; }
        .p-ring-1::before { width:11px; height:11px; background:#00d4ff; top:-5.5px; left:50%; transform:translateX(-50%); box-shadow:0 0 14px rgba(0,212,255,0.9); }
        .p-ring-2 { inset: -50px; border-color: rgba(157,78,221,0.13); animation-duration: 28s; animation-direction: reverse; border-style: dashed; }
        .p-ring-2::before { width:8px; height:8px; background:#9d4edd; bottom:-4px; left:50%; transform:translateX(-50%); box-shadow:0 0 10px rgba(157,78,221,0.8); }
        .p-ring-3 { inset: -72px; border-color: rgba(0,212,255,0.05); animation-duration: 45s; }

        /* Floating info badges */
        .f-badge { position: absolute; display: flex; align-items: center; gap: 8px; padding: 9px 14px; background: rgba(7,7,15,0.9); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; backdrop-filter: blur(16px); font-size: 0.78rem; font-weight: 600; white-space: nowrap; z-index: 5; }
        .f-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .fb-open  { bottom: -8px;  left: -20px; animation: floatY 4s ease-in-out infinite 0s; }
        .fb-stack { top:   -8px;  right: -16px; animation: floatY 4s ease-in-out infinite 1.4s; }
        .fb-iot   { bottom: 68px; right: -28px; animation: floatY 4s ease-in-out infinite 0.7s; }

        @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes hFade { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinRing { to{transform:rotate(360deg)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

        .scroll-hint { position:absolute; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; color:var(--text-muted); font-size:0.72rem; animation:hFade 1s 1.2s ease both; }
        .scroll-line { width:1px; height:38px; background:linear-gradient(to bottom,transparent,#00d4ff); animation:scrollPulse 2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        @media(max-width:900px) {
          .hero-inner { grid-template-columns:1fr; text-align:center; }
          .hero-visual { order:-1; }
          .profile-frame { width:240px; height:240px; }
          .p-ring-3 { inset:-50px; }
          .hero-btns { justify-content:center; }
          .hero-desc { margin:0 auto 34px; }
          .fb-open  { bottom:-10px; left:-10px; }
          .fb-stack { top:-10px;   right:-10px; }
          .fb-iot   { display:none; }
        }
        @media(max-width:480px) { .hero-stats{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      <div className="container">
        <div className="hero-inner">

          {/* ── Left: text ── */}
          <div>
            <div className="hero-tag">Available for Opportunities</div>

            <h1 className="hero-name">
              Hi, I'm{' '}
              <span className="gradient-text">{about.name || 'Muhammad Nouman'}</span>
            </h1>

            <div className="hero-role">
              <Typewriter />
            </div>

            <p className="hero-desc">
              {about.short_bio || 'Passionate CS student building premium, responsive web experiences with React.js and modern technologies.'}
            </p>

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

          {/* ── Right: profile photo ── */}
          <div className="hero-visual">
            <div className="profile-frame">
              {/* Rings */}
              <div className="p-ring p-ring-1" />
              <div className="p-ring p-ring-2" />
              <div className="p-ring p-ring-3" />

              {/* Photo */}
              <div className="profile-photo">
                {about.profile_image && !imgFailed
                  ? <img src={about.profile_image} alt="Muhammad Nouman" onError={() => setImgFailed(true)} />
                  : <div className="profile-photo-fallback">MN</div>
                }
                <div className="profile-glow" />
              </div>

              {/* Floating badges */}
              <div className="f-badge fb-open">
                <div className="f-dot" style={{ background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' }} />
                Open to Work
              </div>
              <div className="f-badge fb-stack">
                <div className="f-dot" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                MERN + FastAPI
              </div>
              <div className="f-badge fb-iot">
                <div className="f-dot" style={{ background: '#9d4edd', boxShadow: '0 0 8px #9d4edd' }} />
                IoT Engineer
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
