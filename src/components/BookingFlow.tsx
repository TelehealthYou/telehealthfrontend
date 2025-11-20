import { useState, useCallback } from "react";
import { Step1LocationNew } from "./booking/Step1LocationNew";
import { Step2PersonalInfo } from "./booking/Step2PersonalInfo";
import { Step3Payment } from "./booking/Step3Payment";
import { AppointmentConfirmationModal } from "./booking/AppointmentConfirmationModal";

interface BookingFlowProps {
  onComplete?: () => void;
}

export function BookingFlow({ onComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const updateFormData = useCallback((data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
  }, []);

  const handleNext = useCallback((data?: any) => {
    if (data) updateFormData(data);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // On final step, show confirmation modal
      handleSubmit(data);
    }
  }, [currentStep, updateFormData]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleSubmit = useCallback((data?: any) => {
    const finalData = { ...formData, ...(data || {}) };
    setFormData(finalData);
    setShowConfirmation(true);
  }, [formData]);

  const handleModalClose = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handleModalDone = useCallback(() => {
    setShowConfirmation(false);
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  return (
    <div className="relative min-h-screen bg-gray-50">
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
            onPreview={() => setShowConfirmation(true)}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      <AppointmentConfirmationModal 
        isOpen={showConfirmation}
        onClose={handleModalClose}
        onDone={handleModalDone}
        formData={formData}
      />
    </div>
  );
}