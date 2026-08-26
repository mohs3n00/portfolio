'use client';

import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

type BeeConfig = {
  id: string;
  startX: string; // percentage string
  startY: string; // percentage string
  scale: number;
  flip: boolean; // if true, facing left (since original is likely facing right)
  blur: number; // motion blur amount in px
  depthBlur: number; // depth of field blur in px
  duration: number; // seconds
  delay: number; // seconds
  zIndex: number;
  xKeyframes: number[]; // relative movement in px
  yKeyframes: number[]; // relative movement in px
  rotateKeyframes: number[];
  wingSpeed: number; // duration for buzz flutter
};

// Art-directed distribution based on constraints
const bees: BeeConfig[] = [
  {
    // Bee 01: high + far left, small left-to-right arc
    id: 'bee-1',
    startX: '12%',
    startY: '20%',
    scale: 0.65, // Background/Midground
    flip: false,
    blur: 0.8,
    depthBlur: 1,
    duration: 22,
    delay: -5,
    zIndex: 1,
    xKeyframes: [0, 80, 160, 80, 0],
    yKeyframes: [0, -25, 10, -10, 0],
    rotateKeyframes: [-5, 8, 2, -5],
    wingSpeed: 0.05
  },
  {
    // Bee 02: low + center, gentle upward curve
    id: 'bee-2',
    startX: '48%',
    startY: '75%',
    scale: 1.1, // Foreground
    flip: true, // facing left
    blur: 2.5, // slightly faster moving
    depthBlur: 0, // sharp foreground
    duration: 18,
    delay: -12,
    zIndex: 4,
    xKeyframes: [0, -70, -120, -50, 0],
    yKeyframes: [0, -60, -20, 20, 0],
    rotateKeyframes: [12, -8, 5, 12],
    wingSpeed: 0.04
  },
  {
    // Bee 03: high + right, right-to-left drift
    id: 'bee-3',
    startX: '82%',
    startY: '15%',
    scale: 0.5, // Deep Background
    flip: true,
    blur: 0.5,
    depthBlur: 2, // soft
    duration: 28,
    delay: -2,
    zIndex: 1,
    xKeyframes: [0, -140, -220, -100, 0],
    yKeyframes: [0, 15, -15, 5, 0],
    rotateKeyframes: [5, -5, 0, 5],
    wingSpeed: 0.06
  },
  {
    // Bee 04: closer to viewer + left, subtle diagonal movement
    id: 'bee-4',
    startX: '25%',
    startY: '60%',
    scale: 1.4, // Very Foreground
    flip: false,
    blur: 3.5, // fastest / largest
    depthBlur: 0,
    duration: 15,
    delay: -8,
    zIndex: 5,
    xKeyframes: [0, 160, 280, 140, 0],
    yKeyframes: [0, 80, -30, 40, 0],
    rotateKeyframes: [-15, 0, 12, -15],
    wingSpeed: 0.03
  },
  {
    // Bee 05: farther away + center-right, short looping path
    id: 'bee-5',
    startX: '65%',
    startY: '35%',
    scale: 0.8, // Midground
    flip: false,
    blur: 1.2,
    depthBlur: 0.5,
    duration: 20,
    delay: -17,
    zIndex: 2,
    xKeyframes: [0, 50, -10, -60, 0],
    yKeyframes: [0, 40, 80, 30, 0],
    rotateKeyframes: [0, 20, -15, 0],
    wingSpeed: 0.045
  },
  {
    // Bee 06: low + far right, gentle downward curve
    id: 'bee-6',
    startX: '88%',
    startY: '65%',
    scale: 0.9, // Midground
    flip: true,
    blur: 1.5,
    depthBlur: 0,
    duration: 19,
    delay: -4,
    zIndex: 3,
    xKeyframes: [0, -80, -150, -60, 0],
    yKeyframes: [0, 40, 15, -15, 0],
    rotateKeyframes: [18, 0, -12, 18],
    wingSpeed: 0.04
  }
];

const Bee = ({
  bee,
  smoothMouseX,
  smoothMouseY,
  scrollYProgress
}: {
  bee: BeeConfig;
  smoothMouseX: any;
  smoothMouseY: any;
  scrollYProgress: any;
}) => {
  // Parallax based on scale (foreground moves more)
  const parallaxX = useTransform(smoothMouseX, [-1, 1], [bee.scale * -25, bee.scale * 25]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [bee.scale * -25, bee.scale * 25]);

  // Scroll depth shift (subtle vertical shift when scrolling)
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, bee.scale * -60]);

  const blurX = bee.blur + bee.depthBlur;
  const blurY = bee.depthBlur;
  const hasFilter = blurX > 0 || blurY > 0;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: bee.startX,
        top: bee.startY,
        zIndex: bee.zIndex,
        x: parallaxX,
        y: scrollShift,
      }}
    >
      {/* Secondary layer for mouse parallax Y (to avoid merging hooks if unsupported) */}
      <motion.div style={{ y: parallaxY }}>
        <motion.div
          animate={{
            x: bee.xKeyframes,
            y: bee.yKeyframes,
            rotate: bee.rotateKeyframes,
          }}
          transition={{
            duration: bee.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bee.delay, // phase offset
          }}
        >
          {/* Wing / Body subtle flutter */}
          <motion.div
            animate={{
              y: [0, -1.5, 0, 1.5, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: bee.wingSpeed,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <img
              src="/images/projects/BEE.png"
              alt=""
              style={{
                width: '55px', // Base size, scaled below
                height: 'auto',
                transform: `scale(${bee.scale}) ${bee.flip ? 'scaleX(-1)' : ''}`,
                filter: hasFilter ? `url(#filter-${bee.id})` : 'none',
                opacity: 0.95, // slightly blend with environment
                transformOrigin: 'center center'
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function MeadowBees() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '-20%', // Extend slightly above meadow
        left: 0,
        width: '100%',
        height: '140%', // Cover meadow and airspace
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible'
      }}
    >
      {/* SVG Filters for directional motion blur + depth of field */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {bees.map(bee => {
            const blurX = bee.blur + bee.depthBlur;
            const blurY = bee.depthBlur;
            if (blurX === 0 && blurY === 0) return null;

            return (
              <filter key={`filter-def-${bee.id}`} id={`filter-${bee.id}`}>
                {/* Horizontal blur for motion + uniform blur for depth */}
                <feGaussianBlur in="SourceGraphic" stdDeviation={`${blurX} ${blurY}`} />
              </filter>
            );
          })}
        </defs>
      </svg>

      {bees.map((bee) => (
        <Bee
          key={bee.id}
          bee={bee}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
