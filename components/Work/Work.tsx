'use client';
import styles from './Work.module.css';
import ProjectShowcase, { ProjectData } from './ProjectShowcase';
import { motion } from 'framer-motion';
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
    icon: "/images/projects/fazakkir_app.png",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/showcase/fazakkir/screen1.jpg",
      "/showcase/fazakkir/screen2.jpg",
      "/showcase/fazakkir/screen3.jpg",
      "/showcase/fazakkir/screen4.jpg",
    ],
    githubUrl: "https://github.com/mohsen/fazakkir" 
  },
  { 
    id: "hodory", 
    title: "HODORY", 
    type: "Mobile Application",
    description: "Comprehensive attendance and student management mobile solution built with Flutter. Features profile management, scheduling, and calendar integrations.",
    techStack: ["Flutter", "Riverpod", "Node.js API"],
    icon: "/images/projects/Hodori.jpg",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/showcase/hodory/screen5.jpg",
      "/showcase/hodory/screen4.jpg",
      "/showcase/hodory/screen3.jpg",
      "/showcase/hodory/screen2.jpg",
      "/showcase/hodory/screen1.jpg"
    ],
    githubUrl: "https://github.com/mohs3n00/student-system"
  },
  { 
    id: "masarak", 
    title: "MASARAK", 
    type: "Web Platform + Mobile Application",
    description: "Integrated e-learning ecosystem for educational institutions. Provides seamless course consumption natively on mobile and advanced management tools on the web.",
    techStack: ["React", "Next.js", "Flutter", "Riverpod"],
    icon: "/images/projects/masarak.jpg",
    showcaseType: "dual",
    webScreenshots: [
      "/images/projects/masarak-web/screen1.png",
      "/images/projects/masarak-web/screen2.png",
      "/images/projects/masarak-web/screen3.png",
      "/images/projects/masarak-web/screen4.png"
    ],
    mobileScreenshots: [
      "/images/projects/masarak-mobile/screen5.jpg",
      "/images/projects/masarak-mobile/screen4.jpg",
      "/images/projects/masarak-mobile/screen3.jpg",
      "/images/projects/masarak-mobile/screen2.jpg",
      "/images/projects/masarak-mobile/screen1.jpg"
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
    icon: "/images/projects/ELMoltaqa.png",
    showcaseType: "mobile",
    mobileScreenshots: [
      "/images/projects/el-moltaqa/screen1.jpeg",
      "/images/projects/el-moltaqa/screen2.jpeg",
      "/images/projects/el-moltaqa/screen3.jpeg"
    ],
    githubUrl: "https://github.com/mohs3n00/el-moltaqa-app" 
  }
];

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      {/* Global Sky Video Atmosphere */}
      <video 
        src="/images/projects/sky-atmosphere.mp4" 
        className={styles.skyVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
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
            src="/images/stickers/planet.png" 
            className={styles.ambientDecoLeft} 
            alt="" 
            animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          />
          <motion.img 
            src="/images/stickers/rock-on.png" 
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
            <ProtectedImage useNative src="/images/projects/app-web-typography.png" alt="Projects Typography" className={styles.imageAsset} style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }} />
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
            { src: '/images/clouds/cloud-1.png', x: ['-50vw', '120vw'], y: ['15vh', '15vh'], duration: 12, width: '45vw', opacity: 0.8 },
            { src: '/images/clouds/cloud-2.png', x: ['120vw', '-50vw'], y: ['65vh', '65vh'], duration: 18, width: '35vw', opacity: 0.6, depth: -1 },
            { src: '/images/clouds/cloud-3.png', x: ['-40vw', '120vw'], y: ['40vh', '45vh'], duration: 25, width: '25vw', opacity: 0.7, delay: 2 }
          ]}
          stickers={[
            { src: '/images/stickers/pink-heart.png', width: 60, height: 60, positionClass: 'posTopCenter', rotation: -15, entranceDelay: 0.1, animationType: 'fadeScale' },
            { src: '/images/stickers/headphones.png', width: 80, height: 80, positionClass: 'posBottomRight', rotation: 10, entranceDelay: 0.3, animationType: 'slideUp' },
            { src: '/images/stickers/laptop-code.png', width: 90, height: 90, positionClass: 'posBottomLeft', rotation: -5, entranceDelay: 0.5, animationType: 'fadeScale' },
            { src: '/images/stickers/coffee-cup.png', width: 70, height: 70, positionClass: 'posMidRight', rotation: 15, entranceDelay: 0.3, animationType: 'float' }
          ]}
        />

        {/* ==============================================================
            PROJECT 02: HODORY
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[1]}
          alignment="alignRight"
          clouds={[
            { src: '/images/clouds/cloud-4.png', x: ['120vw', '-50vw'], y: ['10vh', '15vh'], duration: 14, width: '40vw', opacity: 0.8 },
            { src: '/images/clouds/cloud-1.png', x: ['-60vw', '120vw'], y: ['70vh', '75vh'], duration: 10, width: '50vw', opacity: 0.7, depth: -1 },
            { src: '/images/clouds/cloud-2.png', x: ['120vw', '-40vw'], y: ['35vh', '30vh'], duration: 22, width: '30vw', opacity: 0.9, delay: 3 }
          ]}
          stickers={[
            { src: '/images/stickers/cloud-sync.png', width: 80, height: 80, positionClass: 'posTopLeft', rotation: -10, entranceDelay: 0.2, animationType: 'float' },
            { src: '/images/stickers/terminal.png', width: 90, height: 90, positionClass: 'posBottomCenter', rotation: 15, entranceDelay: 0.4, animationType: 'fadeScale' },
            { src: '/images/stickers/planet.png', width: 70, height: 70, positionClass: 'posBottomLeft', rotation: -5, entranceDelay: 0.1, animationType: 'slideUp' },
            { src: '/images/stickers/code-symbol.png', width: 60, height: 60, positionClass: 'posTopRight', rotation: 20, entranceDelay: 0.6, animationType: 'fadeScale' }
          ]}
        />

        {/* ==============================================================
            PROJECT 03: MASARAK
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[2]}
          clouds={[
            { src: '/images/clouds/cloud-2.png', x: ['-50vw', '120vw'], y: ['8vh', '12vh'], duration: 13, width: '40vw', opacity: 0.8 },
            { src: '/images/clouds/cloud-3.png', x: ['120vw', '-50vw'], y: ['85vh', '80vh'], duration: 17, width: '35vw', opacity: 0.7, depth: -1 },
            { src: '/images/clouds/cloud-4.png', x: ['-60vw', '120vw'], y: ['50vh', '45vh'], duration: 11, width: '45vw', opacity: 0.6, delay: 2 }
          ]}
          stickers={[
            { src: '/images/stickers/web-window.png', width: 100, height: 100, positionClass: 'posTopCenter', rotation: -8, entranceDelay: 0.3, animationType: 'fadeScale' },
            { src: '/images/stickers/monitor.png', width: 80, height: 80, positionClass: 'posBottomRight', rotation: 12, entranceDelay: 0.5, animationType: 'slideUp' },
            { src: '/images/stickers/smiley.png', width: 60, height: 60, positionClass: 'posTopLeft', rotation: -15, entranceDelay: 0.2, animationType: 'float' },
            { src: '/images/stickers/rock-on.png', width: 70, height: 70, positionClass: 'posBottomLeft', rotation: 5, entranceDelay: 0.4, animationType: 'fadeScale' }
          ]}
        />

        {/* ==============================================================
            PROJECT 04: AL-MOLTAQA
        ============================================================== */}
        <ProjectShowcase 
          project={projectsData[3]}
          alignment="alignRight"
          clouds={[
            { src: '/images/clouds/cloud-1.png', x: ['120vw', '-60vw'], y: ['12vh', '15vh'], duration: 12, width: '45vw', opacity: 0.8 },
            { src: '/images/clouds/cloud-4.png', x: ['-50vw', '120vw'], y: ['75vh', '70vh'], duration: 18, width: '35vw', opacity: 0.9, depth: -1 },
            { src: '/images/clouds/cloud-3.png', x: ['120vw', '-40vw'], y: ['35vh', '40vh'], duration: 26, width: '25vw', opacity: 0.7, delay: 1 }
          ]}
          stickers={[
            { src: '/images/stickers/design-code-create.png', width: 70, height: 70, positionClass: 'posTopLeft', rotation: -12, entranceDelay: 0.1, animationType: 'fadeScale' },
            { src: '/images/stickers/planet.png', width: 90, height: 90, positionClass: 'posBottomCenter', rotation: 8, entranceDelay: 0.4, animationType: 'float' },
            { src: '/images/stickers/on-toggle.png', width: 80, height: 80, positionClass: 'posTopRight', rotation: 15, entranceDelay: 0.3, animationType: 'slideUp' }
          ]}
        />

        {/* ==============================================================
            MEADOW SCENE (END TRANSITION INTO SERVICES)
        ============================================================== */}
        <div className={styles.meadowTransition}>
          <MeadowBees />
          <ProtectedImage useNative src="/images/projects/meadow-transition.png" alt="Landscape Transition" />
        </div>

      </div>
    </section>
  );
}
