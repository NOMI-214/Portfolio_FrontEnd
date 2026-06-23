import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { submitMessage } from '../api/api'
import { EmailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GitHubIcon, SendIcon, CheckCircleIcon } from './Icons'

const contactItems = (contact) => [
  { Icon: EmailIcon,   label: 'Email',    value: contact.email    || 'nomikhan201460@gmail.com', href: `mailto:${contact.email || 'nomikhan201460@gmail.com'}`, color: '#00d4ff' },
  { Icon: PhoneIcon,   label: 'Phone',    value: contact.phone    || '(+92) 3482014604',          href: `tel:${(contact.phone||'').replace(/\s/g,'')}`,          color: '#9d4edd' },
  { Icon: LocationIcon,label: 'Location', value: contact.location || 'Mardan, Pakistan',          href: null,                                                    color: '#06d6a0' },
  { Icon: LinkedInIcon,label: 'LinkedIn', value: 'muhammad-nouman',                               href: contact.linkedin,                                        color: '#0077b5' },
  { Icon: GitHubIcon,  label: 'GitHub',   value: 'NOMI-214',                                      href: contact.github,                                          color: '#f0f0ff' },
]

export default function Contact() {
  const { data } = usePortfolio()
  const contact = data?.contact || {}
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [state, setState] = useState('idle')

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

  const items = contactItems(contact)

  return (
    <section id="contact" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:60px; align-items:start; margin-top:60px; }
        .c-card { display:flex; align-items:center; gap:16px; padding:18px 20px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:16px; transition:all 0.3s; text-decoration:none; color:inherit; margin-bottom:12px; }
        .c-card:hover { border-color:rgba(0,212,255,0.2); background:rgba(0,212,255,0.03); transform:translateX(5px); }
        .c-icon-wrap { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .c-label { font-size:0.72rem; color:var(--text-muted); margin-bottom:3px; font-weight:500; letter-spacing:.5px; text-transform:uppercase; }
        .c-value { font-weight:600; font-size:0.88rem; }
        .avail-pill { padding:4px 12px; border-radius:20px; font-size:0.78rem; font-weight:600; background:rgba(6,214,160,0.08); color:#06d6a0; border:1px solid rgba(6,214,160,0.18); }
        .form-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:36px; }
        .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .success-wrap { text-align:center; padding:48px 20px; }
        .success-icon-ring { width:72px; height:72px; border-radius:50%; background:rgba(6,214,160,0.1); border:1.5px solid rgba(6,214,160,0.3); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; animation:popIn 0.4s ease; }
        @keyframes popIn { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @media(max-width:900px){ .contact-grid{grid-template-columns:1fr!important} .form-row{grid-template-columns:1fr!important} }
      `}</style>

      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
          <p className="section-desc" style={{ marginTop: 16 }}>Open to freelance, internships, and full-time roles. Let's build something great.</p>
        </div>

        <div className="contact-grid">
          <div className="reveal-left">
            {items.map(({ Icon, label, value, href, color }) => {
              const inner = (
                <>
                  <div className="c-icon-wrap" style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                    <span style={{ color }}><Icon size={18} /></span>
                  </div>
                  <div>
                    <div className="c-label">{label}</div>
                    <div className="c-value">{value}</div>
                  </div>
                </>
              )
              return href
                ? <a key={label} href={href} target="_blank" rel="noreferrer" className="c-card">{inner}</a>
                : <div key={label} className="c-card">{inner}</div>
            })}

            <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(6,214,160,0.04)', border: '1px solid rgba(6,214,160,0.15)', borderRadius: 14 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>Available For</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(contact.available_for || ['Freelance', 'Internships', 'Full-time']).map(a => (
                  <span key={a} className="avail-pill">{a}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="form-card">
              {state === 'success' ? (
                <div className="success-wrap">
                  <div className="success-icon-ring">
                    <span style={{ color: '#06d6a0' }}><CheckCircleIcon size={32} /></span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: 8 }}>Message Sent</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thank you! I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 24 }}>Send a Message</h3>
                  <div className="form-row" style={{ marginBottom: 16 }}>
                    <div className="form-group"><label className="form-label">Your Name</label><input name="name" value={form.name} onChange={onChange} required className="neu-input" placeholder="Muhammad Nouman" /></div>
                    <div className="form-group"><label className="form-label">Email Address</label><input name="email" type="email" value={form.email} onChange={onChange} required className="neu-input" placeholder="hello@example.com" /></div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label className="form-label">Subject</label>
                    <input name="subject" value={form.subject} onChange={onChange} required className="neu-input" placeholder="Project Collaboration" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 24 }}>
                    <label className="form-label">Message</label>
                    <textarea name="message" value={form.message} onChange={onChange} required rows={5} className="neu-input" placeholder="Tell me about your project..." style={{ resize: 'vertical' }} />
                  </div>
                  {state === 'error' && <p style={{ color: 'var(--accent-red)', fontSize: '0.83rem', marginBottom: 16 }}>Something went wrong. Please try again.</p>}
                  <button type="submit" className="btn-primary" disabled={state === 'loading'} style={{ width: '100%', justifyContent: 'center', gap: 10 }}>
                    {state === 'loading' ? 'Sending...' : <><SendIcon size={15} /> Send Message</>}
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
