'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import TiltedCard from '@/components/ReactBits/TiltedCard/TiltedCard';
import Image from 'next/image';
import styles from './About.module.css';

const capabilities = [
  'Product Design', 'UI Systems', 'Design Tokens',
  'React / Next.js', 'TypeScript', 'Motion Design',
  'Brand Identity', 'Figma', 'Visual Direction',
];

const tools = ['Figma', 'VS Code', 'Next.js', 'Framer', 'Illustrator', 'Photoshop'];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // 1. Scene Parallax Setup (matching Hero's logic)
  const sceneMouseX = useMotionValue(0);
  const sceneMouseY = useMotionValue(0);

  useEffect(() => {
    const handleSceneMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      sceneMouseX.set((e.clientX / innerWidth) * 2 - 1);
      sceneMouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleSceneMouseMove);
    return () => window.removeEventListener('mousemove', handleSceneMouseMove);
  }, [sceneMouseX, sceneMouseY]);

  const springConfig = { damping: 40, stiffness: 50, mass: 1 };
  const smoothX = useSpring(sceneMouseX, springConfig);
  const smoothY = useSpring(sceneMouseY, springConfig);

  // Parallax transforms for Sky and Clouds
  const skyX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const skyY = useTransform(smoothY, [-1, 1], [-5, 5]);
  
  const cloudX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const cloudY = useTransform(smoothY, [-1, 1], [-15, 15]);


  // 2. Local mouse for subtle portrait parallax (kept from original About)
  const localMouseX = useMotionValue(0.5);
  const localMouseY = useMotionValue(0.5);

  const springLocalX = useSpring(localMouseX, { stiffness: 40, damping: 20 });
  const springLocalY = useSpring(localMouseY, { stiffness: 40, damping: 20 });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    localMouseX.set(x);
    localMouseY.set(y);
  };

  const handlePortraitMouseLeave = () => {
    localMouseX.set(0.5);
    localMouseY.set(0.5);
  };
  
  // Very subtle image scale/parallax
  const imgScale = useTransform(springLocalY, [0, 1], [1.01, 1.0]);
  const imgX = useTransform(springLocalX, [0, 1], [-2, 2]);
  const imgY = useTransform(springLocalY, [0, 1], [-2, 2]);

  return (
    <section 
      id="about" 
      ref={ref} 
      className={styles.section}
    >
      {/* Background Scene (Matching Hero) */}
      <div className={styles.sceneCanvas}>
        {/* SKY */}
        <motion.div className={`${styles.layer} ${styles.layerSky}`} style={{ x: skyX, y: skyY }}>
          <Image src="/images/hero-new/sky.webp" alt="Sky Background" fill className={styles.imageAsset} priority />
        </motion.div>

        {/* CLOUDS */}
        <motion.div className={`${styles.layer} ${styles.layerClouds}`} style={{ x: cloudX, y: cloudY }}>
          <div className={`${styles.cloud} ${styles.cloud1}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} />
          </div>
          <div className={`${styles.cloud} ${styles.cloud2}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} />
          </div>
          <div className={`${styles.cloud} ${styles.cloud3}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} />
          </div>
        </motion.div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className={styles.inner}>
          {/* Left — text */}
          <div className={styles.textCol}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <span className="text-label" style={{ color: '#64748b' }}>About</span>
              <h2 className={styles.title}>
                DESIGNER<br />
                BY<br />
                <span className={styles.titleAccent}>FOUNDATION.</span>
              </h2>
            </motion.div>

            <motion.div
              className={styles.body}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16,1,0.3,1] }}
            >
              <p>
                I am a UI/UX designer and front-end developer building digital products where visual intelligence meets technical execution.
              </p>
              <p>
                With a foundation in graphic design, I prioritize typography, hierarchy, and visual rhythm before writing a single line of code. Combining this with my development expertise allows me to build end-to-end experiences that feel premium from the inside out.
              </p>
              <p className={styles.tagline}>
                Designer by foundation.<br />
                Developer by craft.<br />
                Builder by practice.
              </p>
            </motion.div>

            {/* Capabilities */}
            <motion.div
              className={styles.caps}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-label" style={{ marginBottom: '1rem', color: '#64748b' }}>Capabilities</p>
              <div className={styles.capsList}>
                {capabilities.map(c => (
                  <span key={c} className={styles.cap}>{c}</span>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              className={styles.toolsWrap}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16,1,0.3,1] }}
            >
              <p className="text-label" style={{ marginBottom: '1rem', color: '#64748b' }}>Tools</p>
              <div className={styles.tools}>
                {tools.map(t => (
                  <span key={t} className={styles.tool}>{t}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.22, ease: [0.16,1,0.3,1] }}
          >
            {/* Tilted interactive portrait card */}
            <TiltedCard className={styles.portrait}>
              <div 
                className={styles.portraitInner}
                onMouseMove={handlePortraitMouseMove}
                onMouseLeave={handlePortraitMouseLeave}
              >
                {/* Base Image with subtle parallax */}
                <motion.div 
                  className={styles.portraitImgWrap}
                  style={{ x: imgX, y: imgY, scale: imgScale }}
                >
                  <Image 
                    src="/images/about/me.webp" 
                    alt="Mohsen - Designer & Developer" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                  {/* Subtle atmospheric overlay */}
                  <div className={styles.gradeOverlay} />
                </motion.div>
              </div>
            </TiltedCard>

            {/* Floating stat cards */}
            <div className={`${styles.statCard} ${styles.statCard1}`}>
              <span className={styles.statNum}>7+</span>
              <span className={styles.statLabel}>Projects shipped</span>
            </div>
            <div className={`${styles.statCard} ${styles.statCard2}`}>
              <span className={styles.statNum}>UI/UX</span>
              <span className={styles.statLabel}>Designer & Developer</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
