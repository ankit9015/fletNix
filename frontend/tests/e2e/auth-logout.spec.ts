import { test, expect } from '@playwright/test';
import { environment } from '../../src/environments/environment';

const baseURL = environment.appUrl;

test('Logout', async ({ page }) => {
    // Login
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseURL}/shows`);

    // Logout
    await page.click('.logout-button');

    // Verify redirect to Login page
    await expect(page).toHaveURL(`${baseURL}/login`);

    // Try navigation to shows page
    await page.goto(`${baseURL}/shows`);

    // Verify redirect to Login page
    await expect(page).toHaveURL(`${baseURL}/login`);
});
