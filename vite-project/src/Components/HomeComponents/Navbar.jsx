import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Our Story', href: '#story' },
    { name: 'Blog', href: '#blog' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="bg-indigo-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
                  <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-indigo-900">YourBrand</span>
          </div>

                  <div className="hidden md:flex items-center space-x-8 ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              LOGIN
            </button>
          </div>

       
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50">
              LOGIN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;