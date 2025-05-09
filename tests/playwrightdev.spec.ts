import { test, expect } from '@playwright/test';
import { helpers } from '../utils/helpers'

test('TT2 click GETSTARTED button and proceed', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.locator('h1')).toContainText('Installation');
});

test('TT2 go to API tab', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
});

test('TT2 open selectors property ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
  await page.getByRole('link', { name: 'selectors', exact: true }).click();
  await expect(page.getByRole('article')).toContainText(helpers.selectors);
});

test('TT2 browsers images are visible', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('img', { name: 'Browsers (Chromium, Firefox,' })).toBeVisible();
});

test('TT2 open community videos', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Community' }).click();
  await page.getByRole('link', { name: 'Conference Videos' }).click();
  await expect(page.getByRole('main')).toContainText('BreizhCamp');
});