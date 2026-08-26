'use client';
import styles from './Work.module.css';
import ProjectShowcase, { ProjectData } from './ProjectShowcase';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import MeadowBees from './MeadowBees';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export type StickerConfig = {
  src: string;
  width: number;
  height: number;
  positionClass?: string;
  rotation?: number;
  entranceDelay?: number;
  animationType?: 'fadeScale' | 'slideUp' | 'float';
  isFlying?: boolean;
  trajectory?: any;
  floatDuration?: number;
};

// Data model for the unified 4 presentations (5 local projects)
const projectsData: ProjectData[] = [
  { 
    id: "fazakkir", 
    title: "FAZAKKIR", 
    type: "Islamic Mobile Application",
    description: "A modern Islamic mobile app combining Quran, Tafsir, Hadith, Athkar and personalized daily worship tools. Features daily notifications, responsive UI, and offline caching.",
    techStack: ["Flutter", "Riverpod", "SQLite", "Supabase"],
    icon: "/images/projects/fazakkir_app.webp",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/showcase/fazakkir/screen1.webp",
      "/showcase/fazakkir/screen2.webp",
      "/showcase/fazakkir/screen3.webp",
      "/showcase/fazakkir/screen4.webp",
    ],
    githubUrl: "https://github.com/mohsen/fazakkir" 
  },
  { 
    id: "hodory", 
    title: "HODORY", 
    type: "Mobile Application",
    description: "Comprehensive attendance and student management mobile solution built with Flutter. Features profile management, scheduling, and calendar integrations.",
    techStack: ["Flutter", "Riverpod", "Node.js API"],
    icon: "/images/projects/Hodori.webp",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/showcase/hodory/screen5.webp",
      "/showcase/hodory/screen4.webp",
      "/showcase/hodory/screen3.webp",
      "/showcase/hodory/screen2.webp",
      "/showcase/hodory/screen1.webp"
    ],
    githubUrl: "https://github.com/mohs3n00/student-system"
  },
  { 
    id: "masarak", 
    title: "MASARAK", 
    type: "Web Platform + Mobile Application",
    description: "Integrated e-learning ecosystem for educational institutions. Provides seamless course consumption natively on mobile and advanced management tools on the web.",
    techStack: ["React", "Next.js", "Flutter", "Riverpod"],
    icon: "/images/projects/masarak.webp",
    showcaseType: "dual",
    webScreenshots: [
      "/images/projects/masarak-web/screen1.webp",
      "/images/projects/masarak-web/screen2.webp",
      "/images/projects/masarak-web/screen3.webp",
      "/images/projects/masarak-web/screen4.webp"
    ],
    mobileScreenshots: [
      "/images/projects/masarak-mobile/screen5.webp",
      "/images/projects/masarak-mobile/screen4.webp",
      "/images/projects/masarak-mobile/screen3.webp",
      "/images/projects/masarak-mobile/screen2.webp",
      "/images/projects/masarak-mobile/screen1.webp"
    ],
    liveUrl: "https://masarak.tech",
    githubUrl: "https://github.com/mohs3n00/masarak-app" 
  },
  { 
    id: "al-moltaqa", 
    title: "AL-MOLTAQA", 
    type: "Mobile Application",
    description: "Community-driven local mobile application providing localized news, community services, trips planning, and event directories.",
    techStack: ["Flutter", "Supabase", "Firebase"],
    icon: "/images/projects/ELMoltaqa.webp",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/images/projects/el-moltaqa/screen1.webp",
      "/images/projects/el-moltaqa/screen2.webp",
      "/images/projects/el-moltaqa/screen3.webp"
    ],
    githubUrl: "https://github.com/mohs3n00/el-moltaqa-app" 
  }
];

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section id="work" className={styles.section} ref={containerRef}>
      {/* Global Sky Video Atmosphere */}
      <video 
        ref={videoRef}
        src="/images/projects/sky-atmosphere.mp4" 
        className={styles.skyVideo} 
        loop 
        muted 
        playsInline 
        preload="metadata"
      />

      <div className={styles.content}>
        
        {/* ==============================================================
            TRANSITION: LOGO STRIP (PROJECT IDENTITY INDEX)
        ============================================================== */}
        <div className={styles.logoStripContainer}>
          <div className={styles.logoStripWrapper}>
            {projectsData.map((p, i) => (
              <a href={`#project-${p.id}`} key={`logo-${i}`} className={styles.logoItem} title={p.title}>
                <ProtectedImage useNative src={p.icon} alt={p.title} loading="lazy" />
              </a>
            ))}
          </div>
        </div>

        {/* ==============================================================
            TRANSITION: PROJECTS TYPOGRAPHY
        ============================================================== */}
        <div className={styles.projectsTypoContainer}>
          {/* Ambient decorations filling the empty side spaces */}
          <motion.img 
            src="/images/stickers/planet.webp" 
            className={styles.ambientDecoLeft} 
            alt="" 
            animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          />
          <motion.img 
            src="/images/stickers/rock-on.webp" 
            className={styles.ambientDecoRight} 
            alt="" 
            animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
          />

          <motion.div 
            className={styles.layerTypo}
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Faint base */}
            <ProtectedImage useNative src="/images/projects/app-web-typography.webp" alt="Projects Typography" className={styles.imageAsset} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }} />
            {/* Liquid filled portion */}
            <div className={styles.typoFilled} style={{ zIndex: 2 }}>
                <div className={styles.typoLiquidContainer}>
                    <div className={styles.typoLiquidWave2}></div>
                    <div className={styles.typoLiquidWave}></div>
                </div>
            </div>
          </motion.div>
        </div>
        
        {/* ==============================================================
            PROJECT 01: FAZAKKIR
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[0]}
          clouds={[
            { src: '/images/clouds/cloud-1.webp', x: ['-720px', '1728px'], y: ['15vh', '15vh'], duration: 12, width: '648px', opacity: 0.8 },
            { src: '/images/clouds/cloud-2.webp', x: ['1728px', '-720px'], y: ['65vh', '65vh'], duration: 18, width: '504px', opacity: 0.6, depth: -1 },
            { src: '/images/clouds/cloud-3.webp', x: ['-576px', '1728px'], y: ['40vh', '45vh'], duration: 25, width: '360px', opacity: 0.7, delay: 2 }
          ]}
          stickers={[
            { src: '/images/stickers/pink-heart.webp', width: 60, height: 60, positionClass: 'posTopCenter', rotation: -15, entranceDelay: 0.1, animationType: 'fadeScale' },
            { src: '/images/stickers/headphones.webp', width: 80, height: 80, positionClass: 'posBottomRight', rotation: 10, entranceDelay: 0.3, animationType: 'slideUp' },
            { src: '/images/stickers/laptop-code.webp', width: 90, height: 90, positionClass: 'posBottomLeft', rotation: -5, entranceDelay: 0.5, animationType: 'fadeScale' },
            { src: '/images/stickers/coffee-cup.webp', width: 70, height: 70, positionClass: 'posMidRight', rotation: 15, entranceDelay: 0.3, animationType: 'float' }
          ]}
        />

        {/* ==============================================================
            PROJECT 02: HODORY
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[1]}
          alignment="alignRight"
          clouds={[
            { src: '/images/clouds/cloud-4.webp', x: ['1728px', '-720px'], y: ['10vh', '15vh'], duration: 14, width: '576px', opacity: 0.8 },
            { src: '/images/clouds/cloud-1.webp', x: ['-864px', '1728px'], y: ['70vh', '75vh'], duration: 10, width: '720px', opacity: 0.7, depth: -1 },
            { src: '/images/clouds/cloud-2.webp', x: ['1728px', '-576px'], y: ['35vh', '30vh'], duration: 22, width: '432px', opacity: 0.9, delay: 3 }
          ]}
          stickers={[
            { src: '/images/stickers/cloud-sync.webp', width: 80, height: 80, positionClass: 'posTopLeft', rotation: -10, entranceDelay: 0.2, animationType: 'float' },
            { src: '/images/stickers/terminal.webp', width: 90, height: 90, positionClass: 'posBottomCenter', rotation: 15, entranceDelay: 0.4, animationType: 'fadeScale' },
            { src: '/images/stickers/planet.webp', width: 70, height: 70, positionClass: 'posBottomLeft', rotation: -5, entranceDelay: 0.1, animationType: 'slideUp' },
            { src: '/images/stickers/code-symbol.webp', width: 60, height: 60, positionClass: 'posTopRight', rotation: 20, entranceDelay: 0.6, animationType: 'fadeScale' }
          ]}
        />

        {/* ==============================================================
            PROJECT 03: MASARAK
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[2]}
          clouds={[
            { src: '/images/clouds/cloud-2.webp', x: ['-720px', '1728px'], y: ['8vh', '12vh'], duration: 13, width: '576px', opacity: 0.8 },
            { src: '/images/clouds/cloud-3.webp', x: ['1728px', '-720px'], y: ['85vh', '80vh'], duration: 17, width: '504px', opacity: 0.7, depth: -1 },
            { src: '/images/clouds/cloud-4.webp', x: ['-864px', '1728px'], y: ['50vh', '45vh'], duration: 11, width: '648px', opacity: 0.6, delay: 2 }
          ]}
          stickers={[
            { src: '/images/stickers/web-window.webp', width: 100, height: 100, positionClass: 'posTopCenter', rotation: -8, entranceDelay: 0.3, animationType: 'fadeScale' },
            { src: '/images/stickers/monitor.webp', width: 80, height: 80, positionClass: 'posBottomRight', rotation: 12, entranceDelay: 0.5, animationType: 'slideUp' },
            { src: '/images/stickers/smiley.webp', width: 60, height: 60, positionClass: 'posTopLeft', rotation: -15, entranceDelay: 0.2, animationType: 'float' },
            { src: '/images/stickers/rock-on.webp', width: 70, height: 70, positionClass: 'posBottomLeft', rotation: 5, entranceDelay: 0.4, animationType: 'fadeScale' }
          ]}
        />

        {/* ==============================================================
            PROJECT 04: AL-MOLTAQA
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[3]}
          alignment="alignRight"
          clouds={[
            { src: '/images/clouds/cloud-1.webp', x: ['1728px', '-864px'], y: ['12vh', '15vh'], duration: 12, width: '648px', opacity: 0.8 },
            { src: '/images/clouds/cloud-4.webp', x: ['-720px', '1728px'], y: ['75vh', '70vh'], duration: 18, width: '504px', opacity: 0.9, depth: -1 },
            { src: '/images/clouds/cloud-3.webp', x: ['1728px', '-576px'], y: ['35vh', '40vh'], duration: 26, width: '360px', opacity: 0.7, delay: 1 }
          ]}
          stickers={[
            { src: '/images/stickers/design-code-create.webp', width: 70, height: 70, positionClass: 'posTopLeft', rotation: -12, entranceDelay: 0.1, animationType: 'fadeScale' },
            { src: '/images/stickers/planet.webp', width: 90, height: 90, positionClass: 'posBottomCenter', rotation: 8, entranceDelay: 0.4, animationType: 'float' },
            { src: '/images/stickers/on-toggle.webp', width: 80, height: 80, positionClass: 'posTopRight', rotation: 15, entranceDelay: 0.3, animationType: 'slideUp' }
          ]}
        />

        {/* ==============================================================
            MEADOW SCENE (END TRANSITION INTO SERVICES)
        ============================================================== */}
        <div className={styles.meadowTransition}>
          <MeadowBees />
          <ProtectedImage useNative src="/images/projects/meadow-transition.webp" alt="Landscape Transition" />
        </div>

      </div>
    </section>
  );
}
