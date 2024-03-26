import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
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
  await page.waitForURL('/home');

  await page.context().storageState({ path: authFile });
});
