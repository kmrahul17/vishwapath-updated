import { useEffect, useState } from 'react';
import { Calendar, Users, Rocket, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  from: string;
  to: string;
  vehicle: string;
  passengers: number;
  journeyDate: string;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
}

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Your Space Journeys</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p>No bookings found. Start your space adventure today!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="gradient-border p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-300 mb-2">
                      {booking.from} → {booking.to}
                    </h2>
                    <div className="flex items-center space-x-6 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Rocket className="h-4 w-4 text-purple-400" />
                        <span>{booking.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>{booking.passengers} passengers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>{new Date(booking.journeyDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-purple-400" />
                      <span>${booking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}