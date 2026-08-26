'use client';

import React from 'react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function InkMilkCaseStudy() {
  const images = [
    '/images/projects/inkmilk/1.jpg',
    '/images/projects/inkmilk/2.jpg',
    '/images/projects/inkmilk/3.jpg'
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
        backgroundColor: '#020202' // Dark fallback behind images
      }}
    >
      <style>{`
        .inkmilk-image {
          width: 85vw;
          max-width: 1200px;
          height: auto;
          display: block;
          margin: 0;
          padding: 0;
        }
        @media (min-width: 768px) {
          .inkmilk-image {
            width: 80vw;
          }
        }
        @media (min-width: 1024px) {
          .inkmilk-image {
            width: 75vw;
            max-width: 1100px;
          }
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
