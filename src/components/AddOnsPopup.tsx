import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface AddOnsPopupProps {
  onClose: () => void;
  onAddOnsChange: (addOns: { name: string; price: number }[]) => void;
}

const foodItems = [
  { name: 'Chicken Biryani', image: '/food/chicken-biryani.jpg', price: 12 },
  { name: 'Paneer Tikka', image: '/food/paneer-tikka.jpg', price: 10 },
  { name: 'Masala Dosa', image: '/food/masala-dosa.jpg', price: 8 },
  { name: 'Mango Lassi', image: '/food/mango-lassi.jpg', price: 5 },
  { name: 'Chai', image: '/food/chai.jpg', price: 3 },
];

const safetyGearItems = [
  { name: 'Space Helmet', image: '/gear/space-helmet.jpg', price: 50 },
  { name: 'Oxygen Tank', image: '/gear/oxygen-tank.jpg', price: 30 },
  { name: 'Space Suit', image: '/gear/space-suit.jpg', price: 100 },
  { name: 'Safety Harness', image: '/gear/safety-harness.jpg', price: 40 },
  { name: 'First Aid Kit', image: '/gear/first-aid-kit.jpg', price: 20 },
];

const AddOnsPopup: React.FC<AddOnsPopupProps> = ({ onClose, onAddOnsChange }) => {
  const [activeSection, setActiveSection] = useState<'food' | 'safety'>('food');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (itemName: string, quantity: number) => {
    setSelectedItems((prev) => ({ ...prev, [itemName]: quantity }));
  };

  const handleAddItem = (itemName: string) => {
    toast.success(`${itemName} added to your order!`);
  };

  const renderItems = (items: { name: string; image: string; price: number }[]) => {
    return items.map((item) => (
      <div key={item.name} className="flex items-center mb-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
        <div className="flex-grow">
          <h4 className="text-lg font-bold text-purple-300">{item.name}</h4>
          <p className="text-gray-300">${item.price}</p>
        </div>
        <div className="flex items-center">
          <button
            className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleQuantityChange(item.name, Math.max((selectedItems[item.name] || 0) - 1, 0))}
          >
            -
          </button>
          <input
            type="number"
            min="0"
            className="w-16 p-2 mx-2 rounded bg-gray-900 text-white border border-purple-500/50 focus:border-pink-500 focus:ring-pink-500"
            value={selectedItems[item.name] || 0}
            onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
          />
          <button
            className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={() => handleQuantityChange(item.name, (selectedItems[item.name] || 0) + 1)}
          >
            +
          </button>
          <button
            className="ml-2 px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => handleAddItem(item.name)}
          >
            Add
          </button>
        </div>
      </div>
    ));
  };

  const handleConfirmAddOns = () => {
    const selectedAddOns = Object.keys(selectedItems).map((itemName) => {
      const item = [...foodItems, ...safetyGearItems].find((item) => item.name === itemName);
      return item ? { name: item.name, price: item.price * selectedItems[itemName] } : null;
    }).filter(Boolean) as { name: string; price: number }[];
    onAddOnsChange(selectedAddOns);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[1000]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full relative z-[1001]">
        <h2 className="text-3xl font-bold mb-4 text-purple-300">Add-Ons</h2>
        <p className="mb-4 text-gray-300">Enhance your journey with our exclusive add-ons:</p>
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 rounded ${activeSection === 'food' ? 'bg-purple-600' : 'bg-gray-700'} text-white`}
            onClick={() => setActiveSection('food')}
          >
            Food & Beverages
          </button>
          <button
            className={`px-4 py-2 rounded ${activeSection === 'safety' ? 'bg-purple-600' : 'bg-gray-700'} text-white`}
            onClick={() => setActiveSection('safety')}
          >
            Safety Gear
          </button>
        </div>
        <div>
          {activeSection === 'food' ? renderItems(foodItems) : renderItems(safetyGearItems)}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleConfirmAddOns}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOnsPopup;