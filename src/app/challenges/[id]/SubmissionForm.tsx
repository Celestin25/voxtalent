'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { submitSolution } from '../actions'
import styles from './page.module.css'
import Link from 'next/link'

export default function SubmissionForm({ challengeId }: { challengeId: string }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    try {
      const result = await submitSolution(formData)
      if (result.success) {
        setSubmitted(true)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#10b981' }}>
          <CheckCircle size={40} />
        </div>
        <h2 className={styles.sectionTitle}>Submission Received</h2>
        <p className="text-secondary mb-8">
          Your solution has been sent for anonymous review. Our employees will vote based on your merit alone.
        </p>
        <Link href="/dashboard/candidate" className="btn-primary">Go to My Dashboard</Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <input type="hidden" name="challengeId" value={challengeId} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Your Solution (Link or text)</label>
        <textarea 
          name="content" 
          required 
          rows={6}
          placeholder="Paste your link (e.g. GitHub repo, Vercel deployment) or write your solution here..."
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', color: 'white', resize: 'vertical', fontSize: '1rem' }}
        />
      </div>

      {error && <p style={{ color: '#f43f5e', fontSize: '0.9rem' }}>{error}</p>}

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={loading}
        style={{ width: '100%', height: '4rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : (
          <>Submit Now <ArrowRight size={20} /></>
        )}
      </button>
    </form>
  )
}
