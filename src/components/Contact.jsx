import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, Divider, RevealDiv } from './utils'

const socials = [
  { icon: '⬡', label: 'GitHub', href: 'https://github.com/Gulginaxdev' },
  { icon: 'in', label: 'LinkedIn', href: '#' },
  { icon: '✈', label: 'Telegram', href: '#' },
  { icon: '✉', label: 'Email', href: 'mailto:gulgina@example.com' },
]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleSubmit = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1200)
  }

  return (
    <>
      <Divider />
      <section id="contact" className="px-[10%] py-24">
        <SectionHeader label="Get in touch" title="Let's" accent="Connect" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <RevealDiv delay={0.2}>
            <h3 className="font-display font-bold text-2xl tracking-tight mb-4">
              Ready to build something amazing together?
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              I'm currently available for freelance projects and open to exciting full-time opportunities.
              Whether you have a project in mind or just want to say hello — my inbox is always open.
            </p>

            <div className="flex gap-3 flex-wrap mb-8">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  className="w-11 h-11 flex items-center justify-center rounded-xl font-mono text-sm text-slate-400 hover:text-cyan hover:-translate-y-1 transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div
              className="p-5 rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="font-mono text-[0.65rem] text-cyan tracking-widest uppercase mb-2">📍 Location</div>
              <div className="text-slate-300 text-sm">Uzbekistan · Available worldwide (remote)</div>
            </div>
          </RevealDiv>

          {/* Form */}
          <RevealDiv delay={0.35}>
            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              {[
                { label: 'Your Name', id: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email Address', id: 'email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Subject', id: 'subject', type: 'text', placeholder: 'Project Collaboration' },
              ].map(field => (
                <div key={field.id} className="mb-5">
                  <label className="block font-mono text-[0.68rem] text-slate-400 tracking-widest uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#00f5ff'
                      e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.08)'
                      e.target.style.background = 'rgba(0,245,255,0.02)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.target.style.boxShadow = 'none'
                      e.target.style.background = 'rgba(255,255,255,0.03)'
                    }}
                  />
                </div>
              ))}

              <div className="mb-6">
                <label className="block font-mono text-[0.68rem] text-slate-400 tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project…"
                  className="w-full px-4 py-3 rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none resize-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#00f5ff'
                    e.target.style.boxShadow = '0 0 0 3px rgba(0,245,255,0.08)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={status !== 'idle'}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-lg font-display font-bold text-base tracking-wide transition-all duration-300"
                style={{
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #10fabe, #059669)'
                    : 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                  color: '#050816',
                  cursor: status !== 'idle' ? 'default' : 'none',
                  boxShadow: status === 'idle' ? '' : '0 20px 40px rgba(0,245,255,0.15)',
                }}
              >
                {status === 'idle' && 'Send Message ✦'}
                {status === 'loading' && 'Sending…'}
                {status === 'success' && '✓ Message Sent!'}
              </motion.button>
            </div>
          </RevealDiv>
        </div>
      </section>
    </>
  )
}