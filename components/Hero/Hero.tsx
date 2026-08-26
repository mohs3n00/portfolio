'use client';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax Setup (temporarily disabled scale during static validation, just mapping motion)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const factor = innerWidth < 768 ? 0.3 : 1;
      mouseX.set(((e.clientX / innerWidth) * 2 - 1) * factor);
      mouseY.set(((e.clientY / innerHeight) * 2 - 1) * factor);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 40, stiffness: 50, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Keeping parallax very subtle
  const skyX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const skyY = useTransform(smoothY, [-1, 1], [-10, 10]);
  
  const cloudX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const cloudY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const typoX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const typoY = useTransform(smoothY, [-1, 1], [-30, 30]);

  const starX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const starY = useTransform(smoothY, [-1, 1], [-30, 30]);

  const mohamedX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const mohamedY = useTransform(smoothY, [-1, 1], [-45, 45]);

  const boxX = useTransform(smoothX, [-1, 1], [-60, 60]);
  const boxY = useTransform(smoothY, [-1, 1], [-60, 60]);

  const windX = useTransform(smoothX, [-1, 1], [-90, 90]);
  const windY = useTransform(smoothY, [-1, 1], [-90, 90]);

  const stickerX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const stickerY = useTransform(smoothY, [-1, 1], [-35, 35]);

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      
      {/* The single shared scene canvas */}
      <div className={`${styles.sceneCanvas}`}>

        {/* 1. SKY */}
        <motion.div className={`${styles.layer} ${styles.layerSky}`} style={{ x: skyX, y: skyY }}>
          <Image src="/images/hero-new/sky.webp" alt="Sky" fill className={styles.imageAsset} priority />
        </motion.div>

        {/* 2. CLOUDS */}
        <motion.div className={`${styles.layer} ${styles.layerClouds}`} style={{ x: cloudX, y: cloudY }}>
          <div className={`${styles.cloud} ${styles.cloud1}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} loading="eager" />
          </div>
          <div className={`${styles.cloud} ${styles.cloud2}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} loading="eager" />
          </div>
          <div className={`${styles.cloud} ${styles.cloud3}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} loading="eager" />
          </div>
          <div className={`${styles.cloud} ${styles.cloud4}`}>
            <Image src="/images/hero-new/cloud.webp" alt="Cloud" fill className={styles.imageAsset} loading="eager" />
          </div>
        </motion.div>

        {/* 3. PORTFOLIO TYPOGRAPHY */}
        <motion.div className={`${styles.layer} ${styles.layerTypo}`} style={{ x: typoX, y: typoY }}>
          {/* Faint base */}
          <Image src="/images/hero-new/typo.webp" alt="Portfolio" fill className={styles.imageAsset} priority />
          {/* Liquid filled portion */}
          <div className={styles.typoFilled}>
              <div className={styles.typoLiquidContainer}>
                  <div className={styles.typoLiquidWave2}></div>
                  <div className={styles.typoLiquidWave}></div>
              </div>
          </div>
        </motion.div>

        {/* 4. STARS */}
        <motion.div className={`${styles.layer} ${styles.layerStars}`} style={{ x: starX, y: starY }}>
          <div className={`${styles.star} ${styles.starLeft}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 7.5L22 8l-6.5 5 2.5 7.5L12 16l-6 4.5 2.5-7.5L2 8l7.5-.5L12 0z"/></svg>
          </div>
          <div className={`${styles.star} ${styles.starRight}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 7.5L22 8l-6.5 5 2.5 7.5L12 16l-6 4.5 2.5-7.5L2 8l7.5-.5L12 0z"/></svg>
          </div>
        </motion.div>

        {/* 4.5 STICKERS */}
        <motion.div className={`${styles.layer} ${styles.layerStickers}`} style={{ x: stickerX, y: stickerY, zIndex: 12 }}>
          <motion.div className={`${styles.heroSticker} ${styles.stickerCoffee}`} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <Image src="/images/stickers/coffee-cup.webp" alt="" width={120} height={120} style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }} loading="eager" />
          </motion.div>
          
          <motion.div className={`${styles.heroSticker} ${styles.stickerSmiley}`} animate={{ y: [0, 15, 0], rotate: [-10, 5, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            <Image src="/images/stickers/smiley.webp" alt="" width={100} height={100} style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }} loading="eager" />
          </motion.div>

          <motion.div className={`${styles.heroSticker} ${styles.stickerRockOn}`} animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
            <Image src="/images/stickers/rock-on.webp" alt="" width={140} height={140} style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }} loading="eager" />
          </motion.div>

          <motion.div className={`${styles.heroSticker} ${styles.stickerPlanet}`} animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <Image src="/images/stickers/planet.webp" alt="" width={110} height={110} style={{ objectFit: 'contain', filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))' }} loading="eager" />
          </motion.div>
        </motion.div>

        {/* 5. MOHAMED */}
        <motion.div className={`${styles.layer} ${styles.layerMohamed}`} style={{ x: mohamedX, y: mohamedY }}>
          <Image src="/images/hero-new/me.webp" alt="Mohamed" fill className={styles.imageAsset} priority />
        </motion.div>

        {/* 6. BOX */}
        <motion.div className={`${styles.layer} ${styles.layerBox}`} style={{ x: boxX, y: boxY }}>
          <Image src="/images/hero-new/box.webp" alt="Box" fill className={styles.imageAsset} priority />
        </motion.div>

        {/* 7. WIND / PAPER */}
        <motion.div className={`${styles.layer} ${styles.layerWind}`} style={{ x: windX, y: windY }}>
          <div className={`${styles.paper} ${styles.paper1}`}></div>
          <div className={`${styles.paper} ${styles.paper2}`}></div>
          <div className={`${styles.paper} ${styles.paper3}`}></div>
          <div className={`${styles.paper} ${styles.paper4}`}></div>
          <div className={`${styles.paper} ${styles.paper5}`}></div>
          <div className={`${styles.paper} ${styles.paper6}`}></div>
        </motion.div>

      </div>
    </section>
  );
}
