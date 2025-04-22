import React, { useState, useEffect } from "react";

const CriteriaForm = ({ data, updateData, nextStep, prevStep }) => {
  const [localData, setLocalData] = useState({
    annualFee: "",
    joiningFee: "",
    foreignTransaction: "",
    apr: "",
    creditScoreMin: "",
    creditScoreMax: "",
    ageMin: "",
    ageMax: "",
    incomeMin: "",
    incomeMax: "",
    loungeService: "",
    fraudLiability: "",
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
    <div className="min-h-full bg-white p-3">
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Criteria</h2>
        <form onSubmit={handleNext}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Annual Fee */}
            <div>
              <label className="block font-medium mb-1">
                Annual Fee (0 - 60,000)<span className="text-red-500">*</span>
              </label>
              <input
                name="annualFee"
                type="number"
                value={localData.annualFee}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Joining Fee */}
            <div>
              <label className="block font-medium mb-1">
                Joining Fee (0 - 2,00,000)<span className="text-red-500">*</span>
              </label>
              <input
                name="joiningFee"
                type="number"
                value={localData.joiningFee}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Foreign Transaction Percentage */}
            <div>
              <label className="block font-medium mb-1">
                Foreign Transaction Percentage (0% - 100%)<span className="text-red-500">*</span>
              </label>
              <input
                name="foreignTransaction"
                type="number"
                value={localData.foreignTransaction}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                min="0"
                max="100"
                required
              />
            </div>

            {/* Annual Percentage Rate */}
            <div>
              <label className="block font-medium mb-1">
                Annual Percentage Rate (0.00% - 52.80%)<span className="text-red-500">*</span>
              </label>
              <input
                name="apr"
                type="number"
                value={localData.apr}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                step="0.01"
                min="0"
                max="52.8"
                required
              />
            </div>

            {/* Credit Score */}
            <div>
              <label className="block font-medium mb-1">Credit Score</label>
              <div className="flex gap-2">
                <input
                  name="creditScoreMin"
                  type="number"
                  value={localData.creditScoreMin}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                />
                <input
                  name="creditScoreMax"
                  type="number"
                  value={localData.creditScoreMax}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>

            {/* User Age Group */}
            <div>
              <label className="block font-medium mb-1">User Age Group</label>
              <div className="flex gap-2">
                <input
                  name="ageMin"
                  type="number"
                  value={localData.ageMin}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                  min="18"
                />
                <input
                  name="ageMax"
                  type="number"
                  value={localData.ageMax}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>

            {/* Min Monthly Income */}
            <div>
              <label className="block font-medium mb-1">
                Min Monthly Income<span className="text-red-500">*</span>
              </label>
              <input
                name="incomeMin"
                type="number"
                value={localData.incomeMin}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Max Monthly Income */}
            <div>
              <label className="block font-medium mb-1">
                Max Monthly Income<span className="text-red-500">*</span>
              </label>
              <input
                name="incomeMax"
                type="number"
                value={localData.incomeMax}
                onChange={handleChange}
                placeholder="Placeholder"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Lounge Service */}
            <div>
              <label className="block font-medium mb-1">
                Lounge Service<span className="text-red-500">*</span>
              </label>
              <select
                name="loungeService"
                value={localData.loungeService}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              >
                <option value="">Select lounge Service</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Fraud Liability */}
            <div>
              <label className="block font-medium mb-1">
                Fraud Liability<span className="text-red-500">*</span>
              </label>
              <select
                name="fraudLiability"
                value={localData.fraudLiability}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              >
                <option value="">Select Fraud Liability</option>
                <option value="Full">Full</option>
                <option value="Partial">Partial</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button 
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
    </div>
  );
};

export default CriteriaForm;