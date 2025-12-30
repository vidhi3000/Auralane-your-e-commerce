import { useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleConfirmation = async () => {
      // Check for error parameters in URL hash
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorCode = hashParams.get('error_code');
      const errorDescription = hashParams.get('error_description');

      if (error) {
        // Handle error cases
        let errorMessage = 'Authentication failed. Please try again.';

        if (errorCode === 'otp_expired' || errorDescription?.includes('expired')) {
          errorMessage = 'The email link has expired. Please request a new one.';
        } else if (error === 'access_denied') {
          errorMessage = 'Access denied. Please check your credentials and try again.';
        }

        toast.error(errorMessage);
        navigate("/auth");
        return;
      }

      // Check if it's the new PKCE flow or old token flow
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const type = urlParams.get('type');

      if (token && type === 'signup') {
        // Old token flow
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          toast.error(error.message);
          navigate("/auth");
          return;
        }

        if (data?.session) {
          toast.success('Email confirmed, you are now logged in!');
          navigate("/");
        }
      } else {
        // New PKCE flow
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.search);

        if (error) {
          toast.error(error.message);
          navigate("/auth");
          return;
        }

        if (data?.session) {
          toast.success('Email confirmed, you are now logged in!');
          navigate("/");
        }
      }
    };

    handleConfirmation();
  }, [navigate]);

  return <div>Confirming your email...</div>;
}
