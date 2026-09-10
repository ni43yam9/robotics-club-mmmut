import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Robotics Club, MMMUT</span>
      <span className={styles.links}>
        {/* TODO(copy): real contact email + social URLs */}
        <a href="mailto:roboticsclub@mmmut.ac.in">roboticsclub@mmmut.ac.in</a>
        <a href="https://instagram.com/" rel="noreferrer">
          Instagram
        </a>
        <a href="https://github.com/" rel="noreferrer">
          GitHub
        </a>
      </span>
    </footer>
  );
}
