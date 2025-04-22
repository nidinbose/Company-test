import React from 'react';
import axios from 'axios';

const Card5 = ({ formData, prevStep, onSubmit }) => {
  // Combine all data from previous components
  const allData = {
    ...formData.component1,
    ...formData.component2,
    ...formData.component3,
    ...formData.component4
  };

  const handleSubmit = async () => {
    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      
      // Append all regular fields
      Object.entries(allData).forEach(([key, value]) => {
        if (key !== 'imageFile' && key !== 'ogImage' && key !== 'imagePreview' && key !== 'ogImagePreview') {
          formDataToSend.append(key, value);
        }
      });

      // Append image files if they exist
      if (formData.component1.imageFile) {
        formDataToSend.append('cardImage', formData.component1.imageFile);
      }
      if (formData.component3.ogImage) {
        formDataToSend.append('ogImage', formData.component3.ogImage);
      }

      // Submit to backend
      const response = await axios.post('https://your-api-endpoint.com/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Call parent's onSubmit handler
      onSubmit(response.data);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Review and Submit</h2>
      
      <div className="space-y-8">
        {/* Card Information */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">1. Card Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Card Name:</p>
              <p className="font-medium">{allData.cardName}</p>
            </div>
            <div>
              <p className="text-gray-600">Card Slug:</p>
              <p className="font-medium">{allData.cardSlug}</p>
            </div>
            <div>
              <p className="text-gray-600">Card Type:</p>
              <p className="font-medium">{allData.cardType}</p>
            </div>
            <div>
              <p className="text-gray-600">Card Status:</p>
              <p className="font-medium">{allData.cardStatus}</p>
            </div>
            {allData.imagePreview && (
              <div className="md:col-span-2">
                <p className="text-gray-600">Card Image:</p>
                <img 
                  src={allData.imagePreview} 
                  alt="Card Preview" 
                  className="h-32 object-contain border rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Criteria */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">2. Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Annual Fee:</p>
              <p className="font-medium">{allData.annualFee}</p>
            </div>
            <div>
              <p className="text-gray-600">Joining Fee:</p>
              <p className="font-medium">{allData.joiningFee}</p>
            </div>
            <div>
              <p className="text-gray-600">Foreign Transaction Fee:</p>
              <p className="font-medium">{allData.foreignTransaction}%</p>
            </div>
            <div>
              <p className="text-gray-600">APR:</p>
              <p className="font-medium">{allData.apr}%</p>
            </div>
            <div>
              <p className="text-gray-600">Credit Score Range:</p>
              <p className="font-medium">{allData.creditScoreMin} - {allData.creditScoreMax}</p>
            </div>
            <div>
              <p className="text-gray-600">Age Group:</p>
              <p className="font-medium">{allData.ageMin} - {allData.ageMax}</p>
            </div>
          </div>
        </div>

        {/* SEO Details */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">3. SEO Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">SEO Title:</p>
              <p className="font-medium">{allData.seoTitle}</p>
            </div>
            <div>
              <p className="text-gray-600">SEO Keywords:</p>
              <p className="font-medium">{allData.seoKeywords}</p>
            </div>
            <div>
              <p className="text-gray-600">SEO Description:</p>
              <p className="font-medium whitespace-pre-line">{allData.seoDescription}</p>
            </div>
            {allData.ogImagePreview && (
              <div>
                <p className="text-gray-600">OG Image:</p>
                <img 
                  src={allData.ogImagePreview} 
                  alt="OG Preview" 
                  className="h-32 object-contain border rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">4. Description</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Features:</p>
              <p className="font-medium whitespace-pre-line">{allData.features}</p>
            </div>
            <div>
              <p className="text-gray-600">Welcome Offers:</p>
              <p className="font-medium whitespace-pre-line">{allData.welcomeOffers}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Published By:</p>
                <p className="font-medium">{allData.publishedBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Published At:</p>
                <p className="font-medium">{allData.publishedAt}</p>
              </div>
              <div>
                <p className="text-gray-600">Payout:</p>
                <p className="font-medium">{allData.payout}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card5;