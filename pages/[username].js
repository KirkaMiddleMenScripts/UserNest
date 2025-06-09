import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { username } = params;

  // Fetch the user profile by username
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: data,
    },
  };
}

export default function UserProfile({ user }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${user.background || '/default-bg.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '0 0 5px black',
        flexDirection: 'column',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', margin: 0 }}>
        {user.displayName || user.username}
      </h1>
      <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>@{user.username}</p>
    </div>
  );
}
