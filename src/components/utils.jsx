import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export function useReveal(threshold = 0.15) {
  const [ref, inView] = useInView({ threshold, triggerOnce: true })
  return { ref, inView }
}

export function RevealDiv({ children, delay = 0, className = '', ...props }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({ label, title, accent }) {
  return (
    <div>
      <RevealDiv>
        <div className="section-label">{label}</div>
      </RevealDiv>
      <RevealDiv delay={0.1}>
        <h2 className="section-title">
          {title} <span className="gradient-text-cv">{accent}</span>
        </h2>
      </RevealDiv>
    </div>
  )
}

export function Divider() {
  return (
    <div className="mx-[10%] h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />
  )
}