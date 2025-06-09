import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Settings() {
  const [displayName, setDisplayName] = useState('');
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return router.push('/');
    });
  }, []);

  const save = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        username,
        displayName,
        backgroundUrl,
      });

    if (!error) router.push(`/${username}`);
  };

  return (
    <main>
      <h1>Settings</h1>
      <input
        placeholder="Custom URL (Akuma)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        placeholder="Background Image URL"
        value={backgroundUrl}
        onChange={(e) => setBackgroundUrl(e.target.value)}
      />
      <button onClick={save}>Save</button>
    </main>
  );
}
