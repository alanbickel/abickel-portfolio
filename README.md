# mia-borgia-devfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## What is this?

A little digital portfolio for a digital creator, engineer, problem solver, and squirrel-lover!


## Quick Setup

1. Ensure you have [Node.js](https://nodejs.org/) installed. Check your installation by running:

    ```bash
    node -v
    ```

2. In the project directory, install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

5. Customize the template by navigating to the `/src/components` directory. Modify texts, pictures, and other information as needed.

The page will reload if you make edits, and you will see any lint errors in the console.

If you are interested in creating a mockup image like the ones from the personal projects section, I recommend [Genmoo](https://gemoo.com/tools/browser-mockup-generator/). This website lets you generate sleek looking browser mockups for free.

## Contact Form Setup (EmailJS)

The Contact form sends messages using [EmailJS](https://www.emailjs.com/), which relays email directly from the browser — there's no backend server, so the destination email address is configured on EmailJS's dashboard, not in the code.

1. **Create a free EmailJS account** at [emailjs.com](https://www.emailjs.com/).

2. **Add an Email Service** (Email Services -> Add New Service, e.g. connect a Gmail account). Note the generated **Service ID**.

3. **Create an Email Template** (Email Templates -> Create New Template).
    - Set the template's **"To Email"** field to the address that should receive submissions (e.g. `you@example.com`). This is the actual "where do messages go" setting.
    - Reference `{{name}}`, `{{email}}`, and `{{message}}` in the template body/subject — these match the fields sent from [Contact.tsx](src/components/Contact.tsx).
    - Note the generated **Template ID**.

4. **Get your Public Key** from Account -> General. This key is designed to be embedded in client-side code (it is not a secret), but you should still restrict where it can be used:

5. **Restrict allowed domains** under Account -> Security to your site's real domain (e.g. `https://yourusername.github.io`) so nobody else can embed your public key on another site and send mail through your account.

6. **Configure environment variables locally.** Copy `.env.example` to `.env.local` and fill in the three values from steps 2-4:

    ```bash
    cp .env.example .env.local
    ```

    ```
    VITE_EMAILJS_SERVICE_ID=...
    VITE_EMAILJS_TEMPLATE_ID=...
    VITE_EMAILJS_PUBLIC_KEY=...
    ```

    `.env.local` is gitignored and is read automatically by `npm start` and `npm run build`. Since `npm run deploy` builds locally before pushing to GitHub Pages (there's no CI pipeline), this file just needs to exist on whichever machine runs `npm run deploy`.

The form also includes baseline anti-spam protection: a hidden honeypot field, a client-side send cooldown, and input validation — see [Contact.tsx](src/components/Contact.tsx). EmailJS's free tier caps out at 200 emails/month, so these safeguards help avoid burning through that quota on spam.

## Testing

The project has two test suites.

### Unit tests (Vitest)

Component tests live next to the components in `src/` (`*.test.tsx`) and run in a simulated browser (jsdom). They're fast and cover component logic: form validation, the Expertise wheel's selection and keyboard behavior, and so on.

```bash
npm test              # watch mode
npx vitest run        # single run
```

### End-to-end tests (Playwright)

Specs in `e2e/` drive the real app in a headless Chromium browser, at both a desktop (1280px) and a mobile (Pixel 7) viewport. They cover what a simulated browser can't: responsive layout, the mobile navigation drawer, the theme toggle, scrolling, and the Timeline's scroll-triggered animations.

One-time setup, which downloads Playwright's bundled Chromium:

```bash
npx playwright install chromium
```

Then run the suite:

```bash
npm run test:e2e                        # all specs, both viewports
npx playwright test e2e/expertise.spec.ts   # one spec
npx playwright test --project=mobile    # one viewport
npx playwright test --ui                # interactive runner
```

Playwright reuses a dev server that's already running on port 5173, and starts one otherwise. After a run, `npx playwright show-report` opens the HTML report. Screenshots (for example, the Expertise wheel in both themes) and failure traces are saved to `test-results/`. Both output folders are gitignored.

## Deployment

You can choose your preferred service (e.g., [Netlify](https://www.netlify.com/), [Render](https://render.com/), [Heroku](https://www.heroku.com/)) for deployment. One of the easiest ways to host this portfolio is using GitHub Pages. Follow the instructions below for a production deploy.

1. **Set Up GitHub Repository**

    Create a new repository on GitHub for your portfolio app.

2. **Configure `package.json`**

    Edit the following properties in your `package.json` file:

    ```json
    {
        "homepage": "https://yourusername.github.io/your-repo-name",
        "scripts": {
            "predeploy": "npm run build",
            "deploy": "gh-pages -d build",
            ...
        }
    }
    ```

    Replace `yourusername` with your GitHub username and `your-repo-name` with the name of your GitHub repository.

3. **Deploy to GitHub Pages**

    Run the following command to deploy your app:

    ```bash
    npm run deploy
    ```

4. **Access Your Deployed App**

    After successfully deploying, you can access your app at `https://yourusername.github.io/your-repo-name`.


