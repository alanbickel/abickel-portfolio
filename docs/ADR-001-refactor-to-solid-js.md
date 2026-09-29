# ADR-001: Refactor from React to Solid JS

- **Status:** Proposed
- **Date:** 2026-09-29

## Context

Opting to refactor this portfolio project from React to Solid JS for ease-of-maintenance purposes.

Original stack: 

- **Create React App** (`react-scripts`), which is deprecated and no longer maintained
- **React 18**
- **MUI** (`@mui/material`, `@mui/icons-material`) with Emotion, used mostly for cosmetic components (Chip, Button, TextField, Alert, AppBar, Drawer)
- **FontAwesome** via `@fortawesome/react-fontawesome`
- **`react-vertical-timeline-component`** for the work history section
- **SCSS** for styling. Several stylesheets already override MUI and timeline library class names.

_Most of the refactor effort is expected to lie in replacing React-only libraries._

## Decision

Rewrite the site in **Solid JS**, built with **Vite**, and replace React-only dependencies as follows:

| Current | Replacement | Notes |
|---|---|---|
| `react-scripts` (CRA) | Vite + `vite-plugin-solid` | Migrate tooling first, while still on React |
| `@mui/material` + `@emotion/*` | Plain HTML elements styled with SCSS | Drops the Emotion runtime; existing SCSS already does most of the styling |
| MUI Drawer (mobile nav) | CSS slide-in panel | Handle focus and `Escape` manually. Reconsider Kobalte `Dialog` if the accessibility work gets involved |
| `@mui/icons-material` | `unplugin-icons` + `@iconify-json/mdi` | One module per icon; see [Icon imports](#icon-imports) |
| `@fortawesome/react-fontawesome` | `unplugin-icons` + `@iconify-json/fa6-brands`, `@iconify-json/fa6-solid` | |
| `react-vertical-timeline-component` | Custom Timeline component + SCSS | No Solid port exists. Mirror the existing class names so `Timeline.scss` carries over |
| `FadeIn` (`React.Children` + timers) | CSS `@keyframes` + `animation-delay` per child | Simpler than porting the timer logic |
| `@testing-library/react` + Jest | Vitest + `@solidjs/testing-library` | |

Unchanged: `@emailjs/browser`, `sass`, `gh-pages`.

### Icon imports

Import each icon from its own module. Do **not** use destructured imports from a barrel file. Barrel imports pull in the whole icon set and are known to cause runtime lag in Vitest.

```ts
// Don't
import { FaBrandsGithub, FaBrandsLinkedin } from 'solid-icons/fa';

// Do
import IconGithub from '~icons/fa6-brands/github';
import IconLinkedin from '~icons/fa6-brands/linkedin';
```

This rule is why the site uses `unplugin-icons` instead of `solid-icons`. `solid-icons` only exposes one barrel per icon set (`solid-icons/fa`, `solid-icons/md`, …) and has no per-icon import paths.

## Consequences

**Positive**
- The maintainer works in the framework they know best
- Smaller bundle: React, MUI, and Emotion are all removed
- Moves off deprecated CRA onto maintained tooling with faster dev builds
- Fewer third-party UI dependencies to keep updated

**Negative / risks**
- Accessibility and behavior that MUI provided for free now has to be built by hand: TextField labels and helper text, the Drawer's focus handling, and button states
- The timeline has to be rebuilt, which is the largest single work item
- Environment variables are renamed (`REACT_APP_*` → `VITE_*`), so `.env.local` and `.env.example` must be updated
- Solid's reactivity model differs from React's: props must not be destructured, and component functions run only once

## Cutover plan

The work happens on the `solidjs-refactor` branch, with one commit per logical change (the framework swap, then each component). The branch is merged to `main` as a whole, using a regular merge so the per-component history is kept.

Phase 1 leaves the site building and passing tests. From Phase 2 until the Timeline is ported in Phase 5, **the branch is expected not to build**: `vite-plugin-solid` compiles all JSX as Solid, so any component still written in React fails. Each commit in that stretch should still type-check the files it touches. Build and tests pass again after Phase 5.

### Phase 1: CRA → Vite (still React)
- Add `vite`, `@vitejs/plugin-react`, and `vite.config.ts`, and move `public/index.html` to the project root
- Set `base: './'` (replaces `homepage`) so asset URLs are relative and the build works at a domain root or any subpath. Set `build.outDir: 'build'` so the `deploy` script keeps working
- Rename env vars to `VITE_EMAILJS_*` and read them via `import.meta.env`, then update `.env.example`
- Replace Jest with Vitest, and remove `react-scripts`, `reportWebVitals`, and `react-app-env.d.ts`
- Upgrade TypeScript to 5.x (needed for `moduleResolution: "bundler"`) and `@types/node` to 24 (Vite's peer requirement)
- Replace CRA-only `require()` asset imports with ES `import`s
- Verify with dev, build, and a gh-pages deploy

### Phase 2: Framework swap
- Replace `@vitejs/plugin-react` with `vite-plugin-solid`
- Update tsconfig to `"jsx": "preserve"` and `"jsxImportSource": "solid-js"`
- Rewrite `index.tsx` to use `render()` from `solid-js/web`
- Add `unplugin-icons` (configured with `compiler: 'solid'`), the needed `@iconify-json/*` sets, and `@solidjs/testing-library`

### Phase 3: Static components
- Port Main, Footer, Summary, Expertise, and Project
- `className` → `class`, `.map()` → `<For>`
- Replace MUI `Chip` with a styled `<span class="chip">`, and replace icons with per-icon `~icons/...` imports

### Phase 4: Stateful components
- **App:** use `createSignal` for `mode`, and pass the getter directly (drop the `parentToChild` wrapper)
- **Navigation:** use signals for `scrolled` and `mobileOpen`, with the scroll listener in `onMount`/`onCleanup`. Replace AppBar, Drawer, and List with semantic `<nav>`/`<ul>` markup and a CSS slide-in panel
- **Contact:** turn form state into signals (or one `createStore`), and make `lastSentAt` a plain variable. Replace TextField/Alert/Button with native elements plus SCSS, keeping labels, `aria-invalid`, and `aria-describedby` for errors
- **FadeIn:** replace with CSS staggered animation

### Phase 5: Timeline (last)
- Build a `Timeline`/`TimelineItem` component pair that mirrors the library's DOM structure and class names
- Move the library's layout styles into `Timeline.scss` and remove `react-vertical-timeline-component`

### Phase 6: Cleanup
- Remove all remaining React, MUI, Emotion, and FontAwesome-React packages
- Confirm no `react` imports remain, then run the tests, build, and deploy
- Mark this ADR **Accepted**
