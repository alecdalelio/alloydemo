const { test, expect } = require('@playwright/test');

test.describe('Alloy Demo Interactive Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display demo button in header', async ({ page }) => {
      const demoBtn = page.locator('button:has-text("View Demo")');
      await expect(demoBtn).toBeVisible();
    });

    test('should enter demo mode when button is clicked', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check that we're in demo mode
      await expect(page.locator('.presentation-mode')).toBeVisible();
      await expect(page.locator('.slide-title h1:has-text("Alloy Integration Demo")')).toBeVisible();
    });

    test('should navigate through all slides with keyboard', async ({ page }) => {
      await page.click('button:has-text("Start Presentation")');
      
      // Navigate through slides with arrow keys
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(500);
      }
      
      // Should be on the last slide (live demo)
      await expect(page.locator('.slide-live-demo')).toBeVisible();
    });

    test('should show code snippets properly', async ({ page }) => {
      await page.click('button:has-text("Start Presentation")');
      
      // Navigate to code slides
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      
      // Check frontend code slide
      await expect(page.locator('.slide-code')).toBeVisible();
      await expect(page.locator('.code-snippet')).toBeVisible();
      
      await page.keyboard.press('ArrowRight');
      
      // Check backend code slide
      await expect(page.locator('.slide-code')).toBeVisible();
    });
  });

  test.describe('Tablet View', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should be responsive on tablet', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check that content is properly sized
      const title = page.locator('.slide-title h1');
      await expect(title).toBeVisible();
      
      // Check that code container is scrollable
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      
      const codeContainer = page.locator('.code-container');
      await expect(codeContainer).toBeVisible();
    });
  });

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should be responsive on mobile', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check that navigation controls are properly sized
      const navBtn = page.locator('.nav-btn');
      await expect(navBtn.first()).toBeVisible();
      
      // Check that demo container is properly sized
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      
      const demoContainer = page.locator('.demo-container');
      await expect(demoContainer).toBeVisible();
    });

    test('should handle landscape orientation', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      await page.click('button:has-text("View Demo")');
      
      // Check that content is still visible and properly sized
      await expect(page.locator('.slide-title h1')).toBeVisible();
    });
  });

  test.describe('Live Demo Functionality', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should show live application form in demo', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check that form is visible
      await expect(page.locator('.demo-content .application-form')).toBeVisible();
      await expect(page.locator('input[name="firstName"]')).toBeVisible();
    });

    test('should handle form submission in demo', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Fill out form with approved test data
      await page.fill('input[name="firstName"]', 'John');
      await page.fill('input[name="lastName"]', 'Smith');
      await page.fill('input[name="email"]', 'john.smith@example.com');
      await page.fill('input[name="phone"]', '1234567890');
      await page.fill('input[name="ssn"]', '123456789');
      await page.fill('input[name="birth_date"]', '1990-01-01');
      await page.fill('input[name="address1"]', '123 Main St');
      await page.fill('input[name="city"]', 'New York');
      await page.fill('input[name="state"]', 'NY');
      await page.fill('input[name="zip"]', '10001');
      
      // Submit form
      await page.click('button:has-text("Submit Application")');
      
      // Check for outcome display
      await expect(page.locator('.demo-outcome')).toBeVisible();
    });

    test('should test manual review scenario', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Fill out form with manual review test data
      await page.fill('input[name="firstName"]', 'Jessica');
      await page.fill('input[name="lastName"]', 'Review');
      await page.fill('input[name="email"]', 'jessica.review@example.com');
      await page.fill('input[name="phone"]', '1234567890');
      await page.fill('input[name="ssn"]', '123456789');
      await page.fill('input[name="birth_date"]', '1990-01-01');
      await page.fill('input[name="address1"]', '123 Main St');
      await page.fill('input[name="city"]', 'New York');
      await page.fill('input[name="state"]', 'NY');
      await page.fill('input[name="zip"]', '10001');
      
      // Submit form
      await page.click('button:has-text("Submit Application")');
      
      // Check for manual review outcome
      await expect(page.locator('.outcome-display.outcome-manual-review')).toBeVisible();
    });
  });

  test.describe('Presentation Controls', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should handle fullscreen toggle', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      const fullscreenBtn = page.locator('button:has-text("⤢ Fullscreen")');
      await expect(fullscreenBtn).toBeVisible();
      
      await fullscreenBtn.click();
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
  });
});
