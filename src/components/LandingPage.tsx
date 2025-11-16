import { Stethoscope, Scale, UserCircle, Sparkles, Brain, Pill, Heart, Moon, Calendar, ThumbsUp, ShieldCheck, Star, Award, Activity, Users, FileText, Video, Phone, Mic } from "lucide-react";
import { ServiceCardAlternating } from "./ServiceCardAlternating";
import { DoctorSlider } from "./DoctorSlider";
import { SuccessStories } from "./SuccessStories";
import heroBackground from "../assets/founders-bg.jpg";
import iphoneMockup from "../assets/mockup/mockup-iphone.png";
import heroImage from "/images/HeroImage.png";

// Service Images
import primaryCareImg from "../assets/services_images/primary_care.jpg";
import weightLossImg from "../assets/services_images/weight_loss.jpg";
import hairLossImg from "../assets/services_images/hair_loss.jpg";
import mentalHealthImg from "../assets/services_images/mental_health.jpg";
import hormonalTreatmentImg from "../assets/services_images/hormonal_therapy.jpg";
import anxietyTreatmentImg from "../assets/services_images/anxiety_treatment.jpg";
import sleepTreatmentImg from "../assets/services_images/sleep_treatment.jpg";
import antiAgingImg from "../assets/services_images/anti_aging.jpg";
import mensHealthImg from "../assets/services_images/mens_health.jpg";
import prescriptionRefillImg from "../assets/services_images/prescription_refill.jpg";
import womensHealthImg from "../assets/services_images/womens_health.jpg";
import sexualHealthImg from "../assets/services_images/sexual_health.jpg";
import { useState } from "react";

interface LandingPageProps {
  onBookAppointment: () => void;
}

const telehealthSlides = [
  { icon: Calendar, text: "Same Day Visits" },
  { icon: ThumbsUp, text: "95% patient satisfaction" },
  { icon: ShieldCheck, text: "No insurance needed" },
  { icon: Calendar, text: "Same-day visits" },
  { icon: Star, text: "Doctor's availability 365 days a year" },
  { icon: Award, text: "36 specialties offered" },
  { icon: Stethoscope, text: "U.S. board-certified doctors" }
];

