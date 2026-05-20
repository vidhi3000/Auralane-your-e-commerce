import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finalizing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error('Auth callback error:', error);

        setMessage('Authentication failed. Redirecting...');
      } else if (data?.session) {
        console.debug('Auth callback session:', data.session);
        setMessage('Authenticated successfully. Redirecting...');
      } else {
        setMessage('Redirecting...');
      }

      window.setTimeout(() => navigate('/'), 800);
    };

    handleCallback();
  }, [navigate]);

  return <p>{message}</p>;
};

export default AuthCallback;