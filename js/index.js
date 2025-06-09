import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zstmnazhgafedrzqjkmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdG1uYXpoZ2FmZWRyenFqa21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MzQ5MDgsImV4cCI6MjA2NTAxMDkwOH0.FA2fKqFxzwmrys0i3VG2WPnvNY9XhPISxMsy_S3uJHg'; // replace with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginBtn = document.getElementById('login-btn');

loginBtn.onclick = async () => {
  const redirectUrl = `${SUPABASE_URL}/auth/v1/callback`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error('Login error:', error.message);
    alert('Login failed: ' + error.message);
  }
};

// Check auth session on page load
window.addEventListener('load', async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return;
  }

  if (data.session) {
    console.log('User logged in:', data.session.user);
    // Redirect to custom page after login or show user info
    // Example: Redirect to /settings or /{displayname}
    window.location.href = '/settings.html'; // change as needed
  } else {
    console.log('User not logged in');
  }
});
