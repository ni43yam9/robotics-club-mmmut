// Ported from pmndrs/examples "space-game" (src/audio/index.ts).
// Audio elements are module-level singletons; PlayPage stops + rewinds them on
// unmount and sound stays off until the player enables it.
import {
  laserAudio,
  engineAudio,
  engine2Audio,
  bgAudio,
  warpAudio,
  clickAudio,
  explosionAudio,
} from "../../assets/game";

const mp3 = { explosion: explosionAudio };

const zap = new Audio(laserAudio);
const engine = new Audio(engineAudio);
const engine2 = new Audio(engine2Audio);
const bg = new Audio(bgAudio);
const warp = new Audio(warpAudio);
const click = new Audio(clickAudio);
const explosion = new Audio(explosionAudio);

/** Every looping/background element that must be silenced on unmount. */
const persistent = [zap, engine, engine2, bg, warp, click, explosion];

export { zap, engine, engine2, bg, warp, click, explosion, mp3, persistent };
