import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf

    const onMove = e => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => { isHovering.current = true; ring.current?.classList.add('hover'); dot.current?.classList.add('hover') }
    const onLeave = () => { isHovering.current = false; ring.current?.classList.remove('hover'); dot.current?.classList.remove('hover') }

    const attachHover = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    attachHover()

    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 7px; height: 7px;
          background: #00d4ff;
          border-radius: 50%;
          pointer-events: none; z-index: 99999;
          will-change: transform;
          box-shadow: 0 0 12px rgba(0,212,255,0.9), 0 0 4px rgba(0,212,255,0.6);
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
        }
        .cursor-dot.hover {
          width: 10px; height: 10px;
          background: #9d4edd;
          box-shadow: 0 0 14px rgba(157,78,221,0.9);
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 38px; height: 38px;
          border: 1.5px solid rgba(0,212,255,0.45);
          border-radius: 50%;
          pointer-events: none; z-index: 99998;
          will-change: transform;
          transition: width 0.22s ease, height 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .cursor-ring.hover {
          width: 58px; height: 58px;
          border-color: rgba(157,78,221,0.65);
          background: rgba(157,78,221,0.07);
          box-shadow: 0 0 24px rgba(157,78,221,0.18), inset 0 0 12px rgba(157,78,221,0.06);
        }
        @media (hover: none) { .cursor-dot, .cursor-ring { display: none; } }
      `}</style>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
