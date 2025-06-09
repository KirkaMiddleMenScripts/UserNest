import { supabase } from '../common/supabaseClient.js';

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: window.location.origin + '/settings/index.html',
    },
  });
  if (error) alert('Login error: ' + error.message);
});

// Redirect if already logged in
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    window.location.href = '/settings/index.html';
  }
});
