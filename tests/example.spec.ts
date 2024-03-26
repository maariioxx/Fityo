import { test, expect } from '@playwright/test';

test('should navigate to signup page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Join us!' }).click();
  await expect(page).toHaveURL('http://localhost:3000/signup');
  await expect(page.locator('h1')).toContainText('Welcome to Fityo');
});

test('should not let user access home without signing in', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/home');
  await expect(page).toHaveURL('http://localhost:3000/signup');
});

test('sign up with email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Join us!' }).click();
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('jordansmith@gmail.com');
  await page.getByRole('button', { name: 'Sign in with your email' }).click();
  await expect(page.locator('h1')).toContainText('Check your email');
});
