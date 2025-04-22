import React, { useState } from "react";
import axios from "axios";

// Importing the step components
import FormStep1 from './components/FormStep1';
import FormStep2 from './components/FormStep2';
import ReviewStep from './components/ReviewStep';

const MultiStepForm = () => {
  // Step 1: Manage the form data state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    features: "",
    welcomeOffers: "",
    publishedBy: "",
    publishedAt: "",
    payout: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle next and previous buttons
  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  // Handle submit
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-api-endpoint.com/submit",
        formData
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Multi-Step Form</h2>

      {/* Render different steps based on current step */}
      {step === 1 && (
        <FormStep1 formData={formData} handleChange={handleChange} />
      )}
      {step === 2 && (
        <FormStep2 formData={formData} handleChange={handleChange} />
      )}
      {step === 3 && <ReviewStep formData={formData} />}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handlePrevious}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
          >
            Previous
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
