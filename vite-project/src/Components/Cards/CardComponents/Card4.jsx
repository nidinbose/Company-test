import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Card4 = () => {
  const [features, setFeatures] = useState("");
  const [welcomeOffers, setWelcomeOffers] = useState("");
  const [publishedBy, setPublishedBy] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [payout, setPayout] = useState("");

  const handleSubmit = async () => {
    const formData = {
      features,
      welcomeOffers,
      publishedBy,
      publishedAt,
      payout,
    };

    try {
      // Make POST request using Axios
      const response = await axios.post("https://your-backend-api-endpoint.com/submit", formData);

      // Handle successful response
      console.log("Form submitted successfully:", response.data);
      
      // Optionally handle any other logic on success, like clearing form or redirecting
    } catch (error) {
      // Handle error response
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Description</h2>

      <div className="space-y-6">
        {/* Features */}
        <div>
          <label className="block font-medium mb-1">
            Features<span className="text-red-500">*</span>
          </label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Write feature details here..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
          ></textarea>
        </div>

        {/* Welcome Offers */}
        <div>
          <label className="block font-medium mb-1">
            Welcome Offers<span className="text-red-500">*</span>
          </label>
          <textarea
            value={welcomeOffers}
            onChange={(e) => setWelcomeOffers(e.target.value)}
            placeholder="Describe welcome offers..."
            rows="6"
            className="w-full border border-gray-300 p-2 rounded-md resize-none"
          ></textarea>
        </div>

        {/* Bottom Row: Published By, Published At, Payout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Published By</label>
            <input
              type="text"
              value={publishedBy}
              onChange={(e) => setPublishedBy(e.target.value)}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Published At</label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              placeholder="DD-MM-YYYY"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Payout</label>
            <input
              type="text"
              value={payout}
              onChange={(e) => setPayout(e.target.value)}
              placeholder="Placeholder"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
            onClick={() => console.log("Previous clicked")}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card4;
