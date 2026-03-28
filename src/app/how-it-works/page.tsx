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
  Eye,
  BarChart3,
  Award,
  Clock,
  Star,
  TrendingUp,
  Lock,
  Cpu
} from 'lucide-react'

const steps = [
  {
    num: 1,
    title: 'Post a Real Challenge',
    desc: 'Instead of asking candidates to solve hypothetical puzzles, companies post actual problems from the role. Everyone knows what they\'re walking into — no surprises, no tricks.',
    icon: Target,
    color: '#4f46e5',
    bullets: ['Tied to the actual job scope', 'Deadline and prize pool set upfront', 'A scoring rubric is attached from the start'],
  },
  {
    num: 2,
    title: 'Candidates Submit Their Work',
    desc: 'Names, photos, and CVs are stripped before reviewers see anything. Candidates answer the challenge and their work speaks on its own — not where someone went to school.',
    icon: ShieldCheck,
    color: '#6366f1',
    bullets: ['No personal details visible to voters', 'Open to candidates worldwide', 'Everyone competes on the same terms'],
  },
  {
    num: 3,
    title: 'Employees Vote on Submissions',
    desc: 'Your team members review and vote on each candidate\'s submitted work — they do not answer challenges themselves. Because no one can see what others voted, every score stays honest.',
    icon: Users,
    color: '#3b82f6',
    bullets: ['Employees evaluate candidate answers, not write their own', 'Each reviewer votes independently', 'Results are compiled automatically'],
  },
  {
    num: 4,
    title: 'Hire With Confidence',
    desc: 'The best work rises naturally from the votes. You get a full picture of who solved the problem and how — with every vote on record. No guesswork, no politics.',
    icon: Trophy,
    color: '#10b981',
    bullets: ['Complete audit trail on every decision', 'Team consensus is on record', 'One clear hire recommendation'],
  },
]

const roles = [
  {
    label: 'For Companies',
    icon: Building2,
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.04)',
    border: 'rgba(79,70,229,0.15)',
    items: [
      'Post a challenge in under 5 minutes',
      'Set your own rubric and prize pool',
      'Watch anonymous candidate submissions come in',
      'Your employees vote on merit — you make the final call',
      'Download a full merit report when done',
    ],
  },
  {
    label: 'For Candidates',
    icon: User,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.04)',
    border: 'rgba(16,185,129,0.15)',
    items: [
      'Browse real challenges from companies',
      'Submit your best work — no CV required',
      'Compete on skill alone',
      'Get peer-reviewed scores as feedback',
      'Win prizes and fast-track interviews',
    ],
  },
  {
    label: 'For Employees',
    icon: Users,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.04)',
    border: 'rgba(99,102,241,0.15)',
    items: [
      'Review anonymous candidate submissions in your queue',
      'Vote on candidate work — you evaluate, not answer challenges',
      'Help pick your next teammate fairly',
      'Your vote is private and weighted by expertise',
      'No bias — you never see what others scored',
    ],
  },
]

const traditional = [
  'One manager decides on a gut feeling',
  'A strong CV carries more weight than real skill',
  'Interview performance rarely matches job performance',
  'No record of why someone was hired',
  'New hires sometimes clash with the teams they join',
  'Average time to hire: 45 days',
]

const voxtalent = [
  'The whole team votes — one averaged signal',
  'Anonymous candidate work only — pure merit',
  'Real task output shows what someone can actually do',
  'Full audit trail on every hire',
  'The team chose this person — natural fit from day one',
  'Average time to hire: 12 days',
]

