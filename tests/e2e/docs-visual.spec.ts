import { expect, test, type Page } from '@playwright/test';

const familyPages = [
	'accordion', 'alert', 'ask-ai-button', 'badge', 'notification', 'popup', 'progress', 'skeleton', 'spinner', 'tooltip',
	'avatar', 'code', 'indicator', 'list', 'table', 'timeline',
	'button', 'button-group', 'calendar', 'checkbox', 'chip', 'color-picker', 'input', 'input-number', 'otp', 'radio', 'radio-group', 'rating', 'select', 'slider', 'split-button', 'switch', 'textarea', 'upload-file',
	'breadcrumb', 'context-menu', 'cursor', 'dock', 'dot-stepper', 'dropdown', 'file-tree', 'inline-overflow', 'link-bar', 'nav-menu', 'pagination', 'sidebar', 'steps', 'tabs',
	'card', 'scrollbar', 'separator', 'spacer', 'drawer', 'slide-confirm', 'tick-rail', 'transform'
] as const;
const visualFamilies = ((globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.VISUAL_FAMILIES ?? '')
	.split(',')
	.map((slug) => slug.trim())
	.filter(Boolean);
const capturedFamilyPages = visualFamilies.length
	? familyPages.filter((slug) => visualFamilies.includes(slug))
	: familyPages;

const variantSelectors = [
	'[data-demo-section="source-variants"]',
	'[data-demo-section*="source-variant"]',
	'[data-demo-section*="variants"]',
	'[data-demo-section*="variant"]'
] as const;
const multiSectionPages = new Set(['alert', 'avatar', 'badge', 'calendar', 'chip', 'input-number', 'popup', 'rating', 'slider']);

async function setMode(page: Page, mode: 'light' | 'dark') {
	await page.addInitScript((value) => localStorage.setItem('resax-mode', value), mode);
}

async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.fonts.ready);
	await page.locator('#docs-main').waitFor({ state: 'visible' });
	await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function findGallery(page: Page, slug: string) {
	if (multiSectionPages.has(slug)) {
		await page.evaluate(() => {
			if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
			document.querySelector<HTMLElement>('.skip-link')?.style.setProperty('display', 'none');
		});
		await page.locator('.docs-shell').evaluate((element) => { element.setAttribute('style', 'height:auto;overflow:visible'); });
		await page.locator('.docs-column').evaluate((element) => { element.setAttribute('style', 'height:auto;overflow:visible'); });
		await page.locator('#docs-main').evaluate((element) => { element.setAttribute('style', 'height:auto;overflow:visible'); });
		await page.locator('body').evaluate((element) => { element.setAttribute('style', 'overflow:auto'); });
		return page.locator('#docs-main');
	}
	for (const selector of variantSelectors) {
		const fixture = page.locator(selector).first();
		if (await fixture.count()) return fixture;
	}
	const variantSection = page.locator('.demo-section').filter({ has: page.getByRole('heading', { name: /variants?|source|gallery|physics|motions?/i }) }).first();
	if (await variantSection.count()) return variantSection.locator('.demo-frame');
	return page.locator('.demo-frame').first();
}

