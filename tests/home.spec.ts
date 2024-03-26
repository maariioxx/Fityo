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

test('home page show correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/home');
  await expect(page.locator('h1')).toBeInViewport();
});

test("navbar's link buttons work fine", async ({ page }) => {
  await page.getByRole('link', { name: 'Nutrition' }).click();
  await expect(page).toHaveURL('/home/nutrition');
  expect(page.locator('h1')).toContainText('Nutrition');
  await page.getByRole('link', { name: 'Routines' }).click();
  await expect(page).toHaveURL('/home/routines');
  expect(page.locator('h1')).toContainText('Routines');
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/home');
  expect(page.locator('h1')).toContainText('Home');
});

test('profile dropdown show up', async ({ page }) => {
  await page.getByRole('button', { name: 'User logo' }).click();
  await expect(page.getByRole('link', { name: 'Profile' })).toBeInViewport();
});
