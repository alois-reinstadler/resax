import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

test.setTimeout(240_000);

async function componentLinks(page: Page) {
	await page.goto('/');
	if (await page.getByRole('button', { name: 'Toggle navigation' }).isVisible()) await page.getByRole('button', { name: 'Toggle navigation' }).click();
	return page.locator('nav[aria-label="Components"] a:not([aria-disabled="true"])').evaluateAll((links) => links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)));
}

async function settleForAxe(page: Page) {
	await page.locator('#docs-main').waitFor({ state: 'visible' });
	await page.evaluate(async () => {
		await document.fonts.ready;
		const frame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
		await frame();
		await frame();

		// Measured components can schedule a second finite transition after their
		// first layout frame. Finish each finite animation at its natural end state
		// while leaving intentional infinite effects running for the audit.
		for (let pass = 0; pass < 3; pass += 1) {
			for (const animation of document.getAnimations()) {
				const endTime = animation.effect?.getComputedTiming().endTime;
				if (typeof endTime !== 'number' || !Number.isFinite(endTime)) continue;
				try {
					animation.finish();
				} catch {
					// A newly pending animation can become finishable on the next frame.
				}
			}
			await frame();
		}
	});
}

for (const mode of ['light', 'dark'] as const) {
	test(`all fixture pages have no serious axe findings (${mode})`, async ({ page }) => {
		await page.addInitScript((dark) => localStorage.setItem('resax-mode', dark ? 'dark' : 'light'), mode === 'dark');
		const failures: string[] = [];
		for (const href of await componentLinks(page)) {
			await page.goto(href);
			await settleForAxe(page);
			const results = await new AxeBuilder({ page }).analyze();
			const violations = results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''));
			if (violations.length) failures.push(`${href}: ${violations.map((item) => `${item.id} (${item.nodes.length})`).join(', ')}`);
		}
		expect(failures).toEqual([]);
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

const visualFeedbackPages = ['alert', 'avatar', 'badge', 'indicator', 'progress', 'skeleton', 'spinner'] as const;

test('visual-feedback galleries have no serious axe findings in either theme', async ({ page }) => {
	const failures: string[] = [];
	for (const mode of ['light', 'dark'] as const) {
		await page.goto('/');
		await page.evaluate((theme) => localStorage.setItem('resax-mode', theme), mode);
		for (const slug of visualFeedbackPages) {
			await page.goto(`/components/${slug}`);
			await settleForAxe(page);
			const results = await new AxeBuilder({ page }).analyze();
			for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))) {
				failures.push(`${mode}/${slug}: ${violation.id} — ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`);
			}
		}
	}
	expect(failures).toEqual([]);
});
