import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const families = ['sidebar', 'nav-menu', 'dock', 'scrollbar', 'cursor'] as const;

for (const mode of ['light', 'dark'] as const) {
	test(`shell families have no serious axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((value) => localStorage.setItem('resax-mode', value), mode);
		const failures: string[] = [];
		for (const family of families) {
			await page.goto(`/components/${family}`);
			await page.locator('#docs-main').waitFor({ state: 'visible' });
			const results = await new AxeBuilder({ page }).analyze();
			for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))) {
				for (const node of violation.nodes) failures.push(`${family}: ${violation.id}: ${node.target.join(' ')}: ${node.failureSummary ?? node.html}`);
			}
		}
		expect(failures).toEqual([]);
	});
}
