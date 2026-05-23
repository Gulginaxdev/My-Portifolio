export default function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-[10%] py-7"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="font-display font-black text-xl"
        style={{
          background: 'linear-gradient(135deg, #00f5ff, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        GT.
      </div>

      <div className="font-mono text-[0.68rem] text-slate-500 tracking-wider text-center">
        © 2025 Gulgina Tajiboyeva · Crafted with 💜 in Uzbekistan
      </div>

      <a
        href="https://github.com/Gulginaxdev"
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[0.68rem] text-cyan tracking-wider hover:opacity-70 transition-opacity duration-300 flex items-center gap-1.5"
      >
        ⬡ Gulginaxdev
      </a>
    </footer>
  )
}