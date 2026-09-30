import { createSignal, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import '../assets/styles/Contact.scss';
import SuccessIcon from '~icons/ic/outline-check-circle';
import ErrorIcon from '~icons/ic/outline-error-outline';
import InfoIcon from '~icons/ic/outline-info';
import SendIcon from '~icons/ic/baseline-send';
import TextField from './TextField';

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2000;
const SEND_COOLDOWN_MS = 30000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,}$/;

// Formspree relays submissions to the inbox set on its dashboard. The endpoint is public by
// design: anyone who finds it can only send mail to that inbox, never to anyone else.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpajdva';

// reCAPTCHA v3 scores each submission invisibly; Formspree checks the token with the secret key
// stored on its dashboard. The site key is public and meant to be in page code.
const RECAPTCHA_SITE_KEY = '6LfJ0dctAAAAAAQ1YpvL7CEKcqCTPCxV0RnaX-5_';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

class CaptchaError extends Error {}

let recaptchaScript: Promise<void> | undefined;

// Loaded on first use of the form, so Google's script stays off the page for visitors who never contact me.
const loadRecaptcha = () => {
  if (window.grecaptcha) return Promise.resolve();
  recaptchaScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Allow a retry on the next attempt (for example, after pausing an ad blocker).
      script.remove();
      recaptchaScript = undefined;
      reject(new CaptchaError('reCAPTCHA script failed to load'));
    };
    document.head.append(script);
  });
  return recaptchaScript;
};

const getRecaptchaToken = async () => {
  await loadRecaptcha();
  const grecaptcha = window.grecaptcha!;
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  try {
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
  } catch (error) {
    throw new CaptchaError(`reCAPTCHA failed: ${String(error)}`);
  }
};

type StatusMessage = {
  severity: 'success' | 'error' | 'info';
  text: string;
};

const statusIcons = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function Contact() {

  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');
  // Honeypot: real visitors never see or fill this in. Bots that blindly fill every
  // input on the page will populate it, which is how we tell them apart.
  const [company, setCompany] = createSignal('');

  const [nameError, setNameError] = createSignal(false);
  const [emailError, setEmailError] = createSignal(false);
  const [emailErrorText, setEmailErrorText] = createSignal('');
  const [messageError, setMessageError] = createSignal(false);
  const [messageErrorText, setMessageErrorText] = createSignal('');

  const [isSending, setIsSending] = createSignal(false);
  const [status, setStatus] = createSignal<StatusMessage | null>(null);

  // Component functions run once, so a plain variable persists like a React ref.
  let lastSentAt = 0;

  const sendEmail = (e: SubmitEvent) => {
    e.preventDefault();

    if (isSending()) {
      return;
    }

    const msSinceLastSend = Date.now() - lastSentAt;
    if (lastSentAt !== 0 && msSinceLastSend < SEND_COOLDOWN_MS) {
      const secondsLeft = Math.ceil((SEND_COOLDOWN_MS - msSinceLastSend) / 1000);
      setStatus({ severity: 'info', text: `Please wait ${secondsLeft}s before sending another message.` });
      return;
    }

    const trimmedName = name().trim();
    const trimmedEmail = email().trim();
    const trimmedMessage = message().trim();

    const isNameValid = trimmedName !== '';
    const isEmailValid = EMAIL_PATTERN.test(trimmedEmail) || PHONE_PATTERN.test(trimmedEmail);
    const isMessageValid = trimmedMessage.length >= MESSAGE_MIN_LENGTH && trimmedMessage.length <= MESSAGE_MAX_LENGTH;

    setNameError(!isNameValid);

    setEmailError(!isEmailValid);
    setEmailErrorText(
      trimmedEmail === '' ? 'Please enter your email or phone number' : 'Please enter a valid email or phone number'
    );

    setMessageError(!isMessageValid);
    setMessageErrorText(
      trimmedMessage === ''
        ? 'Please enter the message'
        : `Message must be between ${MESSAGE_MIN_LENGTH} and ${MESSAGE_MAX_LENGTH} characters`
    );

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    // Bot caught in the honeypot: pretend it worked so scrapers don't learn to avoid the trap,
    // but never actually send (and don't burn the monthly submission quota on spam).
    if (company().trim() !== '') {
      lastSentAt = Date.now();
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
      setStatus({ severity: 'success', text: 'Thanks! Your message has been sent.' });
      return;
    }

    setIsSending(true);
    setStatus(null);

    getRecaptchaToken()
      .then((token) =>
        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          // Accept: JSON makes Formspree answer with a status instead of redirecting to its thank-you page.
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            _subject: `Portfolio message from ${trimmedName}`,
            'g-recaptcha-response': token,
          }),
        })
      )
      .then(async (response) => {
        if (!response.ok) {
          // Formspree explains rejections (spam checks, CAPTCHA, quota) in an `errors` list.
          const body = await response.json().catch(() => null);
          throw new Error(body?.errors?.map((error: { message: string }) => error.message).join('; ') || `HTTP ${response.status}`);
        }
      })
      .then(() => {
        lastSentAt = Date.now();
        setStatus({ severity: 'success', text: 'Thanks! Your message has been sent.' });
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error: unknown) => {
        console.error('Failed to send message', error);
        setStatus({
          severity: 'error',
          // Ad and privacy blockers commonly block Google's reCAPTCHA script.
          text: error instanceof CaptchaError
            ? "Couldn't load spam protection, so your message wasn't sent. If you use an ad blocker, try pausing it for this site."
            : 'Something went wrong sending your message. Please try again later.',
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div id="contact">
      <div class="items-container">
        <div class="contact_wrapper">
          <h1>Contact Me</h1>
          <form
            novalidate
            autocomplete="off"
            class='contact-form'
            onSubmit={sendEmail}
            // Start loading reCAPTCHA as soon as someone begins filling in the form.
            onFocusIn={() => loadRecaptcha().catch(() => {})}
          >
            <div class='form-flex'>
              <TextField
                required
                id="outlined-required-name"
                label="Your Name"
                placeholder="What's your name?"
                value={name()}
                onInput={setName}
                error={nameError()}
                helperText={nameError() ? "Please enter your name" : ""}
              />
              <TextField
                required
                id="outlined-required-email"
                label="Email"
                placeholder="How can I reach you?"
                value={email()}
                onInput={setEmail}
                error={emailError()}
                helperText={emailError() ? emailErrorText() : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              class="body-form"
              value={message()}
              onInput={setMessage}
              error={messageError()}
              helperText={messageError() ? messageErrorText() : ""}
              maxLength={MESSAGE_MAX_LENGTH}
            />
            {/* Honeypot field: invisible to real visitors, catches bots that auto-fill every input */}
            <input
              type="text"
              name="company"
              value={company()}
              onInput={(e) => setCompany(e.currentTarget.value)}
              class="visually-hidden"
              tabIndex={-1}
              autocomplete="off"
              aria-hidden="true"
            />
            <Show when={status()}>
              {(current) => (
                <div role="alert" class={`alert alert-${current().severity}`}>
                  <div class="alert-icon">
                    <Dynamic component={statusIcons[current().severity]} />
                  </div>
                  <div class="alert-message">{current().text}</div>
                </div>
              )}
            </Show>
            <button type="submit" class="send-button" disabled={isSending()}>
              {isSending() ? 'Sending...' : 'Send'}
              <span class="send-button-icon"><SendIcon /></span>
            </button>
            {/* Google allows hiding the reCAPTCHA badge only if this notice is shown instead. */}
            <p class="recaptcha-notice">
              This form is protected by reCAPTCHA. The Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
