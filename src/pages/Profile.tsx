import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { User, Bell, MapPin, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState({
    notifications: true,
    favoriteDestination: 'Mars',
    emergencyContact: '',
    spacesuit: { size: 'M', color: 'White' }
  });

  const updatePreferences = async () => {
    try {
      // You can implement your own preferences storage here
      // For now, just show success message
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Error updating preferences');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gradient-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <p className="text-white">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400">Member Since</label>
              <p className="text-white">{new Date(user?.createdAt || '').toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="gradient-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                className="form-checkbox h-5 w-5 text-purple-500"
              />
              <span className="text-white">Receive travel updates</span>
            </label>
          </div>
        </div>

        <div className="gradient-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Favorite Destination</h2>
          </div>
          <select
            value={preferences.favoriteDestination}
            onChange={(e) => setPreferences({ ...preferences, favoriteDestination: e.target.value })}
            className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500/30"
          >
            <option value="Mars">Mars</option>
            <option value="Moon">Moon</option>
            <option value="ISS">ISS</option>
            <option value="Space Hotel">Space Hotel</option>
          </select>
        </div>

        <div className="gradient-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-semibold text-white">Emergency Contact</h2>
          </div>
          <input
            type="text"
            value={preferences.emergencyContact}
            onChange={(e) => setPreferences({ ...preferences, emergencyContact: e.target.value })}
            placeholder="Emergency contact information"
            className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500/30"
          />
        </div>
      </div>

      <button
        onClick={updatePreferences}
        className="mt-8 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity"
      >
        Save Changes
      </button>
    </div>
  );
}