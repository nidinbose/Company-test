import React, { useState } from 'react';
import axios from 'axios';
import Card1 from '../Cards/CardComponents/Card1';
import CriteriaForm from '../Cards/CardComponents/Card2';
import Card3 from '../Cards/CardComponents/Card3';
import Card4 from '../Cards/CardComponents/Card4';
import Card5 from '../Cards/CardComponents/Card5';

const FormContainer = () => {
  // Initialize form state
  const [formData, setFormData] = useState({
    component1: {},
    component2: {},
    component3: {},
    component4: {},
    component5: {},
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update form data for a specific component
  const updateFormData = (componentName, data) => {
    setFormData(prev => ({
      ...prev,
      [componentName]: data
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Combine all component data
      const completeData = {
        ...formData.component1,
        ...formData.component2,
        ...formData.component3,
        ...formData.component4,
        ...formData.component5,
      };

      // Send data via Axios
      const response = await axios.post('https://your-api-endpoint.com/submit', completeData);
      
      setSubmitSuccess(true);
      console.log('Submission successful:', response.data);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit form');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation between components
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="form-container">
      {submitSuccess ? (
        <div className="success-message">
          Form submitted successfully!
        </div>
      ) : (
        <>
          <div className="form-progress">
            Step {currentStep} of 5
          </div>
          
          {currentStep === 1 && (
            <Card1 
              data={formData.component1} 
              updateData={(data) => updateFormData('component1', data)} 
              nextStep={nextStep}
            />
          )}
          
          {currentStep === 2 && (
            <CriteriaForm 
              data={formData.component2} 
              updateData={(data) => updateFormData('component2', data)} 
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <Card3 
              data={formData.component3} 
              updateData={(data) => updateFormData('component3', data)} 
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <Card4 
              data={formData.component4} 
              updateData={(data) => updateFormData('component4', data)} 
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {currentStep === 5 && (
  <Card5 
    formData={formData} 
    prevStep={prevStep}
    onSubmit={(response) => {
      
      setSubmitSuccess(true);
      console.log('Form submitted:', response);
    }}
  />
)}
          
          {submitError && (
            <div className="error-message">
              {submitError}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormContainer;