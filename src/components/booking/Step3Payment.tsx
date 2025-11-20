import { Input } from "../ui/input";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import heroBackground from "../../assets/founders-bg.jpg";
import Select from "react-select";

interface Step3PaymentProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  onPreview?: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function Step3Payment({ onNext, onBack, formData, updateFormData, onPreview }: Step3PaymentProps) {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: formData.nameOnCard || "",
    cardNumber: formData.cardNumber || "",
    expiration: formData.expiration || "",
    cvv: formData.cvv || "",
    billingAddress: formData.billingAddress || "",
    city: formData.city || "",
    state: formData.state || "",
    zip: formData.zip || "",
    // Default to true (mailing address same as home address)
    useHomeAddress: formData.useHomeAddress !== undefined ? formData.useHomeAddress : true,
    subscribeRefills: formData.subscribeRefills || false,
    subscribeFollowUp: formData.subscribeFollowUp || false,
    couponCode: formData.couponCode || "",
    agreeToTerms: formData.agreeToTerms || false,
    agreeFollowUp: formData.agreeFollowUp || false,
    certifyAccuracy: formData.certifyAccuracy || false,
    savePaymentMethod: formData.savePaymentMethod || false
  });

  const [selectedState, setSelectedState] = useState<any>(
    formData.state ? { value: formData.state, label: formData.state } : null
  );

  // State options
  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: '48px',
      minHeight: '48px',
      borderRadius: '6px',
      border: `1px solid ${state.isFocused ? '#2B4C9A' : '#d1d5db'}`,
      boxShadow: 'none',
      '&:hover': {
        border: `1px solid ${state.isFocused ? '#2B4C9A' : '#d1d5db'}`
      },
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '14px'
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f3f4f6' : '#ffffff',
      color: '#1f2937',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '14px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#e5e7eb'
      }
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#6b7280',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '14px'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#1f2937',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '14px'
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999
    }),
    menuList: (base: any) => ({
      ...base,
      borderRadius: '6px',
      padding: '4px'
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        color: '#2B4C9A'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  const handleChange = (field: string, value: string | boolean) => {
    setPaymentInfo({ ...paymentInfo, [field]: value });
    // Clear error when user starts typing
    if (paymentErrors[field]) {
      setPaymentErrors({ ...paymentErrors, [field]: '' });
    }
  };

  // Luhn Algorithm for card number validation
  const validateCardNumber = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(digits)) return false;
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : digits;
  };

  // Format expiration date as MM/YY
  const formatExpiration = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  // Validate expiration date
  const validateExpiration = (expiration: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(expiration)) return false;
    const [month, year] = expiration.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  };

  // Validate CVV
  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  };

  // Handle card number change with formatting
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, '').length <= 19) {
      handleChange('cardNumber', formatted);
    }
  };

  // Handle expiration change with formatting
  const handleExpirationChange = (value: string) => {
    const formatted = formatExpiration(value);
    if (formatted.length <= 5) {
      handleChange('expiration', formatted);
    }
  };

  // Validate all payment fields
  const validatePaymentFields = (): boolean => {
    const errors: Record<string, string> = {};

    if (!paymentInfo.nameOnCard.trim()) {
      errors.nameOnCard = 'Name on card is required';
    }

    if (!paymentInfo.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(paymentInfo.cardNumber)) {
      errors.cardNumber = 'Invalid card number';
    }

    if (!paymentInfo.expiration.trim()) {
      errors.expiration = 'Expiration date is required';
    } else if (!validateExpiration(paymentInfo.expiration)) {
      errors.expiration = 'Invalid or expired date (MM/YY)';
    }

    if (!paymentInfo.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!validateCVV(paymentInfo.cvv)) {
      errors.cvv = 'Invalid CVV (3-4 digits)';
    }

    if (!paymentInfo.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to terms and conditions';
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStateChange = (option: any) => {
    setSelectedState(option);
    handleChange("state", option?.value || "");
  };

  const handleNext = () => {
    // Validate payment fields
    if (!validatePaymentFields()) {
      // Scroll to first error
      const firstErrorField = Object.keys(paymentErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      // If using home address for billing, copy home address fields from formData into the payment info before updating
      if (paymentInfo.useHomeAddress) {
        const merged = {
          ...paymentInfo,
          billingAddress: formData.homeAddress || paymentInfo.billingAddress,
          city: formData.city || paymentInfo.city,
          state: formData.state || paymentInfo.state,
          zip: formData.zip || paymentInfo.zip
        };
        console.log('Step3Payment: handleNext merging data (useHomeAddress)', merged);
        updateFormData(merged);
        onNext(merged);
      } else {
        console.log('Step3Payment: handleNext merging data (billingAddress)', paymentInfo);
        updateFormData(paymentInfo);
        onNext(paymentInfo);
      }
    }, 1500);
  };

  const isFormValid = () => {
    // Basic validation for enabling submit button
    const basicPaymentValid = paymentInfo.nameOnCard && paymentInfo.cardNumber && paymentInfo.expiration && paymentInfo.cvv;
    return basicPaymentValid && paymentInfo.agreeToTerms;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${heroBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Progress Bar */}
      <div style={{
        backdropFilter: 'blur(8px)',
        paddingTop: '10px'
      }}>
        <div style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '46px',
          paddingRight: '46px',
          paddingTop: '24px',
        }}>
          {/* Title */}
          <h1 style={{ fontFamily: 'Open Sans, sans-serif', color: '#28436F', fontSize: '42px', fontWeight: '600', textAlign: 'center', marginBottom: '1.5rem' }}>
            Payment Information
          </h1>

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            {/* Step 1 - Completed */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '18px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '12px',
                position: 'relative'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#10b981',
                textAlign: 'center',
                fontFamily: 'Open Sans, sans-serif',
                maxWidth: '180px'
              }}>
                Select Appointment
              </p>
            </div>

            {/* Connector Line 1 */}
            <div style={{
              width: '256px',
              height: '2px',
              backgroundColor: '#10b981',
              marginTop: '27px'
            }}></div>

            {/* Step 2 - Completed */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '18px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '12px',
                position: 'relative'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#10b981',
                textAlign: 'center',
                fontFamily: 'Open Sans, sans-serif',
                maxWidth: '180px'
              }}>
                Add Contact Info
              </p>
            </div>

            {/* Connector Line 2 */}
            <div style={{
              width: '256px',
              height: '2px',
              backgroundColor: '#10b981',
              marginTop: '27px'
            }}></div>

            {/* Step 3 - Active */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#2B4C9A',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '18px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '12px'
              }}>
                3
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                textAlign: 'center',
                fontFamily: 'Open Sans, sans-serif',
                maxWidth: '180px'
              }}>
                Payment & Confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 46px' }}>
        {/* Summary Column */}
        <div style={{ maxWidth: '580px', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '28px', fontWeight: '700', color: '#1f2937', marginTop: 0 }}>Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', marginLeft: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#1f2937' }}>{formData.service || 'Primary Care'}</span>
              <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#1f2937' }}>$ 50.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#1f2937' }}>Subscription</span>
              <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#1f2937' }}>$ 50.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontWeight: 700, fontFamily: 'Open Sans, sans-serif', fontSize: '16px', color: '#1f2937' }}>Sub Total</span>
              <span style={{ fontWeight: 700, fontFamily: 'Open Sans, sans-serif', fontSize: '16px', color: '#1f2937' }}>$ 100.00</span>
            </div>
            {discountApplied && discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#10b981' }}>Discount Applied</span>
                <span style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '15px', color: '#10b981' }}>- $ {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ marginTop: '12px' }}>
              <label style={{ fontWeight: 600, fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', display: 'block', marginBottom: '8px' }}>Discount Code</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <Input
                  value={paymentInfo.couponCode}
                  onChange={(e) => handleChange("couponCode", e.target.value)}
                  placeholder="Enter the Discount Code"
                  className="h-12"
                  style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif', flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    // Simple discount logic: WELCOME = $5 off, SAVE10 = 10% off
                    const code = paymentInfo.couponCode.toUpperCase();
                    if (code === 'WELCOME') {
                      setDiscountAmount(5);
                      setDiscountApplied(true);
                    } else if (code === 'SAVE10') {
                      setDiscountAmount(10);
                      setDiscountApplied(true);
                    } else if (code) {
                      alert('Invalid discount code');
                      setDiscountAmount(0);
                      setDiscountApplied(false);
                    }
                  }}
                  style={{ backgroundColor: '#ffffff', color: '#2B4C9A', padding: '0 24px', fontSize: '16px', fontWeight: '600', borderRadius: '6px', border: '1px solid #2B4C9A', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2B4C9A';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#2B4C9A';
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '2px solid #2B4C9A' }}>
              <span style={{ fontWeight: 700, fontFamily: 'Open Sans, sans-serif', fontSize: '18px', color: '#2B4C9A' }}>Due Total</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {discountApplied && discountAmount > 0 && (
                  <span style={{ textDecoration: 'line-through', color: '#ef4444', fontFamily: 'Open Sans, sans-serif', fontSize: '16px' }}>$ 100.00</span>
                )}
                <span style={{ fontWeight: 700, color: '#2B4C9A', fontFamily: 'Open Sans, sans-serif', fontSize: '18px' }}>$ {(100 - discountAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Payment Form */}
          <div style={{
            padding: '32px',
          }}>


            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', marginBottom: '32px' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <CreditCard style={{ color: '#2B4C9A' }} size={24} />
                <h3 style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Enter Payment Method
                </h3>
              </div>

              {/* Name on Card */}
              <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                  Name as appear on the card *
                </label>
                <Input
                  name="nameOnCard"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) => handleChange("nameOnCard", e.target.value)}
                  placeholder="John Doe"
                  className="h-12"
                  style={{ borderRadius: '6px', border: `1px solid ${paymentErrors.nameOnCard ? '#ef4444' : '#d1d5db'}`, fontFamily: 'Open Sans, sans-serif', width: '100%' }}
                />
                {paymentErrors.nameOnCard && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px', fontFamily: 'Open Sans, sans-serif' }}>{paymentErrors.nameOnCard}</p>
                )}
              </div>

              {/* Card Number */}

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                  Card Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Input
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="h-12"
                    style={{ borderRadius: '6px', border: `1px solid ${paymentErrors.cardNumber ? '#ef4444' : '#d1d5db'}`, fontFamily: 'Open Sans, sans-serif', paddingRight: '180px' }}
                  />
                  {/* Payment Card Logos */}
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    pointerEvents: 'none'
                  }}>
                    {/* Visa */}
                    <div style={{
                      width: '40px',
                      height: '26px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e5e7eb',
                      padding: '2px'
                    }}>
                      <img
                        src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png"
                        alt="Visa"
                        style={{ height: '14px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                    {/* Mastercard */}
                    <div style={{
                      width: '40px',
                      height: '26px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e5e7eb',
                      padding: '2px'
                    }}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="Mastercard"
                        style={{ height: '16px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                    {/* American Express */}
                    <div style={{
                      width: '40px',
                      height: '26px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e5e7eb',
                      padding: '2px'
                    }}>
                      <img
                        src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png"
                        alt="American Express"
                        style={{ height: '14px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                    {/* Discover */}
                    <div style={{
                      width: '40px',
                      height: '26px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e5e7eb',
                      padding: '2px'
                    }}>
                      <img
                        src="https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png"
                        alt="Discover"
                        style={{ height: '14px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
                {paymentErrors.cardNumber && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px', fontFamily: 'Open Sans, sans-serif' }}>{paymentErrors.cardNumber}</p>
                )}
              </div>
              
              {/* Expiration */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                  Expiration Date *
                </label>
                <Input
                  name="expiration"
                  value={paymentInfo.expiration}
                  onChange={(e) => handleExpirationChange(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="h-12"
                  style={{ borderRadius: '6px', border: `1px solid ${paymentErrors.expiration ? '#ef4444' : '#d1d5db'}`, fontFamily: 'Open Sans, sans-serif' }}
                />
                {paymentErrors.expiration && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px', fontFamily: 'Open Sans, sans-serif' }}>{paymentErrors.expiration}</p>
                )}
              </div>

              {/* CVV */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                  CVV *
                </label>
                <Input
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) handleChange("cvv", value);
                  }}
                  placeholder="123"
                  maxLength={4}
                  type="text"
                  className="h-12"
                  style={{ borderRadius: '6px', border: `1px solid ${paymentErrors.cvv ? '#ef4444' : '#d1d5db'}`, fontFamily: 'Open Sans, sans-serif' }}
                />
                {paymentErrors.cvv && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px', fontFamily: 'Open Sans, sans-serif' }}>{paymentErrors.cvv}</p>
                )}
              </div>
            </div>

            {/* If mailing address uses home address but home address is missing, show guidance */}
              {paymentInfo.useHomeAddress && (!formData.homeAddress || !formData.city || !formData.state || !formData.zip) && (
                <div style={{ marginTop: '12px' }}>
                  <p style={{ color: '#ef4444', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', margin: 0 }}>
                    Home address is required — please complete your Home Address in the Contact Info step or uncheck the box to provide a different billing address.
                  </p>
                </div>
              )}

              {paymentInfo.useHomeAddress && formData.homeAddress && (
                <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '600', color: '#2B4C9A', marginBottom: '8px', marginTop: 0 }}>Home Address (Used for Billing):</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', margin: 0 }}>
                      <span style={{ fontWeight: '600' }}>Street:</span> {formData.homeAddress}
                    </p>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', margin: 0 }}>
                      <span style={{ fontWeight: '600' }}>City:</span> {formData.city}
                    </p>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', margin: 0 }}>
                      <span style={{ fontWeight: '600' }}>State:</span> {formData.state}
                    </p>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', margin: 0 }}>
                      <span style={{ fontWeight: '600' }}>ZIP:</span> {formData.zip}
                    </p>
                  </div>
                </div>
              )}


            {/* Billing Address */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                {!paymentInfo.useHomeAddress && (
                <h3 style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 16px 0'
                }}>
                  Billing Address
                </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={paymentInfo.savePaymentMethod}
                      onChange={(e) => handleChange("savePaymentMethod", e.target.checked)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', borderRadius: '4px', flexShrink: 0 }}
                    />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937' }}>Save and use this payment method for future payments</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={paymentInfo.useHomeAddress}
                      onChange={(e) => handleChange("useHomeAddress", e.target.checked)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', borderRadius: '4px', flexShrink: 0 }}
                    />
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#ef4444' }}>Mailing address same as home address (Collapse if address is different)</span>
                  </label>
                </div>
              </div>

              {!paymentInfo.useHomeAddress && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Street Address */}
                {!paymentInfo.useHomeAddress && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      Street Address *
                    </label>
                    <Input
                      value={paymentInfo.billingAddress}
                      onChange={(e) => handleChange("billingAddress", e.target.value)}
                      placeholder="123 Main Street"
                      className="h-12"
                      style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                )}

                {/* City */}
                {!paymentInfo.useHomeAddress && (
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      City *
                    </label>
                    <Input
                      value={paymentInfo.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="City"
                      className="h-12"
                      style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                )}

                {/* State */}
                {!paymentInfo.useHomeAddress && (
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      State *
                    </label>
                    <Select
                      options={stateOptions}
                      value={selectedState}
                      onChange={handleStateChange}
                      placeholder="Select a state"
                      styles={customSelectStyles}
                      isSearchable={true}
                    />
                  </div>
                )}

                {/* ZIP */}
                {!paymentInfo.useHomeAddress && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      ZIP Code *
                    </label>
                    <Input
                      value={paymentInfo.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      placeholder="ZIP Code"
                      maxLength={5}
                      className="h-12"
                      style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                )}
              </div>
              )}
            </div>

            {/* Subscription Options */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '24px' }}>
             
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={paymentInfo.subscribeRefills}
                    onChange={(e) => handleChange("subscribeRefills", e.target.checked)}
                    style={{ marginTop: '2px', width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <div>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', margin: '0 0 4px 0' }}>
                     I agree to follow up with my regular medical provider for ongoing care Please accept this condition to continue.
                    </p>
                    
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={paymentInfo.subscribeFollowUp}
                    onChange={(e) => handleChange("subscribeFollowUp", e.target.checked)}
                    style={{ marginTop: '2px', width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <div>
                    <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', margin: '0 0 4px 0' }}>
                     By checking this box, I certify that, to the best of my knowledge, all medical information sub View terms of use. Please accept the terms and conditions to continue.
                    </p>
                   
                  </div>
                </label>
              </div>
            </div>

            

           
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 200px',
            alignItems: 'center',
            paddingTop: '28px',
            paddingBottom: '48px'
          }}>
            {/* Back Button */}
            <button
              onClick={onBack}
              style={{
                backgroundColor: '#ffffff',
                color: '#2B4C9A',
                padding: '10px 30px',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'Open Sans, sans-serif',
                borderRadius: '8px',
                border: '2px solid #2B4C9A',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              BACK
            </button>

            {/* Submit Button (center) */}
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => { console.log('Submit pressed. isFormValid:', isFormValid()); handleNext(); }}
                disabled={isProcessing}
                style={{
                  backgroundColor: isProcessing ? '#6b7280' : (isFormValid() ? '#2B4C9A' : '#9ca3af'),
                  color: '#ffffff',
                  padding: '10px 30px',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'Open Sans, sans-serif',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: isProcessing ? 'not-allowed' : (isFormValid() ? 'pointer' : 'pointer'),
                  opacity: isFormValid() && !isProcessing ? 1 : 0.8,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '180px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (isFormValid() && !isProcessing) {
                    e.currentTarget.style.backgroundColor = '#1c3a7a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFormValid() && !isProcessing) {
                    e.currentTarget.style.backgroundColor = '#2B4C9A';
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                    </svg>
                    Processing...
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </>
                ) : (
                  <>
                    Submit
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
