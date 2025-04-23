import React from 'react';
import axios from 'axios';

const Card5 = ({ formData, prevStep, onSubmit }) => {

  const allData = {
    ...formData.component1,
    ...formData.component2,
    ...formData.component3,
    ...formData.component4
  };

  const handleSubmit = async () => {
    try {
          const formDataToSend = new FormData();
      
           Object.entries(allData).forEach(([key, value]) => {
        if (!['imageFile', 'ogImage', 'imagePreview', 'ogImagePreview', 'imageBase64'].includes(key)) {
                  if (typeof value === 'object' && value !== null && !(value instanceof File)) {
            formDataToSend.append(key, JSON.stringify(value));
          } else if (value !== null && value !== undefined) {
            formDataToSend.append(key, value);
          }
        }
      });

          if (allData.imageBase64) {
             formDataToSend.append('cardImageBase64', allData.imageBase64);
      } else if (formData.component1.imageFile) {
      
        formDataToSend.append('cardImage', formData.component1.imageFile);
      }

      if (formData.component3.ogImage) {
        formDataToSend.append('ogImage', formData.component3.ogImage);
      }

     
      console.log('Submitting form data:', Object.fromEntries(formDataToSend.entries()));

      const response = await axios.post('http://localhost:3003/api/addcard', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      
        
      });

      onSubmit(response.data);
    } catch (error) {
      console.error('Submission error:', error);
      
      let errorMessage = 'Error submitting form. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || 
                      `Server error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  const renderField = (value, suffix = '', isPercentage = false) => {
    if (value === null || value === undefined || value === '') {
      return 'Not provided';
    }
    return `${value}${isPercentage ? '%' : ''}${suffix ? ` ${suffix}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Review and Submit</h2>
      
      <div className="space-y-8">
            <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">1. Card Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Card Name:</p>
              <p className="font-medium">{renderField(allData.cardName)}</p>
            </div>
            <div>
              <p className="text-gray-600">Provider Name:</p>
              <p className="font-medium">{renderField(allData.providerName)}</p>
            </div>
            <div>
              <p className="text-gray-600">Card Type:</p>
              <p className="font-medium">{renderField(allData.cardType)}</p>
            </div>
            <div>
              <p className="text-gray-600">Card Status:</p>
              <p className="font-medium">{renderField(allData.cardStatus)}</p>
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
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">2. Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Annual Fee:</p>
              <p className="font-medium">{renderField(allData.annualFee)}</p>
            </div>
            <div>
              <p className="text-gray-600">Joining Fee:</p>
              <p className="font-medium">{renderField(allData.joiningFee)}</p>
            </div>
            <div>
              <p className="text-gray-600">Foreign Transaction Fee:</p>
              <p className="font-medium">{renderField(allData.foreignTransaction, '', true)}</p>
            </div>
            <div>
              <p className="text-gray-600">APR:</p>
              <p className="font-medium">{renderField(allData.apr, '', true)}</p>
            </div>
            <div>
              <p className="text-gray-600">Credit Score Range:</p>
              <p className="font-medium">
                {renderField(allData.creditScoreMin)} - {renderField(allData.creditScoreMax)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Age Group:</p>
              <p className="font-medium">
                {renderField(allData.ageMin)} - {renderField(allData.ageMax)}
              </p>
            </div>
          </div>
        </div>

              <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">3. SEO Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">SEO Title:</p>
              <p className="font-medium">{renderField(allData.seoTitle)}</p>
            </div>
            <div>
              <p className="text-gray-600">SEO Keywords:</p>
              <p className="font-medium">{renderField(allData.seoKeywords)}</p>
            </div>
            <div>
              <p className="text-gray-600">SEO Description:</p>
              <p className="font-medium whitespace-pre-line">{renderField(allData.seoDescription)}</p>
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

             <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-4">4. Description</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Features:</p>
              <p className="font-medium whitespace-pre-line">{renderField(allData.features)}</p>
            </div>
            <div>
              <p className="text-gray-600">Welcome Offers:</p>
              <p className="font-medium whitespace-pre-line">{renderField(allData.welcomeOffers)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Published By:</p>
                <p className="font-medium">{renderField(allData.publishedBy)}</p>
              </div>
              <div>
                <p className="text-gray-600">Published At:</p>
                <p className="font-medium">{renderField(allData.publishedAt)}</p>
              </div>
              <div>
                <p className="text-gray-600">Payout:</p>
                <p className="font-medium">{renderField(allData.payout)}</p>
              </div>
            </div>
          </div>
        </div>

            <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card5;