import { Link } from "react-router-dom";
import logo from "../assets/club-logo.png";
import { prefetchPlay } from "./prefetch";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Robotics Club home">
        <img src={logo} alt="Robotics Club Logo" className={styles.logo} width={44} height={44} />
        <span>Robotics Club</span>
      </Link>
      <Link
        to="/play"
        className={styles.cta}
        onPointerEnter={prefetchPlay}
        onFocus={prefetchPlay}
      >
        CYBERPUNK <span className={styles.arrow}>&rarr;</span>
      </Link>
    </header>
  );
}
