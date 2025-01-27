import React from 'react';

const plans = [
  {
    name: 'Basic Plan',
    price: '$9.99/month',
    features: [
      { feature: 'Standard Benefits', included: true },
      { feature: 'Wi-Fi Access', included: true },
      { feature: 'Extra Baggage Allowance', included: false },
      { feature: 'Personalized Travel Assistance', included: false },
      
      { feature: 'Lounge Access', included: false },
      { feature: 'Travel Insurance', included: false },
      
      { feature: 'Meal Preferences', included: false },
      { feature: 'Seat Selection', included: false },
      { feature: 'VIP Support', included: false },
      { feature: 'Netflix Onboard', included: false },
    ],
  },
  {
    name: 'Standard Plan',
    price: '$19.99/month',
    features: [
      { feature: 'Standard Benefits', included: true },
      { feature: 'Wi-Fi Access', included: true },
      { feature: 'Extra Baggage Allowance', included: true },
      { feature: 'Lounge Access', included: true },
      { feature: 'Travel Insurance', included: true },
      
      { feature: 'Meal Preferences', included: true },
      { feature: 'Seat Selection', included: true },
      { feature: 'Personalized Travel Assistance', included: false },
      
      { feature: 'VIP Support', included: false },
      { feature: 'Netflix Onboard', included: false },
    ],
  },
  {
    name: 'Premium Plan',
    price: '$29.99/month',
    features: [
      { feature: 'Standard Benefits', included: true },
      { feature: 'Extra Baggage Allowance', included: true },
      { feature: 'Personalized Travel Assistance', included: true },
     
      { feature: 'Lounge Access', included: true },
      { feature: 'Travel Insurance', included: true },
      { feature: 'Wi-Fi Access', included: true },
      { feature: 'Meal Preferences', included: true },
      { feature: 'Seat Selection', included: true },
      { feature: 'VIP Support', included: true },
      { feature: 'Netflix Onboard', included: true },
    ],
  },
];

const PremiumSubscriptionPage: React.FC = () => {
  const handleBuyPlan = (planName: string) => {
    console.log(`Buying ${planName} plan`);
    // Add your logic to handle plan purchase
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h4 className="text-xl font-bold text-purple-300 mb-2">{plan.name}</h4>
            <p className="text-gray-300 text-3xl font-bold">{plan.price}</p>
            <ul className="mt-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  {feature.included ? (
                    <span className="text-green-500 mr-2">✔</span>
                  ) : (
                    <span className="text-red-500 mr-2">✘</span>
                  )}
                  <span className="text-gray-300">{feature.feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => handleBuyPlan(plan.name)}
            >
              Buy {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumSubscriptionPage;
