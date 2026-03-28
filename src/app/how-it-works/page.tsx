'use client'

import Link from 'next/link'
import {
  Target,
  Users,
  ShieldCheck,
  Trophy,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  Zap,
  Eye,
  BarChart3,
  Award,
  Clock,
  Star,
  TrendingUp,
  Lock,
  Cpu
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: '01',
    title: 'Post a Real Challenge',
    subtitle: 'Define the actual work.',
    desc: 'Companies post a challenge based on a real problem the role will face — not generic interview questions. This immediately filters serious candidates from casual ones.',
    icon: Target,
    color: '#d4af37',
    bullets: ['Scoped to the actual job scope', 'Deadline & prize pool defined', 'Anonymous rubric attached'],
  },
  {
    num: '02',
    title: 'Candidates Submit Anonymously',
    subtitle: 'Skill, not status.',
    desc: 'Submissions are stripped of names, photos, and résumés. Evaluators see pure work — no Ivy League bias, no recency bias, no affinity bias.',
    icon: ShieldCheck,
    color: '#f43f5e',
    bullets: ['Zero PII exposed to voters', 'Work speaks without a CV', 'Worldwide talent pool'],
  },
  {
    num: '03',
    title: 'Your Team Votes',
    subtitle: 'Collective wisdom over one gut feeling.',
    desc: "Employees score each submission independently against a shared rubric. Because votes are private, each reviewer gives their honest signal — no groupthink.",
    icon: Users,
    color: '#3b82f6',
    bullets: ['Independent, private scoring', 'Weighted by reviewer expertise', 'Automated merit aggregation'],
  },
  {
    num: '04',
    title: 'Hire with Hard Evidence',
    subtitle: 'Data-backed confidence.',
    desc: 'The top submission rises naturally from consensus. You hire with a full audit trail — who voted, what scores, which skills were proven. No guesswork.',
    icon: Trophy,
    color: '#10b981',
    bullets: ['Full verification trace', 'Team consensus on record', 'One-click hire decision'],
  },
]

const roles = [
  {
    label: 'For Companies',
    icon: Building2,
    color: '#d4af37',
    bg: 'rgba(212,175,55,0.06)',
    border: 'rgba(212,175,55,0.2)',
    items: [
      'Post a challenge in under 5 minutes',
      'Set your own rubric & prize pool',
      'Watch submissions roll in anonymously',
      'Your team scores — you decide',
      'Download the full merit report',
    ],
  },
  {
    label: 'For Candidates',
    icon: User,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.2)',
    items: [
      'Browse real challenges from top companies',
      'Submit your best work, no résumé needed',
      'Compete on skill alone — 100% anonymous',
      'Get peer-reviewed scores as feedback',
      'Win prizes & fast-track interviews',
    ],
  },
  {
    label: 'For Employees',
    icon: Users,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.06)',
    border: 'rgba(59,130,246,0.2)',
    items: [
      'Review anonymised submissions in your queue',
      'Score against a clear rubric — no bias traps',
      'Your vote shapes your future teammate',
      'Build your voter reputation score',
      'Help hire someone great, not just familiar',
    ],
  },
]

const traditional = [
  'One manager decides based on a gut feeling',
  'Résumé signals privilege, not skill',
  'Interview performance ≠ job performance',
  'No record of why someone was hired',
  'New hires rejected by the team they join',
  'Average time to hire: 45 days',
]

const voxtalent = [
  'Whole team consensus — averaged signal',
  'Anonymous work only — pure merit',
  'Real task output proves capability',
  'Full merit audit trail on every hire',
  'Team chose this person — natural fit',
  'Average time to hire: 12 days',
]

