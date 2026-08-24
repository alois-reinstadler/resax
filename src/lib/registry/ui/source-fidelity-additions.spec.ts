import { createRawSnippet } from 'svelte';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { Indicator } from './indicator';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select } from './select';

const empty = createRawSnippet(() => ({ render: () => '' }));

describe('source-specific additive variants', () => {
	it('maps card spotlight and tilt variants', () => {
		expect(render(Card, { props: { variant: 'spotlight' } }).body).toContain('rx-card--spotlight');
		expect(render(Card, { props: { variant: 'tilt-3d' } }).body).toContain('rx-card--tilt-3d');
	});

	it('renders an odometer indicator value', () => {
		const body = render(Indicator, { props: { variant: 'odometer', content: 42 } }).body;
		expect(body).toContain('rx-indicator--odometer');
		expect(body).toContain('42');
	});

	it('maps source-specific form focus treatments', () => {
		expect(render(Input, { props: { variant: 'gradient-border' } }).body).toContain('rx-input--gradient-border');
		expect(render(Textarea, { props: { variant: 'code' } }).body).toContain('rx-textarea--code');
		expect(render(Select, { props: { variant: 'pill', children: empty } }).body).toContain('rx-select--pill');
	});
});
