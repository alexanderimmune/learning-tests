import { test, expect } from "@playwright/test";
import { testConfig } from "../../utils/testConfig";

test.beforeEach(async ({ page }) => {
  await page.goto(testConfig.coffeeCartUrl);
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("CC-1: All buttons are clickable", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Espresso"]').click();
});

test("CC-2: Add Espresso, Machiato, Capuccino to cart", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
});

test("CC-3: Submit cart with three coffees", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).fill("randomname");
  await page.getByRole("textbox", { name: "Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("randomemail@gmail.com");
  await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
  await page.getByRole("button", { name: "Submit" }).click();
});

test("CC-4: Submit cart without updates checkbox", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).fill("randomname");
  await page.getByRole("textbox", { name: "Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("randomemail@gmail.com");
  await page.getByRole("button", { name: "Submit" }).click();
});

test("CC-5: Remove items from cart", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole("button", { name: "Remove one Espresso Macchiato" }).click();
  await page.getByRole("button", { name: "Remove one Espresso" }).click();
  await page.getByRole("button", { name: "Remove one Cappuccino" }).click();
});

test("CC-6: Espresso Machiato is visible", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Espresso Macchiato $" })).toBeVisible();
});

test("CC-7: Text esspressowater is on the page", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await expect(page.locator('[data-test="Americano"]')).toContainText("espressowater");
});

test("CC-8: Name input contains correct value", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.locator("html").click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("random1");
  await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("random1");
});
