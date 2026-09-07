import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async gotoLogin() {
    await this.page.goto('/web/index.php/auth/login');
  }

  /** Waits for any OrangeHRM loading indicator (spinner or form loader) to disappear. */
  async waitForNoSpinner() {
    const loaders = this.page.locator('.oxd-loading-spinner, .oxd-form-loader');
    const count = await loaders.count();
    if (count > 0) {
      await loaders
        .first()
        .waitFor({ state: 'detached', timeout: 20_000 })
        .catch(() => {});
    }
  }
}
