'use client'

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="btn-outline"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <LogOut size={18} />
      Sign Out
    </button>
  )
}
