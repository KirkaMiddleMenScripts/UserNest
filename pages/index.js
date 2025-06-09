import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${location.origin}/settings` }
    });
  };

  return (
    <main>
      <h1>Login with Discord</h1>
      <button onClick={login}>Login</button>
    </main>
  );
}
