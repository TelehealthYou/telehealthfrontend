import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

// Import doctor images
import doctor1 from "../assets/Doctor_Images/1.png";
import doctor2 from "../assets/Doctor_Images/2.png";
import doctor3 from "../assets/Doctor_Images/3.png";
import doctor5 from "../assets/Doctor_Images/5.png";
import doctor6 from "../assets/Doctor_Images/6.png";
import doctor7 from "../assets/Doctor_Images/7.png";
import doctor8 from "../assets/Doctor_Images/8.png";
import doctor9 from "../assets/Doctor_Images/9.png";
import doctor10 from "../assets/Doctor_Images/10.png";

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

interface DoctorSliderProps {
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

// Blue Verified Badge Component
function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="#2b4c9a"/>
    </svg>
  );
}

export function DoctorSlider({ currentSlide = 0, onSlideChange }: DoctorSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const doctors: Doctor[] = [
    {
      name: "Dr. Sarah Mitchell",
      specialty: "Primary Care Physician",
      image: doctor1
    },
    {
      name: "Dr. James Anderson",
      specialty: "Weight Loss Specialist",
      image: doctor2
    },
    {
      name: "Dr. Lisa Chen",
      specialty: "Mental Health Counselor",
      image: doctor3
    },
    {
      name: "Dr. Emily Thompson",
      specialty: "Hormone Therapy Specialist",
      image: doctor5
    },
    {
      name: "Dr. David Martinez",
      specialty: "Hair Loss Treatment",
      image: doctor6
    },
    {
      name: "Dr. Rachel Kim",
      specialty: "Sleep Medicine Specialist",
      image: doctor7
    },
    {
      name: "Dr. Alex Johnson",
      specialty: "Anti-Aging & Longevity",
      image: doctor8
    },
    {
      name: "Dr. Jennifer Brooks",
      specialty: "Cardiology Specialist",
      image: doctor9
    },
    {
      name: "Dr. Robert Wilson",
      specialty: "Orthopedic Surgeon",
      image: doctor10
    },
  ];

  // Sync carousel with external currentSlide prop
  useEffect(() => {
    if (!api) return;
    
    api.scrollTo(currentSlide);
  }, [api, currentSlide]);

  // Listen to carousel changes and notify parent
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      if (onSlideChange) {
        onSlideChange(selectedIndex);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSlideChange]);

  return (
    <div className="px-2 md:px-6 lg:px-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full max-w-[1400px] mx-auto"
      >
        <CarouselContent className="-ml-4">
          {doctors.map((doctor, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              {/* Light grey background card with border radius */}
              <div className="bg-[#f5f5f5] rounded-xl overflow-hidden flex flex-col">
                {/* Doctor Image - Full Width Rectangle */}
                <div className="w-full h-24 overflow-hidden rounded-t-xl bg-white flex items-center justify-center">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Doctor Name with Verified Icon */}
                <div className="flex items-center gap-1 justify-center p-2 rounded-b-xl bg-white">
                  <span className="text-[#1c1c1c] text-center" style={{ fontWeight: 300, fontSize: '14px' }}>
                    {doctor.name}
                  </span>
                  <VerifiedBadge className="w-4 h-4 flex-shrink-0" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
