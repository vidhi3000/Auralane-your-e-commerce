import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { Tables } from '../integrations/supabase/types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const ProfileEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    avatar_url: ''
  });

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
          setFormData({
            display_name: data.display_name || '',
            avatar_url: data.avatar_url || ''
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name || null,
          avatar_url: formData.avatar_url || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <p className="text-muted-foreground mb-6">You need to be logged in to edit your profile.</p>
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
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Profile
            </Link>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-display font-semibold text-foreground">
                Edit Profile
              </CardTitle>
              <p className="text-muted-foreground">Update your profile information</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    type="text"
                    value={formData.display_name}
                    onChange={(e) => handleInputChange('display_name', e.target.value)}
                    placeholder="Enter your display name"
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    This is how you'll appear to others on the site.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar_url">Avatar URL</Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    value={formData.avatar_url}
                    onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a URL for your profile picture.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gold hover:bg-gold/90 text-primary"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/profile')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
