import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ownedPages = [
	'button',
	'ask-ai-button',
	'card',
	'button-group',
	'split-button',
	'input',
	'textarea',
	'select',
	'upload-file',
	'color-picker',
	'chip'
] as const;

for (const mode of ['light', 'dark'] as const) {
	test(`buttons, cards, and base inputs have no serious axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((theme) => localStorage.setItem('resax-mode', theme), mode);
		const failures: string[] = [];

		for (const slug of ownedPages) {
			await page.goto(`/components/${slug}`);
			const results = await new AxeBuilder({ page }).analyze();
			for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))) {
				failures.push(`${slug}: ${violation.id} — ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`);
			}
		}

		expect(failures).toEqual([]);
	});
}
