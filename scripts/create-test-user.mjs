import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://girrkkunzwbsaebcawpb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_aBF0_407MIvNTA93sw1V3w_OfuSChZm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  try {
    const testEmail = 'testuser123@gmail.com';
    const testPassword = 'Test1234!';

    console.log('Creating test user:', testEmail);

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        emailRedirectTo: 'http://localhost:8081/',
        data: {
          display_name: 'Test User'
        }
      }
    });

    if (error) {
      console.error('Error creating user:', error.message);
      return;
    }

    console.log('User created successfully!');
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);
    console.log('Please check your email to confirm the account, then you can sign in.');

    // Note: In a real app, you'd want to auto-confirm for testing
    // This requires admin privileges and a service role key

  } catch (err) {
    console.error('Exception:', err);
  }
})();
