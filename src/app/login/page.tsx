'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import styles from './page.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Please check your email and password.')
      } else {
        // Use the centralized dashboard redirector we created
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main 
      className={styles.main}
      style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0.9)), url("/hero-bg.png")' }}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Log in to the future of merit-based hiring.</p>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '1rem', height: '3.5rem' }}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <div className={styles.demoBox}>
            <p className={styles.demoTitle}>Universal Demo Access</p>
            <div className={styles.demoGrid}>
              <div className={styles.demoItem}>Admin: <b>admin@company.com</b> / <b>admin</b></div>
              <div className={styles.demoItem}>HR: <b>hr@company.com</b> / <b>hr@company</b></div>
              <div className={styles.demoItem}>Employee: <b>employee@company.com</b> / <b>employee</b></div>
              <div className={styles.demoItem}>Candidate: <b>candidate@company.com</b> / <b>candidate</b></div>
            </div>
          </div>

          <p className={styles.registerLink}>
            Don&apos;t have an account? <Link href="/signup">Join the collective</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
