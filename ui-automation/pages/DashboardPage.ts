import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Represents the app shell that is present on every logged-in page:
 * the left main menu, the top user dropdown, and the page breadcrumb/header.
 * Other page objects (PIM, Admin, Leave) extend/reuse this for navigation.
 */
export class DashboardPage extends BasePage {
  readonly header: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  async expectLoaded() {
    await expect(this.header).toHaveText(/Dashboard/i, { timeout: 15_000 });
  }

  private menuItem(name: string): Locator {
    return this.page.locator('.oxd-main-menu-item', { hasText: name }).first();
  }

  async goToPIM() {
    await this.menuItem('PIM').click();
    await this.waitForNoSpinner();
  }

  async goToAdmin() {
    await this.menuItem('Admin').click();
    await this.waitForNoSpinner();
  }

  async goToLeave() {
    await this.menuItem('Leave').click();
    await this.waitForNoSpinner();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
  }
}
