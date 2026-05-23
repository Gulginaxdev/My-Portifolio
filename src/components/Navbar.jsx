import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        if (window.scrollY + 200 >= s.offsetTop && window.scrollY + 200 < s.offsetTop + s.offsetHeight) {
          setActive('#' + s.id)
        }
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 px-[5%] flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3.5 bg-bg/90 border-b border-white/5' : 'py-5 bg-bg/60'
        }`}
        style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        {/* Logo */}
        <a href="#" className="font-display text-xl font-black gradient-text-cv tracking-tight">GT.</a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-mono text-[0.7rem] tracking-[0.1em] uppercase relative transition-colors duration-300 group ${
                  active === l.href ? 'text-cyan' : 'text-slate-400 hover:text-cyan'
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-cyan transition-all duration-300 ${
                  active === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block font-mono text-[0.7rem] tracking-wider px-5 py-2 border border-cyan/60 text-cyan rounded hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all duration-300"
        >
          Let's Talk
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Open menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} className="block w-6 h-0.5 bg-slate-400 rounded" />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(5,8,22,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-white transition-colors"
            >✕</button>
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-3xl font-bold text-white hover:text-cyan transition-colors duration-300"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}