'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const links = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`}>
        {/* Logo */}
        <a href="#" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image src="/images/logo.png" alt="Mohsen" width={100} height={28} style={{ objectFit: 'contain', transform: 'scale(1.8)', transformOrigin: 'left center' }} />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.label}>
              <button className={styles.link} onClick={() => handleLink(l.href)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={styles.cta}
          onClick={() => handleLink('#contact')}
        >
          Let&apos;s Talk <span className={styles.arrow}>↗</span>
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {links.map(l => (
          <button key={l.label} className={styles.mobileLink} onClick={() => handleLink(l.href)}>
            {l.label}
          </button>
        ))}
        <button className={styles.mobileCta} onClick={() => handleLink('#contact')}>
          Let&apos;s Talk ↗
        </button>
      </div>
    </header>
  );
}
