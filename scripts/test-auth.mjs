import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://girrkkunzwbsaebcawpb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_aBF0_407MIvNTA93sw1V3w_OfuSChZm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  try {
    const email = `test+${Date.now()}@example.com`;
    const password = 'Test1234!';

    console.log('Signing up:', email);
    const signUp = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'http://localhost:8081' }
    });
    console.log('signUp:', JSON.stringify(signUp, null, 2));

    console.log('Attempting signInWithPassword...');
    const signIn = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.log('signIn:', JSON.stringify(signIn, null, 2));

    console.log('Current session:');
    const session = await supabase.auth.getSession();
    console.log(JSON.stringify(session, null, 2));

    console.log('Signing out...');
    await supabase.auth.signOut();
    console.log('Signed out.');
  } catch (err) {
    console.error('Exception:', err);
  }
})();
