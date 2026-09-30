import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('toggles between dark and light mode', async ({ page }) => {
  const container = page.locator('.main-container');
  await expect(container).toHaveClass(/dark-mode/);

  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(container).toHaveClass(/light-mode/);

  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(container).toHaveClass(/dark-mode/);
});

test.describe('desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'nav links are only shown on wide screens');

  test('scrolls to a section from the nav bar', async ({ page }) => {
    await page.locator('.nav-links').getByRole('button', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });
});

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'the drawer is only used on narrow screens');

  test('opens the drawer and navigates from it', async ({ page }) => {
    const drawer = page.getByRole('complementary', { name: 'Menu' });
    await expect(drawer).toBeHidden();

    await page.getByRole('button', { name: 'open drawer' }).click();
    await expect(drawer).toBeVisible();

    await drawer.getByRole('button', { name: 'Contact' }).click();
    await expect(drawer).toBeHidden();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('closes the drawer with Escape and returns focus to the menu button', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'open drawer' });
    await menuButton.click();
    await expect(page.getByRole('complementary', { name: 'Menu' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('complementary', { name: 'Menu' })).toBeHidden();
    await expect(menuButton).toBeFocused();
  });
});