const stats = [
  { value: '61%', label: 'Less hiring bias', color: '#4f46e5', icon: ShieldCheck },
  { value: '3×', label: 'Higher 1-year retention', color: '#10b981', icon: TrendingUp },
  { value: '12 days', label: 'Average time to hire', color: '#6366f1', icon: Clock },
  { value: '94%', label: 'Candidate satisfaction', color: '#3b82f6', icon: Star },
]

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', fontFamily: 'inherit', paddingTop: '5rem' }}>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '6rem 0 4rem', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '350px', background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 16px', borderRadius: '9999px', background: 'rgba(79,70,229,0.07)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
            <Cpu size={12} /> How It Works
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            Proof, Not <span style={{ color: '#4f46e5' }}>Promises.</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            VoxTalent replaces gut feelings with anonymous, merit-based challenges — candidates answer, your team votes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/challenges" className="btn-primary" style={{ gap: '8px', display: 'inline-flex', alignItems: 'center' }}>
              Browse Challenges <ArrowRight size={16} />
            </Link>
            <Link href="/signup?role=company" className="btn-outline">
              Post a Challenge
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ borderTop: '1px solid rgba(79,70,229,0.1)', borderBottom: '1px solid rgba(79,70,229,0.1)', background: 'var(--color-bg-secondary)', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '2rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(79,70,229,0.08)' : 'none' }}>
                <div style={{ color: s.color, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, lineHeight: 1, marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Four Steps to a Better Hire</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>A process your whole team can actually trust.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-bg-secondary)',
                    border: `1px solid rgba(79,70,229,0.1)`,
                    borderRadius: '20px',
                    padding: '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                >
                  <div style={{ position: 'absolute', top: '-10px', right: '20px', fontSize: '7rem', fontWeight: 900, color: step.color, opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `rgba(${hexToRgb(step.color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(step.color)}, 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: step.color, background: `rgba(${hexToRgb(step.color)}, 0.07)`, border: `1px solid rgba(${hexToRgb(step.color)}, 0.15)`, borderRadius: '9999px', padding: '2px 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step {step.num}</span>
                    </div>
                  </div>

                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem', letterSpacing: '-0.01em', color: 'var(--color-text-primary)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{step.desc}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {step.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        <CheckCircle2 size={14} style={{ color: step.color, flexShrink: 0, marginTop: '2px' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Role Perspectives */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-secondary)', borderTop: '1px solid rgba(79,70,229,0.08)', borderBottom: '1px solid rgba(79,70,229,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Everyone Has a Seat at the Table</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>VoxTalent is designed around all three sides of the hiring process.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {roles.map((role, i) => {
              const Icon = role.icon
              return (
                <div key={i} style={{ background: role.bg, border: `1px solid ${role.border}`, borderRadius: '20px', padding: '2.25rem 2rem', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `rgba(${hexToRgb(role.color)}, 0.08)`, border: `1px solid ${role.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={19} style={{ color: role.color }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: role.color }}>{role.label}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {role.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        <CheckCircle2 size={14} style={{ color: role.color, flexShrink: 0, marginTop: '2px' }} />
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

      {/* Comparison */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Old Way vs. The Right Way</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>See the difference side by side.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ background: 'var(--color-bg-secondary)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(79,70,229,0.08)', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(244,63,94,0.03)' }}>
                <XCircle size={17} style={{ color: '#f43f5e' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f43f5e' }}>Traditional Hiring</span>
              </div>
              <ul style={{ padding: '1.5rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {traditional.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    <XCircle size={13} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px', opacity: 0.6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(79,70,229,0.03)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(79,70,229,0.04)' }}>
                <CheckCircle2 size={17} style={{ color: '#4f46e5' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#4f46e5' }}>VoxTalent</span>
              </div>
              <ul style={{ padding: '1.5rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {voxtalent.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    <CheckCircle2 size={13} style={{ color: '#4f46e5', flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-secondary)', borderTop: '1px solid rgba(79,70,229,0.08)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2, color: 'var(--color-text-primary)' }}>
                Why Collective Voting Actually Works
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
                Studies from MIT Sloan and Harvard Business Review have shown that group evaluation of real work samples predicts job performance far better than a standard interview. VoxTalent is built around that finding.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  { icon: Eye, label: 'Anonymity removes affinity bias', color: '#4f46e5' },
                  { icon: Lock, label: 'Private votes keep scores honest', color: '#6366f1' },
                  { icon: BarChart3, label: 'Averaged votes smooth out outliers', color: '#10b981' },
                  { icon: Award, label: 'Work samples are job-relevant predictors', color: '#3b82f6' },
                ].map(({ icon: Icon, label, color }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `rgba(${hexToRgb(color)}, 0.07)`, border: `1px solid rgba(${hexToRgb(color)}, 0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '61%', label: 'Less hiring bias', color: '#4f46e5', sub: 'vs. résumé screening' },
                { value: '3×', label: 'Better retention', color: '#10b981', sub: 'vs. interview-only', offset: true },
                { value: '94%', label: 'Candidate NPS', color: '#6366f1', sub: 'rated fair & transparent' },
                { value: '12 days', label: 'Avg. time to hire', color: '#3b82f6', sub: 'industry avg: 45 days', offset: true },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--color-bg-primary)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '18px', padding: '1.75rem 1.5rem', textAlign: 'center', transform: s.offset ? 'translateY(1.5rem)' : 'none', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: s.color, marginBottom: '0.25rem' }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem', color: 'var(--color-text-primary)' }}>{s.label}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.68rem' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(79,70,229,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--color-text-primary)' }}>
            Hire by Truth.
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '3rem', maxWidth: '460px', margin: '0 auto 3rem' }}>
            Stop sifting through CVs. Start seeing talent for what it actually is — real work, peer-voted.
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

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '79,70,229'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}
