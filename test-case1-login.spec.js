import { test, expect, chromium } from '@playwright/test';

test.setTimeout(120_000);

test('Test Case 1: Login Functionality', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Interact with branding/logo (optional)
  await page.getByRole('img', { name: 'company-branding' }).click();
  await page.locator('.orangehrm-login-branding').click();

  // Click visible username/password hints (optional interactions)
  await page.getByText('Username : Admin').click();
  await page.getByText('Password : admin123').click();

  // Fill in credentials
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username' }).fill('A');
  await page.getByRole('textbox', { name: 'Username' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  // Submit login form
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to Admin and My Info sections
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('link', { name: 'My Info' }).click();

  // Verify Personal Info elements are visible
  await expect(
    page.getByText('Personal DetailsEmployee Full')
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: 'First Name' })
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^Employee Id$/ }).nth(1)
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^Other Id$/ }).first()
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^Driver's License Number$/ }).first()
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^License Expiry Date$/ }).first()
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^NationalityAmerican$/ }).first()
  ).toBeVisible();

  await expect(
    page.getByText('Marital StatusSingle')
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^Date of Birth$/ }).first()
  ).toBeVisible();

  await expect(
    page.locator('div').filter({ hasText: /^GenderMaleFemale$/ }).first()
  ).toBeVisible();

  await expect(
    page.getByText('Custom FieldsBlood TypeA+')
  ).toBeVisible();

  await expect(
    page.locator('.orangehrm-container')
  ).toBeVisible();
});
