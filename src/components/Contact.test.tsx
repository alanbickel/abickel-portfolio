import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import Contact, { FORMSPREE_ENDPOINT } from './Contact';

const fetchMock = vi.fn();
const executeCaptcha = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  // Stands in for Google's reCAPTCHA script, so tests never load it.
  executeCaptcha.mockResolvedValue('test-captcha-token');
  window.grecaptcha = { ready: (callback) => callback(), execute: executeCaptcha };
});

afterEach(() => {
  fetchMock.mockReset();
  executeCaptcha.mockReset();
  delete window.grecaptcha;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const fill = (label: RegExp, value: string) =>
  fireEvent.input(screen.getByLabelText(label), { target: { value } });

const fillValidForm = () => {
  fill(/your name/i, 'Ada');
  fill(/email/i, 'ada@example.com');
  fill(/message/i, 'Hello from the test suite');
};

describe('Contact', () => {
  test('flags every empty required field on submit', () => {
    render(() => <Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email or phone number')).toBeInTheDocument();
    expect(screen.getByText('Please enter the message')).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/your name/i)).toHaveAccessibleDescription('Please enter your name');
  });

  test('floats the label once the field has a value', () => {
    render(() => <Contact />);
    const field = screen.getByLabelText(/your name/i).closest('.text-field')!;

    expect(field).not.toHaveClass('shrink');
    fill(/your name/i, 'Ada');
    expect(field).toHaveClass('shrink');
  });

  test('fakes success without sending when the honeypot is filled', () => {
    const { container } = render(() => <Contact />);
    fill(/your name/i, 'Bot');
    fill(/email/i, 'bot@example.com');
    fill(/message/i, 'Buy cheap things now');
    fireEvent.input(container.querySelector('input[name="company"]')!, { target: { value: 'Spam Inc' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Thanks! Your message has been sent.');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });

  test('sends the message to Formspree and clears the form', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    render(() => <Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Thanks! Your message has been sent.');
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(FORMSPREE_ENDPOINT);
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello from the test suite',
      'g-recaptcha-response': 'test-captcha-token',
    });
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });

  test('shows an error and keeps the message when Formspree rejects it', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: 'Form not found' }] }), { status: 404 }));
    render(() => <Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong sending your message.');
    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello from the test suite');
    expect(console.error).toHaveBeenCalledWith('Failed to send message', expect.objectContaining({ message: 'Form not found' }));
  });

  test("doesn't send, and suggests pausing ad blockers, when reCAPTCHA fails", async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    executeCaptcha.mockRejectedValue(new Error('blocked'));
    render(() => <Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load spam protection");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello from the test suite');
  });
});
