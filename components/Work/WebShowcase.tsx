'use client';
import React from 'react';
import styles from './Showcases.module.css';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export interface WebShowcaseProps {
  screenshots: string[];
  projectTitle: string;
}

export default function WebShowcase({ screenshots, projectTitle }: WebShowcaseProps) {
  const images = screenshots || [];

  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserHeader}>
        <div className={`${styles.macDot} ${styles.macDotRed}`} />
        <div className={`${styles.macDot} ${styles.macDotYellow}`} />
        <div className={`${styles.macDot} ${styles.macDotGreen}`} />
      </div>
      {/* Browser Content - Continuous Vertical Scroll */}
      <div className={styles.browserContent}>
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
