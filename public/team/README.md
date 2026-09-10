# Robotics Club, MMMUT — Team Section

Drop-in team page: header + four horizontally-marqueeing sections
(Faculty Advisors, Final Year, Third Year, Second Year Members).

## Files

```
team/
├── data/
│   └── team-data.js       ← all member info, no UI here
├── components/
│   ├── TeamCard.jsx        ← one portrait card
│   ├── TeamMarquee.jsx      ← infinite horizontal scroll of cards
│   ├── TeamSection.jsx      ← heading + a TeamMarquee
│   ├── TeamHeader.jsx       ← page title / intro
│   └── TeamPage.jsx         ← assembles everything
└── styles/
    └── team.css             ← marquee keyframes, grayscale-hover, fonts
```

## Requirements

- React 18+ and Tailwind CSS already set up in the project (this was
  built to sit inside a Next.js/React app — no other libraries needed).
- No install command required. Everything here is plain React + CSS.

## Integration

1. Copy the `team/` folder into your components directory, e.g.
   `src/components/team/`.
2. Import and render the page wherever the team route lives:

   ```jsx
   import TeamPage from "@/components/team/TeamPage";

   export default function TeamRoute() {
     return <TeamPage />;
   }
   ```

3. `TeamPage.jsx` already imports `styles/team.css`. If your project
   forbids per-component CSS imports, move the contents of
   `team.css` into your global stylesheet instead — nothing in it is
   scoped to a bundler.
4. The heading font (Space Grotesk) is loaded via `@import` inside
   `team.css` for a true drop-in. If the project already manages
   fonts (e.g. `next/font`), swap that `@import` for your normal font
   pipeline and keep the `--font-heading` / `.font-heading` class
   pointed at the same family.

## Replacing placeholder images

Each member's `image` field is generated automatically from their
name: `/team/<slug>.jpg` (e.g. `devesh-kumar-gaurav.jpg`). To add a
real photo:

1. Save the photo (portrait orientation works best — cards use a
   3:4 aspect ratio).
2. Name it exactly like the generated slug and place it in your
   project's `public/team/` folder.
3. That's it — no code changes. If a file is missing, the card
   automatically shows a generated initials avatar instead of
   breaking.

To point a member at a different filename/extension, edit that one
object in `data/team-data.js` after `withImages(...)` runs, or just
add an explicit `image: "/team/custom-name.png"` override.

## Behavior notes

- Each section is its own independent marquee — hovering or
  keyboard-focusing a card in one section only pauses that section.
- Pausing/resuming and the grayscale → color hover are pure CSS
  (`animation-play-state`, `filter`), so there's no JS overhead.
- `prefers-reduced-motion: reduce` disables the scrolling animation
  and hover transitions for users who've asked for less motion.
- Card text areas have a reserved minimum height so one-line and
  two-line names/roles don't shift the card's height.

## Customizing

- Card width breakpoints: edit the `w-40 sm:w-48 md:w-52 lg:w-56`
  classes in `TeamCard.jsx`.
- Scroll speed: pass `speed={30}` (seconds per loop) to `TeamMarquee`,
  or leave it unset to auto-scale with the number of members.
- Accent color (`#C97C3E`) and background (`#0A0C10`) are the only
  two colors you'd need to touch for a palette change — search/replace
  across the `team/` folder.
