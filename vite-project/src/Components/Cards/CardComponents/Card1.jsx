import React, { useState, useEffect } from 'react';

const Card1 = ({ data, updateData, nextStep }) => {
  const [localData, setLocalData] = useState({
    cardName: '',
    cardSlug: '',
    cardType: 'HDFC',
    categoryName: 'Select Category',
    providerName: 'Select Provider',
    service: 'Select Service',
    payout: '',
    commission: '',
    cardLink: '',
    cardStatus: 'Select Card Type',
    moneybipRating: 3.5,
    ratingReviewHeading: '',
    ratingReviewDescription: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  // Initialize with parent data when component mounts
  useEffect(() => {
    if (data) {
      setLocalData(data);
      if (data.imageFile) {
        setFile(data.imageFile);
        setPreview(data.imagePreview);
      }
      if (data.imageBase64) {
        setBase64Image(data.imageBase64);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRatingChange = (rating) => {
    setLocalData((prev) => ({ ...prev, moneybipRating: rating }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      try {
        const base64 = await convertToBase64(uploadedFile);
        setFile(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile));
        setBase64Image(base64);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      try {
        const base64 = await convertToBase64(droppedFile);
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
        setBase64Image(base64);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    // Prepare data to send to parent
    const componentData = {
      ...localData,
      imageFile: file,
      imagePreview: preview,
      imageBase64: base64Image
    };
    
    updateData(componentData);
    nextStep();
  };

  return (
    <form
    onSubmit={handleNext}
    className="bg-white p-6 md:p-6 rounded-md shadow-md  mx-auto h-full"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Offer Information</h2>

    {/* Image Upload */}
    <h1 className="font-semibold mb-3 text-xl">Card image</h1>
    <div
      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-6 bg-gray-50 max-w-md w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto mb-4 h-36 object-contain rounded"
        />
      ) : (
        <div>
          <div className="flex justify-center mb-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 10.293a1 1 0 00-1.414 0L11 14.586V3a1 1 0 10-2 0v11.586L4.707 10.293a1 1 0 10-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Drag & Drop or{' '}
            <label className="text-blue-600 cursor-pointer underline">
              Choose
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>{' '}
            to Upload
          </p>
          <p className="text-xs text-gray-500">
            Image size should be 310 x 180 pixels ratio. Allowed JPG, GIF or PNG. Max size of
            500K
          </p>
        </div>
      )}
    </div>

    {/* Form Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[{ id: 'cardName', label: 'Card Name *', placeholder: 'Enter Card Name' },
        { id: 'cardSlug', label: 'Card Slug *', placeholder: 'Enter Card Slug' }].map(
        ({ id, label, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={id}
              type="text"
              className="mt-1 block h-12 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={localData[id]}
              placeholder={placeholder}
              onChange={handleChange}
              required
            />
          </div>
        )
      )}

      {/* Card Type */}
      <div>
        <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">
          Card Type *
        </label>
        <select
          id="cardType"
          className="mt-1 block h-12 w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
          value={localData.cardType}
          onChange={handleChange}
          required
        >
          <option>HDFC</option>
          <option>SBI</option>
          <option>ICICI</option>
        </select>
      </div>

      {[{ id: 'categoryName', label: 'Category Name *', options: ['Select Category', 'Category 1', 'Category 2'] },
        { id: 'providerName', label: 'Provider Name *', options: ['Select Provider', 'Provider 1', 'Provider 2'] },
        { id: 'service', label: 'Service *', options: ['Select Service', 'Service 1', 'Service 2'] }].map(
        ({ id, label, options }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <select
              id={id}
              className="mt-1 block h-12 w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              value={localData[id]}
              onChange={handleChange}
              required
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )
      )}

      {[{ id: 'payout', label: 'Payout *', placeholder: 'Enter Payout' },
        { id: 'commission', label: 'Commission *', placeholder: 'Enter Commission' },
        { id: 'cardLink', label: 'Card Link *', placeholder: 'Paste Card Link' }].map(
        ({ id, label, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={id}
              type="text"
              className="mt-1 block h-12 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={localData[id]}
              placeholder={placeholder}
              onChange={handleChange}
              required
            />
          </div>
        )
      )}

      {/* Card Status */}
      <div>
        <label htmlFor="cardStatus" className="block text-sm font-medium text-gray-700">
          Card Status *
        </label>
        <select
          id="cardStatus"
          className="mt-1 block h-12 w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
          value={localData.cardStatus}
          onChange={handleChange}
          required
        >
          <option value="Select Card Type">Select Card Type</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Moneybip Rating *</label>
        <div className="flex space-x-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`h-5 w-5 cursor-pointer ${
                localData.moneybipRating >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.82 12.63.944 8.41l6.084-.877L10 2.5l2.972 5.033 6.084.877-4.876 4.22 1.698 5.46z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Heading */}
      <div>
        <label htmlFor="ratingReviewHeading" className="block text-sm font-medium text-gray-700">
          Rating Review Heading
        </label>
        <input
          id="ratingReviewHeading"
          type="text"
          className="mt-1 block h-12 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
          value={localData.ratingReviewHeading}
          placeholder="Enter Review Heading"
          onChange={handleChange}
        />
      </div>

      {/* Review Description */}
      <div className="md:col-span-2">
        <label htmlFor="ratingReviewDescription" className="block text-sm font-medium text-gray-700">
          Rating Review Description (max 200 letters)
        </label>
        <textarea
          id="ratingReviewDescription"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-3"
          placeholder="Enter Review Description"
          value={localData.ratingReviewDescription}
          onChange={handleChange}
          maxLength={200}
        />
      </div>
    </div>

    <div className="mt-6 flex justify-end">
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring"
      >
        Next
      </button>
    </div>
  </form>
  );
};

export default Card1;