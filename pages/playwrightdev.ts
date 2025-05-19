import type { Page } from "@playwright/test";
import { helpers } from "../utils/helpers";

export class Playwrightdev {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getStartedButton = () => this.page.getByRole("link", { name: "Get started" });
  modeSwitcher = () => this.page.getByRole("button", { name: "Switch between dark and light" });
  htmlLocator = () => this.page.locator("html");
  searchField = () => this.page.getByRole("button", { name: "Search (Ctrl+K)" });
  mockBrowserApi = () => this.page.getByRole("option", { name: "Mock browser APIs" }).getByRole("link");
  seeAllResults = () => this.page.getByRole("link", { name: "See all 25 results" });
  verifyHeading = () => this.page.getByRole("heading", { name: 'Search results for "verify"' });
  searchInput = () => this.page.locator('input[class*="DocSearch-Input"]');
  clearRecentSearch = () => this.page.getByRole("button", { name: "Remove this search from" });
  noRecentSearches = () => this.page.getByText('No recent searches');

  async clickGetStarted() {
    await this.getStartedButton().click();
  }

  async switchMode() {
    await this.modeSwitcher().click();
  }

  async fillApi() {
    await this.searchField().click();
    await this.searchInput().fill("api");
    await this.mockBrowserApi().click();
  }

  async fillVerify() {
    await this.searchField().click();
    await this.searchInput().fill("api");
    await this.searchInput().fill("verify");
    await this.seeAllResults().click();
  }

  async removeRecentSearch() {
    await this.searchField().click();
    await this.clearRecentSearch().click();
  }

}
