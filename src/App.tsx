import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { Footer } from "./components/Footer";
import { BookingFlow } from "./components/BookingFlow";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  const handleBookAppointment = () => {
    setShowBookingFlow(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = () => {
    setShowBookingFlow(false);
    toast.success("Appointment booked successfully!");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      
      <Navigation onBookAppointment={handleBookAppointment} />
      
      {!showBookingFlow && (
        <>
          <LandingPage onBookAppointment={handleBookAppointment} />
        </>
      )}

      {showBookingFlow && (
        <>
          <BookingFlow onComplete={handleBookingComplete} />
        </>
      )}
      
      <Footer />
    </div>
  );
}
