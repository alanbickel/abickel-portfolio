# Web Portfolio - Alan Bickel  



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

## Contact Form Setup (Formspree)

The Contact form posts messages to [Formspree](https://formspree.io/), which emails them to the inbox set on the Formspree dashboard. There's no backend server and nothing secret to configure: the form endpoint is public by design, and anyone who finds it can only send mail to that one inbox.

1. **Create a Formspree account** and a new form. Formspree gives it an endpoint like `https://formspree.io/f/abcdwxyz`, and messages go to the email address you signed up with (change it in the form's settings).

2. **Point the site at your form** by setting `FORMSPREE_ENDPOINT` at the top of [Contact.tsx](src/components/Contact.tsx).

3. **Set up reCAPTCHA v3.** The form submits from JavaScript, so it uses your own reCAPTCHA keys instead of Formspree's CAPTCHA page.
    - Register a **reCAPTCHA v3** site in the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin). Add every domain the form runs on, including `localhost` for local testing and your GitHub Pages domain.
    - Put the **site key** in `RECAPTCHA_SITE_KEY` at the top of [Contact.tsx](src/components/Contact.tsx). It's public by design.
    - Paste the **secret key** into the form's reCAPTCHA settings on the Formspree dashboard. Never commit it.

4. **Send a test message** from the running site and confirm it arrives. If it's rejected, the reason is logged to the browser console.

The form sends `name`, `email`, `message`, and the reCAPTCHA token (`g-recaptcha-response`), plus a `_subject` line so messages are easy to spot in your inbox. Google's reCAPTCHA script loads only once someone starts filling in the form. Its floating badge is hidden and replaced by the notice under the Send button, as Google's terms require.

It also has baseline anti-spam protection: a hidden honeypot field, a client-side send cooldown, and input validation (see [Contact.tsx](src/components/Contact.tsx)). Formspree's free plan has a monthly submission cap, so these safeguards help avoid spending it on spam.

## Testing

The project has two test suites.

### Unit tests (Vitest)

Component tests live next to the components in `src/` (`*.test.tsx`) and run in a simulated browser (jsdom). They're fast and cover component logic: form validation, the Skills wheel's selection and keyboard behavior, and so on.

```bash
npm test              # watch mode
npx vitest run        # single run
```

### End-to-end tests (Playwright)

Specs in `e2e/` drive the real app in a headless Chromium browser, at both a desktop (1280px) and a mobile (Pixel 7) viewport. They cover what a simulated browser can't: responsive layout, the mobile navigation drawer, the theme toggle, scrolling, and the Experience timeline's scroll-triggered animations.

One-time setup, which downloads Playwright's bundled Chromium:

```bash
npx playwright install chromium
```

Then run the suite:

```bash
npm run test:e2e                        # all specs, both viewports
npx playwright test e2e/skills.spec.ts  # one spec
npx playwright test --project=mobile    # one viewport
npx playwright test --ui                # interactive runner
```

Playwright reuses a dev server that's already running on port 5173, and starts one otherwise. After a run, `npx playwright show-report` opens the HTML report. Screenshots (for example, the Skills wheel in both themes) and failure traces are saved to `test-results/`. Both output folders are gitignored.

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


