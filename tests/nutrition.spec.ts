import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Join us!' }).click();
  await page.getByRole('button', { name: 'Sign in with Github' }).click();
  await page.getByLabel('Username or email address').click();
  await page.getByLabel('Username or email address').fill('testssss953');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('testpassword9');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('testpassword9A');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL('/home');
});

test('setup nutrition correctly', async ({ page }) => {
  await page.getByRole('link', { name: 'Setup' }).click();
  await expect(page).toHaveURL('/home/nutrition');
  await page.getByLabel('Carbohidrates').fill('300');
  await page.getByLabel('Fats').fill('90');
  await page.getByLabel('Protein').fill('150');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('2610')).toBeVisible();
  await expect(page.getByText('Carbohidrates: 140g / 320g')).toBeVisible();
});
