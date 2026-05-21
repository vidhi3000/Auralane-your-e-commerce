import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finalizing authentication...');

  const redirectAfterSuccess = useMemo(() => {
    // Your app does not define /dashboard in App.tsx.
    // Keep redirect within existing routes.
    return '/';
  }, []);

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');

      if (!authCode) {
        setMessage('Redirecting...');
        navigate('/');
        return;
      }

      try {
        // exchangeCodeForSession needs the PKCE verifier in storage.
        // When storage is missing (different tab/device), this will fail.
        const { data, error } = await supabase.auth.exchangeCodeForSession(url.toString());

        if (error) {
          console.error('Auth callback exchangeCodeForSession error:', error);
          setMessage('Authentication failed (missing verifier?). Redirecting...');
          navigate('/auth');
          return;
        }

        const exchangedSession = data?.session ?? null;

        // Ensure session exists (sometimes exchange returns session but app session cache is behind).
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session ?? exchangedSession;

        if (!session) {
          setMessage('No authenticated session found. Redirecting...');
          navigate('/auth');
          return;
        }

        // Ensure the user has a profile row immediately (idempotent).
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

        setMessage('Authenticated successfully. Redirecting...');
        navigate(redirectAfterSuccess);
      } catch (e) {
        console.error('Auth callback fatal error:', e);
        setMessage('Authentication failed. Redirecting...');
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate, redirectAfterSuccess]);

  return <p>{message}</p>;
};

export default AuthCallback;



