'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function BrandApplication() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Since it's a flattened image, we apply a subtle zoom/parallax to the entire application scene 
  // to give it a cinematic, deep feel.
  const scaleEffect = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const yEffect = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '90px 0', overflow: 'hidden' }}>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2 }}
        style={{ width: '100%', maxWidth: '1600px', position: 'relative' }}
      >
        <motion.div style={{ scale: scaleEffect, y: yEffect, transformOrigin: 'center center' }}>
          <ProtectedImage useNative
            src="/images/projects/rafiqi/branding-rafiqi_09.gif" 
            alt="Rafiqi Brand Application"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </motion.div>
      </motion.div>

    </div>
  );
}
