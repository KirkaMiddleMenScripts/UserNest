let user;

async function loadProfile() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    alert('You must login first.');
    window.location.href = 'index.html';
    return;
  }

  user = session.user;

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (data) {
    document.getElementById('displayname').value = data.display_name || '';
    document.getElementById('bgcolor').value = data.background_color || '#ffffff';
  }
}

async function saveProfile() {
  const displayName = document.getElementById('displayname').value.trim();
  const backgroundColor = document.getElementById('bgcolor').value;

  if (!displayName) return alert('Display Name is required.');

  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('display_name', displayName)
    .neq('id', user.id)
    .single();

  if (existing) return alert('Display name already in use.');

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    display_name: displayName,
    background_color: backgroundColor,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    alert('Error saving: ' + error.message);
  } else {
    alert(`Saved! Visit /${displayName}`);
  }
}

document.getElementById('save-btn').onclick = saveProfile;
document.getElementById('logout-btn').onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
};

loadProfile();