for (const mode of ['light', 'dark'] as const) {
	test(`docs shell ${mode}`, async ({ page }) => {
		await setMode(page, mode);
		await page.goto('/');
		await settle(page);
		await expect(page).toHaveScreenshot(`${mode}-docs-shell.png`, { animations: 'disabled', maxDiffPixels: 250 });
	});

	test(`popup identity open ${mode}`, async ({ page }) => {
		await setMode(page, mode);
		await page.goto('/components/popup');
		await settle(page);
		await page.getByText('Open from trigger snippet', { exact: true }).click();
		const popup = page.locator('.rx-popup[data-transition="morph"][data-state="open"]');
		await expect(popup).toHaveClass(/rx-popup--morph-ready/);
		await page.waitForTimeout(850);
		const popupBox = await popup.boundingBox();
		const viewport = page.viewportSize();
		expect(popupBox).not.toBeNull();
		if (popupBox && viewport) {
			expect(popupBox.x).toBeGreaterThanOrEqual(8);
			expect(popupBox.x + popupBox.width).toBeLessThanOrEqual(viewport.width - 8);
		}
		await expect(page).toHaveScreenshot(`${mode}-popup-identity-open.png`, { animations: 'disabled', maxDiffPixels: 500 });
		await page.keyboard.press('Escape');
		await expect(page.getByRole('button', { name: 'Open from trigger snippet' })).toBeVisible();
	});

	test(`family galleries ${mode}`, async ({ page }) => {
		test.setTimeout(8 * 60_000);
		await setMode(page, mode);
		for (const slug of capturedFamilyPages) {
			await page.goto(`/components/${slug}`);
			await settle(page);
			const viewport = page.viewportSize();
			const gallery = await findGallery(page, slug);
			await expect(gallery, `${slug} must expose a visual fixture`).toBeVisible();
			if (viewport) {
				const galleryHeight = await gallery.evaluate((element) => Math.ceil(element.getBoundingClientRect().height));
				const captureHeight = Math.max(viewport.height, Math.min(16_000, galleryHeight + 160));
				if (captureHeight !== viewport.height) {
					await page.setViewportSize({ width: viewport.width, height: captureHeight });
					await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
				}
			}
			if (slug === 'spinner') {
				await gallery.evaluate((element) => element.getAnimations({ subtree: true }).forEach((animation) => {
					animation.pause();
					animation.currentTime = 0;
				}));
			}
			const maxDiffPixels = slug === 'alert' ? 2000 : slug === 'skeleton' ? 1350 : slug === 'popup' ? 1400 : 1000;
			await expect(gallery).toHaveScreenshot(`${mode}-${slug}-gallery.png`, { animations: slug === 'spinner' ? 'allow' : 'disabled', maxDiffPixels, timeout: 10_000 });
			if (viewport && page.viewportSize()?.height !== viewport.height) await page.setViewportSize(viewport);
		}
	});
}

test('docs shell disclosure states', async ({ page, isMobile }) => {
	await setMode(page, 'dark');
	await page.goto('/components/button');
	await settle(page);
	if (isMobile) {
		await page.getByRole('button', { name: 'Toggle component navigation' }).click();
		await expect(page).toHaveScreenshot('dark-docs-mobile-navigation-open.png', { animations: 'disabled' });
		await page.getByRole('button', { name: 'Close component navigation' }).click();
		await page.getByRole('button', { name: 'Toggle page details' }).click();
		await expect(page).toHaveScreenshot('dark-docs-mobile-details-open.png', { animations: 'disabled', maxDiffPixels: 1200 });
	} else {
		await page.getByRole('button', { name: 'Collapse component navigation' }).click();
		await expect(page).toHaveScreenshot('dark-docs-rail-collapsed.png', { animations: 'disabled', maxDiffPixels: 6000 });
		await page.getByRole('button', { name: 'Expand component navigation' }).click();
		await page.getByRole('button', { name: 'Collapse page details' }).click();
		await expect(page).toHaveScreenshot('dark-docs-panel-collapsed.png', { animations: 'disabled', maxDiffPixels: 300 });
	}
});

