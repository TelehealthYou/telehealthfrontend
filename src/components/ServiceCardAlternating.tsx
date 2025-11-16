import { LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface ServiceCardAlternatingProps {
  icon: LucideIcon;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  tagline?: string;
  stats?: Array<{ value: string; label: string }>;
  isReversed?: boolean;
  onBook?: () => void;
}

// Animated Counter Component
function AnimatedStat({ targetValue, label, startTime }: { targetValue: number; label: string; startTime: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds for slower animation
    const steps = 150; // More steps for smoother animation
    const increment = targetValue / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayValue(Math.min(Math.round(increment * currentStep), targetValue));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [targetValue, startTime]);

  return (
    <div className="border-l-2 border-[#2b4c9a] pl-4">
      <div className="text-[#2B4C9A] mb-1" style={{ fontWeight: 700, fontSize: '28px' }}>
        {displayValue}%
      </div>
      <div className="text-[#4A4A4A]" style={{ fontWeight: 600, fontSize: '14px' }}>
        {label}
      </div>
    </div>
  );
}

export function ServiceCardAlternating({ 
  icon: Icon, 
  title, 
  description, 
  shortDescription,
  image, 
  tagline,
  stats = [],
  isReversed = false,
  onBook 
}: ServiceCardAlternatingProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .btn-pulse {
          animation: blink 1.2s ease-in-out infinite;
          transform-origin: center;
        }
      `}} />
      <ServiceCardAlternatingContent 
        icon={Icon}
        title={title}
        description={description}
        shortDescription={shortDescription}
        image={image}
        tagline={tagline}
        stats={stats}
        isReversed={isReversed}
        onBook={onBook}
      />
    </>
  );
}

function ServiceCardAlternatingContent({ 
  icon: Icon, 
  title, 
  description, 
  shortDescription,
  image, 
  tagline,
  stats: _stats = [],
  isReversed = false,
  onBook 
}: ServiceCardAlternatingProps) {
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    // Reset animation when component mounts
    setStartTime(Date.now());
  }, []);

  const cardContent = (
    <div className="w-full lg:w-1/2 flex items-stretch justify-center">
      <div className="w-full h-[360px] group/card perspective-1000">
        <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover/card:rotate-y-180">
          {/* Front of Card */}
          <div className="absolute inset-0 backface-hidden">
            <div 
              className="p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden h-full rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)'
              }}
            >
              {/* Decorative circle elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-white/5 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white flex items-center justify-center mb-4 shadow-lg mx-auto rounded-2xl">
                  <Icon size={40} className="text-[#3b82f6]" />
                </div>
                <h3 className="text-white" style={{ fontWeight: 700, fontSize: '38px', color: '#ffffffff' }}>{title}</h3>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div 
              className="relative w-full h-full shadow-xl overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)'
              }}
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <ImageWithFallback 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-center p-6 text-white">
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '38px', color: '#ffffffff' }}>{title}</h3>
                  <p className="text-white/95 leading-relaxed" style={{ fontWeight: 400, fontSize: '12px' }}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const infoContent = (
    <div className="w-full lg:w-1/2 flex items-stretch">
      <div className="w-full h-[280px] flex flex-col justify-between">
        {/* Short description and tagline at top */}
        <div className="text-center mb-6">
          <p className="text-[#4A4A4A] leading-relaxed mb-2" style={{ fontWeight: 700, fontSize: '16px' }}>
            {shortDescription || description}
          </p>
          {tagline && (
            <p className="text-[#666666]" style={{ fontWeight: 400, fontSize: '14px' }}>
              {tagline}
            </p>
          )}
        </div>

        {/* Stats Layout - 2 divs with 3 stats each */}
        <div className="flex justify-center gap-8">
          {/* Left div - 3 stats */}
          <div className="flex flex-col gap-6">
            <AnimatedStat targetValue={95} label="Success Rate" startTime={startTime} />
            <AnimatedStat targetValue={92} label="Treatment Effectiveness" startTime={startTime} />
            <AnimatedStat targetValue={88} label="Response Time" startTime={startTime} />
          </div>
          
          {/* Right div - 3 stats */}
          <div className="flex flex-col gap-6">
            <AnimatedStat targetValue={98} label="Patient Satisfaction" startTime={startTime} />
            <AnimatedStat targetValue={99} label="Privacy & Security" startTime={startTime} />
            <AnimatedStat targetValue={97} label="Doctor Rating" startTime={startTime} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
        {isReversed ? (
          <>
            {infoContent}
            {cardContent}
          </>
        ) : (
          <>
            {cardContent}
            {infoContent}
          </>
        )}
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button 
          onClick={onBook}
          className="bg-[#2b4c9a] text-white hover:bg-[#1c1c1c] px-8 py-6 transition-colors rounded-3xl btn-pulse cursor-pointer"
          style={{ fontWeight: 600, fontSize: '18px' }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

