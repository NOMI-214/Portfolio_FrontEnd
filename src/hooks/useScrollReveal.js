import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)')
        .forEach(el => io.observe(el))
    }

    observe()

    // Pick up reveal elements added after async data loads
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
