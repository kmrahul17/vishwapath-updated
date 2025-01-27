import React from 'react';

const PremiumSubscriptionPage: React.FC = () => {
  const handleBuyPlan = (plan: string) => {
    // Do nothing when the buy button is clicked
    console.log(`Clicked on ${plan} plan`);
  };

  return (
    <div className="max-w-[90rem] mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Premium Subscription Plan</h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="mb-4 text-gray-300">Unlock exclusive benefits with our premium subscription:</p>
        <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Priority boarding and seating
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Access to VIP lounges
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Complimentary meals and beverages
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Exclusive travel discounts
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> 24/7 customer support
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Free Wi-Fi on all flights
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Extra baggage allowance
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Personalized travel assistance
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Exclusive member-only events
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Dedicated check-in counters
          </li>
          <li className="flex items-center">
            <span className="text-purple-300 mr-2">✔</span> Access to Amazon Prime Video and Netflix
          </li>
        </ul>
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-xl font-bold text-purple-300 mb-2">Basic Plan</h4>
              <p className="text-gray-300 text-3xl font-bold">$9.99/month</p>
              <p className="text-gray-400 mt-2">Includes basic benefits and access to VIP lounges.</p>
              <button
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => handleBuyPlan('Basic')}
              >
                Buy Basic Plan
              </button>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-xl font-bold text-purple-300 mb-2">Standard Plan</h4>
              <p className="text-gray-300 text-3xl font-bold">$19.99/month</p>
              <p className="text-gray-400 mt-2">Includes all basic benefits plus complimentary meals and beverages.</p>
              <button
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => handleBuyPlan('Standard')}
              >
                Buy Standard Plan
              </button>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-xl font-bold text-purple-300 mb-2">Premium Plan</h4>
              <p className="text-gray-300 text-3xl font-bold">$29.99/month</p>
              <p className="text-gray-400 mt-2">Includes all standard benefits plus extra baggage allowance and personalized travel assistance.</p>
              <button
                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => handleBuyPlan('Premium')}
              >
                Buy Premium Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionPage;