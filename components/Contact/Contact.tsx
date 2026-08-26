'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Contact.module.css';
import { ArrowUpRight, Mail, ExternalLink, MessageCircle } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';

const socials = [
  { icon: FaFacebookF,    label: 'Facebook',    href: 'https://www.facebook.com/mohs3n00?locale', isImage: false },
  { icon: '/images/behance-icon.png', label: 'Behance',     href: 'https://www.behance.net/mohamedmohs3n', isImage: true },
];

interface CloudProps { baseX: string; baseY: string; size: number; image: string; duration: number; direction: "normal" | "reverse" | "alternate" | "alternate-reverse" | string }
const SimpleCloud = ({ baseX, baseY, size, image, duration, direction }: CloudProps) => {
  return (
    <div 
      className={styles.cloudWrapper} 
      style={{ left: baseX, top: baseY, width: size, height: size * 0.8, marginLeft: `-${size/2}px`, marginTop: `-${(size*0.8)/2}px` }}
    >
      <div 
        className={styles.cloudDrift} 
        style={{ 
          animationDuration: `${duration}s`, 
          animationDirection: direction 
        }}
      >
        <div
           className={styles.smallCloud}
           style={{
             backgroundImage: `url(${image})`
           }}
        />
      </div>
    </div>
  );
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className={styles.section}>
      {/* Decorative Sky Clouds */}
      <div className={styles.skyCloudsContainer}>
         <SimpleCloud baseX="10%" baseY="30%" size={350} image="/images/about/cloud1.jpg" duration={25} direction="alternate" />
         <SimpleCloud baseX="85%" baseY="60%" size={450} image="/images/about/cloud2.jpg" duration={35} direction="alternate-reverse" />
      </div>

      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        >
          <span className="text-label">Contact</span>

          <h2 className={styles.title}>
            LET&apos;S BUILD<br />
            <span className={styles.titleAccent}>SOMETHING</span><br />
            GREAT.
          </h2>

          <p className={styles.sub}>
            Have a project in mind? I&apos;m available for new work.<br />
            Let&apos;s talk about what you want to build.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://wa.me/201558281034"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.emailBtn} btn-primary`}
            >
              <MessageCircle size={16} strokeWidth={2} />
              Let&apos;s Talk
              <ArrowUpRight size={15} strokeWidth={2.25} />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mohsn9165@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.emailBtn} btn-primary`}
              style={{ background: 'rgba(255, 255, 255, 0.6)', color: 'var(--deep-navy)' }}
            >
              <Mail size={16} strokeWidth={2} />
              mohsn9165@gmail.com
              <ArrowUpRight size={15} strokeWidth={2.25} />
            </a>
          </div>

          {/* Socials */}
          <div className={styles.socials}>
            {socials.map(s => {
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label={s.label}>
                  {s.isImage ? (
                    <Image src={s.icon as string} alt={s.label} width={22} height={22} style={{ objectFit: 'contain' }} />
                  ) : (
                    (() => {
                      const Icon = s.icon as React.ElementType;
                      return <Icon size={18} strokeWidth={2} />;
                    })()
                  )}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