function TelehealthSlider() {
  return (
    <div className="relative overflow-hidden py-4">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
      <div className="flex animate-scroll">
        {/* Duplicate the items twice for seamless loop */}
        {[...telehealthSlides, ...telehealthSlides].map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap" style={{ marginLeft: index === 0 ? '0' : '100px' }}>
              <Icon size={24} className="text-white flex-shrink-0" />
              <span className="text-white" style={{ fontWeight: 400, fontSize: '18px' }}>
                {slide.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LandingPage({ onBookAppointment }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10; // Total number of doctor slides

  const services = [
    {
      icon: Stethoscope,
      title: "Primary Care",
      shortDescription: "Comprehensive healthcare with board-certified physicians available anytime",
      tagline: "(24/7 Virtual Consultations)",
      description: "Comprehensive primary healthcare services including routine check-ups, preventive care, chronic disease management, and general medical consultations with board-certified physicians available 24/7.",
      image: primaryCareImg,
      stats: [
        { value: "98%", label: "Patient Satisfaction" },
        { value: "24/7", label: "Available Support" },
        { value: "5000+", label: "Patients Treated" },
        { value: "100+", label: "Certified Doctors" }
      ]
    },
    {
      icon: Scale,
      title: "Weight Loss",
      shortDescription: "Personalized programs with FDA-approved medications and nutrition counseling",
      tagline: "(FDA-Approved Medications & Personalized Plans)",
      description: "Personalized weight management programs combining medication, nutrition counseling, and lifestyle coaching. FDA-approved treatments including GLP-1 medications, customized meal plans, and ongoing support from certified nutritionists.",
      image: weightLossImg,
      stats: [
        { value: "15-20%", label: "Avg Weight Loss" },
        { value: "92%", label: "Success Rate" },
        { value: "3000+", label: "Transformations" },
        { value: "25+", label: "Weight Loss Experts" }
      ]
    },
    {
      icon: UserCircle,
      title: "Hair Loss",
      shortDescription: "Evidence-based restoration treatments with prescription medications and therapy",
      tagline: "(Men & Women)",
      description: "Evidence-based hair restoration treatments including prescription medications (finasteride, minoxidil), PRP therapy consultations, and personalized treatment plans. Expert dermatologists specializing in male and female pattern hair loss.",
      image: hairLossImg,
      stats: [
        { value: "85%", label: "See Improvement" },
        { value: "6-12mo", label: "Results Timeline" },
        { value: "2500+", label: "Active Patients" },
        { value: "40+", label: "Hair Specialists" }
      ]
    },
    {
      icon: Brain,
      title: "Mental Health",
      shortDescription: "Compassionate therapy and psychiatric care for mental wellness",
      tagline: "(Licensed Therapists & Psychiatrists)",
      description: "Comprehensive mental healthcare including therapy, psychiatric consultations, medication management for depression, anxiety, ADHD, and more. Licensed therapists and psychiatrists providing compassionate, evidence-based treatment.",
      image: mentalHealthImg,
      stats: [
        { value: "88%", label: "Symptom Improvement" },
        { value: "Same Day", label: "Appointments" },
        { value: "6000+", label: "Lives Improved" },
        { value: "120+", label: "Mental Health Pros" }
      ]
    },
    {
      icon: Pill,
      title: "Hormonal Treatment",
      shortDescription: "Specialized hormone therapy with comprehensive testing and monitoring",
      tagline: "(Men & Women)",
      description: "Specialized hormone replacement therapy (HRT) for men and women including testosterone therapy, estrogen/progesterone therapy, thyroid optimization, and comprehensive hormone panel testing with ongoing monitoring.",
      image: hormonalTreatmentImg,
      stats: [
        { value: "93%", label: "Feel Better" },
        { value: "2-4wks", label: "See Results" },
        { value: "3500+", label: "Patients Balanced" },
        { value: "45+", label: "Endocrinologists" }
      ]
    },
    {
      icon: Heart,
      title: "Anxiety Treatment",
      shortDescription: "Specialized care with CBT therapy and medication management",
      tagline: "(Fast Relief & Expert Care)",
      description: "Specialized anxiety disorder treatment including cognitive behavioral therapy (CBT), medication management, panic disorder care, and stress reduction techniques. Fast access to licensed therapists and psychiatrists.",
      image: anxietyTreatmentImg,
      stats: [
        { value: "86%", label: "Reduced Anxiety" },
        { value: "24hrs", label: "First Session" },
        { value: "4500+", label: "Patients Helped" },
        { value: "80+", label: "Anxiety Specialists" }
      ]
    },
    {
      icon: Moon,
      title: "Sleep Treatment",
      shortDescription: "Comprehensive sleep therapy with prescription aids and CBT",
      tagline: "(Better Rest, Better Life)",
      description: "Comprehensive sleep disorder treatment including insomnia therapy, sleep apnea consultations, prescription sleep aids, CBT for insomnia, and sleep hygiene optimization. Board-certified sleep medicine specialists available.",
      image: sleepTreatmentImg,
      stats: [
        { value: "91%", label: "Sleep Better" },
        { value: "1-2wks", label: "Improvement" },
        { value: "2800+", label: "Better Sleepers" },
        { value: "35+", label: "Sleep Doctors" }
      ]
    },
    {
      icon: Sparkles,
      title: "Anti-Aging",
      shortDescription: "Advanced medicine with NAD+ therapy and peptide treatments",
      tagline: "(Look & Feel Younger)",
      description: "Advanced anti-aging medicine including NAD+ therapy, peptide treatments, hormone optimization, aesthetic consultations, and comprehensive age-management protocols to help you look and feel younger.",
      image: antiAgingImg,
      stats: [
        { value: "5-10yrs", label: "Look Younger" },
        { value: "94%", label: "Satisfaction" },
        { value: "2000+", label: "Transformations" },
        { value: "50+", label: "Anti-Aging Experts" }
      ]
    },
    {
      icon: Users,
      title: "Men's Health",
      shortDescription: "Specialized healthcare for men including testosterone and vitality solutions",
      tagline: "(Testosterone & Male Vitality)",
      description: "Comprehensive men's health services including testosterone replacement therapy, erectile dysfunction treatment, prostate health, male fertility, and overall vitality optimization with personalized treatment plans.",
      image: mensHealthImg,
      stats: [
        { value: "92%", label: "Improved Vitality" },
        { value: "97%", label: "Patient Satisfaction" },
        { value: "3500+", label: "Men Treated" },
        { value: "45+", label: "Specialists" }
      ]
    },
    {
      icon: FileText,
      title: "Prescription Refill",
      shortDescription: "Fast and convenient prescription refills without hassle or delays",
      tagline: "(Quick & Easy Medication Refills)",
      description: "Streamlined prescription refill services for ongoing medications. Connect with licensed healthcare providers for quick reviews and refills of your existing prescriptions, delivered directly to your door.",
      image: prescriptionRefillImg,
      stats: [
        { value: "24hrs", label: "Avg Turnaround" },
        { value: "99%", label: "Approval Rate" },
        { value: "10000+", label: "Refills Monthly" },
        { value: "100+", label: "Medications" }
      ]
    },
    {
      icon: Heart,
      title: "Women's Health",
      shortDescription: "Complete healthcare for women at every stage of life",
      tagline: "(Comprehensive Women's Wellness)",
      description: "Dedicated women's health services including birth control, menopause management, PCOS treatment, fertility support, hormonal balance, and preventive care tailored to women's unique health needs.",
      image: womensHealthImg,
      stats: [
        { value: "96%", label: "Satisfaction Rate" },
        { value: "98%", label: "Treatment Success" },
        { value: "5000+", label: "Women Helped" },
        { value: "60+", label: "Specialists" }
      ]
    },
    {
      icon: Activity,
      title: "Sexual Health",
      shortDescription: "Confidential sexual health services and wellness optimization treatments",
      tagline: "(Intimate Wellness & Performance)",
      description: "Discreet and comprehensive sexual health services including STI testing and treatment, performance enhancement, libido optimization, relationship counseling, and personalized intimate wellness solutions.",
      image: sexualHealthImg,
      stats: [
        { value: "94%", label: "Improved Satisfaction" },
        { value: "96%", label: "Confidentiality Rate" },
        { value: "2500+", label: "Clients Served" },
        { value: "40+", label: "Health Experts" }
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#d0e8ec] overflow-hidden">
        <div className="bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${heroBackground})` }}>
          <style dangerouslySetInnerHTML={{__html: `
            .hero-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 0;
              align-items: end;
            }
            @media (min-width: 1024px) {
              .hero-grid {
                grid-template-columns: 70% 30%;
              }
            }
          `}} />
          <div className="hero-grid">
            {/* Left Column - Hero Image with Text Overlay - Touching left edge */}
            <div className="relative flex flex-col items-start h-full">
              {/* Hero Image - touching left corner and bottom */}
              <div className="w-full">
                <img 
                  src={heroImage} 
                  alt="Healthcare professional" 
                  className="w-full h-auto"
                  style={{ display: 'block', maxWidth: '80%' }}
                />
              </div>

              {/* Text content - positioned absolutely on top of image */}
              <div className="absolute top-8 left-0 right-0 w-full" style={{ paddingLeft: '50%', paddingTop: '4%' }}>
                <div className="text-left">
                  <h1 className="font-medium mb-4" style={{ fontFamily: 'Open Sans, sans-serif', letterSpacing: '-0.03em', lineHeight: '1.2', fontSize: '28px', fontWeight: 700, color: '#28436F' }}>
                    Take control of your health with online care
                  </h1>
                  <p className="text-[#2B4C9A] mb-6" style={{ fontFamily: 'Open Sans, sans-serif', letterSpacing: '-0.01em', lineHeight: '1.4', fontSize: '16px', fontWeight: 500 }}>
                    Quick and affordable virtual care for opioid addiction, hormone therapy, weight loss, and urgent health needs.
                  </p>
                  
                  {/* Book Now Button */}
                  <div className="flex justify-center">
                    <button 
                      className="bg-[#2B4C9A] text-white rounded-full hover:brightness-110 transition-all duration-300 px-6 py-2 shadow-lg flex items-center justify-center btn-blink cursor-pointer ml-2"
                      onClick={onBookAppointment}
                      style={{ fontFamily: 'Lora', fontWeight: 600, fontSize: '16px' }}
                    >
                      <span className="tracking-wide">Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Video grid from Figma */}
            <div className="relative h-[600px] lg:h-[600px]">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideBottomToTop {
                  0% {
                    transform: translateY(0);
                  }
                  100% {
                    transform: translateY(-5000px);
                  }
                }
                .video-slider-vertical {
                  animation: slideBottomToTop 60s linear infinite;
                }
                @keyframes blink {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.08);
                  }
                }
                .btn-blink {
                  animation: blink 1.2s ease-in-out infinite;
                  transform-origin: center;
                }
              `}} />
              <div className="absolute inset-0 flex items-start justify-center">
                <div className="relative w-full h-full flex items-start justify-center pt-12">
                  <div className="video-slider-vertical relative w-[260px]">
                    {/* Create 20 pairs (10 pairs x 2 for seamless loop) */}
                    {[...Array(20)].map((_, index) => {
                      const topPosition = index * 450; // 500px spacing between each pair (280px video + 220px gap)
                      
                      return (
                        <div
                          key={index}
                          className="absolute w-[260px] h-[360px]"
                          style={{ top: `${topPosition}px` }}
                        >
                          {/* Patient Video Phone */}
                          <div
                            className="absolute w-[130px] h-[280px] left-0 flex justify-center items-center"
                            style={{ top: '-80px' }}
                          >
                            <div className="relative w-full h-full flex justify-center items-center">
                              {/* Phone Mockup (base layer) */}
                              <img
                                src={iphoneMockup}
                                alt="iPhone mockup"
                                className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                                style={{
                                  filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.25))',
                                }}
                              />

                              {/* Video Positioned to Fit Inside Screen */}
                              <div
                                className="absolute z-0 overflow-hidden"
                                style={{
                                  width: '78%', // Adjust this to match your screen area
                                  height: '78%', // Adjust to match mockup screen height
                                  top: '11%', // Push video inside the mockup screen vertically
                                  left: '10%', // Center horizontally inside the mockup
                                  borderRadius: '15px',
                                }}
                              >
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  controlsList="nodownload"
                                  className="w-full h-full object-cover"
                                >
                                  <source
                                    src="https://www.quick.md/wp-content/uploads/HomeV2.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                
                                {/* Picture-in-Picture: Doctor video on Patient phone */}
                                <div style={{
                                  position: 'absolute',
                                  top: '22px',
                                  right: '6px',
                                  width: '35px',
                                  height: '50px',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  border: '0.5px solid rgba(0, 0, 0, 0.09)',
                                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                                  zIndex: 5
                                }}>
                                  <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controlsList="nodownload"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  >
                                    <source
                                      src="https://www.quick.md/wp-content/uploads/HomeProviderV2.mp4"
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>
                              </div>
                              
                              {/* Call Control Icons for Patient Phone - Positioned at bottom of mockup */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 flex z-20" style={{ bottom: '42px', gap: '10px' }}>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  backdropFilter: 'blur(4px)',
                                  WebkitBackdropFilter: 'blur(4px)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Video size={12} color="#ffffff" />
                                </button>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Phone size={12} color="#ffffff" />
                                </button>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  backdropFilter: 'blur(4px)',
                                  WebkitBackdropFilter: 'blur(4px)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Mic size={12} color="#ffffff" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Doctor Video Phone */}
                          <div
                            className="absolute w-[130px] h-[280px] flex justify-center items-center"
                            style={{ top: '30px', left: '107px' }}
                          >
                            <div className="relative w-full h-full flex justify-center items-center">
                              {/* Phone Mockup (base layer) */}
                              <img
                                src={iphoneMockup}
                                alt="iPhone mockup"
                                className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                                style={{
                                  filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.25))',
                                }}
                              />

                              {/* Video Inside the Screen */}
                              <div
                                className="absolute z-0 overflow-hidden"
                                style={{
                                  width: '78%',
                                  height: '78%',
                                  top: '11%',
                                  left: '10%',
                                  borderRadius: '15px',
                                }}
                              >
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  controlsList="nodownload"
                                  className="w-full h-full object-cover"
                                >
                                  <source
                                    src="https://www.quick.md/wp-content/uploads/HomeProviderV2.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                
                                {/* Picture-in-Picture: Patient video on Doctor phone */}
                                <div style={{
                                  position: 'absolute',
                                  top: '22px',
                                  left: '6px',
                                  width: '35px',
                                  height: '50px',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  border: '0.5px solid rgba(0, 0, 0, 0.09)',
                                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                                  zIndex: 5
                                }}>
                                  <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    controlsList="nodownload"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  >
                                    <source
                                      src="https://www.quick.md/wp-content/uploads/HomeV2.mp4"
                                      type="video/mp4"
                                    />
                                  </video>
                                </div>
                              </div>
                              
                              {/* Call Control Icons for Doctor Phone - Positioned at bottom of mockup */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 flex z-20" style={{ bottom: '42px', gap: '10px' }}>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  backdropFilter: 'blur(4px)',
                                  WebkitBackdropFilter: 'blur(4px)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Video size={12} color="#ffffff" />
                                </button>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(239, 68, 68, 0.9)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Phone size={12} color="#ffffff" />
                                </button>
                                <button style={{ 
                                  width: '24px', 
                                  height: '24px', 
                                  borderRadius: '50%', 
                                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                  backdropFilter: 'blur(4px)',
                                  WebkitBackdropFilter: 'blur(4px)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  transition: 'all 0.2s'
                                }}>
                                  <Mic size={12} color="#ffffff" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Doctor Slide Indicator */}
          <div className="relative flex justify-center" style={{ marginTop: '10px', marginBottom: '20px', top: '40px' }}>
            <style dangerouslySetInnerHTML={{__html: `
              .indicator {
                display: flex;
                gap: 8px;
                align-items: center;
              }
              .indicator .bar {
                width: 40px;
                height: 4px;
                background-color: rgba(43, 76, 154, 0.3);
                border-radius: 2px;
                transition: all 0.3s ease;
                cursor: pointer;
              }
              .indicator .bar:hover {
                background-color: rgba(43, 76, 154, 0.5);
              }
              .indicator .bar.active {
                background-color: #2B4C9A;
                width: 60px;
              }
            `}} />
            <div className="indicator">
              {[...Array(totalSlides)].map((_, index) => (
                <div 
                  key={index}
                  className={`bar ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* Doctor Slider */}
          <div className="py-4 md:py-6">        
            <DoctorSlider currentSlide={currentSlide} onSlideChange={setCurrentSlide} />
          </div>
        </div>
      </section>

      {/* Services Section - Alternating Layout */}
      <section id="services" className="bg-white py-10 md:py-16">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 style={{ fontWeight: 500, fontFamily: 'Open Sans, sans-serif', fontSize: '42px', color: '#28436F' }}>
              Our Services
            </h2>
          </div>
          <div className="max-w-7xl mx-auto space-y-8">
            {services.map((service, index) => (
              <ServiceCardAlternating
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                shortDescription={service.shortDescription}
                image={service.image}
                tagline={service.tagline}
                stats={service.stats}
                isReversed={index % 2 === 1}
                onBook={onBookAppointment}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <SuccessStories />

      

      {/* CTA Section - Slider */}
      <section className="bg-[#2B4C9A] pt-6 md:pt-8 pb-6 md:pb-8">
        <div className="px-4 md:px-6 lg:px-8">
          <TelehealthSlider />
        </div>
      </section>
    </div>
  );
}
