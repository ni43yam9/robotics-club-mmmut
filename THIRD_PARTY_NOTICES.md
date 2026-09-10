# Third-party notices

## pmndrs/examples

Parts of this project are derived from the MIT-licensed
[`pmndrs/examples`](https://github.com/pmndrs/examples) repository — the
`camera-scroll` and `space-game` examples.

### Files derived from `examples/camera-scroll`

| This project | Upstream file |
| --- | --- |
| `src/routes/Landing/Model.tsx` | `src/Model.tsx` (accent color + asset import changed; animation math unchanged) |
| `src/routes/Landing/Scene.tsx` | `src/App.tsx` (Canvas setup; `eventSource` now a ref) |
| `src/routes/Landing/StoryOverlay.tsx` | `src/Overlay.tsx` (scroll→progress; progress now clamped to the story sections; debug caption removed) |
| `src/routes/Landing/Landing.module.css` | `src/styles.css` |

### Files derived from `examples/space-game`

| This project | Upstream file |
| --- | --- |
| `src/routes/Play/store.ts` | `src/store.ts` (added reset / start / setPaused / dispose lifecycle actions) |
| `src/routes/Play/audio.ts` | `src/audio/index.ts` |
| `src/routes/Play/GameCanvas.tsx` | `src/App.tsx` |
| `src/routes/Play/Hud.tsx` + `Hud.module.css` | `src/Hud.tsx` (styled-components → CSS module; links replaced) |
| `src/routes/Play/3d/*` | `src/3d/*` (asset imports routed through `src/assets/game.ts`) |
| `src/routes/Play/3d/react-three-fiber-jsx.d.ts` | `src/3d/react-three-fiber-jsx.d.ts` |

### MIT License

```
MIT License

Copyright (c) 2024 Poimandres

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
