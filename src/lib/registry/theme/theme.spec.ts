import { describe, expect, it } from 'vitest';

// The app intentionally omits Node ambient types; Vitest still executes this suite in Node.
// @ts-expect-error Node built-ins are available to the server test project.
const { readFileSync } = await import('node:fs');
const theme = readFileSync(new URL('./theme.css', import.meta.url), 'utf8') as string;

describe('source theme contract', () => {
	it('defines the exact light and dark role hierarchy', () => {
		expect(theme).toContain('--rx-bg: 255 255 255');
		expect(theme).toContain('--rx-surface: 250 250 250');
		expect(theme).toContain('--rx-input: 245 245 245');
		expect(theme).toContain('--rx-bg: 0 0 0');
		expect(theme).toContain('--rx-surface: 10 10 10');
		expect(theme).toContain('--rx-input: 13 13 13');
		expect(theme).toContain('--rx-control-h-sm: 32px');
		expect(theme).toContain('--rx-control-h-md: 40px');
		expect(theme).toContain('--rx-control-h-lg: 48px');
	});

	it('contains exact shared motion and source-shaped compositor primitives', () => {
		expect(theme).toContain('--rx-ease-out: cubic-bezier(.22, 1, .36, 1)');
		expect(theme).toContain('--rx-ease-spring: cubic-bezier(.34, 1.56, .64, 1)');
		expect(theme).toContain('.rx-proximity-ring');
		expect(theme).toContain('radial-gradient(var(--rx-glow-core-radius, 60px)');
		expect(theme).toContain('-webkit-mask-composite: xor');
		expect(theme).toContain('mask-composite: exclude');
		expect(theme).toContain('.rx-neighbor-light');
		expect(theme).toContain('.rx-pointer-spotlight');
		expect(theme).toContain('mix-blend-mode: var(--rx-spotlight-blend, screen)');
		expect(theme).toContain('.rx-ambient-aura');
		expect(theme).toContain('animation: rx-aura-breathe 4.5s ease-in-out infinite');
		expect(theme).toContain('.rx-conic-ring');
		expect(theme).toContain('animation: rx-conic-spin 3.2s linear infinite');
		expect(theme).toContain('.rx-halo');
		expect(theme).toContain('animation: rx-halo-breathe 2.6s ease-in-out infinite');
	});

	it('provides reduced-motion and forced-colors outcomes', () => {
		expect(theme).toContain('@media (prefers-reduced-motion: reduce)');
		expect(theme).toContain('@media (forced-colors: active)');
		expect(theme).toContain('.rx-conic-ring[data-rx-open=\'true\']');
	});
});
