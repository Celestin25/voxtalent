'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'

const navLinks = [
  { href: '/challenges', label: 'Explore' },
  { href: '/how-it-works', label: 'Methodology' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-bg/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-black fill-current" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-white">
            Vox<span className="text-accent">Talent</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="text-xs font-black uppercase tracking-widest text-secondary hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-xs font-black uppercase tracking-widest text-muted hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary px-8 py-3 rounded-2xl text-[10px] shadow-glow">
            Get Started <ChevronRight size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg/95 backdrop-blur-xl border-b border-white/5 p-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="text-lg font-black text-white hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="h-px bg-white/5 my-2" />
          <Link href="/login" className="text-lg font-black text-muted" onClick={() => setOpen(false)}>Log in</Link>
          <Link href="/signup" className="btn-primary py-4 rounded-2xl text-center justify-center font-black" onClick={() => setOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
