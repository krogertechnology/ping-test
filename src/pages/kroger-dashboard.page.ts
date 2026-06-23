import { expect, type Page } from '@playwright/test';

/**
 * KrogerDashboardPage — encapsulates assertions and interactions on the
 * Kroger account dashboard page (/account/dashboard/).
 */
export default class KrogerDashboardPage {
  constructor(public page: Page) {}

  // ---- Locators ----

  get welcomeHeading() {
    return this.page.getByRole('heading', { name: 'Welcome, Vikram Reddy' });
  }

  get accountNavButton() {
    // FIX: The nav button is labelled "Account Menu" not "Vikram Reddy".
    // The user name only appears in the heading "Welcome, Vikram Reddy" on the dashboard.
    return this.page.getByRole('button', { name: 'Account Menu' });
  }

  // ---- Actions ----

  /**
   * Navigate directly to the account dashboard.
   */
  async goto() {
    await this.page.goto('/account/dashboard');
  }

  /**
   * Assert that the dashboard URL, welcome heading, and account nav button
   * are all visible — confirming a successful login and redirect.
   */
  async expectDashboardLoaded() {
    await expect(this.page).toHaveURL(/account\/dashboard/);
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.accountNavButton).toBeVisible();
  }
}