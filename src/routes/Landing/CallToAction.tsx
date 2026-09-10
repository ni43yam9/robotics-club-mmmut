import { Link } from "react-router-dom";
import { prefetchPlay } from "../../components/prefetch";
import Footer from "../../components/Footer";
import styles from "./Landing.module.css";

export default function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        {/* TODO(copy): headline + button label */}
        <h2>Try the flight demo we built.</h2>
        <p>
          A short flight game that runs in your browser. Steer with the mouse,
          click to fire.
        </p>
        <Link
          to="/play"
          className={styles.ctaButton}
          onPointerEnter={prefetchPlay}
          onFocus={prefetchPlay}
        >
          Play the experience
        </Link>
      </div>
      <Footer />
    </section>
  );
}
