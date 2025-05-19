import type { Page } from "@playwright/test";
import { helpers } from "../utils/helpers";

export class Playwrightdev {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  coffeeEspresso = () => this.page.getByTestId("Espresso");
}
