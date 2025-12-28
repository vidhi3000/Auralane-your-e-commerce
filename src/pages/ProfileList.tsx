import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

type Profile = {
  id: string;
  email?: string;
  created_at?: string;
};

const ProfileList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        setError(error.message);
      } else {
        setProfiles(data || []);
      }
    };

    fetchProfiles();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Profiles</h2>
      <pre>{JSON.stringify(profiles, null, 2)}</pre>
    </div>
  );
};

export default ProfileList;
