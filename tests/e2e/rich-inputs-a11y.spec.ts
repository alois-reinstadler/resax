import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['slider', 'calendar', 'input-number', 'otp', 'rating'] as const;

for (const mode of ['light', 'dark'] as const) {
	test(`rich inputs have no serious Axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((dark) => localStorage.setItem('resax-mode', dark ? 'dark' : 'light'), mode === 'dark');
		const failures: string[] = [];
		for (const slug of routes) {
			await page.goto(`/components/${slug}`);
			if (slug === 'slider') await page.locator('.rx-slider__thumb').first().hover();
			if (slug === 'calendar') await page.locator('.rx-date-picker__input').first().click();
			if (slug === 'input-number') await page.locator('.rx-input-number--base .rx-input-number__panel').first().click();
			if (slug === 'otp') await page.locator('.rx-input-otp__cell input').first().focus();
			if (slug === 'rating') await page.locator('.rx-rating__item').first().hover();
			const results = await new AxeBuilder({ page }).analyze();
			for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))) {
				for (const node of violation.nodes) failures.push(`${slug}: ${violation.id}: ${node.target.join(' ')}`);
			}
		}
		expect(failures).toEqual([]);
	});
}
