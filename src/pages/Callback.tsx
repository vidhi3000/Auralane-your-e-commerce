import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finalizing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      // IMPORTANT: exchangeCodeForSession requires the PKCE code_verifier to be present.
      // If the callback runs without the verifier (e.g. storage cleared / different tab), Supabase throws:
      // "invalid request: both auth code and code verifier should be non-empty".
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');

      if (!authCode) {
        setMessage('Redirecting...');
        navigate('/');
        return;
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(url.toString());

      if (error) {
        console.error('Auth callback error:', error);
        setMessage('Authentication failed. Redirecting...');
        navigate('/');
        return;
      }

      const session = data?.session ?? null;
      if (!session) {
        setMessage('No session found. Redirecting...');
        navigate('/');
        return;
      }

      // After confirmation, Supabase gives us an authenticated session.
      // Ensure the user has a profile row immediately (idempotent), then redirect.
      try {
        const userId = session.user?.id;
        if (userId) {
          await supabase
            .from('profiles')
            .upsert(
              {
                user_id: userId,
                display_name:
                  (session.user.user_metadata as { display_name?: string })?.display_name ?? null,
              },
              { onConflict: 'user_id' }
            );
        }
      } catch (e) {
        console.warn('Failed to ensure profile on callback:', e);
      }

      // Wait for the session to be available to the app (prevents race with protected routes).
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        console.warn('Session not available immediately after callback exchange.');
      }

      console.debug('Auth callback session:', sessionData.session ?? session);
      setMessage('Authenticated successfully. Redirecting...');
      navigate('/dashboard');
    };

    handleCallback();
  }, [navigate]);

  return <p>{message}</p>;
};

export default AuthCallback;

