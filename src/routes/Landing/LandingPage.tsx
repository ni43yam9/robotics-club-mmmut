import { useRef } from "react";
import Header from "../../components/Header";
import { usePrefersReducedMotion } from "../../components/usePrefersReducedMotion";
import { useDocumentMeta } from "../../components/useDocumentMeta";
import Scene from "./Scene";
import StoryOverlay from "./StoryOverlay";
import ProceduralBackground from "../../components/ProceduralBackground";
import styles from "./Landing.module.css";

export default function LandingPage() {
  useDocumentMeta(
    "Robotics Club — build real robots in your first year",
    "Robotics Club at MMMUT — the build club for first-year engineers. Real hardware from week one.",
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const small =
    typeof window !== "undefined" && window.innerWidth <= 700;

  return (
    <div ref={wrapperRef} className={styles.page}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ProceduralBackground scroll={scroll} className="absolute inset-0" />
      </div>
      
      <Header />

      {reducedMotion ? (
        <div className={styles.poster} aria-hidden="true" />
      ) : (
        <>
          <Scene
            scroll={scroll}
            eventSource={wrapperRef}
            small={small}
            onReady={() => {}}
          />
        </>
      )}

      <StoryOverlay scroll={scroll} isStatic={reducedMotion} />
    </div>
  );
}
