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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.debug('Supabase signIn response:', { data, error });

    // Supabase can block access if the email is not confirmed.
    // We do NOT want to show a generic "Sign in failed" message.
    if (error) {
      const msg = error.message || '';
      const isEmailNotConfirmed =
        msg.toLowerCase().includes('email not confirmed') ||
        msg.toLowerCase().includes('email not verified') ||
        msg.toLowerCase().includes('confirm your email') ||
        msg.toLowerCase().includes('confirmation') ||
        msg.toLowerCase().includes('confirm');

      if (isEmailNotConfirmed) {
        toast.success('Welcome! Please check your email to confirm your account.');
      } else {
        toast.error(error.message || 'Sign in failed. Check the console for details.');
      }

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
