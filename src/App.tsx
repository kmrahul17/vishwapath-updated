import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BookingForm from './components/BookingForm';
import BookingHistory from './pages/BookingHistory';
import Profile from './pages/Profile';
import AuthLayout from './components/AuthLayout';
import Navbar from './components/Navbar';
import SpaceNews from './components/SpaceNews';
import SpaceMap from './components/SpaceMap';
import { Location } from './types';
import BookingConfirmation from './components/BookingConfirmation';
import PremiumSubscriptionPage from './components/PremiumSubscriptionPage'; // Import the new component

function MainLayout() {
  const [from, setFrom] = useState<Location>('Earth');
  const [to, setTo] = useState<Location>('Mars');

  return (
    <>
      <Navbar />
      <div className="max-w-[90rem] mx-auto p-6">
        {/* Main Title */}
        <h1 className="text-6xl font-bold text-center mb-8 gradient-text">
          VishwaPath Space Travel
        </h1>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Booking Form Section */}
          <div className="col-span-6">
            <div className="gradient-border"> {/* Added flex-grow */}
              <BookingForm 
                from={from}
                to={to}
                onFromChange={setFrom}
                onToChange={setTo}
              />
            </div>
          </div>

          {/* Space Map Section */}
          <div className="col-span-4">
            <div className="gradient-border flex-grow"> {/* Added flex-grow */}
              <div className="relative h-full">
                <div className="absolute top-4 right-4 bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full border border-purple-500/20 backdrop-blur-sm z-10">
                  🔄 Interactive Map - Drag to Explore
                </div>
                <SpaceMap from={from} to={to} />
              </div>
            </div>
          </div>

          {/* Space News Section */}
          <div className="col-span-2">
            <div className="gradient-border flex-grow"> {/* Added flex-grow */}
              <SpaceNews />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/" element={<MainLayout />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route
            path="/bookings"
            element={
              <>
                <Navbar />
                <BookingHistory />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route
            path="/premium"
            element={
              <>
                <Navbar />
                <PremiumSubscriptionPage />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;