const { test, expect } = require('@playwright/test');

test.describe('Presentation Layout and UX Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Start Presentation")');
  });

  test.describe('Live Demo Slide Layout', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should have proper spacing from bottom of viewport', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      // Get the demo container
      const demoContainer = page.locator('.demo-container');
      const containerBox = await demoContainer.boundingBox();
      
      // Get viewport height
      const viewportHeight = page.viewportSize().height;
      
      // Check that container doesn't touch the bottom
      const bottomMargin = viewportHeight - (containerBox.y + containerBox.height);
      expect(bottomMargin).toBeGreaterThan(50); // At least 50px from bottom
    });

    test('should have submit button properly spaced and visible', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const submitButton = page.locator('.demo-content .btn:has-text("Submit Application")');
      await expect(submitButton).toBeVisible();

      // Check button positioning
      const buttonBox = await submitButton.boundingBox();
      const demoContent = page.locator('.demo-content');
      const contentBox = await demoContent.boundingBox();

      // Button should be within content area with proper spacing
      expect(buttonBox.y + buttonBox.height).toBeLessThan(contentBox.y + contentBox.height - 20);
    });

    test('should have form content properly contained', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const form = page.locator('.demo-content .application-form');
      const formBox = await form.boundingBox();
      const demoContent = page.locator('.demo-content');
      const contentBox = await demoContent.boundingBox();

      // Form should be properly contained within demo content
      expect(formBox.y).toBeGreaterThan(contentBox.y + 10);
      expect(formBox.y + formBox.height).toBeLessThan(contentBox.y + contentBox.height - 20);
    });

    test('should have proper form field spacing', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const formGroups = page.locator('.demo-content .form-group');
      const count = await formGroups.count();
      
      // Check spacing between form groups
      for (let i = 0; i < count - 1; i++) {
        const currentGroup = formGroups.nth(i);
        const nextGroup = formGroups.nth(i + 1);
        
        const currentBox = await currentGroup.boundingBox();
        const nextBox = await nextGroup.boundingBox();
        
        const spacing = nextBox.y - (currentBox.y + currentBox.height);
        expect(spacing).toBeGreaterThan(10); // At least 10px between groups
      }
    });

    test('should have readable form text with proper contrast', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      // Check input field contrast
      const inputs = page.locator('.demo-content .form-group input');
      const count = await inputs.count();
      
      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);
        const backgroundColor = await input.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        const color = await input.evaluate(el => 
          window.getComputedStyle(el).color
        );
        
        // Input should have light background and dark text
        expect(backgroundColor).toContain('255, 255, 255');
        expect(color).toContain('51, 51, 51'); // Dark text
      }

      // Check label contrast
      const labels = page.locator('.demo-content .form-group label');
      const labelCount = await labels.count();
      
      for (let i = 0; i < labelCount; i++) {
        const label = labels.nth(i);
        const color = await label.evaluate(el => 
          window.getComputedStyle(el).color
        );
        
        // Labels should be white
        expect(color).toContain('255, 255, 255');
      }
    });
  });

  test.describe('Responsive Layout Testing', () => {
    test('should maintain proper spacing on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const demoContainer = page.locator('.demo-container');
      const containerBox = await demoContainer.boundingBox();
      const viewportHeight = page.viewportSize().height;
      
      // Check bottom spacing on tablet
      const bottomMargin = viewportHeight - (containerBox.y + containerBox.height);
      expect(bottomMargin).toBeGreaterThan(30);
    });

    test('should maintain proper spacing on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const demoContainer = page.locator('.demo-container');
      const containerBox = await demoContainer.boundingBox();
      const viewportHeight = page.viewportSize().height;
      
      // Check bottom spacing on mobile
      const bottomMargin = viewportHeight - (containerBox.y + containerBox.height);
      expect(bottomMargin).toBeGreaterThan(20);
    });
  });

  test.describe('Form Interaction Testing', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should have proper focus states', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const firstInput = page.locator('.demo-content .form-group input').first();
      await firstInput.focus();
      
      // Check focus styling
      const borderColor = await firstInput.evaluate(el => 
        window.getComputedStyle(el).borderColor
      );
      const boxShadow = await firstInput.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      
      expect(borderColor).toContain('102, 126, 234'); // Blue border
      expect(boxShadow).toContain('rgba(102, 126, 234, 0.2)'); // Blue shadow
    });

    test('should have proper button hover states', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const submitButton = page.locator('.demo-content .btn:has-text("Submit Application")');
      await submitButton.hover();
      
      // Check hover styling
      const transform = await submitButton.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      const boxShadow = await submitButton.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      
      expect(transform).not.toBe('none'); // Should have transform
      expect(boxShadow).toContain('rgba(102, 126, 234, 0.3)'); // Enhanced shadow
    });

    test('should validate form fields properly', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      // Test invalid SSN
      const ssnInput = page.locator('input[name="ssn"]');
      await ssnInput.fill('123');
      await ssnInput.blur();
      
      // Should show error
      const errorMessage = page.locator('.demo-content .error-message');
      await expect(errorMessage).toBeVisible();
      
      // Test valid SSN
      await ssnInput.fill('123456789');
      await ssnInput.blur();
      
      // Error should disappear
      await expect(errorMessage).not.toBeVisible();
    });
  });

  test.describe('Navigation and Controls', () => {
    test('should have properly positioned navigation controls', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      // Check top controls
      const topControls = page.locator('.top-controls');
      const topBox = await topControls.boundingBox();
      expect(topBox.y).toBeGreaterThan(10); // Should be away from top edge
      
      // Check bottom controls
      const bottomControls = page.locator('.bottom-controls');
      const bottomBox = await bottomControls.boundingBox();
      const viewportHeight = page.viewportSize().height;
      expect(bottomBox.y + bottomBox.height).toBeLessThan(viewportHeight - 10); // Should be away from bottom edge
    });

    test('should have proper slide progress indicators', async ({ page }) => {
      // Navigate to live demo slide
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(300);
      }

      const dots = page.locator('.slide-dots .dot');
      const count = await dots.count();
      expect(count).toBe(6); // Should have 6 dots for 6 slides
      
      // Last dot should be active
      const lastDot = dots.nth(5);
      const isActive = await lastDot.hasClass('active');
      expect(isActive).toBe(true);
    });
  });
});
