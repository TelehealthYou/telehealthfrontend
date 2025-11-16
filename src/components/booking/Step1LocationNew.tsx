import { Calendar } from "../ui/calendar";
import { useState, useEffect } from "react";
import heroBackground from "../../assets/founders-bg.jpg";
import doctor1 from "../../assets/Doctor_Images/1.png";
import doctor2 from "../../assets/Doctor_Images/2.png";
import doctor3 from "../../assets/Doctor_Images/3.png";
import doctor4 from "../../assets/Doctor_Images/4.png";
import doctor5 from "../../assets/Doctor_Images/5.png";
import doctor6 from "../../assets/Doctor_Images/6.png";
import {
  ChevronsUpDown,
  Stethoscope,
  Scale,
  UserCircle,
  Sparkles,
  Brain,
  Pill,
  Heart,
  Moon,
  Users,
  FileText,
  Activity
} from "lucide-react";

interface Step1LocationProps {
  onNext: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

// Blue Verified Badge Component
function VerifiedBadge({ className = "", style = {}, fillColor = "#2b4c9a" }: { className?: string; style?: React.CSSProperties; fillColor?: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill={fillColor} />
    </svg>
  );
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const TIME_SLOTS = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care Physician",
    bio: "15+ years experience in family medicine",
    photo: doctor1,
    availableTimes: ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    bio: "Board-certified with expertise in chronic care",
    photo: doctor2,
    availableTimes: ["8:30 AM", "11:00 AM", "1:30 PM", "3:30 PM"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Family Medicine",
    bio: "Compassionate care for all ages",
    photo: doctor3,
    availableTimes: ["10:00 AM", "12:00 PM", "2:30 PM", "5:00 PM"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "General Practice",
    bio: "Holistic approach to patient care",
    photo: doctor4,
    availableTimes: ["9:30 AM", "11:30 AM", "3:00 PM", "6:00 PM"]
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Family Medicine",
    bio: "Caring for families with expertise",
    photo: doctor5,
    availableTimes: ["8:00 AM", "10:00 AM", "1:00 PM", "4:30 PM"]
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Internal Medicine",
    bio: "Specialized in preventive care",
    photo: doctor6,
    availableTimes: ["9:00 AM", "12:30 PM", "2:00 PM", "5:30 PM"]
  }
];

const services = [
  {
    name: "Primary Care",
    icon: Stethoscope,
    description: "Comprehensive healthcare with board-certified physicians"
  },
  {
    name: "Weight Loss",
    icon: Scale,
    description: "FDA-approved medications & personalized plans"
  },
  {
    name: "Hair Loss",
    icon: UserCircle,
    description: "Evidence-based restoration treatments"
  },
  {
    name: "Mental Health",
    icon: Brain,
    description: "Compassionate therapy and psychiatric care"
  },
  {
    name: "Hormonal Treatment",
    icon: Pill,
    description: "Specialized hormone therapy"
  },
  {
    name: "Anxiety Treatment",
    icon: Heart,
    description: "CBT therapy and medication management"
  },
  {
    name: "Sleep Treatment",
    icon: Moon,
    description: "Comprehensive sleep therapy"
  },
  {
    name: "Anti-Aging",
    icon: Sparkles,
    description: "NAD+ therapy and peptide treatments"
  },
  {
    name: "Men's Health",
    icon: Users,
    description: "Testosterone & male vitality solutions"
  },
  {
    name: "Skin Care",
    icon: FileText,
    description: "Fast and convenient medication refills"
  },
  {
    name: "Women's Health",
    icon: Heart,
    description: "Complete women's wellness care"
  },
  {
    name: "Sexual Health",
    icon: Activity,
    description: "Confidential intimate wellness services"
  }
];

export function Step1LocationNew({ onNext, formData, updateFormData }: Step1LocationProps) {
  const [date, setDate] = useState<Date | undefined>(formData.date);
  const [location, setLocation] = useState(formData.location || "");
  const [selectedService, setSelectedService] = useState(formData.service || "");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(formData.timeSlot || "");
  const [selectedDoctor, setSelectedDoctor] = useState(formData.doctorId);

  // Auto-detect location using IP geolocation
  useEffect(() => {
    if (!location) {
      detectLocation();
    }
  }, []);

  const detectLocation = async () => {
    try {
      // Using ipapi.co for IP geolocation (free tier available)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.region) {
        // Match the region to our US_STATES list
        const matchedState = US_STATES.find(state =>
          state.toLowerCase() === data.region.toLowerCase()
        );
        if (matchedState) {
          setLocation(matchedState);
        } else {
          // Fallback to a default state
          setLocation("Florida");
        }
      } else {
        // Fallback to a default state
        setLocation("Florida");
      }
    } catch (error) {
      console.error("Error detecting location:", error);
      // Fallback to default
      setLocation("Florida");
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    // Reset subsequent selections when service changes
    setDate(undefined);
    setSelectedTimeSlot("");
    setSelectedDoctor(null);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    // Reset time and doctor when date changes
    setSelectedTimeSlot("");
    setSelectedDoctor(null);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    // Reset doctor when time changes
    setSelectedDoctor(null);
  };

  // Filter doctors based on selected time slot
  const availableDoctors = selectedTimeSlot
    ? doctors.filter(doctor => doctor.availableTimes.includes(selectedTimeSlot))
    : [];

  const handleNext = () => {
    if (date && location && selectedService && selectedTimeSlot && selectedDoctor) {
      updateFormData({
        date,
        location,
        service: selectedService,
        timeSlot: selectedTimeSlot,
        doctorId: selectedDoctor
      });
      onNext();
    }
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
          <h1 style={{ fontFamily: 'Lora, serif', color: '#28436F', fontSize: '42px', fontWeight: '600', textAlign: 'center', marginBottom: '1.5rem' }}>
            Let's get started
          </h1>

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
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
                1
              </div>
              <p style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#28436f',
                textAlign: 'center',
                fontFamily: 'Lora, serif',
                maxWidth: '300px',
                whiteSpace: 'nowrap'
              }}>
                Select Appointment & Doctor
              </p>
            </div>

            {/* Connector Line 1 */}
            <div style={{
              width: '256px',
              height: '2px',
              backgroundColor: '#ffffffff',
              marginTop: '27px'
            }}></div>

            {/* Step 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#ffffffff',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '18px',
                marginBottom: '12px'
              }}>
                2
              </div>
              <p style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#6b7280',
                textAlign: 'center',
                fontFamily: 'Lora, serif',
                maxWidth: '300px',
                whiteSpace: 'nowrap'
              }}>
                Add Additional Info
              </p>
            </div>

            {/* Connector Line 2 */}
            <div style={{
              width: '256px',
              height: '2px',
              backgroundColor: '#ffffffff',
              marginTop: '27px'
            }}></div>

            {/* Step 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
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
                fontSize: '16px',
                fontWeight: '700',
                color: '#6b7280',
                textAlign: 'center',
                fontFamily: 'Lora, serif',
                maxWidth: '300px',
                whiteSpace: 'nowrap'
              }}>
                Payment & Confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '32px',
        paddingBottom: '32px'
      }}>
        {/* State Selection */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <h3 style={{
            fontFamily: 'Lora, serif',
            fontSize: '22px',
            fontWeight: '600',
            color: '#28436f',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            Select Your State?
          </h3>
          <p style={{
            fontFamily: 'Lora, serif',
            fontSize: '15px',
            color: '#6b7280',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Let us match the best providers near you.
          </p>

          <div style={{ position: 'relative', width: '100%', maxWidth: '585px' }}>
            {/* Native Select Field */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 48px 8px 20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: location ? '#1f2937' : '#9ca3af',
                fontSize: '18px',
                fontWeight: '500',
                fontFamily: 'Lora, serif',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            >
              <option value="" disabled style={{ color: '#9ca3af' }}>
                Select a state
              </option>
              {US_STATES.map((state) => (
                <option key={state} value={state} style={{ color: '#1f2937' }}>
                  {state}
                </option>
              ))}
            </select>
            
            {/* Dropdown Icon */}
            <div style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center'
            }}>
              <ChevronsUpDown
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#9ca3af'
                }}
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {location && (
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: 'Lora, serif',
              fontSize: '22px',
              fontWeight: '600',
              color: '#28436f',
              marginBottom: '24px'
            }}>
              Select Your Service
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '40px'
            }}>
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    onClick={() => handleServiceSelect(service.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minHeight: '64px',
                      padding: '16px',
                      border: '2px solid #2b4c9a',
                      borderRadius: '8px',
                      backgroundColor: selectedService === service.name ? '#2B4C9A' : '#ffffffff',
                      boxShadow: selectedService === service.name
                        ? '0 4px 6px rgba(43, 76, 154, 0.3)'
                        : '0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedService !== service.name) {
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedService !== service.name) {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      }
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: selectedService === service.name ? '#ffffff' : '#EEF2FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent style={{
                        width: '20px',
                        height: '20px',
                        color: '#2B4C9A',
                        strokeWidth: 1.5
                      }} />
                    </div>
                    <p style={{
                      fontFamily: 'Lora, serif',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: selectedService === service.name ? '#ffffff' : '#1f2937',
                      margin: 0
                    }}>
                      {service.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Date and Time Selection */}
        {location && selectedService && (
          <div style={{ marginBottom: '96px' }}>
            <h3 style={{
              fontFamily: 'Lora, serif',
              fontSize: '22px',
              fontWeight: '600',
              color: '#28436f',
              marginBottom: '24px'
            }}>
              Select the Date and the Time <span style={{fontSize: '16px', fontFamily: 'Lora, serif'}}>(When would you like to Book an Appointment)</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '72px'
            }}>

