'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { castVote } from '../actions'

export default function VotingForm({ submissionId, isSignedIn }: { submissionId: string; isSignedIn: boolean }) {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (score === null) {
      setError('Please select a lemon count (0-10) before submitting.')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    formData.set('submissionId', submissionId)
    formData.set('score', score.toString())

    try {
      const result = await castVote(formData)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          window.location.href = isSignedIn ? '/dashboard/employee' : '/challenges'
        }, 1500)
      } else if (result.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ color: '#10b981', marginBottom: '1rem' }}><CheckCircle size={32} style={{ margin: '0 auto' }} /></div>
      <p style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.5rem' }}>Critique Recorded!</p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Redirecting you now…</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.8rem', color: '#000', fontWeight: 800, textTransform: 'uppercase' }}>
            CRITIQUE (0 – 10 LEMONS)
          </label>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>
            {score === null ? 'Select below' : `${score} Lemon${score === 1 ? '' : 's'} (${score === 0 ? 'Excellent' : score === 10 ? 'Very Poor' : 'Needs attention'})`}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setScore(0)}
            style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: '2px solid',
              borderColor: score === 0 ? 'var(--color-accent-primary)' : 'rgba(79,70,229,0.1)',
              background: score === 0 ? 'rgba(79,70,229,0.05)' : 'transparent',
              color: score === 0 ? 'var(--color-accent-primary)' : '#000',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            0 Lemons — (Excellent - No Bad Points)
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.03)', padding: '0.5rem', borderRadius: '10px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setScore(num)}
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  padding: '2px',
                  filter: (score !== null && num <= score) || (hover !== null && num <= hover) ? 'none' : 'grayscale(100%) opacity(0.3)',
                  transform: (hover !== null && num <= hover) ? 'scale(1.2)' : 'none',
                  transition: 'all 0.15s'
                }}
                title={`${num} Lemons - ${num === 10 ? 'Very Poor' : 'Poor'}`}
              >
                🍋
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: '#000', fontWeight: 800, textTransform: 'uppercase' }}>Feedback (Optional)</label>
        <textarea
          name="feedback"
          rows={4}
          placeholder="What stood out about this solution?"
          style={{ background: 'rgba(79,70,229,0.04)', border: '1px solid rgba(79,70,229,0.12)', borderRadius: '8px', padding: '1rem', color: '#000', resize: 'vertical' }}
        />
      </div>

      {error && <p style={{ color: '#f43f5e', fontSize: '0.8rem' }}>{error}</p>}

      <button
        type="submit"
        className="btn-primary"
        disabled={loading || score === null}
        style={{ height: '3.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: score === null ? 0.5 : 1 }}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Observations'}
      </button>
    </form>
  )
}
