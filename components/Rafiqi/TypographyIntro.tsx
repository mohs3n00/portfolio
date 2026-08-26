'use client';

import { motion } from 'framer-motion';

export default function TypographyIntro() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Container acting as the mask using the typography image */}
      <div style={{
        position: 'relative',
        width: '80vw',
        maxWidth: '900px',
        height: '40vw',
        maxHeight: '400px',
        WebkitMaskImage: 'url(/images/projects/rafiqi/typografy.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/images/projects/rafiqi/typografy.png)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        // Fallback color if liquid doesn't cover everything
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      }}>
        
        {/* Liquid Layer 1 (Background slow wave) */}
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            backgroundColor: '#03C770', /* Slightly darker green */
            borderRadius: '40%', // Creates the organic wave shape
            filter: 'blur(8px)',
          }}
          animate={{
            rotate: [0, 360],
            y: ['20%', '-10%', '20%']
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            y: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
          }}
        />

        {/* Liquid Layer 2 (Foreground fast wave) */}
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '-40%',
            left: '-40%',
            width: '180%',
            height: '180%',
            backgroundColor: '#05FB8E', /* Primary Green */
            borderRadius: '45%',
          }}
          animate={{
            rotate: [360, 0],
            y: ['10%', '-20%', '10%']
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            y: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        
        {/* Faint static version overlaid so the original texture/details aren't lost if any */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url(/images/projects/rafiqi/typografy.png)',
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
