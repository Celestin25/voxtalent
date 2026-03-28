import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  ShieldCheck,
  TrendingUp,
  Zap,
  Globe,
  Award,
  Heart,
} from 'lucide-react'

const values = [
  {
    icon: Eye,
    title: 'Radical Transparency',
    desc: 'Every hiring decision on VoxTalent comes with a full audit trail. Candidates know how they were evaluated. Companies know why someone was chosen. No black boxes.',
    color: '#4f46e5',
  },
  {
    icon: ShieldCheck,
    title: 'Anonymity by Design',
    desc: 'We strip names, photos, and schools before any reviewer sees a submission. Bias is a systems problem — we solve it at the architecture level.',
    color: '#6366f1',
  },
  {
    icon: Users,
    title: 'Collective Intelligence',
    desc: 'No single manager should have all the power in a hire. We aggregate the judgment of the people who will actually work with the candidate.',
    color: '#3b82f6',
  },
  {
    icon: Target,
    title: 'Merit Over Pedigree',
    desc: 'We believe the best predictor of job performance is job-relevant work — not where someone studied or who they know.',
    color: '#10b981',
  },
]

const team = [
  {
    name: 'Sophia Reyes',
    role: 'Co-founder & CEO',
    bg: '#4f46e5',
    initials: 'SR',
    quote: 'I watched brilliant people get filtered out by résumé screeners for a decade. VoxTalent is the antidote.',
  },
  {
    name: 'Marcus Chen',
    role: 'Co-founder & CTO',
    bg: '#6366f1',
    initials: 'MC',
    quote: 'The math behind collective voting is clear — averaged peer judgment outperforms individual expert judgment every time.',
  },
  {
    name: 'Aisha Okonkwo',
    role: 'Head of Product',
    bg: '#10b981',
    initials: 'AO',
    quote: 'Great hiring products disappear into the background. Our job is to make fairness feel effortless.',
  },
  {
    name: 'Daniel Park',
    role: 'Head of Growth',
    bg: '#3b82f6',
    initials: 'DP',
    quote: 'Companies that hire on merit retain longer, build faster, and outperform. That story sells itself.',
  },
]

const stats = [
  { value: '1,200+', label: 'Companies hiring on merit', color: '#4f46e5' },
  { value: '48,000+', label: 'Candidates evaluated fairly', color: '#10b981' },
  { value: '94%', label: 'Candidate satisfaction rate', color: '#6366f1' },
  { value: '61%', label: 'Less bias than traditional hiring', color: '#3b82f6' },
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', fontFamily: 'inherit', paddingTop: '5rem' }}>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '7rem 0 5rem', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 16px', borderRadius: '9999px', background: 'rgba(79,70,229,0.07)', border: '1px solid rgba(79,70,229,0.2)', color: '#4f46e5', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
            <Heart size={12} /> Our Mission
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            Hiring Should Be <span style={{ color: '#4f46e5' }}>Earned.</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            VoxTalent was built on a simple belief: the best person for a job should be the one who does the best work — not the one who interviews best or went to the right school.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/challenges" className="btn-primary" style={{ gap: '8px', display: 'inline-flex', alignItems: 'center' }}>
              See Open Challenges <ArrowRight size={16} />
            </Link>
            <Link href="/signup?role=company" className="btn-outline">
              Start Hiring
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(79,70,229,0.1)', borderBottom: '1px solid rgba(79,70,229,0.1)', background: 'var(--color-bg-secondary)', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: '2.25rem 1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(79,70,229,0.08)' : 'none' }}>
                <div style={{ color: s.color, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, lineHeight: 1, marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '9999px', background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.15)', color: '#4f46e5', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                <Globe size={11} /> Our Story
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.5rem', lineHeight: 1.15, color: 'var(--color-text-primary)' }}>
                Built out of Frustration With the Status Quo
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                VoxTalent started in 2023 when our founders — coming from engineering, behavioral science, and talent operations — kept running into the same broken pattern: exceptional candidates filtered out because their CV didn't fit a template, or hired because they interviewed well despite having no real skill.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                We asked a different question: what if every candidate competed on the same real challenge, and the people who would actually work with them voted on the results — anonymously?
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                The research backed it up. MIT Sloan and Harvard Business Review studies consistently show that work-sample evaluation by a group outperforms individual interviews. We built the infrastructure to make that the default.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: Zap, label: 'Founded', value: '2023', color: '#4f46e5' },
                { icon: Globe, label: 'Countries', value: '40+', color: '#10b981' },
                { icon: TrendingUp, label: 'Challenges run', value: '8,400+', color: '#6366f1' },
                { icon: Award, label: 'Hires made', value: '12,000+', color: '#3b82f6' },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <div key={i} style={{ background: 'var(--color-bg-secondary)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '18px', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-card)', transform: i % 2 === 1 ? 'translateY(1.25rem)' : 'none' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: `rgba(${hexToRgb(color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(color)}, 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.9rem' }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color, marginBottom: '0.25rem' }}>{value}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-secondary)', borderTop: '1px solid rgba(79,70,229,0.08)', borderBottom: '1px solid rgba(79,70,229,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>What We Stand For</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>Four principles that guide every product decision we make.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} style={{ background: 'var(--color-bg-primary)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-card)' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `rgba(${hexToRgb(v.color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(v.color)}, 0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={21} style={{ color: v.color }} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', letterSpacing: '-0.01em', color: 'var(--color-text-primary)' }}>{v.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>The Team Behind VoxTalent</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>People who obsess over fair hiring — and the systems that make it possible.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {team.map((member, i) => (
              <div key={i} style={{ background: 'var(--color-bg-secondary)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '20px', padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: member.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                  {member.initials}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', color: 'var(--color-text-primary)' }}>{member.name}</h3>
                <p style={{ color: member.bg, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>{member.role}</p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.65, fontStyle: 'italic' }}>&ldquo;{member.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(79,70,229,0.08)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(79,70,229,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--color-text-primary)' }}>
            Join the Movement.
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 3rem', lineHeight: 1.75 }}>
            Whether you're a company tired of bad hires or a candidate tired of being overlooked — VoxTalent is built for you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup?role=company" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '0.875rem', gap: '8px', display: 'inline-flex', alignItems: 'center' }}>
              Post a Challenge <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn-outline" style={{ padding: '0.9rem 2.5rem', fontSize: '0.875rem' }}>
              See How It Works
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
