import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://girrkkunzwbsaebcawpb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_aBF0_407MIvNTA93sw1V3w_OfuSChZm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

(async () => {
  try {
    const sessionRes = await supabase.auth.getSession();
    console.log('session:', sessionRes.data.session);

    const { data, error, status } = await supabase.from('profiles').select('*').limit(1);
    console.log('profiles status:', status);
    console.log('profiles error:', error);
    console.log('profiles data:', data);
  } catch (err) {
    console.error('Exception:', err);
  }
})();
