import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VEHICLES, DISTANCES } from '../constants';
import { BookingDetails, Location, WeatherCondition } from '../types';
import { EmissionPrediction } from '../types/emission';
import toast from 'react-hot-toast';
import { calculatePrice, calculateDuration } from '../utils/priceCalculator';
import { predictEmission } from '../utils/emissionCalculator';
import PremiumSubscriptionPopup from './PremiumSubscriptionPopup';
import AddOnsPopup from './AddOnsPopup';

const LOCATIONS: Location[] = ['Earth', 'Moon', 'Mars', 'ISS', 'Space Hotel'];

const WEATHER_CONDITIONS: Record<Location, WeatherCondition> = {
  'Earth': { location: 'Earth', condition: 'Clear', temperature: 20, radiation: 'Low', safety: 'Good' },
  'Moon': { location: 'Moon', condition: 'Sunny', temperature: -20, radiation: 'High', safety: 'Caution' },
  'Mars': { location: 'Mars', condition: 'Dust Storm', temperature: -63, radiation: 'Extreme', safety: 'Warning' },
  'ISS': { location: 'ISS', condition: 'Controlled', temperature: 21, radiation: 'Moderate', safety: 'Good' },
  'Space Hotel': { location: 'Space Hotel', condition: 'Controlled', temperature: 22, radiation: 'Low', safety: 'Good' }
};

interface BookingFormProps {
  from: Location;
  to: Location;
  onFromChange: (location: Location) => void;
  onToChange: (location: Location) => void;
}

