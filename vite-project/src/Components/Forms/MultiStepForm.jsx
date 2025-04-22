import React, { useState } from 'react';
import axios from 'axios';
import Card1 from '../Cards/CardComponents/Card1';
import CriteriaForm from '../Cards/CardComponents/Card2';
import Card3 from '../Cards/CardComponents/Card3';
import Card4 from '../Cards/CardComponents/Card4';
import Card5 from '../Cards/CardComponents/Card5';

const FormContainer = () => {
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

  const updateFormData = (componentName, data) => {
    setFormData(prev => ({
      ...prev,
      [componentName]: data
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const completeData = {
        ...formData.component1,
        ...formData.component2,
        ...formData.component3,
        ...formData.component4,
        ...formData.component5,
      };

      const response = await axios.post('http://localhost:3003/api/addcard', completeData);
      setSubmitSuccess(true);
      console.log(response);
      
      console.log('Submission successful:', response.data);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit form');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, name: 'Card 1', component: 'component1' },
    { id: 2, name: 'Criteria Form', component: 'component2' },
    { id: 3, name: 'Card 3', component: 'component3' },
    { id: 4, name: 'Card 4', component: 'component4' },
    { id: 5, name: 'Review & Submit', component: 'component5' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Navigation Sidebar */}
      <aside className="w-64 bg-gray-50 p-5 border-r border-gray-200 hidden">
        <h3 className="text-lg font-medium text-gray-900 mb-5">Form Progress</h3>
        <ul className="space-y-2">
          {steps.map((step) => (
            <li 
              key={step.id}
              className={`
                flex items-center p-3 rounded-md cursor-pointer transition-colors
                ${currentStep === step.id ? 'bg-blue-50 font-medium' : 'hover:bg-gray-100'}
                ${formData[step.component] && Object.keys(formData[step.component]).length > 0 ? 'text-green-600' : ''}
              `}
              onClick={() => setCurrentStep(step.id)}
            >
              <span className={`
                flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm
                ${currentStep === step.id ? 'bg-blue-500 text-white' : 'bg-gray-300'}
                ${formData[step.component] && Object.keys(formData[step.component]).length > 0 ? 'bg-green-500 text-white' : ''}
              `}>
                {step.id}
              </span>
              <span className="flex-grow">{step.name}</span>
              {formData[step.component] && Object.keys(formData[step.component]).length > 0 && (
                <span className="text-green-500 ml-2">✓</span>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Form Content */}
      <div className="flex-1 p-6">
        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Form submitted successfully!</h2>
            <p className="text-green-600">Thank you for completing the form.</p>
          </div>
        ) : (
          <>
            <div className="md:hidden mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}
              </p>
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
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormContainer;