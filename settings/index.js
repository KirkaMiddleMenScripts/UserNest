import { supabase } from '../common/supabaseClient.js';

function base64Encode(str) {
  return btoa(str);
}

function base64Decode(encodedStr) {
  return atob(encodedStr);
}

const emailEl = document.getElementById('email');
const displayNameInput = document.getElementById('display-name');
const bgColorInput = document.getElementById('bg-color');
const encodedDisplayNameInput = document.getElementById('encoded-display-name');
const saveBtn = document.getElementById('save-btn');
const logoutBtn = document.getElementById('logout-btn');

let userId = null;

async function loadProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = '/login/';
    return;
  }

  userId = session.user.id;
  emailEl.textContent = session.user.email;

  const { data, error } = await supabase
    .from('profiles')
    .select('display_name, bg_color')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    alert('Error loading profile: ' + error.message);
    return;
  }

  if (data) {
    displayNameInput.value = data.display_name || '';
    bgColorInput.value = data.bg_color || '#ffffff';
    document.body.style.backgroundColor = data.bg_color || '#ffffff';
    encodedDisplayNameInput.value = base64Encode(displayNameInput.value || '');
  }

  displayNameInput.addEventListener('input', () => {
    encodedDisplayNameInput.value = base64Encode(displayNameInput.value);
  });
}

saveBtn.addEventListener('click', async () => {
  const displayName = displayNameInput.value.trim();
  const bgColor = bgColorInput.value;

  const { error } = await supabase.from('profiles').upsert(
    {
      id: userId,
      display_name: displayName,
      bg_color: bgColor,
    },
    { onConflict: 'id' }
  );

  if (error) {
    alert('Error saving profile: ' + error.message);
  } else {
    alert('Profile saved!');
    document.body.style.backgroundColor = bgColor;
  }
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = '/login/';
});

loadProfile();
