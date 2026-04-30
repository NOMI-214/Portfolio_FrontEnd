import { useState, useEffect } from 'react'

const links = ['home','about','skills','projects','experience','certificates','contact']

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = links.map(id => document.getElementById(id)).filter(Boolean)
      const current = sections.reduce((acc, el) => {
        return el.getBoundingClientRect().top <= 120 ? el.id : acc
      }, 'home')
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 900;
          padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px;
          transition: all 0.4s ease;
        }
        .navbar.scrolled {
          background: rgba(7,7,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }
        .nav-logo {
          font-family: var(--font-heading); font-weight: 700; font-size: 1.2rem;
          background: linear-gradient(135deg,#00d4ff,#9d4edd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          cursor: pointer;
        }
        .nav-links { display: flex; align-items: center; gap: 6px; }
        .nav-link {
          padding: 8px 14px; font-size: 0.88rem; font-weight: 500;
          color: var(--text-secondary); border-radius: 8px;
          transition: all 0.3s ease; text-transform: capitalize; cursor: pointer;
          background: none; border: none;
        }
        .nav-link:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }
        .nav-link.active { color: #00d4ff; background: rgba(0,212,255,0.1); }
        .nav-cta {
          padding: 9px 22px; background: linear-gradient(135deg,#00d4ff,#4361ee);
          color: #fff; font-size: 0.88rem; font-weight: 600; border: none;
          border-radius: 10px; cursor: pointer; transition: all 0.3s ease; margin-left: 8px;
        }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { width: 24px; height: 2px; background: var(--text-primary); border-radius: 1px; transition: all 0.3s; }
        .mobile-menu {
          display: none; position: fixed; inset: 0; top: 68px;
          background: rgba(7,7,15,0.97); backdrop-filter: blur(20px);
          flex-direction: column; align-items: center; justify-content: center; gap: 8px;
          z-index: 899;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          font-size: 1.4rem; font-weight: 600; color: var(--text-secondary);
          padding: 12px 40px; border-radius: 12px; text-transform: capitalize;
          cursor: pointer; background: none; border: none; transition: all 0.3s;
        }
        .mobile-link:hover, .mobile-link.active { color: #00d4ff; background: rgba(0,212,255,0.08); }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollTo('home')}>MN</div>
        <div className="nav-links">
          {links.map(id => (
            <button key={id} className={`nav-link${active === id ? ' active' : ''}`} onClick={() => scrollTo(id)}>
              {id}
            </button>
          ))}
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Hire Me</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(id => (
          <button key={id} className={`mobile-link${active === id ? ' active' : ''}`} onClick={() => scrollTo(id)}>
            {id}
          </button>
        ))}
      </div>
    </>
  )
}
