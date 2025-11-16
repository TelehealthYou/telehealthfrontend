import { useState, useEffect } from "react";
import { Menu, X, Phone, Search, Calendar, ChevronDown, Brain, Sparkles, Moon, Heart, Pill, Activity, ArrowRight, MessageCircle, Headset, Globe, Users, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  onBookAppointment?: () => void;
}

export function Navigation({ onBookAppointment }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreServicesOpen, setMoreServicesOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isScrolled, setIsScrolled] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ar", name: "Arabic" },
    { code: "zh", name: "Chinese" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const topBarHeight = 40; // Approximate height of top info bar
      setIsScrolled(window.scrollY > topBarHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        .btn-blink-nav {
          animation: blink 1.2s ease-in-out infinite;
          transform-origin: center;
        }
        .opensans-font, .opensans-font * {
          font-family: 'Open Sans', sans-serif !important;
        }
        .nav-header {
          font-weight: 500;
        }
      `}} />
      {/* Top Info Bar */}
      <div className="py-1 opensans-font" style={{ background: '#DDEBF6', color: '#0d0d0dff' }}>
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 px-3 py-1 rounded-full transition-all hover:opacity-80"
                  style={{ backgroundColor: 'rgba(43, 76, 154, 0.1)', color: '#2b4c9a' }}
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                >
                  <Globe size={14} />
                  <span className="text-[13px]" style={{ fontWeight: 700 }}>{selectedLanguage}</span>
                  <ChevronDown size={12} />
                </button>
                
                {languageDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    style={{ minWidth: '150px', zIndex: 9999 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                        style={{ 
                          fontWeight: selectedLanguage === lang.name ? 500 : 400,
                          color: selectedLanguage === lang.name ? '#2b4c9a' : '#000000E6',
                          fontSize: '14px'
                        }}
                        onClick={() => {
                          setSelectedLanguage(lang.name);
                          setLanguageDropdownOpen(false);
                        }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all hover:opacity-80" style={{ backgroundColor: '#ef4444', color: '#ffffff' }}>
                  <Headset size={14} />
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#ef4444' }}></div>
                <span className="text-[13px] tracking-wide" style={{ fontWeight: 600, color: '#070707ff' }}>24/7 Available</span>
              </div>
            </div>
            <div className="hidden lg:flex max-w-lg mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-full pl-5 pr-24 py-1 text-[13px] rounded-full shadow-md focus:outline-none transition-all"
                  style={{ 
                    fontWeight: 200,
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors flex items-center justify-center" style={{ backgroundColor: '#ef4444', color: '#ffffff' }}>
                  <Search size={16} />
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button className="px-2 py-2 tracking-wide transition hover:opacity-80" style={{ fontWeight: 700, color: 'rgb(0, 119, 181)', fontSize: '16px' }}>
                Login
              </button>
              <button
                onClick={onBookAppointment}
                className="px-3 py-1 rounded-full tracking-wide transition-all hover:opacity-90"
                style={{ fontWeight: 400, backgroundColor: '#2b4c9a', color: '#ffffff' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm opensans-font nav-header">
        <div className="px-2 md:px-4 lg:px-2">
          <div className="flex items-center justify-between h-20 gap-2">
            <div className="flex gap-6 items-center">
              {/* Logo */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-12 h-12 bg-[#2B4C9A] rounded-full flex items-center justify-center">
                  <span className="text-white" style={{ fontWeight: 500, fontSize: '20px' }}>T</span>
                </div>
                <div className="flex flex-col">
                  <span className="leading-tight" style={{ fontWeight: 500, fontSize: '20px', color: '#000000E6' }}>TeleHealth</span>
                  <span style={{ fontWeight: 200, fontSize: '12px', color: '#9CA3AF' }}>Healthcare Reimagined</span>
                </div>
              </div>

              {/* Service Menu - Desktop */}
              <div className="hidden lg:flex items-center gap-3 ml-8">
                <a href="#primary-care" className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide cursor-pointer" style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}>Primary Care</a>
                <a href="#weight-loss" className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide cursor-pointer" style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}>Weight Loss</a>
                <a href="#skin-care" className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide cursor-pointer" style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}>Skin Care</a>
                <a href="#hair-loss" className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide cursor-pointer" style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}>Hair Loss</a>
                <a href="#prescription-refill" className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide cursor-pointer" style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}>Prescription</a>
                  
                  {/* Longevity Mega Menu */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setMoreServicesOpen(true)}
                    onMouseLeave={() => setMoreServicesOpen(false)}
                  >
                    <button
                      className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide flex items-center gap-1"
                      style={{ fontWeight: 700, color: '#0077B5', fontSize: '15px' }}
                    >
                      Longevity
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {moreServicesOpen && (
                      <>
                        {/* Invisible bridge to fill the gap between button and menu */}
                        <div 
                          className="fixed left-0 right-0"
                          style={{ 
                            top: isScrolled ? '0px' : '80px',
                            height: isScrolled ? '80px' : '52px',
                            zIndex: 49 
                          }}
                          onMouseEnter={() => setMoreServicesOpen(true)}
                          onMouseLeave={() => setMoreServicesOpen(false)}
                        ></div>
                        
                        <div
                          className="fixed left-0 right-0 bg-white border-t border-b border-gray-200 shadow-2xl"
                          style={{ top: isScrolled ? '80px' : '128px', zIndex: 50 }}
                          onMouseEnter={() => setMoreServicesOpen(true)}
                          onMouseLeave={() => setMoreServicesOpen(false)}
                        >
                        <div className="max-w-[1400px] mx-auto px-8 py-4">
                          <div className="grid justify-center" style={{ gap:'50px', gridTemplateColumns: 'repeat(4, 240px)' }}>
                            {/* Core Longevity Column */}
                            <div className="text-center">
                              <h3 className="uppercase tracking-wider mb-3 font-semibold" style={{ fontSize: '16px', color: '#28436F' }}>Core Longevity</h3>
                              <div className="space-y-2">
                                {/* Mental Health */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Brain className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Mental Health
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>

                                {/* Hormonal Treatment */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Pill className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Hormonal Treatment
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Wellness Column */}
                            <div className="text-center">
                              <h3 className="uppercase tracking-wider mb-3 font-semibold" style={{ fontSize: '16px', color: '#28436F' }}>&nbsp;</h3>
                              <div className="space-y-2">
                                {/* Anxiety Treatment */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Heart className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Anxiety Treatment
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>

                                {/* Sleep Treatment */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Moon className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Sleep Treatment
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Anti-Aging & Longevity Column */}
                            <div className="text-center">
                              <h3 className="uppercase tracking-wider mb-3 font-semibold" style={{ fontSize: '16px', color: '#28436F' }}>&nbsp;</h3>
                              <div className="space-y-2">
                                {/* Anti-Aging Solutions */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Anti-Aging Solutions
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>

                                {/* Sexual Health */}
                                <div className="flex flex-col bg-white p-2 shadow-sm border hover:shadow-md transition">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5 text-[#2B4C9A]" strokeWidth={1.5} />
                                    <h3 style={{ fontWeight: 500, fontSize: '16px', color: '#000000E6' }}>
                                      Sexual Health
                                    </h3>
                                  </div>
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={onBookAppointment}
                                      className="bg-[#2B4C9A] text-white py-1.5 px-3 tracking-wide hover:bg-[#000000E6] transition cursor-pointer rounded-lg"
                                      style={{ fontWeight: 400, fontSize: '12px' }}
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                  </div>
                  
                  
                  {/* About Us Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setAboutUsOpen(true)}
                    onMouseLeave={() => setAboutUsOpen(false)}
                  >
                    <button
                      className="hover:text-[#0181F5] transition whitespace-nowrap tracking-wide flex items-center gap-1"
                      style={{ fontWeight: 700, color: '#0077B5', fontSize: '14px' }}
                    >
                      About Us
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {aboutUsOpen && (
                      <div
                        className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        style={{ minWidth: '180px' }}
                        onMouseEnter={() => setAboutUsOpen(true)}
                        onMouseLeave={() => setAboutUsOpen(false)}
                      >
                        <a
                          href="#contact"
                          className="block px-4 py-2 transition-colors"
                          style={{ 
                            fontWeight: 500,
                            color: '#0077B5',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d0e8ec'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Contact Us
                        </a>
                        <a
                          href="#faqs"
                          className="block px-4 py-2 transition-colors"
                          style={{ 
                            fontWeight: 500,
                            color: '#0077B5',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d0e8ec'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          FAQs
                        </a>
                      </div>
                    )}
                  </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              
              <button
                onClick={onBookAppointment}
                className="flex items-center gap-1.5 bg-[#2B4C9A] text-white px-3 py-1.5 rounded-full hover:bg-[#000000E6] transition-all cursor-pointer btn-blink-nav"
              >
                <Calendar size={15} className="text-white" />
                <span className="tracking-wide" style={{ fontWeight: 700, fontSize: '13px' }}>Book Appointment</span>
              </button>
              <button
                className="flex items-center gap-1.5 border-2 border-[#2B4C9A] text-[#2B4C9A] px-3 py-1.5 rounded-full transition-all cursor-pointer" style={{paddingRight:'0 !important'}}
              >
                <MessageCircle size={15} style={{color: 'rgb(0, 119, 181)'}}/>
                <span className="tracking-wide" style={{ fontWeight: 700, fontSize: '15x', color: 'rgb(0, 119, 181)' }}>Messages</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-[#000000E6]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Search Bar - Mobile */}
          <div className="lg:hidden pb-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                placeholder="Search conditions, treatments..."
                className="w-full pl-12 pr-4 py-2.5 bg-[#F3F4F6] text-[#000000E6] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2B4C9A] rounded-full"
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-3 border-t border-gray-100">
              <div className="pb-2">
                <p className="uppercase tracking-wider mb-2" style={{ fontSize: '12px', color: '#9CA3AF' }}>Our Services</p>
                <a href="#primary-care" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Primary Care</a>
                <a href="#weight-loss" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Weight Loss</a>
                <a href="#hair-loss" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Hair Loss</a>
                <a href="#longevity" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Longevity</a>
                <a href="#mental-health" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Mental Health</a>
                <a href="#hormonal-treatment" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Hormonal Treatment</a>
                <a href="#anxiety" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Anxiety</a>
                <a href="#sleep-treatment" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Sleep Treatment</a>
                <a href="#anti-aging" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Anti-Aging</a>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <a href="#faqs" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>FAQs</a>
                <a href="#contact" className="block py-2 hover:text-[#0181F5] cursor-pointer" style={{ color: '#0077B5', fontSize: '16px' }}>Contact</a>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-[#2B4C9A] text-white rounded-full hover:bg-[#000000E6]"
                  onClick={onBookAppointment}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

