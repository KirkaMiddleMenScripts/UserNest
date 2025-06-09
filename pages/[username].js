import supabase from '@/lib/supabase'

export async function getServerSideProps({ params }) {
  const { username } = params
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      profile,
    },
  }
}

export default function Profile({ profile }) {
  return (
    <div
      style={{
        height: '100vh',
        background: profile.background || '#222',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>{profile.displayName || profile.username}</h1>
      <p>Welcome to the profile page.</p>
    </div>
  )
}
