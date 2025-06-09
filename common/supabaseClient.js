import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your Supabase keys encoded in Base64 (replace these with your own encoded keys)
const encodedSupabaseUrl = 'aHR0cHM6Ly96c3RtbmF6aGdhZmVkcnpxamttbi5zdXBhYmFzZS5jbw=='; // example
const encodedAnonKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5wemRHMXVZWHBvWjJGbVpXUnllbkZxYTIxdUlpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTkRrME16UTVNRGdzSW1WNGNDSTZNakEyTlRBeE1Ea3dPSDAuRkEyZktxRnh6d21yeXMwaTNWRzJXUG52Tlk5WGhQSVN4TXN5X1MzdUpIZw=='; // example

// Base64 decode function
function base64Decode(encodedStr) {
  return atob(encodedStr);
}

const SUPABASE_URL = base64Decode(encodedSupabaseUrl);
const SUPABASE_ANON_KEY = base64Decode(encodedAnonKey);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
