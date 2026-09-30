import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { skillAreas } from '../data/skills';
import Skills from './Skills';

const [first, second] = skillAreas;
const last = skillAreas[skillAreas.length - 1];

// Rendered text has its whitespace collapsed, so compare against the same form of the copy.
const normalized = (text: string) => text.replace(/\s+/g, ' ').trim();

const tab = (label: string) => screen.getByRole('tab', { name: label });
const panel = () => screen.getByRole('tabpanel');

describe('Skills', () => {
  test('renders a wedge per area with the first one selected', () => {
    render(() => <Skills />);

    expect(screen.getAllByRole('tab')).toHaveLength(skillAreas.length);
    expect(tab(first.label)).toHaveAttribute('aria-selected', 'true');
    expect(tab(first.label)).toHaveAttribute('tabindex', '0');
    expect(tab(second.label)).toHaveAttribute('tabindex', '-1');
    expect(panel()).toHaveAccessibleName(first.label);
    expect(panel()).toHaveTextContent(normalized(first.summary));
  });

  test('clicking a wedge shows its details', () => {
    render(() => <Skills />);
    fireEvent.click(tab(second.label));

    expect(tab(second.label)).toHaveAttribute('aria-selected', 'true');
    expect(tab(first.label)).toHaveAttribute('aria-selected', 'false');
    expect(panel()).toHaveTextContent(normalized(second.summary));
    for (const skill of second.skills) {
      expect(panel()).toHaveTextContent(skill.name);
    }
  });

  test('arrow keys move selection and focus, wrapping around the wheel', () => {
    render(() => <Skills />);

    fireEvent.keyDown(tab(first.label), { key: 'ArrowRight' });
    expect(tab(second.label)).toHaveAttribute('aria-selected', 'true');
    expect(tab(second.label)).toHaveFocus();

    fireEvent.keyDown(tab(second.label), { key: 'ArrowLeft' });
    fireEvent.keyDown(tab(first.label), { key: 'ArrowLeft' });
    expect(tab(last.label)).toHaveAttribute('aria-selected', 'true');
    expect(panel()).toHaveTextContent(normalized(last.summary));
  });

  test('marks working-level skills in their chip', () => {
    render(() => <Skills />);
    const area = skillAreas.find((a) => a.skills.some((s) => s.level === 'working'))!;
    const skill = area.skills.find((s) => s.level === 'working')!;
    fireEvent.click(tab(area.label));

    expect(screen.getByText(skill.name).closest('.chip')).toHaveTextContent(/working/);
  });
});
