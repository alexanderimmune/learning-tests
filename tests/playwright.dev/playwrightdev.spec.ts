import { test, expect } from "@playwright/test";
import { helpers } from "../../utils/helpers";
import { testConfig } from "../../utils/testConfig";

test.beforeEach(async ({ page }) => {
  await page.goto(testConfig.playwrightDevUrl);
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("PWD-1: Click GETSTARTED button and proceed", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page.locator("h1")).toContainText("Installation");
});

test("PWD-2: Go to API tab", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.getByRole("link", { name: "API" }).click();
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toBeVisible();
});

test("PWD-3: Open selectors property ", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.getByRole("link", { name: "API" }).click();
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toBeVisible();
  await page.getByRole("link", { name: "selectors", exact: true }).click();
  await expect(page.getByRole("article")).toContainText(helpers.selectors);
});

test("PWD-4: Browsers images are visible", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await expect(page.getByRole("img", { name: "Browsers (Chromium, Firefox," })).toBeVisible();
});

test("PWD-5: Open community videos", { tag: ["@learning, practicing"] }, async ({ page }) => {
  await page.getByRole("link", { name: "Community" }).click();
  await page.getByRole("link", { name: "Conference Videos" }).click();
  await expect(page.getByRole("main")).toContainText("BreizhCamp");
});
