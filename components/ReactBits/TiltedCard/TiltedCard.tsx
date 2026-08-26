// @ts-nocheck
'use client';
import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltedCard({ children, className = '' }: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for rotation
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation angles (max 15 degrees)
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative'
        }}
      >
        {children}
        
        {/* Glare effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            x: useTransform(x, [-100, 100], [-50, 50]),
            y: useTransform(y, [-100, 100], [-50, 50]),
            borderRadius: 'inherit'
          }}
        />
      </motion.div>
    </motion.div>
  );
}
