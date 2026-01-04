import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Mail, Calendar, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { Tables } from '../integrations/supabase/types';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Please log in</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary font-medium rounded-lg hover:bg-gold/90 transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-semibold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary font-medium rounded-lg hover:bg-gold/90 transition-colors duration-200 shadow-sm"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                <User size={32} className="text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {profile?.display_name || user.email?.split('@')[0] || 'User'}
                </h2>
                <p className="text-muted-foreground">Member since {profile ? new Date(profile.created_at).toLocaleDateString() : 'Recently'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                <Mail size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                  <p className="text-foreground font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">This is your login email</p>
                </div>
              </div>

              {profile && (
                <>
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <User size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Display Name</label>
                      <p className="text-foreground font-medium">{profile.display_name || 'Not set'}</p>
                      <p className="text-xs text-muted-foreground mt-1">This is how you'll appear to others</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <Calendar size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Member Since</label>
                      <p className="text-foreground font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">Account creation date</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                to="/profile/edit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors duration-200"
              >
                <Edit size={18} />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
