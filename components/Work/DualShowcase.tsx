'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Showcases.module.css';
import WebShowcase from './WebShowcase';
import MobileShowcase from './MobileShowcase';

export interface DualShowcaseProps {
  webScreenshots: string[];
  mobileScreenshots: string[];
  projectTitle: string;
}

export default function DualShowcase({ webScreenshots, mobileScreenshots, projectTitle }: DualShowcaseProps) {
  const [activeView, setActiveView] = React.useState<'web' | 'mobile'>('web');

  const transitionConfig = { duration: 0.3, ease: 'easeOut' };

  return (
    <div className={styles.dualContainer}>
      <div className={styles.toggleContainer}>
        <button 
          className={`${styles.toggleBtn} ${activeView === 'web' ? styles.active : ''}`}
          onClick={() => setActiveView('web')}
          aria-pressed={activeView === 'web'}
        >
          WEB
        </button>
        <button 
          className={`${styles.toggleBtn} ${activeView === 'mobile' ? styles.active : ''}`}
          onClick={() => setActiveView('mobile')}
          aria-pressed={activeView === 'mobile'}
        >
          MOBILE
        </button>
      </div>

      <div className={styles.previewSlot}>
        <AnimatePresence mode="wait">
          {activeView === 'web' ? (
            <motion.div
              key="web-view"
              className={styles.viewWrapper}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={transitionConfig}
            >
              <WebShowcase screenshots={webScreenshots} projectTitle={`${projectTitle} Web`} />
            </motion.div>
          ) : (
            <motion.div
              key="mobile-view"
              className={styles.viewWrapper}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={transitionConfig}
            >
              <MobileShowcase screenshots={mobileScreenshots} projectTitle={`${projectTitle} Mobile`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
