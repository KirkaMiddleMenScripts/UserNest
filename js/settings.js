let user;

async function loadProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return (window.location.href = "/");

  user = session.user;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (data) {
    document.getElementById("displayname").value = data.display_name || "";
    document.getElementById("bgcolor").value = data.background_color || "#1e1e1e";
  }
}

document.getElementById("save-btn").onclick = async () => {
  const name = document.getElementById("displayname").value.trim();
  const bg = document.getElementById("bgcolor").value;

  if (!name) return alert("Display name is required");

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: name,
    background_color: bg,
    updated_at: new Date().toISOString()
  });

  if (error) alert("Error saving: " + error.message);
  else window.location.href = `/${name}`;
};

document.getElementById("logout-btn").onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
};

loadProfile();
