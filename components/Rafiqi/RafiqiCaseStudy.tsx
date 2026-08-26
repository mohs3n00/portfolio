'use client';

import styles from './RafiqiCaseStudy.module.css';

import TypographyIntro from './TypographyIntro';
import WebHero from './WebHero';
import ColorSystem from './ColorSystem';
import BrandStory from './BrandStory';
import LogoSystem from './LogoSystem';
import MerchAndProducts from './MerchAndProducts';
import BrandApplication from './BrandApplication';

export default function RafiqiCaseStudy() {
  return (
    <div className={styles.page}>
      
      <section className={`${styles.scene} ${styles.sceneDark}`} style={{ position: 'relative' }}>
        <TypographyIntro />
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <WebHero />
      </section>

      <section className={`${styles.scene} ${styles.sceneLight}`}>
        <ColorSystem />
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <BrandStory />
      </section>

      <section className={`${styles.scene} ${styles.sceneLight}`}>
        <LogoSystem />
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <MerchAndProducts />
      </section>

      <section className={`${styles.scene} ${styles.sceneDark}`}>
        <BrandApplication />
      </section>
    </div>
  );
}
