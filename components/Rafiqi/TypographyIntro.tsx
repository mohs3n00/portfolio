'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TypographyIntro() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // Force a complete reset of the animation every 4.5 seconds for a perfect loop
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: '900px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Container acting as the mask using the typography image */}
      <div style={{
        position: 'relative',
        width: '1152px',
        maxWidth: '900px',
        height: '576px',
        maxHeight: '400px',
        WebkitMaskImage: 'url(/images/projects/rafiqi/typografy.webp)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/images/projects/rafiqi/typografy.webp)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        // Fallback color if liquid doesn't cover everything
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      }}>
        
        {/* Calligraphy Write-on Effect (After Effects Style) */}
        <svg 
          key={`loop-${tick}`}
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 400" 
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
        >
          {/* First Fill (White - High Contrast Leader) */}
          <motion.path 
            d="M 950,150 Q 850,350 750,200 Q 650,50 550,200 Q 400,350 250,200 Q 150,100 50,250"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="350"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ 
              pathLength: [0, 1, 1, 1],
              opacity: [1, 1, 1, 0]
            }}
            transition={{ 
              duration: 4.5, 
              ease: ["easeInOut", "linear", "easeInOut"],
              times: [0, 0.45, 0.8, 1]
            }}
          />

          {/* Second Fill (Primary Green - Final Shape) */}
          <motion.path 
            d="M 950,150 Q 850,350 750,200 Q 650,50 550,200 Q 400,350 250,200 Q 150,100 50,250"
            fill="none"
            stroke="#05FB8E"
            strokeWidth="350"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ 
              pathLength: [0, 0, 1, 1, 1],
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{ 
              duration: 4.5, 
              ease: ["linear", "easeInOut", "linear", "easeInOut"],
              times: [0, 0.15, 0.6, 0.8, 1]
            }}
          />
        </svg>
        
        {/* Faint static version overlaid so the original texture/details aren't lost if any */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url(/images/projects/rafiqi/typografy.webp)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          mixBlendMode: 'overlay',
          pointerEvents: 'none'
        }} />

      </div>
    </div>
  );
}
