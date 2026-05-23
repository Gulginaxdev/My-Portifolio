import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const roles = ['Front-End Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Freelancer']

function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wi]
    let timeout
    if (!deleting) {
      timeout = setTimeout(() => {
        setText(word.substring(0, ci + 1))
        if (ci + 1 > word.length) { setDeleting(true); return }
        setCi(c => c + 1)
      }, deleting ? 50 : 90)
    } else {
      timeout = setTimeout(() => {
        setText(word.substring(0, ci - 1))
        if (ci - 1 < 0) {
          setDeleting(false)
          setWi(w => (w + 1) % words.length)
          setCi(0)
          return
        }
        setCi(c => c - 1)
      }, 50)
    }
    return () => clearTimeout(timeout)
  }, [text, ci, deleting, wi, words])

  return text
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  const typed = useTypewriter(roles)

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-[10%] overflow-hidden">

      {/* Background orbs */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)' }} />
      <div className="absolute right-[80px] top-[10%] w-[350px] h-[350px] rounded-full pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)' }} />
      <div className="absolute right-[5%] bottom-[15%] w-[200px] h-[200px] rounded-full pointer-events-none animate-float-med"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)' }} />

      {/* Floating geometric shapes */}
      <div className="absolute hidden lg:block right-[15%] top-[25%] w-20 h-20 animate-float pointer-events-none"
        style={{ border: '1px solid rgba(0,245,255,0.2)', transform: 'rotate(45deg)' }} />
      <div className="absolute hidden lg:block right-[30%] top-[60%] w-12 h-12 animate-float-slow pointer-events-none"
        style={{ border: '1px solid rgba(167,139,250,0.25)', transform: 'rotate(15deg)' }} />
      <div className="absolute hidden lg:block right-[8%] top-[42%] pointer-events-none animate-float-med"
        style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '34px solid rgba(16,250,190,0.2)' }} />

      {/* Content */}
      <div className="max-w-[780px] relative z-10">
        <motion.div {...fadeUp(0.3)} className="section-label mb-6">
          Available for work · Uzbekistan 🇺🇿
        </motion.div>

        <motion.h1 {...fadeUp(0.5)} className="font-display font-black leading-[0.92] tracking-tight mb-4"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}>
          <div className="text-slate-100">Gulgina</div>
          <div className="gradient-text">Tajiboyeva</div>
        </motion.h1>

        <motion.div {...fadeUp(0.75)}
          className="font-display text-slate-400 mb-7 flex items-center gap-2 h-10"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.8rem)' }}>
          I'm a{' '}
          <span
            className="text-violet-light font-semibold border-r-2 border-violet-light pr-1 animate-blink"
            style={{ minWidth: '1ch' }}
          >
            {typed}
          </span>
        </motion.div>

        <motion.p {...fadeUp(1.0)} className="text-slate-400 leading-relaxed max-w-[520px] mb-10" style={{ fontSize: '1rem' }}>
          Passionate front-end developer building modern, interactive, and user-friendly digital
          experiences. Currently working on{' '}
          <span className="text-green font-semibold">EcoStep</span>{' '}
          — a platform for environmental responsibility.
        </motion.p>

        <motion.div {...fadeUp(1.2)} className="flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary"><span>View My Work</span></a>
          <a href="https://github.com/Gulginaxdev" target="_blank" rel="noreferrer" className="btn-ghost">
            ⬡ GitHub Profile
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.6rem] text-slate-500 tracking-[0.15em] [writing-mode:vertical-rl]">Scroll</span>
        <div
          className="w-px h-14 animate-scroll"
          style={{ background: 'linear-gradient(to bottom, #00f5ff, transparent)' }}
        />
      </motion.div>
    </section>
  )
}