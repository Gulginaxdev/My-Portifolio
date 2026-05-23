import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, Divider } from './utils'

const projects = [
  {
    id: 1,
    type: 'Featured · Full-Stack',
    title: 'EcoStep',
    desc: 'A digital platform encouraging environmental responsibility through technology and community participation. Real-time data, gamified challenges.',
    stack: ['React', 'Tailwind', 'Node.js', 'REST API'],
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #0a2a1a, #1D9E75)',
    category: 'fullstack',
    github: 'https://github.com/Gulginaxdev',
    live: 'https://github.com/Gulginaxdev',
  },
  {
    id: 2,
    type: 'Frontend',
    title: 'Design System UI',
    desc: 'A comprehensive React component library with Tailwind, dark mode, animations, and Figma design tokens integration.',
    stack: ['React', 'TypeScript', 'Figma'],
    emoji: '🎨',
    bg: 'linear-gradient(135deg, #0d0821, #7c3aed)',
    category: 'frontend',
    github: 'https://github.com/Gulginaxdev',
    live: 'https://github.com/Gulginaxdev',
  },
  {
    id: 3,
    type: 'Design',
    title: 'Mobile App UI',
    desc: 'Full Figma design system and interactive prototype for a wellness tracking mobile application. Includes 40+ screens.',
    stack: ['Figma', 'UI/UX', 'Prototyping'],
    emoji: '📱',
    bg: 'linear-gradient(135deg, #1a0d2e, #f472b6)',
    category: 'design',
    github: 'https://github.com/Gulginaxdev',
    live: 'https://github.com/Gulginaxdev',
  },
  {
    id: 4,
    type: 'Frontend',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization dashboard with real-time charts, responsive layout, and dark mode. Built with React and Chart.js.',
    stack: ['React', 'JavaScript', 'Chart.js'],
    emoji: '📊',
    bg: 'linear-gradient(135deg, #051520, #00f5ff)',
    category: 'frontend',
    github: 'https://github.com/Gulginaxdev',
    live: 'https://github.com/Gulginaxdev',
  },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'design', label: 'Design' },
]

function ProjectCard({ project }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-8px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        willChange: 'transform',
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9', background: project.bg }}
      >
        <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-105">
          {project.emoji}
        </div>
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(5,8,22,0.95))' }} />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="font-mono text-[0.65rem] text-violet-light tracking-wider uppercase mb-1">
          {project.type}
        </div>
        <h3 className="font-display font-bold text-xl mb-2 tracking-tight">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map(t => (
            <span key={t}
              className="font-mono text-[0.65rem] px-2 py-1 rounded border text-violet-light"
              style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.06)' }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={project.live} target="_blank" rel="noreferrer"
            className="font-mono text-xs px-4 py-2 rounded-md font-semibold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,245,255,0.2)]"
            style={{ background: 'linear-gradient(135deg, #00f5ff, #7c3aed)', color: '#050816' }}
          >
            ↗ Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noreferrer"
            className="font-mono text-xs px-4 py-2 rounded-md flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
          >
            ⬡ GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <>
      <Divider />
      <section id="projects" className="px-[10%] py-24">
        <SectionHeader label="Featured work" title="Selected" accent="Projects" />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-10 mb-8">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`font-mono text-[0.7rem] tracking-wider px-4 py-2 rounded-full border transition-all duration-300 ${
                active === f.key
                  ? 'border-cyan text-cyan bg-cyan/8'
                  : 'border-white/8 text-slate-400 hover:border-cyan/40 hover:text-cyan'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}