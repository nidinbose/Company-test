import React from 'react';

const CategoryPill = ({ children, active = false }) => (
  <button
    className={`px-4 py-2 rounded-lg w-36 text-sm font-medium transition-colors  ${
      active
        ? '  text-indigo-900 shadow-md'
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className=" text-center mb-5">
       <img src="https://static.vecteezy.com/system/resources/previews/001/868/729/non_2x/credit-card-online-payment-concept-banner-free-vector.jpg" alt=""  className='w-full h-60 bg-cover rounded-2xl'/>
      </div>

      
      <div className="border-b border-gray-200 pb-1 mb-8">
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
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