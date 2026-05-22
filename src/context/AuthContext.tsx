import { useState, useEffect, ReactNode, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './AuthContextSetup';

type AuthResponse = {
  error: Error | null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string): Promise<AuthResponse> => {
    // Using email confirmation flow.
    // After user clicks the confirmation link, Supabase will finish authentication
    // via `auth/callback` route (exchangeCodeForSession), and we then redirect.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });


    console.debug('Supabase signUp response:', { data, error });

    if (error) {
      toast.error(error.message || 'Signup failed. Check the console for details.');
      return { error };
    }

    toast.success('Welcome! Please check your email to confirm your account.');
    return { error: null };
  };

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    // If Supabase is configured for email confirmations / RLS etc., password sign-in can be blocked.
    // To reduce “token” errors caused by wrong auth state, always ensure session refresh first.
    // Refresh session cache to avoid exchanging/using stale auth state.
    // Note: This does not change the request payload; it only helps prevent
    // some timing issues during page transitions.
    await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signInWithPassword({
      email: "user@example.com",
      password: "password123",
    });

   console.debug('Supabase signIn response:', { data, error });

    // Supabase can block access if the email is not confirmed.
    // We do NOT want to show a generic "Sign in failed" message.
      if (error) {
    toast.error(error.message || 'Sign in failed');
    return { error };
  }

    toast.success('Signed in successfully');
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
