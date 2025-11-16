import { useEffect, useRef, useState } from "react";
import gallery1Before from "../assets/Gallery/1_Before.jpg";
import gallery1After from "../assets/Gallery/1_Affter.jpg";
import gallery2Before from "../assets/Gallery/2_Before.jpg";
import gallery2After from "../assets/Gallery/2_After.jpg";
import gallery3Before from "../assets/Gallery/3_Before.jpg";
import gallery3After from "../assets/Gallery/3_After.jpg";
import gallery4Before from "../assets/Gallery/4_Before.jpg";
import gallery4After from "../assets/Gallery/4_After.jpg";

interface Story {
  id: number;
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const successStories: Story[] = [
  {
    id: 1,
    beforeImage: gallery1Before,
    afterImage: gallery1After,
    alt: "Patient Transformation 1"
  },
  {
    id: 2,
    beforeImage: gallery2Before,
    afterImage: gallery2After,
    alt: "Patient Transformation 2"
  },
  {
    id: 3,
    beforeImage: gallery3Before,
    afterImage: gallery3After,
    alt: "Patient Transformation 3"
  },
  {
    id: 4,
    beforeImage: gallery4Before,
    afterImage: gallery4After,
    alt: "Patient Transformation 4"
  },
  {
    id: 5,
    beforeImage: gallery1Before,
    afterImage: gallery1After,
    alt: "Patient Transformation 5"
  },
  {
    id: 6,
    beforeImage: gallery2Before,
    afterImage: gallery2After,
    alt: "Patient Transformation 6"
  }
];

export function SuccessStories() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollGallery = (direction: number) => {
    if (!galleryRef.current) return;
    
    const scrollAmount = 500;
    galleryRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });

    const totalItems = successStories.length;
    let newIndex = activeIndex + direction;

    if (newIndex < 0) newIndex = 0;
    if (newIndex >= totalItems) newIndex = totalItems - 1;

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const updateIndicator = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const scrollLeft = gallery.scrollLeft;
        const itemWidth = gallery.offsetWidth;
        const index = Math.round(scrollLeft / itemWidth);
        updateIndicator(index);
      }
    };

    gallery.addEventListener("scroll", handleScroll);

    // Auto-scroll for mobile
    let autoScrollInterval: NodeJS.Timeout;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (window.innerWidth > 768 || isUserInteracting) return;
        
        const scrollWidth = gallery.scrollWidth;
        const itemWidth = gallery.offsetWidth;
        const nextScroll = gallery.scrollLeft + itemWidth;
        
        if (nextScroll >= scrollWidth) {
          gallery.scrollTo({ left: 0, behavior: "smooth" });
          updateIndicator(0);
        } else {
          gallery.scrollBy({ left: itemWidth, behavior: "smooth" });
          const index = Math.round(nextScroll / itemWidth);
          updateIndicator(index);
        }
      }, 2000);
    };

    startAutoScroll();

    return () => {
      gallery.removeEventListener("scroll", handleScroll);
      clearInterval(autoScrollInterval);
    };
  }, [isUserInteracting]);

  const handleMouseDown = () => {
    setIsUserInteracting(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  const handleItemHover = (index: number) => {
    if (window.innerWidth <= 768) return;
    
    updateIndicator(index);
    
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      if (i === index) {
        item.style.width = '600px';
      } else {
        item.style.width = '200px';
      }
    });
  };

  const handleItemLeave = () => {
    if (window.innerWidth <= 768) return;
    
    itemRefs.current.forEach((item) => {
      if (!item) return;
      item.style.width = '300px';
    });
  };

  const handleItemClick = (index: number) => {
    if (window.innerWidth <= 768) return;
    
    updateIndicator(index);
    
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      if (i === index) {
        item.style.width = '600px';
      } else {
        item.style.width = '200px';
      }
    });
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 font-['Open_Sans']" style={{ fontWeight: 500, fontFamily: 'Open Sans, sans-serif', fontSize: '42px', color: '#28436F' }}>
            Success Stories
          </h2>
          <p className="text-gray-600 mx-auto font-['Open_Sans']" style={{ fontWeight: 300, fontSize: '18px' }}>
            Real transformations from real people. See how our telehealth services have changed lives.
          </p>
        </div>

        {/* Gallery Wrapper */}
        <div className="gallery-wrapper">
          <button className="nav-btn left" onClick={() => scrollGallery(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div 
            className="gallery" 
            id="gallery"
            ref={galleryRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {successStories.map((story, index) => (
              <div
                key={story.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="gallery-item"
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemLeave}
                onClick={() => handleItemClick(index)}
              >
                <div className="before-after-container">
                  {/* Before Section */}
                  <div className="image-section before-section">
                    <div className="label">Before</div>
                    <img
                      src={story.beforeImage}
                      alt={`${story.alt} - Before`}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Divider Line */}
                  <div className="divider-line"></div>
                  
                  {/* After Section */}
                  <div className="image-section after-section">
                    <div className="label">After</div>
                    <img
                      src={story.afterImage}
                      alt={`${story.alt} - After`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="nav-btn right" onClick={() => scrollGallery(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Indicator */}
          <div className="indicator" id="indicator">
            {successStories.map((_, index) => (
              <div 
                key={index}
                className={`bar ${activeIndex === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .gallery-wrapper {
          position: relative;
          overflow: hidden;
          max-width: 100%;
          padding: 40px 0 60px;
        }

        .gallery {
          display: flex;
          scroll-behavior: smooth;
          overflow-x: auto;
          gap: 20px;
          padding-bottom: 10px;
          justify-content: center;
        }

        .gallery::-webkit-scrollbar {
          display: none;
        }

        .gallery-item {
          flex: 0 0 auto;
          width: calc(25% - 15px);
          height: 400px;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.25s ease-in-out;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          background: #000;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .before-after-container {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 0;
          position: relative;
          background: #000;
        }

        .image-section {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: #000;
          height: 100%;
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity 0.3s ease, filter 0.3s ease;
          display: block;
          min-height: 100%;
        }

        .gallery-item:not(:hover) .image-section img {
          opacity: 0.7;
          filter: blur(2px);
        }

        .gallery-item:hover .image-section img {
          opacity: 1;
          filter: blur(0px);
        }

        .label {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          z-index: 10;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Open Sans', sans-serif;
        }

        .divider-line {
          display: none;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #000;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 1);
        }

        .nav-btn.left {
          left: 0;
        }

        .nav-btn.right {
          right: 0;
        }

        .indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          z-index: 5;
        }

        .bar {
          width: 25px;
          height: 5px;
          background-color: #deecf7;
          border-radius: 3px;
          transition: background-color 0.3s;
        }

        .bar.active {
          background-color: #00588a;
        }

        @media (max-width: 768px) {
          .gallery-wrapper {
            padding: 40px 20px 60px;
          }

          .gallery {
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            justify-content: flex-start;
          }

          .gallery-item {
            scroll-snap-align: center;
            flex: 0 0 100%;
            width: 100%;
            height: auto;
            min-height: 400px;
            cursor: default;
          }

          .gallery-item:hover {
            width: 100%;
            transform: none;
          }

          .gallery-item:not(:hover) .image-section img {
            opacity: 1;
            filter: blur(0px);
          }

          .nav-btn {
            display: none;
          }
        }
      `}} />
    </section>
  );
}
