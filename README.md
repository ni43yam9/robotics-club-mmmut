# Robotics Club — Website 2026

A two-route site for the Robotics Club at MMMUT:

- **`/`** — scroll-driven landing page. The camera glides through a 3D scene of
  seven floating objects while seven story sections scroll past, ending on a
  call to action. Based on the pmndrs **camera-scroll** example.
- **`/play`** — "The Experience": fly a ship along a glowing track, steer with
  the mouse, click to shoot rocks and drones. Based on the pmndrs **space-game**
  example. Lazy-loaded, so nothing from this route downloads on the landing page.

Unknown routes redirect to `/`.

## Stack

Vite 6 · React 19 · TypeScript · React Router 7 ·
`@react-three/fiber` 9.6.1 · `@react-three/drei` 10.7.8 · `three` 0.165.0 ·
`zustand` 5 · `three-stdlib`. HUD is plain CSS Modules (no styled-components).

## Develop

```sh
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # tsc -b && vite build  -> dist/
npm run preview      # serve dist/ locally
```

## Deploy

Static SPA. The client router owns `/play`, so the host must rewrite all
unknown paths to `/index.html`.

- **Vercel** — `vercel.json` (included) already sets the catch-all rewrite.
  `npm run build`, output dir `dist`. Deploy: `npx vercel` (or connect the repo).
- **Netlify** — `public/_redirects` (included) does the same. Build command
  `npm run build`, publish dir `dist`.
- **GitHub Pages / other** — add an equivalent SPA fallback (copy `index.html`
  to `404.html`) and set `base` in `vite.config.ts` if not served from root.

## Notes

- `prefers-reduced-motion`: the landing page drops the camera flight and shows
  the seven sections as ordinary scrolling content; `/play` shows a notice with
  a "Play anyway" button.
- Device pixel ratio is capped at `[1, 1.5]` on both routes; star count and
  shadow-map size drop on screens ≤ 700px.
- The main JS chunk is large (three.js + drei). It is required by the landing
  scene, so it is not split further; the game route **is** split out.
- Licensing: see `THIRD_PARTY_NOTICES.md` (derived code) and `ASSETS.md`
  (bundled models/textures/audio — all marked "license unverified").

## Follow-ups

### `TODO(copy)` — draft copy to replace

| Where | What |
| --- | --- |
| `src/routes/Landing/StoryOverlay.tsx` | all 7 section titles + bodies (drafts written to the VR headset / headphones / rocket / turbine / table / laptop / zeppelin stops) |
| `src/routes/Landing/CallToAction.tsx` | final headline + CTA button label |
| `src/components/Footer.tsx` | real contact email + social URLs |
| `index.html` / `src/**/useDocumentMeta` calls | page titles + meta descriptions if the drafts aren't right |
| club one-line description | not yet placed anywhere prominent — add to hero if wanted |

### Assets to replace (see `ASSETS.md`)

`model.glb`; `ship.gltf`, `rock.gltf`, `spacedrone.gltf`; `earth.jpg`,
`moon.png`; `bg/engine/engine2/laser/warp/click/explosion.mp3` — all copied
from `pmndrs/examples` with no documented license.

### Reference

`_reference/` (git-ignored) holds the two upstream examples for comparison.
Safe to delete: `rm -rf _reference`.
# rc-landing-page
