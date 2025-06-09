import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [displayName, setDisplayName] = useState('')
  const [background, setBackground] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) fetchProfile()
  }, [session])

  async function fetchProfile() {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    if (data) {
      setDisplayName(data.displayName || '')
      setBackground(data.background || '')
    }
    setLoading(false)
  }

  async function updateProfile() {
    setLoading(true)
    const updates = {
      id: session.user.id,
      username: session.user.username,
      displayName,
      background,
    }
    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) alert('Error updating profile')
    else alert('Profile updated!')
    setLoading(false)
  }

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Please log in.</p>

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 40 }}>
      <h2>Settings for {session.user.username}</h2>
      <label>Display Name:</label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <label>Background URL:</label>
      <input
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={updateProfile} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <hr />
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}
