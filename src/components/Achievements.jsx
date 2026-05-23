import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, Divider } from './utils'

const stats = [
  { icon: '🚀', num: 10, suffix: '+', label: 'Projects Completed' },
  { icon: '⭐', num: 9, suffix: '+', label: 'Skills Mastered' },
  { icon: '☕', num: 500, suffix: '+', label: 'Cups of Tea' },
  { icon: '💻', num: 1000, suffix: '+', label: 'Hours of Coding' },
]

function AchievementCard({ stat, index }) {
  const numRef = useRef(null)
  const cardRef = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current && numRef.current) {
        counted.current = true
        let cur = 0
        const step = stat.num / 50
        const t = setInterval(() => {
          cur = Math.min(cur + step, stat.num)
          numRef.current.textContent = Math.floor(cur) + stat.suffix
          if (cur >= stat.num) clearInterval(t)
        }, 28)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [stat])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative text-center p-8 rounded-2xl overflow-hidden group cursor-default"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-[-1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10"
        style={{ background: 'linear-gradient(135deg, #00f5ff, #7c3aed, #f472b6)' }} />
      <div className="absolute inset-[1px] rounded-[14px] -z-10 bg-bg2" />

      <div className="text-4xl mb-4">{stat.icon}</div>
      <div ref={numRef} className="font-display font-black text-4xl gradient-text-cv leading-none mb-2">
        0{stat.suffix}
      </div>
      <div className="text-slate-400 text-sm">{stat.label}</div>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <>
      <Divider />
      <section id="achievements" className="px-[10%] py-24">
        <SectionHeader label="Numbers & milestones" title="By the" accent="Numbers" />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => <AchievementCard key={s.label} stat={s} index={i} />)}
        </div>
      </section>
    </>
  )
}