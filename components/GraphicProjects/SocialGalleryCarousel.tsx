'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

interface SocialGalleryCarouselProps {
  images: string[];
}

export default function SocialGalleryCarousel({ images }: SocialGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Optional subtle autoplay
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000 + Math.random() * 2000); // Staggered autoplay timing
    return () => clearInterval(timer);
  }, [isHovered, isDragging, images.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    setIsDragging(false);
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      paginate(1);
    } else if (offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 10 : -10,
      scale: 0.99,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      x: direction < 0 ? 10 : -10,
      scale: 1.01,
    })
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="social-carousel-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={() => setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
    >
      <style>{`
        .social-carousel-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          background: #0b0f19; /* subtle dark navy matching portfolio */
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .social-carousel-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(45, 212, 191, 0.05); /* subtle blue/purple accent glow */
        }

        .carousel-viewport {
          position: relative;
          width: 100%;
          border-radius: 4px 4px 0 0;
          overflow: hidden;
          background: #020408;
          display: grid;
        }

        .carousel-slide {
          grid-area: 1 / 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-slide img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(11, 15, 25, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: background 0.3s ease, opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
          z-index: 10;
          opacity: 0;
        }

        @media (hover: hover) {
          .social-carousel-card:hover .carousel-nav-btn {
            opacity: 1;
          }
        }
        @media (hover: none) {
          .carousel-nav-btn {
            opacity: 0.8; /* Always accessible on touch if no hover */
          }
        }

        .carousel-nav-btn:hover {
          background: rgba(45, 212, 191, 0.2); /* subtle accent color */
          color: #fff;
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-nav-btn.prev {
          left: 12px;
        }

        .carousel-nav-btn.next {
          right: 12px;
        }

        .social-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-actions {
          display: flex;
          gap: 14px;
        }

        .social-icon {
          cursor: pointer;
          transition: color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-icon:hover {
          color: rgba(255, 255, 255, 1);
          transform: translateY(-1px) scale(1.05);
        }

        .pagination-dots {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          transition: background 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .dot.active {
          background: rgba(45, 212, 191, 0.9); /* matching portfolio accent */
          transform: scale(1.4);
        }
      `}</style>

      <div className="carousel-viewport">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.4, ease: "easeInOut" },
              scale: { duration: 0.4, ease: "easeInOut" }
            }}
            className="carousel-slide"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {/* 
              Index 0 is the COVER image. It is eager loaded.
              The rest are lazy loaded.
            */}
            <ProtectedImage 
              useNative 
              src={images[currentIndex]} 
              alt={`Slide ${currentIndex + 1} of ${images.length}`} 
              loading={currentIndex === 0 ? "eager" : "lazy"}
              blockInteraction={false}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button className="carousel-nav-btn prev" onClick={(e) => { e.stopPropagation(); paginate(-1); }} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-nav-btn next" onClick={(e) => { e.stopPropagation(); paginate(1); }} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="social-footer">
        <div className="social-actions">
          <Heart className="social-icon" size={20} />
          <MessageCircle className="social-icon" size={20} />
          <Send className="social-icon" size={20} />
        </div>
        
        {images.length > 1 && (
          <div className="pagination-dots">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`dot ${i === currentIndex ? 'active' : ''}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  if (i === currentIndex) return;
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
              />
            ))}
          </div>
        )}
        
        <div className="social-actions">
          <Bookmark className="social-icon" size={20} />
        </div>
      </div>
    </div>
  );
}
