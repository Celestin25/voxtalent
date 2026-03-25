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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest mb-6">
            <Cpu size={12} className="fill-current" /> Merit Science
          </div>
          <h1 className="font-display text-4xl md:text-8xl font-black mb-6 tracking-tight">
            Proof, Not <span className="text-secondary opacity-20">Prose.</span>
          </h1>
          <p className="text-secondary opacity-60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            VoxTalent replaces biased resumes with anonymous, merit-based challenges 
            vetted by the teams that actually build the products.
          </p>
        </div>
      </section>

      {/* ─── Concise Steps Section ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="glass-card p-8 rounded-[32px] border-white/5 group hover:border-accent/30 transition-all bg-white/[0.02]">
                <div className={`w-12 h-12 rounded-2xl ${step.bg} ${step.border} border flex items-center justify-center mb-6`}>
                  <step.icon size={24} className={step.color} />
                </div>
                <h3 className="text-xl font-black mb-3">{step.title}</h3>
                <p className="text-sm text-secondary opacity-60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Section ───────────────────────────────────────────── */}
      <section className="py-20 bg-black/10 border-y border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">The Wisdom of <span className="text-gradient-gold">Crowds.</span></h2>
            <p className="text-secondary text-lg mb-8 opacity-70">
              Unlike traditional hiring where one manager decides based on a piece of paper, 
              VoxTalent leverages the collective intelligence of your engineers.
            </p>
            <div className="space-y-4">
              {[
                'Bias-Free Evaluation',
                'Technical Consensus',
                'Hard Evidence of Skill',
                'Anonymous Meritocracy'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald/20 border border-emerald/50 flex items-center justify-center text-emerald">
                     <CheckCircle2 size={12} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="glass-card p-10 rounded-[40px] border-white/5 text-center">
                <div className="text-3xl font-black text-rose-500 mb-2">-60%</div>
                <div className="text-[10px] uppercase tracking-widest ont-bold opacity-40">Time to Vett</div>
             </div>
             <div className="glass-card p-10 rounded-[40px] border-white/5 text-center translate-y-8">
                <div className="text-3xl font-black text-emerald mb-2">94%</div>
                <div className="text-[10px] uppercase tracking-widest ont-bold opacity-40">Bias Reduction</div>
             </div>
             <div className="glass-card p-10 rounded-[40px] border-white/5 text-center">
                <div className="text-3xl font-black text-amber mb-2">3x</div>
                <div className="text-[10px] uppercase tracking-widest ont-bold opacity-40">Retention</div>
             </div>
             <div className="glass-card p-10 rounded-[40px] border-white/5 text-center translate-y-8">
                <div className="text-3xl font-black text-accent mb-2">100%</div>
                <div className="text-[10px] uppercase tracking-widest ont-bold opacity-40">Verified Skill</div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── Simple Final CTA ─────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Hire by Truth.</h2>
            <p className="text-secondary opacity-60 mb-12">
               Stop filtering resumes. Start seeing talent.
            </p>
            <Link href="/signup?role=company" className="btn-primary px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-glow inline-flex items-center gap-3">
              Apply Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
