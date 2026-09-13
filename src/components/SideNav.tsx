import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './SideNav.module.css';

function DockNavItem({ 
  mouseX, 
  href, 
  onClick, 
  children,
  index
}: { 
  mouseX: any; 
  href: string; 
  onClick: () => void;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  
  // Dock magnification logic
  const distance = 100; // How far the effect reaches
  const baseSize = 13;  // Roughly 0.8rem
  const maxSize = 22;   // Magnified size

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // Measure distance from the center of this item
    return val - bounds.x - bounds.width / 2;
  });
  
  const fontSizeSync = useTransform(
    distanceCalc, 
    [-distance, 0, distance], 
    [baseSize, maxSize, baseSize]
  );
  
  const fontSize = useSpring(fontSizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <li ref={ref} style={{ '--i': index } as React.CSSProperties}>
      <motion.a 
        href={href} 
        className={styles.navItem} 
        onClick={onClick}
        style={{ fontSize }}
      >
        {children}
      </motion.a>
    </li>
  );
}

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);

  return (
    <div className={styles.wrapper}>
      {/* Navigation Strip */}
      <nav 
        className={`${styles.navStrip} ${isOpen ? styles.open : ''}`} 
        aria-hidden={!isOpen}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <ul className={styles.navList}>
          <DockNavItem mouseX={mouseX} href="/events/index.html" onClick={() => setIsOpen(false)} index={1}>
            EVENTS
          </DockNavItem>
          <DockNavItem mouseX={mouseX} href="/team/index.html" onClick={() => setIsOpen(false)} index={2}>
            TEAM
          </DockNavItem>
          <DockNavItem mouseX={mouseX} href="#gallery" onClick={() => setIsOpen(false)} index={3}>
            GALLERY
          </DockNavItem>
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
