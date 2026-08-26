'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';

interface FixedArtboardProps {
  children: React.ReactNode;
  artboardWidth?: number;
}

export default function FixedArtboard({ children, artboardWidth = 1440 }: FixedArtboardProps) {
  const artboardRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [artboardHeight, setArtboardHeight] = useState(0);

  // useLayoutEffect to prevent initial flicker if possible, fallback to useEffect
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScale = () => {
      const currentViewportWidth = window.innerWidth;
      setViewportWidth(currentViewportWidth);
      
      // Calculate the proportional scale based on the viewport width vs the fixed artboard width
      // The artboard scales DOWN on small screens, and UP on large screens.
      const newScale = currentViewportWidth / artboardWidth;
      setScale(newScale);
    };

    // Run immediately
    updateScale();

    // Re-run on window resize
    window.addEventListener('resize', updateScale);

    // Observe the true layout height of the desktop artboard
    let resizeObserver: ResizeObserver | null = null;
    if (artboardRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // borderBoxSize gives the physical rendered height of the box
          let h = 0;
          if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
            h = entry.borderBoxSize[0].blockSize;
          } else {
            h = entry.contentRect.height;
          }
          // Fallback to offsetHeight if ResizeObserver gives 0 (can happen for certain CSS setups)
          const finalHeight = h > 0 ? h : (artboardRef.current?.offsetHeight || 0);
          setArtboardHeight(finalHeight);
        }
      });
      resizeObserver.observe(artboardRef.current);
      // Initialize with offsetHeight immediately
      setArtboardHeight(artboardRef.current.offsetHeight);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [artboardWidth]);

  // The document-flow reserved height for the viewport wrapper
  const wrapperHeight = artboardHeight * scale;

  return (
    <div 
      className="viewport-wrapper"
      style={{ 
        width: '100%', 
        overflow: 'hidden',
        height: wrapperHeight > 0 ? `${wrapperHeight}px` : 'auto', // reserve calculated scaled height
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div 
        className="scaling-wrapper"
        style={{
          width: `${artboardWidth}px`,
          height: `${artboardHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          position: 'absolute', // Pulls it out of flow relative to viewport-wrapper
          top: 0,
          left: '50%',
          marginLeft: `-${artboardWidth / 2}px`
        }}
      >
        <div 
          ref={artboardRef}
          className="fixed-size-artboard"
          style={{
            width: `${artboardWidth}px`,
            position: 'relative' // Natural document flow inside the scaling wrapper
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
