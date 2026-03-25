'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, Building2, User, CheckCircle2, Loader2, ChevronLeft } from 'lucide-react'
import styles from './page.module.css'

export default function SignupPage() {
  const [role, setRole] = useState<'company' | 'candidate' | null>(null)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (step === 2) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep(3)
      }, 1500)
    } else {
      setStep(step + 1)
    }
  }

  return (
    <main 
      className={styles.main}
      style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.9)), url("/hero-bg.png")' }}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Progress header */}
          <div className={styles.progressHeader}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 'none' }}>
                <div className={`${styles.stepCircle} ${step >= s ? styles.stepCircleActive : ''}`}>
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>
                {s < 3 && <div className={`${styles.stepLine} ${step > s ? styles.stepLineActive : ''}`} />}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h1 className={styles.title}>
              Join <span className="text-gold">VoxTalent</span>
            </h1>
            <p className={styles.subtitle}>Empowering the next generation of recruitment.</p>
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>How will you use VoxTalent?</h2>
              <div className={styles.roleGrid}>
                <div 
                  className={`${styles.roleCard} ${role === 'company' ? styles.roleCardActive : ''}`}
                  onClick={() => setRole('company')}
                >
                  <div className={styles.roleIcon}><Building2 size={24} /></div>
                  <p className={styles.roleTitle}>Company</p>
                  <p className={styles.roleDesc}>Post challenges and find verified elite talent.</p>
                </div>
                <div 
                  className={`${styles.roleCard} ${role === 'candidate' ? styles.roleCardActive : ''}`}
                  onClick={() => setRole('candidate')}
                >
                  <div className={styles.roleIcon}><User size={24} /></div>
                  <p className={styles.roleTitle}>Candidate</p>
                  <p className={styles.roleDesc}>Solve complex problems and get peer-vetted.</p>
                </div>
              </div>
              <button
                disabled={!role}
                onClick={() => setStep(2)}
                className="btn-primary"
                style={{ width: '100%', height: '3.5rem' }}
              >
                Continue <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="text-secondary hover:text-white" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
                <ChevronLeft size={16} /> GO BACK
              </button>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>
                {role === 'company' ? 'Register your company' : 'Create candidate account'}
              </h2>
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input required placeholder="John" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input required placeholder="Doe" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input type="email" required placeholder="name@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input type="password" required placeholder="••••••••" minLength={8} />
                </div>
                {role === 'company' && (
                  <div className={styles.formGroup}>
                    <label>Company Name</label>
                    <input required placeholder="Lumina Technologies" />
                  </div>
                )}
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                  style={{ width: '100%', height: '3.5rem', marginTop: '1rem' }}
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create Master Account'}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center" style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={40} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome to the Club!</h2>
              <p className="text-secondary" style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Your account is ready. We&apos;ve sent a verification link to your email. You can now access your dashboard.
              </p>
              <Link
                href={role === 'company' ? '/dashboard/company' : '/dashboard/candidate'}
                className="btn-primary"
                style={{ width: '100%', height: '3.5rem' }}
              >
                Go to Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
          )}

          <p className={styles.footerNote}>
            Already a member? <Link href="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
