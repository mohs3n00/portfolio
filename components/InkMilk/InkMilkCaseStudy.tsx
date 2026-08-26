'use client';

import React from 'react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function InkMilkCaseStudy() {
  const images = [
    '/images/projects/inkmilk/1.webp',
    '/images/projects/inkmilk/2.webp',
    '/images/projects/inkmilk/3.webp'
  ];

  return (
    <section 
      style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', // Center images horizontally
        margin: 0, 
        padding: 0, 
        gap: 0,
        backgroundColor: 'var(--deep-cobalt)' // Dark fallback behind images
      }}
    >
      <style>{`
        .inkmilk-image {
          width: 100%;
          max-width: 1200px;
          height: auto;
          display: block;
          margin: 0;
          padding: 0;
        }
      `}</style>

      {images.map((src, index) => (
        <ProtectedImage useNative
          key={index}
          src={src} 
          alt={`INKMILK Presentation Panel ${index + 1}`} 
          className="inkmilk-image"
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </section>
  );
}
