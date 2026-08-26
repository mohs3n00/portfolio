'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function WebHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax for the isolated illustration
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref} style={{
      width: '100%',
      minHeight: '900px',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 4vw, 57.6px)',
      position: 'relative'
    }}>
      {/* Top Navigation */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        zIndex: 10
      }}>
        {/* Rafiqi Logo placeholder (Text for now, or could be an image if we had the standalone logo) */}
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#05FB8E' }}>
          رفيقي
        </div>

        <nav style={{ display: 'flex', gap: '40px', fontSize: '16px' }}>
          <span style={{ cursor: 'pointer' }}>الرئيسية</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>الخدمات</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>من نحن</span>
          <span style={{ cursor: 'pointer', opacity: 0.7 }}>تواصل معنا</span>
        </nav>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: '#05FB8E',
            color: '#1B1B4D',
            padding: '12px 24px',
            borderRadius: '100px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
        }}>
          ابدأ الآن
        </motion.button>
      </header>

      {/* Hero Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
        marginTop: '90px'
      }}>
        {/* Typography Left */}
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '20px' }}
          >
            رفيقك <span style={{ color: '#05FB8E' }}>الذكي</span><br/>في كل خطوة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px', lineHeight: 1.6 }}
          >
            نقدم لك تجربة متكاملة تجمع بين التقنية والسهولة لتلبية كافة احتياجاتك اليومية.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: 'transparent',
              color: '#05FB8E',
              border: '2px solid #05FB8E',
              padding: '15px 40px',
              borderRadius: '100px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
          }}>
            اكتشف المزيد
          </motion.button>
        </div>

        {/* Isolated Illustration Right */}
        <motion.div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'flex-end',
            y: yParallax
          }}
        >
          {/* We use CSS masking/cropping to isolate the people from the reference GIF */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '500px',
              height: '500px',
              position: 'relative',
              // Use a radial gradient mask to soften the edges of the extraction
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
            }}
          >
            <ProtectedImage useNative
              src="/images/projects/rafiqi/branding-rafiqi_01.gif" 
              alt="Rafiqi Hero Illustration"
              style={{
                width: '150%', // Scale up to focus on the illustration part
                height: '150%',
                objectFit: 'cover',
                objectPosition: '80% 50%', // Offset to where the people typically are
                position: 'absolute',
                top: '-25%',
                left: '-25%'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
