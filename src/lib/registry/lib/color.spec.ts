import { describe, expect, it } from 'vitest';
import { getColor, styleColor } from './color';

describe('getColor', () => {
	it('maps semantic names', () => expect(getColor('primary')).toBe('var(--rx-primary)'));
	it.each([['#abc', '170 187 204'], ['#195bff', '25 91 255'], ['#195bff80', '25 91 255']])('parses %s', (input, output) => expect(getColor(input)).toBe(output));
	it.each([['rgb(25, 91, 255)', '25 91 255'], ['rgba(25, 91, 255, .5)', '25 91 255'], ['rgb(25 91 255 / 50%)', '25 91 255']])('parses %s', (input, output) => expect(getColor(input)).toBe(output));
	it.each(['tomato', 'garbage', '#12', 'rgb(300, 0, 0)'])('rejects %s', (input) => expect(getColor(input)).toBeUndefined());
	it('creates a custom property declaration', () => expect(styleColor('danger')).toBe('--rx-color: var(--rx-danger)'));
});
