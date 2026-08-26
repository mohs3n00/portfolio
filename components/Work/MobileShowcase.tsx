'use client';
import React from 'react';
import styles from './Showcases.module.css';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export interface MobileShowcaseProps {
  screenshots: string[];
  projectTitle: string;
}

export default function MobileShowcase({ screenshots, projectTitle }: MobileShowcaseProps) {
  // If no screenshots, we simply render the empty frame
  const images = screenshots || [];

  return (
    <div className={styles.phoneFrame}>
      {/* Notch */}
      <div className={styles.phoneNotch}></div>

      {/* Screen Content - Continuous Vertical Scroll */}
      <div className={styles.phoneContent}>
        {images.map((src, i) => (
          <ProtectedImage useNative
            key={i} 
            src={src} 
            className={styles.scrollableImage} 
            alt={`${projectTitle} screenshot ${i + 1}`} 
            loading="lazy" 
            onError={(e: any) => {
              console.warn(`Missing screenshot: ${src}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
}
