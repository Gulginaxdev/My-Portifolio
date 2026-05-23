import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, RevealDiv, Divider } from './utils'

const traits = ['Creative', 'Curious', 'Fast Learner', 'Problem Solver', 'Hardworking', 'Detail-Oriented']

function CountCard({ num, label, suffix = '' }) {
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true
        const target = typeof num === 'number' ? num : null
        if (!target) return
        let cur = 0
        const step = target / 45
        const t = setInterval(() => {
          cur = Math.min(cur + step, target)
          el.textContent = Math.floor(cur) + suffix
          if (cur >= target) clearInterval(t)
        }, 28)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [num, suffix])

  return (
    <div className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #00f5ff, #7c3aed)' }} />
      <div ref={ref} className="font-display font-black text-4xl gradient-text-cv leading-none mb-1">
        {typeof num === 'number' ? '0' + suffix : num}
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Divider />
      <section id="about" className="px-[10%] py-24">
        <SectionHeader label="About me" title="Crafting" accent="digital experiences" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <RevealDiv delay={0.2} className="space-y-5">
            <p className="text-slate-400 leading-relaxed">
              I'm a <span className="text-slate-200 font-medium">passionate young developer from Uzbekistan</span> who
              loves creating modern, interactive web applications. My journey began with curiosity about how beautiful
              interfaces come to life.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I specialize in <span className="text-slate-200 font-medium">React, JavaScript, and Tailwind CSS</span>,
              with a strong eye for UI/UX design. I'm constantly expanding my knowledge toward becoming a{' '}
              <span className="text-slate-200 font-medium">full-stack developer</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My mission: combine creativity, technology, and problem-solving to{' '}
              <span className="text-slate-200 font-medium">build digital experiences that make people's lives easier</span>.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="font-mono text-[0.68rem] px-3 py-1.5 rounded-full border border-white/8 text-slate-400 bg-white/4 hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5 transition-all duration-300 cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </RevealDiv>

          {/* Stats */}
          <RevealDiv delay={0.3} className="grid grid-cols-2 gap-3">
            <CountCard num={9} label="Technical Skills" suffix="+" />
            <CountCard num={10} label="Projects Built" suffix="+" />
            <CountCard num="2" label="Languages" />
            <CountCard num="∞" label="Passion for Code" />
          </RevealDiv>
        </div>
      </section>
    </>
  )
}