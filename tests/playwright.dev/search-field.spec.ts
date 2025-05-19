import { test, expect } from "@playwright/test";
import { testConfig } from "../../utils/testConfig";
import { helpers } from "../../utils/helpers";
import { Playwrightdev } from "../../pages/playwrightdev";

let playwrightdev: Playwrightdev;

test.beforeEach(async ({ page }) => {
  playwrightdev = new Playwrightdev(page);
  await page.goto(testConfig.playwrightDevUrl);
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("PWD-3: Find Api in search", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await playwrightdev.fillApi();
  await expect(page.url()).toEqual(helpers.playwrightApiUrl);
});

test("PWD-4: Show all results page", { tag: ["@playwrightdev"] }, async () => {
  await playwrightdev.fillVerify();
  await expect(playwrightdev.verifyHeading()).toContainText(helpers.verifyHeadingText);
});

test("PWD-5: Clear recent search", { tag: ["@playwrightdev"] }, async () => {
  await playwrightdev.fillApi();
  await playwrightdev.removeRecentSearch();
  await expect(playwrightdev.noRecentSearches()).toContainText(helpers.noSearchPlaceholder);
});