const stats = [
  { value: '61%', label: 'Reduction in hiring bias', color: '#d4af37', icon: ShieldCheck },
  { value: '3×', label: 'Higher 1-year retention', color: '#10b981', icon: TrendingUp },
  { value: '12d', label: 'Average time to hire', color: '#3b82f6', icon: Clock },
  { value: '94%', label: 'Candidate satisfaction', color: '#f43f5e', icon: Star },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0f', color: '#f0f0f0', fontFamily: 'inherit', paddingTop: '5rem' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '6rem 0 4rem', overflow: 'hidden', textAlign: 'center' }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
            <Cpu size={11} /> The Methodology
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Proof, Not <span style={{ color: '#d4af37' }}>Prose.</span>
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            VoxTalent replaces guesswork with anonymous, merit-based challenges
            evaluated by the people who actually build the products.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/challenges" className="btn-primary" style={{ gap: '8px' }}>
              Browse Challenges <ArrowRight size={16} />
            </Link>
            <Link href="/signup?role=company" className="btn-outline">
              Post a Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '2rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ color: s.color, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ color: '#6b6b6b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Process ────────────────────────────────────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>The Process</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Four Steps to a Better Hire</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              const isEven = i % 2 === 1
              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 1fr',
                    alignItems: 'center',
                    gap: '0',
                    minHeight: '220px',
                  }}
                >
                  {/* Left content */}
                  <div style={{ padding: '2.5rem 3rem', textAlign: isEven ? 'left' : 'right', order: isEven ? 3 : 1 }}>
                    {!isEven && (
                      <StepContent step={step} Icon={Icon} align="right" />
                    )}
                  </div>

                  {/* Center timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', order: 2, position: 'relative', height: '100%' }}>
                    <div style={{ width: '2px', flex: 1, background: i === 0 ? 'transparent' : 'rgba(255,255,255,0.07)' }} />
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `rgba(${hexToRgb(step.color)}, 0.12)`, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div style={{ width: '2px', flex: 1, background: i === steps.length - 1 ? 'transparent' : 'rgba(255,255,255,0.07)' }} />
                  </div>

                  {/* Right content */}
                  <div style={{ padding: '2.5rem 3rem', order: isEven ? 1 : 3 }}>
                    {isEven && (
                      <StepContent step={step} Icon={Icon} align="left" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Role Perspectives ─────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Every Seat at the Table</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Built for Everyone in the Hiring Loop</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {roles.map((role, i) => {
              const Icon = role.icon
              return (
                <div key={i} style={{ background: role.bg, border: `1px solid ${role.border}`, borderRadius: '24px', padding: '2.5rem 2rem', transition: 'transform 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `rgba(${hexToRgb(role.color)}, 0.12)`, border: `1px solid ${role.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} style={{ color: role.color }} />
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: role.color }}>{role.label}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {role.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: '#c8c8c8', lineHeight: 1.5 }}>
                        <CheckCircle2 size={15} style={{ color: role.color, flexShrink: 0, marginTop: '2px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>The Difference</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Old Way vs. The Right Way</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Traditional */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <XCircle size={18} style={{ color: '#f43f5e' }} />
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f43f5e' }}>Traditional Hiring</span>
              </div>
              <ul style={{ padding: '1.25rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {traditional.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#777', lineHeight: 1.5 }}>
                    <XCircle size={14} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px', opacity: 0.7 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* VoxTalent */}
            <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: '#d4af37' }} />
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#d4af37' }}>VoxTalent</span>
              </div>
              <ul style={{ padding: '1.25rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {voxtalent.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#c8c8c8', lineHeight: 1.5 }}>
                    <CheckCircle2 size={14} style={{ color: '#d4af37', flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why It Works (Science) ────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>The Science</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Why Collective Scoring<br />Outperforms Every Panel Interview
              </h2>
              <p style={{ color: '#888', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
                Research from MIT Sloan and Harvard Business Review consistently shows that crowd-sourced evaluation of work samples predicts job performance 3× better than unstructured interviews. VoxTalent operationalises this finding inside every hire.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: Eye, label: 'Anonymity eliminates affinity bias', color: '#d4af37' },
                  { icon: Lock, label: 'Independent votes prevent groupthink', color: '#3b82f6' },
                  { icon: BarChart3, label: 'Averaged scores smooth outlier bias', color: '#10b981' },
                  { icon: Award, label: 'Work samples are job-relevant predictors', color: '#f43f5e' },
                ].map(({ icon: Icon, label, color }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `rgba(${hexToRgb(color)}, 0.1)`, border: `1px solid rgba(${hexToRgb(color)}, 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#d4d4d4' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '61%', label: 'Less hiring bias', color: '#d4af37', sub: 'vs. résumé screening' },
                { value: '3×', label: 'Better retention', color: '#10b981', sub: 'vs. interview-only hire', offset: true },
                { value: '94%', label: 'Candidate NPS', color: '#3b82f6', sub: '"fair & transparent"' },
                { value: '12d', label: 'Avg. time to hire', color: '#f43f5e', sub: 'industry avg: 45 days', offset: true },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', transform: s.offset ? 'translateY(1.5rem)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: s.color, marginBottom: '0.25rem' }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{s.label}</div>
                  <div style={{ color: '#666', fontSize: '0.7rem', fontStyle: 'italic' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>Ready to Try It?</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Hire by Truth.
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
            Stop filtering résumés. Start seeing talent for what it actually is — proven, peer-verified work.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup?role=company" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '0.875rem', gap: '8px', display: 'inline-flex', alignItems: 'center' }}>
              Post Your First Challenge <ArrowRight size={16} />
            </Link>
            <Link href="/challenges" className="btn-outline" style={{ padding: '0.9rem 2.5rem', fontSize: '0.875rem' }}>
              Browse Open Challenges
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepContent({ step, Icon, align }: { step: typeof steps[0]; Icon: any; align: 'left' | 'right' }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ color: step.color, fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, opacity: 0.12, letterSpacing: '-0.05em', marginBottom: '-1rem', fontFamily: 'monospace' }}>
        {step.num}
      </div>
      <p style={{ color: step.color, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.5rem' }}>
        {step.subtitle}
      </p>
      <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
        {step.title}
      </h3>
      <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '380px', ...(align === 'right' ? { marginLeft: 'auto' } : {}) }}>
        {step.desc}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {step.bullets.map((b, j) => (
          <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#aaa', flexDirection: align === 'right' ? 'row-reverse' : 'row' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: step.color, flexShrink: 0 }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '255,255,255'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}
