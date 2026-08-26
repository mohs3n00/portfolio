'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const colors = [
  { name: 'Primary Green', hex: '#05FB8E', textColor: '#1B1B4D' },
  { name: 'Deep Navy', hex: '#1B1B4D', textColor: '#FFFFFF', border: true },
  { name: 'Pure White', hex: '#FFFFFF', textColor: '#1B1B4D', border: true },
];

export default function ColorSystem() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container" style={{ padding: '90px clamp(16px, 4vw, 57.6px)', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '60px', borderBottom: '1px solid rgba(27, 27, 77, 0.1)', paddingBottom: '20px' }}
      >
        <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>Identity System</h2>
        <h3 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Color & Typography</h3>
      </motion.div>

      <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 57.6px)', flexWrap: 'wrap' }}>
        {/* Colors */}
        <div style={{ flex: 2, display: 'flex', gap: '28.8px' }}>
          {colors.map((color, i) => (
            <motion.div 
              key={color.hex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => handleCopy(color.hex)}
              style={{
                flex: 1,
                aspectRatio: '0.8',
                backgroundColor: color.hex,
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: color.textColor,
                border: color.border ? '1px solid rgba(0,0,0,0.05)' : 'none',
                cursor: 'pointer',
                boxShadow: '0 15px 30px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{color.name}</div>
              
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{color.hex}</div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: copied === color.hex ? 1 : 0 }}
                  style={{ position: 'absolute', bottom: '24px', right: '24px', fontSize: '0.9rem', opacity: 0.7 }}
                >
                  Copied!
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Typography */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}
        >
          <div>
            <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '10px' }}>Primary Typeface</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>GE SS Two</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>Light</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>أ ب ت ث ج ح خ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>Medium</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>أ ب ت ث ج ح خ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Bold</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>أ ب ت ث ج ح خ</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
