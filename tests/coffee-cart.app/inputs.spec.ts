import { test, expect } from "@playwright/test";
import { testConfig } from "../../utils/testConfig";
import { CoffeeCartPage } from "../../pages/coffeeCart";
import { faker } from "@faker-js/faker";

let coffeeCartPage: CoffeeCartPage;
let randomName = faker.person.firstName();
let randomEmail = faker.internet.email();

test.beforeEach(async ({ page }) => {
  coffeeCartPage = new CoffeeCartPage(page);
  await page.goto(testConfig.coffeeCartUrl);
  await page.waitForLoadState();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("AA-1: See the Thankful message", { tag: ["@coffee"] }, async () => {
  await coffeeCartPage.addCoffies();
  await coffeeCartPage.clickOnCheckout();
  await coffeeCartPage.fillFields(randomName, randomEmail);
  await coffeeCartPage.promotionCheckbox();
  await coffeeCartPage.submitButton();
  await expect(coffeeCartPage.thankfulMessage()).toBeVisible();
});

test("AA-2: Name input contains correct value", { tag: ["@coffee"] }, async () => {
  await coffeeCartPage.addCoffies();
  await coffeeCartPage.clickOnCheckout();
  await coffeeCartPage.fillFields(randomName, randomEmail);
  await expect(coffeeCartPage.nameField()).toHaveValue(randomName);
});
