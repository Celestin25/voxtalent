'use client'

import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react'

const footerLinks = {
  Platform: [
    { href: '/challenges', label: 'Explore Challenges' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Enterprise Pricing' },
  ],
  Ecosystem: [
    { href: '/signup?role=company', label: 'For Companies' },
    { href: '/signup?role=candidate', label: 'For Talent' },
    { href: '/dashboard/admin', label: 'Admin Portal' },
  ],
  Resources: [
    { href: '#', label: 'Privacy Protocol' },
    { href: '#', label: 'Terms of Merit' },
    { href: '#', label: 'Security Whitepaper' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-glow group-hover:rotate-12 transition-transform">
                <Zap size={20} className="text-black fill-current" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                Vox<span className="text-accent">Talent</span>
              </span>
            </Link>
            <p className="text-secondary opacity-60 text-lg leading-relaxed max-w-sm font-medium">
              The recruitment platform built on the science of collective intelligence and verified merit.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all group"
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-8">
              <h4 className="text-[10px] font-black text-accent uppercase tracking-widest">{title}</h4>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm font-bold text-muted hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex flex-col md:items-center gap-2">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              © 2026 VoxTalent Global Systems
            </p>
            <p className="text-[10px] font-medium text-muted/50">
              Encrypted with high-end protocols. Decentralized verification active.
            </p>
          </div>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-[10px] font-black text-emerald uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
               Grid Status: Optimal
             </div>
             <div className="w-px h-4 bg-white/10" />
             <p className="text-[10px] font-black text-muted uppercase tracking-widest">
               v2.42.0-alpha
             </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
