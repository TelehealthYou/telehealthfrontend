import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Footer() {
  return (
    <footer className="bg-[#2f3339] text-white">
      {/* Main Footer Content */}
      <div className="px-4 md:px-6 lg:px-8 md:py-16 py-[0px] px-[32px] py-[64px]">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '2.5rem'
        }}>
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <span className="tracking-tight" style={{ fontWeight: 500, fontSize: '24px', color: '#01578C' }}>T</span>
              </div>
              <div className="flex flex-col">
                <span className="leading-tight tracking-tight" style={{ fontWeight: 500, fontSize: '20px' }}>Tele Health</span>
                <span style={{ fontWeight: 200, fontSize: '12px', color: '#d0e8ec' }}>Healthcare on Demand</span>
              </div>
            </div>
            <p className="text-[#9d9a9aff] mb-6 leading-relaxed" style={{ fontSize: '16px', color:'#9d9a9aff'}}>
              Your trusted partner in virtual healthcare. Access quality medical consultations from the comfort of your home, anytime, anywhere.
            </p>
            
            {/* QR Code */}
            <div style={{ marginTop: '16px', marginLeft: '26px' }}>
              <div className="bg-white p-3 w-32 h-32 inline-block">
                <ImageWithFallback 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://telehealth.com"
                  alt="QR Code - Scan to visit"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>

          {/* Company & Resources */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Sans-Serif', fontSize: '20px', color: '#ffffffff', fontWeight: 600 }}>Company & Resources</h4>
            <ul className="space-y-2" style={{ fontSize: '16px' }}>
              <li style={{ marginBottom: 0 }}>
                <a href="#privacy" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#about" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  About us
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#contact" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Contact us
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#blogs" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Help Blogs
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#terms" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Terms & Conditions
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#message" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Message
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Sans-Serif', fontSize: '20px', color: '#ffffffff', fontWeight: 600 }}>Services</h4>
            <ul className="space-y-2" style={{ fontSize: '16px' }}>
              <li style={{ marginBottom: 0 }}>
                <a href="#primary-care" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Primary care
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#weight-loss" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Weight loss
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#hair-loss" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Hair loss
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#skin-care" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Skin Care
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#mens-health" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Men's Health
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#womens-health" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  Women's Health
                </a>
              </li>
              
              
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Sans-Serif', fontSize: '20px', color: '#ffffffff', fontWeight: 600 }}>Additional Services</h4>
            <ul className="space-y-2" style={{ fontSize: '16px' }}>
              

              <li style={{ marginBottom: 0 }}>
                <span className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ fontWeight: 700, color: '#9d9a9aff' }}>
                  Prescription Refill
                </span>
              </li>
              
              <li style={{ marginBottom: 0 }}>
                <span className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ fontWeight: 700, color: '#9d9a9aff' }}>
                  Longevity
                </span>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#mental-health" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                    &nbsp;&nbsp;&nbsp;Mental Health
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#mental-health" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                    &nbsp;&nbsp;&nbsp;Sexual Health
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#hormonal-treatment" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  &nbsp;&nbsp;&nbsp;Hormonal Treatment
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#anxiety" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  &nbsp;&nbsp;&nbsp;Anxiety
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#sleep-treatment" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  &nbsp;&nbsp;&nbsp;Sleep Treatment
                </a>
              </li>
              <li style={{ marginBottom: 0 }}>
                <a href="#anti-aging" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>
                  &nbsp;&nbsp;&nbsp;Anti-Aging
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info with QR Code */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'Sans-Serif', fontSize: '20px', color: '#ffffffff', fontWeight: 600 }}>Get In Touch</h4>
            <ul className="space-y-3 mb-3" style={{ fontSize: '16px', color: '#9d9a9aff' }}>
              <li className="flex items-start gap-3" style={{ marginBottom: 0 }}>
                <Phone size={16} className="text-[#9d9a9aff] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[#9d9a9aff]">Call Us</div>
                  <a href="tel:1-800-TELEHEALTH" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>1-800-TELEHEALTH</a>
                </div>
              </li>
              <li className="flex items-start gap-3" style={{ marginBottom: 0 }}>
                <Mail size={16} className="text-[#9d9a9aff] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[#9d9a9aff]">Email Us</div>
                  <a href="mailto:support@telehealth.com" className="hover:text-[#d0e8ec] transition cursor-pointer" style={{ color: '#9d9a9aff' }}>support@telehealth.com</a>
                </div>
              </li>
            </ul>

            {/* Follow Us - Social Media */}
            <div>
              <h4 className="mb-3" style={{ fontFamily: 'Sans-Serif', fontSize: '20px', color: '#ffffffff', fontWeight: 600 }}>Follow us on:</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#d0e8ec] hover:text-[#2f3339] transition flex items-center justify-center cursor-pointer">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#d0e8ec] hover:text-[#2f3339] transition flex items-center justify-center cursor-pointer">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#d0e8ec] hover:text-[#2f3339] transition flex items-center justify-center cursor-pointer">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-white/10 hover:bg-[#d0e8ec] hover:text-[#2f3339] transition flex items-center justify-center cursor-pointer">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            

          </div>
        </div>

        {/* Certification Logos - Bottom Right */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <div style={{ 
              backgroundColor: 'white', 
              padding: '12px', 
              width: '160px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <ImageWithFallback 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBUsaNxTkfNOBHSy86d-qEiDpyvEIzFNFilA&s"
                alt="HIPAA Compliant"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '12px', 
              width: '160px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <ImageWithFallback 
                src="https://spectra-group.co.uk/wp-content/uploads/2017/01/iso-27001-logo.gif"
                alt="ISO 27001"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '12px', 
              width: '160px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <ImageWithFallback 
                src="https://logowik.com/content/uploads/images/aicpa-soc-2-type-ii-certified2471.jpg"
                alt="SOC 2"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="px-4 md:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center text-[#9d9a9aff]" style={{ fontSize: '14px' , color:'#9d9a9aff'}}>
            <div>
              © Tele Health. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

