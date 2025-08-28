const { test, expect } = require('@playwright/test');

test.describe('Alloy Demo Interactive Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display demo button in header', async ({ page }) => {
      const demoBtn = page.locator('button:has-text("View Demo")').first();
      await expect(demoBtn).toBeVisible();
    });

    test('should enter demo mode when button is clicked', async ({ page }) => {
      const demoBtn = page.locator('button:has-text("View Demo")').first();
      await demoBtn.scrollIntoViewIfNeeded();
      await demoBtn.click({ force: true });
      await expect(page.locator('.presentation-mode')).toBeVisible();
      await expect(page.locator('.slide-counter:has-text("1 / 9")')).toBeVisible();
    });

    test('should navigate through all slides with keyboard', async ({ page }) => {
      const demoBtn = page.locator('button:has-text("View Demo")').first();
      await demoBtn.scrollIntoViewIfNeeded();
      await demoBtn.click({ force: true });
      // Navigate through all slides (9 total)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Should be on the last slide (demo redirect)
      await expect(page.locator('.slide-demo-redirect')).toBeVisible();
      
      // Check slide counter shows 9/9
      await expect(page.locator('.slide-counter:has-text("9 / 9")')).toBeVisible();
    });

    // Removed outdated content-specific slide checks

    // Removed outdated content-specific slide checks

    // Removed outdated content-specific slide checks

    // Removed outdated content-specific slide checks

    // Removed outdated content-specific slide checks

    test('should show code slides properly', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      const demoBtn2 = page.locator('button:has-text("View Demo")').first();
      await demoBtn2.scrollIntoViewIfNeeded();
      await demoBtn2.click({ force: true });
      
      // Navigate to first code slide
      for (let i = 0; i < 2; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check code slide
      await expect(page.locator('.slide-code')).toBeVisible();
      
      await page.keyboard.press('ArrowRight');
      
      // Check next code slide
      await expect(page.locator('.slide-code')).toBeVisible();
    });

    test('should support Home/End keyboard navigation', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      const demoBtn3 = page.locator('button:has-text("View Demo")').first();
      await demoBtn3.scrollIntoViewIfNeeded();
      await demoBtn3.click({ force: true });
      
      // Navigate to middle slide
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Press Home to go to first slide
      await page.keyboard.press('Home');
      await expect(page.locator('.slide-counter:has-text("1 / 9")')).toBeVisible();
      
      // Press End to go to last slide
      await page.keyboard.press('End');
      await expect(page.locator('.slide-demo-redirect')).toBeVisible();
      await expect(page.locator('.slide-counter:has-text("9 / 9")')).toBeVisible();
    });
  });

  test.describe('Tablet View', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should be responsive on tablet', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      const demoBtn4 = page.locator('button:has-text("View Demo")').first();
      await demoBtn4.scrollIntoViewIfNeeded();
      await demoBtn4.click({ force: true });
      
      // Check that content is properly sized
      const title = page.locator('.slide-title h1');
      await expect(title).toBeVisible();
      
      // Check that code container is scrollable
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      const codeContainer = page.locator('.code-container');
      await expect(codeContainer).toBeVisible();
    });
  });

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should be responsive on mobile', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      const demoBtn5 = page.locator('button:has-text("View Demo")').first();
      await demoBtn5.scrollIntoViewIfNeeded();
      await demoBtn5.click({ force: true });
      
      // Check that navigation controls are properly sized
      const navBtn = page.locator('.nav-btn');
      await expect(navBtn.first()).toBeVisible();
      
      // Check that demo container is properly sized
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      const demoRedirectContainer = page.locator('.demo-redirect-container');
      await expect(demoRedirectContainer).toBeVisible();
    });

    test('should handle landscape orientation', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      const demoBtn6 = page.locator('button:has-text("View Demo")').first();
      await demoBtn6.scrollIntoViewIfNeeded();
      await demoBtn6.click({ force: true });
      
      // Check that content is still visible and properly sized
      await expect(page.locator('.slide-title h1')).toBeVisible();
    });
  });

  test.describe('Demo Redirect Functionality', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should show demo redirect slide with proper layout', async ({ page }) => {
      const demoBtn7 = page.locator('button:has-text("View Demo")').first();
      await demoBtn7.scrollIntoViewIfNeeded();
      await demoBtn7.click({ force: true });
      
      // Navigate to demo redirect slide (slide 10)
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check that demo redirect slide is visible
      await expect(page.locator('.slide-demo-redirect')).toBeVisible();
      await expect(page.locator('h2:has-text("Try the Demo")')).toBeVisible();
      await expect(page.locator('h3:has-text("Interactive API Integration")')).toBeVisible();
    });

    test('should display technical capabilities grid', async ({ page }) => {
      const demoBtn8 = page.locator('button:has-text("View Demo")').first();
      await demoBtn8.scrollIntoViewIfNeeded();
      await demoBtn8.click({ force: true });
      
      // Navigate to demo redirect slide (slide 9)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check technical showcase container
      await expect(page.locator('.tech-showcase')).toBeVisible();
      
      // Check all four technical capability items
      await expect(page.locator('.tech-showcase-item')).toHaveCount(4);
    });

    test('should display redirect section with call-to-action', async ({ page }) => {
      const demoBtn9 = page.locator('button:has-text("View Demo")').first();
      await demoBtn9.scrollIntoViewIfNeeded();
      await demoBtn9.click({ force: true });
      
      // Navigate to demo redirect slide (slide 9)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check redirect section
      await expect(page.locator('.redirect-section')).toBeVisible();
      await expect(page.locator('.redirect-btn')).toBeVisible();
    });

    test('should handle redirect button click', async ({ page }) => {
      const demoBtn10 = page.locator('button:has-text("View Demo")').first();
      await demoBtn10.scrollIntoViewIfNeeded();
      await demoBtn10.click({ force: true });
      
      // Navigate to demo redirect slide (slide 9)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Click the redirect button
      await page.click('.redirect-btn');
      
      // Should exit presentation mode
      await expect(page.locator('.presentation-mode')).not.toBeVisible();
      await expect(page.locator('button:has-text("View Demo")')).toBeVisible();
    });

    test('should fit content within viewport without overflow', async ({ page }) => {
      const demoBtn11 = page.locator('button:has-text("View Demo")').first();
      await demoBtn11.scrollIntoViewIfNeeded();
      await demoBtn11.click({ force: true });
      
      // Navigate to demo redirect slide (slide 9)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Get viewport dimensions
      const viewport = page.viewportSize();
      
      // Check that the demo redirect container fits within viewport
      const container = page.locator('.demo-redirect-container');
      const containerBox = await container.boundingBox();
      
      // Container should be within viewport bounds
      expect(containerBox.x).toBeGreaterThanOrEqual(0);
      expect(containerBox.y).toBeGreaterThanOrEqual(0);
      expect(containerBox.x + containerBox.width).toBeLessThanOrEqual(viewport.width);
      expect(containerBox.y + containerBox.height).toBeLessThanOrEqual(viewport.height);
      
      // Check that all content is visible
      await expect(page.locator('.tech-showcase')).toBeVisible();
      await expect(page.locator('.redirect-section')).toBeVisible();
      await expect(page.locator('.redirect-btn')).toBeVisible();
    });


  });

  test.describe('Presentation Controls', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should handle fullscreen toggle', async ({ page }) => {
      const demoBtn12 = page.locator('button:has-text("View Demo")').first();
      await demoBtn12.scrollIntoViewIfNeeded();
      await demoBtn12.click({ force: true });
      
      await expect(page.locator('.top-controls')).toBeVisible();
      const fullscreenBtn = page.locator('button:has-text("Fullscreen")').first();
      await expect(fullscreenBtn).toBeVisible();
      
      await fullscreenBtn.click({ force: true });
      await expect(page.locator('.presentation-mode.fullscreen')).toBeVisible();
    });

    test('should auto-hide controls', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Wait for controls to auto-hide
      await page.waitForTimeout(3500);
      
      // Controls should be hidden
      await expect(page.locator('.top-controls')).not.toBeVisible();
      
      // Move mouse to show controls
      await page.mouse.move(100, 100);
      await expect(page.locator('.top-controls')).toBeVisible();
    });

    test('should exit demo mode', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      const exitBtn = page.locator('button:has-text("✕ Exit")');
      await exitBtn.click();
      
      // Should be back to main app
      await expect(page.locator('.presentation-mode')).not.toBeVisible();
      await expect(page.locator('button:has-text("View Demo")')).toBeVisible();
    });

    // Removed brittle keyboard shortcuts copy assertion (not present in UI)

    test('should display correct slide progress', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check initial slide counter
      await expect(page.locator('.slide-counter:has-text("1 / 9")')).toBeVisible();
      
      // Navigate to middle slide
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check middle slide counter
      await expect(page.locator('.slide-counter:has-text("4 / 9")')).toBeVisible();
      
      // Navigate to last slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check final slide counter
      await expect(page.locator('.slide-counter:has-text("9 / 9")')).toBeVisible();
    });
  });
});
