import { test, expect, chromium } from '@playwright/test';

test.setTimeout(120_000);

test('Test Case 2: Add Review Functionality', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to test case list and accept cookies
  await page.goto('https://automationexercise.com/test_cases');
  await page.getByRole('button', { name: 'Consent' }).click();

  // Navigate to Test Case 21
  await page.getByRole('link', { name: 'Test Case 21: Add review on' }).click();
  await page.locator('#collapse21').getByText('Launch browser').click();
  await page.getByRole('link', { name: '\'http://automationexercise.' }).click();

  // Navigate to Products page
  await page.getByRole('link', { name: ' Products' }).click();

  // Assert header content and product category visibility
  await expect(page.locator('#header')).toContainText(
    'Home  Products Cart Signup / Login Test Cases API Testing Video Tutorials Contact us'
  );

  await expect(
    page.locator('section').filter({ hasText: 'Category Women Dress Tops' })
  ).toBeVisible();

  await expect(
    page.getByText('All Products  Added! Your')
  ).toBeVisible();

  // Click on the first product
  await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();

  // Review form should be visible
  await expect(
    page.getByRole('link', { name: 'Write Your Review' })
  ).toBeVisible();

  // Fill in review form
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('robi');

  await page.getByRole('textbox', {
    name: 'Email Address',
    exact: true,
  }).click();

  await page.getByRole('textbox', {
    name: 'Email Address',
    exact: true,
  }).fill('robittest@gmail.com');

  await page.getByRole('textbox', { name: 'Add Review Here!' }).click();
  await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('e bun');

  // Submit review
  await page.getByRole('button', { name: 'Submit' }).click();

  // Assert review confirmation message
  await expect(
    page.getByText('Thank you for your review.')
  ).toBeVisible();
});
