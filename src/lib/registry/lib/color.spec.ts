import { describe, expect, it } from 'vitest';
import { colorPalette, colorStyle, colorVars, getColor, styleColor } from './color';

describe('getColor', () => {
	it('maps semantic names', () => expect(getColor('primary')).toBe('var(--rx-primary)'));
	it.each([['#abc', '170 187 204'], ['#abcd', '170 187 204'], ['#195bff', '25 91 255'], ['#195bff80', '25 91 255']])('parses %s', (input, output) => expect(getColor(input)).toBe(output));
	it.each([['rgb(25, 91, 255)', '25 91 255'], ['rgba(25, 91, 255, .5)', '25 91 255'], ['rgb(25 91 255 / 50%)', '25 91 255']])('parses %s', (input, output) => expect(getColor(input)).toBe(output));
	it.each([['black', '0 0 0'], ['white', '255 255 255']])('parses named %s', (input, output) => expect(getColor(input)).toBe(output));
	it.each(['tomato', 'garbage', '#12', 'rgb(300, 0, 0)'])('rejects %s', (input) => expect(getColor(input)).toBeUndefined());
	it('keeps the compatibility style declaration', () => {
		expect(styleColor('danger')).toContain('--rx-color: var(--rx-danger)');
		expect(styleColor('danger')).toContain('--rx-color-ripple: var(--rx-danger-contrast-rgb)');
	});
});

describe('source color fan-out', () => {
	it.each([
		['black', '#ffffff', '41 41 41', '255 255 255'],
		['white', '#0b0b0b', '235 235 235', '0 0 0'],
		['#ffcc00', '#0b0b0b', '235 188 0', '0 0 0'],
		['#abc', '#0b0b0b', '156 172 188', '0 0 0'],
		['rgb(25 91 255)', '#ffffff', '62 117 255', '255 255 255']
	])('derives foreground, hover, and ripple for %s', (input, foreground, hover, ripple) => {
		const palette = colorPalette(input);
		expect(palette?.foreground).toBe(foreground);
		expect(palette?.hoverRgb).toBe(hover);
		expect(palette?.rippleRgb).toBe(ripple);
		expect(palette?.effectRgb).toBe(palette?.rgb);
	});

	it('maps semantic colors to runtime theme roles', () => {
		expect(colorVars('primary')).toEqual({
			'--rx-color': 'var(--rx-primary)',
			'--rx-color-rgb': 'var(--rx-primary)',
			'--rx-color-foreground': 'var(--rx-primary-foreground)',
			'--rx-color-contrast': 'var(--rx-primary-contrast-rgb)',
			'--rx-color-hover': 'var(--rx-primary-hover)',
			'--rx-color-ring': 'var(--rx-primary)',
			'--rx-color-effect': 'var(--rx-primary)',
			'--rx-color-ripple': 'var(--rx-primary-contrast-rgb)'
		});
	});

	it('serializes every role and rejects invalid colors', () => {
		const style = colorStyle('#ffcc00');
		expect(style).toContain('--rx-color-foreground: #0b0b0b');
		expect(style).toContain('--rx-color-hover: 235 188 0');
		expect(style).toContain('--rx-color-effect: 255 204 0');
		expect(style).toContain('--rx-color-ripple: 0 0 0');
		expect(colorVars('tomato')).toBeUndefined();
	});
});
