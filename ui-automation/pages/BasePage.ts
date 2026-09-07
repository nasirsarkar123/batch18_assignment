import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async gotoLogin() {
    await this.page.goto('/web/index.php/auth/login');
  }

 
  async waitForNoSpinner() {
    const loader = this.page.locator('.oxd-loading-spinner, .oxd-form-loader').first();
    try {
      await loader.waitFor({ state: 'visible', timeout: 3_000 });
      await loader.waitFor({ state: 'hidden', timeout: 30_000 });
    } catch {
      
    }
  }
}
