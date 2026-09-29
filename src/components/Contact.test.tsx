import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }));

const fill = (label: RegExp, value: string) =>
  fireEvent.input(screen.getByLabelText(label), { target: { value } });

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
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });
});
