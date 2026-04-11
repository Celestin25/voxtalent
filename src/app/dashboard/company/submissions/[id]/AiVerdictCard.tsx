'use client'

import { useState } from 'react'
import { Sparkles, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { requestAiVerdict } from './ai-actions'

export default function AiVerdictCard({ submissionId, existingVerdict }: { 
  submissionId: string; 
  existingVerdict?: { score: number; critique: string; evaluatedAt: Date } | null 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze() {
    setLoading(true)
    setError(null)
    const result = await requestAiVerdict(submissionId)
    if (!result.success) {
      setError(result.error || "Failed to analyze.")
      setLoading(false)
    } else {
      router.refresh()
    }
  }

  if (existingVerdict) {
    const aiColor = existingVerdict.score >= 7 ? '#d97706' : existingVerdict.score >= 4 ? '#ea580c' : 'var(--color-accent-primary)'

    return (
      <div style={{ 
        background: '#fff',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(79,70,229,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(79,70,229,0.05)', borderRadius: '50%', filter: 'blur(30px)' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
          <Sparkles size={18} style={{ color: 'var(--color-accent-primary)' }} />
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-primary)', margin: 0 }}>AI Technical Verdict</h3>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: aiColor }}>{existingVerdict.score} 🍋</div>
          <div style={{ fontSize: '0.7rem', color: '#000', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.25rem' }}>Automated Critique Level</div>
        </div>

        <div style={{ 
          background: 'rgba(7, 44, 155, 0.03)', 
          padding: '1.25rem', 
          borderRadius: '12px', 
          border: '1px solid rgba(79,70,229,0.08)',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          color: '#000',
          fontStyle: 'italic'
        }}>
          "{existingVerdict.critique}"
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>
          <CheckCircle2 size={12} /> Analysis completed {new Date(existingVerdict.evaluatedAt).toLocaleDateString()}
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      background: 'rgba(79,70,229,0.04)',
      borderRadius: '20px',
      padding: '2rem',
      border: '2px dashed rgba(79,70,229,0.2)',
      textAlign: 'center',
      marginBottom: '1.5rem'
    }}>
      <Sparkles size={32} style={{ color: 'var(--color-accent-primary)', margin: '0 auto 1.25rem', opacity: 0.5 }} />
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: '0.5rem' }}>AI Insights Ready</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Get an automated technical critique and lemon score to compare with your team's feedback.
      </p>
      
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', fontSize: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      <button 
        onClick={handleAnalyze}
        disabled={loading}
        className="btn-primary" 
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Request AI Verdict</>}
      </button>
    </div>
  )
}
