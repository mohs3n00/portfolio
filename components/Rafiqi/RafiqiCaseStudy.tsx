'use client';

import styles from './RafiqiCaseStudy.module.css';

import TypographyIntro from './TypographyIntro';
import WebHero from './WebHero';
import ColorSystem from './ColorSystem';
import BrandStory from './BrandStory';
import LogoSystem from './LogoSystem';
import MerchAndProducts from './MerchAndProducts';
import BrandApplication from './BrandApplication';
import FixedArtboard from '../FixedArtboard/FixedArtboard';

export default function RafiqiCaseStudy() {
  return (
    <div className={styles.page}>
      
      <section className={`${styles.scene} ${styles.sceneDark}`} style={{ position: 'relative' }}>
        <FixedArtboard artboardWidth={1400}><TypographyIntro /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <FixedArtboard artboardWidth={1400}><WebHero /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneLight}`}>
        <FixedArtboard artboardWidth={1400}><ColorSystem /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <FixedArtboard artboardWidth={1400}><BrandStory /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneLight}`}>
        <FixedArtboard artboardWidth={1400}><LogoSystem /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <FixedArtboard artboardWidth={1400}><MerchAndProducts /></FixedArtboard>
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <FixedArtboard artboardWidth={1400}><BrandApplication /></FixedArtboard>
      </section>
    </div>
  );
}
