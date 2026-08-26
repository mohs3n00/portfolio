// @ts-nocheck
'use client';
import { useEffect, useRef } from 'react';

interface LiquidLinesProps {
  color?: string;
  lineCount?: number;
  speed?: number;
  backgroundColor?: string;
}

export default function LiquidLines({ 
  color = 'rgba(255, 255, 255, 0.08)', 
  lineCount = 12,
  speed = 0.0002,
  backgroundColor = '#05050F'
}: LiquidLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let time = 0;

    const draw = (ts: number) => {
      if (reducedMotion.current) return;
      time = ts * speed;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        
        // Vertical lines with horizontal liquid distortion
        for (let y = -100; y <= height + 100; y += 40) {
          // Complex sine wave interference pattern for liquid feel
          const xOffset = 
            Math.sin(y * 0.005 + time + i * 0.4) * 80 +
            Math.sin(y * 0.01 - time * 1.2 + i * 0.2) * 40;
          
          const baseY = y;
          const baseX = (width / (lineCount + 1)) * (i + 1) + xOffset;

          if (y === -100) {
            ctx.moveTo(baseX, baseY);
          } else {
            // Smooth curve
            ctx.quadraticCurveTo(baseX, baseY, baseX, baseY + 20);
          }
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reducedMotion.current) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw(0);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, lineCount, speed]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.6,
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />
      {/* Vignette mask to fade out lines at edges */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${backgroundColor} 100%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
