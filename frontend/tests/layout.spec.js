const { test, expect } = require('@playwright/test');

test.describe('Final Slide Layout and Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("View Demo")');
    // Go to final slide (slide 9)
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);
    }
    await expect(page.locator('.slide-demo-redirect')).toBeVisible();
  });

  test('should show technical showcase and redirect CTA', async ({ page }) => {
    await expect(page.locator('.tech-showcase')).toBeVisible();
    await expect(page.locator('.redirect-section')).toBeVisible();
    await expect(page.locator('.redirect-btn')).toBeVisible();
  });

  test('should fit content within viewport (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const viewport = page.viewportSize();
    const container = page.locator('.demo-redirect-container');
    const box = await container.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });

  test('should fit content within viewport (tablet)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const viewport = page.viewportSize();
    const container = page.locator('.demo-redirect-container');
    const box = await container.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });

  test('should fit content within viewport (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const viewport = page.viewportSize();
    const container = page.locator('.demo-redirect-container');
    const box = await container.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });
});
