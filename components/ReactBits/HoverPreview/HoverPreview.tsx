// @ts-nocheck
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface HoverPreviewProps {
  children: React.ReactNode;
  imageUrl?: string;
  accentColor?: string;
  disabled?: boolean;
}

export default function HoverPreview({ 
  children, 
  imageUrl, 
  accentColor = '#00E5FF',
  disabled = false
}: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring config for smooth, non-bouncy follow
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);

  const rotateTransform = useTransform(x, [-100, 100], [-3, 3]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || motionReduced || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Relative to center of container
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    x.set(mouseX * 0.15);
    y.set(mouseY * 0.15);
    rotate.set(mouseX * 0.02);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotate.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* The main content */}
      {children}
      
      {/* The hover reveal layer */}
      <AnimatePresence>
        {isHovered && !motionReduced && imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: '-5%',
              zIndex: 10,
              pointerEvents: 'none',
              x,
              y,
              rotate: rotateTransform,
              transformOrigin: 'center center'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: `0 30px 60px -20px ${accentColor}40`,
              position: 'relative'
            }}>
              {/* Fake image logic for now, using a solid color/gradient + overlay */}
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, #111, ${accentColor}20, #05050f)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={imageUrl} 
                  alt="Project Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                  onError={(e) => {
                    // Fallback to text if no image
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
