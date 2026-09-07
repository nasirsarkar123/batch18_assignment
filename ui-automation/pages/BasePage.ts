import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async gotoLogin() {
    await this.page.goto('/web/index.php/auth/login');
  }

  /** Waits for the oxd loading spinner (if any) to disappear. */
  async waitForNoSpinner() {
    const spinner = this.page.locator('.oxd-loading-spinner');
    if (await spinner.count()) {
      await spinner.first().waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {});
    }
  }
}
