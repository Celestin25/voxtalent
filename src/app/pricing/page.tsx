'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Check, 
  Zap, 
  ArrowRight, 
  Shield, 
  Users, 
  BarChart3, 
  HelpCircle,
  Star
} from 'lucide-react'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? '499' : '599',
      desc: 'For growing teams starting with collective intelligence.',
      features: [
        '1 Active Challenge at a time',
        'Up to 50 Candidates/challenge',
        'Basic Voter Analytics',
        'Email Support',
        'Standard Reputation Badges'
      ],
      cta: 'Start with Starter',
      highlight: false
    },
    {
      name: 'Professional',
      price: isAnnual ? '1,299' : '1,599',
      desc: 'Our most popular plan for active hiring teams.',
      features: [
        '3 Active Challenges',
        'Unlimited Candidates',
        'Advanced Voter Insights',
        'Priority Review Panel',
        'Custom Skills Rubrics',
        '1-on-1 Strategy Session'
      ],
      cta: 'Go Professional',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Tailored solutions for large-scale talent acquisition.',
      features: [
        'Unlimited Active Challenges',
        'Dedicated Account Manager',
        'White-label Experience',
        'Full API Access',
        'SSO & Advanced Security',
        'Custom Voter Training'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-bg text-white font-sans pt-20">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-accent/5 blur-[100px] rounded-full -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tight pt-10">
            Hiring That <span className="text-gradient-gold">Pays Off.</span>
          </h1>
          <p className="text-secondary opacity-70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Choose a plan that fits your collective intelligence needs. 
            Invest in better hires, not bigger job boards.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-muted'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-white/5 border border-white/10 p-1 flex items-center transition-all relative"
            >
              <div className={`w-6 h-6 rounded-full bg-accent shadow-glow transition-all ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold transition-colors ${isAnnual ? 'text-white' : 'text-muted'}`}>Annual</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald/10 text-emerald px-2 py-0.5 rounded">Save 20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Grid ─────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`glass-card p-10 rounded-[48px] border-white/5 flex flex-col relative transition-all hover:translate-y-[-8px] ${
                  plan.highlight ? 'border-accent/40 bg-accent/5' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-8 right-8">
                    <Star size={24} className="text-accent fill-current shadow-glow" />
                  </div>
                )}
                
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-sm text-secondary opacity-70 mb-8 min-h-[40px] leading-relaxed">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-4xl font-black">{plan.price !== 'Custom' ? '$' : ''}{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted text-sm font-bold">/mo</span>}
                </div>

                <div className="space-y-4 mb-12 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm font-medium text-secondary">
                      <Check size={16} className="text-accent flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all ${
                  plan.highlight 
                    ? 'bg-accent text-black shadow-glow hover:scale-[1.02]' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl font-black mb-6">Still have questions?</h2>
          <p className="text-secondary opacity-70 mb-12">
            Learn more about how our collective intelligence model can transform your recruitment ROI.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/how-it-works" className="btn-secondary px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
              View How it Works <ArrowRight size={18} />
            </Link>
            <button className="btn-primary px-10 py-5 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-glow">
              Book a Demo <Zap size={18} className="fill-current" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
