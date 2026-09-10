import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ label = "Loading scene" }: { label?: string }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.bar}>
        <span />
      </div>
      <p>{label}&hellip;</p>
    </div>
  );
}
