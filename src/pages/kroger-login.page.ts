import { expect, type Page } from '@playwright/test';

/**
 * KrogerLoginPage — encapsulates interactions with the Kroger CIAM login form.
 * The login page is served from login-stage.kroger.com after being redirected
 * from /signin on the stage site.
 */
export default class KrogerLoginPage {
  constructor(public page: Page) {}

  // ---- Locators ----

  get emailAddressInput() {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  // ---- Actions ----

  /**
   * Fill in the Email Address field and assert the value was accepted.
   */
  async enterEmail(email: string) {
    await this.emailAddressInput.fill(email);
    await expect(this.emailAddressInput).toHaveValue(email);
  }

  /**
   * Fill in the Password field and assert the input type is 'password' (masked).
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  /**
   * Click the Sign In button and wait for the OAuth redirect back to the stage root URL.
   */
  async clickSignIn() {
    await this.signInButton.click();
    await this.page.waitForURL('**/');
  }

  /**
   * Full login flow: fill email, fill password, click Sign In.
   */
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}