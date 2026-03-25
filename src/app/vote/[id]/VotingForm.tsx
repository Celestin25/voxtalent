'use client'

import { useState } from 'react'
import { Star, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { castVote } from '../actions'
import styles from '../../dashboard/dashboard.module.css'

export default function VotingForm({ submissionId }: { submissionId: string }) {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (score === 0) {
      setError('Please select a score')
      return
    }

    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('submissionId', submissionId)
    formData.append('score', score.toString())

    try {
      const result = await castVote(formData)
      if (result.success) {
        setSuccess(true)
        window.location.href = '/dashboard/employee'
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <div style={{ color: '#10b981', marginBottom: '1rem' }}><CheckCircle size={32} style={{ margin: '0 auto' }} /></div>
      <p style={{ color: '#10b981', fontWeight: 700, marginBottom: '1.5rem' }}>Merit Vote Recorded!</p>
      <Link href="/dashboard/employee" className="btn-primary" style={{ display: 'block', textDecoration: 'none' }}>
        Next in Queue
      </Link>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
          Technical Score (1-10)
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setScore(num)}
              onMouseEnter={() => setHover(num)}
              onMouseLeave={() => setHover(0)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: (hover >= num || score >= num) ? 'var(--color-accent-primary)' : 'rgba(255,255,255,0.1)',
                background: (hover >= num || score >= num) ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                color: (hover >= num || score >= num) ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                transition: 'all 0.2s'
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Feedback (Optional)</label>
        <textarea 
          name="feedback" 
          rows={4}
          placeholder="What did you think of this solution?"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white', resize: 'vertical' }}
        />
      </div>

      {error && <p style={{ color: '#f43f5e', fontSize: '0.8rem' }}>{error}</p>}

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={loading}
        style={{ height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Vote'}
      </button>
    </form>
  )
}
