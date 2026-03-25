'use client'

import { useState } from 'react'
import { Send, Upload, CheckCircle } from 'lucide-react'

interface Props {
  challengeId: string
}

export default function SubmitSolutionForm({ challengeId }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', summary: '', solution: '', file: '' })

  if (submitted) {
    return (
      <div className="glass-card" style={{ padding: '2rem', borderRadius: 16, textAlign: 'center' }}>
        <div style={{
          width: 60, height: 60,
          background: 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}>
          <CheckCircle size={28} color="#10b981" />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Submission Received!
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.9375rem' }}>
          Your solution has been submitted for challenge <strong>{challengeId}</strong>. Company employees will now review and vote on it anonymously. You&apos;ll receive an email when results are available.
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="glass-card" style={{ padding: '2rem', borderRadius: 16 }}>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        🚀 Submit Your Solution
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
        Your name and contact will only be visible to HR after voting closes — employees see anonymous submissions.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Full Name *
            </label>
            <input
              className="input"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Email *
            </label>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            One-Line Summary *
          </label>
          <input
            className="input"
            type="text"
            placeholder="Summarize your approach in one compelling sentence"
            value={form.summary}
            onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
            required
            maxLength={160}
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            This will be shown first to voters — make it count!
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Your Solution *
          </label>
          <textarea
            className="textarea"
            placeholder="Describe your solution in detail. Be thorough — explain your thinking, trade-offs, and how you approached the problem..."
            value={form.solution}
            onChange={e => setForm(f => ({ ...f, solution: e.target.value }))}
            required
            style={{ minHeight: 180 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Attachment (optional)
          </label>
          <div style={{
            border: '2px dashed var(--border)',
            borderRadius: 10,
            padding: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
          >
            <Upload size={20} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Drop a file here or click to upload
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              PDF, DOCX, ZIP, Figma link — max 20MB
            </p>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 10,
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            🔒 <strong style={{ color: 'var(--accent-light)' }}>Anonymous review guaranteed:</strong> Employees will see your solution and summary, but NOT your name, email, or identity. Names are revealed only after voting closes and only to HR.
          </p>
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Submitting...' : <><Send size={16} /> Submit Solution</>}
        </button>
      </form>
    </div>
  )
}
