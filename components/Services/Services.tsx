'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Layers, Palette } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: Globe,
    num: '01',
    title: 'Web Development',
    sub: 'Engineered for the web.',
    description:
      'Websites, e-commerce experiences, and web applications built with precision. From marketing pages to complex product interfaces — every line of code deliberate.',
    accent: 'var(--electric-blue)',
  },
  {
    icon: Layers,
    num: '02',
    title: 'UI / UX Design',
    sub: 'Designed for people.',
    description:
      'Product interfaces and responsive web experiences crafted around real user behaviour. From wireframes to polished design systems — the full spectrum.',
    accent: 'var(--primary-cobalt)',
  },
  {
    icon: Palette,
    num: '03',
    title: 'Graphic & Brand Design',
    sub: 'Identity with intent.',
    description:
      'Visual identities, social media design, advertising, and brand visuals that communicate clearly and live memorably.',
    accent: 'var(--sky-blue)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16,1,0.3,1] as const },
  }),
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-label">What I Do</span>
          <h2 className={styles.title}>SERVICES</h2>
          <p className={styles.headerSub}>
            Design is not an extra skill.<br />It is part of the foundation.
          </p>
        </motion.div>

        <div className={styles.editorialList}>
          {services.map((s, i) => {
            return (
              <motion.div
                key={s.num}
                className={styles.listItem}
                custom={i}
                variants={cardVariants}
                animate={inView ? 'visible' : 'hidden'}
                whileHover="hover"
                initial={["hidden", "rest"]}
              >
                <div className={styles.rowTop}>
                  <div className={styles.rowTitleWrap}>
                    <span className={styles.rowNum}>{s.num}</span>
                    <span className={styles.rowTitle}>{s.title}</span>
                  </div>
                  <div className={styles.rowIcon}>
                    <s.icon size={24} strokeWidth={1.5} color="currentColor" />
                  </div>
                </div>
                
                <motion.div 
                  className={styles.rowDetails}
                  variants={{
                    rest: { height: 0, opacity: 0 },
                    hover: { height: 'auto', opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={styles.rowSub}>{s.sub}</p>
                  <p className={styles.rowDesc}>{s.description}</p>
                </motion.div>
                <div className={styles.separator} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
