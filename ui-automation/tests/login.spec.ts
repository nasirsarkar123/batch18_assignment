import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login', () => {
  test('shows an error for an invalid username/password combination', async ({ page }) => {
    const login = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await login.open();
    });

    await test.step('Submit an invalid username/password', async () => {
      await login.login('InvalidUser_123', 'WrongPass_123');
    });

    await test.step('Verify the "Invalid credentials" error is shown', async () => {
      await login.expectInvalidCredentialsError();
    });
  });
});
