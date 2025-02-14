import { test, expect } from '@playwright/test';
import { environment } from '../../src/environments/environment';

const baseURL = environment.appUrl;

// Test Case: User Registration
test('User Registration', async ({ page }) => {
    await page.goto(`${baseURL}/register`);

    const email = `test${Date.now()}@test.com`;

    // Register
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'test');
    await page.fill('input[name="age"]', '25');
    await page.click('button[type="submit"]');

    // Verify redirect to Login page
    await expect(page).toHaveURL(`${baseURL}/login`);
});

// Test Case: User Registration of existing user
test('User Registration of existing user', async ({ page }) => {
    await page.goto(`${baseURL}/register`);

    // Register with an existing email
    await page.goto(`${baseURL}/register`);
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'password');
    await page.fill('input[name="age"]', '30');
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('.error-message')).toContainText('Email already exists');
});
