import { useRef, useState } from "react";
import Header from "../../components/Header";
import LoadingScreen from "../../components/LoadingScreen";
import { usePrefersReducedMotion } from "../../components/usePrefersReducedMotion";
import { useDocumentMeta } from "../../components/useDocumentMeta";
import Scene from "./Scene";
import StoryOverlay from "./StoryOverlay";
import styles from "./Landing.module.css";

export default function LandingPage() {
  useDocumentMeta(
    "Robotics Club — build real robots in your first year",
    "Robotics Club at MMMUT — the build club for first-year engineers. Real hardware from week one.",
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const small =
    typeof window !== "undefined" && window.innerWidth <= 700;

  return (
    <div ref={wrapperRef} className={styles.page}>
      <Header />

      {reducedMotion ? (
        <div className={styles.poster} aria-hidden="true" />
      ) : (
        <>
          <Scene
            scroll={scroll}
            eventSource={wrapperRef}
            small={small}
            onReady={() => setReady(true)}
          />
          {!ready && <LoadingScreen />}
        </>
      )}

      <StoryOverlay scroll={scroll} isStatic={reducedMotion} />
    </div>
  );
}
