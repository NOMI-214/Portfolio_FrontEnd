import { useEffect, useState } from 'react'

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1200)
    const t2 = setTimeout(() => setGone(true), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div className={`loader-overlay${fadeOut ? ' fade-out' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="loader-ring" style={{ margin: '0 auto 20px' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', background: 'linear-gradient(135deg,#00d4ff,#9d4edd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Muhammad Nouman
        </p>
      </div>
    </div>
  )
}
