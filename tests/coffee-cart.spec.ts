import { test, expect } from "@playwright/test";

test("TT1 all buttons are clickable", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Espresso"]').click();
});

test('TT1 add Espresso, Machiato, Capuccino to cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
});

test('TT1 submit cart with three coffees', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('randomname');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('randomemail@gmail.com');
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('TT1 submit cart without updates checkbox', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('randomname');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email' }).fill('randomemail@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('TT1 remove items from cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('button', { name: 'Remove one Espresso Macchiato' }).click();
  await page.getByRole('button', { name: 'Remove one Espresso' }).click();
  await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();
});

test('TT1 Espresso Machiato is visible', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await expect(page.getByRole('heading', { name: 'Espresso Macchiato $' })).toBeVisible();
});

test('TT1 text esspressowater is on the page', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await expect(page.locator('[data-test="Americano"]')).toContainText('espressowater');
});

test('TT1 name input contains correct value', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('html').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('random1');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('random1');
});
