import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  nextAvailable?: string;
  image?: string;
  onBook?: () => void;
}

export function DoctorCard({ 
  name, 
  specialty, 
  rating, 
  reviewCount, 
  nextAvailable,
  image,
  onBook 
}: DoctorCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-none bg-white hover:shadow-md transition">
      <Avatar className="w-16 h-16">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-[#d0e8ec] text-[#2B4C9A]">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h4 className="text-[#000000E6]">{name}</h4>
        <p className="text-[#000000E6]" style={{ fontSize: '14px' }}>{specialty}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-[#FDB022] fill-[#FDB022]" />
            <span style={{ fontSize: '14px' }}>{rating}</span>
          </div>
          <span className="text-[#000000E6]" style={{ fontSize: '12px' }}>({reviewCount} reviews)</span>
        </div>
        {nextAvailable && (
          <p className="text-[#2B4C9A] mt-1" style={{ fontSize: '12px' }}>Next: {nextAvailable}</p>
        )}
      </div>

      <Button 
        className="bg-[#2B4C9A] text-white rounded-none hover:brightness-110"
        onClick={onBook}
      >
        Book
      </Button>
    </div>
  );
}

