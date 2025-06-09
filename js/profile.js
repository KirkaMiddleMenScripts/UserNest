const params = new URLSearchParams(window.location.search);
const displayName = params.get('user');

if (!displayName) {
  document.getElementById('profile-name').textContent = 'No user specified.';
} else {
  supabase
    .from('profiles')
    .select('*')
    .eq('display_name', displayName)
    .single()
    .then(({ data, error }) => {
      if (error || !data) {
        document.getElementById('profile-name').textContent = 'User not found.';
      } else {
        document.getElementById('profile-name').textContent = `${data.display_name}'s Profile`;
        document.body.style.backgroundColor = data.background_color || '#fff';
      }
    });
}
