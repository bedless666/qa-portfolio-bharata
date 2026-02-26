import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests for Japanese N5 Presentations
 * 
 * This test suite validates that all presentation HTML files load correctly
 * and display their content without errors.
 */

const presentationsDir = path.resolve(__dirname, '../presentations');

// Get list of all HTML files in presentations folder
function getPresentationFiles(): string[] {
  try {
    const files = fs.readdirSync(presentationsDir);
    return files.filter(file => file.endsWith('.html'));
  } catch {
    return [];
  }
}

const presentationFiles = getPresentationFiles();

test.describe('Japanese N5 Presentations', () => {
  
  test.describe('All Presentations Load', () => {
    
    // Generate a test for each presentation file
    for (const file of presentationFiles) {
      test(`should load: ${file}`, async ({ page }) => {
        const filePath = path.join(presentationsDir, file);
        
        // Navigate to the presentation
        await page.goto(`file://${filePath}`);
        
        // Wait for page to load
        await page.waitForLoadState('domcontentloaded');
        
        // Verify page loaded (body should exist and have content)
        const body = page.locator('body');
        await expect(body).toBeVisible();
        
        // Check that body has some content
        const bodyContent = await body.textContent();
        expect(bodyContent).toBeTruthy();
        expect(bodyContent!.length).toBeGreaterThan(0);
      });
    }
  });

  test.describe('Presentation Quality Checks', () => {
    
    test('should have all expected presentation files', async () => {
      // We expect at least 20 presentation files
      expect(presentationFiles.length).toBeGreaterThanOrEqual(20);
    });

    test('should have files covering different chapters', async () => {
      // Check for various chapter numbers
      const chapters = ['Bab 6', 'Bab 7', 'Bab 8', 'Bab 9', 'Bab 10', 'Bab 11', 'Bab 12'];
      
      for (const chapter of chapters) {
        const hasChapter = presentationFiles.some(file => file.includes(chapter));
        expect(hasChapter).toBeTruthy();
      }
    });
  });

  test.describe('Sample Presentation Detailed Check', () => {
    
    test('first presentation should have proper structure', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const firstFile = presentationFiles[0];
      const filePath = path.join(presentationsDir, firstFile);
      
      await page.goto(`file://${filePath}`);
      
      // Should have HTML structure
      const html = page.locator('html');
      await expect(html).toBeVisible();
      
      // Should have head element
      const head = page.locator('head');
      await expect(head).toBeAttached();
      
      // Should have body element
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('first presentation should have styling', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const firstFile = presentationFiles[0];
      const filePath = path.join(presentationsDir, firstFile);
      
      await page.goto(`file://${filePath}`);
      
      // Check for style element or link to stylesheet
      const hasStyles = await page.locator('style, link[rel="stylesheet"]').count();
      expect(hasStyles).toBeGreaterThan(0);
    });

    test('presentation should contain Japanese text', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const firstFile = presentationFiles[0];
      const filePath = path.join(presentationsDir, firstFile);
      
      await page.goto(`file://${filePath}`);
      
      // Get page content
      const content = await page.content();
      
      // Check for Japanese characters (hiragana, katakana, or kanji ranges)
      const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(content);
      expect(hasJapanese).toBeTruthy();
    });
  });

  test.describe('No JavaScript Errors', () => {
    
    test('presentations should load without console errors', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Test first 3 presentations
      const filesToTest = presentationFiles.slice(0, 3);
      
      for (const file of filesToTest) {
        const filePath = path.join(presentationsDir, file);
        await page.goto(`file://${filePath}`);
        await page.waitForLoadState('networkidle');
      }
      
      // Filter out common non-critical errors
      const criticalErrors = errors.filter(err => 
        !err.includes('favicon') && 
        !err.includes('404') &&
        !err.includes('font')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  });

  test.describe('Responsive Design', () => {
    
    test('presentation should be viewable on mobile', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const firstFile = presentationFiles[0];
      const filePath = path.join(presentationsDir, firstFile);
      
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto(`file://${filePath}`);
      
      // Body should be visible
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('presentation should be viewable on desktop', async ({ page }) => {
      if (presentationFiles.length === 0) {
        test.skip();
        return;
      }
      
      const firstFile = presentationFiles[0];
      const filePath = path.join(presentationsDir, firstFile);
      
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      await page.goto(`file://${filePath}`);
      
      // Body should be visible
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  });
});

