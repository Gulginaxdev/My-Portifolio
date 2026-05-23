import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          background: '#00f5ff',
          boxShadow: '0 0 20px #00f5ff, 0 0 40px rgba(0,245,255,0.3)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-10 h-10 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          border: '1px solid rgba(0,245,255,0.4)',
          transition: 'width 0.4s, height 0.4s, border-color 0.3s',
        }}
      />
    </>
  )
}