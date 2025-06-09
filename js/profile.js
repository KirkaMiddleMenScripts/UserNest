const username = new URLSearchParams(location.search).get("user");

if (!username) {
  document.getElementById("name").textContent = "User not found.";
} else {
  supabase
    .from("profiles")
    .select("*")
    .eq("display_name", username)
    .single()
    .then(({ data, error }) => {
      if (error || !data) {
        document.getElementById("name").textContent = "User not found.";
      } else {
        document.getElementById("name").textContent = data.display_name;
        document.body.style.backgroundColor = data.background_color || "#1e1e1e";
      }
    });
}
