import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
  // Employee List (search) tab
  readonly addEmployeeTab: Locator;
  readonly employeeListTab: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsTable: Locator;

  // Add Employee form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;
  readonly employeeIdInput: Locator;
  readonly personalDetailsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
    this.employeeNameSearchInput = page
      .locator('.oxd-table-filter-area')
      .getByPlaceholder('Type for hints...')
      .first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resultsTable = page.locator('.oxd-table-body');

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.employeeIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input');
    this.personalDetailsHeader = page.locator('h6', { hasText: 'Personal Details' });
  }

  async openAddEmployee() {
    await this.addEmployeeTab.click();
    await this.waitForNoSpinner();
  }

  async fillNewEmployee(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async save() {
    await this.saveButton.click();
    await expect(this.personalDetailsHeader).toBeVisible({ timeout: 20_000 });
  }

  async getGeneratedEmployeeId(): Promise<string> {
    return (await this.employeeIdInput.inputValue()).trim();
  }

  async openEmployeeList() {
    await this.employeeListTab.click();
    await this.waitForNoSpinner();
  }

  async searchByName(fullName: string) {
    await this.employeeNameSearchInput.fill(fullName);
    // wait for and click the autocomplete suggestion
    const suggestion = this.page.locator('.oxd-autocomplete-option').first();
    await suggestion.waitFor({ state: 'visible', timeout: 10_000 });
    await suggestion.click();
    await this.searchButton.click();
    await this.waitForNoSpinner();
  }

  async expectEmployeeInResults(fullName: string) {
    await expect(this.resultsTable).toContainText(fullName, { timeout: 15_000 });
  }
}
