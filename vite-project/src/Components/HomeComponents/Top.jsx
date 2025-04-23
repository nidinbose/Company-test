import React from 'react';
import { FaHome } from "react-icons/fa";

const CategoryPill = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg w-24 sm:w-36 text-xs sm:text-sm font-medium transition-colors ${
      active
        ? 'text-indigo-900 shadow-md bg-indigo-50 border border-indigo-300'
        : 'bg-white text-indigo-900 hover:bg-gray-100 border border-indigo-900'
    }`}
  >
    {children}
  </button>
);

const Top = () => {
  const [activeCategory, setActiveCategory] = React.useState('Shopping');

  const categories = [
    'Shopping',
    'Rewards',
    'Travel',
    'Lifetime Free',
    'Cashback',
    'Dine-in',
    'Lifestyle',
    'Fuel',
    'Movies'
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 bg-gray-50">
      <div className='flex gap-6 items-center justify-start text-2xl text-indigo-900 mb-5'>
      <FaHome />
      <h1>{`<`}</h1>
      <h2 className='font-semibold'>Credit cards</h2>
      </div>
      <div className="text-center mb-4 sm:mb-5">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/001/868/729/non_2x/credit-card-online-payment-concept-banner-free-vector.jpg" 
          alt="Credit card banner" 
          className="w-full h-40 sm:h-48 md:h-60 object-cover rounded-xl sm:rounded-2xl"
        />
      </div>

      <div className="border-b border-gray-200 pb-1 mb-6 sm:mb-8">
        <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <CategoryPill
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryPill>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top;