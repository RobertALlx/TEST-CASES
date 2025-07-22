import { test, expect, chromium } from '@playwright/test';

test.setTimeout(120_000);

test('Register User with existing email', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to homepage
  await page.goto('https://demoqa.com/');

  // Verify homepage UI elements
  await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.locator('.home-banner')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Elements$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Forms$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Widgets$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Interactions$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Book Store Application$/ }).nth(1)).toBeVisible();

  // Navigate to Alerts section
  await page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).first().click();
  await page.getByRole('listitem').filter({ hasText: 'Alerts' }).click();

  // Handle alert pop-up
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#alertButton').click();

  // Confirm alert description is visible
  await expect(page.locator('#javascriptAlertsWrapper'))
    .toContainText('On button click, alert will appear after 5 seconds');

  // Handle delayed alert
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#timerAlertButton').click();
  await expect(page.getByText('On button click, confirm box')).toBeVisible();

  // Handle confirm alert
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#confirmButton').click();
  await expect(page.locator('div').filter({ hasText: /^On button click, prompt box will appear$/ })).toBeVisible();

  // Handle prompt alert
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#promtButton').click();

  // Verify prompt result
  await expect(page.getByText('On button click, prompt box')).toBeVisible();
  await page.getByText('You entered robert').click();
  await page.getByText('You selected Ok').click();

  // Navigate to Browser Windows section
  await page.getByText('Browser Windows').click();
  await expect(page.locator('#tabButtonWrapper')).toBeVisible();
  await expect(page.getByRole('button', { name: 'New Tab' })).toBeVisible();

  // Open and handle New Tab
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'This is a sample page' }).click();

  // Open and handle New Window
  await expect(page.getByRole('button', { name: 'New Window', exact: true })).toBeVisible();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window', exact: true }).click();
  const page2 = await page2Promise;
  await page2.getByRole('heading', { name: 'This is a sample page' }).click();

  // Open and handle New Window Message
  await expect(page.getByRole('button', { name: 'New Window Message' })).toBeVisible();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window Message' }).click();
  const page3 = await page3Promise;
  await page3.getByText('Knowledge increases by').click();
  await expect(page3.getByText('Knowledge increases by')).toBeVisible();

  // Confirm message content
  await expect(page3.locator('body')).toContainText(
    'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.'
  );
});
