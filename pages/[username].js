import { supabase } from '../lib/supabaseClient';

export async function getServerSideProps(context) {
  const { username } = context.params;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data)
    return { notFound: true };

  return { props: { user: data } };
}

export default function UserPage({ user }) {
  return (
    <div
      style={{
        backgroundImage: `url(${user.backgroundUrl || '/default-bg.jpg'})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>{user.displayName || user.username}</h1>
      <p>@{user.username}</p>
    </div>
  );
}
