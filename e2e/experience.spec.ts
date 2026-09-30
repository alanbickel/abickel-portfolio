import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('reveals timeline entries as they scroll into view', async ({ page }) => {
  const lastEntry = page.locator('.vertical-timeline-element-content').last();

  await expect(lastEntry).toHaveClass(/is-hidden/);

  await lastEntry.scrollIntoViewIfNeeded();
  await expect(lastEntry).toHaveClass(/bounce-in/);
});

test('filters bullets with the lens bar', async ({ page }) => {
  const lensBar = page.getByRole('group', { name: 'Filters' });
  const status = page.locator('.lens-status');
  await lensBar.scrollIntoViewIfNeeded();

  await expect(lensBar.getByRole('button', { name: 'Highlights' })).toHaveAttribute('aria-pressed', 'true');
  const highlightStatus = await status.textContent();

  await lensBar.getByRole('button', { name: 'All' }).click();
  await expect(lensBar.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  await expect(status).not.toHaveText(highlightStatus!);
  await expect(page.locator('.timeline-empty')).toHaveCount(0);
});

test('keeps the lens bar pinned below the navbar while scrolling the timeline', async ({ page }) => {
  const lensBar = page.locator('.lens-bar');
  await page.locator('.vertical-timeline-element').nth(2).scrollIntoViewIfNeeded();

  await expect(lensBar).toBeInViewport();
  // Retry until the page-load fade-in (sections slide up 20px) has settled.
  await expect(async () => {
    const navBottom = (await page.locator('#navigation').boundingBox())!;
    const bar = (await lensBar.boundingBox())!;
    expect(Math.round(bar.y)).toBe(Math.round(navBottom.y + navBottom.height));
  }).toPass();
});

// Not assertions: saves screenshots to test-results/ for a visual check.
test('captures the timeline', async ({ page }, testInfo) => {
  const experience = page.locator('#experience');
  for (const entry of await page.locator('.vertical-timeline-element').all()) {
    await entry.scrollIntoViewIfNeeded();
  }
  await page.getByRole('button', { name: 'All' }).click();
  await experience.screenshot({ path: testInfo.outputPath('experience-all.png'), animations: 'disabled' });

  await page.getByRole('button', { name: 'Coaching & Team Building' }).click();
  await experience.screenshot({ path: testInfo.outputPath('experience-coaching.png'), animations: 'disabled' });
});
