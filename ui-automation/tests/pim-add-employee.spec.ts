import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import { randomEmployeeName } from '../utils/dataGenerator';

/**
 * Q2 (15 marks): Log in with valid admin credentials -> navigate to PIM ->
 * add a new employee using randomly generated data -> verify the employee
 * appears when searched in the employee list -> log out.
 *
 * Fully independent — logs in and generates its own unique employee data.
 */
test.describe('PIM - Add Employee', () => {
  test('adds a new employee and finds them via search, then logs out', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PIMPage(page);
    const { firstName, lastName } = randomEmployeeName();
    const fullName = `${firstName} ${lastName}`;

    await test.step('Log in with valid admin credentials', async () => {
      await login.open();
      await login.login('Admin', 'admin123');
      await dashboard.expectLoaded();
    });

    await test.step('Navigate to PIM > Add Employee', async () => {
      await dashboard.goToPIM();
      await pim.openAddEmployee();
    });

    await test.step(`Add employee "${fullName}" with randomly generated data`, async () => {
      await pim.fillNewEmployee(firstName, lastName);
      await pim.save();
    });

    await test.step('Search for the employee in the Employee List', async () => {
      await pim.openEmployeeList();
      await pim.searchByName(fullName);
    });

    await test.step('Verify the employee appears in the results', async () => {
      await pim.expectEmployeeInResults(lastName);
    });

    await test.step('Log out', async () => {
      await dashboard.logout();
    });
  });
});
