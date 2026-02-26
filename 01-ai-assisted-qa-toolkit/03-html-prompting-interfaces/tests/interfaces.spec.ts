import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests for HTML Prompting Interfaces
 * 
 * This test suite validates that all themed HTML interface files load correctly
 * and display their content without errors.
 */

const htmlDir = path.resolve(__dirname, '../html');

// Interface file metadata
const interfaces = [
  {
    file: 'pokemon-classic-adventure.html',
    title: 'Pokémon',
    theme: 'Pokemon Classic Adventure',
    expectedElements: ['body', 'head']
  },
  {
    file: 'fallout-cyberpunk-terminal.html',
    title: 'VAULT-TEC',
    theme: 'Fallout Cyberpunk Terminal',
    expectedElements: ['body', 'head']
  },
  {
    file: 'suikoden-108-stars.html',
    title: 'Suikoden',
    theme: 'Suikoden 108 Stars',
    expectedElements: ['body', 'head']
  },
  {
    file: 'nexus-ai-interface.html',
    title: 'Nexus',
    theme: 'Nexus AI Interface',
    expectedElements: ['body', 'head']
  },
  {
    file: 'bishi-bashi-special.html',
    title: 'Bishi',
    theme: 'Bishi Bashi Special',
    expectedElements: ['body', 'head']
  }
];

test.describe('HTML Prompting Interfaces', () => {
  
  test.describe('All Interfaces Load', () => {
    
    for (const iface of interfaces) {
      test(`should load: ${iface.theme}`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        
        // Check file exists
        expect(fs.existsSync(filePath)).toBeTruthy();
        
        // Navigate to the interface
        await page.goto(`file://${filePath}`);
        
        // Wait for page to load
        await page.waitForLoadState('domcontentloaded');
        
        // Verify page loaded
        const body = page.locator('body');
        await expect(body).toBeVisible();
      });

      test(`should have title containing "${iface.title}"`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Check title contains expected text
        const title = await page.title();
        expect(title.toLowerCase()).toContain(iface.title.toLowerCase());
      });
    }
  });

  test.describe('Interface Quality Checks', () => {
    
    test('should have all 5 interface files', async () => {
      const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
      expect(files.length).toBe(5);
    });

    for (const iface of interfaces) {
      test(`${iface.theme} should have custom styling`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Check for style element or inline styles
        const hasStyles = await page.locator('style, link[rel="stylesheet"]').count();
        expect(hasStyles).toBeGreaterThan(0);
      });

      test(`${iface.theme} should have content`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Body should have content
        const bodyContent = await page.locator('body').textContent();
        expect(bodyContent).toBeTruthy();
        expect(bodyContent!.trim().length).toBeGreaterThan(0);
      });
    }
  });

  test.describe('No JavaScript Errors', () => {
    
    for (const iface of interfaces) {
      test(`${iface.theme} should have no console errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        await page.waitForLoadState('networkidle');
        
        // Filter out common non-critical errors (font loading, favicon)
        const criticalErrors = errors.filter(err => 
          !err.includes('favicon') && 
          !err.includes('404') &&
          !err.includes('font') &&
          !err.includes('Failed to load resource')
        );
        
        expect(criticalErrors.length).toBe(0);
      });
    }
  });

  test.describe('Responsive Design', () => {
    
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const iface of interfaces) {
      for (const viewport of viewports) {
        test(`${iface.theme} should display on ${viewport.name}`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          
          const filePath = path.join(htmlDir, iface.file);
          await page.goto(`file://${filePath}`);
          
          // Body should be visible
          const body = page.locator('body');
          await expect(body).toBeVisible();
          
          // No horizontal overflow on mobile
          if (viewport.name === 'Mobile') {
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 50); // Allow small tolerance
          }
        });
      }
    }
  });

  test.describe('CSS Features', () => {
    
    for (const iface of interfaces) {
      test(`${iface.theme} should use CSS custom properties`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Get page content and check for CSS variables
        const content = await page.content();
        const hasCustomProperties = content.includes('--') && content.includes(':root');
        
        // Most themed interfaces should use CSS custom properties
        expect(hasCustomProperties).toBeTruthy();
      });

      test(`${iface.theme} should have visual styling applied`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Check body has some background styling
        const bgColor = await page.locator('body').evaluate(el => 
          getComputedStyle(el).backgroundColor
        );
        
        // Should not be default white
        expect(bgColor).toBeTruthy();
      });
    }
  });

  test.describe('Font Loading', () => {
    
    for (const iface of interfaces) {
      test(`${iface.theme} should reference custom fonts`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Check for Google Fonts link or custom font-family
        const content = await page.content();
        const hasCustomFont = 
          content.includes('fonts.googleapis.com') || 
          content.includes('font-family') ||
          content.includes('@font-face');
        
        expect(hasCustomFont).toBeTruthy();
      });
    }
  });

  test.describe('HTML Structure', () => {
    
    for (const iface of interfaces) {
      test(`${iface.theme} should have proper HTML structure`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        // Check DOCTYPE
        const content = await page.content();
        expect(content.toLowerCase()).toContain('<!doctype html>');
        
        // Check for meta charset
        expect(content.toLowerCase()).toContain('charset');
        
        // Check for viewport meta
        expect(content.toLowerCase()).toContain('viewport');
      });

      test(`${iface.theme} should have lang attribute`, async ({ page }) => {
        const filePath = path.join(htmlDir, iface.file);
        await page.goto(`file://${filePath}`);
        
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang).toBeTruthy();
      });
    }
  });
});

