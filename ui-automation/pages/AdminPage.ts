import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly usernameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsRows: Locator;
  readonly editIcon: Locator;

 
  readonly statusToggle: Locator;
  readonly saveButton: Locator;
  readonly userRoleDropdown: Locator;

  
  readonly addButton: Locator;
  readonly employeeNameAutocomplete: Locator;
  readonly newUsernameInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameSearchInput = page
      .locator('.oxd-table-filter-area .oxd-input-group', { hasText: 'Username' })
      .locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resultsRows = page.locator('.oxd-table-body .oxd-table-row');
    this.editIcon = page.locator('.oxd-table-cell-actions .oxd-icon.bi-pencil-fill').first();

    this.statusToggle = page.locator('.oxd-switch-input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.userRoleDropdown = page.locator('.oxd-select-text').first();

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.employeeNameAutocomplete = page.getByPlaceholder('Type for hints...');
    this.newUsernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input').last();
    this.newPasswordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').last();
  }

  async openAddUser() {
    await this.addButton.click();
    await this.waitForNoSpinner();
  }

  
  async createUser(username: string, password: string) {
    await this.employeeNameAutocomplete.fill('a');
    const suggestion = this.page.locator('.oxd-autocomplete-option').first();
    await suggestion.waitFor({ state: 'visible', timeout: 10_000 });
    await suggestion.click();

    await this.newUsernameInput.fill(username);
    await this.newPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.saveButton.click();
    await this.waitForNoSpinner();
  }

  async searchByUsername(username: string) {
    await this.usernameSearchInput.waitFor({ state: 'visible', timeout: 30_000 });
    await this.usernameSearchInput.fill(username);
    await this.searchButton.click();
    await this.waitForNoSpinner();
  }

  async expectResultsContain(username: string) {
    await expect(this.resultsRows.first()).toContainText(username, { timeout: 15_000 });
  }

  async openFirstResultForEdit() {
    await this.editIcon.click();
    await this.waitForNoSpinner();
  }

  async isEnabled(): Promise<boolean> {
    const cls = await this.statusToggle.getAttribute('class');
    return !!cls && cls.includes('oxd-switch-input--active');
  }

  async toggleStatus() {
    await this.statusToggle.click();
  }

  async selectUserRole(roleName: 'Admin' | 'ESS') {
    await this.userRoleDropdown.click();
    await this.page.locator('.oxd-select-option', { hasText: roleName }).click();
  }

  async save() {
    await this.saveButton.click();
    await this.waitForNoSpinner();
  }

  async expectStatusColumnToBe(username: string, expected: 'Enabled' | 'Disabled') {
    const row = this.page.locator('.oxd-table-body .oxd-table-row', { hasText: username }).first();
    await expect(row).toContainText(expected, { timeout: 15_000 });
  }
}
