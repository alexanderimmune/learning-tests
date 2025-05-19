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

test("PWD-1: Click GETSTARTED button and proceed", { tag: ["@playwrightdev"] }, async ({ page }) => {
  await playwrightdev.clickGetStarted();
  await expect(page.url()).toEqual(helpers.playwrightIntroUrl);
});

