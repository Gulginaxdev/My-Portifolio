import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, animFrame
    const mouse = { x: 0, y: 0 }

    const particles = []
    const stars = []

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY })

    for (let i = 0; i < 130; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 6000,
        r: Math.random() * 1.2,
        o: Math.random() * 0.5 + 0.2,
        p: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.5 ? [0, 245, 255] : [124, 58, 237],
        o: Math.random() * 0.4 + 0.1,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const scrollY = window.scrollY

      // Stars
      stars.forEach(s => {
        s.p += 0.008
        const a = s.o + Math.sin(s.p) * 0.15
        ctx.beginPath()
        ctx.arc(s.x, s.y - scrollY * 0.25, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,163,184,${a})`
        ctx.fill()
      })

      // Subtle grid
      ctx.strokeStyle = 'rgba(0,245,255,0.025)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Particles
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          p.vx += dx / dist * 0.015
          p.vy += dy / dist * 0.015
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) { p.vx *= 0.97; p.vy *= 0.97 }

        const [r, g, b] = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.o})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2)
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,245,255,${0.04 * (1 - d / 100)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }

        if (dist < 150) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 150)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      })

      // Mouse glow
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130)
      grad.addColorStop(0, 'rgba(0,245,255,0.05)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}