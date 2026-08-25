import { getContext, setContext } from 'svelte';
import type { RxColor } from '$lib/registry/lib/color';

export type AccordionMode = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'filled' | 'ghost';
export type AccordionEffect = 'none' | 'bounce' | 'glow' | 'slide';
export type AccordionLayout = 'separated' | 'contained' | 'line';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionRadius = 'none' | 'subtle' | 'rounded' | 'squircle';
export type AccordionTone = 'default' | 'danger' | 'warning' | 'success';
export type AccordionContext = {
	variant: AccordionVariant;
	effect: AccordionEffect;
	layout: AccordionLayout;
	color?: RxColor;
};
const key = Symbol('rx-accordion');
export const setAccordionContext = (value: AccordionContext) => setContext(key, value);
export const getAccordionContext = () => getContext<AccordionContext>(key);
