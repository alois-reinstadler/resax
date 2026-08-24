import { vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import { afterEach } from 'vitest';

afterEach(cleanup);

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false, media: query, onchange: null,
		addListener: vi.fn(), removeListener: vi.fn(),
		addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn()
	}))
});

Element.prototype.animate = vi.fn(() => ({
	addEventListener: vi.fn(), cancel: vi.fn()
} as unknown as Animation));
