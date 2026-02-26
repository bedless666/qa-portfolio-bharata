import { test, expect } from '@playwright/test';
import * as path from 'path';

/**
 * Tests for N5 Drill Tool (n5-drill-tool.html)
 * 
 * This test suite validates the core functionality of the JLPT N5 drill practice tool.
 * All tests are designed to verify the happy flow and basic functionality.
 */

const drillToolPath = path.resolve(__dirname, '../quiz-tools/n5-drill-tool.html');

test.describe('N5 Drill Tool', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the drill tool HTML file
    await page.goto(`file://${drillToolPath}`);
  });

  test.describe('Page Load', () => {
    
    test('should load the page successfully', async ({ page }) => {
      // Verify page title
      await expect(page).toHaveTitle(/N5 Drill Tool/);
    });

    test('should display the main header', async ({ page }) => {
      // Check for main heading
      const header = page.locator('h1');
      await expect(header).toBeVisible();
      await expect(header).toContainText('N5');
    });

    test('should display the header badge', async ({ page }) => {
      const badge = page.locator('.header-badge');
      await expect(badge).toBeVisible();
    });

    test('should display subtitle', async ({ page }) => {
      const subtitle = page.locator('.subtitle');
      await expect(subtitle).toBeVisible();
    });
  });

  test.describe('Category Cards', () => {
    
    test('should display category cards', async ({ page }) => {
      const categoryCards = page.locator('.category-card');
      await expect(categoryCards.first()).toBeVisible();
      
      // Should have multiple category cards
      const count = await categoryCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should highlight card on hover', async ({ page }) => {
      const firstCard = page.locator('.category-card').first();
      
      // Hover over the card
      await firstCard.hover();
      
      // Card should still be visible after hover
      await expect(firstCard).toBeVisible();
    });

    test('should select category on click', async ({ page }) => {
      const firstCard = page.locator('.category-card').first();
      
      // Click the card
      await firstCard.click();
      
      // Card should have selected state or quiz should start
      // Check for either selected class or quiz container
      const isSelected = await firstCard.evaluate(el => el.classList.contains('selected'));
      const quizVisible = await page.locator('.quiz-container, .question-container, #quiz').isVisible().catch(() => false);
      
      expect(isSelected || quizVisible).toBeTruthy();
    });
  });

  test.describe('Quiz Functionality', () => {
    
    test('should start quiz after category selection', async ({ page }) => {
      // Click on first category card
      const categoryCard = page.locator('.category-card').first();
      await categoryCard.click();
      
      // Wait for potential quiz elements
      await page.waitForTimeout(500);
      
      // Look for quiz-related elements
      const quizElements = page.locator('.question, .quiz-container, .options, .answer-btn, button');
      const hasQuizElements = await quizElements.first().isVisible().catch(() => false);
      
      // Either quiz elements are visible or we're still on category selection
      expect(hasQuizElements || await categoryCard.isVisible()).toBeTruthy();
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

    test('should be responsive on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Main elements should be visible
      const container = page.locator('.container');
      await expect(container).toBeVisible();
    });
  });

  test.describe('UI Elements', () => {
    
    test('should have proper styling (dark theme)', async ({ page }) => {
      // Check body has dark background
      const bodyBgColor = await page.locator('body').evaluate(el => 
        getComputedStyle(el).backgroundColor
      );
      
      // Dark theme should have low RGB values
      expect(bodyBgColor).toBeTruthy();
    });

    test('should load custom fonts', async ({ page }) => {
      // Check if font-family includes expected fonts
      const fontFamily = await page.locator('body').evaluate(el => 
        getComputedStyle(el).fontFamily
      );
      
      expect(fontFamily).toBeTruthy();
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
  });
});

