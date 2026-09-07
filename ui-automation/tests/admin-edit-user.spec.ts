import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { randomSuffix } from '../utils/dataGenerator';

/**
 * Q3 (15 marks): Log in with valid credentials -> navigate to Admin -> search
 * for a user by username -> verify the results table shows the correct
 * matching row(s) -> edit that user's role/status -> save -> refresh the
 * page and verify the change persisted.
 *
 * Fully independent: rather than editing a pre-existing/shared admin
 * account (risky on a shared demo environment — could lock out other
 * tests), this scenario first creates its own disposable user with a
 * unique, randomly generated username, then searches for, edits, and
 * verifies that same user. This keeps the test self-contained and safe
 * to re-run.
 */
test.describe('Admin - Search and edit user', () => {
  test('edits a user\'s status and confirms the change persists after refresh', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const admin = new AdminPage(page);
    const username = `qa_user_${randomSuffix(6)}`;
    const password = 'Password_123!';

    await test.step('Log in with valid credentials', async () => {
      await login.open();
      await login.login('Admin', 'admin123');
      await dashboard.expectLoaded();
    });

    await test.step('Navigate to Admin and create a disposable test user', async () => {
      await dashboard.goToAdmin();
      await admin.openAddUser();
      await admin.createUser(username, password);
    });

    await test.step(`Search for the user "${username}"`, async () => {
      await admin.searchByUsername(username);
    });

    await test.step('Verify the results table shows the matching row', async () => {
      await admin.expectResultsContain(username);
    });

    const wasEnabled = await test.step('Open the user for edit and read current status', async () => {
      await admin.openFirstResultForEdit();
      return admin.isEnabled();
    });

    await test.step('Toggle the status and save', async () => {
      await admin.toggleStatus();
      await admin.save();
    });

    await test.step('Refresh the page and verify the change persisted', async () => {
      await page.reload();
      await admin.searchByUsername(username);
      const expected = wasEnabled ? 'Disabled' : 'Enabled';
      await admin.expectStatusColumnToBe(username, expected);
    });
  });
});
