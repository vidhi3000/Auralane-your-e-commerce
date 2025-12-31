import { useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      } else {
        navigate("/auth");
      }
    });
  }, [navigate]);

  return <p>Confirming your email...</p>;
};

export default AuthCallback;