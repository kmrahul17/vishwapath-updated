import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PremiumSubscriptionPopupProps {
  onClose: () => void;
}

const PremiumSubscriptionPopup: React.FC<PremiumSubscriptionPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleBuyPlan = () => {
    navigate('/premium');
  };

  console.log("PremiumSubscriptionPopup rendered");
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[1000]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full relative z-[1001]">
        <h2 className="text-3xl font-bold mb-4 text-purple-300">Premium Subscription Plan</h2>
        <p className="mb-4 text-gray-300">Unlock exclusive benefits with our premium subscription:</p>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>Priority boarding and seating</li>
          <li>Access to VIP lounges</li>
          <li>Complimentary meals and beverages</li>
          <li>Exclusive travel discounts</li>
          <li>24/7 customer support</li>
          <li>Free Wi-Fi on all flights</li>
          <li>Extra baggage allowance</li>
          <li>Personalized travel assistance</li>
        </ul>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleBuyPlan}
          >
            Buy the Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionPopup;