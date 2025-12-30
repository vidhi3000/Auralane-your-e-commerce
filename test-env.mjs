import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_PUBLISHABLE_KEY:', SUPABASE_PUBLISHABLE_KEY ? '***' + SUPABASE_PUBLISHABLE_KEY.slice(-4) : 'undefined');

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('Environment variables not loaded!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

(async () => {
  try {
    console.log('Testing sign-up...');
    const email = `test+${Date.now()}@example.com`;
    const password = 'Test1234!';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:8081/auth/callback'
      }
    });

    console.log('Sign-up result:');
    console.log('Data:', data);
    console.log('Error:', error);

    if (error) {
      console.error('Sign-up failed:', error.message);
    } else {
      console.log('Sign-up successful!');
    }
  } catch (err) {
    console.error('Exception:', err);
  }
})();
