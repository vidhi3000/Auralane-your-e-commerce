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
    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const authCode = url.searchParams.get('code');
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      // ── Magic link flow (hash-based tokens) ──────────────────────────────
      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          setStatus('error');
          setMessage('Magic link authentication failed. Redirecting...');
          setTimeout(() => navigate('/auth'), 1000);
          return;
        }

        await ensureProfile(data.session);
        setStatus('success');
        setMessage('Authenticated successfully! Redirecting...');
        setTimeout(() => navigate(redirectAfterSuccess), 500);
        return;
      }

      // ── PKCE / email confirmation flow (code-based) ───────────────────────
      if (!authCode) {
        // No recognizable auth params — send home silently
        navigate('/');
        return;
      }

      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          url.toString()  // Supabase extracts the code internally
        );

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
    };

    // ── Helper: idempotent profile creation ──────────────────────────────────
    const ensureProfile = async (session: NonNullable<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>) => {
      const userId = session.user?.id;
      if (!userId) return;

      try {
        await supabase.from('profiles').upsert(
          {
            user_id: userId,
            display_name:
              (session.user.user_metadata as { display_name?: string })?.display_name ?? null,
            updated_at: new Date().toISOString(),  // ensures upsert always writes
          },
          { onConflict: 'user_id' }
        );
      } catch (e) {
        console.warn('Failed to ensure profile on callback:', e);
      }
    };

    handleCallback();
  }, [navigate, redirectAfterSuccess]);

  // ── Minimal status-aware UI ───────────────────────────────────────────────
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
};

export default AuthCallback;