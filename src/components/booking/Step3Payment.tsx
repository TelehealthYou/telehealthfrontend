import { Input } from "../ui/input";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import heroBackground from "../../assets/founders-bg.jpg";
import Select from "react-select";

interface Step3PaymentProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function Step3Payment({ onNext, onBack, formData, updateFormData }: Step3PaymentProps) {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: formData.cardNumber || "",
    expiration: formData.expiration || "",
    cvv: formData.cvv || "",
    billingAddress: formData.billingAddress || "",
    city: formData.city || "",
    state: formData.state || "",
    zip: formData.zip || "",
    useHomeAddress: formData.useHomeAddress || false,
    subscribeRefills: formData.subscribeRefills || false,
    subscribeFollowUp: formData.subscribeFollowUp || false,
    couponCode: formData.couponCode || "",
    agreeToTerms: formData.agreeToTerms || false
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
  };

  const handleStateChange = (option: any) => {
    setSelectedState(option);
    handleChange("state", option?.value || "");
  };

  const handleNext = () => {
    updateFormData(paymentInfo);
    onNext();
  };

  const isFormValid = () => {
    return (
      paymentInfo.cardNumber &&
      paymentInfo.expiration &&
      paymentInfo.cvv &&
      paymentInfo.billingAddress &&
      paymentInfo.city &&
      paymentInfo.state &&
      paymentInfo.zip &&
      paymentInfo.agreeToTerms
    );
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
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Payment Form */}
          <div style={{
            padding: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <CreditCard style={{ color: '#2B4C9A' }} size={24} />
              <h3 style={{ 
                fontFamily: 'Open Sans, sans-serif', 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1f2937',
                margin: 0
              }}>
                Card Details
              </h3>
            </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* Card Number */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
              Card Number *
            </label>
            <div style={{ position: 'relative' }}>
              <Input
                value={paymentInfo.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="h-12"
                style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif', paddingRight: '180px' }}
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
          </div>

          {/* Expiration */}
          <div>
            <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
              Expiration Date *
            </label>
            <Input
              value={paymentInfo.expiration}
              onChange={(e) => handleChange("expiration", e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              className="h-12"
              style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
            />
          </div>

          {/* CVV */}
          <div>
            <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
              CVV *
            </label>
            <Input
              value={paymentInfo.cvv}
              onChange={(e) => handleChange("cvv", e.target.value)}
              placeholder="123"
              maxLength={4}
              type="password"
              className="h-12"
              style={{ borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
            />
          </div>
        </div>

        {/* Billing Address */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ 
              fontFamily: 'Open Sans, sans-serif', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: 0
            }}>
              Billing Address
            </h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={paymentInfo.useHomeAddress}
                onChange={(e) => handleChange("useHomeAddress", e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', borderRadius: '4px' }}
              />
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937' }}>Use Home Address</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Street Address */}
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

            {/* City */}
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

            {/* State */}
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

            {/* ZIP */}
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
          </div>
        </div>

        {/* Subscription Options */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '24px' }}>
          <h3 style={{ 
            fontFamily: 'Open Sans, sans-serif', 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Subscription Options
          </h3>
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
                  Subscribe to Prescription Refills
                </p>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Get automatic refills and save 15%
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
                  Subscribe to Follow-up Appointments
                </p>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Priority scheduling and discounted rates
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Coupon Code */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '24px' }}>
          <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
            Coupon Code (Optional)
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Input
              value={paymentInfo.couponCode}
              onChange={(e) => handleChange("couponCode", e.target.value)}
              placeholder="Enter coupon code"
              className="h-12"
              style={{ flex: 1, borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'Open Sans, sans-serif' }}
            />
            <button
              type="button"
              style={{
                backgroundColor: '#ffffff',
                color: '#2B4C9A',
                padding: '0 24px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Open Sans, sans-serif',
                borderRadius: '6px',
                border: '1px solid #2B4C9A',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Terms Agreement */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', marginTop: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={paymentInfo.agreeToTerms}
              onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
              style={{ marginTop: '2px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <div>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#1f2937', margin: 0 }}>
                I agree to the{" "}
                <a href="#" style={{ color: '#2B4C9A', textDecoration: 'underline' }}>terms and conditions</a>
                {" "}and{" "}
                <a href="#" style={{ color: '#2B4C9A', textDecoration: 'underline' }}>privacy policy</a>
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
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
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BACK
        </button>

        {/* Complete Payment Button */}
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          style={{
            backgroundColor: isFormValid() ? '#2B4C9A' : '#9ca3af',
            color: '#ffffff',
            padding: '10px 30px',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Open Sans, sans-serif',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            opacity: isFormValid() ? 1 : 0.5,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (isFormValid()) {
              e.currentTarget.style.backgroundColor = '#1c3a7a';
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid()) {
              e.currentTarget.style.backgroundColor = '#2B4C9A';
            }
          }}
        >
          COMPLETE PAYMENT
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}
