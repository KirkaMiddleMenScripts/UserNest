document.getElementById('login-btn').onclick = async () => {
  const { error } = await supabase.auth.signIn({ provider: 'discord' });
  if (error) alert('Login error: ' + error.message);
};

supabase.auth.onAuthStateChange((event, session) => {
  if (session) window.location.href = 'settings.html';
});

supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) window.location.href = 'settings.html';
});
