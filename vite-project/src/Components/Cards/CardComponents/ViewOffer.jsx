import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit, Printer, Share2 } from 'lucide-react';

const ViewOffer = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3003/api/getbyid/${id}`);
        setCard(res.data.data);
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to load card details');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500">{error}</div>
    </div>
  );

  if (!card) return (
    <div className="flex justify-center items-center h-screen">
      <div>Card not found</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </li>
            <li>
              <Link to="/offers" className="flex items-center text-gray-600 hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Listing
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Card Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                card.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {card.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Provider</p>
              <p className="font-medium">{card.providerName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{card.categoryName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">3 days ago</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">Actions</h2>
          <div className="mt-4 space-y-2">
            <Link 
              to={`/edit-offer/${id}`}
              className="flex items-center px-3 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Card
            </Link>
            <button className="flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
              <Printer className="w-4 h-4 mr-2" />
              Print Details
            </button>
            <button className="flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Card
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">•</span>
            <Link to="/offers" className="hover:text-blue-600">Listing Offers</Link>
            <span className="mx-2">•</span>
            <span className="text-gray-800 font-medium">View Offers</span>
          </div>
         <div className='flex gap-3'>
         <img src={card.cardImage} alt="loading" />
         <h1 className="text-2xl font-bold text-gray-800 mt-2">{card.cardName}</h1>
         </div>
        </div>

        {/* Card Sections */}
        <div className="space-y-6">
          {/* Card Information Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Information</h3>
            <p className="text-gray-600 mb-4">Please check out given information</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Category Name</p>
                <p className="font-medium">{card.categoryName || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Provider Name</p>
                <p className="font-medium">{card.providerName || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{card.service || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Payout</p>
                <p className="font-medium">{card.payout || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Commission</p>
                <p className="font-medium">{card.commission || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Card Link</p>
                <a href={card.cardLink} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                  {card.cardLink ? 'View Link' : 'N/A'}
                </a>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
            <p className="text-gray-600 mb-2">Please check out given information</p>
            <p className="text-gray-700">
              {card.description || 'No description available'}
            </p>
          </div>

          {/* Criteria Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Criteria</h3>
            <p className="text-gray-600 mb-4">Please check out given information</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Annual Fee</p>
                <p className="font-medium">{card.annualFee || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Joining Fee</p>
                <p className="font-medium">{card.joiningFee || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Foreign Transaction Percentage</p>
                <p className="font-medium">{card.foreignTransactionPercentage || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Annual Percentage Rate</p>
                <p className="font-medium">{card.annualPercentageRate || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Credit Score (Min - Max)</p>
                <p className="font-medium">{card.creditScoreMin || '0'} - {card.creditScoreMax || '0'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">User Age Group (Min - Max)</p>
                <p className="font-medium">{card.userAgeMin || '0'} - {card.userAgeMax || '0'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Monthly Income (Min - Max)</p>
                <p className="font-medium">{card.monthlyIncomeMin || '0'} - {card.monthlyIncomeMax || '0'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Lounge Service</p>
                <p className="font-medium">{card.loungeService || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Fraud Liability</p>
                <p className="font-medium">{card.fraudLiability || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Features and Welcome Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
              <p className="text-gray-600">
                {card.features || 'No features information available'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Welcome Offers</h3>
              <p className="text-gray-600">
                {card.welcomeOffers || 'No welcome offers information available'}
              </p>
            </div>
          </div>

          {/* Published Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Published Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Published By</p>
                <p className="font-medium">{card.publishedBy || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Published At</p>
                <p className="font-medium">
                  {card.publishedAt ? new Date(card.publishedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Payout</p>
                <p className="font-medium">{card.payout || 'N/A'}</p>
              </div>
            </div>
          </div>

       
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Details</h3>
            <p className="text-gray-600 mb-4">Please check out given information</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">SEO Title</p>
                <p className="font-medium">{card.seoTitle || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">SEO Keywords</p>
                <p className="font-medium">{card.seoKeywords || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">SEO Description</p>
                <p className="font-medium">{card.seoDescription || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">SEO OG Image</p>
                {card.ogImage ? (
                  <img src={card.ogImage} alt="SEO" className="mt-2 max-w-full h-auto rounded" />
                ) : (
                  <p className="font-medium">N/A</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <p className="text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewOffer;