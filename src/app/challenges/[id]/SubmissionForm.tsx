'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Loader2, CheckCircle, Upload, X, FileText, Film, FileSpreadsheet } from 'lucide-react'
import { submitSolution } from '../actions'
import styles from './page.module.css'
import Link from 'next/link'

type Tab = 'text' | 'file'

const ACCEPTED = '.pdf,.xls,.xlsx,.mp4,.webm,.mov,.avi'

function fileIcon(type: string) {
  if (type.startsWith('video/')) return <Film size={20} />
  if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet size={20} />
  return <FileText size={20} />
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function SubmissionForm({ challengeId }: { challengeId: string }) {
  const [tab, setTab] = useState<Tab>('text')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    if (file) {
      formData.set('file', file)
    }

    try {
      const result = await submitSolution(formData)
      if (result.success) {
        setSubmitted(true)
      } else if (result.error) {
        setError(result.error)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <input type="hidden" name="challengeId" value={challengeId} />

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(79,70,229,0.06)', borderRadius: '10px', padding: '4px' }}>
        {(['text', 'file'] as Tab[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: tab === t ? 'var(--color-accent-primary)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--color-text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {t === 'text' ? 'Write Answer' : 'Upload File'}
          </button>
        ))}
      </div>

      {/* Text tab */}
      {tab === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Your Solution (link or text)
          </label>
          <textarea
            name="content"
            rows={7}
            placeholder="Paste a link (e.g. GitHub repo, Vercel deployment) or write your solution here…"
            style={{
              background: 'rgba(79,70,229,0.04)',
              border: '1px solid rgba(79,70,229,0.15)',
              borderRadius: '12px',
              padding: '1.25rem',
              color: 'var(--color-text-primary)',
              resize: 'vertical',
              fontSize: '1rem',
            }}
          />
        </div>
      )}

      {/* File tab */}
      {tab === 'file' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Upload File <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem' }}>(PDF, Excel, Video — max 100 MB)</span>
          </label>

          {/* Drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleFileDrop}
            style={{
              border: `2px dashed ${dragging ? 'var(--color-accent-primary)' : 'rgba(79,70,229,0.25)'}`,
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragging ? 'rgba(79,70,229,0.06)' : 'rgba(79,70,229,0.02)',
              transition: 'all 0.2s',
            }}
          >
            <Upload size={28} style={{ margin: '0 auto 0.75rem', color: 'var(--color-accent-primary)', display: 'block' }} />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Drop your file here or <span style={{ color: 'var(--color-accent-primary)', fontWeight: 700 }}>click to browse</span>
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              PDF &bull; Excel (.xls / .xlsx) &bull; Video (MP4, MOV, WebM, AVI)
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED}
            style={{ display: 'none' }}
            onChange={e => setFile(e.target.files?.[0] ?? null)}
          />

          {/* Selected file preview */}
          {file && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '10px',
            }}>
              <span style={{ color: '#10b981' }}>{fileIcon(file.type)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{formatBytes(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = '' }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Optional note alongside the file */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
              Additional notes <span style={{ fontWeight: 400, textTransform: 'none' }}>(optional)</span>
            </label>
            <textarea
              name="content"
              rows={3}
              placeholder="Add any context or explanation for your uploaded file…"
              style={{
                background: 'rgba(79,70,229,0.04)',
                border: '1px solid rgba(79,70,229,0.15)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'var(--color-text-primary)',
                resize: 'vertical',
                fontSize: '0.9375rem',
              }}
            />
          </div>
        </div>
      )}

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
