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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    formData.dob ? new Date(formData.dob) : undefined
  );
  const [absenceDate, setAbsenceDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  // Control popover open states so we can close them programmatically
  const [dobPopoverOpen, setDobPopoverOpen] = useState(false);
  const [absencePopoverOpen, setAbsencePopoverOpen] = useState(false);
  const [returnPopoverOpen, setReturnPopoverOpen] = useState(false);
  
  // React Select options - All US States
  const stateOptions = [
    { value: 'Alabama', label: 'Alabama' },
    { value: 'Alaska', label: 'Alaska' },
    { value: 'Arizona', label: 'Arizona' },
    { value: 'Arkansas', label: 'Arkansas' },
    { value: 'California', label: 'California' },
    { value: 'Colorado', label: 'Colorado' },
    { value: 'Connecticut', label: 'Connecticut' },
    { value: 'Delaware', label: 'Delaware' },
    { value: 'Florida', label: 'Florida' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Hawaii', label: 'Hawaii' },
    { value: 'Idaho', label: 'Idaho' },
    { value: 'Illinois', label: 'Illinois' },
    { value: 'Indiana', label: 'Indiana' },
    { value: 'Iowa', label: 'Iowa' },
    { value: 'Kansas', label: 'Kansas' },
    { value: 'Kentucky', label: 'Kentucky' },
    { value: 'Louisiana', label: 'Louisiana' },
    { value: 'Maine', label: 'Maine' },
    { value: 'Maryland', label: 'Maryland' },
    { value: 'Massachusetts', label: 'Massachusetts' },
    { value: 'Michigan', label: 'Michigan' },
    { value: 'Minnesota', label: 'Minnesota' },
    { value: 'Mississippi', label: 'Mississippi' },
    { value: 'Missouri', label: 'Missouri' },
    { value: 'Montana', label: 'Montana' },
    { value: 'Nebraska', label: 'Nebraska' },
    { value: 'Nevada', label: 'Nevada' },
    { value: 'New Hampshire', label: 'New Hampshire' },
    { value: 'New Jersey', label: 'New Jersey' },
    { value: 'New Mexico', label: 'New Mexico' },
    { value: 'New York', label: 'New York' },
    { value: 'North Carolina', label: 'North Carolina' },
    { value: 'North Dakota', label: 'North Dakota' },
    { value: 'Ohio', label: 'Ohio' },
    { value: 'Oklahoma', label: 'Oklahoma' },
    { value: 'Oregon', label: 'Oregon' },
    { value: 'Pennsylvania', label: 'Pennsylvania' },
    { value: 'Rhode Island', label: 'Rhode Island' },
    { value: 'South Carolina', label: 'South Carolina' },
    { value: 'South Dakota', label: 'South Dakota' },
    { value: 'Tennessee', label: 'Tennessee' },
    { value: 'Texas', label: 'Texas' },
    { value: 'Utah', label: 'Utah' },
    { value: 'Vermont', label: 'Vermont' },
    { value: 'Virginia', label: 'Virginia' },
    { value: 'Washington', label: 'Washington' },
    { value: 'West Virginia', label: 'West Virginia' },
    { value: 'Wisconsin', label: 'Wisconsin' },
    { value: 'Wyoming', label: 'Wyoming' }
  ];

  const [selectedState, setSelectedState] = useState<any>(
    formData.state ? { value: formData.state, label: formData.state } : null
  );

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      height: '40px',
      minHeight: '40px',
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
    reasonForVisit: formData.reasonForVisit || formData.service || "",
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
      // close the DOB popover after a date is selected
      setDobPopoverOpen(false);
    }
  };

  const handleAbsenceDateSelect = (date: Date | undefined) => {
    setAbsenceDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setAdditionalInfo({ ...additionalInfo, absenceSince: formattedDate });
      // close the Absence Since popover after a date is selected
      setAbsencePopoverOpen(false);
    }
  };

  const handleReturnDateSelect = (date: Date | undefined) => {
    setReturnDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setAdditionalInfo({ ...additionalInfo, returnOn: formattedDate });
      // close the Return On popover after a date is selected
      setReturnPopoverOpen(false);
    }
  };

  const handleSendOTP = () => {
    if (personalInfo.phone && personalInfo.email) {
      setShowOTPPopup(true);
      setOtpCode(["", "", "", "", "", ""]);
      setOtpError(false);
    }
  };

  const validatePersonalInfoFields = () => {
    const errors: Record<string, string> = {};

    if (!personalInfo.firstName) errors.firstName = 'First name is required';
    if (!personalInfo.lastName) errors.lastName = 'Last name is required';
    if (!personalInfo.homeAddress) errors.homeAddress = 'Home address is required';
    if (!personalInfo.city) errors.city = 'City is required';
    if (!personalInfo.state) errors.state = 'State is required';
    if (!personalInfo.zip) errors.zip = 'Zip is required';
    if (personalInfo.zip && personalInfo.zip.length < 5) errors.zip = 'Zip must be 5 digits';
    if (!personalInfo.dob) errors.dob = 'Date of birth is required';
    if (!personalInfo.phone) errors.phone = 'Phone number is required';
    if (personalInfo.phone && !/^[0-9]{10}$/.test(personalInfo.phone)) errors.phone = 'Enter a valid 10-digit phone number';
    if (!personalInfo.email) errors.email = 'Email is required';
    if (personalInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) errors.email = 'Enter a valid email address';
    if (!personalInfo.password) errors.password = 'Password is required';
    if (!personalInfo.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (personalInfo.password && personalInfo.confirmPassword && personalInfo.password !== personalInfo.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    return errors;
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
    setSubmitAttempted(true);
    const errors = validatePersonalInfoFields();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleSendOTP();
    } else {
      // focus first invalid field
      const firstKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement | null;
      el?.focus();
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
            Let's get started
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
            <div className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>First Name <span style={{color:'#dc2626'}}>*</span></label>
                  <Input
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First Name"
                    className="h-10"
                    disabled={isVerified}
                    style={{
                      borderRadius:'6px',
                      backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                      cursor: isVerified ? 'not-allowed' : 'text',
                      border: `1px solid ${formErrors.firstName ? '#ef4444' : '#d1d5db'}`
                    }}
                  />
                  {submitAttempted && formErrors.firstName && (
                    <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Middle Name</label>
                  <Input
                    name="middleName"
                    value={personalInfo.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                    placeholder="Middle Name"
                    className="h-10"
                    disabled={isVerified}
                    style={{borderRadius:'6px' , backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Last Name <span style={{color:'#dc2626'}}>*</span></label>
                  <Input
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="h-10"
                    disabled={isVerified}
                    style={{
                      borderRadius: '6px',
                      backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                      cursor: isVerified ? 'not-allowed' : 'text',
                      border: `1px solid ${formErrors.lastName ? '#ef4444' : '#d1d5db'}`
                    }}
                  />
                  {submitAttempted && formErrors.lastName && (
                    <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Home Address */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Home Address <span style={{color:'#dc2626'}}>*</span></label>
                <Input
                  name="homeAddress"
                  value={personalInfo.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  placeholder="Home Address"
                  className="h-10"
                  disabled={isVerified}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                    cursor: isVerified ? 'not-allowed' : 'text',
                    border: `1px solid ${formErrors.homeAddress ? '#ef4444' : '#d1d5db'}`
                  }}
                />
                {submitAttempted && formErrors.homeAddress && (
                  <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.homeAddress}</p>
                )}
              </div>

              {/* City, State, Zip Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>City <span style={{color:'#dc2626'}}>*</span></label>
                  <Input
                    name="city"
                    value={personalInfo.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="h-10"
                    disabled={isVerified}
                    style={{
                      borderRadius: '6px',
                      backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                      cursor: isVerified ? 'not-allowed' : 'text',
                      border: `1px solid ${formErrors.city ? '#ef4444' : '#d1d5db'}`
                    }}
                  />
                  {submitAttempted && formErrors.city && (
                    <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.city}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>State <span style={{color:'#dc2626'}}>*</span></label>
                  <Select
                    options={stateOptions}
                    value={selectedState}
                    onChange={(option: any) => {
                      setSelectedState(option);
                      handleChange("state", option?.value || "");
                    }}
                    placeholder="Select a state"
                    styles={customSelectStyles}
                    isSearchable={true}
                    isDisabled={isVerified}
                  />
                  {submitAttempted && formErrors.state && (
                    <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.state}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Zip <span style={{color:'#dc2626'}}>*</span></label>
                  <Input
                    name="zip"
                    value={personalInfo.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                    placeholder="Zip"
                    className="h-10"
                    maxLength={5}
                    disabled={isVerified}
                    style={{
                      borderRadius: '6px',
                      backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                      cursor: isVerified ? 'not-allowed' : 'text',
                      border: `1px solid ${formErrors.zip ? '#ef4444' : '#d1d5db'}`
                    }}
                  />
                  {submitAttempted && formErrors.zip && (
                    <p style={{ color: '#dc2626', marginTop: '2px', fontSize: '12px' }}>{formErrors.zip}</p>
                  )}
                </div>
              </div>

              {/* DOB and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Date of Birth <span style={{color:'#dc2626'}}>*</span></label>
                  <Popover open={dobPopoverOpen} onOpenChange={setDobPopoverOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        disabled={isVerified}
                        name="dob"
                        style={{
                          width: '100%',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          backgroundColor: isVerified ? '#f3f4f6' : '#ffffff',
                          border: `1px solid ${formErrors.dob ? '#ef4444' : '#d1d5db'}`,
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
                    {submitAttempted && formErrors.dob && (
                      <p style={{ color: '#dc2626', marginTop: '6px', fontSize: '13px' }}>{formErrors.dob}</p>
                    )}
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
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>
                    Phone Number <span style={{color:'#dc2626'}}>*</span> {isVerified && <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600', marginLeft: '8px' }}>✓ Verified</span>}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#6b7280',
                      pointerEvents: 'none',
                      zIndex: 10,
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '14px'
                    }}>
                      <span style={{ fontSize: '16px', lineHeight: '16px' }}>🇺🇸</span>
                      <span style={{ fontSize: '13px' }}>+1</span>
                    </div>
                    <Input
                      name="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="Phone Number"
                      className="h-10"
                      style={{ paddingLeft: '56px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text', border: `1px solid ${formErrors.phone ? '#ef4444' : '#d1d5db'}` }}
                      maxLength={10}
                      disabled={isVerified}
                    />
                    {submitAttempted && formErrors.phone && (
                      <span style={{ position: 'absolute', left: 0, top: '100%', color: '#dc2626', fontSize: '12px', marginTop: '2px', fontFamily: 'Open Sans, sans-serif', zIndex: 20 }}>{formErrors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>
                  Email Address <span style={{color:'#dc2626'}}>*</span> {isVerified && <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '600', marginLeft: '8px' }}>✓ Verified</span>}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                  <div style={{ position: 'relative' }}>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <Input
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Email Address"
                      className="h-10 pl-10"
                      disabled={isVerified}
                      style={{ borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text', border: `1px solid ${formErrors.email ? '#ef4444' : '#d1d5db'}` }}
                    />
                    {submitAttempted && formErrors.email && (
                      <span style={{ position: 'absolute', left: 0, top: '100%', color: '#dc2626', fontSize: '13px', marginTop: '2px', fontFamily: 'Open Sans, sans-serif', zIndex: 20 }}>{formErrors.email}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Password <span style={{color:'#dc2626'}}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={personalInfo.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Password"
                        className="h-10"
                        style={{ paddingRight: '40px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text', border: `1px solid ${formErrors.password ? '#ef4444' : '#d1d5db'}` }}
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
                      {submitAttempted && formErrors.password && (
                        <span style={{ position: 'absolute', left: 0, top: '100%', color: '#dc2626', fontSize: '13px', marginTop: '2px', fontFamily: 'Open Sans, sans-serif', zIndex: 20 }}>{formErrors.password}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Confirm Password <span style={{color:'#dc2626'}}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={personalInfo.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        placeholder="Confirm Password"
                        className="h-10"
                        style={{ paddingRight: '40px', borderRadius: '6px', backgroundColor: isVerified ? '#f3f4f6' : '#ffffff', cursor: isVerified ? 'not-allowed' : 'text', border: `1px solid ${formErrors.confirmPassword ? '#ef4444' : '#d1d5db'}` }}
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
                      {submitAttempted && formErrors.confirmPassword && (
                        <span style={{ position: 'absolute', left: 0, top: '100%', color: '#dc2626', fontSize: '13px', marginTop: '2px', fontFamily: 'Open Sans, sans-serif', zIndex: 20 }}>{formErrors.confirmPassword}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Show only if not verified */}
              {!isVerified && (
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    tabIndex={0}
                    aria-disabled={false}
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: '#2B4C9A',
                      color: '#ffffff',
                      padding: '10px 40px',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Open Sans, sans-serif',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      opacity: 1,
                      transition: 'all 0.2s'
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

              <div className="space-y-4">
                {/* Reason For Visit, Pregnancy Status, Additional Services Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Reason For Visit <span style={{color:'#dc2626'}}>*</span></label>
                    <Input
                      value={additionalInfo.reasonForVisit}
                      onChange={(e) => handleAdditionalInfoChange("reasonForVisit", e.target.value)}
                      placeholder="Weight Loss"
                      className="h-10"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Are you currently pregnant? <span style={{color:'#dc2626'}}>*</span></label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '40px' }}>
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
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Additional Services</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '40px' }}>
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
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Absence Since</label>
                      <Popover open={absencePopoverOpen} onOpenChange={setAbsencePopoverOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          style={{
                            width: '100%',
                            height: '40px',
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
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Return On</label>
                    <Popover open={returnPopoverOpen} onOpenChange={setReturnPopoverOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          style={{
                            width: '100%',
                            height: '40px',
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
                  <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Pharmacy Detail</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Input
                      value={additionalInfo.pharmacyDetail}
                      onChange={(e) => handleAdditionalInfoChange("pharmacyDetail", e.target.value)}
                      placeholder=""
                      className="h-10"
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
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Describe Details <span style={{color:'#dc2626'}}>*</span></label>
                    <textarea
                      value={additionalInfo.describeDetails}
                      onChange={(e) => handleAdditionalInfoChange("describeDetails", e.target.value)}
                      placeholder="Enter the Details in brief..."
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
                    <label style={{ display: 'block', fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>Known Allergies</label>
                    <textarea
                      value={additionalInfo.knownAllergies}
                      onChange={(e) => handleAdditionalInfoChange("knownAllergies", e.target.value)}
                      placeholder=""
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '8px',
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

          {/* Pharmacy Selection Modal - Compact & Elegant */}
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
                borderRadius: '16px',
                padding: '24px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(43, 76, 154, 0.25)',
                position: 'relative',
                margin: '0',
                border: '2px solid #2B4C9A'
              }}>
                {/* Close Button */}
                <button
                  onClick={() => setShowPharmacyModal(false)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Header */}
                <div style={{ marginBottom: '20px', flexShrink: 0 }}>
                  <h3 style={{ 
                    fontFamily: 'Open Sans, sans-serif', 
                    fontSize: '22px', 
                    fontWeight: '700', 
                    color: '#2B4C9A',
                    marginTop: '0',
                    marginBottom: '4px'
                  }}>
                    🏥 Select Your Pharmacy
                  </h3>
                  <p style={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '13px',
                    color: '#6b7280',
                    margin: '0'
                  }}>
                    Choose a pharmacy from the list below for prescription delivery
                  </p>
                </div>

                {/* Search Bar */}
                <div style={{ marginBottom: '16px', flexShrink: 0 }}>
                  <Input
                    placeholder="Search by name, city, or zip code..."
                    className="h-10"
                    style={{ 
                      fontFamily: 'Open Sans, sans-serif',
                      borderRadius: '8px',
                      border: '1px solid #2B4C9A',
                      fontSize: '14px',
                      width: '100%'
                    }}
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      const pharmacies = document.querySelectorAll('[data-pharmacy-item]');
                      pharmacies.forEach((item: any) => {
                        const text = item.textContent.toLowerCase();
                        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
                      });
                    }}
                  />
                </div>

                {/* Pharmacy List */}
                <div style={{ 
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  backgroundColor: 'rgba(249, 250, 251, 0.5)'
                }}>
                  <div style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '100%'
                  }}>
                    {[
                      { name: 'HealthPlus Pharmacy', phone: '(212) 555-0123', address: '455 Madison Ave, New York, NY 10022' },
                      { name: 'CareRx Drugstore', phone: '(310) 555-0198', address: '8920 Wilshire Blvd, Los Angeles, CA 90211' },
                      { name: 'MediCare Express', phone: '(415) 555-0167', address: '1450 Market St, San Francisco, CA 94102' },
                      { name: 'WellScript Pharmacy', phone: '(305) 555-0145', address: '2301 Collins Ave, Miami Beach, FL 33139' },
                      { name: 'RxCare Center', phone: '(312) 555-0189', address: '875 N Michigan Ave, Chicago, IL 60611' },
                      { name: 'Prime Health Pharmacy', phone: '(617) 555-0134', address: '330 Brookline Ave, Boston, MA 02215' },
                      { name: 'Vital Care Drugs', phone: '(713) 555-0178', address: '6565 Fannin St, Houston, TX 77030' },
                      { name: 'Community Health Rx', phone: '(206) 555-0156', address: '1201 3rd Ave, Seattle, WA 98101' },
                      { name: 'TrueCare Pharmacy', phone: '(404) 555-0192', address: '2401 Peachtree Rd NE, Atlanta, GA 30305' },
                      { name: 'LifeMed Pharmacy', phone: '(602) 555-0143', address: '755 E McDowell Rd, Phoenix, AZ 85006' }
                    ].map((pharmacy, index) => (
                      <div
                        key={index}
                        data-pharmacy-item
                        style={{
                          padding: '12px 16px',
                          borderBottom: index < 9 ? '1px solid #e5e7eb' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{
                              fontFamily: 'Open Sans, sans-serif',
                              fontSize: '15px',
                              fontWeight: '600',
                              color: '#2B4C9A'
                            }}>
                              {pharmacy.name}
                            </span>
                            <span style={{
                              fontFamily: 'Open Sans, sans-serif',
                              fontSize: '12px',
                              color: '#6b7280',
                              padding: '2px 6px',
                              backgroundColor: '#e5e7eb',
                              borderRadius: '4px'
                            }}>
                              ☎ {pharmacy.phone}
                            </span>
                          </div>
                          <p style={{
                            fontFamily: 'Open Sans, sans-serif',
                            fontSize: '13px',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            📍 {pharmacy.address}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleAdditionalInfoChange("pharmacyDetail", `${pharmacy.name} - ${pharmacy.address}`);
                            setShowPharmacyModal(false);
                          }}
                          style={{
                            backgroundColor: '#2B4C9A',
                            color: '#ffffff',
                            padding: '8px 18px',
                            fontSize: '13px',
                            fontWeight: '600',
                            fontFamily: 'Open Sans, sans-serif',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            marginLeft: '12px'
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
