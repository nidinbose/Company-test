import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Star, StarHalf, StarOff } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-5 h-5" />
      ))}
      <span className="ml-2 text-sm text-gray-700">({rating})</span>
    </div>
  );
};

const CreditCardOffer = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get('http://localhost:3003/api/getcard');
        setCards(res.data.data || res.data);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const toggleBankSelection = (bankName) => {
    setSelectedBanks(prev => 
      prev.includes(bankName) 
        ? prev.filter(bank => bank !== bankName) 
        : [...prev, bankName]
    );
  };

  const filteredCards = selectedBanks.length > 0
    ? cards.filter(card => selectedBanks.includes(card.bankName))
    : cards;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 h-fit sticky top-8">
            <h2 className="text-lg font-semibold border-b pb-2 text-red-600 mb-4">Filters</h2>
                 <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">Provider's Name</h3>
              <div className="space-y-2">
                {[
                  "Yes Bank", "ICICI Bank", "Bank Of Baroda", "IDFC Bank",
                  "HDFC Bank", "Axis Bank", "HSBC Bank", "Kotak Mahindra Bank"
                ].slice(0, expandedFeatures ? undefined : 5).map((name, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`bank-${index}`}
                      checked={selectedBanks.includes(name)}
                      onChange={() => toggleBankSelection(name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`bank-${index}`} className="ml-3 text-sm text-gray-700">
                      {name}
                    </label>
                  </div>
                ))}
                <button 
                  onClick={() => setExpandedFeatures(!expandedFeatures)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  {expandedFeatures ? 'See Less' : 'See More'}
                </button>
              </div>
            </div>
        
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">Features</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Vistara privileges: Enjoy complimentary Club Vistara Silver membership, airport lounge access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Accelerated Rewards: Earn Club Vistara Points on every spend</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Welcome Benefits: Complimentary Club Vistara Base Points</span>
                </li>
              </ul>
            </div>
                  <div>
              <h3 className="text-md font-semibold mb-3">Welcome Offers</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Bonus Club Vistara Points upon activation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Joining Fee Waiver</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Complimentary Lounge Access</span>
                </li>
              </ul>
            </div>
          </div>

                  <div className="lg:col-span-9 z-50">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600">No cards match your selected filters</p>
                <button 
                  onClick={() => setSelectedBanks([])} 
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCards.map((card, index) => (
                  <div key={card.id || index} className="bg-white rounded-xl shadow-md overflow-hidden">
                                   <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                                             <div className="flex-shrink-0">
                          <img
                            src={card.cardImage || "https://www.cardexpert.in/wp-content/uploads/2020/10/axis-bank-ace-credit-card-1.jpg"}
                            alt={card.cardName}
                            className="w-64 h-40 object-contain rounded-lg"
                          />
                        </div>
                      
                        <div className="flex-grow">
                                                      <h2 className="text-xl font-bold text-indigo-900">{card.cardName}</h2>
                          <p className="text-indigo-900 mb-4">{card.cardSlug}</p>
                          <p className="text-sm text-indigo-900 mb-4">
                                                  Elevate your travel experience with exclusive Vistara airline privileges and accelerated rewards on every journey.
                          </p>
                          
                          <div className="flex flex-wrap gap-3 ">
                                             <button className="bg-indigo-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                              Apply Now
                            </button>
                            <button className="border border-indigo-900 text-indigo-900 px-4 py-2 rounded-md text-sm hover:bg-blue-50 transition">
                              Check Eligibility
                            </button>
                          </div>
                        </div>
                                        <div className="flex-shrink-0 flex flex-col items-end ">
                          <div className="mb-4">
                            <p className="font-bold text-gray-900 text-sm">MoneyBIP Rating</p>
                            <StarRating rating={card.moneybipRating || 4.5} />
                          </div>
                          <label className="flex items-center gap-2 text-sm text-gray-900">
                            <input type="checkbox" className="accent-blue-600" />
                            Add to Compare
                          </label>
                        </div>
                      </div>
                    </div>
                           <div className="border-t px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-bold text-gray-800 mb-3">Features</h3>
                          <ul className="list-disc text-sm text-black font-medium  pl-5">
                            <li>Vistara Privileges: Enjoy complimentary Club Vistara Silver membership, airport lounge access</li>
                            <li>Accelerated Rewards: Earn Club Vistara Points on every spend</li>
                            <li>Welcome Benefits: Complimentary Club Vistara Base Points</li>
                            <li>Travel and Lifestyle Benefits: Discounts on dining, hotel bookings</li>
                            <li>Milestone Rewards: Earn bonus Club Vistara Points</li>
                          </ul>
                        </div>
                        
                        <div className="border-l pl-6">
                          <div className="mb-4">
                            <p className="text-gray-600 font-bold">Annual Fees</p>
                            <p className="text-xl font-bold text-gray-900">₹{card.annualFee || "1,500"}</p>
                          </div>
                          <div className="mb-4">
                            <p className="text-gray-600 font-bold">Joining Fees</p>
                            <p className="text-xl font-bold text-gray-900">{card.joiningFee || "No Cost"}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-bold">Recommended Credit Score</p>
                            <p className="text-xl font-bold text-gray-900">{card.creditScoreMin || "550"}-{card.creditScoreMax || "600"}</p>
                            <a href="#" className="text-blue-600 text-sm hover:underline">Check your credit score here</a>
                          </div>
                        </div>
                      </div>
                    </div>
                            <div className="border-t px-6 py-4 bg-white">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Welcome Offers</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        While specific welcome offers may change over time, typical welcome benefits include:
                      </p>
                      <ul className="list-disc text-sm text-black font-medium pl-5">
                        <li>Bonus Club Vistara Points upon card activation</li>
                        <li>Joining Fee Waiver</li>
                        <li>Complimentary Lounge Access</li>
                        <li>Additional Rewards on Initial Spends</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardOffer;