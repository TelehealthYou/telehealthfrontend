import { useState } from "react";
import { Step1LocationNew } from "./booking/Step1LocationNew";
import { Step2PersonalInfo } from "./booking/Step2PersonalInfo";
import { Step3Payment } from "./booking/Step3Payment";

interface BookingFlowProps {
  onComplete?: () => void;
}

export function BookingFlow({ onComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    // If less than final step, move to next, otherwise handle submit
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    console.log("Final form data:", formData);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Step Content */}
      <div>
        {currentStep === 1 && (
          <Step1LocationNew
            onNext={handleNext}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2PersonalInfo
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3Payment
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {/* Removed Step 4; Step 3 now acts as final submission page */}
      </div>
    </div>
  );
}
