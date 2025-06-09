const log = (msg) => {
  document.getElementById("log").textContent += `\n${msg}`;
};

document.getElementById('login-btn').addEventListener('click', async () => {
  log("Login button clicked");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
  });

  if (error) {
    log("Error: " + error.message);
  } else {
    log("Redirecting to Discord...");
  }
});

// Check if already logged in
supabase.auth.getSession().then(({ data }) => {
  if (data?.session) {
    log("Already logged in as " + data.session.user.email);
  } else {
    log("Not logged in.");
  }
});
