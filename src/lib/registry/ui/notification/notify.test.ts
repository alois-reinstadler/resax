import { describe, expect, it } from 'vitest';
import { notify } from './notify.svelte';

describe('notification server guard', () => {
	it('throws a clear error when called during SSR', () => {
		expect(() => notify({ text: 'Server toast' })).toThrowError(
			'notify() is client-only and cannot be called during server rendering.'
		);
	});
});
