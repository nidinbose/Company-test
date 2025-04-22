import React, { useState, useEffect } from "react";

const Card4 = ({ data, updateData, nextStep, prevStep }) => {
  const [localData, setLocalData] = useState({
    features: "",
    welcomeOffers: "",
    publishedBy: "",
    publishedAt: "",
    payout: ""
  });

  // Initialize with parent data when component mounts
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
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
      <h2 className="text-2xl font-semibold mb-6">Description</h2>

      <form onSubmit={handleNext} className="space-y-6">
        {/* Features */}
        <div>
          <label className="block font-medium mb-1">
            Features<span className="text-red-500">*</span>
          </label>
          <textarea
            name="features"
            value={localData.features}
            onChange={handleChange}
            placeholder="Write feature details here..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
            required
          ></textarea>
        </div>

        {/* Welcome Offers */}
        <div>
          <label className="block font-medium mb-1">
            Welcome Offers<span className="text-red-500">*</span>
          </label>
          <textarea
            name="welcomeOffers"
            value={localData.welcomeOffers}
            onChange={handleChange}
            placeholder="Describe welcome offers..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
            required
          ></textarea>
        </div>

        {/* Bottom Row: Published By, Published At, Payout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Published By</label>
            <input
              type="text"
              name="publishedBy"
              value={localData.publishedBy}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Published At</label>
            <input
              type="date"
              name="publishedAt"
              value={localData.publishedAt}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Payout</label>
            <input
              type="text"
              name="payout"
              value={localData.payout}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
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

export default Card4;