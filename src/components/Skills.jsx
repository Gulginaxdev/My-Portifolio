import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, Divider } from './utils'

const skills = [
  { name: 'React', icon: '⚛️', level: 90, color: '#61DAFB' },
  { name: 'JavaScript', icon: '🟨', level: 85, color: '#F7DF1E' },
  { name: 'TypeScript', icon: '🔷', level: 65, color: '#007ACC' },
  { name: 'Tailwind', icon: '🎨', level: 88, color: '#38B2FF' },
  { name: 'Node.js', icon: '🟢', level: 55, color: '#68A063' },
  { name: 'Figma', icon: '🎭', level: 80, color: '#F472B6' },
  { name: 'Git', icon: '🐙', level: 78, color: '#F05032' },
  { name: 'HTML5', icon: '🌐', level: 95, color: '#E34C26' },
  { name: 'CSS3', icon: '💅', level: 90, color: '#1572B6' },
]

function SkillOrb({ skill, index }) {
  const fillRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && fillRef.current) {
        setTimeout(() => {
          fillRef.current.style.width = skill.level + '%'
        }, 200 + index * 80)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [skill.level, index])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative flex flex-col items-center gap-3 p-6 rounded-2xl cursor-default overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        '--skill-color': skill.color + '33',
      }}
    >
      {/* Hover bg glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}18 0%, transparent 70%)` }}
      />
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
      />

      <div className="text-4xl transition-transform duration-300 group-hover:scale-110 relative z-10">
        {skill.icon}
      </div>
      <div className="font-mono text-xs text-slate-400 group-hover:text-slate-200 transition-colors duration-300 tracking-wider relative z-10">
        {skill.name}
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 rounded-full relative z-10" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          ref={fillRef}
          className="h-full rounded-full transition-all duration-[1.5s] ease-out"
          style={{
            width: '0%',
            background: skill.color,
            boxShadow: `0 0 8px ${skill.color}`,
          }}
        />
      </div>

      <div className="font-mono text-[0.65rem] relative z-10" style={{ color: skill.color }}>
        {skill.level}%
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <>
      <Divider />
      <section id="skills" className="px-[10%] py-24">
        <SectionHeader label="Technical skills" title="My" accent="Arsenal" />
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
          {skills.map((s, i) => (
            <SkillOrb key={s.name} skill={s} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}