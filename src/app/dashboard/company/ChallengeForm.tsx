'use client'

import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { createChallenge } from './actions'
import styles from '../dashboard.module.css'

export default function ChallengeForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    try {
      const result = await createChallenge(formData)
      if (result.success) {
        setIsOpen(false)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        className="btn-primary" 
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        onClick={() => setIsOpen(true)}
      >
        <Plus size={18} /> Create Challenge
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div className={styles.card} style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            
            <h2 className={styles.cardTitle} style={{ marginBottom: '2rem' }}>New Merit Challenge</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Challenge Title</label>
                <input 
                  name="title" 
                  required 
                  placeholder="e.g. Senior Frontend Engineer - Design Systems"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Prize Pool</label>
                <input 
                  name="prize" 
                  placeholder="e.g. $5,000"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Deadline</label>
                <input 
                  name="deadline" 
                  type="date" 
                  required 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Problem Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={5}
                  placeholder="Describe the challenge in detail..."
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', color: 'white', resize: 'vertical' }}
                />
              </div>

              {error && <p style={{ color: '#f43f5e', fontSize: '0.9rem' }}>{error}</p>}

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ height: '3.5rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Launch Challenge'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
