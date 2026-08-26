'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';
import SocialGalleryCarousel from './SocialGalleryCarousel';
import FixedArtboard from '../FixedArtboard/FixedArtboard';

const RafiqiCaseStudy = dynamic(() => import('../Rafiqi/RafiqiCaseStudy'));
const InkMilkCaseStudy = dynamic(() => import('../InkMilk/InkMilkCaseStudy'));

export default function GraphicProjects() {
  const carouselDemoImages = [
    '/images/projects/project-03-carousel/01.webp',
    '/images/projects/project-03-carousel/02.webp',
    '/images/projects/project-03-carousel/03.webp',
    '/images/projects/project-03-carousel/04.webp'
  ];

  const carouselGroup2 = [
    '/images/projects/project-04-carousel/01.webp',
    '/images/projects/project-04-carousel/02.webp',
    '/images/projects/project-04-carousel/03.webp',
    '/images/projects/project-04-carousel/04.webp'
  ];

  const carouselGroup3 = [
    '/images/projects/project-05-carousel/01.webp',
    '/images/projects/project-05-carousel/02.webp',
    '/images/projects/project-05-carousel/03.webp'
  ];

  const kakaCarousel1 = [
    '/images/projects/project-06-kaka/carousel-1/01.webp',
    '/images/projects/project-06-kaka/carousel-1/02.webp',
    '/images/projects/project-06-kaka/carousel-1/03.webp',
    '/images/projects/project-06-kaka/carousel-1/04.webp'
  ];

  const kakaCarousel2 = [
    '/images/projects/project-06-kaka/carousel-2/01.webp',
    '/images/projects/project-06-kaka/carousel-2/02.webp',
    '/images/projects/project-06-kaka/carousel-2/03.webp',
    '/images/projects/project-06-kaka/carousel-2/04.webp'
  ];

  const kakaCarousel3 = [
    '/images/projects/project-06-kaka/carousel-3/01.webp',
    '/images/projects/project-06-kaka/carousel-3/02.webp',
    '/images/projects/project-06-kaka/carousel-3/03.webp',
    '/images/projects/project-06-kaka/carousel-3/04.webp'
  ];

  return (
    <section id="graphic-projects" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* 
        GRAPHIC TYPOGRAPHY HEADER
      */}
      <FixedArtboard artboardWidth={1440}>
        <div className="graphic-typo-header">
            {/* Ambient decorations filling the empty side spaces */}
          <motion.img 
            src="/images/stickers/planet.webp" 
            className="ambient-deco-left" 
            alt="" 
            animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          />
          <motion.img 
            src="/images/stickers/smiley.webp" 
            className="ambient-deco-right" 
            alt="" 
            animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
          />

          {/* Clouds */}
          <motion.img 
            src="/images/clouds/cloud-1.webp"
            className="floating-cloud"
            style={{ width: '576px', top: '10%', left: '-10%', zIndex: 0 }}
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
          <motion.img 
            src="/images/clouds/cloud-2.webp"
            className="floating-cloud"
            style={{ width: '432px', bottom: '10%', right: '-5%', zIndex: 0 }}
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />

          <motion.div 
            className="layer-typo"
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Faint base */}
            <ProtectedImage useNative src="/images/projects/graphic-typography.webp" alt="Graphic Typography" className="image-asset" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }} />
            {/* Liquid filled portion */}
            <div className="typo-filled" style={{ zIndex: 2 }}>
                <div className="typo-liquid-container">
                    <div className="typo-liquid-wave2"></div>
                    <div className="typo-liquid-wave"></div>
                </div>
            </div>
          </motion.div>
      </div>
      </FixedArtboard>

      {/* 
        Project 01: Rafiqi Branding 
      */}
      <RafiqiCaseStudy />

      {/* 
        Project 02: INKMILK Branding 
      */}
      <InkMilkCaseStudy />

      <style>{`
        /* Graphic Typography Header CSS */
        .graphic-typo-header {
          position: relative;
          width: 100%;
          background-color: #0b0f19;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 100px 0 60px 0;
          overflow: hidden;
        }
        .layer-typo {
          position: relative;
          width: 1224px;
          max-width: 850px;
          height: 360px;
          max-height: 250px;
          animation: typoFloat 9s ease-in-out infinite alternate;
          z-index: 20;
        }
        @keyframes typoFloat {
          0% { transform: translateY(2px) translateX(-1px); }
          100% { transform: translateY(-2px) translateX(1px); }
        }
        .image-asset {
          object-fit: contain;
        }
        .typo-filled {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          -webkit-mask-image: url('/images/projects/graphic-typography.webp');
          -webkit-mask-size: contain;
          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;
          mask-image: url('/images/projects/graphic-typography.webp');
          mask-size: contain;
          mask-position: center;
          mask-repeat: no-repeat;
          transform: scale(1.02);
          transform-origin: center center;
        }
        .typo-liquid-container {
          position: absolute;
          left: 0;
          width: 100%;
          bottom: 0;
          height: 100%;
          transform: translateY(100%);
          animation: organicRiseLoop 24s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          overflow: visible;
        }
        .typo-liquid-wave {
          position: absolute;
          width: 3600px;
          height: 3600px;
          left: 50%;
          top: -72px;
          margin-left: -1800px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 40%;
          animation: liquidSpin 10s linear infinite;
        }
        .typo-liquid-wave2 {
          position: absolute;
          width: 3600px;
          height: 3600px;
          left: 50%;
          top: -115.2px;
          margin-left: -1800px;
          background: rgba(45, 212, 191, 0.85);
          border-radius: 43%;
          animation: liquidSpin 14s linear infinite;
        }
        @keyframes liquidSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes organicRiseLoop {
          0%   { transform: translateY(100%); }
          25%  { transform: translateY(-10%); }
          50%  { transform: translateY(20%); }
          75%  { transform: translateY(-5%); }
          100% { transform: translateY(100%); }
        }
        .ambient-deco-left {
          position: absolute;
          left: 10%;
          top: 50%;
          width: 120px;
          height: auto;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15));
        }
        .ambient-deco-right {
          position: absolute;
          right: 10%;
          top: 20%;
          width: 100px;
          height: auto;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15));
        }
        .floating-cloud {
          position: absolute;
          opacity: 0.6;
          pointer-events: none;
        }

        .six-carousels-grid {
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 0 16px;
        }

        @media (max-width: 1024px) {
          .six-carousels-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .six-carousels-grid {
            grid-template-columns: 1fr;
            padding: 0 16px;
          }
        }

      `}</style>

      {/* 
        FINAL CAROUSEL SECTION
        A grid of 6 independent carousel components.
      */}
      <div style={{ backgroundColor: 'var(--deep-cobalt)', padding: '10vh 0', flex: 1 }}>
        <div className="six-carousels-grid">
          <SocialGalleryCarousel images={carouselDemoImages} />
          <SocialGalleryCarousel images={carouselGroup2} />
          <SocialGalleryCarousel images={carouselGroup3} />
          <SocialGalleryCarousel images={kakaCarousel1} />
          <SocialGalleryCarousel images={kakaCarousel2} />
          <SocialGalleryCarousel images={kakaCarousel3} />
        </div>
      </div>

    </section>
  );
}
