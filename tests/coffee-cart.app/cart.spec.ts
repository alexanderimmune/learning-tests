import { test, expect } from "@playwright/test";
import { testConfig } from "../../utils/testConfig";
import { helpers } from "../../utils//helpers";
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

test("CC-1: Multiple coffies are added to the cart", { tag: ["@coffee"] }, async () => {
  await coffeeCartPage.addCoffies();
  await coffeeCartPage.coffeeCheckout().hover();
  await expect(coffeeCartPage.cartPopup()).toBeVisible();
  await expect(coffeeCartPage.cartPopup()).toContainText(helpers.espressoText);
});

test("CC-2: Remove items from cart", { tag: ["@coffee"] }, async () => {
  await coffeeCartPage.addCoffies();
  await coffeeCartPage.checkoutHover();
  await coffeeCartPage.removeCoffies();
  await expect(coffeeCartPage.coffeeCheckout()).toHaveText(helpers.emptyCartText);
});

test("CC-3: Submit cart without updates checkbox", { tag: ["@coffee"] }, async () => {
  await coffeeCartPage.addCoffies();
  await coffeeCartPage.clickOnCheckout();
  await coffeeCartPage.fillFields(randomName, randomEmail);
  await coffeeCartPage.submitButton();
  await expect(coffeeCartPage.thankfulMessage()).toBeVisible();
});
