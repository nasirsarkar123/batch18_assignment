import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {
  readonly applyTab: Locator;
  readonly myLeaveTab: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly applyButton: Locator;
  readonly successToast: Locator;

  readonly myLeaveTable: Locator;
  readonly cancelButton: Locator;
  readonly confirmCancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.applyTab = page.getByRole('link', { name: 'Apply' });
    this.myLeaveTab = page.getByRole('link', { name: 'My Leave' });

    this.leaveTypeDropdown = page.locator('.oxd-select-text').first();
    const dateInputs = page.locator('.oxd-date-input input');
    this.fromDateInput = dateInputs.nth(0);
    this.toDateInput = dateInputs.nth(1);
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.successToast = page.locator('.oxd-toast-content--success');

    this.myLeaveTable = page.locator('.oxd-table-body');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' }).first();
    this.confirmCancelButton = page.getByRole('button', { name: /Yes, Cancel/i });
  }

  async openApply() {
    await this.applyTab.click();
    await this.waitForNoSpinner();
  }

  async selectFirstLeaveType() {
    await this.leaveTypeDropdown.click();
    await this.page.locator('.oxd-select-option').first().click();
  }

  async fillDates(fromDate: string, toDate: string) {
    await this.fromDateInput.fill(fromDate);
    await this.page.keyboard.press('Escape');
    await this.toDateInput.fill(toDate);
    await this.page.keyboard.press('Escape');
  }

  async submitApply() {
    await this.applyButton.click();
  }

  async openMyLeave() {
    await this.myLeaveTab.click();
    await this.waitForNoSpinner();
  }

  async expectRowWithStatus(status: string) {
    await expect(this.myLeaveTable).toContainText(status, { timeout: 20_000 });
  }

  async cancelFirstRequest() {
    await this.cancelButton.click();
    await this.confirmCancelButton.click();
    await this.waitForNoSpinner();
  }

  async expectRowStatusUpdated(status: string) {
    await expect(this.myLeaveTable).toContainText(status, { timeout: 20_000 });
  }
}
