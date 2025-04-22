import React from 'react';
import Card1 from '../Cards/CardComponents/Card1';
import CriteriaForm from './CardComponents/Card2';
import Card3 from './CardComponents/Card3';
import Card4 from './CardComponents/Card4';

const AddCard = () => {
  return (
    <div className="flex h-full overflow-hidden bg-gray-100 overflow-y-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white shadow-lg p-6 flex flex-col justify-between hidden xl:inline">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">🏠 Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">💳 Cards</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">📊 Analytics</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">⚙️ Settings</a>
          </nav>
        </div>
        <div className="text-sm text-gray-400">
          © 2025 YourCompany
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Card</h1> */}
        <Card1 />
        <CriteriaForm/>
        <Card3/>
        <Card4/>
      </main>
    </div>
  );
};

export default AddCard;
