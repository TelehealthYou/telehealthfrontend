import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  X, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  Video, 
  FileText, 
  MessageCircle,
  Phone
} from "lucide-react";
import React from "react";
import doctor1 from "../../assets/Doctor_Images/1.png";
import doctor2 from "../../assets/Doctor_Images/2.png";
import doctor3 from "../../assets/Doctor_Images/3.png";
import doctor4 from "../../assets/Doctor_Images/4.png";
import doctor5 from "../../assets/Doctor_Images/5.png";
import doctor6 from "../../assets/Doctor_Images/6.png";

interface AppointmentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
  formData: any;
}

// Doctor data (matching Step1)
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care Physician",
    photo: doctor1
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    photo: doctor2
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Family Medicine",
    photo: doctor3
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "General Practice",
    photo: doctor4
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Family Medicine",
    photo: doctor5
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Internal Medicine",
    photo: doctor6
  }
];

export function AppointmentConfirmationModal({ 
  isOpen, 
  onClose, 
  onDone, 
  formData 
}: AppointmentConfirmationModalProps) {

  // Helper to format date or use default
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get selected doctor info
  const selectedDoctor = doctors.find(doc => doc.id === formData?.doctorId) || doctors[0];

  // Display values from formData
  const displayDate = formData?.date ? formatDate(formData.date) : 'Thursday, Nov 13, 2025';
  const displayTime = formData?.timeSlot || '12:00 PM';
  const displayService = formData?.service || 'Primary Care';
  const displayState = formData?.state || 'Florida';
  const displayLocation = formData?.location || 'Florida';
  
  // Hardcoded strings
  const commService = "Synchronous Audio/Video Call";
  const prescriptionType = "Synchronous Audio/Video Call"; 

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="[&>button]:hidden"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: '90%',
          maxWidth: '700px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '32px 24px 24px 24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          outline: 'none'
        }}
      >
        
        {/* Close Button (Top Right) - Only One */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#9ca3af',
            fontSize: '24px',
            fontWeight: '700',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
            lineHeight: 1,
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
        >
          X
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* 1. Header Section - Centered */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingTop: '4px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: 0,
              fontFamily: 'sans-serif',
              textAlign: 'center'
            }}>
              Your Appointment has been confirmed
            </h2>
          </div>

          {/* 2. Main Content Area (Split Layout) */}
          <div style={{ display: 'flex', flexDirection:'column', gap: '20px', marginTop: '4px' }}>
            
            {/* LEFT COLUMN: Doctor Card */}
            <div style={{ width: '200px', flexShrink: 0 }}>
               <div style={{
                  position: 'relative',
                  backgroundColor: '#f0f7ff',
                  border: '2px solid #3b82f6',
                  borderRadius: '12px',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  overflow: 'hidden'
               }}>
                  
                  {/* Top Right Checkmark */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>

                  {/* Image and Price with background */}
                  <div style={{
                    backgroundColor: '#f1f1f1',
                    width: '100%',
                    padding: '12px',
                    marginBottom: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    {/* Doctor Image */}
                    <img
                      src={selectedDoctor.photo} 
                      alt={selectedDoctor.name}
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        marginBottom: '6px'
                      }}
                    />

                    {/* Price */}
                    <div style={{
                      color: '#1e40af',
                      fontSize: '12px',
                      fontWeight: '700',
                      fontFamily: 'sans-serif'
                    }}>
                      $ 50.00
                    </div>
                  </div>

                  {/* Doctor Name with verified badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    marginBottom: '2px'
                  }}>
                    <h4 style={{
                      fontFamily: 'sans-serif',
                      fontWeight: '600',
                      fontSize: '13px',
                      color: '#111827',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {selectedDoctor.name}
                    </h4>
                    <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#3b82f6" />
                    </svg>
                  </div>

                  {/* Service with verified badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '8px',
                    paddingLeft: '12px',
                    paddingRight: '12px'
                  }}>
                    <p style={{
                      fontSize: '11px',
                      color: '#3b82f6',
                      margin: 0,
                      fontFamily: 'sans-serif'
                    }}>
                      {displayService}
                    </p>
                    
                  </div>

                  {/* Action Icons Row */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '8px',
                    width: '100%',
                    paddingBottom: '12px'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <Video style={{ width: '14px', height: '14px', color: 'white' }} />
                    </div>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                       <MessageCircle style={{ width: '14px', height: '14px', color: 'white' }} />
                    </div>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <Phone style={{ width: '14px', height: '14px', color: 'white' }} />
                    </div>
                  </div>

               </div>
            </div>

            {/* RIGHT COLUMN: Details Grid */}
            <div style={{ 
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              alignContent: 'start'
            }}>
              
              {/* Date */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Calendar style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Appointment Date</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'sans-serif' }}>{displayDate}</p>
                </div>
              </div>

              {/* Time */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Appointment Time</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'sans-serif' }}>{displayTime}</p>
                </div>
              </div>

              {/* Service */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Building2 style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Selected Service</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'sans-serif' }}>{displayService}</p>
                </div>
              </div>

              {/* Communication */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Video style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Communication Service</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'sans-serif', lineHeight: '1.3' }}>{commService}</p>
                </div>
              </div>

              {/* State */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Your State</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0, fontFamily: 'sans-serif' }}>{displayLocation}</p>
                </div>
              </div>

              {/* Prescription */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <FileText style={{ width: '16px', height: '16px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px 0', fontFamily: 'sans-serif' }}>Prescription</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#3b82f6', margin: 0, fontFamily: 'sans-serif', lineHeight: '1.3' }}>{prescriptionType}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Footer Section - Done Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
            <button
              onClick={onDone}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 40px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'sans-serif',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Done
            </button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentConfirmationModal;