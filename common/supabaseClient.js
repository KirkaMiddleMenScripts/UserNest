import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Your Supabase keys encoded in Base64 (replace these with your own encoded keys)
const encodedSupabaseUrl = 'aHR0cHM6Ly95b3VyLXByb2plY3Quc3VwYWJhc2UuY28='; // example
const encodedAnonKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNkltRnVJam9pTmpBMU5UQXlOVEkyTlRJd01UQXNJbXgwYldWa0lqb2lOakUwT1RRek5ETXNJbUZ0WlNJNkltVjRjQ0k2SW5Sc1pTSTZJbE5oWkNJNkltRnVaRzUwWVhOcGJHRnlZVzFsY3k1amIyMHZZV3h6SWpwN0ltVjRjQ0k2SWpFM05UQXdOREl6TkRFaUxDSjFjbVl3SWpvaVJXVnFJaXdpYm5Wc1pTSTZJbXgwYUdWc2JDSTZJbVJoY0hCc2FXTmhkR2x2YmowaUxDSnBZWFFpT2pFMU1qZzJNVEV3TURnME9UZzVOREExTWpRdE5EVTRJaXdpY0hWaWRDSTZJbGx6YUdWdFpYTWlMQ0pwWVhRaU9pSkJNVEV4TmpZeE5ETXhNVFl3TXpnMU5UaGpNRFEwTXpFaQ=='; // example

// Base64 decode function
function base64Decode(encodedStr) {
  return atob(encodedStr);
}

const SUPABASE_URL = base64Decode(encodedSupabaseUrl);
const SUPABASE_ANON_KEY = base64Decode(encodedAnonKey);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
