'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function MerchAndProducts() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const merchY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const productY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleEffect = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15vh', padding: '15vh 0' }}>
      
      {/* Scene 07: Merch / Hoodie */}
      <div className="container">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          style={{ width: '100%', position: 'relative' }}
        >
          <motion.div style={{ y: merchY, scale: scaleEffect }}>
            <ProtectedImage useNative
              src="/images/projects/rafiqi/branding-rafiqi_07.gif" 
              alt="Rafiqi Merchandise"
              style={{ width: '100%', borderRadius: '24px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', objectFit: 'cover' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scene 08: Products */}
      <div className="container">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          style={{ width: '100%', position: 'relative' }}
        >
          {/* Subtle floating effect over the scroll parallax */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '100%' }}
          >
            <motion.div style={{ y: productY }}>
              <ProtectedImage useNative
                src="/images/projects/rafiqi/branding-rafiqi_08.gif" 
                alt="Rafiqi Products"
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