              <div>
                <h3 style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '22px',
                  fontWeight: '500',
                  color: '#28436f',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  Select Appointment Date
                </h3>

                {/* Calendar */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>

                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center'
                  }}>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      style={{
                        borderRadius: '6px',
                        width: '100%'
                      }}
                      disabled={(date) => date < new Date()}
                      modifiers={{
                        selected: date ? [date] : []
                      }}
                      modifiersStyles={{
                        selected: {
                          backgroundColor: '#2B4C9A',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: '600'
                        }
                      }}
                      styles={{
                        months: { width: '100%', margin: 0 },
                        month: { width: '100%', margin: 0 },
                        table: { width: '100%', maxWidth: '100%', margin: 0 },
                        head_cell: {
                          width: '14.28%',
                          fontFamily: 'Lora, serif',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#6b7280',
                          padding: '8px 0'
                        },
                        cell: {
                          width: '14.28%',
                          height: '68px',
                          fontSize: '15px',
                          fontFamily: 'Lora, serif',
                          padding: '6px'
                        },
                        day: {
                          width: '100%',
                          height: '100%',
                          fontSize: '15px',
                          fontFamily: 'Lora, serif',
                          borderRadius: '8px',
                          margin: 0,
                          border: '2px solid #2b4c9a',
                          backgroundColor: '#ffffff'
                        },
                        caption: {
                          fontFamily: 'Lora, serif',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          paddingBottom: '8px'
                        },
                        head_row: {
                          marginBottom: '4px'
                        },
                        row: {
                          marginTop: 0,
                          marginBottom: 0
                        }
                      }}
                    />
                  </div>
                </div>
              </div>


              {/* Time Slots */}
              <div>
                <h3 style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '22px',
                  fontWeight: '500',
                  color: '#28436f',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  Select Your Time Slot
                </h3>

                {date ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    height: '100%'
                  }}>
                    {TIME_SLOTS.slice(0, 21).map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSlotSelect(time)}
                        style={{
                          padding: '14px 16px',
                          fontSize: '15px',
                          fontWeight: '500',
                          fontFamily: 'Lora, serif',
                          borderRadius: '8px',
                          border: '2px solid #2b4c9a',
                          backgroundColor: selectedTimeSlot === time ? '#2B4C9A' : '#ffffff',
                          color: selectedTimeSlot === time ? '#ffffff' : '#1f2937',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: selectedTimeSlot === time
                            ? '0 4px 6px rgba(43, 76, 154, 0.3)'
                            : '0 1px 3px rgba(0,0,0,0.1)',
                          transform: selectedTimeSlot === time ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedTimeSlot !== time) {
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedTimeSlot !== time) {
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    padding: '32px'
                  }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '16px' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="3" y1="10" x2="21" y2="10" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: '16px',
                      fontFamily: 'Lora, serif',
                      fontWeight: '500',
                      textAlign: 'center'
                    }}>
                      Please select a date first
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Doctor Selection */}
        {location && selectedService && date && selectedTimeSlot && (
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{
              fontFamily: 'Lora, serif',
              fontSize: '22px',
              fontWeight: '600',
              color: '#28436f',
              marginBottom: '24px'
            }}>
              Choose the Doctor From the List
            </h3>

            {availableDoctors.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(216px, 1fr))',
                gap: '40px'
              }}>
                {availableDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    style={{
                      position: 'relative',
                      backgroundColor: selectedDoctor === doctor.id ? '#2B4C9A' : '#dbf4ff',
                      border: '2px solid #2b4c9a',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      height: '184px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      textAlign: 'center',
                      boxShadow: selectedDoctor === doctor.id
                        ? '0 4px 6px rgba(43, 76, 154, 0.3)'
                        : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedDoctor !== doctor.id) {
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDoctor !== doctor.id) {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      }
                    }}
                  >
                    {/* Check icon for selected doctor */}
                    {selectedDoctor === doctor.id && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#2B4C9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        margin: '0 auto 12px',
                        border: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <h4 style={{
                        fontFamily: 'Lora, serif',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '4px',
                        color: selectedDoctor === doctor.id ? '#ffffff' : '#1f2937'
                      }}>
                        {doctor.name}
                      </h4>
                      <VerifiedBadge 
                        className="" 
                        style={{ width: '16px', height: '16px', flexShrink: 0 }} 
                        fillColor={selectedDoctor === doctor.id ? '#ffffff' : '#2b4c9a'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontFamily: 'Lora, serif'
                }}>
                  No doctors available for this time slot. Please select a different time.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: '48px',
          paddingTop: '28px'
        }}>
          <button
            onClick={handleNext}
            disabled={!date || !location || !selectedService || !selectedTimeSlot || !selectedDoctor}
            style={{
              backgroundColor: (!date || !location || !selectedService || !selectedTimeSlot || !selectedDoctor) ? '#9ca3af' : '#2B4C9A',
              color: '#ffffff',
              padding: '10px 30px',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Lora, serif',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: (!date || !location || !selectedService || !selectedTimeSlot || !selectedDoctor) ? 'not-allowed' : 'pointer',
              opacity: (!date || !location || !selectedService || !selectedTimeSlot || !selectedDoctor) ? 0.5 : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (date && location && selectedService && selectedTimeSlot && selectedDoctor) {
                e.currentTarget.style.backgroundColor = '#1c3a7a';
              }
            }}
            onMouseLeave={(e) => {
              if (date && location && selectedService && selectedTimeSlot && selectedDoctor) {
                e.currentTarget.style.backgroundColor = '#2B4C9A';
              }
            }}
          >
            NEXT
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
