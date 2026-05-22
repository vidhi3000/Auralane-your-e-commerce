import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type CallbackStatus = 'loading' | 'success' | 'error';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finalizing authentication...');
  const [status, setStatus] = useState<CallbackStatus>('loading');
  const redirectAfterSuccess = useMemo(() => '/', []);

  useEffect(() => {
    const ensureProfile = async (session: NonNullable<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>) => {
      const userId = session.user?.id;
      if (!userId) return;
      try {
        await supabase.from('profiles').upsert(
          {
            user_id: userId,
            display_name:
              (session.user.user_metadata as { display_name?: string })?.display_name ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
      } catch (e) {
        console.warn('Failed to ensure profile:', e);
      }
    };

    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');
      const tokenHash = url.searchParams.get('token_hash');
      const type = url.searchParams.get('type');
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      // ── token_hash flow — email confirmation, invite, recovery ──────────
      if (tokenHash && type) {
        try {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as 'email' | 'signup' | 'recovery' | 'invite',
          });

          if (error || !data.session) {
            console.error('verifyOtp error:', error);
            setStatus('error');
            setMessage('Confirmation link failed or has expired. Please sign up again.');
            setTimeout(() => navigate('/auth'), 2500);
            return;
          }

          await ensureProfile(data.session);
          setStatus('success');
          setMessage('Email confirmed! Taking you in...');
          setTimeout(() => navigate(redirectAfterSuccess), 500);
        } catch (e) {
          console.error('verifyOtp fatal error:', e);
          setStatus('error');
          setMessage('Something went wrong. Redirecting...');
          setTimeout(() => navigate('/auth'), 2000);
        }
        return;
      }

      // ── Magic link flow — hash fragment tokens ───────────────────────────
      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          setStatus('error');
          setMessage('Magic link authentication failed. Redirecting...');
          setTimeout(() => navigate('/auth'), 2000);
          return;
        }

        await ensureProfile(data.session);
        setStatus('success');
        setMessage('Authenticated successfully! Redirecting...');
        setTimeout(() => navigate(redirectAfterSuccess), 500);
        return;
      }

      // ── PKCE flow — code query param ─────────────────────────────────────
      if (authCode) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(url.toString());

          if (error) {
            console.error('exchangeCodeForSession error:', error);
            setStatus('error');
            setMessage('Authentication failed. The link may have expired. Redirecting...');
            setTimeout(() => navigate('/auth'), 2500);
            return;
          }

          const { data: sessionData } = await supabase.auth.getSession();
          const session = sessionData.session ?? data?.session ?? null;

          if (!session) {
            setStatus('error');
            setMessage('No session found. Redirecting...');
            setTimeout(() => navigate('/auth'), 2000);
            return;
          }

          await ensureProfile(session);
          setStatus('success');
          setMessage('Authenticated successfully! Redirecting...');
          setTimeout(() => navigate(redirectAfterSuccess), 500);
        } catch (e) {
          console.error('Auth callback fatal error:', e);
          setStatus('error');
          setMessage('An unexpected error occurred. Redirecting...');
          setTimeout(() => navigate('/auth'), 2000);
        }
        return;
      }

      // ── No recognizable params ────────────────────────────────────────────
      navigate('/');
    };

    handleCallback();
  }, [navigate, redirectAfterSuccess]);

  const statusStyles: Record<CallbackStatus, string> = {
    loading: 'text-gray-500',
    success: 'text-green-600',
    error: 'text-red-500',
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className={`text-sm font-medium ${statusStyles[status]}`}>
        {message}
      </p>
    </div>
  );
}

export default AuthCallback;