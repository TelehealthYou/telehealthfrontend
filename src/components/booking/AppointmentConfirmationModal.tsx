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

interface AppointmentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
  formData: any;
}

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

  // Default values
  const displayDate = formData?.date ? formatDate(formData.date) : 'Thursday, Nov 13, 2025';
  const displayTime = formData?.timeSlot || '12:00 PM';
  const displayService = formData?.service || 'Weight Loss';
  const displayState = formData?.state || 'Florida';
  
  // Hardcoded strings
  const commService = "Synchronous Audio/Video Call";
  const prescriptionType = "Synchronous Audio/Video Call"; 

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      
      >
        
        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          style={{right:"15px",top:"25px"}}        
        >
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-8">
          
          {/* 1. Header Section */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-sm" style={{background:"#13db13"}}>
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900">
              Your Appointment has been confirmed
            </h2>
          </div>

          {/* 2. Main Content Area (Split Layout) */}
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            
            {/* LEFT COLUMN: Doctor Card (Updated to Look Like Upper Code) */}
            <div className="w-full md:w-[250px] flex-shrink-0 md:mx-0" style={{width:"250px", display:"flex", alignItems:"center", justifyContent:"center"}}>
               <div style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  border: '2px solid #3b82f6', // Blue border (Selected state)
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)' // Blue shadow
               }}>
                  
                  {/* Top Right Checkmark */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>

                  {/* Doctor Image */}
                  <div style={{ marginBottom: '8px', position: 'relative' }}>
                    <img
                      src="src\assets\Doctor_Images\1.png" 
                      alt="Dr. David Martinez"
                      style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        margin: '0 auto 12px',
                        border: 'none'
                      }}
                    />
                  </div>

                  {/* Price */}
                  <div style={{
                    color: '#1e3a8a',
                    fontSize: '14px',
                    fontWeight: '700',
                    marginBottom: '4px',
                    fontFamily: 'sans-serif'
                  }}>
                    $ 50.00
                  </div>

                  {/* Doctor Name */}
                  <h4 style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: '700',
                    fontSize: '16px',
                    color: '#111827',
                    margin: '0 0 4px 0',
                    lineHeight: '1.2'
                  }}>
                    Dr. David Martinez
                  </h4>

                  

                  {/* Action Icons Row */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '12px',
                    width: '100%'
                  }}>
                    {/* Video */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Video className="w-4 h-4 text-white" />
                    </div>
                    {/* Message */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                       <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    {/* Phone */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                  </div>

               </div>
            </div>

            {/* RIGHT COLUMN: Details Grid */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 content-start pt-2">
              
              {/* Date */}
              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Appointment Date</p>
                  <p className="text-base font-bold text-gray-900">{displayDate}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Appointment Time</p>
                  <p className="text-base font-bold text-gray-900">{displayTime}</p>
                </div>
              </div>

              {/* Service */}
              <div className="flex gap-3">
                <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Selected Service</p>
                  <p className="text-base font-bold text-gray-900">{displayService}</p>
                </div>
              </div>

              {/* Communication */}
              <div className="flex gap-3">
                <Video className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Communication Service</p>
                  <p className="text-base font-bold text-gray-900 leading-tight">{commService}</p>
                </div>
              </div>

              {/* State */}
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Your State</p>
                  <p className="text-base font-bold text-gray-900">{displayState}</p>
                </div>
              </div>

              {/* Prescription */}
              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Prescription</p>
                  <p className="text-base font-bold text-gray-900 leading-tight text-blue-600">{prescriptionType}</p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Footer Section - Done Button */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onDone}
              style={{
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                width: '200px'
              }}  
            >
              Done
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentConfirmationModal;