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
      // Using the current URL is required; we also guard against missing params.
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');

      // If this isn't an OAuth callback, just redirect.
      if (!authCode) {
        setMessage('Redirecting...');
        window.setTimeout(() => navigate('/'), 800);
        return;
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(url.toString());

      if (error) {
        console.error('Auth callback error:', error);
        setMessage('Redirecting...');
      } else if (data?.session) {
        console.debug('Auth callback session:', data.session);
        setMessage('Authenticated successfully. Redirecting...');
      } else {
        setMessage('Redirecting...');
      }

      // Avoid running navigation before auth state is settled.
      window.setTimeout(() => navigate('/'), 800);
    };

    handleCallback();
  }, [navigate]);

  return <p>{message}</p>;
};

export default AuthCallback;