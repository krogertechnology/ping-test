import { test, expect } from '@playwright/test';
import { loadData } from '@utils/data-loader';
import KrogerLoginPage from '@pages/kroger-login.page';
import KrogerDashboardPage from '@pages/kroger-dashboard.page';

// Type definition matching src/data/users.json structure
interface UsersData {
  '': Record<string, string>;
}

test.describe('Successful Login with Valid Kroger Customer Credentials', () => {

  test('should log in with valid Kroger customer credentials and land on account dashboard', async ({ page }) => {
    // Load credentials from users.json — ENV references resolved automatically at runtime
    const usersData = loadData<UsersData>('users.json');
    const email = 'vikram311991@gmail.com';
    const password = usersData[''][email];

    const loginPage = new KrogerLoginPage(page);
    const dashboardPage = new KrogerDashboardPage(page);

    // Step 1: Navigate to the Kroger stage login page
    // Expected: Login page is displayed with fields for Email Address and Password
    await page.goto('/signin');
    await expect(loginPage.emailAddressInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    // Step 2: Enter the registered email address in the Email Address field
    // Expected: The email address is present in the Email Address field
    await loginPage.enterEmail(email);

    // Step 3: Enter the valid password in the Password field
    // Expected: The Password field contains the entered (masked) password
    await loginPage.enterPassword(password);

    // Step 4: Click the 'Sign In' button
    // Expected: The system processes the login and redirects back to the stage root
    await loginPage.clickSignIn();

    // Step 5: Verify the user is redirected to the account dashboard page after login
    // Expected: User is taken to the account dashboard and personalized greeting is visible
    await dashboardPage.goto();
    await dashboardPage.expectDashboardLoaded();
  });

});
