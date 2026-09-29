import { describe, expect, test } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import App from './App';

describe('App', () => {
  test('renders the main page sections', () => {
    render(() => <App />);
    for (const heading of ['Who Am I?', 'Wheelhouse', 'Contact Me']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
  });
});
