export type RxColor = 'primary' | 'success' | 'danger' | 'warn' | 'dark' | (string & {});

const semanticColors = new Set(['primary', 'success', 'danger', 'warn', 'dark']);

function hexTriplet(value: string): string | undefined {
	const match = /^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i.exec(value);
	if (!match) return undefined;
	const hex = match[1].length === 3
		? [...match[1]].map((character) => character.repeat(2)).join('')
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
	return hexTriplet(color) ?? rgbTriplet(color);
}

export function styleColor(color?: RxColor): string | undefined {
	const value = getColor(color);
	return value ? `--rx-color: ${value}` : undefined;
}
