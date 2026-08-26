'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const logoStates = [
  { id: 'state-1', src: '/images/projects/rafiqi/branding-rafiqi_04.gif', name: 'Primary Green' },
  { id: 'state-2', src: '/images/projects/rafiqi/branding-rafiqi_05.gif', name: 'White / Green' },
  { id: 'state-3', src: '/images/projects/rafiqi/branding-rafiqi_06.gif', name: 'Navy / Green' },
];

export default function LogoSystem() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div style={{ width: '100%', padding: '135px 0', minHeight: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>Identity System</h2>
        <h3 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Logo Variations</h3>
      </motion.div>

      {/* Interactive Logo Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          width: 'min(1400px, max(1224px, calc(1440px - 32px)))',
          aspectRatio: '16/9',
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          backgroundColor: '#f5f5f5' // subtle fallback
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={logoStates[currentIndex].src}
            alt={logoStates[currentIndex].name}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        </AnimatePresence>

        {/* Controls */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '15px',
          padding: '10px 20px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {logoStates.map((state, index) => (
            <button
              key={state.id}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '4px',
                backgroundColor: currentIndex === index ? '#05FB8E' : 'rgba(255,255,255,0.5)',
                transition: 'background-color 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label={`Switch to ${state.name}`}
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
