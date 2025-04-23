import React, { useState, useEffect } from "react";

const Card3 = ({ data, updateData, nextStep, prevStep }) => {
  const [localData, setLocalData] = useState({
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    ogImage: null,
    ogImagePreview: null
  });

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setLocalData(prev => ({
        ...prev,
        ogImage: file,
        ogImagePreview: preview
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    updateData(localData);
    nextStep();
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    updateData(localData);
    prevStep();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">SEO details</h2>

      <form onSubmit={handleNext} className="space-y-6">
              <div>
          <label className="block font-medium mb-1">
            SEO Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="seoTitle"
            value={localData.seoTitle}
            onChange={handleChange}
            placeholder="Placeholder"
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            SEO Keywords<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="seoKeywords"
            value={localData.seoKeywords}
            onChange={handleChange}
            placeholder="Placeholder"
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            SEO Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="seoDescription"
            value={localData.seoDescription}
            onChange={handleChange}
            placeholder="Write SEO description here..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-2">
            SEO OG image<span className="text-red-500">*</span>
          </label>
          <label className="flex flex-col items-center w-80 justify-center h-40 p-4 border-2 border-dashed border-blue-400 rounded-md cursor-pointer hover:bg-blue-50 transition">
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              className="hidden"
              required={!localData.ogImage}
            />
            {localData.ogImagePreview ? (
              <img 
                src={localData.ogImagePreview} 
                alt="Preview" 
                className="h-full object-contain"
              />
            ) : (
              <div className="text-center text-blue-600">
                <div className="text-2xl mb-1">📤</div>
                <p className="font-medium">
                  Drag & Drop or <span className="text-blue-700 underline">Choose</span> to Upload
                </p>
                <p className="text-xs text-gray-500">
                  Image size should be 310x180 px. Max 500KB. JPG, PNG, or GIF.
                </p>
              </div>
            )}
          </label>
          {localData.ogImage && (
            <p className="text-sm mt-2 text-green-600">
              Selected: {localData.ogImage.name}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button 
            type="button"
            onClick={handlePrevious}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
          >
            Previous
          </button>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Card3;