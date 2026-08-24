import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function componentLinks(page: Page) {
	await page.goto('/');
	if (await page.getByRole('button', { name: 'Toggle navigation' }).isVisible()) await page.getByRole('button', { name: 'Toggle navigation' }).click();
	return page.locator('nav[aria-label="Components"] a:not([aria-disabled="true"])').evaluateAll((links) => links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)));
}

for (const mode of ['light', 'dark'] as const) {
	test(`all fixture pages have no serious axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((dark) => localStorage.setItem('resax-mode', dark ? 'dark' : 'light'), mode === 'dark');
		for (const href of await componentLinks(page)) {
			await page.goto(href);
			const results = await new AxeBuilder({ page }).analyze();
			const violations = results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''));
			expect(violations, `${href}: ${violations.map((item) => `${item.id} (${item.nodes.length})`).join(', ')}`).toEqual([]);
		}
	});
}

test('interactive fixtures expose keyboard focus and clean up across navigation', async ({ page }) => {
	for (const href of await componentLinks(page)) {
		await page.goto(href);
		await page.keyboard.press('Tab');
		const focused = page.locator(':focus');
		await expect(focused).toBeVisible();
		await page.goto('/');
		await expect(page.locator('body')).not.toHaveAttribute('style', /overflow:\s*hidden/);
	}
});

test('motion and forced-color preferences preserve content', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active', colorScheme: 'dark' });
	await page.goto('/components/button');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await expect(page.getByRole('button').first()).toBeVisible();
});
