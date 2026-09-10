// Ported from pmndrs/examples "space-game" (src/Hud.tsx).
// Changes: styled-components -> CSS module (no global styles leak); the
// author's sandbox/twitter/github links replaced with a home link, the sound
// toggle and a pmndrs credit; brand fonts/colors.
import { useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "./store";
import styles from "./Hud.module.css";

export default function Hud() {
  const points = useStore((state) => state.points);
  const health = useStore((state) => state.health);
  const sound = useStore((state) => state.sound);
  const running = useStore((state) => state.running);
  const paused = useStore((state) => state.paused);
  const toggle = useStore((state) => state.actions.toggleSound);
  const startTime = useStore((state) => state.mutation.startTime);

  const seconds = useRef<HTMLParagraphElement>(null!);
  useEffect(() => {
    const i = setInterval(() => {
      if (!seconds.current) return;
      if (!running || paused) return;
      seconds.current.innerText = ((Date.now() - startTime) / 1000).toFixed(1);
    }, 100);
    return () => clearInterval(i);
  }, [running, paused, startTime]);

  const score = useMemo(
    () => (points >= 1000 ? (points / 1000).toFixed(1) + "K" : String(points)),
    [points],
  );

  return (
    <>
      <button
        type="button"
        className={styles.upperLeft}
        onClick={() => toggle()}
        aria-pressed={sound}
      >
        sound
        <br />
        {sound ? "on" : "off"}
      </button>

      <nav className={styles.upperRight}>
        <Link to="/">&larr; home</Link>
        <br />
        <a
          href="https://github.com/pmndrs/examples"
          target="_blank"
          rel="noreferrer"
        >
          based on pmndrs examples
        </a>
      </nav>

      <div className={styles.lowerLeft}>
        <p ref={seconds} className={styles.timer}>
          0.0
        </p>
        <p className={styles.score}>{score}</p>
      </div>

      <div className={styles.lowerRight} aria-hidden="true">
        <div style={{ width: health + "%" }} />
      </div>
    </>
  );
}
