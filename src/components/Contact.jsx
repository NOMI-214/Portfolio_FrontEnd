import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { submitMessage } from '../api/api'

export default function Contact() {
  const { data } = usePortfolio()
  const contact = data?.contact || {}
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState('idle') // idle | loading | success | error

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setState('loading')
    try {
      await submitMessage(form)
      setState('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setState('idle'), 5000)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  const socials = [
    { icon: '📧', label: 'Email', value: contact.email || 'nomikhan201460@gmail.com', href: `mailto:${contact.email || 'nomikhan201460@gmail.com'}` },
    { icon: '📱', label: 'Phone', value: contact.phone || '(+92) 3482014604', href: `tel:${contact.phone?.replace(/\s/g,'')}` },
    { icon: '📍', label: 'Location', value: contact.location || 'Mardan, Pakistan', href: null },
    { icon: '💼', label: 'LinkedIn', value: 'Muhammad Nouman', href: contact.linkedin },
    { icon: '🐙', label: 'GitHub', value: 'NOMI-214', href: contact.github },
  ]

  return (
    <section id="contact" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:60px; align-items:start; margin-top:60px; }
        .contact-info-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:28px; margin-bottom:16px; display:flex; align-items:center; gap:16px; transition:all 0.3s; }
        .contact-info-card:hover { border-color:rgba(0,212,255,0.25); background:rgba(0,212,255,0.03); transform:translateX(4px); }
        .c-icon { width:44px; height:44px; border-radius:12px; background:rgba(0,212,255,0.1); display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; border:1px solid rgba(0,212,255,0.2); }
        .c-label { font-size:0.75rem; color:var(--text-muted); margin-bottom:2px; }
        .c-value { font-weight:600; font-size:0.9rem; }
        .form-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:36px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .success-banner { text-align:center; padding:40px; }
        .success-icon { font-size:3.5rem; margin-bottom:16px; animation:bounceIn 0.5s ease; }
        @keyframes bounceIn { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
        @media(max-width:900px){ .contact-grid{grid-template-columns:1fr!important} .form-row{grid-template-columns:1fr!important} }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
          <p className="section-desc" style={{ marginTop: 16 }}>I'm open to freelance, internships, and full-time roles. Let's build something amazing.</p>
        </div>

        <div className="contact-grid">
          <div className="reveal-left">
            {socials.map(s => (
              <div key={s.label}>
                {s.href
                  ? <a href={s.href} target="_blank" rel="noreferrer" className="contact-info-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="c-icon">{s.icon}</div>
                      <div><div className="c-label">{s.label}</div><div className="c-value">{s.value}</div></div>
                    </a>
                  : <div className="contact-info-card">
                      <div className="c-icon">{s.icon}</div>
                      <div><div className="c-label">{s.label}</div><div className="c-value">{s.value}</div></div>
                    </div>
                }
              </div>
            ))}
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 14 }}>
              <div style={{ color: '#06d6a0', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>✅ Available For</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{(contact.available_for || []).join(' · ')}</div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="form-card">
              {state === 'success' ? (
                <div className="success-banner">
                  <div className="success-icon">🎉</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Thank you! I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 24 }}>Send a Message</h3>
                  <div className="form-row" style={{ marginBottom: 16 }}>
                    <div className="form-group"><label className="form-label">Your Name</label><input name="name" value={form.name} onChange={onChange} required className="neu-input" placeholder="Muhammad Nouman" /></div>
                    <div className="form-group"><label className="form-label">Email</label><input name="email" type="email" value={form.email} onChange={onChange} required className="neu-input" placeholder="hello@example.com" /></div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label">Subject</label>
                    <input name="subject" value={form.subject} onChange={onChange} required className="neu-input" placeholder="Project Collaboration" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 24 }}>
                    <label className="form-label">Message</label>
                    <textarea name="message" value={form.message} onChange={onChange} required rows={5} className="neu-input" placeholder="Tell me about your project..." style={{ resize: 'vertical' }} />
                  </div>
                  {state === 'error' && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: 16 }}>Something went wrong. Please try again.</p>}
                  <button type="submit" className="btn-primary" disabled={state === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                    {state === 'loading' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