export default function BookingForm({ from, to, onFromChange, onToChange }: BookingFormProps) {
  const navigate = useNavigate();

  // State management
  const [journeyDate, setJourneyDate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [passengers, setPassengers] = useState(0);
  const [emissionData, setEmissionData] = useState<EmissionPrediction | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddOnsPopup, setShowAddOnsPopup] = useState(false);
  const [newBooking, setNewBooking] = useState<BookingDetails | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    // Show popup after sign-in
    console.log("Showing PremiumSubscriptionPopup");
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmBooking = () => {
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);
    const basePrice = calculatePrice(from, to, selectedVehicle, passengers);
    const totalPrice = basePrice + addOnsPrice;

    console.log('Base Price:', basePrice);
    console.log('Add-ons Price:', addOnsPrice);
    console.log('Total Price:', totalPrice);

    const newBooking: BookingDetails = {
      id: Date.now().toString(),
      from,
      to,
      journeyDate,
      vehicle: selectedVehicle,
      passengers,
      totalPrice,
      status: 'upcoming',
      bookingDate: new Date().toISOString(),
      addOns: selectedAddOns.map(addOn => addOn.name)
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
    toast.success('Booking confirmed!');
    setNewBooking(newBooking);
    setShowAddOnsPopup(true);
  };

  const handleAddOnsClose = () => {
    setShowAddOnsPopup(false);
    navigate('/booking-confirmation', { state: { bookingDetails: newBooking } });
  };

  const handleAddOnsChange = (addOns: { name: string; price: number }[]) => {
    setSelectedAddOns(addOns);
  };

  useEffect(() => {
    const fetchEmission = async () => {
      if (selectedVehicle && passengers > 0) {
        const route = `${from}-${to}` as keyof typeof DISTANCES;
        const distance = DISTANCES[route];
        if (distance) {
          try {
            const prediction = await predictEmission(distance, selectedVehicle, passengers);
            setEmissionData(prediction);
          } catch (error) {
            console.error('Failed to fetch emission data:', error);
          }
        }
      }
    };
    fetchEmission();
  }, [selectedVehicle, passengers, from, to]);

  return (
    <div className="p-6">
      {showPopup && <PremiumSubscriptionPopup onClose={handleClosePopup} />}
      {showAddOnsPopup && newBooking && (
        <AddOnsPopup
          onClose={handleAddOnsClose}
          onAddOnsChange={handleAddOnsChange}
        />
      )}
      {/* Location Selection Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* From Location */}
        <div className="gradient-border p-4">
          <label className="block mb-2 text-purple-300">From</label>
          <select
            className="w-full p-2 rounded bg-gray-900 text-white border border-purple-500/50 focus:border-pink-500 focus:ring-pink-500"
            value={from}
            onChange={(e) => onFromChange(e.target.value as Location)}
          >
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <div className="mt-2 text-sm">
            <p className="text-purple-300">Current Conditions:</p>
            <p className="text-gray-300">Temperature: {WEATHER_CONDITIONS[from].temperature}°C</p>
            <p className="text-gray-300">Radiation: {WEATHER_CONDITIONS[from].radiation}</p>
          </div>
        </div>

        {/* To Location */}
        <div className="gradient-border p-4">
          <label className="block mb-2 text-purple-300">To</label>
          <select
            className="w-full p-2 rounded bg-gray-900 text-white border border-purple-500/50 focus:border-pink-500 focus:ring-pink-500"
            value={to}
            onChange={(e) => onToChange(e.target.value as Location)}
          >
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <div className="mt-2 text-sm">
            <p className="text-purple-300">Current Conditions:</p>
            <p className="text-gray-300">Temperature: {WEATHER_CONDITIONS[to].temperature}°C</p>
            <p className="text-gray-300">Radiation: {WEATHER_CONDITIONS[to].radiation}</p>
          </div>
        </div>
      </div>

      {/* Journey Date */}
      <div className="gradient-border p-4 mb-8">
        <label className="block mb-2 text-purple-300">Date of Journey</label>
        <input
          type="date"
          className="w-full p-2 rounded bg-gray-900 text-white border border-purple-500/50 focus:border-pink-500 focus:ring-pink-500"
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {journeyDate && VEHICLES && (
        <div className="space-y-4 my-8">
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.name}
              className={`gradient-border p-4 transition-transform hover:scale-[1.01] ${
                selectedVehicle === vehicle.name ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              {/* Vehicle Card Content */}
              <div className="flex gap-6">
                {/* Image Section */}
                <div className="w-48 h-32 flex-shrink-0">
                  <div className="relative h-full w-full">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded" />
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-purple-300">{vehicle.name}</h3>
                      <p className="text-gray-300">{vehicle.description}</p>
                    </div>
                    <button
                      className={`px-4 py-2 rounded ${
                        selectedVehicle === vehicle.name
                          ? 'bg-pink-500 hover:bg-pink-600'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
                      } text-white font-semibold transition-all`}
                      onClick={() => setSelectedVehicle(vehicle.name)}
                    >
                      {selectedVehicle === vehicle.name ? 'Selected' : 'Select'}
                    </button>
                  </div>

                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-gray-300">
                        <span className="text-purple-300">Capacity:</span> {vehicle.capacity} passengers
                      </p>
                      <p className="text-gray-300">
                        <span className="text-purple-300">Travel Time:</span>{' '}
                        {calculateDuration(from, to, vehicle.name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300">
                        <span className="text-purple-300">Price per person:</span>
                      </p>
                      <p className="text-lg font-semibold text-purple-300">
                        ${calculatePrice(from, to, vehicle.name, 1).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Input and Booking Button */}
              {selectedVehicle === vehicle.name && (
                <div className="mt-4 pt-4 border-t border-purple-500/20">
                  <div className="flex items-end gap-4">
                    <div className="flex-grow">
                      <label className="block mb-2 text-purple-300">Number of Passengers</label>
                      <input
                        type="number"
                        min="1"
                        max={vehicle.capacity}
                        className="w-full p-2 rounded bg-gray-900 text-white border border-purple-500/50 focus:border-pink-500 focus:ring-pink-500"
                        value={passengers || ''}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                      />
                    </div>

                    {emissionData && (
                      <div className="mt-4 bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
                        <h4 className="text-emerald-300 font-semibold">Environmental Impact</h4>
                        <p className="text-emerald-200 mt-2">
                          Estimated CO2: {emissionData.emission} {emissionData.unit}
                        </p>
                        <div className="mt-2 space-y-1">
                          {emissionData.recommendations.map((rec: string, i: number) => (
                            <p key={i} className="text-emerald-300 text-sm flex items-center gap-2">
                              <span>🌱</span> {rec}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {passengers > 0 && (
                      <button
                        className="px-6 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
                        onClick={handleConfirmBooking}
                      >
                        Confirm Booking
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
