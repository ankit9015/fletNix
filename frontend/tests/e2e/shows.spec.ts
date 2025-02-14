import { test, expect } from '@playwright/test';
import { environment } from '../../src/environments/environment';

const baseURL = environment.appUrl;

// Test Case: Search
test.describe('Search', () => {
    // Test Case: Search by Show Title
    test('Search by Show Title', async ({ page }) => {
        // Login
        await page.goto(`${baseURL}/login`);
        await page.fill('input[name="email"]', 'ankit@test.com');
        await page.fill('input[name="password"]', 'test');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${baseURL}/shows`);

        // Search
        await page.fill('input[type="text"]', 'Dick Johnson Is Dead');
        await page.click('.search-button');
        await page.waitForTimeout(1000);

        // Verify results
        const showItems = await page.locator('.show-item').all();
        for (const item of showItems) {
            await expect(item.locator('.show-title')).toContainText('Dick Johnson Is Dead');
        }
    });

    // Test Case: Search by Cast Member
    test('Search by Cast Member', async ({ page }) => {
        // Login
        await page.goto(`${baseURL}/login`);
        await page.fill('input[name="email"]', 'ankit@test.com');
        await page.fill('input[name="password"]', 'test');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${baseURL}/shows`);

        // Search
        await page.fill('input[type="text"]', 'Morgan Freeman');
        await page.click('.search-button');
        await page.waitForTimeout(1000);

        // Verify results
        const showItems = await page.locator('.show-item').all();
        for (const item of showItems) {
            await expect(item.locator('.show-cast')).toContainText('Morgan Freeman');
        }
    });
});

// Test Case: Filter Between Movies & TV Shows
test('Filter Between Movies & TV Shows', async ({ page }) => {
    // Login
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="email"]', 'ankit@test.com');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseURL}/shows`);

    // Select Movies filter
    await page.click('.movies-filter');
    await page.waitForTimeout(1000);

    // Verify results are movies only
    const showItems = await page.locator('.show-item').all();
    for (const item of showItems) {
        await expect(item.locator('.show-type')).toContainText('Movie');
    }

    // Select TV Shows filter
    await page.click('.tv-shows-filter');
    await page.waitForTimeout(1000);

    // Verify results are TV shows only
    const showItemsTV = await page.locator('.show-item').all();
    for (const item of showItemsTV) {
        await expect(item.locator('.show-type')).toContainText('TV Show');
    }
});

// Test Case: Pagination
test.describe('Show List Pagination', () => {
    // Test Case: Display shows within page limit
    test('Display shows within page limit', async ({ page }) => {
        // Login
        await page.goto(`${baseURL}/login`);
        await page.fill('input[name="email"]', 'ankit@test.com');
        await page.fill('input[name="password"]', 'test');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${baseURL}/shows`);

        // Wait for the show list to load
        await page.waitForSelector('.show-item');

        // Verify show item count <= 15
        const itemCount = await page.locator('.show-item').count();
        expect(itemCount).toBeLessThanOrEqual(15);
    });

    // Test Case: Paginate to next page
    test('Paginate to next page', async ({ page }) => {
        // Login
        await page.goto(`${baseURL}/login`);
        await page.fill('input[name="email"]', 'ankit@test.com');
        await page.fill('input[name="password"]', 'test');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${baseURL}/shows`);

        // Wait for the show list to load
        await page.waitForSelector('.show-item');

        const nextButton = page.locator('button:has-text("Next")');
        const isNextButtonEnabled = await nextButton.isEnabled();
        if (isNextButtonEnabled) {
            // first show title on current page
            const firstShowTitleBefore = await page.locator('.show-item').first()?.locator('.show-title').textContent();

            // go to next page
            await nextButton.click();
            await page.waitForTimeout(1000);

            // first show title on new page
            const firstShowTitleAfter = await page.locator('.show-item').first()?.locator('.show-title').textContent();

            // Verify that the title is not same
            expect(firstShowTitleBefore).not.toBe(firstShowTitleAfter);
        } else {
            console.warn('Next button disabled.');
        }
    });

    // Test Case: Paginate to previous page
    test('Paginate to previous page', async ({ page }) => {
        // Login
        await page.goto(`${baseURL}/login`);
        await page.fill('input[name="email"]', 'ankit@test.com');
        await page.fill('input[name="password"]', 'test');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${baseURL}/shows`);

        // Wait for the show list to load
        await page.waitForSelector('.show-item');

        const prevButton = page.locator('button:has-text("Previous")');
        const nextButton = page.locator('button:has-text("Next")');

        // Navigate to the next page
        if (await nextButton.isEnabled()) {
            await nextButton.click();
            await page.waitForTimeout(500);
        }

        const isPrevButtonEnabled = await prevButton.isEnabled();
        if (isPrevButtonEnabled) {
            // first show title on current page
            const firstShowTitleBefore = await page.locator('.show-item').first()?.locator('.show-title').textContent();

            await prevButton.click();
            await page.waitForTimeout(1000);

            // first show title on new page
            const firstShowTitleAfter = await page.locator('.show-item').first()?.locator('.show-title').textContent();

            // Verify that the title is not same
            expect(firstShowTitleBefore).not.toBe(firstShowTitleAfter);
        } else {
            console.warn('Previous button is disabled, skipping test.');
        }
    });
});

// Test Case: Age Restriction for Under 18 Users
test('Age Restriction for Under 18 Users', async ({ page }) => {
    // Login
    await page.goto(`${baseURL}/login`);
    await page.fill('input[name="email"]', 'teen@test.com');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseURL}/shows`);

    await page.waitForSelector('.show-item');

    // Verify results
    const showItems = await page.locator('.show-item').all();
    for (const item of showItems) {
        await expect(item.locator('.show-rating')).not.toHaveAttribute('data-rating', 'R');
    }
});
