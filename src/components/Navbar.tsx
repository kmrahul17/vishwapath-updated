import { useClerk, useUser } from '@clerk/clerk-react';
import { Rocket, LogOut, History, User, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold gradient-text">Vishwapath</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/bookings"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/bookings')
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
                }`}
              >
                <History className="h-4 w-4" />
                <span>Booking History</span>
              </Link>
              
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/profile')
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>

              <Link
                to="/premium"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/premium')
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-300'
                }`}
              >
                <Star className="h-4 w-4" />
                <span>Premium Subscription</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user?.primaryEmailAddress?.emailAddress}</span>
            
            <button
              onClick={handleSignOut}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}