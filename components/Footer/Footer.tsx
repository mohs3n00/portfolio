'use client';
import styles from './Footer.module.css';

const links = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.left}>
          <span className={styles.logo}>MOHSEN</span>
          <span className={styles.copy}>© {year} — All rights reserved</span>
        </div>

        <nav className={styles.nav}>
          {links.map(l => (
            <a key={l.label} href={l.label} className={styles.link}
              onClick={e => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <span className={styles.made}>Designed & built by Mohsen</span>
        </div>
      </div>
    </footer>
  );
}
