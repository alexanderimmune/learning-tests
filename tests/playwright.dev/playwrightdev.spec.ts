import { test, expect } from "@playwright/test";
import { testConfig } from "../../utils/testConfig";
import { helpers } from "../../utils//helpers";
import { Playwrightdev } from "../../pages/playwrightdev";
import { faker } from "@faker-js/faker";

let playwrightdev: Playwrightdev;


test.beforeEach(async ({ page }) => {
  playwrightdev = new Playwrightdev(page);
  await page.goto(testConfig.playwrightDevUrl);
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("PWD-1: Click GETSTARTED button and proceed", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page.locator("h1")).toContainText("Installation");
});

test("PWD-2: Go to API tab", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await page.getByRole("link", { name: "API" }).click();
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toBeVisible();
});

test("PWD-3: Open selectors property ", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await page.getByRole("link", { name: "API" }).click();
  await expect(page.getByRole("heading", { name: "Playwright Library" })).toBeVisible();
  await page.getByRole("link", { name: "selectors", exact: true }).click();
  await expect(page.getByRole("article")).toContainText(helpers.selectorsText);
});

test("PWD-4: Browsers images are visible", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await expect(page.getByRole("img", { name: "Browsers (Chromium, Firefox," })).toBeVisible();
});

test("PWD-5: Open community videos", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await page.getByRole("link", { name: "Community" }).click();
  await page.getByRole("link", { name: "Conference Videos" }).click();
  await expect(page.getByRole("main")).toContainText("BreizhCamp");
});
