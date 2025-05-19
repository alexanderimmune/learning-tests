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

test("PWD-2: Switch to another mode", { tag: ["@playwrightdev"] }, async ({ page }) => {
  const html = page.locator("html");
  const initialTheme = await html.getAttribute("data-theme");
  expect(initialTheme).not.toBeNull();
  await playwrightdev.switchMode();
  if (initialTheme) {
    await expect(html).not.toHaveAttribute("data-theme", initialTheme);
  }
});
