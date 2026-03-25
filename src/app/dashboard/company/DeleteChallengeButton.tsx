'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteChallenge } from './actions'

export default function DeleteChallengeButton({ challengeId }: { challengeId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this challenge? This will permanently remove all solutions and votes.')) {
      return
    }

    setLoading(true)
    try {
      await deleteChallenge(challengeId)
    } catch (error: any) {
      alert(error.message || 'Failed to delete challenge')
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="btn-outline"
      style={{ 
        padding: '0.4rem', 
        borderColor: '#f43f5e', 
        color: '#f43f5e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title="Delete Challenge"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  )
}
