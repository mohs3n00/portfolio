'use client';
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './ProjectShowcase.module.css';
import WebShowcase from './WebShowcase';
import MobileShowcase from './MobileShowcase';
import DualShowcase from './DualShowcase';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  icon: string;
  url?: string;
  type?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  showcaseType: 'web' | 'mobile' | 'dual';
  webScreenshots?: string[];
  mobileScreenshots?: string[];
}

export type Trajectory = {
  x: string[];
  y: string[];
  rotate?: number[];
  duration: number;
  delay?: number;
  scaleClass?: string;
};

export type StickerConfig = {
  src: string;
  width: number;
  height: number;
  positionClass?: string;
  rotation?: number;
  entranceDelay?: number;
  animationType?: 'fadeScale' | 'slideUp' | 'float';
  isFlying?: boolean;
  trajectory?: Trajectory;
  floatDuration?: number;
};

export interface ProjectShowcaseProps {
  project: ProjectData;
  alignment?: 'alignLeft' | 'alignRight' | 'alignCenter';
  clouds?: CloudConfig[];
  stickers?: StickerConfig[];
}

// Stagger variants for the info column
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProjectShowcase({ 
  project, 
  alignment = 'alignLeft',
  clouds = [],
  stickers = []
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const gridClass = alignment === 'alignRight' ? styles.alignRight : '';

  return (
    <div id={`project-${project.id}`} ref={containerRef} className={styles.sceneContainer}>
      <div className={styles.container}>
        
        {/* LAYER 1: CLOUDS (Background) */}
        <div className={styles.atmosphericLayer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          {!prefersReducedMotion && clouds.map((c, i) => (
            <motion.div
              key={`cloud-${i}`}
              className={styles.ambientWrapper}
              initial={{ x: c.x[0], y: c.y[0] }}
              animate={{ x: c.x, y: c.y }}
              transition={{
                duration: c.duration,
                delay: c.delay || 0,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ opacity: c.opacity || 1, zIndex: c.depth || 0 }}
            >
              <img 
                src={c.src} 
                alt="" 
                style={{ width: c.width || '40vw', minWidth: '300px', objectFit: 'contain' }} 
                loading="lazy" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          ))}

          {/* FLYING STICKERS */}
          {!prefersReducedMotion && stickers.filter(s => s.isFlying && s.trajectory).map((sticker, index) => {
            const t = sticker.trajectory!;
            return (
              <motion.div
                key={`flying-sticker-${index}`}
                className={`${styles.ambientWrapper} ${styles[t.scaleClass || '']}`}
                initial={{ x: t.x[0], y: t.y[0], rotate: t.rotate ? t.rotate[0] : 0 }}
                animate={{ x: t.x, y: t.y, rotate: t.rotate || 0 }}
                transition={{
                  duration: t.duration,
                  delay: t.delay || 0,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ zIndex: 5 }}
              >
                <img 
                  src={sticker.src} 
                  alt="" 
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LAYER 3: PROJECT ENVIRONMENT & CONTENT */}
      <div className={styles.compositionWrapper}>
        
        <div className={`${styles.sceneGrid} ${gridClass}`}>
          
          {/* LAYER 2: STATIC DECORATIVE STICKERS (Relative to Content) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
            {stickers.filter(s => !s.isFlying).map((sticker, index) => (
              <motion.div
                key={index}
                className={`${styles.ambientWrapper} ${styles.projectSticker} ${sticker.positionClass ? styles[sticker.positionClass] : ''}`}
                style={{
                  width: sticker.width,
                  height: sticker.height,
                }}
                initial={{ opacity: 0, scale: 0.5, rotate: (sticker.rotation || 0) - 15 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: prefersReducedMotion ? (sticker.rotation || 0) : [sticker.rotation || 0, (sticker.rotation || 0) + 1, sticker.rotation || 0],
                  y: prefersReducedMotion ? 0 : [0, -3, 0],
                  x: prefersReducedMotion ? 0 : [0, 2, 0]
                } : {}}
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 + (sticker.entranceDelay || 0) },
                  scale: { type: 'spring', damping: 15, delay: 0.2 + (sticker.entranceDelay || 0) },
                  rotate: prefersReducedMotion ? {} : {
                    duration: (sticker.floatDuration || 6) * 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  },
                  y: prefersReducedMotion ? {} : {
                    duration: sticker.floatDuration || 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  },
                  x: prefersReducedMotion ? {} : {
                    duration: (sticker.floatDuration || 6) * 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  }
                }}
              >
                <img 
                  src={sticker.src} 
                  alt="" 
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </motion.div>
            ))}
          </div>

          {/* INFO COLUMN */}
          <motion.div 
            className={styles.infoColumn}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.div variants={itemVariants} className={styles.projectIcon}>
              <img 
                src={project.icon} 
                alt={`${project.title} project icon`} 
                onError={(e) => {
                  console.warn(`Missing project icon: ${project.icon}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <span className={styles.projectType}>{project.type}</span>
              <h3 className={styles.projectTitle}>{project.title}</h3>
            </motion.div>
            
            <motion.p variants={itemVariants} className={styles.projectDescription}>
              {project.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className={styles.techStack}>
              {project.techStack.map((tech, i) => (
                <span key={i} className={styles.techPill}>{tech}</span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <a 
                href={project.liveUrl || project.caseStudyUrl || project.githubUrl || project.url || "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
                aria-label={`Visit project ${project.title}`}
              >
                {project.liveUrl || project.showcaseType === 'web' || project.showcaseType === 'dual' ? 'VISIT PROJECT ↗' : 'VIEW ON GITHUB ↗'}
              </a>
            </motion.div>
          </motion.div>

          {/* SHOWCASE COLUMN */}
          <motion.div 
            className={styles.showcaseColumn}
            initial={{ opacity: 0, x: alignment === 'alignRight' ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Interactive Showcase Router */}
            {project.showcaseType === 'web' && (
              <WebShowcase 
                screenshots={project.webScreenshots || []} 
                projectTitle={project.title} 
              />
            )}
            {project.showcaseType === 'mobile' && (
              <MobileShowcase 
                screenshots={project.mobileScreenshots || []} 
                projectTitle={project.title}
              />
            )}
            {project.showcaseType === 'dual' && (
              <DualShowcase 
                webScreenshots={project.webScreenshots || []} 
                mobileScreenshots={project.mobileScreenshots || []} 
                projectTitle={project.title}
              />
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
