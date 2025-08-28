const { test, expect } = require('@playwright/test');

test.describe('Smoke: Presentation essentials', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('enter demo, navigate to last slide, layout fits', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const demoBtn = page.locator('button:has-text("View Demo")').first();
    await demoBtn.scrollIntoViewIfNeeded();
    await demoBtn.click({ force: true });

    await expect(page.locator('.presentation-mode')).toBeVisible();
    await expect(page.locator('.slide-counter:has-text("1 / 9")')).toBeVisible();

    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(150);
    }

    await expect(page.locator('.slide-demo-redirect')).toBeVisible();
    await expect(page.locator('.slide-counter:has-text("9 / 9")')).toBeVisible();

    const viewport = page.viewportSize();
    const container = page.locator('.demo-redirect-container');
    const box = await container.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(Math.round(box.x + box.width)).toBeLessThanOrEqual(viewport.width + 2);
    expect(Math.round(box.y + box.height)).toBeLessThanOrEqual(viewport.height + 2);
  });

  test('mobile: final slide fits viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    const demoBtn = page.locator('button:has-text("View Demo")').first();
    await demoBtn.scrollIntoViewIfNeeded();
    await demoBtn.click({ force: true });

    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
    }

    await expect(page.locator('.slide-demo-redirect')).toBeVisible();

    const viewport = page.viewportSize();
    const container = page.locator('.demo-redirect-container');
    const box = await container.boundingBox();
    expect(Math.round(box.x)).toBeGreaterThanOrEqual(0);
    expect(Math.round(box.y)).toBeGreaterThanOrEqual(0);
    expect(Math.round(box.x + box.width)).toBeLessThanOrEqual(viewport.width + 2);
    expect(Math.round(box.y + box.height)).toBeLessThanOrEqual(viewport.height + 2);
  });
});


