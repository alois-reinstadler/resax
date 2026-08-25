export type RxColor = 'primary' | 'success' | 'danger' | 'warn' | 'dark' | (string & {});

const semanticColors = new Set<RxColor>(['primary', 'success', 'danger', 'warn', 'dark']);

export interface RxEffectPalette {
	rgb: string;
	foreground: string;
	hoverRgb: string;
	ringRgb: string;
	effectRgb: string;
	rippleRgb: string;
}

export type RxColorVariable =
	| '--rx-color'
	| '--rx-color-rgb'
	| '--rx-color-foreground'
	| '--rx-color-contrast'
	| '--rx-color-hover'
	| '--rx-color-ring'
	| '--rx-color-effect'
	| '--rx-color-ripple';

export type RxColorVars = Record<RxColorVariable, string>;

function hexTriplet(value: string): string | undefined {
	const match = /^#([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.exec(value);
	if (!match) return undefined;
	const hex = match[1].length <= 4
		? [...match[1].slice(0, 3)].map((character) => character.repeat(2)).join('')
		: match[1].slice(0, 6);
	return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16)).join(' ');
}

function rgbTriplet(value: string): string | undefined {
	const match = /^rgba?\(\s*([+-]?(?:\d+\.?\d*|\.\d+))\s*[, ]\s*([+-]?(?:\d+\.?\d*|\.\d+))\s*[, ]\s*([+-]?(?:\d+\.?\d*|\.\d+))(?:\s*[,/]\s*(?:\d+\.?\d*|\.\d+)%?)?\s*\)$/i.exec(value);
	if (!match) return undefined;
	const channels = match.slice(1, 4).map(Number);
	if (channels.some((channel) => !Number.isFinite(channel) || channel < 0 || channel > 255)) return undefined;
	return channels.join(' ');
}

/** Returns an RGB triplet suitable for rgb(var(--rx-color) / alpha). Unsupported CSS colors return undefined. */
export function getColor(color?: RxColor): string | undefined {
	if (!color) return undefined;
	if (semanticColors.has(color)) return `var(--rx-${color})`;
	if (color.toLowerCase() === 'black') return '0 0 0';
	if (color.toLowerCase() === 'white') return '255 255 255';
	return hexTriplet(color) ?? rgbTriplet(color);
}

function literalPalette(rgb: string): RxEffectPalette {
	const channels = rgb.split(' ').map(Number) as [number, number, number];
	const linear = (channel: number) => {
		const value = channel / 255;
		return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
	};
	const bright = 0.2126 * linear(channels[0]) + 0.7152 * linear(channels[1]) + 0.0722 * linear(channels[2]) > 0.45;
	const hover = channels.map((channel) => Math.round(bright ? channel * 0.92 : channel + (255 - channel) * 0.16));
	return {
		rgb,
		foreground: bright ? '#0b0b0b' : '#ffffff',
		hoverRgb: hover.join(' '),
		ringRgb: rgb,
		effectRgb: rgb,
		rippleRgb: bright ? '0 0 0' : '255 255 255'
	};
}

function semanticPalette(color: RxColor): RxEffectPalette {
	const name = String(color);
	return {
		rgb: `var(--rx-${name})`,
		foreground: `var(--rx-${name}-foreground)`,
		hoverRgb: `var(--rx-${name}-hover)`,
		ringRgb: `var(--rx-${name})`,
		effectRgb: `var(--rx-${name})`,
		rippleRgb: `var(--rx-${name}-contrast-rgb)`
	};
}

export function colorPalette(color?: RxColor): RxEffectPalette | undefined {
	if (!color) return undefined;
	if (semanticColors.has(color)) return semanticPalette(color);
	const rgb = getColor(color);
	return rgb ? literalPalette(rgb) : undefined;
}

/** Complete source-shaped color fan-out for solid, hover, focus, glow, and ripple paint. */
export function colorVars(color?: RxColor): RxColorVars | undefined {
	const palette = colorPalette(color);
	if (!palette) return undefined;
	return {
		'--rx-color': palette.rgb,
		'--rx-color-rgb': palette.rgb,
		'--rx-color-foreground': palette.foreground,
		'--rx-color-contrast': palette.rippleRgb,
		'--rx-color-hover': palette.hoverRgb,
		'--rx-color-ring': palette.ringRgb,
		'--rx-color-effect': palette.effectRgb,
		'--rx-color-ripple': palette.rippleRgb
	};
}

export function colorStyle(color?: RxColor): string | undefined {
	const variables = colorVars(color);
	return variables
		? Object.entries(variables).map(([name, value]) => `${name}: ${value}`).join('; ')
		: undefined;
}

/** Compatibility wrapper retained for existing Resax components. */
export function styleColor(color?: RxColor): string | undefined {
	return colorStyle(color);
}
