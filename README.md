# Web Portfolio - Alan Bickel  
 
_Technical Skills and experience, but snazzy._

A `SolidJS` front-end to organize my technical skills and employment history, plus a brief overview of my engineering worldview.  If you're looking for my portfolio site, you'll find it at [https://alanbickel.github.io/abickel-portfolio](https://alanbickel.github.io/abickel-portfolio).

## Attribution 

- Thanks to [am0eba-byte](https://github.com/am0eba-byte/) for inspiration, permission to fork, and sanity checks.  

- Credit to [yujisatojr](https://github.com/yujisatojr/react-portfolio-template) for the [original template](https://github.com/yujisatojr/react-portfolio-template).



## Setup

```bash
# requires Node 20.19 or newer
npm install 
```

## Running locally

```bash
# dev server (hot reloads)

npm start           # serves on http://localhost:5173

# serve prod bundle

npm run build       # type-check with tsc, then build with Vite. outputs to build/
npm run preview     # serve the built site locally
```

## Project Structure

The site is built with [SolidJS](https://www.solidjs.com/), [Vite](https://vite.dev/), TypeScript, and SCSS. More information on design choices and architecture available in [ADR-001](docs/ADR-001-refactor-to-solid-js.md).

| Path | Contents |
| --- | --- |
| `src/data/experience.ts` | Roles, bullets, lens tags, and `highlight` flags (the default Experience view) |
| `src/data/skills.ts` | Skill areas and their chips |
| `src/components/` | One component per section; hero (`Main.tsx`) and About copy live here |
| `src/assets/styles/` | One stylesheet per component; colors and fonts in `_theme.scss` |
| `e2e/` | Playwright specs |

## Contact Form Setup (Formspree)

The Contact form posts messages through [Formspree](https://formspree.io/). Requires an existing form endpoint.   

1. Set `FORMSPREE_ENDPOINT` in `src\components\Contact.tsx` with the target form endpoint.

2. **Set up reCAPTCHA v3.** 
    - Register a **reCAPTCHA v3** site in the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin). 
    - Include `localhost` in allowed domains for local testing.
    - Include the domain of hosted application.
    - Set `RECAPTCHA_SITE_KEY` in `src\components\Contact.tsx` with the public reCAPTCHA key.
    - Provide **secret key** in Formspree (form reCAPTCHA settings). Never commit secrets.

**Note:** _Google's reCAPTCHA script loads only once someone starts filling in the form. reCAPTCHA notice present under the Send button, as required by Google's ToS._

## Testing

The project has two test suites.

### Unit tests (Vitest)

Component tests live next to the components in `src/` (`*.test.tsx`) and run in a simulated browser (jsdom). They're fast and cover component logic: form validation, the Skills wheel's selection and keyboard behavior, and so on.

```bash
npm test              # watch mode
npx vitest run        # single run
```

### End-to-end tests (Playwright)

Specs in `e2e/` drive the app in a headless Chromium browser, at desktop (1280px) and a mobile (Pixel 7) viewport. Covers responsive layout, mobile navigation drawer, theme toggle, scrolling, and Experience timeline animations.

#### E2E setup

```bash
npx playwright install chromium
```

#### Running E2E suite 

**Note:** _Screenshots and failure traces saved to `test-results/`_

```bash
npm run test:e2e                        # all specs, both viewports
npx playwright test e2e/skills.spec.ts  # one spec
npx playwright test --project=mobile    # one viewport
npx playwright test --ui                # interactive runner

# View test results
npx playwright show-report
```

## Deployment

The site is hosted on GitHub Pages at [alanbickel.github.io/abickel-portfolio](https://alanbickel.github.io/abickel-portfolio/).

Deploys from developer maching using [`gh-pages`](https://www.npmjs.com/package/gh-pages). Requires git credentials.

```bash

# 1. Typecheck and compile to build/
# 2. Push build/ to gh-pages branch on remote

npm run deploy
```
**Note:** _Github Pages deploy can take a few minutes to publish._

### Configure hosting 

1. Run `npm run deploy` once. this creates the `gh-pages` branch.
2. On GitHub, open the repo's **Settings -> Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose the `gh-pages` branch and the `/ (root)` folder.
3. add the domain of hosted application (`<username>.github.io`) to  [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin). 
