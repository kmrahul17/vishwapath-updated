import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { BookingDetails, WeatherCondition } from '../types';
import Navbar from './Navbar';

const WEATHER_CONDITIONS: Record<string, WeatherCondition> = {
  'Earth': { location: 'Earth', condition: 'Clear', temperature: 20, radiation: 'Low', safety: 'Good' },
  'Moon': { location: 'Moon', condition: 'Sunny', temperature: -20, radiation: 'High', safety: 'Caution' },
  'Mars': { location: 'Mars', condition: 'Dust Storm', temperature: -63, radiation: 'Extreme', safety: 'Warning' },
  'ISS': { location: 'ISS', condition: 'Controlled', temperature: 21, radiation: 'Moderate', safety: 'Good' },
  'Space Hotel': { location: 'Space Hotel', condition: 'Controlled', temperature: 22, radiation: 'Low', safety: 'Good' }
};

const SPACE_QUOTES = [
  "The cosmos beckons, your adventure begins now.",
  "One small step towards your interstellar journey.",
  "Space: where dreams take flight.",
  "Your gateway to the stars awaits."
];

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails as BookingDetails;
  const [showBoardingPass, setShowBoardingPass] = useState(false);
  const randomQuote = SPACE_QUOTES[Math.floor(Math.random() * SPACE_QUOTES.length)];

  if (!bookingDetails) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">No Booking Found</h1>
          <p className="text-gray-300 mb-6">Please make a booking first.</p>
          <button
            onClick={() => navigate('/')}
            className="py-2 px-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Return to Booking
          </button>
        </div>
      </>
    );
  }

  const addOnsPrice = bookingDetails.addOns ? bookingDetails.addOns.reduce((total, addOn) => total + addOn.price, 0) : 0;
  const totalPriceWithAddOns = bookingDetails.totalPrice + addOnsPrice;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold gradient-text">Booking Confirmed! 🚀</h1>
          <p className="text-xl text-gray-300 italic">"{randomQuote}"</p>

          <div className="gradient-border p-6 my-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-purple-300 mb-2">Journey Details</h3>
                <p className="text-lg text-gray-300">From: {bookingDetails.from}</p>
                <p className="text-lg text-gray-300">To: {bookingDetails.to}</p>
                <p className="text-lg text-gray-300">Date: {bookingDetails.journeyDate}</p>
              </div>
              <div>
                <h3 className="text-purple-300 mb-2">Travel Info</h3>
                <p className="text-lg text-gray-300">Vehicle: {bookingDetails.vehicle}</p>
                <p className="text-lg text-gray-300">Passengers: {bookingDetails.passengers}</p>
                <p className="text-lg font-bold gradient-text">
                  Total: ${totalPriceWithAddOns.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-purple-300">Current Conditions at Destination</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-purple-500/10 rounded">
                  <p className="text-sm text-gray-300">Temperature</p>
                  <p className="text-lg">{WEATHER_CONDITIONS[bookingDetails.to].temperature}°C</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded">
                  <p className="text-sm text-gray-300">Radiation</p>
                  <p className="text-lg">{WEATHER_CONDITIONS[bookingDetails.to].radiation}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded">
                  <p className="text-sm text-gray-300">Safety Status</p>
                  <p className="text-lg">{WEATHER_CONDITIONS[bookingDetails.to].safety}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBoardingPass(true)}
              className="w-full mt-6 py-3 px-6 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Generate Boarding Pass
            </button>
          </div>
        </div>

        {showBoardingPass && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
            <div className="gradient-border bg-gray-900 p-8 rounded-lg max-w-2xl w-full">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Boarding Pass</h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300">From</p>
                    <p className="text-xl font-semibold">{bookingDetails.from}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">To</p>
                    <p className="text-xl font-semibold">{bookingDetails.to}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Journey Date</p>
                    <p className="text-xl font-semibold">{bookingDetails.journeyDate}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Vehicle</p>
                    <p className="text-xl font-semibold">{bookingDetails.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Passengers</p>
                    <p className="text-xl font-semibold">{bookingDetails.passengers}</p>
                  </div>
                  <div>
                    <p className="text-purple-300">Total Price</p>
                    <p className="text-2xl font-bold gradient-text">
                      ${totalPriceWithAddOns.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300">Add-Ons</p>
                    <ul className="list-disc list-inside text-gray-300">
                      <li>Chicken biryani</li>
                      <li>Space suit</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCodeSVG 
                      value={JSON.stringify({
                        bookingRef: `VP-${Date.now().toString(36).toUpperCase()}`,
                        from: bookingDetails.from,
                        to: bookingDetails.to,
                        date: bookingDetails.journeyDate,
                        vehicle: bookingDetails.vehicle,
                        passengers: bookingDetails.passengers,
                        price: totalPriceWithAddOns,
                        weather: WEATHER_CONDITIONS[bookingDetails.to]
                      })}
                      size={200}
                      level="M"
                      includeMargin={false}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      style={{
                        display: 'block',
                        width: '200px',
                        height: '200px',
                        padding: 0,
                        margin: 0
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Scan to verify booking</p>
                </div>
              </div>
              <button
                className="mt-8 w-full py-2 px-4 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
                onClick={() => setShowBoardingPass(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingConfirmation;
