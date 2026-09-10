import {
  useCallback,
  useRef,
  type RefObject,
  type UIEvent,
} from "react";
import CallToAction from "./CallToAction";
import styles from "./Landing.module.css";

// TODO(copy): all seven titles + bodies below are draft copy — replace.
// Order is fixed: it must match the baked camera stops in model.glb.
const STOPS: { object: string; title: string; body: string }[] = [
  {
    object: "VR headset",
    title: "See it before you build it",
    body: "We prototype in simulation first, so your first mistake costs nothing but time.",
  },
  {
    object: "headphones",
    title: "Weekly build nights",
    body: "Every week the lab fills up, music on, and something that didn't work last week starts working.",
  },
  {
    object: "rocket",
    title: "Your first project launches in week three",
    body: "No prerequisites. You leave the bootcamp with a robot you drove yourself.",
  },
  {
    object: "turbine",
    title: "Motors, sensors, and the loop between them",
    body: "Learn how a machine reads the world and pushes back on it.",
  },
  {
    object: "table",
    title: "A bench with your name on it",
    body: "Members get lab access, a parts bin, and tools that would cost a semester's stipend.",
  },
  {
    object: "laptop",
    title: "Write the behavior",
    body: "Firmware, control loops, and a little computer vision — the code that makes hardware intentional.",
  },
  {
    object: "zeppelin",
    title: "Go past one semester",
    body: "Competition teams, research builds, and projects that outlast the people who started them.",
  },
];

const HEIGHTS = ["400vh", "200vh", "200vh", "200vh", "200vh", "200vh", "200vh"];

type Props = {
  scroll: RefObject<number>;
  /** true = prefers-reduced-motion: plain scrolling content, no camera drive */
  isStatic?: boolean;
};

export default function StoryOverlay({ scroll, isStatic = false }: Props) {
  const storyRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const onScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (isStatic) return;
      const el = e.currentTarget;
      const story = storyRef.current;
      if (!story) return;
      // §4.3: progress is measured over the seven story sections only, so the
      // trailing call-to-action section cannot desync the camera.
      const denom = story.offsetHeight - window.innerHeight;
      const p = denom > 0 ? el.scrollTop / denom : 0;
      const clamped = Math.min(1, Math.max(0, p));
      scroll.current = clamped;
      if (fillRef.current)
        fillRef.current.style.transform = `scaleY(${clamped})`;
    },
    [isStatic, scroll],
  );

  return (
    <div
      className={isStatic ? styles.scrollStatic : styles.scroll}
      onScroll={onScroll}
    >
      {!isStatic && (
        <div className={styles.progress} aria-hidden="true">
          <span ref={fillRef} />
        </div>
      )}

      <div ref={storyRef}>
        {STOPS.map((stop, i) => (
          <section
            key={stop.object}
            className={styles.section}
            style={isStatic ? undefined : { height: HEIGHTS[i] }}
          >
            <div className={styles.card}>
              {i === 0 ? (
                <h1>{stop.title}</h1>
              ) : (
                <h2>{stop.title}</h2>
              )}
              <p>{stop.body}</p>
            </div>
          </section>
        ))}
      </div>

      <CallToAction />
    </div>
  );
}
