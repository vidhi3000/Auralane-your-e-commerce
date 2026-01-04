import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <User size={22} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
          >
            <User size={16} />
            My Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
          >
            <Settings size={16} />
            Settings
          </Link>

          <button
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
