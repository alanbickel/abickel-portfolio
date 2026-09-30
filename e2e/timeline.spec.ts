import { expect, test } from '@playwright/test';

// FIXME: re-enable once the Timeline has career history entries again.
test.fixme('reveals timeline entries as they scroll into view', async ({ page }) => {
  await page.goto('/');
  const lastEntry = page.locator('.vertical-timeline-element-content').last();

  await expect(lastEntry).toHaveClass(/is-hidden/);

  await lastEntry.scrollIntoViewIfNeeded();
  await expect(lastEntry).toHaveClass(/bounce-in/);
});
