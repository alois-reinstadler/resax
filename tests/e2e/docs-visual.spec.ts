import { expect, test } from '@playwright/test';

const pages = ['/', '/components/button', '/components/tabs', '/components/table'];
for (const mode of ['light', 'dark'] as const) {
	for (const path of pages) {
		test(`visual ${mode} ${path}`, async ({ page }) => {
			await page.addInitScript((dark) => localStorage.setItem('resax-mode', dark ? 'dark' : 'light'), mode === 'dark');
			await page.goto(path);
			await expect(page).toHaveScreenshot(`${mode}-${path === '/' ? 'home' : path.split('/').pop()}.png`, { fullPage: true, animations: 'disabled' });
		});
	}
}
