'use client'

import { useRef, useState } from 'react'
import { Plus, X, Loader2, Upload, FileText, Film, FileSpreadsheet } from 'lucide-react'
import { createChallenge } from './actions'
import styles from '../dashboard.module.css'

type Tab = 'text' | 'file'

const ACCEPTED = '.pdf,.xls,.xlsx,.mp4,.webm,.mov,.avi'

function fileIcon(type: string) {
  if (type.startsWith('video/')) return <Film size={20} />
  if (type.includes('spreadsheet') || type.includes('excel') || type === 'application/vnd.ms-excel') return <FileSpreadsheet size={20} />
  return <FileText size={20} />
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ChallengeForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('text')
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    if (file) {
      formData.set('attachmentFile', file)
    }

    try {
      const result = await createChallenge(formData)
      if (result.success) {
        setIsOpen(false)
        setFile(null)
        setTab('text')
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

  function handleClose() {
    setIsOpen(false)
    setFile(null)
    setTab('text')
    setError(null)
  }

  const inputStyle = {
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '1rem',
    color: 'black',
    width: '100%',
    boxSizing: 'border-box' as const,
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
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(11,15,30,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem',
          overflowY: 'auto',
        }}>
          <div className={styles.card} style={{ width: '100%', maxWidth: '620px', position: 'relative', margin: 'auto' }}>
            <button
              onClick={handleClose}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h2 className={styles.cardTitle} style={{ marginBottom: '2rem' }}>New Merit Challenge</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Challenge Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Senior Frontend Engineer - Design Systems"
                  style={inputStyle}
                />
              </div>

              {/* Deadline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Deadline</label>
                <input
                  name="deadline"
                  type="date"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Description tab toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Problem Description</label>

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
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.05em',
                        background: tab === t ? 'var(--color-accent-primary)' : 'transparent',
                        color: tab === t ? '#fff' : 'var(--color-text-secondary)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {t === 'text' ? 'Write Text' : 'Upload File'}
                    </button>
                  ))}
                </div>

                {/* Text tab */}
                {tab === 'text' && (
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="Describe the challenge in detail..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                )}

                {/* File tab */}
                {tab === 'file' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* Hidden description for DB (not empty) */}
                    <input type="hidden" name="description" value={file?.name ?? 'See attachment'} />

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

                    {/* Optional text note alongside file */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        Additional notes <span style={{ fontWeight: 400, textTransform: 'none' }}>(optional)</span>
                      </label>
                      <textarea
                        name="descriptionNote"
                        rows={3}
                        placeholder="Add context or instructions for candidates..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && <p style={{ color: '#f43f5e', fontSize: '0.9rem' }}>{error}</p>}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || (tab === 'file' && !file)}
                style={{ height: '3.5rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
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
