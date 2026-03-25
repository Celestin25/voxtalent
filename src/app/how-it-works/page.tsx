'use client'

import Link from 'next/link'
import { 
  Zap, 
  Target, 
  Users, 
  Award, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Cpu,
  Trophy,
  CheckCircle2,
  TrendingUp
} from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      title: 'Post a Challenge',
      desc: 'Define a real-world problem or task that represents the core of the role you are hiring for.',
      icon: Target,
      color: 'text-accent',
      bg: 'bg-accent/5',
      border: 'border-accent/20'
    },
    {
      title: 'Anonymous Submissions',
      desc: 'Candidates submit their solutions anonymously. Bias is eliminated; only the merit of the work matters.',
      icon: ShieldCheck,
      color: 'text-rose-500',
      bg: 'bg-rose-500/5',
      border: 'border-rose-500/20'
    },
    {
      title: 'Collective Voting',
      desc: "Your current team votes on the best solutions. They know what great work looks like in their daily environment.",
      icon: Users,
      color: 'text-emerald',
      bg: 'bg-emerald/5',
      border: 'border-emerald/20'
    },
    {
      title: 'Data-Driven Hiring',
      desc: 'Hire the top-performer with confidence, backed by your team’s consensus and hard evidence of skill.',
      icon: Trophy,
      color: 'text-amber',
      bg: 'bg-amber/5',
      border: 'border-amber/20'
    }
  ]

  return (
    <div className="min-h-screen bg-bg text-white font-sans pt-20">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-8">
            <Cpu size={14} className="fill-current" /> The Science of Hiring
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tight">
            How Collective <span className="text-gradient-gold">Intelligence</span> Works.
          </h1>
          <p className="text-secondary opacity-70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            VoxTalent replaces biased resumes with anonymous, merit-based challenges 
            vetted by your own high-performing team.
          </p>
        </div>
      </section>

      {/* ─── Steps Section ───────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-[32px] ${step.bg} ${step.border} border flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-glow`}>
                    <step.icon size={32} className={step.color} />
                  </div>
                  <div className="flex justify-center mt-6">
                    <span className="text-4xl font-black text-white/5">0{i + 1}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-black mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
                  <p className="text-lg text-secondary opacity-70 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why it works ────────────────────────────────────────────────── */}
      <section className="py-32 bg-black/20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Why traditional hiring is broken.</h2>
            <p className="text-secondary opacity-70">
              Resumes tell stories. Challenges tell truths. We leverage the "Wisdom of Crowds" 
              within your company to find the perfect match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Bias Reduction', value: '94%', icon: ShieldCheck, desc: 'Removal of names/photos from initial review phases.' },
              { label: 'Time to Vett', value: '-60%', icon: TrendingUp, desc: 'Skip multiple rounds of interviews with proven work.' },
              { label: 'Retention Rate', value: '3x', icon: CheckCircle2, desc: 'Better team alignment leads to longer stays.' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-10 rounded-[48px] text-center border-white/5 group hover:border-accent/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-accent">
                   <stat.icon size={24} />
                </div>
                <p className="text-5xl font-black text-white mb-4 group-hover:text-accent transition-colors">{stat.value}</p>
                <h4 className="font-bold text-lg mb-2">{stat.label}</h4>
                <p className="text-xs text-muted font-bold leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 md:p-24 rounded-[64px] border-accent/30 bg-accent/5 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-12 text-accent/5 opacity-50 -rotate-12 translate-x-12">
               <Zap size={300} />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to hire by <span className="text-gradient-gold">Truth?</span></h2>
              <p className="text-secondary opacity-70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Join hundreds of companies finding their best talent through collective intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/signup?role=company" className="btn-primary px-12 py-6 rounded-[32px] font-black uppercase tracking-widest shadow-glow flex items-center gap-3">
                  Get Started Now <ArrowRight size={20} />
                </Link>
                <Link href="/pricing" className="btn-secondary px-12 py-6 rounded-[32px] font-black uppercase tracking-widest flex items-center gap-3">
                  View Pricing <BarChart3 size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
