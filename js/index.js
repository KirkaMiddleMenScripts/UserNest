document.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) return window.location.href = "/settings";

  document.getElementById("login-btn").onclick = async () => {
    await supabase.auth.signInWithOAuth({ provider: "discord" });
  };
});
