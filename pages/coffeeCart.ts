import type { Page } from "@playwright/test";
import { helpers } from "../utils/helpers";

export class CoffeeCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  coffeeEspresso = () => this.page.getByTestId("Espresso");
  coffeeCappuccino = () => this.page.getByTestId("Cappuccino");
  coffeeMocha = () => this.page.getByTestId("Mocha");
  coffeeLatte = () => this.page.getByTestId("Cafe_Latte");
  coffeeEspressoPanna = () => this.page.getByTestId("Espresso_Con Panna");
  coffeeAmericano = () => this.page.getByTestId("Americano");
  coffeeCheckout = () => this.page.getByTestId("checkout");
  coffeeCheckoutText = () => this.page.getByTestId("checkout").innerText();
  checkoutInnitialText = () => this.page.getByTestId("checkout").innerText();
  coffeeEspressoMacchiato = () => this.page.getByTestId("Espresso_Macchiato");
  nameField = () => this.page.getByRole("textbox", { name: "Name" });
  emailField = () => this.page.getByRole("textbox", { name: "Email" });
  promotionCheckbox = () => this.page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
  submitButton = () => this.page.getByRole("button", { name: "Submit" }).click();
  thankfulMessage = () => this.page.getByRole("button", { name: "Thanks for your purchase." });
  thankfulMessageText = () => this.page.getByRole("button", { name: "Thanks for your purchase." }).innerText();
  cartPopup = () => this.page.locator("ul.cart-preview > li.list-item", { hasText: helpers.espressoText });

  async fillFields(randomName: string, randomEmail: string) {
    await this.nameField().fill(randomName);
    await this.emailField().fill(randomEmail);
  }

  async addCoffies() {
    await this.coffeeEspresso().click();
    await this.coffeeCappuccino().click();
    await this.coffeeMocha().click();
    await this.coffeeLatte().click();
    await this.coffeeEspressoPanna().click();
    await this.coffeeAmericano().click();
  }

  async removeCoffies() {
    await this.page.getByRole("button", { name: "Remove one Mocha" }).click();
    await this.page.getByRole("button", { name: "Remove one Espresso Con Panna" }).click();
    await this.page.getByRole("button", { name: "Remove one Espresso" }).click();
    await this.page.getByRole("button", { name: "Remove one Cappuccino" }).click();
    await this.page.getByRole("button", { name: "Remove one Cafe Latte" }).click();
    await this.page.getByRole("button", { name: "Remove one Americano" }).click();
  }

  async clickOnCheckout() {
    await this.coffeeCheckout().click();
  }
}
