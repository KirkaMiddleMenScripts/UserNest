import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`
    }
  });
  if (error) return res.status(400).json({ error: error.message });
  res.redirect('/');
}
