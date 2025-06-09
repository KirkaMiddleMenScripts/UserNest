import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/settings')
  }, [session, router])

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      {!session && (
        <>
          <h1>Login with Discord</h1>
          <button onClick={() => signIn('discord')}>Login</button>
        </>
      )}
      {session && <p>Redirecting...</p>}
    </div>
  )
}
