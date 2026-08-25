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

test('button group remains contrast-safe at rest and while hovered', async ({ page }) => {
	await page.addInitScript(() => localStorage.setItem('resax-mode', 'light'));
	await page.goto('/components/button-group');
	const group = page.getByRole('group');
	const failures: string[] = [];
	for (const state of ['rest', 'Day', 'Week', 'Month'] as const) {
		if (state !== 'rest') await group.getByRole('button', { name: state }).hover();
		const results = await new AxeBuilder({ page }).include('.rx-button-group').analyze();
		for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))) {
			failures.push(`${state}: ${violation.id} — ${violation.nodes.map((node) => `${node.target.join(' ')}: ${node.failureSummary}`).join(', ')}`);
		}
	}
	expect(failures).toEqual([]);
});
