import { render } from 'svelte/server';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import Spinner, { spinnerSizeClass } from './spinner/spinner.svelte';
import Skeleton from './skeleton/skeleton.svelte';
import Separator from './separator/separator.svelte';
import Spacer from './spacer/spacer.svelte';

describe('core visual components', () => {
	it('renders a status spinner and maps type and size classes', () => {
		const { body } = render(Spinner, { props: { type: 'waves', size: 'mini' } });
		expect(body).toContain('role="status"');
		expect(body).toContain('rx-spinner--waves');
		expect(body).toContain(spinnerSizeClass.mini);
	});

	it('accepts every scraped spinner name and maps it to a faithful motion primitive', () => {
		const aliases = ['bars', 'bounce', 'comet', 'dots', 'flip', 'grid', 'orbit', 'pulse', 'ring', 'wave'] as const;
		for (const type of aliases) {
			const { body } = render(Spinner, { props: { type } });
			expect(body).toContain(`data-type="${type}"`);
			expect(body).toContain(`rx-spinner--source-${type}`);
		}
	});

	it('maps skeleton variants and shapes', () => {
		const { body } = render(Skeleton, { props: { variant: 'shine', shape: 'avatar' } });
		expect(body).toContain('rx-skeleton--shine');
		expect(body).toContain('rx-skeleton--avatar');
	});

	it('renders skeleton children when loading is false', () => {
		const children = createRawSnippet(() => ({ render: () => '<p>Ready content</p>' }));
		const { body } = render(Skeleton, { props: { loading: false, children } });
		expect(body).toContain('Ready content');
		expect(body).not.toContain('rx-skeleton--pulse');
	});

	it('sets separator orientation', () => {
		const { body } = render(Separator, { props: { orientation: 'vertical' } });
		expect(body).toContain('role="separator"');
		expect(body).toContain('aria-orientation="vertical"');
	});

	it('renders an aria-hidden spacer', () => {
		const { body } = render(Spacer, { props: { width: '2rem', grow: true } });
		expect(body).toContain('aria-hidden="true"');
		expect(body).toContain('width: 2rem');
	});
});
