import { useState, useEffect, ReactNode, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContext } from './AuthContextSetup';

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

  const signUp = async (email: string, password: string, displayName?: string) => {
    

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: `${window.location.origin}/`,

      }
    });

   if (error) {
  console.error('Sign in failed:', error.message);
  
  // Custom messages
  if (error.message.includes('Invalid login credentials')) {
    toast.error('Email or password is incorrect.');
  } else {
    toast.error(`Sign in failed: ${error.message}`);
  }
  
  return { error };
}

  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in with:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log('Sign in response:', { data, error });

    if (error) {
      console.error('Sign in error details:', error);
      toast.error(`Sign in failed: ${error.message}`);
      return { error };
    }

    toast.success('Welcome back!');
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
