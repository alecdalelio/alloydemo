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

    test('should navigate through all 10 slides with keyboard', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate through all 10 slides with arrow keys
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(500);
      }
      
      // Should be on the last slide (demo redirect)
      await expect(page.locator('.slide-demo-redirect')).toBeVisible();
      
      // Check slide counter shows 10/10
      await expect(page.locator('.slide-counter:has-text("10 / 10")')).toBeVisible();
    });

    test('should show business problem slide', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to business problem slide (slide 2)
      await page.keyboard.press('ArrowRight');
      
      await expect(page.locator('.slide-list h2:has-text("The Business Problem")')).toBeVisible();
      await expect(page.locator('.slide-list h3:has-text("Fraud Prevention Challenges")')).toBeVisible();
      
      // Check for business metrics
      await expect(page.locator('li:has-text("$5.8B in fraud losses")')).toBeVisible();
      await expect(page.locator('li:has-text("40+ hours per week")')).toBeVisible();
    });

    test('should show solution overview slide', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to solution overview slide (slide 3)
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      
      await expect(page.locator('.slide-content h2:has-text("Solution Overview")')).toBeVisible();
      await expect(page.locator('.slide-content p:has-text("fraud detection")')).toBeVisible();
    });

    test('should show business impact slide', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to business impact slide (slide 7)
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      await expect(page.locator('.slide-list h2:has-text("Business Impact & ROI")')).toBeVisible();
      await expect(page.locator('.slide-list h3:has-text("Measurable Business Value")')).toBeVisible();
      
      // Check for ROI metrics
      await expect(page.locator('li:has-text("80% decrease")')).toBeVisible();
      await expect(page.locator('li:has-text("$150K+ annually")')).toBeVisible();
    });

    test('should show production readiness slide', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to production readiness slide (slide 8)
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      await expect(page.locator('.slide-list h2:has-text("Production Readiness")')).toBeVisible();
      await expect(page.locator('.slide-list h3:has-text("Enterprise deployment")')).toBeVisible();
      
      // Check for production considerations
      await expect(page.locator('li:has-text("Security:")')).toBeVisible();
      await expect(page.locator('li:has-text("Monitoring:")')).toBeVisible();
      await expect(page.locator('li:has-text("Compliance:")')).toBeVisible();
      await expect(page.locator('li:has-text("Scalability:")')).toBeVisible();
    });

    test('should show testing strategy slide', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      await page.click('button:has-text("View Demo")');
      
      // Navigate to testing strategy slide (slide 9)
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      await expect(page.locator('.slide-list h2:has-text("Testing Strategy")')).toBeVisible();
      await expect(page.locator('.slide-list h3:has-text("Quality Assurance Excellence")')).toBeVisible();
      
      // Check for testing strategies
      await expect(page.locator('li:has-text("Playwright E2E Testing:")')).toBeVisible();
      await expect(page.locator('li:has-text("Unit Testing:")')).toBeVisible();
      await expect(page.locator('li:has-text("Integration Testing:")')).toBeVisible();
      await expect(page.locator('li:has-text("Test Coverage:")')).toBeVisible();
    });

    test('should show code snippets properly', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      await page.click('button:has-text("View Demo")');
      
      // Navigate to frontend code slide (slide 5)
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check frontend code slide
      await expect(page.locator('.slide-code')).toBeVisible();
      await expect(page.locator('.code-snippet')).toBeVisible();
      
      await page.keyboard.press('ArrowRight');
      
      // Check backend code slide
      await expect(page.locator('.slide-code')).toBeVisible();
    });

    test('should support Home/End keyboard navigation', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      await page.click('button:has-text("View Demo")');
      
      // Navigate to middle slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Press Home to go to first slide
      await page.keyboard.press('Home');
      await expect(page.locator('.slide-title h1:has-text("Alloy Integration Demo")')).toBeVisible();
      await expect(page.locator('.slide-counter:has-text("1 / 10")')).toBeVisible();
      
      // Press End to go to last slide
      await page.keyboard.press('End');
      await expect(page.locator('.slide-live-demo')).toBeVisible();
      await expect(page.locator('.slide-counter:has-text("10 / 10")')).toBeVisible();
    });
  });

  test.describe('Tablet View', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should be responsive on tablet', async ({ page }) => {
      // Wait for the page to load and the button to be stable
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('button:has-text("View Demo")', { state: 'visible' });
      await page.click('button:has-text("View Demo")');
      
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
      await page.click('button:has-text("View Demo")');
      
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
      await page.click('button:has-text("View Demo")');
      
      // Check that content is still visible and properly sized
      await expect(page.locator('.slide-title h1')).toBeVisible();
    });
  });

  test.describe('Demo Redirect Functionality', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should show demo redirect slide with proper layout', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
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
      await page.click('button:has-text("View Demo")');
      
      // Navigate to demo redirect slide (slide 10)
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check technical showcase container
      await expect(page.locator('.tech-showcase')).toBeVisible();
      await expect(page.locator('.showcase-label:has-text("Key Features")')).toBeVisible();
      
      // Check all four technical capability items
      await expect(page.locator('.tech-showcase-item')).toHaveCount(4);
      await expect(page.locator('.tech-showcase-item:has-text("API Integration")')).toBeVisible();
      await expect(page.locator('.tech-showcase-item:has-text("Form Validation")')).toBeVisible();
      await expect(page.locator('.tech-showcase-item:has-text("Error Handling")')).toBeVisible();
      await expect(page.locator('.tech-showcase-item:has-text("Testing")')).toBeVisible();
    });

    test('should display redirect section with call-to-action', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to demo redirect slide (slide 10)
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check redirect section
      await expect(page.locator('.redirect-section')).toBeVisible();
      await expect(page.locator('.redirect-content h4:has-text("Ready to try it?")')).toBeVisible();
      await expect(page.locator('.redirect-btn:has-text("Go to Demo")')).toBeVisible();
    });

    test('should handle redirect button click', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Navigate to demo redirect slide (slide 10)
      for (let i = 0; i < 9; i++) {
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
      await page.click('button:has-text("View Demo")');
      
      // Navigate to demo redirect slide (slide 10)
      for (let i = 0; i < 9; i++) {
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

    test('should show enhanced keyboard shortcuts help', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check for enhanced keyboard shortcuts
      await expect(page.locator('.keyboard-help span:has-text("Home/End Jump")')).toBeVisible();
    });

    test('should display correct slide progress', async ({ page }) => {
      await page.click('button:has-text("View Demo")');
      
      // Check initial slide counter
      await expect(page.locator('.slide-counter:has-text("1 / 10")')).toBeVisible();
      
      // Navigate to middle slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check middle slide counter
      await expect(page.locator('.slide-counter:has-text("6 / 10")')).toBeVisible();
      
      // Navigate to last slide
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }
      
      // Check final slide counter
      await expect(page.locator('.slide-counter:has-text("10 / 10")')).toBeVisible();
    });
  });
});
