import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { prefetchPlay } from "./prefetch";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Robotics Club home">
        <img src={logo} alt="" className={styles.logo} width={32} height={32} />
        <span>Robotics&nbsp;Club</span>
      </Link>
      <Link
        to="/play"
        className={styles.cta}
        onPointerEnter={prefetchPlay}
        onFocus={prefetchPlay}
      >
        Play the experience &rarr;
      </Link>
    </header>
  );
}
