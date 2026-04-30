import { useEffect, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

function SkillBar({ skill }) {
  const fillRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current) {
        fillRef.current.style.width = `${skill.proficiency}%`
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (fillRef.current) observer.observe(fillRef.current.parentElement)
    return () => observer.disconnect()
  }, [skill.proficiency])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{skill.name}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{skill.proficiency}%</span>
      </div>
      <div className="progress-bar-track">
        <div ref={fillRef} className={`progress-bar-fill ${skill.color || 'cyan'}`} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { data } = usePortfolio()
  const skills = data?.skills || []

  const categories = [...new Set(skills.map(s => s.category))]

  const catColors = {
    Frontend: 'cyan', Backend: 'green', 'IoT & Systems': 'teal',
    Tools: 'orange', Networking: 'blue', Security: 'red', Cloud: 'orange', Language: 'yellow',
  }

  return (
    <section id="skills" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <style>{`
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 24px; margin-top: 60px; }
        .skills-cat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; transition: all 0.3s; }
        .skills-cat-card:hover { border-color: rgba(0,212,255,0.2); background: rgba(0,212,255,0.02); }
        .cat-title { font-family: var(--font-heading); font-weight: 600; font-size: 1rem; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
        .cat-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">My Skills</p>
          <h2 className="section-title">Technical <span className="gradient-text">Expertise</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
          <p className="section-desc" style={{ marginTop: 16 }}>A diverse skill set spanning frontend, backend, IoT, networking, and security.</p>
        </div>

        <div className="skills-grid">
          {categories.map((cat, i) => {
            const catSkills = skills.filter(s => s.category === cat)
            const color = catColors[cat] || 'cyan'
            const dotColors = { cyan:'#00d4ff', green:'#06d6a0', teal:'#2ec4b6', orange:'#fb8500', blue:'#4361ee', red:'#ef233c', yellow:'#ffd60a', purple:'#9d4edd' }
            return (
              <div key={cat} className={`skills-cat-card reveal delay-${Math.min(i+1,5)}`}>
                <div className="cat-title">
                  <div className="cat-dot" style={{ background: dotColors[color] || '#00d4ff', boxShadow: `0 0 8px ${dotColors[color] || '#00d4ff'}` }} />
                  {cat}
                </div>
                {catSkills.map(skill => <SkillBar key={skill.id} skill={skill} />)}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
