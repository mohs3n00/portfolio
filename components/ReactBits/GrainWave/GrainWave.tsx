// @ts-nocheck
'use client';
import { useEffect, useRef } from 'react';

interface GrainWaveProps {
  intensity?: 'subtle' | 'medium' | 'dark' | 'hero';
  className?: string;
}

export default function GrainWave({ intensity = 'medium', className = '' }: GrainWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Determine alpha range based on intensity
    let alphaBase = 4;
    let alphaRange = 12;
    if (intensity === 'subtle') {
      alphaBase = 2;
      alphaRange = 8;
    } else if (intensity === 'dark') {
      alphaBase = 6;
      alphaRange = 18;
    } else if (intensity === 'hero') {
      alphaBase = 10;
      alphaRange = 24;
    }

    let width = 0;
    let height = 0;
    let imgData: ImageData | null = null;
    let buffer: Uint8ClampedArray | null = null;

    const resize = () => {
      // Render at half resolution for performance, scale up via CSS
      width = Math.ceil(window.innerWidth / 2);
      height = Math.ceil(window.innerHeight / 2);
      canvas.width = width;
      canvas.height = height;
      imgData = ctx.createImageData(width, height);
      buffer = imgData.data;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastDraw = 0;
    const draw = (ts: number) => {
      if (reducedMotion.current) return;
      
      // Throttle to ~24fps for filmic look
      if (ts - lastDraw < 41) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDraw = ts;

      if (!buffer || !imgData) return;
      const len = buffer.length;

      // Generate monochrome noise with variable alpha
      for (let i = 0; i < len; i += 4) {
        const v = (Math.random() * 255) | 0;
        buffer[i] = v;
        buffer[i + 1] = v;
        buffer[i + 2] = v;
        buffer[i + 3] = (Math.random() * alphaRange + alphaBase) | 0;
      }

      ctx.putImageData(imgData, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reducedMotion.current) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Draw static frame if reduced motion
      draw(0);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        mixBlendMode: 'overlay',
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          opacity: 0.8,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
