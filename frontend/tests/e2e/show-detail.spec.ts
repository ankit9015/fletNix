import { test, expect } from '@playwright/test';
import { environment } from '../../src/environments/environment';

const baseURL = environment.appUrl;

// Test Case: Navigate to Detail Page
test('Navigate to Detail Page', async ({ page }) => {
    // Login
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseURL}/shows`);

    const showLink = await page.getAttribute('.show-item a', 'href');
    const showId = showLink?.split('/').pop();

    // Click on a show card
    await page.click('.show-item a');
    await page.waitForTimeout(500);

    // Verify detail page
    await expect(page).toHaveURL(`${baseURL}/shows/${showId}`);
    await expect(page.locator('.show-title')).toBeVisible();
    await expect(page.locator('.show-description')).toBeVisible();
    await expect(page.locator('.show-type')).toBeVisible();
    await expect(page.locator('.show-director')).toBeVisible();
    await expect(page.locator('.show-cast')).toBeVisible();
    await expect(page.locator('.show-country')).toBeVisible();
    await expect(page.locator('.show-date')).toBeVisible();
    await expect(page.locator('.show-release-year')).toBeVisible();
    await expect(page.locator('.show-rating')).toBeVisible();
    await expect(page.locator('.show-duration')).toBeVisible();
    await expect(page.locator('.show-listed-in')).toBeVisible();
});
