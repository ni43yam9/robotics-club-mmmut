# Bundled assets

Every binary asset below was copied from `pmndrs/examples`. The upstream repo
does **not** document the origin or license of these files.

> **license unverified: replace before public launch**

Swap points: `src/assets/landing.ts` (landing) and `src/assets/game.ts` (game).
Change the import there and the whole app picks up the new file.

## Landing (`/`)

| File | Used by | Notes |
| --- | --- | --- |
| `src/assets/landing/model.glb` | `src/routes/Landing/Model.tsx` | 7 objects (VR headset, headphones, rocket, rounded cube, table, laptop, zeppelin) **and** the baked camera animation `CameraAction.005`. Replacing this requires re-matching the camera clip and mesh names. license unverified. |

## Game (`/play`)

| File | Used by | Notes |
| --- | --- | --- |
| `src/assets/game/ship.gltf` | `3d/Ship.tsx` | player ship. license unverified. |
| `src/assets/game/rock.gltf` | `3d/Rocks.tsx` | asteroid. license unverified. |
| `src/assets/game/spacedrone.gltf` | `3d/Enemies.tsx` | enemy drone. license unverified. |
| `src/assets/game/images/earth.jpg` | `3d/Planets.tsx` | Earth texture. license unverified. |
| `src/assets/game/images/moon.png` | `3d/Planets.tsx` | Moon texture. license unverified. |
| `src/assets/game/audio/bg.mp3` | `store.ts` | background music loop. license unverified. |
| `src/assets/game/audio/engine.mp3` | `store.ts` | engine loop. license unverified. |
| `src/assets/game/audio/engine2.mp3` | `store.ts` | engine layer loop. license unverified. |
| `src/assets/game/audio/laser.mp3` | `store.ts` | fire sound. license unverified. |
| `src/assets/game/audio/warp.mp3` | `store.ts` | warp sound. license unverified. |
| `src/assets/game/audio/click.mp3` | `store.ts` | target-lock sound. license unverified. |
| `src/assets/game/audio/explosion.mp3` | `3d/Explosions.tsx` | explosion sound. license unverified. |

## Owned assets

| File | Used by | Notes |
| --- | --- | --- |
| `src/assets/logo.png` / `public/favicon.png` | `Header.tsx`, favicon | Robotics Club, MMMUT logo (supplied by the club). |
