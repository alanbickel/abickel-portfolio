import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2000;
const SEND_COOLDOWN_MS = 30000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,}$/;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type StatusMessage = {
  severity: 'success' | 'error' | 'info';
  text: string;
};

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  // Honeypot: real visitors never see or fill this in. Bots that blindly fill every
  // input on the page will populate it, which is how we tell them apart.
  const [company, setCompany] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [messageError, setMessageError] = useState<boolean>(false);
  const [messageErrorText, setMessageErrorText] = useState<string>('');

  const [isSending, setIsSending] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);

  const form = useRef();
  const lastSentAt = useRef<number>(0);

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    const msSinceLastSend = Date.now() - lastSentAt.current;
    if (lastSentAt.current !== 0 && msSinceLastSend < SEND_COOLDOWN_MS) {
      const secondsLeft = Math.ceil((SEND_COOLDOWN_MS - msSinceLastSend) / 1000);
      setStatus({ severity: 'info', text: `Please wait ${secondsLeft}s before sending another message.` });
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

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
    // but never actually call EmailJS (and don't burn the monthly send quota on spam).
    if (company.trim() !== '') {
      lastSentAt.current = Date.now();
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
      setStatus({ severity: 'success', text: 'Thanks! Your message has been sent.' });
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        'EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, ' +
        'and VITE_EMAILJS_PUBLIC_KEY in .env.local (see .env.example).'
      );
      setStatus({ severity: 'error', text: 'Sorry, the contact form is not configured yet.' });
      return;
    }

    const templateParams = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    };

    setIsSending(true);
    setStatus(null);

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        lastSentAt.current = Date.now();
        setStatus({ severity: 'success', text: 'Thanks! Your message has been sent.' });
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error: any) => {
        console.error('Failed to send message', error);
        setStatus({ severity: 'error', text: 'Something went wrong sending your message. Please try again later.' });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className='contact-form'
          >
            <div className='form-flex'>
              <TextField
                required
                id="outlined-required-name"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
              />
              <TextField
                required
                id="outlined-required-email"
                label="Email"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? emailErrorText : ""}
              />
            </div>
            <TextField
              required
              id="outlined-multiline-static"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? messageErrorText : ""}
              inputProps={{ maxLength: MESSAGE_MAX_LENGTH }}
            />
            {/* Honeypot field: invisible to real visitors, catches bots that auto-fill every input */}
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="visually-hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {status && (
              <Alert severity={status.severity} sx={{ marginBottom: '15px' }}>
                {status.text}
              </Alert>
            )}
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendEmail}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
