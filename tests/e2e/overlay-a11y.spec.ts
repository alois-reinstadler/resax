import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const overlayPages = ['popup', 'drawer', 'tooltip', 'dropdown', 'context-menu', 'notification'] as const;
test.setTimeout(120_000);

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.locator('#docs-main').waitFor({ state: 'visible' });
}

async function openDefiningState(page: Page, slug: (typeof overlayPages)[number]) {
	if (slug === 'popup') await page.getByText('Open from trigger snippet', { exact: true }).click();
	if (slug === 'drawer') await page.getByText('base', { exact: true }).first().click();
	if (slug === 'tooltip') await page.locator('[data-demo-section="motions"] .rx-tooltip__trigger').filter({ hasText: 'base' }).hover();
	if (slug === 'dropdown') await page.getByText('base', { exact: true }).first().click();
	if (slug === 'context-menu') await page.locator('.target').filter({ hasText: 'base' }).click({ button: 'right' });
	if (slug === 'notification') await page.locator('[data-demo-section="variants"]').getByRole('button', { name: 'base', exact: true }).click({ force: true });
	await page.waitForTimeout(850);
}

for (const mode of ['light', 'dark'] as const) {
	test(`overlay pages and open states have no serious axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((value) => localStorage.setItem('resax-mode', value), mode);
		const failures: string[] = [];
		for (const slug of overlayPages) {
			await page.goto(`/components/${slug}`);
			await settle(page);
			for (const state of ['rest', 'open'] as const) {
				if (state === 'open') await openDefiningState(page, slug);
				const results = await new AxeBuilder({ page }).analyze();
				const violations = results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''));
				for (const violation of violations) {
					for (const node of violation.nodes) failures.push(`${slug}/${state}: ${violation.id} ${node.target.join(' ')}`);
				}
			}
		}
		expect(failures).toEqual([]);
	});
}
