import { test, expect } from '@playwright/test';

test.describe('Portfolio Smoke & Performance Test', () => {
  test('homepage should load without errors and capture performance metrics', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (exception) => {
      errors.push(exception.message);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Start performance measurement
    const startTime = Date.now();
    await page.goto('/');

    // Wait for the hero section to be visible
    await expect(page.locator('text="About"').first()).toBeVisible();
    
    // Capture performance timing
    const timing = await page.evaluate(() => JSON.stringify(window.performance.timing));
    const perfTiming = JSON.parse(timing);
    
    const domInteractive = perfTiming.domInteractive - perfTiming.navigationStart;
    const loadEventEnd = perfTiming.loadEventEnd - perfTiming.navigationStart;
    const tti = Date.now() - startTime;

    console.log(`[Performance Metrics]`);
    console.log(`DOM Interactive: ${domInteractive}ms`);
    console.log(`Load Event End: ${loadEventEnd}ms`);
    console.log(`Time to Interactive (approx): ${tti}ms`);

    // Verify lazy loading of ThreeScene (should appear after delay)
    // The canvas is rendered by Three.js
    await expect(page.locator('canvas').first()).toBeAttached({ timeout: 5000 });

    // Ensure no severe console errors
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('contact page should load without errors', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('text="Start a Project"').first()).toBeVisible();
  });
});
