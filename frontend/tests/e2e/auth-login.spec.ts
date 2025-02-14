import { test, expect } from '@playwright/test';
import { environment } from '../../src/environments/environment';

const baseURL = environment.appUrl;

//Test case: User Login
test('User Login', async ({ page }) => {
    await page.goto(`${baseURL}/login`);

    // Login
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');

    // Verify redirect to the shows page
    await expect(page).toHaveURL(`${baseURL}/shows`);
});

//Test case: User Login (incorrect password)
test('User Login, incorrect password', async ({ page }) => {
    await page.goto(`${baseURL}/login`);

    // Login with incorrect password
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
});
