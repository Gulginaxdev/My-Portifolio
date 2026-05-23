import { motion } from 'framer-motion'
import { SectionHeader, Divider } from './utils'

const items = [
  {
    period: '2024 — Present',
    role: 'Front-End Developer',
    company: 'Freelance · Remote',
    desc: 'Building responsive, modern web applications for clients across various industries. Focus on React, Tailwind CSS, and delivering pixel-perfect UI.',
    color: '#00f5ff',
  },
  {
    period: '2023 — 2024',
    role: 'UI/UX Design Projects',
    company: 'Personal & Community Projects',
    desc: 'Designed and prototyped multiple mobile and web app interfaces using Figma. Developed strong design system thinking and component-based design skills.',
    color: '#a78bfa',
  },
  {
    period: '2022 — 2023',
    role: 'Self-Taught Developer',
    company: 'Online Platforms · Uzbekistan',
    desc: 'Deep dive into HTML, CSS, JavaScript, and React through structured self-learning. Built 10+ portfolio projects, contributed to open source, mastered Git workflow.',
    color: '#f472b6',
  },
  {
    period: '2021',
    role: 'The Beginning ✨',
    company: 'First Line of Code',
    desc: 'Wrote my very first HTML page. Fell in love with the magic of making things appear on a screen. Never looked back.',
    color: '#10fabe',
  },
]

export default function Experience() {
  return (
    <>
      <Divider />
      <section id="experience" className="px-[10%] py-24">
        <SectionHeader label="My journey" title="Experience &" accent="Education" />

        <div className="mt-12 relative pl-6"
          style={{ borderLeft: '1px solid', borderImage: 'linear-gradient(to bottom, #00f5ff, #7c3aed, transparent) 1' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative pl-8 mb-12 last:mb-0"
            >
              {/* Dot */}
              <div
                className="absolute -left-[2.45rem] top-1 w-3 h-3 rounded-full border-2 border-bg"
                style={{ background: item.color, boxShadow: `0 0 15px ${item.color}, 0 0 30px ${item.color}55` }}
              />

              <div className="font-mono text-[0.7rem] tracking-wider mb-1.5" style={{ color: item.color }}>
                {item.period}
              </div>
              <h3 className="font-display font-bold text-xl tracking-tight mb-1">{item.role}</h3>
              <div className="text-violet-light text-sm font-medium mb-3">{item.company}</div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}