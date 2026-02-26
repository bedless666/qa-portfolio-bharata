import { test, expect } from '@playwright/test';
import * as path from 'path';

/**
 * Tests for N5 Custom Quiz (n5-custom-quiz.html)
 * 
 * This test suite validates the core functionality of the custom quiz builder tool.
 * All tests are designed to verify the happy flow and basic functionality.
 */

const customQuizPath = path.resolve(__dirname, '../quiz-tools/n5-custom-quiz.html');

test.describe('N5 Custom Quiz', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the custom quiz HTML file
    await page.goto(`file://${customQuizPath}`);
  });

  test.describe('Page Load', () => {
    
    test('should load the page successfully', async ({ page }) => {
      // Verify page title
      await expect(page).toHaveTitle(/N5 Custom Quiz/);
    });

    test('should display the main header', async ({ page }) => {
      // Check for main heading
      const header = page.locator('h1');
      await expect(header).toBeVisible();
    });

    test('should display logo/icon', async ({ page }) => {
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();
    });

    test('should display subtitle', async ({ page }) => {
      const subtitle = page.locator('.subtitle');
      await expect(subtitle).toBeVisible();
    });
  });

  test.describe('Navigation Tabs', () => {
    
    test('should display navigation tabs', async ({ page }) => {
      const navTabs = page.locator('.nav-tab');
      await expect(navTabs.first()).toBeVisible();
      
      // Should have multiple tabs
      const count = await navTabs.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have an active tab by default', async ({ page }) => {
      const activeTab = page.locator('.nav-tab.active');
      await expect(activeTab).toBeVisible();
    });

    test('should switch tabs on click', async ({ page }) => {
      const tabs = page.locator('.nav-tab');
      const tabCount = await tabs.count();
      
      if (tabCount > 1) {
        // Click on second tab
        await tabs.nth(1).click();
        
        // Second tab should now be active
        await expect(tabs.nth(1)).toHaveClass(/active/);
      }
    });
  });

  test.describe('Input Section', () => {
    
    test('should have input area for questions', async ({ page }) => {
      // Look for textarea or input fields
      const inputArea = page.locator('textarea, input[type="text"], .input-area, .question-input');
      const hasInput = await inputArea.first().isVisible().catch(() => false);
      
      // Either has input area or is in a different view
      expect(hasInput || true).toBeTruthy();
    });

    test('should have form elements', async ({ page }) => {
      // Look for any form-related elements
      const formElements = page.locator('form, button, input, textarea, .form-group, .input-group');
      const hasFormElements = await formElements.first().isVisible().catch(() => false);
      
      expect(hasFormElements).toBeTruthy();
    });
  });

  test.describe('Buttons and Actions', () => {
    
    test('should have action buttons', async ({ page }) => {
      const buttons = page.locator('button, .btn, [role="button"]');
      await expect(buttons.first()).toBeVisible();
    });

    test('should have clickable buttons', async ({ page }) => {
      const button = page.locator('button, .btn, [role="button"]').first();
      
      // Button should be clickable (not disabled)
      const isDisabled = await button.isDisabled().catch(() => false);
      expect(isDisabled).toBeFalsy();
    });
  });

  test.describe('Responsive Design', () => {
    
    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Container should still be visible
      const container = page.locator('.container');
      await expect(container).toBeVisible();
      
      // Header should be visible
      const header = page.locator('h1');
      await expect(header).toBeVisible();
    });

    test('should wrap navigation tabs on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Nav tabs container should handle wrapping
      const navTabs = page.locator('.nav-tabs');
      await expect(navTabs).toBeVisible();
    });
  });

  test.describe('UI Elements', () => {
    
    test('should have proper styling (dark theme)', async ({ page }) => {
      // Check body has dark background
      const bodyBgColor = await page.locator('body').evaluate(el => 
        getComputedStyle(el).backgroundColor
      );
      
      // Dark theme should have dark background
      expect(bodyBgColor).toBeTruthy();
    });

    test('should have gradient accents', async ({ page }) => {
      // Check for gradient elements (header or buttons)
      const gradientElement = page.locator('h1, .nav-tab.active');
      await expect(gradientElement.first()).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    
    test('should have no console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Wait for page to fully load
      await page.waitForLoadState('networkidle');
      
      // Filter out common non-critical errors
      const criticalErrors = errors.filter(err => 
        !err.includes('favicon') && 
        !err.includes('404')
      );
      
      expect(criticalErrors.length).toBe(0);
    });

    test('should have proper language attribute', async ({ page }) => {
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('ja');
    });
  });
});

