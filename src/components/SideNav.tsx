import { useState } from 'react';
import styles from './SideNav.module.css';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Navigation Strip */}
      <nav className={`${styles.navStrip} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
        <ul className={styles.navList}>
          <li style={{ '--i': 1 } as React.CSSProperties}>
            <a href="/events/index.html" className={styles.navItem} onClick={() => setIsOpen(false)}>
              EVENTS
            </a>
          </li>
          <li style={{ '--i': 2 } as React.CSSProperties}>
            <a href="/team/index.html" className={styles.navItem} onClick={() => setIsOpen(false)}>
              TEAM
            </a>
          </li>
          <li style={{ '--i': 3 } as React.CSSProperties}>
            <a href="#gallery" className={styles.navItem} onClick={() => setIsOpen(false)}>
              GALLERY
            </a>
          </li>
        </ul>
      </nav>

      {/* Hamburger Toggle */}
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
    </div>
  );
}