test('defining pointer, selection, and overlay states', async ({ page, isMobile }) => {
	test.skip(isMobile === true, 'The family matrix already captures mobile; precise pointer states are desktop-only.');
	test.setTimeout(3 * 60_000);
	await setMode(page, 'dark');

	await page.goto('/components/alert');
	await settle(page);
	const neighborAlerts = page.locator('[data-demo-section="variant-default"]');
	const neighborReceiver = neighborAlerts.locator('.rx-alert').first();
	await neighborReceiver.evaluate((receiver) => {
		const parent = receiver.parentElement;
		if (!parent) return;
		parent.style.position = 'relative';
		const lamp = document.createElement('span');
		lamp.dataset.rxLamp = '';
		lamp.textContent = 'Lamp';
		lamp.setAttribute('aria-hidden', 'true');
		lamp.style.cssText = 'position:absolute;top:16px;right:18px;z-index:8;display:grid;width:52px;height:28px;place-items:center;border-radius:999px;color:white;background:rgb(255 60 172);box-shadow:0 0 24px rgb(255 60 172 / .72);font:600 10px/1 sans-serif;--rx-color-rgb:255 60 172;--rx-color:255 60 172';
		parent.append(lamp);
		window.dispatchEvent(new Event('resize'));
	});
	await expect.poll(() => neighborReceiver.evaluate((element) => element.style.getPropertyValue('--rx-neighbor-lit'))).toBe('1');
	await expect.poll(() => neighborReceiver.evaluate((element) => element.style.getPropertyValue('--rx-neighbor-fill'))).toContain('255 60 172');
	await expect(neighborAlerts).toHaveScreenshot('dark-alert-neighbor-light-state.png', { animations: 'disabled', maxDiffPixels: 300 });

	await page.goto('/components/button');
	await settle(page);
	const pointerButton = page.getByRole('button', { name: 'Move near me' });
	await pointerButton.hover({ position: { x: 12, y: 12 } });
	await expect(page.locator('[data-demo-section="pointer-effects"]')).toHaveScreenshot('dark-button-pointer-state.png', { animations: 'disabled' });

	await page.goto('/components/card');
	await settle(page);
	const spotlightCard = page.locator('[data-demo-section="card-variants"] .rx-card').filter({ hasText: 'spotlight card' });
	await spotlightCard.hover({ position: { x: 24, y: 24 } });
	await expect(spotlightCard).toHaveScreenshot('dark-card-spotlight-state.png', { animations: 'disabled' });

	await page.goto('/components/ask-ai-button');
	await settle(page);
	const askAi = page.getByRole('button', { name: 'Ask Resax' });
	await askAi.hover({ position: { x: 18, y: 12 } });
	await expect(page.locator('[data-demo-section="ask-ai-interactive"]')).toHaveScreenshot('dark-ask-ai-pointer-state.png', { animations: 'disabled' });

	await page.goto('/components/checkbox');
	await settle(page);
	await page.getByRole('checkbox', { name: '3D flip' }).click();
	await expect(page.locator('.demo-frame').nth(1)).toHaveScreenshot('dark-checkbox-flip-state.png', { animations: 'disabled', maxDiffPixels: 100 });

	await page.goto('/components/tabs');
	await settle(page);
	await page.getByRole('tab', { name: 'Activity' }).first().click();
	await expect(page.locator('.demo-frame').first()).toHaveScreenshot('dark-tabs-selected-state.png', { animations: 'disabled', maxDiffPixels: 60 });

	await page.goto('/components/switch');
	await settle(page);
	await page.getByRole('switch', { name: 'Liquid switch' }).click();
	await expect(page.locator('.demo-frame').nth(1)).toHaveScreenshot('dark-switch-liquid-state.png', { animations: 'disabled', maxDiffPixels: 150 });

	await page.goto('/components/slider');
	await settle(page);
	const rippleTrack = page.locator('[data-demo-section="motion"] .rx-slider__track').first();
	await rippleTrack.click({ position: { x: 38, y: 8 }, force: true });
	const rippleWave = page.locator('[data-demo-section="motion"] .rx-slider__wave');
	await expect(rippleWave).toBeVisible();
	await rippleWave.evaluate((element) => element.getAnimations().forEach((animation) => { animation.currentTime = 180; animation.pause(); }));
	await expect(page.locator('[data-demo-section="motion"]')).toHaveScreenshot('dark-slider-ripple-state.png', { animations: 'allow' });

	await page.goto('/components/dock');
	await settle(page);
	const dockHome = page.getByRole('link', { name: 'Home' }).first();
	await dockHome.hover({ position: { x: 16, y: 16 } });
	await expect(page.getByRole('navigation', { name: 'Application dock' }).first()).toHaveScreenshot('dark-dock-proximity-state.png', { animations: 'disabled' });

	await page.goto('/components/nav-menu');
	await settle(page);
	const spotlightNav = page.locator('#spotlight-panel-choreography');
	const spotlightProducts = spotlightNav.getByRole('button', { name: 'Products' });
	await spotlightProducts.click({ position: { x: 28, y: 18 } });
	await expect(spotlightNav.locator('[data-slot="navigation-menu-viewport"][data-state="open"]')).toBeVisible();
	await expect(spotlightNav).toHaveScreenshot('dark-nav-menu-spotlight-open.png', { animations: 'disabled' });

	await page.goto('/components/popup');
	await settle(page);
	await page.getByRole('button', { name: 'flip', exact: true }).click();
	await expect(page).toHaveScreenshot('dark-popup-flip-open.png', { animations: 'disabled' });
	await page.keyboard.press('Escape');
	await page.getByText('Open from trigger snippet', { exact: true }).click();
	const identityPopup = page.locator('.rx-popup[data-transition="morph"][data-state="open"]');
	await expect(identityPopup).toHaveClass(/rx-popup--morph-ready/);
	await identityPopup.evaluate((element) => {
		for (const animation of element.getAnimations({ subtree: true })) {
			const timing = animation.effect?.getComputedTiming();
			if (typeof timing?.duration === 'number' && timing.duration > 1) {
				animation.currentTime = Math.min(timing.duration * .42, 300);
				animation.pause();
			}
		}
	});
	await expect(page).toHaveScreenshot('dark-popup-identity-mid-state.png', { animations: 'allow', maxDiffPixels: 2500 });
	await identityPopup.evaluate((element) => element.getAnimations({ subtree: true }).forEach((animation) => animation.finish()));
	await page.keyboard.press('Escape');
	const closingIdentityPopup = page.locator('.rx-popup[data-transition="morph"][data-state="closed"]');
	await expect(closingIdentityPopup).toBeAttached();
	await closingIdentityPopup.evaluate((element) => {
		for (const animation of element.getAnimations({ subtree: true })) {
			const timing = animation.effect?.getComputedTiming();
			if (typeof timing?.duration === 'number' && timing.duration > 1) {
				animation.currentTime = timing.duration * .45;
				animation.pause();
			}
		}
	});
	await expect(page).toHaveScreenshot('dark-popup-identity-close-mid-state.png', { animations: 'allow', maxDiffPixels: 2500 });
	await closingIdentityPopup.evaluate((element) => element.getAnimations({ subtree: true }).forEach((animation) => animation.finish()));
	await expect(page.getByRole('button', { name: 'Open from trigger snippet' })).toBeVisible();

	await page.goto('/components/tooltip');
	await settle(page);
	const glowTooltipTrigger = page.locator('[data-demo-section="motions"] .rx-tooltip__trigger').filter({ hasText: 'glow' });
	await glowTooltipTrigger.hover();
	const glowTooltip = page.locator('.rx-tooltip--glow[data-state="delayed-open"], .rx-tooltip--glow[data-state="open"]');
	await expect(glowTooltip).toBeVisible();
	await expect(glowTooltip).toHaveScreenshot('dark-tooltip-glow-open.png', { animations: 'disabled' });

	await page.goto('/components/dropdown');
	await settle(page);
	await page.getByText('glow', { exact: true }).first().click();
	await expect(page.getByRole('menu')).toHaveScreenshot('dark-dropdown-glow-open.png', { animations: 'disabled' });
	await page.keyboard.press('Escape');

	await page.goto('/components/context-menu');
	await settle(page);
	await page.locator('.target').filter({ hasText: 'radial' }).click({ button: 'right', position: { x: 24, y: 24 } });
	await expect(page.getByRole('menu')).toHaveScreenshot('dark-context-menu-radial-open.png', { animations: 'disabled' });
	await page.keyboard.press('Escape');

	await page.goto('/components/drawer');
	await settle(page);
	await page.getByText('glass', { exact: true }).first().click();
	await expect(page.getByRole('dialog')).toHaveScreenshot('dark-drawer-glass-open.png', { animations: 'disabled' });
});

