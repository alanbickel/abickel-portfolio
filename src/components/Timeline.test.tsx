import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { lenses, roles } from '../data/experience';
import Timeline from './Timeline';

const EMPTY_NOTE = 'No relevant experience for this role. Try choosing another filter.';
const allPoints = roles.flatMap((role) => role.points);
const lensButton = (name: string) => screen.getByRole('button', { name });
const isShown = (text: string) => screen.queryByText(text) !== null;

describe('Timeline', () => {
  test('shows only highlights by default', () => {
    render(() => <Timeline />);
    const highlights = allPoints.filter((point) => point.highlight);

    expect(lensButton('Highlights')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(`Showing ${highlights.length} of ${allPoints.length}`)).toBeInTheDocument();
    for (const point of allPoints) {
      expect(isShown(point.text)).toBe(!!point.highlight);
    }
  });

  test('keeps every role on the timeline, with a note when the lens has nothing for it', () => {
    render(() => <Timeline />);
    const rolesWithoutHighlights = roles.filter((role) => !role.points.some((point) => point.highlight));

    for (const role of roles) {
      expect(screen.getByRole('heading', { name: role.title })).toBeInTheDocument();
    }
    expect(screen.queryAllByText(EMPTY_NOTE)).toHaveLength(rolesWithoutHighlights.length);
  });

  test('filters bullets by the selected lens', () => {
    render(() => <Timeline />);
    const lens = lenses[0];
    fireEvent.click(lensButton(lens.label));

    expect(lensButton(lens.label)).toHaveAttribute('aria-pressed', 'true');
    expect(lensButton('Highlights')).toHaveAttribute('aria-pressed', 'false');
    for (const point of allPoints) {
      expect(isShown(point.text)).toBe(point.tags.includes(lens.id));
    }
  });

  test('labels the filter group and lists Highlights and All first', () => {
    render(() => <Timeline />);
    const group = screen.getByRole('group', { name: 'Filters' });
    const labels = Array.from(group.querySelectorAll('button')).map((button) => button.textContent);

    expect(labels).toEqual(['Highlights', 'All', ...lenses.map((lens) => lens.label)]);
  });

  test('shows role dates as month and year', () => {
    render(() => <Timeline />);

    expect(screen.getByText('Jun 2023 - Sep 2026')).toBeInTheDocument();
    expect(screen.getByText('Mar 2017 - Jun 2018')).toBeInTheDocument();
  });

  test('swaps the timeline marker icon to match the selected lens', () => {
    const { container } = render(() => <Timeline />);
    const markerIcon = () => container.querySelector('.vertical-timeline-element-icon svg')!.innerHTML;

    const highlightsIcon = markerIcon();
    fireEvent.click(lensButton(lenses[0].label));
    expect(markerIcon()).not.toBe(highlightsIcon);
  });

  test('shows every bullet, including sub-points, with no lens', () => {
    render(() => <Timeline />);
    fireEvent.click(lensButton('All'));

    expect(screen.getByText(`Showing ${allPoints.length} of ${allPoints.length}`)).toBeInTheDocument();
    for (const point of allPoints) {
      expect(isShown(point.text)).toBe(true);
      for (const detail of point.details ?? []) {
        expect(screen.getByText(detail)).toBeInTheDocument();
      }
    }
  });
});
