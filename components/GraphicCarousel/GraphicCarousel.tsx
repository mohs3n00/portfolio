'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

interface GraphicCarouselProps {
  images: string[];
  autoplayInterval?: number;
}

export default function GraphicCarousel({ 
  images, 
  autoplayInterval = 5000 
}: GraphicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Autoplay logic
  useEffect(() => {
    if (isHovered || isDragging) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, images.length, autoplayInterval]);

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
    enter: (direction: number) => {
      return {
        opacity: 0,
        x: direction > 0 ? 30 : -30,
        scale: 0.98,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        opacity: 0,
        x: direction < 0 ? 30 : -30,
        scale: 1.02,
      };
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={() => setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
    >
      <style>{`
        .carousel-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        /* 
          We render the first image invisibly to naturally 
          establish the container's height based on aspect ratio 
        */
        .carousel-dummy-img {
          width: 100%;
          height: auto;
          visibility: hidden;
          pointer-events: none;
          display: block;
        }

        .carousel-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          will-change: transform, opacity;
          cursor: grab;
        }
        
        .carousel-img:active {
          cursor: grabbing;
        }

      `}</style>

      <div className="carousel-container">
        {/* Dummy image to establish natural responsive height */}
        <ProtectedImage useNative
          src={images[0]} 
          alt="Spacer" 
          className="carousel-dummy-img" 
        />
        
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 }
            }}
            className="carousel-img"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <ProtectedImage useNative
              src={images[currentIndex]}
              alt={`Carousel Image ${currentIndex + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              blockInteraction={false} // Since we want framer-motion drag to work
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2vw',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(0,0,0,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {images.map((_, i) => (
            <button 
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s ease, transform 0.2s ease',
                transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                pointerEvents: 'auto',
                cursor: 'pointer',
                border: 'none',
                padding: 0
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (i === currentIndex) return;
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
