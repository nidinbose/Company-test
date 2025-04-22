import React, { useState } from "react";
import axios from "axios";

const CriteriaForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://your-api-endpoint.com/submit", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-full bg-white p-3">
      <div className=" mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Annual Fee */}
          <div>
            <label className="block font-medium mb-1">
              Annual Fee (0 - 60,000)<span className="text-red-500">*</span>
            </label>
            <input
              name="annualFee"
              type="number"
              value={formData.annualFee}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
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
              value={formData.joiningFee}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
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
              value={formData.foreignTransaction}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
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
              value={formData.apr}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Credit Score */}
          <div>
            <label className="block font-medium mb-1">Credit Score</label>
            <div className="flex gap-2">
              <input
                name="creditScoreMin"
                type="number"
                value={formData.creditScoreMin}
                onChange={handleChange}
                placeholder="Min"
                className="w-1/2 border border-gray-300 p-2 rounded-md"
              />
              <input
                name="creditScoreMax"
                type="number"
                value={formData.creditScoreMax}
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
                value={formData.ageMin}
                onChange={handleChange}
                placeholder="Min"
                className="w-1/2 border border-gray-300 p-2 rounded-md"
              />
              <input
                name="ageMax"
                type="number"
                value={formData.ageMax}
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
              value={formData.incomeMin}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Max Monthly Income */}
          <div>
            <label className="block font-medium mb-1">
              Max Monthly Income<span className="text-red-500">**</span>
            </label>
            <input
              name="incomeMax"
              type="number"
              value={formData.incomeMax}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Lounge Service */}
          <div>
            <label className="block font-medium mb-1">
              Lounge Service<span className="text-red-500">*</span>
            </label>
            <select
              name="loungeService"
              value={formData.loungeService}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
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
              value={formData.fraudLiability}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
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
          <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaForm;
