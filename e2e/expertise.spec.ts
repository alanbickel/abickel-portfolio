import { expect, test, type Page } from '@playwright/test';

// Wedge names are read from the page: the data module imports Vite-only `~icons/*` modules.
const wedgeNames = (page: Page) =>
  page.getByRole('tab').evaluateAll((tabs) => tabs.map((tab) => tab.getAttribute('aria-label')!));

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('#expertise').scrollIntoViewIfNeeded();
});

test('selects a wedge and shows its details', async ({ page }) => {
  const [first, second] = await wedgeNames(page);
  const heading = page.getByRole('tabpanel').getByRole('heading');

  await expect(page.getByRole('tab', { name: first })).toHaveAttribute('aria-selected', 'true');
  await expect(heading).toHaveText(first);

  await page.getByRole('tab', { name: second }).click();
  await expect(page.getByRole('tab', { name: second })).toHaveAttribute('aria-selected', 'true');
  await expect(heading).toHaveText(second);
});

test('moves between wedges with the keyboard', async ({ page }) => {
  const [first, second] = await wedgeNames(page);
  await page.getByRole('tab', { name: first }).focus();
  await page.keyboard.press('ArrowRight');

  await expect(page.getByRole('tab', { name: second })).toBeFocused();
  await expect(page.getByRole('tabpanel').getByRole('heading')).toHaveText(second);
});

test('lays out the wheel beside the panel on desktop and above it on mobile', async ({ page, isMobile }) => {
  const wheel = (await page.locator('.expertise-wheel').boundingBox())!;
  const panel = (await page.getByRole('tabpanel').boundingBox())!;

  if (isMobile) {
    expect(wheel.y + wheel.height).toBeLessThanOrEqual(panel.y);
  } else {
    expect(wheel.x + wheel.width).toBeLessThanOrEqual(panel.x);
  }
});

test('keeps every wedge label inside the wheel', async ({ page }) => {
  const wheel = (await page.locator('.expertise-wheel').boundingBox())!;

  for (const label of await page.locator('.wedge-label').all()) {
    const box = (await label.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(wheel.x);
    expect(box.x + box.width).toBeLessThanOrEqual(wheel.x + wheel.width);
  }
});

// Not assertions: saves screenshots to test-results/ for a visual check of the wheel.
test('captures the wheel in both themes', async ({ page }, testInfo) => {
  const [, second] = await wedgeNames(page);
  const section = page.locator('#expertise');
  await page.getByRole('tab', { name: second }).click();
  await section.screenshot({ path: testInfo.outputPath('expertise-dark.png'), animations: 'disabled' });

  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await section.screenshot({ path: testInfo.outputPath('expertise-light.png'), animations: 'disabled' });
});
