import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      await supabase.auth.getSessionFromUrl();
      navigate('/');
    };

    confirmEmail();
  }, [navigate]);

  return <p>Redirecting to home...</p>;
};

export default AuthCallback;