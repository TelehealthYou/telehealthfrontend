import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Eye, EyeOff, Mail, CalendarIcon } from "lucide-react";
import heroBackground from "../../assets/founders-bg.jpg";
import { format } from "date-fns";
import Select from "react-select";

interface Step2PersonalInfoProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function Step2PersonalInfo({ onNext, onBack, formData, updateFormData }: Step2PersonalInfoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [showPharmacyModal, setShowPharmacyModal] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    formData.dob ? new Date(formData.dob) : undefined
  );
  const [absenceDate, setAbsenceDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  
  // React Select options
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
    { value: 'GA', label: 'Georgia' }
  ];

  const specialtyOptions = [
    { value: 'general', label: 'General Pharmacy' },
    { value: 'compounding', label: 'Compounding Pharmacy' },
    { value: 'specialty', label: 'Specialty Pharmacy' },
    { value: 'clinical', label: 'Clinical Pharmacy' }
  ];

  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: '48px',
      minHeight: '48px',
      borderRadius: '8px',
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
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999
    }),
    menuList: (base: any) => ({
      ...base,
      borderRadius: '8px',
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
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: formData.firstName || "",
    middleName: formData.middleName || "",
    lastName: formData.lastName || "",
    homeAddress: formData.homeAddress || "",
    city: formData.city || "",
    state: formData.state || "",
    zip: formData.zip || "",
    dob: formData.dob || "",
    phone: formData.phone || "",
    email: formData.email || "",
    password: formData.password || "",
    confirmPassword: formData.confirmPassword || ""
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    reasonForVisit: formData.reasonForVisit || "",
    absenceSince: formData.absenceSince || "",
    returnOn: formData.returnOn || "",
    pharmacyDetail: formData.pharmacyDetail || "",
    describeDetails: formData.describeDetails || "",
    knownAllergies: formData.knownAllergies || "",
    isPregnant: formData.isPregnant || "not-applicable",
    needExcuseLetter: formData.needExcuseLetter || false
  });

  const handleChange = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleAdditionalInfoChange = (field: string, value: string | boolean) => {
    setAdditionalInfo({ ...additionalInfo, [field]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setDateOfBirth(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setPersonalInfo({ ...personalInfo, dob: formattedDate });
    }
  };

  const handleAbsenceDateSelect = (date: Date | undefined) => {
    setAbsenceDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setAdditionalInfo({ ...additionalInfo, absenceSince: formattedDate });
    }
  };

  const handleReturnDateSelect = (date: Date | undefined) => {
    setReturnDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setAdditionalInfo({ ...additionalInfo, returnOn: formattedDate });
    }
  };

  const handleSendOTP = () => {
    if (personalInfo.phone && personalInfo.email) {
      setShowOTPPopup(true);
      setOtpCode(["", "", "", "", "", ""]);
      setOtpError(false);
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otpCode.join('');
    if (otpString === "000000") {
      setIsVerified(true);
      setShowOTPPopup(false);
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const inputs = document.querySelectorAll('input[maxlength="1"]');
      const nextInput = inputs[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const inputs = document.querySelectorAll('input[maxlength="1"]');
      const prevInput = inputs[index - 1] as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (isPersonalInfoValid()) {
      handleSendOTP();
    }
  };

  const handleNext = () => {
    const update = { ...personalInfo, ...additionalInfo };
    updateFormData(update);
    onNext(update);
  };

  const isPersonalInfoValid = () => {
    return (
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.homeAddress &&
      personalInfo.city &&
      personalInfo.state &&
      personalInfo.zip &&
      personalInfo.dob &&
      personalInfo.phone &&
      personalInfo.email &&
      personalInfo.password &&
      personalInfo.confirmPassword &&
      personalInfo.password === personalInfo.confirmPassword
    );
  };

  const isAdditionalInfoValid = () => {
    return (
      additionalInfo.reasonForVisit &&
      additionalInfo.describeDetails
    );
  };

  const isFormValid = () => {
    if (!isVerified) {
      return false;
    }
    return isAdditionalInfoValid();
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
            Let's get to know you
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

            {/* Step 2 - Active */}
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
                2
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
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
              backgroundColor: '#ffffffff',
              marginTop: '27px'
            }}></div>

            {/* Step 3 - Pending */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#ffffffff',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '18px',
                marginBottom: '12px'
              }}>
                3
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
            <div className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>First Name *</label>
                  <Input
                    value={personalInfo.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First Name"
                    className="h-12"
                    disabled={isVerified}
                    style={{borderRadius:'6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Middle Name</label>
                  <Input
                    value={personalInfo.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                    placeholder="Middle Name"
                    className="h-12"
                    disabled={isVerified}
                    style={{borderRadius:'6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Last Name *</label>
                  <Input
                    value={personalInfo.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="h-12"
                    disabled={isVerified}
                    style={{borderRadius: '6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
              </div>

              {/* Home Address */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Home Address *</label>
                <Input
                  value={personalInfo.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  placeholder="Home Address"
                  className="h-12"
                  disabled={isVerified}
                  style={{borderRadius: '6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                />
              </div>

              {/* City, State, Zip Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>City *</label>
                  <Input
                    value={personalInfo.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="h-12"
                    disabled={isVerified}
                    style={{borderRadius: '6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>State *</label>
                  <Input
                    value={personalInfo.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="State"
                    className="h-12"
                    disabled={isVerified}
                    style={{borderRadius: '6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Zip *</label>
                  <Input
                    value={personalInfo.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    placeholder="Zip"
                    className="h-12"
                    maxLength={5}
                    disabled={isVerified}
                    style={{borderRadius: '6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
              </div>

              {/* DOB and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Date of Birth *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        disabled={isVerified}
                        style={{
                          width: '100%',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '14px',
                          color: dateOfBirth ? '#1f2937' : '#9ca3af',
                          cursor: isVerified ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isVerified) {
                            e.currentTarget.style.borderColor = '#2B4C9A';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                      >
                        {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date of birth"}
                        <CalendarIcon size={20} style={{ color: '#9ca3af' }} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0" 
                      align="start"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        zIndex: 9999
                      }}
                    >
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={handleDateSelect}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                    Phone Number * {isVerified && <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', marginLeft: '8px' }}>✓ Verified</span>}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#6b7280',
                      pointerEvents: 'none',
                      zIndex: 10,
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '14px'
                    }}>
                      <span style={{ fontSize: '18px' }}>🇺🇸</span>
                      <span>+1</span>
                    </div>
                    <Input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Phone Number"
                      className="h-12"
                      style={{ paddingLeft: '64px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                      maxLength={10}
                      disabled={isVerified}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                  Email Address * {isVerified && <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', marginLeft: '8px' }}>✓ Verified</span>}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                  <Input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email Address"
                    className="h-12 pl-12"
                    disabled={isVerified}
                    style={{ borderRadius: '6px' ,backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Password *</label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={personalInfo.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Password"
                      className="h-12"
                      style={{ paddingRight: '40px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                      disabled={isVerified}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isVerified}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: isVerified ? 'not-allowed' : 'pointer',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => {
                        if (!isVerified) e.currentTarget.style.color = '#4b5563';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Confirm Password *</label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={personalInfo.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      placeholder="Confirm Password"
                      className="h-12"
                      style={{ paddingRight: '40px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                      disabled={isVerified}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isVerified}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: isVerified ? 'not-allowed' : 'pointer',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => {
                        if (!isVerified) e.currentTarget.style.color = '#4b5563';
                      }}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button - Show only if not verified */}
              {!isVerified && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!isPersonalInfoValid()}
                    style={{
                      backgroundColor: isPersonalInfoValid() ? '#2B4C9A' : '#9ca3af',
                      color: '#ffffff',
                      padding: '12px 48px',
                      fontSize: '18px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans, sans-serif',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: isPersonalInfoValid() ? 'pointer' : 'not-allowed',
                      opacity: isPersonalInfoValid() ? 1 : 0.5,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (isPersonalInfoValid()) {
                        e.currentTarget.style.backgroundColor = '#1c3a7a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isPersonalInfoValid()) {
                        e.currentTarget.style.backgroundColor = '#2B4C9A';
                      }
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information Section - Show only after verification */}
          {isVerified && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
              <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>
                Additional Information
              </h2>

              <div className="space-y-6">
                {/* Reason For Visit, Pregnancy Status, Additional Services Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Reason For Visit *</label>
                    <Input
                      value={additionalInfo.reasonForVisit}
                      onChange={(e) => handleAdditionalInfoChange("reasonForVisit", e.target.value)}
                      placeholder="Weight Loss"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Are you currently pregnant? *</label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '48px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="pregnancy"
                          value="no"
                          checked={additionalInfo.isPregnant === "no"}
                          onChange={(e) => handleAdditionalInfoChange("isPregnant", e.target.value)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>No</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="pregnancy"
                          value="yes"
                          checked={additionalInfo.isPregnant === "yes"}
                          onChange={(e) => handleAdditionalInfoChange("isPregnant", e.target.value)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>Yes</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="pregnancy"
                          value="not-applicable"
                          checked={additionalInfo.isPregnant === "not-applicable"}
                          onChange={(e) => handleAdditionalInfoChange("isPregnant", e.target.value)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>Not Applicable</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Additional Services</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '48px' }}>
                      <input
                        type="checkbox"
                        checked={additionalInfo.needExcuseLetter}
                        onChange={(e) => handleAdditionalInfoChange("needExcuseLetter", e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>I need an excuse letter</span>
                    </label>
                  </div>
                </div>

                {/* Absence Since and Return On Row - Only show when excuse letter is needed */}
                {additionalInfo.needExcuseLetter && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Absence Since</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          style={{
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 12px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '14px',
                            color: absenceDate ? '#1f2937' : '#9ca3af',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#2B4C9A';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db';
                          }}
                        >
                          {absenceDate ? format(absenceDate, "PPP") : "Select date"}
                          <CalendarIcon size={20} style={{ color: '#9ca3af' }} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-auto p-0" 
                        align="start"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          zIndex: 9999
                        }}
                      >
                        <Calendar
                          mode="single"
                          selected={absenceDate}
                          onSelect={handleAbsenceDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Return On</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          style={{
                            width: '100%',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 12px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '14px',
                            color: returnDate ? '#1f2937' : '#9ca3af',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#2B4C9A';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#d1d5db';
                          }}
                        >
                          {returnDate ? format(returnDate, "PPP") : "Select date"}
                          <CalendarIcon size={20} style={{ color: '#9ca3af' }} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-auto p-0" 
                        align="start"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          zIndex: 9999
                        }}
                      >
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={handleReturnDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                )}

                {/* Pharmacy Detail Section */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Pharmacy Detail</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input
                      value={additionalInfo.pharmacyDetail}
                      onChange={(e) => handleAdditionalInfoChange("pharmacyDetail", e.target.value)}
                      placeholder=""
                      className="h-12"
                      readOnly
                      style={{ flex: 1, backgroundColor: '#ffffff', cursor: 'pointer',borderRadius:'6px' }}
                      onClick={() => setShowPharmacyModal(true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPharmacyModal(true)}
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        padding: '0 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1d4ed8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                      }}
                    >
                      Select Pharmacy
                    </button>
                  </div>
                </div>

                {/* Describe Details and Known Allergies Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Describe Details *</label>
                    <textarea
                      value={additionalInfo.describeDetails}
                      onChange={(e) => handleAdditionalInfoChange("describeDetails", e.target.value)}
                      placeholder="000"
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        resize: 'vertical',
                        outline: 'none',
                        color: '#1f2937'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#2B4C9A';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>Known Allergies</label>
                    <textarea
                      value={additionalInfo.knownAllergies}
                      onChange={(e) => handleAdditionalInfoChange("knownAllergies", e.target.value)}
                      placeholder=""
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        resize: 'vertical',
                        outline: 'none',
                        color: '#1f2937'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#2B4C9A';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTP Verification Popup */}
          {showOTPPopup && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(4px)',
              margin: '0'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '40px',
                maxWidth: '550px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                margin: '0'
              }}>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowOTPPopup(false);
                    setOtpError(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1f2937';
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <h3 style={{ 
                  fontFamily: 'Open Sans, sans-serif', 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  textAlign: 'center',
                  marginBottom: '8px',
                  marginTop: '0'
                }}>
                  OTP Verification
                </h3>
                
                <p style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '14px',
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  A code has been sent; please enter the code
                </p>

                {/* Checkboxes for Email and Mobile */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '2px solid #2B4C9A',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#2B4C9A',
                      flexShrink: 0
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>Email Address</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '2px solid #2B4C9A',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#2B4C9A',
                      flexShrink: 0
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>Mobile Number</span>
                  </div>
                </div>

                {/* Confirm Code Label */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontFamily: 'Open Sans, sans-serif', 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#1f2937',
                    display: 'block'
                  }}>
                    Confirm Code
                  </label>
                </div>

                {/* OTP Input Boxes */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={otpCode[index]}
                      onChange={(e) => {
                        handleOTPChange(index, e.target.value);
                        setOtpError(false);
                      }}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      style={{
                        width: '56px',
                        height: '64px',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: '700',
                        fontFamily: 'Open Sans, sans-serif',
                        border: `2px solid ${otpError ? '#ef4444' : (otpCode[index] ? '#2B4C9A' : '#d1d5db')}`,
                        borderRadius: '12px',
                        outline: 'none',
                        backgroundColor: otpError ? '#fef2f2' : '#ffffff',
                        color: '#1f2937',
                        transition: 'all 0.2s',
                        boxShadow: otpCode[index] ? '0 2px 8px rgba(43, 76, 154, 0.15)' : 'none'
                      }}
                      onFocus={(e) => {
                        if (!otpError) {
                          e.currentTarget.style.borderColor = '#2B4C9A';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(43, 76, 154, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!otpError) {
                          e.currentTarget.style.borderColor = otpCode[index] ? '#2B4C9A' : '#d1d5db';
                          e.currentTarget.style.boxShadow = otpCode[index] ? '0 2px 8px rgba(43, 76, 154, 0.15)' : 'none';
                        }
                      }}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {otpError && (
                  <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '8px',
                    border: '1px solid #fecaca'
                  }}>
                    <p style={{ 
                      fontFamily: 'Open Sans, sans-serif', 
                      fontSize: '14px', 
                      color: '#dc2626', 
                      fontWeight: '500',
                      margin: 0
                    }}>
                      ❌ The code you entered does not match. Please enter "000000"
                    </p>
                  </div>
                )}

                {/* Expiry Time */}
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '24px',
                  padding: '10px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <p style={{ 
                    fontFamily: 'Open Sans, sans-serif', 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    ⏱️ This code expires in <span style={{ color: '#ef4444', fontWeight: '600' }}>08:38</span>
                  </p>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
                  <button
                    onClick={() => {
                      setShowOTPPopup(false);
                      setOtpError(false);
                    }}
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#1f2937',
                      padding: '12px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans, sans-serif',
                      borderRadius: '10px',
                      border: '2px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyOTP}
                    style={{
                      backgroundColor: '#2B4C9A',
                      color: '#ffffff',
                      padding: '12px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans, sans-serif',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 6px rgba(43, 76, 154, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1c3a7a';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(43, 76, 154, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2B4C9A';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(43, 76, 154, 0.3)';
                    }}
                  >
                    Verify
                  </button>
                </div>

                {/* Resend Link */}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ 
                    fontFamily: 'Open Sans, sans-serif', 
                    fontSize: '14px', 
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Didn't receive a code?{' '}
                    <button 
                      onClick={handleSendOTP} 
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563eb',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1d4ed8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2563eb';
                      }}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pharmacy Selection Modal */}
          {showPharmacyModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              backdropFilter: 'blur(4px)',
              margin: '0',
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '32px',
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                margin: '0'
              }}>
                {/* Close Button */}
                <button
                  onClick={() => setShowPharmacyModal(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1f2937';
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <h3 style={{ 
                  fontFamily: 'Open Sans, sans-serif', 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  marginBottom: '24px',
                  marginTop: '0',
                  flexShrink: 0
                }}>
                  Select Pharmacy
                </h3>

                {/* Search Filters */}
                <div style={{ marginBottom: '20px', flexShrink: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '12px' }}>
                    <Input
                      placeholder="Phone"
                      className="h-12"
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <Input
                      placeholder="Address"
                      className="h-12"
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <Input
                      placeholder="Name"
                      className="h-12"
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <Input
                      placeholder="City"
                      className="h-12"
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px' }}>
                    <Select
                      options={stateOptions}
                      value={selectedState}
                      onChange={setSelectedState}
                      placeholder="Select a state"
                      styles={customSelectStyles}
                      isSearchable={true}
                    />
                    <Input
                      placeholder="Zipcode"
                      className="h-12"
                      style={{ 
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <Select
                      options={specialtyOptions}
                      value={selectedSpecialty}
                      onChange={setSelectedSpecialty}
                      placeholder="Select A Specialty"
                      styles={customSelectStyles}
                      isSearchable={true}
                    />
                    <button
                      type="button"
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        padding: '0 32px',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: 'Open Sans, sans-serif',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        height: '48px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1d4ed8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Pharmacy List */}
                <div style={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0
                }}>
                  <div style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '100%'
                  }}>
                    {[
                      { name: 'McConaghy Drug Store Inc.', phone: '2516752070', address: '5565 Hwy 43, Satsuma, AL 36572-0488' },
                      { name: 'LIMESTONE DRUG', phone: '2562323811', address: '200 W MARKET ST, ATHENS, AL 35611' },
                      { name: 'Propst Discount Drugs', phone: '2565397443', address: '717 Pratt Ave NE, Huntsville, AL 35801-3645' },
                      { name: 'Boaz Discount Pharmacy', phone: '2565936546', address: '10460 AL Highway 168 Ste 1, Boaz, AL 35957' },
                      { name: 'Jones Discount Pharmacy', phone: '2565863179', address: '1036 N Brindlee Mountain Pkwy, Arab, AL 35016' },
                      { name: 'Durham Pharmacy', phone: '2056959611', address: '44984 Hwy 17, Vernon, AL 35592' },
                      { name: 'Adams Drugs (Downtown)', phone: '3342643496', address: '934 Adams Ave, Montgomery, AL 36104-4422' }
                    ].map((pharmacy, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '16px 20px',
                          borderBottom: index < 6 ? '1px solid #e5e7eb' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }}
                      >
                        <div>
                          <div style={{ marginBottom: '4px' }}>
                            <span style={{
                              fontFamily: 'Open Sans, sans-serif',
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#f97316',
                              marginRight: '8px'
                            }}>
                              {pharmacy.name}
                            </span>
                            <span style={{
                              fontFamily: 'Open Sans, sans-serif',
                              fontSize: '14px',
                              color: '#6b7280'
                            }}>
                              | ☎ {pharmacy.phone}
                            </span>
                          </div>
                          <p style={{
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            {pharmacy.address}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleAdditionalInfoChange("pharmacyDetail", `${pharmacy.name} - ${pharmacy.address}`);
                            setShowPharmacyModal(false);
                          }}
                          style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            padding: '8px 24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Open Sans, sans-serif',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1d4ed8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                          }}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: isVerified ? 'space-between' : 'flex-start',
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

            {/* Next Button - Only show when verified */}
            {isVerified && (
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
                NEXT
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
