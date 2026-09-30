import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
});

test('shows validation errors when submitting an empty form', async ({ page }) => {
  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.getByText('Please enter your name')).toBeVisible();
  await expect(page.getByText('Please enter your email or phone number')).toBeVisible();
  await expect(page.getByText('Please enter the message')).toBeVisible();
  await expect(page.getByLabel(/your name/i)).toHaveAttribute('aria-invalid', 'true');
});

test('floats the label above the field on focus', async ({ page }) => {
  const input = page.getByLabel(/your name/i);
  const label = page.locator('label[for="outlined-required-name"]');
  const field = page.locator('.text-field-root').filter({ has: input });

  const resting = (await label.boundingBox())!;
  await input.focus();
  // Wait for the 200ms float transition to settle.
  await expect(async () => {
    const floated = (await label.boundingBox())!;
    const fieldBox = (await field.boundingBox())!;
    expect(floated.y).toBeLessThan(resting.y);
    expect(floated.height).toBeLessThan(resting.height);
    // Fully clear of the field, not straddling its border.
    expect(floated.y + floated.height).toBeLessThanOrEqual(fieldBox.y);
  }).toPass();
});
