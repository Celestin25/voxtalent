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
    color: '#d4af37',
    bullets: ['Tied to the actual job scope', 'Deadline and prize pool set upfront', 'A scoring rubric is attached from the start'],
  },
  {
    num: 2,
    title: 'Candidates Submit Their Work',
    desc: 'Names, photos, and CVs are stripped before reviewers see anything. The work speaks on its own — not where someone went to school, and not how good they are at interviews.',
    icon: ShieldCheck,
    color: '#6366f1',
    bullets: ['No personal details visible to voters', 'Open to candidates worldwide', 'Everyone competes on the same terms'],
  },
  {
    num: 3,
    title: 'Your Team Weighs In',
    desc: 'Employees score each submission on their own, against a shared rubric. Because no one can see what others voted, every score stays honest — no one follows the loudest voice in the room.',
    icon: Users,
    color: '#3b82f6',
    bullets: ['Each reviewer scores independently', 'Weighted by relevant expertise', 'Results are compiled automatically'],
  },
  {
    num: 4,
    title: 'Hire With Confidence',
    desc: 'The best work rises naturally from the scores. You get a full picture of who solved the problem and how — with every vote on record. No guesswork, no politics.',
    icon: Trophy,
    color: '#10b981',
    bullets: ['Complete audit trail on every decision', 'Team consensus is on record', 'One clear hire recommendation'],
  },
]

const roles = [
  {
    label: 'For Companies',
    icon: Building2,
    color: '#d4af37',
    bg: 'rgba(212,175,55,0.06)',
    border: 'rgba(212,175,55,0.18)',
    items: [
      'Post a challenge in under 5 minutes',
      'Set your own rubric and prize pool',
      'Watch submissions come in anonymously',
      'Your team scores — you make the final call',
      'Download a full merit report when done',
    ],
  },
  {
    label: 'For Candidates',
    icon: User,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
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
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.18)',
    items: [
      'Review anonymous submissions in your queue',
      'Score against a clear rubric — no bias traps',
      'Help pick your next teammate',
      'Your vote is private and weighted',
      'No account required to vote',
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
  'The whole team scores — one averaged signal',
  'Anonymous work only — pure merit',
  'Real task output shows what someone can actually do',
  'Full audit trail on every hire',
  'The team chose this person — natural fit from day one',
  'Average time to hire: 12 days',
]

const stats = [
  { value: '61%', label: 'Less hiring bias', color: '#d4af37', icon: ShieldCheck },
  { value: '3×', label: 'Higher 1-year retention', color: '#10b981', icon: TrendingUp },
  { value: '12 days', label: 'Average time to hire', color: '#6366f1', icon: Clock },
  { value: '94%', label: 'Candidate satisfaction', color: '#f43f5e', icon: Star },
]

export default function HowItWorksPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1e', color: '#f0f0f0', fontFamily: 'inherit', paddingTop: '5rem' }}>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '6rem 0 4rem', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '350px', background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 16px', borderRadius: '9999px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.22)', color: '#d4af37', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
            <Cpu size={12} /> How It Works
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Proof, Not <span style={{ color: '#d4af37' }}>Promises.</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            VoxTalent replaces gut feelings with anonymous, merit-based challenges scored by the people who will actually work with the hire.
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
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.012)', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '2rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ color: s.color, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, lineHeight: 1, marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ color: '#6b7280', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Four Steps to a Better Hire</h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>A process your whole team can actually trust.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: '20px',
                    padding: '2.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Background step number */}
                  <div style={{ position: 'absolute', top: '-10px', right: '20px', fontSize: '7rem', fontWeight: 900, color: step.color, opacity: 0.05, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `rgba(${hexToRgb(step.color)}, 0.1)`, border: `1px solid rgba(${hexToRgb(step.color)}, 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} style={{ color: step.color }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: step.color, background: `rgba(${hexToRgb(step.color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(step.color)}, 0.15)`, borderRadius: '9999px', padding: '2px 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step {step.num}</span>
                    </div>
                  </div>

                  <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{step.desc}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {step.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#b0b0b8', lineHeight: 1.5 }}>
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
      <section style={{ padding: '5rem 0', background: 'rgba(99,102,241,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Everyone Has a Seat at the Table</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>VoxTalent is designed around all three sides of the hiring process.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {roles.map((role, i) => {
              const Icon = role.icon
              return (
                <div key={i} style={{ background: role.bg, border: `1px solid ${role.border}`, borderRadius: '20px', padding: '2.25rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `rgba(${hexToRgb(role.color)}, 0.1)`, border: `1px solid ${role.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={19} style={{ color: role.color }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: role.color }}>{role.label}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {role.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: '#c4c4cc', lineHeight: 1.5 }}>
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
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Old Way vs. The Right Way</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>See the difference side by side.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <XCircle size={17} style={{ color: '#f43f5e' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f43f5e' }}>Traditional Hiring</span>
              </div>
              <ul style={{ padding: '1.5rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {traditional.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6 }}>
                    <XCircle size={13} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px', opacity: 0.6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: '18px', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={17} style={{ color: '#d4af37' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#d4af37' }}>VoxTalent</span>
              </div>
              <ul style={{ padding: '1.5rem 1.75rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {voxtalent.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#c4c4cc', lineHeight: 1.6 }}>
                    <CheckCircle2 size={13} style={{ color: '#d4af37', flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section style={{ padding: '5rem 0', background: 'rgba(99,102,241,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Why Collective Scoring Actually Works
              </h2>
              <p style={{ color: '#9ca3af', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
                Studies from MIT Sloan and Harvard Business Review have shown that group evaluation of real work samples predicts job performance far better than a standard interview. VoxTalent is built around that finding.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  { icon: Eye, label: 'Anonymity removes affinity bias', color: '#d4af37' },
                  { icon: Lock, label: 'Private votes keep scores honest', color: '#6366f1' },
                  { icon: BarChart3, label: 'Averaged scores smooth out outliers', color: '#10b981' },
                  { icon: Award, label: 'Work samples are job-relevant predictors', color: '#f43f5e' },
                ].map(({ icon: Icon, label, color }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `rgba(${hexToRgb(color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(color)}, 0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#d4d4dc' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { value: '61%', label: 'Less hiring bias', color: '#d4af37', sub: 'vs. résumé screening' },
                { value: '3×', label: 'Better retention', color: '#10b981', sub: 'vs. interview-only', offset: true },
                { value: '94%', label: 'Candidate NPS', color: '#6366f1', sub: 'rated fair & transparent' },
                { value: '12 days', label: 'Avg. time to hire', color: '#f43f5e', sub: 'industry avg: 45 days', offset: true },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '1.75rem 1.5rem', textAlign: 'center', transform: s.offset ? 'translateY(1.5rem)' : 'none' }}>
                  <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: s.color, marginBottom: '0.25rem' }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.25rem', color: '#e5e5ea' }}>{s.label}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.68rem' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Hire by Truth.
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '3rem', maxWidth: '460px', margin: '0 auto 3rem' }}>
            Stop sifting through CVs. Start seeing talent for what it actually is — real work, peer-verified.
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
  if (!result) return '255,255,255'
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
}
