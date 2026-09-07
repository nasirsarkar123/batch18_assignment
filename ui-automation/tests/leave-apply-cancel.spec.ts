import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LeavePage } from '../pages/LeavePage';
import { futureDate } from '../utils/dataGenerator';


test.describe('Leave - Apply and cancel', () => {
  test('applies for leave, verifies Pending Approval, then cancels it', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);
    const fromDate = futureDate(7);
    const toDate = futureDate(7);

    await test.step('Log in', async () => {
      await login.open();
      await login.login('Admin', 'admin123');
      await dashboard.expectLoaded();
    });

    await test.step('Navigate to Leave > Apply', async () => {
      await dashboard.goToLeave();
      await leave.openApply();
    });

    await test.step(`Apply for leave from ${fromDate} to ${toDate}`, async () => {
      await leave.selectFirstLeaveType();
      await leave.fillDates(fromDate, toDate);
      await leave.submitApply();
    });

    await test.step('Verify it appears under My Leave with status Pending Approval', async () => {
      await leave.openMyLeave();
      await leave.expectRowWithStatus('Pending Approval');
    });

    await test.step('Cancel the request', async () => {
      await leave.cancelFirstRequest();
    });

    await test.step('Verify the status updates correctly', async () => {
      await leave.expectRowStatusUpdated('Cancelled');
    });
  });
});
