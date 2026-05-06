'use client'

import { useState, useRef } from 'react'
import { Loader2, CheckCircle, ArrowRight, Upload, X, FileText, Globe, Phone, Mail, Linkedin, User } from 'lucide-react'
import { submitSolution } from '../actions'
import styles from './page.module.css'
import Link from 'next/link'

export default function SubmissionForm({ challengeId, isInternalCandidate }: { challengeId: string, isInternalCandidate?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState<File | null>(null)
  
  const resumeRef = useRef<HTMLInputElement>(null)
  const coverLetterRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    if (isInternalCandidate) {
      if (file) formData.append('file', file)
    } else {
      if (resume) formData.append('resume', resume)
      if (coverLetter) formData.append('coverLetter', coverLetter)
    }
    formData.append('challengeId', challengeId)

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

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.1)',
    background: 'white',
    fontSize: '0.95rem',
    color: 'black',
    boxSizing: 'border-box' as const
  }

  const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.4rem',
    display: 'block'
  }

  const fieldGroupStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
    marginBottom: '1.25rem'
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ color: '#10b981', marginBottom: '1.5rem' }}>
          <CheckCircle size={60} style={{ margin: '0 auto' }} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Application Submitted!</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Thank you for applying. We'll review your profile and get back to you soon.
        </p>
        <button onClick={() => setIsOpen(false)} className="btn-primary" style={{ width: '100%' }}>
          Close
        </button>
      </div>
    )
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="btn-primary" 
        style={{ width: '100%', height: '3.5rem', fontSize: '1.1rem', fontWeight: 700 }}
      >
        Apply Now
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: '#f8fafc',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            borderRadius: '16px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            {/* Header */}
            <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', margin: 0, fontFamily: 'var(--font-heading)' }}>Apply for this job</h2>
                <p style={{ fontSize: '0.9rem', color: '#334155', marginTop: '0.4rem', fontWeight: 500 }}>* indicates a required field</p>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

                {isInternalCandidate ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>First Name *</label>
                        <input name="firstName" required style={inputStyle} placeholder="First name" />
                      </div>
                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>Last Name *</label>
                        <input name="lastName" required style={inputStyle} placeholder="Last name" />
                      </div>
                    </div>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Email *</label>
                      <input name="email" type="email" required style={inputStyle} placeholder="email@example.com" />
                    </div>

                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Your Solution (Optional)</label>
                      <textarea name="content" style={{ ...inputStyle, resize: 'vertical' }} rows={6} placeholder="Provide your written solution or links to your work..." />
                    </div>

                    <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                      <label style={labelStyle}>Attach File (Optional)</label>
                      <div 
                        onClick={() => fileRef.current?.click()}
                        style={{ border: '2px dashed rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: file ? 'rgba(16,185,129,0.03)' : 'white' }}
                      >
                        {file ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10b981' }}>
                            <CheckCircle size={20} /> <span style={{ fontWeight: 600 }}>{file.name}</span>
                          </div>
                        ) : (
                          <div style={{ color: '#64748b' }}>
                            <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>Upload Solution Document</p>
                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>PDF, ZIP, DOCX, TXT</p>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={fileRef} onChange={e => setFile(e.target.files?.[0] || null)} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.txt,.zip" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Name Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>First Name *</label>
                    <input name="firstName" required style={inputStyle} placeholder="First name" />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Last Name *</label>
                    <input name="lastName" required style={inputStyle} placeholder="Last name" />
                  </div>
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Preferred First Name</label>
                  <input name="preferredFirstName" style={inputStyle} placeholder="Preferred name" />
                </div>

                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" required style={inputStyle} placeholder="email@example.com" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Country</label>
                    <input name="country" style={inputStyle} placeholder="Your country" />
                  </div>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Phone *</label>
                    <input name="phone" required style={inputStyle} placeholder="Phone number" />
                  </div>
                </div>

                {/* File Upload Section */}
                <div style={{ marginBottom: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Resume/CV *</label>
                    <div 
                      onClick={() => resumeRef.current?.click()}
                      style={{ border: '2px dashed rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: resume ? 'rgba(16,185,129,0.03)' : 'white' }}
                    >
                      {resume ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10b981' }}>
                          <CheckCircle size={20} /> <span style={{ fontWeight: 600 }}>{resume.name}</span>
                        </div>
                      ) : (
                        <div style={{ color: '#64748b' }}>
                          <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>Attach Resume/CV</p>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>PDF, DOCX, TXT</p>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={resumeRef} onChange={e => setResume(e.target.files?.[0] || null)} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.txt" />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Cover Letter</label>
                    <div 
                      onClick={() => coverLetterRef.current?.click()}
                      style={{ border: '2px dashed rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: coverLetter ? 'rgba(16,185,129,0.03)' : 'white' }}
                    >
                      {coverLetter ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10b981' }}>
                          <CheckCircle size={20} /> <span style={{ fontWeight: 600 }}>{coverLetter.name}</span>
                        </div>
                      ) : (
                        <div style={{ color: '#64748b' }}>
                          <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-accent-primary)' }}>Attach Cover Letter</p>
                          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>PDF, DOCX, TXT</p>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={coverLetterRef} onChange={e => setCoverLetter(e.target.files?.[0] || null)} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.txt" />
                  </div>
                </div>

                {/* Questions Section */}
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>What interests and excites you about joining our team? *</label>
                    <textarea name="interestQuestion" required style={{ ...inputStyle, resize: 'vertical' }} rows={4} placeholder="Max 200 words" />
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Why do you think you'd be a good fit? *</label>
                    <textarea name="fitQuestion" required style={{ ...inputStyle, resize: 'vertical' }} rows={4} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Salary Expectations (USD) *</label>
                      <input name="salaryExpectations" required style={inputStyle} placeholder="e.g. 50000" />
                    </div>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>When can you join? *</label>
                      <input name="joinDate" required style={inputStyle} placeholder="e.g. Immediately, 2 weeks notice" />
                    </div>
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Country of Residence *</label>
                    <input name="countryOfResidence" required style={inputStyle} />
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>Do you require visa sponsorship? *</label>
                    <select name="visaSponsorship" required style={inputStyle}>
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>Gender *</label>
                      <select name="gender" required style={inputStyle}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Decline">Decline to self-identify</option>
                      </select>
                    </div>
                    <div style={fieldGroupStyle}>
                      <label style={labelStyle}>LinkedIn Profile</label>
                      <input name="linkedInProfile" style={inputStyle} placeholder="https://linkedin.com/in/..." />
                    </div>
                  </div>

                  <div style={fieldGroupStyle}>
                    <label style={labelStyle}>How did you hear about this role? *</label>
                    <select name="heardAboutRole" required style={inputStyle}>
                      <option value="">Select...</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                </>
                )}

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary" 
                    style={{ flex: 1, height: '3.5rem', fontSize: '1.1rem' }}
                  >
                    {loading ? <Loader2 className="animate-spin" size={24} style={{ margin: '0 auto' }} /> : 'Submit Application'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    style={{ padding: '0 1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