test('additional defining choreography states', async ({ page, isMobile }) => {
	test.skip(isMobile === true, 'These pointer and expanded states are represented by desktop captures.');
	test.setTimeout(2 * 60_000);
	await setMode(page, 'dark');

	await page.goto('/components/notification');
	await settle(page);
	await page.locator('[data-demo-section="variants"]').getByRole('button', { name: 'base', exact: true }).click();
	const notification = page.locator('.rx-notification').first();
	await expect(notification).toBeVisible();
	await notification.hover();
	await expect(notification).toHaveClass(/rx-notification--expanded/);
	await expect(notification).toHaveScreenshot('dark-notification-base-expanded.png', { animations: 'disabled', maxDiffPixels: 500 });

	await page.goto('/components/tick-rail');
	await settle(page);
	const interactiveRail = page.locator('.rx-rail').first();
	const navigationTick = interactiveRail.getByRole('button', { name: 'Navigation' });
	await navigationTick.click();
	await expect(navigationTick).toHaveAttribute('aria-current', 'true');
	await expect(interactiveRail.locator('.rx-rail__card')).toContainText('Navigation');
	await page.waitForTimeout(420);
	await expect(page.locator('.demo-frame').first()).toHaveScreenshot('dark-tick-rail-proximity-state.png', { animations: 'allow' });

	await page.goto('/components/cursor');
	await settle(page);
	await page.getByRole('button', { name: 'Enable custom cursor' }).click();
	await page.getByRole('button', { name: 'Magnetic target' }).hover({ position: { x: 12, y: 12 } });
	await expect(page.locator('[data-rx-cursor="glow"]')).toBeVisible();
	await page.waitForTimeout(450);
	await expect(page).toHaveScreenshot('dark-cursor-glow-state.png', { animations: 'allow', maxDiffPixels: 4500 });

	await page.goto('/components/inline-overflow');
	await settle(page);
	await page.getByRole('button', { name: 'More actions' }).first().click();
	await expect(page.locator('.rx-io').first()).toHaveClass(/is-open/);
	await expect(page.locator('.demo-frame').first()).toHaveScreenshot('dark-inline-overflow-open-state.png', { animations: 'disabled' });

	await page.goto('/components/slide-confirm');
	await settle(page);
	const confirmThumb = page.getByRole('slider', { name: 'Slide to confirm' }).first();
	const thumbBox = await confirmThumb.boundingBox();
	expect(thumbBox).not.toBeNull();
	if (thumbBox) {
		await page.mouse.move(thumbBox.x + thumbBox.width / 2, thumbBox.y + thumbBox.height / 2);
		await page.mouse.down();
		await page.mouse.move(thumbBox.x + thumbBox.width / 2 + 38, thumbBox.y + thumbBox.height / 2, { steps: 8 });
		await expect(confirmThumb).toHaveAttribute('aria-valuenow', /[3-8]\d/);
		await expect(page.locator('.demo-frame').first()).toHaveScreenshot('dark-slide-confirm-drag-state.png', { animations: 'allow', maxDiffPixels: 40 });
		await page.mouse.up();
	}
});

test('reduced-motion visual contract', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await setMode(page, 'dark');
	for (const slug of ['ask-ai-button', 'slider', 'dock'] as const) {
		await page.goto(`/components/${slug}`);
		await settle(page);
		const gallery = await findGallery(page, slug);
		const viewport = page.viewportSize();
		if (viewport && slug === 'dock') {
			const galleryHeight = await gallery.evaluate((element) => Math.ceil(element.getBoundingClientRect().height));
			await page.setViewportSize({ width: viewport.width, height: Math.max(viewport.height, galleryHeight + 160) });
			await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
		}
		await expect(gallery).toHaveScreenshot(`reduced-motion-${slug}.png`, { animations: 'disabled', maxDiffPixels: slug === 'dock' ? 900 : 200 });
		if (viewport && page.viewportSize()?.height !== viewport.height) await page.setViewportSize(viewport);
	}
});
